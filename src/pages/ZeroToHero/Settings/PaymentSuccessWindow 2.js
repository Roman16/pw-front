import React from "react"
import ModalWindow from "../../../components/ModalWindow/ModalWindow"

const PaymentSuccessWindow = ({visible, onClose}) => {

    return (<ModalWindow
            visible={visible}
            handleCancel={onClose}
            footer={false}
            className={'success-zth-action'}
        >
            <h2>Your payment is successful!</h2>
            <p>
                Our system has started uploading campaigns to your Amazon account. Due to high volume of operations
                required to create campaigns in Amazon Advertising, it may take up to 6 hours until campaigns appear in
                your Amazon Campaigs Manager . You can see the status of the upload process on ZTH Statuses page.
            </p>

            <button className="sds-btn default" onClick={onClose}>
                View Status
            </button>
        </ModalWindow>

    )

}

export default PaymentSuccessWindow