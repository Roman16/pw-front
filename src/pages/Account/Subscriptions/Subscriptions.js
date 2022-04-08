import React, {useEffect, useState} from "react"
import {subscriptionPlans} from "../../../constans/subscription.plans"
import './Subscriptions.less'
import {userService} from "../../../services/user.services"
import {CancelSubscriptionWindow} from "./modalWindows/CancelSubscriptionWindow"
import {Spin} from "antd"

const Subscriptions = () => {
    const [subscriptionsState, setSubscriptionsState] = useState({
            active_subscription_type: null,
        }),
        [loadStateProcessing, setLoadStateProcessing] = useState(true),
        [activateProcessing, setActivateProcessing] = useState(false),

        [scope, setScope] = useState('America'),
        [visibleCancelSubscriptionsWindow, setVisibleCancelSubscriptionsWindow] = useState(false),
        [processingCancelSubscription, setProcessingCancelSubscription] = useState(false)

    const getSubscriptionsState = async () => {
        setLoadStateProcessing(true)

        try {
            const [state, info] = await Promise.all([userService.getSubscriptionsState(scope), userService.getActivateInfo(scope)])

            const currentState = state.result[scope].data,
                currentInfo = info.result[scope].data

            setSubscriptionsState({
                ...currentState,
                subscriptions: {
                    analytics: {
                        ...currentState.subscriptions.analytics,
                        upcoming_invoice: currentState.subscriptions.analytics.upcoming_invoice || currentInfo.analytics.next_invoice
                    },
                    full: {
                        ...currentState.subscriptions.full,
                        upcoming_invoice: currentState.subscriptions.full.upcoming_invoice || currentInfo.full.next_invoice
                    },
                    optimization: {
                        ...currentState.subscriptions.optimization,
                        upcoming_invoice: currentState.subscriptions.optimization.upcoming_invoice || currentInfo.optimization.next_invoice
                    },
                }
            })
        } catch (e) {
            console.log(e)
        }
        setLoadStateProcessing(false)
    }

    const subscribeHandler = async (type) => {
        setActivateProcessing(true)
        try {
            const res = await userService.activateSubscription({scope, type})

            getSubscriptionsState()
        } catch (e) {
            console.log(e)
        }
        setActivateProcessing(false)
    }

    const getActivateInfo = async () => {
        try {
            const {result} = userService.getActivateInfo(scope)
            console.log(result)
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
        try {
            const {result} = userService.getCouponInfo(coupon)

        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getSubscriptionsState()
    }, [])

    console.log(subscriptionsState)

    return (<>
        <section className={'subscriptions-page'}>
            <ul className="plans">
                {subscriptionPlans.map(plan => <li>
                    <h3>{plan.name}</h3>

                    {!loadStateProcessing ? <>
                        <h4>- ${subscriptionsState.subscriptions[plan.key].upcoming_invoice.amount}</h4>

                        {subscriptionsState.active_subscription_type === plan.key ?
                            <button
                                disabled={processingCancelSubscription}
                                className="btn grey" onClick={() => setVisibleCancelSubscriptionsWindow(true)}
                            >
                                Cancel subscription
                            </button>
                            :
                            <button
                                disabled={activateProcessing}
                                className="btn default"
                                onClick={() => subscribeHandler(plan.key)}
                            >
                                {subscriptionsState.trial.can_start_trial ? 'Start  Free Trial' : subscriptionsState.active_subscription_type ? 'Switch' : 'Subscribe'}
                            </button>
                        }
                    </> : <Spin/>}
                </li>)}
            </ul>
        </section>

        <CancelSubscriptionWindow
            visible={visibleCancelSubscriptionsWindow}

            onClose={() => setVisibleCancelSubscriptionsWindow(false)}
            onCancelSubscription={cancelSubscriptionHandler}
        />
    </>)
}

export default Subscriptions

