import React from "react"
import {Spin} from "antd"
import moment from 'moment'
import {numberMask} from "../../../utils/numberMask"
import {SVG} from "../../../utils/icons"
import {getTotalActual} from "./modalWindows"
import {CouponDetails} from "./CouponField"

const defaultPrice = {
    optimization: {
        price: '69'
    },
    analytics: {
        price: '119'
    },
    full: {
        price: '159',
        oldPrice: '188'
    },
}

export const SubscriptionPlan = ({
                                     plan,
                                     loadStateProcessing,
                                     subscriptionsState,
                                     activateProcessing,
                                     activationInfo,
                                     disabledPage,
                                     adSpend,
                                     processingCancelSubscription,

                                     onSelect,
                                     onSetVisibleCancelWindow
                                 }) => {

    const activeSubscriptionType = subscriptionsState.active_subscription_type,
        subscriptionsStateCurrentPlan = subscriptionsState.subscriptions[plan.key]

    const isActivePlan = activeSubscriptionType === plan.key

    return (<li className={`${isActivePlan ? 'active-plan' : ''} activated-${activeSubscriptionType}-plan`}>
        {plan.key === 'full' && <div className="popular-label">most popular</div>}
        {isActivePlan && <ActivePlanLabel/>}
        <div className="col">
            <h3>
                <i><SVG id={`${plan.key}-plan-icon`}/></i>

                {plan.name}
            </h3>


            {disabledPage ? <DefaultPriceTemplate plan={plan}/> : !loadStateProcessing ? <>
                <Price
                    isActivePlan={isActivePlan}
                    plan={plan}
                    activeSubscriptionType={activeSubscriptionType}
                    activationInfo={activationInfo}
                    subscriptionsState={subscriptionsState}
                />

                <ActionButton
                    plan={plan}
                    subscriptionsState={subscriptionsState}
                    activationInfo={activationInfo}
                    activeSubscriptionType={activeSubscriptionType}

                    activateProcessing={activateProcessing}
                    processingCancelSubscription={processingCancelSubscription}

                    onSelect={onSelect}
                    onSetVisibleCancelWindow={onSetVisibleCancelWindow}
                />
            </> : <Spin/>}
        </div>

        <ul className={'plan-details'}>
            {plan.params.map((i, index) => <li>
                {(plan.key === 'full' && (index === 0 || index === 1)) ? <SVG id={'plus-plan-icon'}/> :
                    <SVG id={'check-icon'}/>}
                {(plan.key === 'full' && (index === 0 || index === 1)) ? <b>{i}</b> : i}
            </li>)}
        </ul>

        {isActivePlan && <ActivePlanDetails
            subscriptionsState={subscriptionsState}
            subscriptionsStateCurrentPlan={subscriptionsStateCurrentPlan}
            adSpend={adSpend}
        />}

        {subscriptionsStateCurrentPlan.status === 'on_grace_period' && <CanceledPlanDetails
            adSpend={adSpend}
            activateInfoCurrentPlan={activationInfo[plan.key]}
            subscriptionsStateCurrentPlan={subscriptionsStateCurrentPlan}
        />}
    </li>)
}

