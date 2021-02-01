import React, {useState} from "react"
import ModalWindow from "../../../../components/ModalWindow/ModalWindow"
import WindowHeader from "./WindowHeader"
import CreateProcessing from "./CreateProcessing"
import './CreateCampaignWindow.less'
import WindowFooter from "./WindowFooter"
import AdvertisingType from "./CreateSteps/AdvertisingType"
import CampaignDetails from "./CreateSteps/CampaignDetails"
import AdGroupDetails from "./CreateSteps/AdGroupDetails"
import ProductAdsDetails from "./CreateSteps/ProductAdsDetails/ProductAdsDetails"
import {useDispatch, useSelector} from "react-redux"
import {analyticsActions} from "../../../../actions/analytics.actions"
import CreateCampaignOverview from "./CreateSteps/CreateCampaignOverview"
import TargetingsDetails from "./CreateSteps/TargetingsDetails/TargetingsDetails"

const CreateCampaignWindow = () => {
    const [currentStep, setCurrentStep] = useState(0),
        [skippedSteps, setSkippedSteps] = useState([]),
        [createCampaignData, setCreateCampaignData] = useState({
            campaign_type: 'sponsored_products',
            campaign_name: '',
            portfolio_name: '',
            create_ad_group: true,
            create_product_ads: true,
            create_targetings: true,
            selectedProductAds: [],
            negative_keywords: [],
            negative_pats: [],
        })

    const dispatch = useDispatch()

    const visibleWindow = useSelector(state => state.analytics.visibleCreationWindows.campaign)

    const goToNextStepHandler = () => {
        if (currentStep === 2 && !createCampaignData.create_ad_group) {
            setSkippedSteps([3, 4])
            setCurrentStep(5)
        } else {
            setCurrentStep(prevState => prevState + 1)

        }
    }

    const goToPreviousStepHandler = () => setCurrentStep(prevState => prevState - 1)

    const closeWindowHandler = () => {
        dispatch(analyticsActions.setVisibleCreateWindow({campaign: false}))

        setTimeout(() => setCurrentStep(0), 700)
    }

    const changeCampaignDataHandler = (data) => {
        setCreateCampaignData(prevState => ({...prevState, ...data}))
    }

    const createCampaignHandler = async () => {

    }

    return (<ModalWindow
            className={'create-campaign-window'}
            visible={visibleWindow}
            // visible={true}
            footer={false}
            handleCancel={closeWindowHandler}
        >
            <WindowHeader
                onClose={closeWindowHandler}
            />

            <CreateProcessing
                step={currentStep}
                skippedSteps={skippedSteps}
            />

            <div className="create-steps">
                {currentStep === 0 &&
                <AdvertisingType campaignData={createCampaignData} onChange={changeCampaignDataHandler}/>}

                {currentStep === 1 &&
                <CampaignDetails campaignData={createCampaignData} onChange={changeCampaignDataHandler}/>}

                {currentStep === 2 &&
                <AdGroupDetails campaignData={createCampaignData} onChange={changeCampaignDataHandler}/>}

                {currentStep === 3 &&
                <ProductAdsDetails campaignData={createCampaignData} onChange={changeCampaignDataHandler}/>}

                {currentStep === 4 &&
                <TargetingsDetails campaignData={createCampaignData} onChange={changeCampaignDataHandler}/>}

                {currentStep === 5 && <CreateCampaignOverview campaignData={createCampaignData}/>}
            </div>

            <WindowFooter
                currentStep={currentStep}
                goNext={goToNextStepHandler}
                goPrevious={goToPreviousStepHandler}
                onCreate={createCampaignHandler}
            />
        </ModalWindow>
    )
}

export default CreateCampaignWindow
