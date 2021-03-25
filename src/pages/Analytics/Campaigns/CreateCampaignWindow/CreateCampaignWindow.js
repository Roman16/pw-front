import React, {useEffect, useState} from "react"
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
import {analyticsServices} from "../../../../services/analytics.services"
import {notification} from "../../../../components/Notification"

const CreateCampaignWindow = () => {
    const [currentStep, setCurrentStep] = useState(0),
        [skippedSteps, setSkippedSteps] = useState([]),
        [processSteps, setProcessSteps] = useState([]),
        [finishedSteps, setFinishedSteps] = useState([]),
        [createCampaignData, setCreateCampaignData] = useState({
            //campaign
            name: '',
            portfolio_name: '',
            startDate: undefined,
            endDate: undefined,
            dailyBudget: 0,
            advertisingType: 'SponsoredProducts',
            calculatedTargetingType: 'auto',
            bidding_strategy: 'legacyForSales',
            state: 'enabled',
            bidding_adjustments: [0,0],
            //ad group
            create_ad_group: true,
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
        })


    const steps = [
        'Advertising Type',
        'Campaign',
        'Ad Group',
        'Product Ads',
        'Targetings',
        'Overview',
    ]

    const dispatch = useDispatch()

    const visibleWindow = useSelector(state => state.analytics.visibleCreationWindows.campaign)

    const goToNextStepHandler = () => {
        setFinishedSteps(prevState => [...prevState, currentStep])

        if (currentStep === 2 && !createCampaignData.create_ad_group) {
            setSkippedSteps([3, 4])
            setCurrentStep(5)
        } else {
            setCurrentStep(prevState => prevState + 1)
        }
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

    const goToSelectStep = (step) => {
        if (finishedSteps.includes(step) || processSteps.includes(step)) {
            setProcessSteps(prevState => [...prevState, currentStep])
            setCurrentStep(step)
        }
    }

    const closeWindowHandler = () => {
        dispatch(analyticsActions.setVisibleCreateWindow({campaign: false}))

        setTimeout(() => setCurrentStep(0), 700)
    }

    const changeCampaignDataHandler = (data) => {
        setCreateCampaignData(prevState => ({...prevState, ...data}))
    }

    const createCampaignHandler = async () => {
        try {
            await analyticsServices.createCampaign(createCampaignData)
            closeWindowHandler()
            notification.success({title: 'Campaign created'})
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setSkippedSteps([])
            setFinishedSteps([])
            setProcessSteps([])
        }, 500)
    }, [visibleWindow])

    useEffect(() => {
        setFinishedSteps([0, 1])
        setProcessSteps([2])

        if (createCampaignData.create_ad_group) setSkippedSteps([])
    }, [createCampaignData.create_ad_group])

    useEffect(() => {
        setFinishedSteps([0])
        setProcessSteps([])
        setSkippedSteps([])
    }, [createCampaignData.targetings_type])

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
                steps={steps}
                step={currentStep}
                skippedSteps={skippedSteps}
                finishedSteps={finishedSteps}
                processSteps={processSteps}
                setStep={goToSelectStep}
            />

            <div className="create-steps">
                {currentStep === 0 &&
                <AdvertisingType createData={createCampaignData} onChange={changeCampaignDataHandler}/>}

                {currentStep === 1 &&
                <CampaignDetails createData={createCampaignData} onChange={changeCampaignDataHandler}/>}

                {currentStep === 2 &&
                <AdGroupDetails createData={createCampaignData} onChange={changeCampaignDataHandler}/>}

                {currentStep === 3 &&
                <ProductAdsDetails createData={createCampaignData} onChange={changeCampaignDataHandler}/>}

                {currentStep === 4 &&
                <TargetingsDetails createData={createCampaignData} onChange={changeCampaignDataHandler}/>}

                {currentStep === 5 && <CreateCampaignOverview createData={createCampaignData}/>}
            </div>

            <WindowFooter
                steps={steps}
                currentStep={currentStep}
                goNext={goToNextStepHandler}
                goPrevious={goToPreviousStepHandler}
                onCreate={createCampaignHandler}
                createButtonTitle={'Create Campaign'}
            />
        </ModalWindow>
    )
}

export default CreateCampaignWindow
