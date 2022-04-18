import React, {useEffect, useState} from "react"
import {subscriptionPlans} from "../../../constans/subscription.plans"
import './Subscriptions.less'
import './modalWindows/modalWindows.less'
import {userService} from "../../../services/user.services"
import {CancelSubscription, ActivateSubscription, ConnectAmazonAccount} from "./modalWindows"
import {SubscriptionPlan} from './SubscriptionPlan'

import {Link} from "react-router-dom"
import {useSelector} from "react-redux"
import {PageHeader} from "./PageHeader"
import {CouponField} from "./CouponField"
import {notification} from "../../../components/Notification"
import {AddPaymentMethod} from "./modalWindows/AddPaymentMethod"


const Subscriptions = () => {
    const
        [scope, setScope] = useState('America'),

        [subscriptionsState, setSubscriptionsState] = useState({
            active_subscription_type: null,
            subscriptions: {
                optimization: {},
                analytics: {},
                full: {},
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

    const amazonIsConnected = user.account_links[0].amazon_mws.is_connected === true && user.account_links[0].amazon_ppc.is_connected === true

    const getSubscriptionsState = async () => {
        setLoadStateProcessing(true)

        try {
            const [state, info] = await Promise.all([userService.getSubscriptionsState(scope), userService.getActivateInfo(scope)])

            const currentState = state.result[scope].data,
                currentInfo = info.result[scope].data

            setSubscriptionsState(currentState)
            setActivateInfo(currentInfo)
            setVisibleActivateSubscriptionsWindow(false)
            setActivateProcessing(false)

            setSelectedPlan(undefined)
        } catch (e) {
            console.log(e)
        }
        setLoadStateProcessing(false)
    }

    const subscribeHandler = async () => {
        setActivateProcessing(true)
        try {
            const res = await userService.activateSubscription({scope, type: selectedPlan})

            getSubscriptionsState()
        } catch (e) {
            console.log(e)
        }
    }

    const cancelSubscriptionHandler = async () => {
        setProcessingCancelSubscription(true)

        try {
            userService.cancelSubscription({scope})
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

        if (subscriptionsState.subscriptions[subscriptionsState.active_subscription_type].upcoming_invoice.payment.card_last_4 === null) {
            setVisibleAddPaymentMethodWindow(true)
        } else {
            setVisibleActivateSubscriptionsWindow(true)
        }
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

    useEffect(() => {
        amazonIsConnected && getSubscriptionsState()
    }, [])


    return (<>
        {amazonIsConnected && <PageHeader user={user}/>}

        <section className={'subscriptions-page'}>
            <h1>Subscription</h1>
            <p className="page-description">
                This is a prepaid plan, and you are paying for the next 30 days of using it. To view your invoices,
                <Link to={'/account/billing-history'}>see billing history</Link>
            </p>

            <ul className="plans">
                {subscriptionPlans.map(plan => <SubscriptionPlan
                    amazonIsConnected={amazonIsConnected}
                    plan={plan}
                    loadStateProcessing={loadStateProcessing}
                    subscriptionsState={subscriptionsState}
                    activationInfo={activationInfo}
                    processingCancelSubscription={processingCancelSubscription}
                    activateProcessing={activateProcessing}
                    adSpend={user.ad_spend}

                    onSelect={selectPlanHandler}
                    onCloseCancelWindow={setVisibleCancelSubscriptionsWindow}
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

            onClose={() => setVisibleCancelSubscriptionsWindow(false)}
            onCancelSubscription={cancelSubscriptionHandler}
        />

        <AddPaymentMethod
            visible={visibleAddPaymentMethodWindow}
            processing={addPaymentMethodProcessing}

            onClose={() => setVisibleAddPaymentMethodWindow(false)}
            onAddCard={addPaymentMethodHandler}
        />

        {selectedPlan &&
        <ActivateSubscription
            visible={visibleActivateSubscriptionsWindow}
            plan={selectedPlan}
            activateType={activateType}
            state={subscriptionsState}
            scope={scope}
            processing={activateProcessing}

            onClose={() => !activateProcessing && setVisibleActivateSubscriptionsWindow(false)}
            onActivate={subscribeHandler}
        />}

        <ConnectAmazonAccount
            visible={!amazonIsConnected}
        />
    </>)
}

export default Subscriptions

