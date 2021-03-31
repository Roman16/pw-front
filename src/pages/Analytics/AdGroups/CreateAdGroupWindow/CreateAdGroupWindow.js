import React, {useEffect, useState} from "react"
import ModalWindow from "../../../../components/ModalWindow/ModalWindow"
import WindowHeader from "../../Campaigns/CreateCampaignWindow/WindowHeader"
import {analyticsActions} from "../../../../actions/analytics.actions"
import {useDispatch, useSelector} from "react-redux"
import CreateProcessing from "../../Campaigns/CreateCampaignWindow/CreateProcessing"
import WindowFooter from "../../Campaigns/CreateCampaignWindow/WindowFooter"
import ProductAdsDetails from "../../Campaigns/CreateCampaignWindow/CreateSteps/ProductAdsDetails/ProductAdsDetails"
import TargetingsDetails from "../../Campaigns/CreateCampaignWindow/CreateSteps/TargetingsDetails/TargetingsDetails"
import CreateCampaignOverview from "../../Campaigns/CreateCampaignWindow/CreateSteps/CreateCampaignOverview"
import AdGroupDetails from "./AdGroupDetails"


const CreateAdGroupWindow = () => {
    const [createAdGroupData, setCreateAdGroupData] = useState({
            targetings_type: 'automatic_targeting',
            ad_group_name: '',
            ad_group_default_bid: 0,
            //product ads
            create_product_ads: true,
            selectedProductAds: [],
            //targetings
            create_targetings: true,
            negative_keywords: [],
            negative_pats: [],
            keyword_targetings: [],
            t_targeting_type: 'keyword',
            targeting_bid: 0,
            enabled_target_close_match: true,
            target_close_match: 0,
            enabled_target_loose_match: true,
            target_loose_match: 0,
            enabled_target_substitutes: true,
            target_substitutes: 0,
            enabled_target_complements: true,
            target_complements: 0,
        }),
        [currentStep, setCurrentStep] = useState(0),
        [skippedSteps, setSkippedSteps] = useState([]),
        [processSteps, setProcessSteps] = useState([]),
        [finishedSteps, setFinishedSteps] = useState([])

    const steps = [
        'Ad Group',
        'Product Ads',
        'Targetings',
        'Overview',
    ]


    const dispatch = useDispatch()

    const visibleWindow = useSelector(state => state.analytics.visibleCreationWindows.adGroup),
        mainState = useSelector(state => state.analytics.mainState)

    const closeWindowHandler = () => {
        dispatch(analyticsActions.setVisibleCreateWindow({adGroup: false}))
    }

    const goToSelectStep = (step) => {
        if (finishedSteps.includes(step) || processSteps.includes(step)) {
            setProcessSteps(prevState => [...prevState, currentStep])
            setCurrentStep(step)
        }
    }

    const goToNextStepHandler = () => {
        setFinishedSteps(prevState => [...prevState, currentStep])
        setCurrentStep(prevState => prevState + 1)
    }

    const goToPreviousStepHandler = () => {
        setProcessSteps(prevState => [...prevState, currentStep])

        const checkStep = (step) => {
            if (skippedSteps.includes(step)) {
                checkStep(step - 1)
            } else {
                setCurrentStep(step)
            }
        }

        checkStep(currentStep - 1)
    }

    const changeCreateDataHandler = (value) => {
        setCreateAdGroupData(prevState => ({...prevState, ...value}))
    }

    const createAdGroupHandler = () => {

    }

    useEffect(() => {
        if (mainState.campaignId) setCreateAdGroupData(prevState => ({...prevState, selected_campaign: '444'}))
    }, [mainState])

    return (<ModalWindow
            className={'create-campaign-window create-ad-group-window'}
            visible={visibleWindow}
            footer={false}
            handleCancel={closeWindowHandler}
        >
            <WindowHeader
                title={'Create Ad Group'}
                onClose={closeWindowHandler}
            />

            <CreateProcessing
                steps={steps}
                step={currentStep}
                skippedSteps={skippedSteps}
                finishedSteps={finishedSteps}
                processSteps={processSteps}
                setStep={goToSelectStep}
            />

            <div className="create-steps">
                {currentStep === 0 &&
                <AdGroupDetails
                    selectedCampaign={mainState.campaignId}
                    createData={createAdGroupData}
                    onChange={changeCreateDataHandler}
                />}

                {currentStep === 1 &&
                <ProductAdsDetails
                    createData={createAdGroupData}
                    onChange={changeCreateDataHandler}
                />}

                {currentStep === 2 &&
                <TargetingsDetails
                    createData={createAdGroupData}
                    onChange={changeCreateDataHandler}
                />}

                {currentStep === 3 &&
                <CreateCampaignOverview
                    createData={createAdGroupData}
                />}
            </div>

            <WindowFooter
                steps={steps}
                currentStep={currentStep}
                goNext={goToNextStepHandler}
                goPrevious={goToPreviousStepHandler}
                onCreate={createAdGroupHandler}
                createButtonTitle={'Create Ad Group'}
            />
        </ModalWindow>
    )
}

export default CreateAdGroupWindow
