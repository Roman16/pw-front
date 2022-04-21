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


const PageDescription = ({state, activationInfo, disabledPage}) => {
    const planName = _.find(subscriptionPlans, {key: state.active_subscription_type})?.name

    if (disabledPage) {
        return <p className="page-description">
            This is a prepaid plan, and you are paying
            for the next 30 days of using it. To view your invoices, see <Link
            to={'/account/billing-history'}>billing history</Link>.
        </p>
    } else if (state.active_subscription_type === null && state.trial.can_start_trial) {
        return <p className="page-description">
            All subscription plans come with 14-day FREE TRIAL with FULL access to PPC Automation and Analytics
            tools. <br/> You only select a plan that will be active after Free Trial ends. No credit card required to
            start your Free Trial.
        </p>
    } else if (state.active_subscription_type === null && [activationInfo['optimization'], activationInfo['analytics'], activationInfo['full']].some(i => i.expected_action === 'resume_subscription')) {
        return <p className="page-description">
            You are currently on a [имя плана] plan that ends in [колво оставшихся дней подписки] days. You have
            canceled your subscription and will lose access to the software when current billing period ends. Renew your
            subscription to keep using software after current billing period. To view your invoices, see <Link
            to={'/account/billing-history'}>billing history</Link>.
        </p>
    } else if (state.active_subscription_type === null && !state.trial.can_start_trial && [state.subscriptions['optimization'], state.subscriptions['analytics'], state.subscriptions['full']].some(i => i.status === 'trialing_canceled')) {
        return <p className="page-description">
            You are currently on a Free Trial and have full access to PPC Automation and Analytics tools. You have
            canceled your {} subscription plan, thus you will lose access to the software when
            Free Trial ends. You can renew your subscription that will be active after Free Trial at any time.
        </p>
    } else if (state.active_subscription_type === null && !state.trial.can_start_trial) {
        return <p className="page-description">
            Select subscription plan that suits you the best. All plans are prepaid, and you are paying for the next
            month of using it. <br/> To view your invoices, see <Link
            to={'/account/billing-history'}>billing history</Link>.
        </p>
    } else if (state.active_subscription_type) {
        if (state.trial.trial_active) {
            return <p className="page-description">
                You are currently on a Free Trial and have full access to PPC Automation and Analytics tools. After Free
                Trial ends, you will be set to the {planName} subscription plan, renewing automatically each month
                unless canceled. You can change your subscription plan that will be active after Free Trial without any
                drawbacks.
            </p>
        } else if (state.active_subscription_type === 'optimization') {
            return <p className="page-description">
                You are currently on a {planName} plan that renews automatically each month unless canceled. On this
                plan you are missing out on Analytics features we provide. We suggest switching to Combo plan to grow
                your business with full suite of tools we have to offer. <br/> To view your invoices, see <Link
                to={'/account/billing-history'}>billing history</Link>.
            </p>
        } else if (state.active_subscription_type === 'analytics') {
            return <p className="page-description">
                You are currently on a {planName} plan that renews automatically each month unless canceled. On this
                plan you are missing out on PPC Automation features we provide. We suggest switching to Combo plan to
                grow your business with full suite of tools we have to offer. <br/> To view your invoices, see <Link
                to={'/account/billing-history'}>billing history</Link>.
            </p>
        } else {
            return <p className="page-description">
                You are currently on a {planName} plan that renews automatically each month unless canceled. <br/> To
                view
                your invoices, see <Link to={'/account/billing-history'}>billing history</Link>.
            </p>
        }
    } else {
        return ''
    }

}

