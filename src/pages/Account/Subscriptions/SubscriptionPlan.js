import React from "react"
import {Spin} from "antd"

export const SubscriptionPlan = ({
                                     plan,
                                     loadStateProcessing,
                                     subscriptionsState,
                                     processingCancelSubscription,
                                     activateProcessing,

                                     onSelect,
                                     onCloseCancelWindow
                                 }) => {

    return (<li>
        <div className={'plan-name'}>
            {plan.name}

            {plan.key === 'full' && <span>save 30%</span>}
        </div>

        <ul>
            {plan.params.map(i => <li><ListIcon/> {i}</li>)}
        </ul>

        {!loadStateProcessing ? <>
            <div className={'price'}>
                <b>${subscriptionsState.subscriptions[plan.key].upcoming_invoice.amount}</b>/month
            </div>

            {subscriptionsState.active_subscription_type === plan.key ?
                <button
                    disabled={processingCancelSubscription}
                    className="btn grey" onClick={() => onCloseCancelWindow(true)}
                >
                    Active
                </button>
                :
                <button
                    disabled={activateProcessing}
                    className={`btn ${plan.key === 'full' ? 'default' : 'blue'}`}
                    onClick={() => onSelect(plan.key)}
                >
                    {subscriptionsState.trial.can_start_trial ? 'Select plan' : subscriptionsState.active_subscription_type ? 'Switch' : 'Subscribe'}
                </button>
            }
        </> : <Spin/>}
    </li>)
}

const ListIcon = () => <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="18" height="18" rx="9"/>
    <path d="M5 9.55556L7.66667 12L13 6" stroke="white" stroke-width="2" stroke-linecap="round"
          stroke-linejoin="round"/>
</svg>
