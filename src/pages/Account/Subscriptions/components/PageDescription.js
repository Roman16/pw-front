import _ from "lodash"
import {subscriptionPlans} from "../../../../constans/subscription.plans"
import {Link} from "react-router-dom"
import React from "react"

export const PageDescription = ({subscriptionState, disabledPage}) => {
    const planName = _.find(subscriptionPlans, {key: subscriptionState.active_subscription_type})?.name,
        subscriptions = subscriptionState.subscriptions

    if (disabledPage) {
        return <p className="page-description">
            This is a prepaid plan, and you are paying for the next 30 days of using it. <br/>
            To view your invoices, <Link to={'/account/billing-history'}>see billing history</Link>.
        </p>
    } else if (subscriptionState.active_subscription_type === null) {
        if (subscriptionState.trial.can_start_trial) {
            return <p className="page-description">
                All subscription plans come with 14-day FREE TRIAL with FULL access to PPC Automation and Analytics
                tools. You only select a plan that will be active after Free Trial ends. No credit card required to
                start your Free Trial.
            </p>
        } else if ([subscriptions['optimization'], subscriptions['analytics'], subscriptions['full']].some(i => i?.expected_action === 'resume_subscription')) {
            return <p className="page-description">
                You have canceled your subscriptions and will lose access to the software when each prepaid plan you
                have purchased will reach the end of its billing cycle. Renew your subscription to keep using
                software. <br/>
                To view your invoices, <Link to={'/account/billing-history'}>see billing history</Link>.
            </p>
        } else if (!subscriptionState.trial.can_start_trial && [subscriptions['optimization'], subscriptions['analytics'], subscriptions['full']].some(i => i?.expected_action === 'resume_trial')) {
            return <p className="page-description">
                You are currently on a Free Trial and have full access to PPC Automation and Analytics tools. Free
                Trial ends in <b> {subscriptionState.trial.trial_left_days || 0} </b> days. You have canceled your subscription
                plan,
                thus you will lose access to the software when Free Trial ends. You can renew your subscription that
                will be active after Free Trial at any time.
            </p>
        } else if (!subscriptionState.trial.can_start_trial) {
            return <p className="page-description">
                Select subscription plan that suits you the best. All plans are prepaid, and you are paying for the
                next month of using it. <br/>
                To view your invoices, <Link to={'/account/billing-history'}>see billing history</Link>.
            </p>
        } else return ''
    } else if (subscriptionState.active_subscription_type) {
        if (subscriptions[subscriptionState.active_subscription_type].status === 'incomplete' || subscriptions[subscriptionState.active_subscription_type].status === 'past_due') {
            return <p className="page-description">
                There is a problem with your current subscription and you may lose access to the software, check details
                in <b>About my subscription</b> block.
                <br/>
                You are currently on a {planName} plan that renews automatically each month unless canceled. To view
                your invoices, <Link to={'/account/billing-history'}>see billing history</Link>.
            </p>
        } else if (subscriptionState.trial.trial_active) {
            return <p className="page-description">
                You are currently on a Free Trial and have full access to PPC Automation and Analytics tools. After
                Free Trial ends, you will be set to the {planName} subscription plan, renewing
                automatically each month unless canceled. You can change your subscription plan that will be active
                after Free Trial without any drawbacks.
            </p>
        } else if (subscriptionState.active_subscription_type === 'optimization') {
            return <p className="page-description">
                You are currently on a {planName} plan that renews automatically each month unless canceled. On this
                plan you are missing out on Analytics features we provide. We suggest switching to Combo plan to grow
                your business with full suite of tools we have to offer. <br/>
                To view your invoices, <Link to={'/account/billing-history'}>see billing history</Link>.
            </p>
        } else if (subscriptionState.active_subscription_type === 'analytics') {
            return <p className="page-description">
                You are currently on a {planName} plan that renews automatically each month unless canceled. On this
                plan you are missing out on PPC Automation features we provide. We suggest switching to Combo plan to
                grow your business with full suite of tools we have to offer. <br/>
                To view your invoices, <Link to={'/account/billing-history'}>see billing history</Link>.
            </p>
        } else {
            return <p className="page-description">
                You are currently on a {planName} plan that renews automatically each month unless canceled. <br/>
                To view your invoices, <Link to={'/account/billing-history'}>see billing history</Link>.
            </p>
        }
    } else {
        return ''
    }

}
