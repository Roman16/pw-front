import React, {useState} from 'react';
import {Spin} from "antd";
import {numberMask} from "../../../../utils/numberMask";

const CancelAccountWindow = ({onCancelSubscription, onKeepSubscription, disableReactivateButtons, product}) => {
    const [actionType, setActionType] = useState(null);

    const saveCount = () => {
        if (!product.applied_coupon || product.applied_coupon.name == null) {
            return (product.next_charge_value);
        } else if (product.applied_coupon.amount_off) {
            return product.next_charge_value + product.applied_coupon.amount_off
        } else if (product.applied_coupon.percent_off) {
            return product.next_charge_value / ((100 - product.applied_coupon.percent_off) / 100)
        }
    }

    return (
        <div className="cancel">
            <h3 className="reactivate-title">Are you sure you want to cancel Subscription?</h3>
            <p className="reactivate-text">
                Stay with Profit Whales and save 30% for the next three months. <br/>
                {/*<span>You’ll save:</span> ${numberMask(subscriptionPrice * 0.3 * 3, 2)} that you can invest back in*/}
                <span>You’ll save:</span> ${numberMask(saveCount() * 0.3 * 3, 2)} that you can invest back in
                Amazon Advertising.
            </p>

            <div className={`actions`}>
                <button
                    className='btn white'
                    onClick={() => {
                        setActionType('cancel');
                        onCancelSubscription();
                    }}
                    disabled={disableReactivateButtons}
                >
                    {disableReactivateButtons && actionType === 'cancel' && <Spin/>}

                    Cancel Account
                </button>

                <button
                    className='btn default'
                    onClick={() => {
                        setActionType('keep');
                        onKeepSubscription()
                    }}
                    disabled={disableReactivateButtons}
                >
                    {disableReactivateButtons && actionType === 'keep' && <Spin/>}

                    Keep Subscription
                </button>
            </div>
        </div>
    );
};

export default CancelAccountWindow;
