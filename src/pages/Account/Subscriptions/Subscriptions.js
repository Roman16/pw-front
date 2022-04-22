import React, {useEffect, useState} from "react"
import {subscriptionPlans} from "../../../constans/subscription.plans"
import './Subscriptions.less'
import './modalWindows/modalWindows.less'
import {userService} from "../../../services/user.services"
import {CancelSubscription, ActivateSubscription, ConnectAmazonAccount} from "./modalWindows"
import {SubscriptionPlan} from './SubscriptionPlan'

import {Link} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {PageHeader} from "./PageHeader"
import {CouponField} from "./CouponField"
import {notification} from "../../../components/Notification"
import {AddPaymentMethod} from "./modalWindows/AddPaymentMethod"
import LoadingAmazonAccount from "../../../components/ModalWindow/PWWindows/LoadingAmazonAccountWindow"
import ModalWindow from "../../../components/ModalWindow/ModalWindow"
import _ from "lodash"
import {userActions} from "../../../actions/user.actions"
import {PageDescription} from "./PageDescription"


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
        [addPaymentMethodProcessing, setAddPaymentMethodProcessing] = useState(false),
        [selectedPlan, setSelectedPlan] = useState(),
        [activateType, setActivateType] = useState(),
        [couponDetails, setCouponDetails] = useState(),

        [visibleCancelSubscriptionsWindow, setVisibleCancelSubscriptionsWindow] = useState(false),
        [visibleActivateSubscriptionsWindow, setVisibleActivateSubscriptionsWindow] = useState(false),
        [visibleAddPaymentMethodWindow, setVisibleAddPaymentMethodWindow] = useState(false),

        [processingCancelSubscription, setProcessingCancelSubscription] = useState(false)

    const user = useSelector(state => state.user)
    const importStatus = useSelector(state => state.user.importStatus)

    const amazonIsConnected = user.account_links[0].amazon_mws.is_connected === true && user.account_links[0].amazon_ppc.is_connected === true

    const disabledPage = !amazonIsConnected || (importStatus.subscription ? !importStatus.subscription.required_parts_details : true)

    const getSubscriptionsState = async () => {
        setLoadStateProcessing(true)

        try {
            const [state, info] = await Promise.all([userService.getSubscriptionsState(scope), userService.getActivateInfo({scope})])

            const currentState = state.result[scope].data,
                currentInfo = info.result[scope].data

            setSubscriptionsState(currentState)
            setActivateInfo(currentInfo)

            setVisibleActivateSubscriptionsWindow(false)
            setActivateProcessing(false)
            setVisibleCancelSubscriptionsWindow(false)

            setSelectedPlan(undefined)
        } catch (e) {
            console.log(e)
        }
        setLoadStateProcessing(false)
    }

    const subscribeHandler = async (coupon) => {
        setActivateProcessing(true)

        try {
            const res = await userService.activateSubscription({scope, type: selectedPlan, coupon})

            getSubscriptionsState()
            dispatch(userActions.getPersonalUserInfo())
        } catch (e) {
            console.log(e)
        }
    }

    const cancelSubscriptionHandler = async () => {
        setProcessingCancelSubscription(true)

        try {
            await userService.cancelSubscription({scope})
            getSubscriptionsState()
        } catch (e) {

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
                await userService.activateCoupon({coupon, scope})
                getSubscriptionsState()
            }
        } catch (e) {
            console.log(e)
        }
        setActivateCouponProcessing(false)
    }

    const selectPlanHandler = (plan, type) => {
        setSelectedPlan(plan)
        setActivateType(type)

        setVisibleActivateSubscriptionsWindow(true)
    }

    const addPaymentMethodHandler = async (card) => {
        setAddPaymentMethodProcessing(true)

        try {
            const res = await userService.addPaymentMethod({stripe_token: card.stripe_token})

            setSubscriptionsState({
                ...subscriptionsState,
                subscriptions: {
                    ...subscriptionsState.subscriptions,
                    [subscriptionsState.active_subscription_type]: {
                        ...subscriptionsState.subscriptions[subscriptionsState.active_subscription_type],
                        upcoming_invoice: {
                            ...subscriptionsState.subscriptions[subscriptionsState.active_subscription_type].upcoming_invoice,
                            payment: {
                                ...subscriptionsState.subscriptions[subscriptionsState.active_subscription_type].upcoming_invoice.payment,
                                card_last_4: res[0].last4
                            }
                        }
                    }
                }
            })
            setVisibleAddPaymentMethodWindow(false)

            setVisibleActivateSubscriptionsWindow(true)
        } catch (e) {
            console.log(e)
        }
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



