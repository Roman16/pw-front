import React from "react"
import ModalWindow from "../../../../components/ModalWindow/ModalWindow"
import CardInformation from "../../BillingInformation/CardInformation"

export const AddPaymentMethod = ({visible, processing, onClose, onAddCard}) => {

    return (
        <ModalWindow
            className="add-payment-method-window"
            handleCancel={onClose}
            footer={false}
            visible={visible}
        >
            <CardInformation
                card={{
                    name: '',
                    line1: '',
                    city: '',
                    postal_code: '',
                    country: undefined
                }}
                isNewCard={true}
                updateProcessing={processing}
                deleteProcessing={false}
                requiredForSubscribe={true}

                onAddCard={onAddCard}
            />
        </ModalWindow>
    )
}