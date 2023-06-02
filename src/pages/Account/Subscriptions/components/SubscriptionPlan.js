import React, {useState} from "react"
import {Select, Spin} from "antd"
import moment from 'moment'
import {numberMask} from "../../../../utils/numberMask"
import {SVG} from "../../../../utils/icons"
import {getTotalActual} from "../modalWindows"
import {CouponDetails} from "./CouponField"
import CustomSelect from "../../../../components/Select/Select"
import _ from 'lodash'

const Option = Select.Option

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
                                     subscriptionState,
                                     activateProcessing,
                                     disabledPage,
                                     adSpend,
                                     processingCancelSubscription,
                                     retryProcessing,
                                     paymentMethodList,

                                     onSelect,
                                     onSetVisibleCancelWindow,
                                     onRetryPayment,
                                     onChangePaymentMethod
                                 }) => {

    const activeSubscriptionType = subscriptionState.active_subscription_type,
        subscriptionStateCurrentPlan = subscriptionState.subscriptions[plan.key]

    const isActivePlan = activeSubscriptionType === plan.key

    const hasIncomplete = [subscriptionState.subscriptions['optimization'], subscriptionState.subscriptions['analytics'], subscriptionState.subscriptions['full']].some(i => i?.status === 'incomplete' || i?.status === 'past_due')

    return (
        <li className={`${isActivePlan ? 'active-plan' : ''} activated-${activeSubscriptionType}-plan ${hasIncomplete ? 'incomplete' : ''}`}>
            {plan.key === 'full' && <div className="popular-label">most popular</div>}
            {(isActivePlan || subscriptionStateCurrentPlan.status === 'incomplete') && <ActivePlanLabel/>}
            <div className="col">
                <h3>
                    <i><SVG id={`${plan.key}-plan-icon`}/></i>

                    {plan.name}
                </h3>


                {disabledPage ? <DefaultPriceTemplate plan={plan}/> : !loadStateProcessing ? <>
                    <Price
                        plan={plan}
                        isActivePlan={isActivePlan}
                        subscriptionState={subscriptionState}
                    />

                    <ActionButton
                        plan={plan}
                        subscriptionState={subscriptionState}
                        activeSubscriptionType={activeSubscriptionType}

                        activateProcessing={activateProcessing}
                        processingCancelSubscription={processingCancelSubscription}
                        retryProcessing={retryProcessing}

                        onSelect={onSelect}
                        onSetVisibleCancelWindow={onSetVisibleCancelWindow}
                        onRetryPayment={onRetryPayment}
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


            {(subscriptionStateCurrentPlan.status === 'on_grace_period' ||
                subscriptionStateCurrentPlan.status === 'incomplete' ||
                subscriptionStateCurrentPlan.status === 'past_due') ?
                <CanceledPlanDetails
                    adSpend={adSpend}
                    subscriptionStateCurrentPlan={subscriptionStateCurrentPlan}
                /> : (isActivePlan) ? <ActivePlanDetails
                    subscriptionState={subscriptionState}
                    subscriptionStateCurrentPlan={subscriptionStateCurrentPlan}
                    adSpend={adSpend}
                    paymentMethodList={paymentMethodList}

                    onChangePaymentMethod={onChangePaymentMethod}
                /> : ''}
        </li>)
}

const ActionButton = ({
                          plan,
                          subscriptionState,
                          activeSubscriptionType,
                          retryProcessing,
                          activateProcessing,
                          processingCancelSubscription,
                          onSelect,
                          onSetVisibleCancelWindow,
                          onRetryPayment
                      }) => {

    const subscriptionStateCurrentPlan = subscriptionState.subscriptions[plan.key],
        subscriptionStateActivePlan = subscriptionState.subscriptions[activeSubscriptionType],
        subscriptions = subscriptionState.subscriptions

    if (activeSubscriptionType) {
        if (activeSubscriptionType === plan.key) {
            if (subscriptionStateCurrentPlan.status === 'incomplete' ||
                subscriptionStateCurrentPlan.status === 'past_due') {
                return <div className="action-buttons">
                    <Button
                        processing={retryProcessing}
                        processingSpin
                        buttonText={'Retry Payment'}
                        planKey={plan.key}

                        onClick={() => onRetryPayment(subscriptionStateCurrentPlan.incomplete_payment)}
                    />

                    <Button
                        processing={processingCancelSubscription}
                        buttonText={'Cancel'}
                        onClick={() => {
                            onSelect(plan.key, 'cancel')
                            onSetVisibleCancelWindow(true)
                        }}
                    />
                </div>
            } else if (subscriptionStateActivePlan.status === 'trialing' ||
                subscriptionStateActivePlan.status === 'recurring' ||
                subscriptionStateActivePlan.status === 'scheduled') {
                return <Button
                    processing={processingCancelSubscription}
                    buttonText={'Cancel'}
                    onClick={() => onSetVisibleCancelWindow(true)}
                />
            } else {
                return ''
            }
        } else if (subscriptionStateCurrentPlan.expected_action === 'switch_trial') {
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
        if (subscriptionStateCurrentPlan.expected_action === 'resume_subscription') {
            return <Button
                processing={activateProcessing}
                buttonText={'Resume'}
                planKey={plan.key}
                onClick={() => onSelect(plan.key, 'resume')}
            />
        } else if (subscriptionStateCurrentPlan.expected_action === 'resume_trial') {
            return <Button
                processing={activateProcessing}
                buttonText={'Resume'}
                planKey={plan.key}
                onClick={() => onSelect(plan.key, 'resumeTrial')}
            />
        } else if (subscriptionStateCurrentPlan.expected_action === 'start_trial') {
            return <Button
                processing={activateProcessing}
                buttonText={'Start Free Trial'}
                planKey={plan.key}
                onClick={() => onSelect(plan.key, 'trial')}
            />
        } else if ([subscriptions['optimization'], subscriptions['analytics'], subscriptions['full']].some(i => i?.expected_action === 'resume_subscription')) {
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

const Button = ({processing, processingSpin, planKey, onClick, buttonText}) => <button
    disabled={processing}
    className={`btn ${buttonText === 'Cancel' ? 'grey' : planKey === 'full' ? 'default' : 'blue'}`}
    onClick={onClick}
>
    {buttonText}

    {processing && processingSpin && <Spin size={'small'}/>}
</button>


const Price = ({isActivePlan, plan, subscriptionState}) => {
    const subscriptionsStateCurrentPlan = subscriptionState.subscriptions[plan.key]

    const sumPrice = () => {
        return (subscriptionState.subscriptions.analytics.next_invoice.payment.subtotal + subscriptionState.subscriptions.optimization.next_invoice.payment.subtotal) / 100
    }

    return <div className={`price ${(subscriptionsStateCurrentPlan?.coupon && isActivePlan) ? 'discount' : ''}`}>
        {plan.key === 'full' && (sumPrice() > subscriptionsStateCurrentPlan.next_invoice.payment.total / 100) &&
        <b className={'old-price'}>$<span>{sumPrice()}</span></b>}

        {(subscriptionsStateCurrentPlan.coupon && isActivePlan && plan.key !== 'full') && (subscriptionsStateCurrentPlan.next_invoice.payment.subtotal > subscriptionsStateCurrentPlan.next_invoice.payment.total) &&
        <b className={'old-price'}>$<span>{subscriptionsStateCurrentPlan.next_invoice.payment.subtotal / 100}</span></b>}

        <b>
            ${subscriptionsStateCurrentPlan.next_invoice.payment.total / 100}
        </b>/ month
    </div>
}

const ActivePlanDetails = ({subscriptionState, adSpend, subscriptionStateCurrentPlan, paymentMethodList, onChangePaymentMethod}) => {
    const [saveProcessing, setSaveProcessing] = useState(false)

    const statusValue = () => {
        if (subscriptionStateCurrentPlan.status === 'trialing') {
            return `Trialing, ${subscriptionState.trial.days_before_trial_end_date} days left`
        } else {
            return <span>{subscriptionStateCurrentPlan.status}</span>
        }
    }

    return (<div className="active-subscription-details">
        <h4>About my Subscription:</h4>

        <div className="details">
            <div className="row">
                <div className="label">Status</div>
                <div className="value">
                    {statusValue()}
                </div>
            </div>
            <div className="row">
                <div className="label">Next invoice date</div>
                <div className="value">
                    {moment(subscriptionStateCurrentPlan.upcoming_invoice.next_payment_attempt_date).format('MMM DD, YYYY')}
                </div>
            </div>
            <div className="row">
                <div className="label">Price</div>
                <div className="value">
                    ${numberMask(getTotalActual(subscriptionStateCurrentPlan.upcoming_invoice.payment) / 100, 2)}
                </div>
            </div>

            <div className="row">
                <div className="label">Last 30-days Ad Spend</div>
                <div className="value">${numberMask(adSpend, 0)}</div>
            </div>

            <div className="row coupon-row">
                <div className="label">Coupon</div>
                <div className="value">
                    {subscriptionStateCurrentPlan.coupon === null ? 'Not used' :
                        <>
                            <b>{subscriptionStateCurrentPlan.coupon.name}</b>
                            <CouponDetails coupon={subscriptionStateCurrentPlan.coupon}/>
                        </>}
                </div>
            </div>

            {/*<div className="row payment-method-row">*/}
            {/*    <div className="label">Payment method</div>*/}
            {/*    <div className="value">*/}
            {/*        <CustomSelect*/}
            {/*            getPopupContainer={trigger => trigger.parentNode}*/}
            {/*            onChange={(value) => {*/}
            {/*                setSaveProcessing(true)*/}
            {/*                onChangePaymentMethod(value, () => setSaveProcessing(false))*/}
            {/*            }}*/}

            {/*            value={subscriptionStateCurrentPlan.default_payment_method === null ? null : subscriptionStateCurrentPlan.default_payment_method.payment_method_id}*/}
            {/*        >*/}
            {/*            <Option value={null}>Default card</Option>*/}
            {/*            {paymentMethodList.map(i => <Option value={i.id}>**** {i.last4}</Option>)}*/}
            {/*        </CustomSelect>*/}
            {/*        {saveProcessing && <Spin size={'small'}/>}*/}

            {/*        /!*{subscriptionStateCurrentPlan.default_payment_method === null && <p>Default card</p>}*!/*/}
            {/*    </div>*/}
            {/*</div>*/}

        </div>
    </div>)
}

const CanceledPlanDetails = ({adSpend, subscriptionStateCurrentPlan}) => {
    const total = subscriptionStateCurrentPlan?.next_invoice?.payment.total,
        rebate = subscriptionStateCurrentPlan?.next_invoice?.payment.rebate || 0,
        balance = subscriptionStateCurrentPlan?.next_invoice?.payment.balance

    const incompletePayment = subscriptionStateCurrentPlan.status === 'incomplete' || subscriptionStateCurrentPlan.status === 'past_due'

    return (<div className="active-subscription-details">
        <h4>About my Subscription:</h4>

        <div className="details">
            <div className="row">
                <div className="label">Status</div>
                <div className="value">
                    {incompletePayment ? <span className="incomplete-payment">
                    Waiting for payment
                    </span> : <>  <span style={{color: '#FF5256'}}>Canceled</span>, ends
                        in {subscriptionStateCurrentPlan.days_before_period_end_date} days</>}
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
            <div className="row coupon-row">
                <div className="label">Coupon</div>
                <div className="value">
                    {subscriptionStateCurrentPlan.coupon === null ? '---' :
                        <>
                            <b>{subscriptionStateCurrentPlan.coupon.name}</b>
                            <CouponDetails coupon={subscriptionStateCurrentPlan.coupon}/>
                        </>}
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