const ActionButton = ({plan, subscriptionsState, activeSubscriptionType, activationInfo, activateProcessing, processingCancelSubscription, onSelect, onSetVisibleCancelWindow}) => {
    const activateDetailsCurrentPlan = activationInfo[plan.key],
        subscriptionsStateActivePlan = subscriptionsState.subscriptions[activeSubscriptionType]

    if (activeSubscriptionType) {
        if (activeSubscriptionType === plan.key) {
            if (subscriptionsStateActivePlan.status === 'incomplete' ||
                subscriptionsStateActivePlan.status === 'past_due') {
                return <button
                    disabled={processingCancelSubscription}
                    className="btn grey"
                >
                    retry last payment
                </button>
            } else if (subscriptionsStateActivePlan.status === 'trialing' ||
                subscriptionsStateActivePlan.status === 'recurring' ||
                subscriptionsStateActivePlan.status === 'scheduled') {
                return <Button
                    processing={processingCancelSubscription}
                    buttonText={'Cancel'}
                    onClick={() => onSetVisibleCancelWindow(true)}
                />
            } else {
                return ''
            }
        } else if (activateDetailsCurrentPlan.expected_action === 'switch_trial') {
            return <Button
                processing={activateProcessing}
                buttonText={'Switch plan'}
                planKey={plan.key}
                onClick={() => onSelect(plan.key, 'switchTrial')}
            />
        } else {
            return <Button
                processing={activateProcessing}
                buttonText={'Switch plan'}
                planKey={plan.key}
                onClick={() => onSelect(plan.key, 'switch')}
            />
        }
    } else {
        if (activateDetailsCurrentPlan.expected_action === 'resume_subscription') {
            return <Button
                processing={activateProcessing}
                buttonText={'Resume'}
                planKey={plan.key}
                onClick={() => onSelect(plan.key, 'resume')}
            />
        } else if (activateDetailsCurrentPlan.expected_action === 'resume_trial') {
            return <Button
                processing={activateProcessing}
                buttonText={'Resume'}
                planKey={plan.key}
                onClick={() => onSelect(plan.key, 'resumeTrial')}
            />
        } else if (activateDetailsCurrentPlan.expected_action === 'start_trial') {
            return <Button
                processing={activateProcessing}
                buttonText={'Start Free Trial'}
                planKey={plan.key}
                onClick={() => onSelect(plan.key, 'trial')}
            />
        } else if ([activationInfo['optimization'], activationInfo['analytics'], activationInfo['full']].some(i => i.expected_action === 'resume_subscription')) {
            return <Button
                processing={activateProcessing}
                buttonText={'Switch plan'}
                planKey={plan.key}
                onClick={() => onSelect(plan.key, 'switch')}
            />
        } else {
            return <Button
                processing={activateProcessing}
                buttonText={'Subscribe'}
                planKey={plan.key}
                onClick={() => onSelect(plan.key, 'subscribe')}
            />
        }
    }
}

const Button = ({processing, planKey, onClick, buttonText}) => <button
    disabled={processing}
    className={`btn ${buttonText === 'Cancel' ? 'grey' : planKey === 'full' ? 'default' : 'blue'}`}
    onClick={onClick}
>
    {buttonText}
</button>


const Price = ({isActivePlan, plan, activeSubscriptionType, activationInfo, subscriptionsState}) => {
    const activateDetailsCurrentPlan = activationInfo[plan.key],
        subscriptionsStateActivePlan = subscriptionsState.subscriptions[subscriptionsState.active_subscription_type]

    const sumPrice = () => {
        if (activeSubscriptionType === null || activeSubscriptionType === 'full') {
            return (activationInfo.analytics.next_invoice.payment.subtotal + activationInfo.optimization.next_invoice.payment.subtotal) / 100
        } else {
            if (activeSubscriptionType === 'analytics') {
                return (subscriptionsStateActivePlan.upcoming_invoice.payment.subtotal + activationInfo.optimization.next_invoice.payment.subtotal) / 100
            } else {
                return (subscriptionsStateActivePlan.upcoming_invoice.payment.subtotal + activationInfo.analytics.next_invoice.payment.subtotal) / 100
            }
        }
    }

    return <div className={`price ${subscriptionsStateActivePlan?.coupon ? 'discount' : ''}`}>
        {plan.key === 'full' && <b className={'old-price'}>$<span>{sumPrice()}</span></b>}

        {subscriptionsStateActivePlan?.coupon && plan.key !== 'full' &&
        <b className={'old-price'}>$<span>{isActivePlan ? subscriptionsStateActivePlan.upcoming_invoice.payment.subtotal / 100 : activateDetailsCurrentPlan.next_invoice.payment.subtotal / 100}</span></b>}

        <b>
            ${isActivePlan ? subscriptionsStateActivePlan.upcoming_invoice.payment.total / 100 : activateDetailsCurrentPlan.next_invoice.payment.total / 100}
        </b>/ month
    </div>
}

