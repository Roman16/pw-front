import React from "react"
import {Spin} from "antd"
import moment from 'moment'
import {numberMask} from "../../../utils/numberMask"

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
                                     processingCancelSubscription,
                                     activateProcessing,
                                     activationInfo,
                                     disabledPage,
                                     adSpend,

                                     onSelect,
                                     onCloseCancelWindow
                                 }) => {

    const activeSubscriptionType = subscriptionsState.active_subscription_type,
        planDetails = subscriptionsState.subscriptions[plan.key],
        activateDetails = activationInfo[plan.key],
        activePlanDetails = subscriptionsState.subscriptions[activeSubscriptionType]

    const isActivePlan = activeSubscriptionType === plan.key

    const actionButton = () => {
        if (activeSubscriptionType === plan.key) {
            if (planDetails.status === 'incomplete' || planDetails.status === 'past_due') {
                return <button
                    disabled={processingCancelSubscription}
                    className="btn grey"
                >
                    retry last payment
                </button>

            } else if (planDetails.status === 'trialing' || planDetails.status === 'recurring' || planDetails.status === 'scheduled') {
                return <button
                    disabled={processingCancelSubscription}
                    className="btn grey" onClick={() => onCloseCancelWindow(true)}
                >
                    Cancel
                </button>
            } else {
                return ''
            }
        } else {
            if (activateDetails.expected_action === 'start_trial') {
                return <button
                    disabled={activateProcessing}
                    className={`btn ${plan.key === 'full' ? 'default' : 'blue'}`}
                    onClick={() => onSelect(plan.key, 'trial')}
                >
                    Start Free Trial
                </button>
            } else if ((activateDetails.expected_action === 'resume_subscription' || planDetails.status === 'trialing_canceled') && activeSubscriptionType === null) {
                return <button
                    disabled={activateProcessing}
                    className={`btn ${plan.key === 'full' ? 'default' : 'blue'}`}
                    onClick={() => onSelect(plan.key, 'resume')}
                >
                    Resume
                </button>
            } else if (activateDetails.expected_action === 'switch_trial' || activateDetails.expected_action === 'resume_trial') {
                return <button
                    disabled={activateProcessing}
                    className={`btn ${plan.key === 'full' ? 'default' : 'blue'}`}
                    onClick={() => onSelect(plan.key, 'switchTrial')}
                >
                    Switch plan
                </button>
            } else if (activeSubscriptionType === null && [activationInfo['optimization'], activationInfo['analytics'], activationInfo['full']].some(i => i.expected_action === 'resume_subscription')) {
                return <button
                    disabled={activateProcessing}
                    className={`btn ${plan.key === 'full' ? 'default' : 'blue'}`}
                    onClick={() => onSelect(plan.key, 'switch')}
                >
                    Switch plan
                </button>
            } else if (activeSubscriptionType === null) {
                return <button
                    disabled={activateProcessing}
                    className={`btn ${plan.key === 'full' ? 'default' : 'blue'}`}
                    onClick={() => onSelect(plan.key, 'subscribe')}
                >
                    Subscribe
                </button>
            } else {
                return <button
                    disabled={activateProcessing}
                    className={`btn ${plan.key === 'full' ? 'default' : 'blue'}`}
                    onClick={() => onSelect(plan.key, 'switch')}
                >
                    Switch plan
                </button>
            }
        }
    }

    return (<li className={`${isActivePlan ? 'active-plan' : ''} activated-${activeSubscriptionType}-plan`}>
        {plan.key === 'full' && <div className="popular-label">most popular</div>}
        {isActivePlan && <ActivePlanLabel/>}
        <div className="col">
            <h3>
                <i dangerouslySetInnerHTML={{__html: planIcon[plan.key]}}/>

                {plan.name}
            </h3>


            {disabledPage ? <DefaultPriceTemplate plan={plan}/> : !loadStateProcessing ? <>
                <Price
                    activeSubscriptionType={activeSubscriptionType}
                    isActivePlan={isActivePlan}
                    plan={plan}
                    planDetails={planDetails}
                    activateDetails={activateDetails}
                    disabledPage={disabledPage}
                    activationInfo={activationInfo}
                    activePlanDetails={activePlanDetails}
                />

                {actionButton()}
            </> : <Spin/>}
        </div>

        <ul className={'plan-details'}>
            {plan.params.map((i, index) => <li>
                {(plan.key === 'full' && (index === 0 || index === 1)) ? <PlusIcon/> : <CheckIcon/>}
                {(plan.key === 'full' && (index === 0 || index === 1)) ? <b>{i}</b> : i}
            </li>)}
        </ul>

        {(isActivePlan || planDetails.status === 'trialing_canceled') && <ActivePlanDetails
            planDetails={planDetails}
            subscriptionsState={subscriptionsState}
            adSpend={adSpend}
            activationInfo={activationInfo}
            plan={plan}
        />}
    </li>)
}

