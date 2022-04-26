import React, {useState} from 'react'
import {Spin} from "antd"
import {numberMask} from "../../../../utils/numberMask"
import ModalWindow from "../../../../components/ModalWindow/ModalWindow"
import moment from 'moment'
import {getTotalActual} from "./ActivateSubscription"


export const CancelSubscription = ({
                                       visible,
                                       subscriptionState,
                                       activationInfo,
                                       disableReactivateButtons,
                                       plan,

                                       onClose,
                                       onCancelSubscription,
                                       onKeepSubscription,
                                   }) => {
    const [actionType, setActionType] = useState(null)


    const keepSubscriptionHandler = () => {
        setActionType('keep')

        if (subscriptionState.subscriptions[subscriptionState.active_subscription_type].coupon || subscriptionState.trial.trial_active) {
            onClose()
        } else {
            onKeepSubscription()
        }
    }


    const windowDescription = () => {
        if (subscriptionState.trial.trial_active) {
            return <p>You will have access to the software until the end of Free Trial.</p>
        } else if (subscriptionState.subscriptions[subscriptionState.active_subscription_type]?.coupon) {
            return <p>
                If you decide to cancel, you will have access to the software untill the end of this billing
                cycle: {moment(subscriptionState.subscriptions[subscriptionState.active_subscription_type].upcoming_invoice.next_payment_attempt_date).format('DD MMM YYYY')}.
            </p>
        } else {
            const upcomingInvoice = (subscriptionState.subscriptions[plan].status === 'incomplete' || subscriptionState.subscriptions[plan].status === 'past_due') ? activationInfo[plan].next_invoice : subscriptionState.subscriptions[subscriptionState.active_subscription_type].upcoming_invoice

            return <p>
                Stay with Sponsoreds and get 30% discount for your subscription for the next three months. <br/>
                <span>You will save:</span>
                <b> ${numberMask(getTotalActual(upcomingInvoice.payment) / 100 * 0.3 * 3, 2)} </b>
                that you can invest back into your Amazon business.
                <br/>
                <br/>
                If you decide to cancel, you will have access to the software untill the end of this billing
                cycle: {moment(upcomingInvoice.next_payment_attempt_date).format('DD MMM YYYY')}.
            </p>
        }
    }

    if (visible) {
        return (
            <ModalWindow
                className="cancel-account-window"
                handleCancel={onClose}
                visible={visible}
                footer={false}
            >
                <div className="cancel">
                    <h2>Are you sure you want to cancel Subscription?</h2>

                    {windowDescription()}

                    <div className={`actions`}>
                        <button
                            className='btn default'
                            onClick={keepSubscriptionHandler}
                            disabled={disableReactivateButtons}
                        >
                            {disableReactivateButtons && actionType === 'keep' && <Spin size={'small'}/>}

                            Keep Subscription
                        </button>
                    </div>

                    <button
                        className='btn transparent'
                        onClick={() => {
                            setActionType('cancel')
                            onCancelSubscription()
                        }}
                        disabled={disableReactivateButtons}
                    >
                        Cancel Subscription

                        {disableReactivateButtons && actionType === 'cancel' && <Spin size={'small'}/>}
                    </button>
                </div>
            </ModalWindow>
        )
    } else return ''
}

