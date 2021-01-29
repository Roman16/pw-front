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
import {useDispatch, useSelector} from "react-redux"
import {analyticsActions} from "../../../../actions/analytics.actions"
import TargetingsDetails from "./CreateSteps/TargetingsDetails"

const CreateCampaignWindow = () => {
    const [currentStep, setCurrentStep] = useState(0)
    const dispatch = useDispatch()

    const visibleWindow = useSelector(state => state.analytics.visibleCreationWindows.campaign)

    const goToNextStepHandler = () => setCurrentStep(prevState => prevState + 1)
    const goToPreviousStepHandler = () => setCurrentStep(prevState => prevState - 1)

    const closeWindowHandler = () => {
        dispatch(analyticsActions.setVisibleCreateWindow({campaign: false}))

        setTimeout(() => setCurrentStep(0), 700)

    }

    return (<ModalWindow
            className={'create-campaign-window'}
            visible={visibleWindow}
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
                {currentStep === 4 && <TargetingsDetails/>}
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
