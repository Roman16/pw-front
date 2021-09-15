import React from "react"
import ModalWindow from "../../../components/ModalWindow/ModalWindow"

const CreateSuccessWindow = ({visible, onClose}) => {

    return (<ModalWindow
            visible={visible}
            handleCancel={onClose}
            footer={false}
            className={'success-zth-action'}
        >
            <h2>Congratulations! Your campaigns are in progress!</h2>
            <p>
                Our algorithm has started to create your campaigns. Because of the high volume and complexity of this
                process of creating professionally structured campaigns from scratch, it takes our system up to 6 hours
                to create the campaigns.
            </p>

            <button className="btn default" onClick={onClose}>
                View Status
            </button>
        </ModalWindow>

    )
}

export default CreateSuccessWindow