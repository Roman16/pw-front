import React, {useEffect, useState} from "react"
import {subscriptionPlans} from "../../../constans/subscription.plans"
import './Subscriptions.less'
import './modalWindows/modalWindows.less'
import {userService} from "../../../services/user.services"
import {CancelSubscription, ActivateSubscription, ConnectAmazonAccount} from "./modalWindows"
import {SubscriptionPlan} from './components/SubscriptionPlan'

import {useDispatch, useSelector} from "react-redux"
import {PageHeader} from "./components/PageHeader"
import {CouponField} from "./components/CouponField"
import {notification} from "../../../components/Notification"
import LoadingAmazonAccount from "../../../components/ModalWindow/PWWindows/LoadingAmazonAccountWindow"
import {userActions} from "../../../actions/user.actions"
import {PageDescription} from "./components/PageDescription"
import {SomethingWrong} from "./modalWindows/SomethingWrong"
import {injectStripe} from "react-stripe-elements"
import {history} from "../../../utils/history"
import {ImportProfileWindow} from "../../../components/ModalWindow/PWWindows/ImportProfileWindow"
import {CreateAdsAccount} from "../../../components/ModalWindow/PWWindows/CreateAdsAccount"

const cancelCoupon = process.env.REACT_APP_SUBSCRIPTION_COUPON


