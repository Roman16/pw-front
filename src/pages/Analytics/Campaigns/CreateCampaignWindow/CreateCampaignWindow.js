import React, {useState} from "react"
import ModalWindow from "../../../../components/ModalWindow/ModalWindow"
import WindowHeader from "./WindowHeader"
import CreateProcessing from "./CreateProcessing"
import './CreateCampaignWindow.less'
import WindowFooter from "./WindowFooter"
import AdvertisingType from "./CreateSteps/AdvertisingType"
import CampaignDetails from "./CreateSteps/CampaignDetails"
import AdGroupDetails from "./CreateSteps/AdGroupDetails"
import ProductAdsDetails from "./CreateSteps/ProductAdsDetails"

const CreateCampaignWindow = () => {
    const [currentStep, setCurrentStep] = useState(0)

    const goToNextStepHandler = () => setCurrentStep(prevState => prevState + 1)
    const goToPreviousStepHandler = () => setCurrentStep(prevState => prevState - 1)

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

            <div className="create-steps">
                {currentStep === 0 && <AdvertisingType/>}
                {currentStep === 1 && <CampaignDetails/>}
                {currentStep === 2 && <AdGroupDetails/>}
                {currentStep === 3 && <ProductAdsDetails/>}
            </div>

            <WindowFooter
                currentStep={currentStep}
                goNext={goToNextStepHandler}
                goPrevious={goToPreviousStepHandler}
            />
        </ModalWindow>
    )
}

export default CreateCampaignWindow
