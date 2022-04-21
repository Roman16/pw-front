import React, {useState} from 'react'
import {Spin} from "antd"
import {numberMask} from "../../../../utils/numberMask"
import ModalWindow from "../../../../components/ModalWindow/ModalWindow"
import moment from 'moment'


export const CancelSubscription = ({
                                       visible,
                                       state,
                                       onClose,

                                       onCancelSubscription,
                                       onKeepSubscription,
                                       disableReactivateButtons,
                                   }) => {
    const [actionType, setActionType] = useState(null)


    const keepSubscriptionHandler = () => {
        setActionType('keep')

        if (state.subscriptions[state.active_subscription_type].coupon || state.trial.trial_active) {
            onClose()
        } else {
            onKeepSubscription()
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

                    {state.trial.trial_active ? <p>You will have access to the software until the end of Free
                        Trial.</p> : state.subscriptions[state.active_subscription_type].coupon ? <p>
                            If you decide to cancel, you will have access to the software untill the end of this billing
                            cycle: <b>{moment(state.subscriptions[state.active_subscription_type].upcoming_invoice.next_payment_attempt_date).format('DD MMM YYYY')}</b>.
                        </p> :
                        <p>
                            Stay with Sponsoreds and get 30% discount for your subscription for the next three
                            months. <br/> <span>You will save:</span>
                            <b> ${numberMask(state.subscriptions[state.active_subscription_type].upcoming_invoice.payment.total_actual / 100 * 0.3 * 3, 2)}</b> that
                            you can invest <br/> back into your Amazon business.
                            <br/>
                            <br/>
                            If you decide to cancel, you will have access to the software untill the end of this billing
                            cycle: {moment(state.subscriptions[state.active_subscription_type].upcoming_invoice.next_payment_attempt_date).format('DD MMM YYYY')}.
                        </p>}


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

