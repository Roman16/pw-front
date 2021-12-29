import React, {useEffect, useState} from "react"
import ModalWindow from "../../../../components/ModalWindow/ModalWindow"
import {Link} from "react-router-dom"
import {Spin} from "antd"
import {ProductPrice} from "../SubscriptionPlan"

const ConfirmSubscribeWindow = ({visible, onCancel,defaultCard = {last4: ''},product, onSubmit, submitProcessing}) => {
    return (
        <ModalWindow
            className="confirm-subscribe-window"
            handleCancel={onCancel}
            footer={false}
            visible={visible}
        >

            <h2>Submit payment method to be charged</h2>
            <p>
                We’re about to link you to payment page to charge <ProductPrice product={product}/> from your default method payment <span>**** {defaultCard.last4}.</span>
                Are
                you sure you want to continue?
            </p>

            <div className="actions">
                <button
                    onClick={onCancel}
                    disabled={submitProcessing}
                    className="btn grey"
                >
                    Cancel
                </button>

                <button
                    onClick={onSubmit}
                    disabled={submitProcessing}
                    className="btn default">
                    Proceed

                    {submitProcessing && <Spin size={'small'}/>}
                </button>
            </div>

            <Link to={'/account/billing-information'}>Manage my payment methods</Link>

        </ModalWindow>
    )

}

export default ConfirmSubscribeWindow