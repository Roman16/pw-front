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
import LoadingAmazonAccount from "../../../components/ModalWindow/PWWindows/LoadingAmazonAccountWindow"
import ModalWindow from "../../../components/ModalWindow/ModalWindow"
import _ from "lodash"


const Subscriptions = () => {
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

    const disabledPage = !amazonIsConnected || !importStatus.subscription.required_parts_details

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
            await userService.cancelSubscription({scope})
            setVisibleCancelSubscriptionsWindow(false)
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

        if (activationInfo[plan].next_invoice.payment.card_last_4 === null) {
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


            <PageDescription state={subscriptionsState}/>

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
            state={subscriptionsState}

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
            adSpend={user.ad_spend}

            onClose={() => !activateProcessing && setVisibleActivateSubscriptionsWindow(false)}
            onActivate={subscribeHandler}
        />}

        <ConnectAmazonAccount
            visible={!amazonIsConnected}
        />

        <LoadingAmazonAccount
            pathname={'/account/subscriptions'}
            visible={!importStatus.subscription.required_parts_ready}
            importStatus={importStatus}
            lastName={user.user.last_name}
            firstName={user.user.name}
            productList={[]}
            container={() => document.querySelector('.account-content')}
        />
    </>)
}

export default Subscriptions


const PageDescription = ({state}) => {
    const planName = _.find(subscriptionPlans, {key: state.active_subscription_type})?.name

    if (state.active_subscription_type === null && state.trial.can_start_trial) {
        return <p className="page-description">
            All subscription plans come with 14-day FREE TRIAL with FULL access to PPC Automation and Analytics
            tools. <br/> You only select a plan that will be active after Free Trial ends. No credit card required to
            start your Free Trial.
        </p>
    } else if (state.active_subscription_type) {
        if (state.active_subscription_type === 'optimization') {
            return <p className="page-description">
                You are currently on a {planName} plan that renews automatically each month unless canceled. On this
                plan you are missing out on Analytics features we provide. We suggest switching to Combo plan to grow
                your business with full suite of tools we have to offer. To view your invoices, see <Link
                to={'/account/billing-history'}>billing history</Link>.
            </p>
        } else if (state.active_subscription_type === 'analytics') {
            return <p className="page-description">
                You are currently on a {planName} plan that renews automatically each month unless canceled. On this
                plan you are missing out on PPC Automation features we provide. We suggest switching to Combo plan to
                grow your business with full suite of tools we have to offer. To view your invoices, see <Link
                to={'/account/billing-history'}>billing history</Link>.
            </p>
        } else {
            return <p className="page-description">
                You are currently on a {planName} plan that renews automatically each month unless canceled. To view
                your invoices, see <Link to={'/account/billing-history'}>billing history</Link>.
            </p>
        }
    } else {
        return ''
    }

}

