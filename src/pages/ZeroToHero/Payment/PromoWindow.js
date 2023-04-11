import React from "react"
import ModalWindow from "../../../components/ModalWindow/ModalWindow"

export const PromoWindow = ({
                                visible,
                                onClose
                            }) => {

    return (
        <ModalWindow
            className="available-promo-window"
            handleCancel={onClose}
            visible={visible}
            footer={false}
        >
            <div className="cancel">
                <h2>Are you sure you want to cancel Subscription?</h2>

            </div>
        </ModalWindow>

    )
}