const Subscriptions = (props) => {
    const dispatch = useDispatch()

    const [subscriptionState, setSubscriptionState] = useState({
            active_subscription_type: null,
            subscriptions: {
                optimization: {},
                analytics: {},
                full: {},
            },
            trial: {
                can_start_trial: false
            }
        }),
        [loadStateProcessing, setLoadStateProcessing] = useState(true),
        [activateProcessing, setActivateProcessing] = useState(false),
        [retryProcessing, setRetryProcessing] = useState(false),
        [activateCouponProcessing, setActivateCouponProcessing] = useState(false),
        [selectedPlan, setSelectedPlan] = useState(),
        [activateType, setActivateType] = useState(),

        [visibleCancelSubscriptionsWindow, setVisibleCancelSubscriptionsWindow] = useState(false),
        [visibleActivateSubscriptionsWindow, setVisibleActivateSubscriptionsWindow] = useState(false),
        [visibleSomethingWrongWindow, setVisibleSomethingWrongWindow] = useState(false),

        [processingCancelSubscription, setProcessingCancelSubscription] = useState(false)

    const user = useSelector(state => state.user)
    const importStatus = useSelector(state => state.user.importStatus)
    const activeRegion = useSelector(state => state.user.activeAmazonRegion)
    const activeMarketplace = useSelector(state => state.user.activeAmazonMarketplace)
    const adSpend = useSelector(state => state.user.subscription.ad_spend)

    const amazonIsConnected = activeRegion?.is_amazon_ads_api_attached && activeRegion?.is_mws_attached

    const disabledPage = !amazonIsConnected || (importStatus.subscription ? !importStatus.subscription.required_parts_details : true) || visibleSomethingWrongWindow

    const getSubscriptionsState = async () => {
        setLoadStateProcessing(true)
        setVisibleActivateSubscriptionsWindow(false)

        const openErrorWindow = () => {
            setVisibleSomethingWrongWindow(true)
            setLoadStateProcessing(false)
        }

        try {
            let [state, info] = await Promise.all([userService.getSubscriptionsState(activeRegion.id), userService.getActivateInfo({id: activeRegion.id})])


            if (state.result[activeRegion.id].error || info.result[activeRegion.id].error) {
                openErrorWindow()
            } else if ([state.result[activeRegion.id].data.subscriptions.analytics, state.result[activeRegion.id].data.subscriptions.optimization, state.result[activeRegion.id].data.subscriptions.full].some(i => i?.incomplete_payment?.status === 'processing' || i?.incomplete_payment?.status === 'succeeded')) {
                getSubscriptionsState()
                return
            } else {
                state = state.result[activeRegion.id].data
                info = info.result[activeRegion.id].data

                setSubscriptionState({
                    ...state,
                    subscriptions: {
                        optimization: {...state.subscriptions.optimization, ...info.optimization},
                        analytics: {...state.subscriptions.analytics, ...info.analytics},
                        full: {...state.subscriptions.full, ...info.full},
                        ...(state.active_subscription_type) ? {
                            [state.active_subscription_type]: {
                                ...state.subscriptions[state.active_subscription_type],
                                next_invoice: state.subscriptions[state.active_subscription_type].upcoming_invoice,
                                subscription_type: state.active_subscription_type
                            }
                        } : {}
                    }
                })
                setActivateProcessing(false)
            }
        } catch (e) {
            console.log(e)
            openErrorWindow()
        }
        setActivateProcessing(false)
        setLoadStateProcessing(false)
        setRetryProcessing(false)
    }

    const subscribeHandler = async (coupon, plan) => {
        setActivateProcessing(true)

        try {
            await userService.activateSubscription({
                type: plan || selectedPlan,
                coupon: coupon || subscriptionState.subscriptions[subscriptionState.active_subscription_type]?.coupon?.code || undefined
            }, activeRegion.id)

            getSubscriptionsState()
            dispatch(userActions.getAccountStatus(activeRegion.id))
            setVisibleActivateSubscriptionsWindow(false)
            setSelectedPlan(undefined)
            setActivateProcessing(false)
        } catch (e) {
            if (e.response?.data.result?.status === 'requires_action') {
                retryPaymentHandler(e.response.data.result)
            } else {
                setActivateProcessing(false)
                setVisibleActivateSubscriptionsWindow(false)
            }
        }

        setRetryProcessing(false)
    }

    const retryPaymentHandler = async (state) => {
        if (state) {
            setRetryProcessing(true)

            if (state.status === 'requires_payment_method' && state.error_code === null && subscriptionState.subscriptions[subscriptionState.active_subscription_type].next_invoice?.payment?.card_last_4 === null) {
                history.push('/account/billing-information')
                notification.error({title: 'Add card first'})
            } else if (state.status === 'requires_action') {
                try {
                    const res = await props.stripe.confirmCardPayment(state.client_secret)

                    if (res.error) {
                        notification.error({title: res.error.message})
                    }
                } catch (e) {
                    console.log(e)
                }

                getSubscriptionsState()
            } else {
                try {
                    const res = await userService.retryPayment({
                        type: subscriptionState.active_subscription_type,
                    }, activeRegion.id)

                    retryPaymentHandler(res.result)
                } catch (e) {
                    if (e.response.data.result.status === 'requires_action') {
                        retryPaymentHandler(e.response.data.result)
                    }
                }
            }
        }
    }

    const cancelSubscriptionHandler = async () => {
        setProcessingCancelSubscription(true)

        try {
            await userService.cancelSubscription(activeRegion.id)
            getSubscriptionsState()
            setVisibleCancelSubscriptionsWindow(false)
        } catch (e) {
            console.log(e)
        }

        setProcessingCancelSubscription(false)
    }

    const getCouponInfo = async (coupon) => {
        setActivateCouponProcessing(true)

        try {
            const {result} = await userService.getCouponInfo(coupon, activeRegion.id)

            if (!result.valid) {
                notification.error({title: 'Coupon is not valid'})
            } else {
                await userService.activateCoupon({
                    coupon,
                    type: subscriptionState.active_subscription_type
                }, activeRegion.id)
                notification.success({title: 'Coupon activated'})
                getSubscriptionsState()
                setVisibleCancelSubscriptionsWindow(false)
            }
        } catch (e) {
            console.log(e)
        }

        setActivateCouponProcessing(false)
    }

    const selectPlanHandler = (plan, type) => {
        setSelectedPlan(plan)
        setActivateType(type)

        if (type !== 'cancel') setVisibleActivateSubscriptionsWindow(true)
    }

    const closeActivateWindowHandler = () => {
        !activateProcessing && setVisibleActivateSubscriptionsWindow(false)
        setSelectedPlan(undefined)
    }

    useEffect(() => {
        amazonIsConnected && activeRegion && getSubscriptionsState()
    }, [activeRegion])

    return (<>
        {amazonIsConnected && <PageHeader activeRegion={activeRegion}/>}

        <section className={'subscriptions-page'}>
            <h1>Subscription</h1>

            <PageDescription
                subscriptionState={subscriptionState}

                disabledPage={disabledPage}
            />

            <ul className="plans">
                {subscriptionPlans.map(plan => <SubscriptionPlan
                    plan={plan}
                    subscriptionState={subscriptionState}
                    disabledPage={disabledPage}
                    adSpend={adSpend}

                    loadStateProcessing={loadStateProcessing}
                    retryProcessing={retryProcessing}
                    processingCancelSubscription={processingCancelSubscription}
                    activateProcessing={activateProcessing}

                    onSelect={selectPlanHandler}
                    onSetVisibleCancelWindow={setVisibleCancelSubscriptionsWindow}
                    onRetryPayment={retryPaymentHandler}
                />)}
            </ul>

            {subscriptionState.active_subscription_type && <div className="coupon-block">
                <p>Enter coupon</p>

                <CouponField
                    placeholder={'Your coupon'}
                    processing={activateCouponProcessing}

                    onApply={getCouponInfo}
                />
            </div>}
        </section>

        <CancelSubscription
            plan={selectedPlan || subscriptionState.active_subscription_type}
            visible={visibleCancelSubscriptionsWindow}
            subscriptionState={subscriptionState}
            disableReactivateButtons={processingCancelSubscription || activateCouponProcessing}

            onClose={() => setVisibleCancelSubscriptionsWindow(false)}
            onCancelSubscription={cancelSubscriptionHandler}
            onKeepSubscription={() => getCouponInfo(cancelCoupon)}
        />

        {selectedPlan &&
        <ActivateSubscription
            visible={visibleActivateSubscriptionsWindow}
            plan={selectedPlan}
            activateType={activateType}
            subscriptionState={subscriptionState}
            processing={activateProcessing}
            adSpend={adSpend}
            regionId={activeRegion.id}

            onClose={closeActivateWindowHandler}
            onActivate={subscribeHandler}
        />}

        <ConnectAmazonAccount
            visible={!amazonIsConnected}
        />

        <SomethingWrong
            visible={importStatus.subscription?.required_parts_ready && visibleSomethingWrongWindow}
        />


        {!importStatus.common_resources?.required_parts_details?.profiles.part_ready ?
            <ImportProfileWindow
                visible={true}
                container={() => document.querySelector('.account-content')}

                lastName={user.userDetails.last_name}
                firstName={user.userDetails.name}
            /> : importStatus.common_resources?.required_parts_details.profiles.part_ready && activeMarketplace?.profile_id === null ?
                <CreateAdsAccount
                    container={() => document.querySelector('.account-content')}
                    marketplace={activeMarketplace}
                    visible={true}
                /> : amazonIsConnected && !importStatus.subscription?.required_parts_ready ?
                    <LoadingAmazonAccount
                        pathname={'/account/subscriptions'}
                        visible={true}
                        importStatus={importStatus}
                        lastName={user.userDetails.last_name}
                        firstName={user.userDetails.name}
                        productList={[]}
                        container={() => document.querySelector('.account-content')}
                    /> : false

        }


    </>)
}

export default injectStripe(Subscriptions)



