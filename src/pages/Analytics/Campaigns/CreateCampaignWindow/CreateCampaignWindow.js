import React, {useState} from "react"
import ModalWindow from "../../../../components/ModalWindow/ModalWindow"
import WindowHeader from "./WindowHeader"
import CreateProcessing from "./CreateProcessing"

const CreateCampaignWindow = () => {
    const [currentStep, setCurrentStep] = useState(0)

    const closeWindowHandler = () => false

    return (<ModalWindow
            className={'create-campaign-window'}
            visible={false}
            footer={false}
            handleCancel={closeWindowHandler}
        >
            <WindowHeader
                onClose={closeWindowHandler}
            />

            <CreateProcessing
                step={currentStep}
            />
        </ModalWindow>
    )
}

export default CreateCampaignWindow
