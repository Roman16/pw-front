import React, {useEffect, useState} from "react"
import {subscriptionPlans} from "../../../constans/subscription.plans"
import './Subscriptions.less'
import './modalWindows/modalWindows.less'
import {userService} from "../../../services/user.services"
import {CancelSubscription, ActivateSubscription, ConnectAmazonAccount} from "./modalWindows"
import {SubscriptionPlan} from './components/SubscriptionPlan'

import {Link} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {PageHeader} from "./components/PageHeader"
import {CouponField} from "./components/CouponField"
import {notification} from "../../../components/Notification"
import {AddPaymentMethod} from "./modalWindows/AddPaymentMethod"
import LoadingAmazonAccount from "../../../components/ModalWindow/PWWindows/LoadingAmazonAccountWindow"
import ModalWindow from "../../../components/ModalWindow/ModalWindow"
import _ from "lodash"
import {userActions} from "../../../actions/user.actions"
import {PageDescription} from "./components/PageDescription"
import {SomethingWrong} from "./modalWindows/SomethingWrong"


const Subscriptions = () => {
    const dispatch = useDispatch()

    const
        [scope, setScope] = useState('America'),

        [subscriptionsState, setSubscriptionsState] = useState({
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
        [activationInfo, setActivateInfo] = useState({
            optimization: {},
            analytics: {},
            full: {},
        }),
        [loadStateProcessing, setLoadStateProcessing] = useState(true),
        [activateProcessing, setActivateProcessing] = useState(false),
        [activateCouponProcessing, setActivateCouponProcessing] = useState(false),
        [selectedPlan, setSelectedPlan] = useState(),
        [activateType, setActivateType] = useState(),

        [visibleCancelSubscriptionsWindow, setVisibleCancelSubscriptionsWindow] = useState(false),
        [visibleActivateSubscriptionsWindow, setVisibleActivateSubscriptionsWindow] = useState(false),
        [visibleSomethingWrongWindow, setVisibleSomethingWrongWindow] = useState(false),

        [processingCancelSubscription, setProcessingCancelSubscription] = useState(false)

    const user = useSelector(state => state.user)
    const importStatus = useSelector(state => state.user.importStatus)

    const amazonIsConnected = user.account_links[0].amazon_mws.is_connected === true && user.account_links[0].amazon_ppc.is_connected === true

    const disabledPage = !amazonIsConnected || (importStatus.subscription ? !importStatus.subscription.required_parts_details : true) || visibleSomethingWrongWindow

    const getSubscriptionsState = async () => {
        setLoadStateProcessing(true)

        const openErrorWindow = () => {
            setVisibleSomethingWrongWindow(true)
            setLoadStateProcessing(false)
        }

        try {
            // const [state, info] = await Promise.all([userService.getSubscriptionsState(scope), userService.getActivateInfo({scope})])

            const state = await userService.getSubscriptionsState(scope)


            if (state.result[scope].error) {
                openErrorWindow()
            } else {
                const info = await userService.getActivateInfo({
                    scope,
                    coupon: state.result[scope].data.subscriptions[state.result[scope].data.active_subscription_type]?.coupon?.code
                })

                if (info.result[scope].error) {
                    openErrorWindow()
                } else {
                    const currentState = state.result[scope].data,
                        currentInfo = info.result[scope].data

                    setSubscriptionsState(currentState)
                    setActivateInfo(currentInfo)

                    setActivateProcessing(false)
                }
            }
        } catch (e) {
            console.log(e)
            openErrorWindow()
        }
        setLoadStateProcessing(false)
    }

    const subscribeHandler = async (coupon) => {
        setActivateProcessing(true)

        try {
            await userService.activateSubscription({
                scope,
                type: selectedPlan,
                coupon: coupon || subscriptionsState.subscriptions[subscriptionsState.active_subscription_type]?.coupon?.code || undefined
            })

            getSubscriptionsState()
            dispatch(userActions.getPersonalUserInfo())
            setVisibleActivateSubscriptionsWindow(false)
            setSelectedPlan(undefined)
        } catch (e) {
            console.log(e)
        }
    }

    const cancelSubscriptionHandler = async () => {
        setProcessingCancelSubscription(true)

        try {
            await userService.cancelSubscription({scope})
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
            const {result} = await userService.getCouponInfo(coupon)

            if (!result.valid) {
                notification.error({title: 'Coupon is not valid'})
            } else {
                await userService.activateCoupon({coupon, scope, type: subscriptionsState.active_subscription_type})
                notification.success({title: 'Coupon activated'})
                getSubscriptionsState()
            }
        } catch (e) {
            console.log(e)
        }
        setActivateCouponProcessing(false)
    }

    const retryPaymentHandler = (data) => {

    }

    const selectPlanHandler = (plan, type) => {
        setSelectedPlan(plan)
        setActivateType(type)

        setVisibleActivateSubscriptionsWindow(true)
    }

    const closeActivateWindowHandler = () => {
        !activateProcessing && setVisibleActivateSubscriptionsWindow(false)
        setSelectedPlan(undefined)
    }

    useEffect(() => {
        amazonIsConnected && getSubscriptionsState()
    }, [])


    return (<>
        {amazonIsConnected && <PageHeader user={user}/>}

        <section className={'subscriptions-page'}>
            <h1>Subscription</h1>

            <PageDescription
                state={subscriptionsState}

                activationInfo={activationInfo}
                disabledPage={disabledPage}
            />

            <ul className="plans">
                {subscriptionPlans.map(plan => <SubscriptionPlan
                    disabledPage={disabledPage}
                    plan={plan}
                    loadStateProcessing={loadStateProcessing}
                    subscriptionsState={subscriptionsState}
                    activationInfo={activationInfo}
                    processingCancelSubscription={processingCancelSubscription}
                    activateProcessing={activateProcessing}
                    adSpend={user.ad_spend}

                    onSelect={selectPlanHandler}
                    onSetVisibleCancelWindow={setVisibleCancelSubscriptionsWindow}
                    onRetryPayment={retryPaymentHandler}
                />)}
            </ul>

            {subscriptionsState.active_subscription_type && <div className="coupon-block">
                <p>Enter coupon</p>

                <CouponField
                    placeholder={'Your coupon'}
                    processing={activateCouponProcessing}

                    onApply={getCouponInfo}
                />
            </div>}
        </section>

        <CancelSubscription
            visible={visibleCancelSubscriptionsWindow}
            state={subscriptionsState}
            disableReactivateButtons={processingCancelSubscription}

            onClose={() => setVisibleCancelSubscriptionsWindow(false)}
            onCancelSubscription={cancelSubscriptionHandler}
        />

        {selectedPlan &&
        <ActivateSubscription
            visible={visibleActivateSubscriptionsWindow}
            plan={selectedPlan}
            activateType={activateType}
            state={subscriptionsState}
            info={activationInfo}
            scope={scope}
            processing={activateProcessing}
            adSpend={user.ad_spend}

            onClose={closeActivateWindowHandler}
            onActivate={subscribeHandler}
        />}

        <ConnectAmazonAccount
            visible={!amazonIsConnected}
        />

        <SomethingWrong
            visible={visibleSomethingWrongWindow}
        />

        <LoadingAmazonAccount
            pathname={'/account/subscriptions'}
            visible={!importStatus.subscription?.required_parts_ready}
            importStatus={importStatus}
            lastName={user.user.last_name}
            firstName={user.user.name}
            productList={[]}
            container={() => document.querySelector('.account-content')}
        />
    </>)
}

export default Subscriptions



