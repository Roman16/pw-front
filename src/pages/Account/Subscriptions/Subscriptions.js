import React, {useEffect, useState} from "react"
import {subscriptionPlans} from "../../../constans/subscription.plans"
import './Subscriptions.less'
import {userService} from "../../../services/user.services"
import {CancelSubscription, ActivateSubscription, ConnectAmazonAccount} from "./modalWindows"
import {SubscriptionPlan} from './SubscriptionPlan'

import {Link} from "react-router-dom"
import {useSelector} from "react-redux"

let timerId

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
        [selectedPlan, setSelectedPlan] = useState(),
        [activateType, setActivateType] = useState(),
        [couponDetails, setCouponDetails] = useState(),

        [visibleCancelSubscriptionsWindow, setVisibleCancelSubscriptionsWindow] = useState(false),
        [visibleActivateSubscriptionsWindow, setVisibleActivateSubscriptionsWindow] = useState(false),

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
            setCouponDetails(result)
        } catch (e) {
            console.log(e)
        }
    }

    const changeCouponHandler = ({target: {value}}) => {
        clearTimeout(timerId)
        timerId = setTimeout(() => {
            getCouponInfo(value)
        }, 500)
    }

    const selectPlanHandler = (plan, type) => {
        setActivateType(type)
        setVisibleActivateSubscriptionsWindow(true)
        setSelectedPlan(plan)
    }

    useEffect(() => {
        if(user.account_links[0].amazon_mws.is_connected === true || user.account_links[0].amazon_ppc.is_connected === true) {
            getSubscriptionsState()
        }
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
                    amazonIsConnected={amazonIsConnected}
                    plan={plan}
                    loadStateProcessing={loadStateProcessing}
                    subscriptionsState={subscriptionsState}
                    activationInfo={activationInfo}
                    processingCancelSubscription={processingCancelSubscription}
                    activateProcessing={activateProcessing}

                    onSelect={selectPlanHandler}
                    onCloseCancelWindow={setVisibleCancelSubscriptionsWindow}
                />)}
            </ul>

            {subscriptionsState.active_subscription_type && <div className="coupon-block">
                <p>Enter coupon</p>

                <div className="form-group">
                    <input
                        type="text"
                        placeholder={'Your coupon'}
                        onChange={changeCouponHandler}
                    />
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

