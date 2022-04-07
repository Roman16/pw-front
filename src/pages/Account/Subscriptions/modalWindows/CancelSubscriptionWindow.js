import React, {useState} from 'react'
import {Spin} from "antd"
import {numberMask} from "../../../../utils/numberMask"
import ModalWindow from "../../../../components/ModalWindow/ModalWindow"

export const CancelSubscriptionWindow = ({
                                             visible,
                                             product,

                                             onClose,

                                             onCancelSubscription,
                                             onKeepSubscription,
                                             disableReactivateButtons,
                                         }) => {
    const [actionType, setActionType] = useState(null)

    const saveCount = () => {
        // if (!product.applied_coupon || product.applied_coupon.name == null) {
        //     return (product.next_charge_value)
        // } else if (product.applied_coupon.amount_off) {
        //     return product.next_charge_value + product.applied_coupon.amount_off
        // } else if (product.applied_coupon.percent_off) {
        //     return product.next_charge_value / ((100 - product.applied_coupon.percent_off) / 100)
        // }
    }

    return (
        <ModalWindow
            className="cancel-account reactivate-account"
            handleCancel={onClose}
            visible={visible}
            footer={false}
        >
            <div className="cancel">
                <h2>Are you sure you want to cancel Subscription?</h2>

                <p>
                    Stay with Sponsoreds and save <b>30%</b> for the next three months. <br/>
                    {/*<span>You’ll save:</span> ${numberMask(subscriptionPrice * 0.3 * 3, 2)} that you can invest back in*/}
                    <span>You’ll save:</span> <b>${numberMask(saveCount() * 0.3 * 3, 2)}</b> that you can invest back in
                    Amazon Advertising.
                </p>

                <div className={`actions`}>
                    <button
                        className='btn default'
                        onClick={() => {
                            setActionType('keep')
                            onKeepSubscription()
                        }}
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
}