const Price = ({activeSubscriptionType, isActivePlan, plan, planDetails, activateDetails, activationInfo, activePlanDetails}) => {

    const sumPrice = () => {
        if (activeSubscriptionType === null) {
            return (activationInfo.analytics.next_invoice.payment.subtotal + activationInfo.optimization.next_invoice.payment.subtotal) / 100
        } else {
            if (activeSubscriptionType === 'analytics') {
                return (activePlanDetails.upcoming_invoice.payment.subtotal + activationInfo.optimization.next_invoice.payment.subtotal) / 100
            } else {
                return (activePlanDetails.upcoming_invoice.payment.subtotal + activationInfo.analytics.next_invoice.payment.subtotal) / 100
            }
        }
    }

    return <div className={'price'}>
        {plan.key === 'full' && <b className={'old-price'}>$<span>{sumPrice()}</span></b>}

        <b>${isActivePlan ? planDetails.upcoming_invoice.payment.subtotal / 100 : activateDetails.next_invoice.payment.subtotal / 100}</b>/
        month
    </div>
}

const ActivePlanDetails = ({planDetails, subscriptionsState, adSpend, activationInfo, plan}) => {

    if (planDetails.status === 'trialing_canceled') {
        return (<div className="active-subscription-details">
            <h4>About my Subscription:</h4>

            <div className="details">
                <div className="row">
                    <div className="label">Status</div>
                    <div className="value"><span style={{color: '#FF5256'}}>Canceled</span>,
                        Trial {subscriptionsState.trial.trial_left_days} days left
                    </div>
                </div>
                <div className="row">
                    <div className="label">Next invoice date</div>
                    <div
                        className="value">N/A
                    </div>
                </div>
                <div className="row">
                    <div className="label">Price</div>
                    <div
                        className="value"> $ {numberMask(activationInfo[plan.key].next_invoice?.payment.total_actual / 100, 2)}</div>
                </div>
                <div className="row">
                    <div className="label">Last 30-days Ad Spend</div>
                    <div className="value">${numberMask(adSpend, 2)}</div>
                </div>
                <div className="row">
                    <div className="label">Coupon</div>
                    <div className="value">{planDetails.coupon === null ? 'Not used' : planDetails.coupon}</div>
                </div>
            </div>
        </div>)
    } else {
        return (<div className="active-subscription-details">
            <h4>About my Subscription:</h4>

            <div className="details">
                <div className="row">
                    <div className="label">Status</div>
                    <div
                        className="value">{planDetails.status === 'trialing' ? `Trialing, ${subscriptionsState.trial.trial_left_days} days left` :
                        <span>planDetails.status</span>}</div>
                </div>
                <div className="row">
                    <div className="label">Next invoice date</div>
                    <div
                        className="value">{moment(planDetails.upcoming_invoice.next_payment_attempt_date).format('MMM DD, YYYY')}</div>
                </div>
                <div className="row">
                    <div className="label">Price</div>
                    <div
                        className="value">{planDetails.upcoming_invoice.payment.total_actual && '$' + numberMask(planDetails.upcoming_invoice.payment.total_actual / 100, 2)}</div>
                </div>
                <div className="row">
                    <div className="label">Last 30-days Ad Spend</div>
                    <div className="value">${numberMask(adSpend, 2)}</div>
                </div>
                <div className="row">
                    <div className="label">Coupon</div>
                    <div className="value">{planDetails.coupon === null ? 'Not used' : planDetails.coupon}</div>
                </div>
            </div>
        </div>)

    }
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

const CheckIcon = () => <svg width="13" height="10" viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 5.74074L4.55556 9L11.6667 1" stroke="#7FD3A1" stroke-width="2" stroke-linecap="round"
          stroke-linejoin="round"/>
</svg>

const PlusIcon = () => <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.5 1V5.5M5.5 5.5H10M5.5 5.5H1M5.5 5.5V10" stroke-width="2" stroke-linecap="round"
          stroke-linejoin="round"/>
</svg>

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


const planIcon = {
    optimization: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g>
                <g >
                    <path d="M18.0999 10.0004C18.0999 8.39836 17.6248 6.83231 16.7348 5.50027C15.8448 4.16823 14.5797 3.13004 13.0996 2.51697C11.6196 1.9039 9.99092 1.74349 8.41967 2.05603C6.84843 2.36857 5.40514 3.14002 4.27234 4.27283C3.13953 5.40563 2.36808 6.84891 2.05554 8.42016C1.743 9.99141 1.90341 11.62 2.51648 13.1001C3.12955 14.5802 4.16775 15.8453 5.49978 16.7353C6.83182 17.6253 8.39787 18.1004 9.9999 18.1004" stroke="#6959AB" stroke-width="2" stroke-linecap="round"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.4271 11.1055C13.5393 10.7573 13.5999 10.3859 13.5999 10.0004C13.5999 8.01217 11.9881 6.40039 9.9999 6.40039C8.01168 6.40039 6.3999 8.01217 6.3999 10.0004C6.3999 11.9886 8.01168 13.6004 9.9999 13.6004C10.3853 13.6004 10.7566 13.5398 11.1047 13.4277L13.1137 18.7191C13.1445 18.7999 13.1986 18.8698 13.2692 18.9199C13.3397 18.97 13.4236 18.998 13.5101 19.0004H13.5232C13.6064 18.9995 13.6876 18.9749 13.7573 18.9294C13.827 18.884 13.8823 18.8196 13.9167 18.7438L15.2283 15.8126C15.4257 15.4558 15.5741 15.3424 15.8695 15.2106L18.7419 13.9177C18.8207 13.8823 18.8873 13.8243 18.9332 13.7511C18.9791 13.6778 19.0023 13.5926 18.9998 13.5062C18.9973 13.4198 18.9693 13.336 18.9192 13.2656C18.8691 13.1951 18.7993 13.141 18.7186 13.1102L18.7171 13.1146L13.4271 11.1055ZM13.4271 11.1055L10.5925 10.0289C10.5137 9.99894 10.428 9.99241 10.3456 10.0101C10.2632 10.0277 10.1876 10.0688 10.1281 10.1284C10.0685 10.188 10.0274 10.2636 10.0097 10.346C9.99205 10.4284 9.99858 10.5142 10.0285 10.593L11.1047 13.4277C12.2042 13.0735 13.0729 12.2049 13.4271 11.1055Z" fill="#6959AB"/>
                </g>
            </g>
        </svg>`,
    analytics: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<g>
<path d="M18.1018 1H13.0138C12.5167 1 12.1138 1.40294 12.1138 1.9C12.1138 2.39706 12.5167 2.8 13.0138 2.8H15.9341L11.2814 7.462C11.2333 7.51035 11.1762 7.54871 11.1132 7.57488C11.0503 7.60105 10.9828 7.61452 10.9147 7.61452C10.8465 7.61452 10.7791 7.60105 10.7161 7.57488C10.6532 7.54871 10.596 7.51035 10.5479 7.462L8.98503 5.896C8.54326 5.45413 7.94456 5.20596 7.32036 5.20596C6.69616 5.20596 6.09746 5.45413 5.65569 5.896L1.63316 9.92917C1.28324 10.28 1.28333 10.8479 1.63336 11.1986C1.98446 11.5504 2.55446 11.5504 2.90556 11.1986L6.92814 7.168C7.03258 7.0634 7.17419 7.00463 7.32186 7.00463C7.46952 7.00463 7.61114 7.0634 7.71557 7.168L9.27844 8.734C9.71284 9.16799 10.3012 9.4117 10.9147 9.4117C11.5281 9.4117 12.1165 9.16799 12.5509 8.734L17.2036 4.072V7.0018C17.2036 7.49786 17.6057 7.9 18.1018 7.9C18.5979 7.9 19 7.49786 19 7.0018V1.9C19 1.66131 18.9054 1.43239 18.7369 1.2636C18.5685 1.09482 18.34 1 18.1018 1Z" fill="#6959AB"/>
<path d="M2.83253 14.5008C2.33647 14.5008 1.93433 14.9029 1.93433 15.399V16.9008C1.93433 17.4577 2.15513 17.9919 2.54817 18.3857C2.94121 18.7795 3.47429 19.0008 4.03013 19.0008H16.0062C16.562 19.0008 17.0951 18.7795 17.4881 18.3857C17.8812 17.9919 18.102 17.4577 18.102 16.9008V11.199C18.102 10.7029 17.6998 10.3008 17.2038 10.3008C16.7077 10.3008 16.3056 10.7029 16.3056 11.199V16.9008C16.3056 16.9803 16.274 17.0567 16.2179 17.1129C16.1617 17.1692 16.0856 17.2008 16.0062 17.2008H13.3116V13.599C13.3116 13.1029 12.9094 12.7008 12.4134 12.7008C11.9173 12.7008 11.5152 13.1029 11.5152 13.599V17.2008H8.52115V12.399C8.52115 11.9029 8.11901 11.5008 7.62295 11.5008C7.12688 11.5008 6.72474 11.9029 6.72474 12.399V17.2008H4.03013C3.95073 17.2008 3.87457 17.1692 3.81843 17.1129C3.76228 17.0567 3.73073 16.9803 3.73073 16.9008V15.399C3.73073 14.9029 3.32859 14.5008 2.83253 14.5008Z" fill="#6959AB"/>
</g>
</svg>`,
    full: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<g>
<path d="M8 18.5L5 17.5L1.5 12.5L4.5 13.5L5 12L3.5 7L7.5 11L10 2L12.5 11L16.5 7L15 12L15.5 13.5L18.5 12.5L15 17.5L12 18.5"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</g>
</svg>`,
}
