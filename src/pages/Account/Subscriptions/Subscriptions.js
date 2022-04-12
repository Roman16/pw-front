import React, {useEffect, useState} from "react"
import {subscriptionPlans} from "../../../constans/subscription.plans"
import './Subscriptions.less'
import {userService} from "../../../services/user.services"
import {CancelSubscription, ActivateSubscription} from "./modalWindows"
import {Spin} from "antd"
import {SubscriptionPlan} from './SubscriptionPlan'

import {Link} from "react-router-dom"

const Subscriptions = () => {
    const
        [scope, setScope] = useState('America'),

        [subscriptionsState, setSubscriptionsState] = useState({
            active_subscription_type: null,
        }),
        [loadStateProcessing, setLoadStateProcessing] = useState(true),
        [activateProcessing, setActivateProcessing] = useState(false),
        [selectedPlan, setSelectedPlan] = useState(),

        [visibleCancelSubscriptionsWindow, setVisibleCancelSubscriptionsWindow] = useState(false),
        [visibleActivateSubscriptionsWindow, setVisibleActivateSubscriptionsWindow] = useState(false),

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

    const subscribeHandler = async () => {
        setActivateProcessing(true)
        try {
            const res = await userService.activateSubscription({scope, type: selectedPlan})

            getSubscriptionsState()
            setSelectedPlan(undefined)
            setVisibleActivateSubscriptionsWindow(false)
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

    const selectPlanHandler = (plan) => {
        setVisibleActivateSubscriptionsWindow(true)

        setSelectedPlan(plan)
    }

    useEffect(() => {
        getSubscriptionsState()
    }, [])


    return (<>
        <section className={'subscriptions-page'}>
            <h1>Subscription</h1>
            <p className="page-description">
                This is a prepaid plan, and you are paying for the next 30 days of using it. To view your invoices,
                <Link to={'/account/billing-history'}>see billing history</Link>
            </p>

            <ul className="plans">
                {subscriptionPlans.map(plan => <SubscriptionPlan
                    plan={plan}
                    loadStateProcessing={loadStateProcessing}
                    subscriptionsState={subscriptionsState}
                    processingCancelSubscription={processingCancelSubscription}
                    activateProcessing={activateProcessing}

                    onSelect={selectPlanHandler}
                    onCloseCancelWindow={setVisibleCancelSubscriptionsWindow}
                />)}
            </ul>

            {subscriptionsState.active_subscription_type && <div className="coupon-block">
                <p>Enter coupon</p>

                <div className="form-group">
                    <input type="text" placeholder={'Your coupon'}/>
                </div>

                <button className="btn default">
                    Apply
                </button>
            </div>}
        </section>

        <CancelSubscription
            visible={visibleCancelSubscriptionsWindow}

            onClose={() => setVisibleCancelSubscriptionsWindow(false)}
            onCancelSubscription={cancelSubscriptionHandler}
        />

        {selectedPlan &&
        <ActivateSubscription
            visible={visibleActivateSubscriptionsWindow}
            plan={selectedPlan}
            state={subscriptionsState}
            scope={scope}
            processing={activateProcessing}

            onClose={() => !activateProcessing && setVisibleActivateSubscriptionsWindow(false)}
            onActivate={subscribeHandler}
        />}
    </>)
}

export default Subscriptions

