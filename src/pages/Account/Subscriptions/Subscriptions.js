import React, {useEffect, useState} from "react"
import {subscriptionPlans} from "../../../constans/subscription.plans"
import './Subscriptions.less'
import {userService} from "../../../services/user.services"
import {CancelSubscriptionWindow} from "./modalWindows/CancelSubscriptionWindow"

export const Subscriptions = () => {
    const [subscriptionsState, setSubscriptionsState] = useState(),
        [scope, setScope] = useState('America'),
        [visibleCancelSubscriptionsWindow, setVisibleCancelSubscriptionsWindow] = useState(false),
        [processingCancelSubscription, setProcessingCancelSubscription] = useState(false)

    const getSubscriptionsState = async () => {
        try {
            const {result} = userService.getSubscriptionsState(scope)

            setSubscriptionsState(result)
            console.log(result)
        } catch (e) {
            console.log(e)
        }
    }

    const subscribeHandler = async (plan) => {
        try {

        } catch (e) {
            console.log(e)
        }
    }

    const getActivateInfo = async () => {
        try {
            const {result} = userService.getActivateInfo(scope)
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

    return (<>
        <section className={'subscriptions-page'}>

            <ul className="plans">
                {subscriptionPlans.map(plan => <li>
                    <h3>{plan.name}</h3>

                    <button className="btn default" onClick={() => subscribeHandler(plan.key)}>
                        Subscribe
                    </button>
                </li>)}
            </ul>

            <button
                disabled={processingCancelSubscription}
                className="btn grey" onClick={() => setVisibleCancelSubscriptionsWindow(true)}
            >
                Cancel subscription
            </button>

        </section>

        <CancelSubscriptionWindow
            visible={visibleCancelSubscriptionsWindow}

            onClose={() => setVisibleCancelSubscriptionsWindow(false)}
            onCancelSubscription={cancelSubscriptionHandler}
        />
    </>)
}