const ActivePlanDetails = ({subscriptionsState, adSpend, subscriptionsStateCurrentPlan}) => {
    return (<div className="active-subscription-details">
        <h4>About my Subscription:</h4>

        <div className="details">
            <div className="row">
                <div className="label">Status</div>
                <div className="value">
                    {subscriptionsStateCurrentPlan.status === 'trialing' ? `Trialing, ${subscriptionsState.trial.trial_left_days} days left` :
                        <span>{subscriptionsStateCurrentPlan.status}</span>}
                </div>
            </div>
            <div className="row">
                <div className="label">Next invoice date</div>
                <div className="value">
                    {moment(subscriptionsStateCurrentPlan.upcoming_invoice.next_payment_attempt_date).format('MMM DD, YYYY')}
                </div>
            </div>
            <div className="row">
                <div className="label">Price</div>
                <div className="value">
                    ${numberMask(getTotalActual(subscriptionsStateCurrentPlan.upcoming_invoice.payment) / 100, 2)}
                </div>
            </div>

            <div className="row">
                <div className="label">Last 30-days Ad Spend</div>
                <div className="value">${numberMask(adSpend, 2)}</div>
            </div>
            <div className="row coupon-row">
                <div className="label">Coupon</div>
                <div className="value">
                    {subscriptionsStateCurrentPlan.coupon === null ? 'Not used' :
                        <>
                            <b>{subscriptionsStateCurrentPlan.coupon.name}</b>
                            <CouponDetails coupon={subscriptionsStateCurrentPlan.coupon}/>
                        </>}
                </div>
            </div>
        </div>
    </div>)
}

const CanceledPlanDetails = ({adSpend, activateInfoCurrentPlan, subscriptionsStateCurrentPlan}) => {
    const total = activateInfoCurrentPlan.next_invoice?.payment.total,
        rebate = activateInfoCurrentPlan.next_invoice?.payment.rebate || 0,
        balance = activateInfoCurrentPlan.next_invoice?.payment.balance

    return (<div className="active-subscription-details">
        <h4>About my Subscription:</h4>

        <div className="details">
            <div className="row">
                <div className="label">Status</div>
                <div className="value">
                    <span style={{color: '#FF5256'}}>Canceled</span>, ends
                    in {subscriptionsStateCurrentPlan.days_before_period_end_date} days
                </div>
            </div>
            <div className="row">
                <div className="label">Next invoice date</div>
                <div className="value">
                    N/A
                </div>
            </div>
            <div className="row">
                <div className="label">Price</div>
                <div className="value">
                    ${numberMask(Math.max(total - rebate - balance, 0) / 100, 2)}
                </div>
            </div>

            <div className="row">
                <div className="label">Last 30-days Ad Spend</div>
                <div className="value">${numberMask(adSpend, 2)}</div>
            </div>
            <div className="row">
                <div className="label">Coupon</div>
                <div className="value">
                    ---
                </div>
            </div>
        </div>
    </div>)

}

const DefaultPriceTemplate = ({plan}) => {
    return (
        <>
            <div className={'price'}>
                {defaultPrice[plan.key].oldPrice &&
                <b className={'old-price'}>$<span>{defaultPrice[plan.key].oldPrice}</span></b>}
                <b>${defaultPrice[plan.key].price}</b>/ month
            </div>

            <button
                className={`btn ${plan.key === 'full' ? 'default' : 'blue'}`}
            >
                Try it free
            </button>
        </>
    )
}


const ActivePlanLabel = () => <div className="active-label">
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none"
         xmlns="http://www.w3.org/2000/svg">
        <path d="M62 2H4L62 60V2Z" fill="#6959AB"/>
        <path
            d="M62 2H63.5V0.5H62V2ZM4 2V0.5H0.37868L2.93934 3.06066L4 2ZM62 60L60.9393 61.0607L63.5 63.6213V60H62ZM4 3.5H62V0.5H4V3.5ZM60.5 2V60H63.5V2H60.5ZM2.93934 3.06066L60.9393 61.0607L63.0607 58.9393L5.06066 0.93934L2.93934 3.06066Z"
            fill="#6959AB"/>
        <path d="M37 21.9259L41.4444 26L50.3333 16" stroke="white" stroke-width="3" stroke-linecap="round"
              stroke-linejoin="round"/>
    </svg>
</div>



