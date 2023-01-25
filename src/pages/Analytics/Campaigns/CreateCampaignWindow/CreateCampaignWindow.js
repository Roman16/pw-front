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
import _ from "lodash"
import moment from "moment"
import {dateFormatting} from "../../../../utils/dateFormatting"
import {activeTimezone} from "../../../index"
import {NegativeTargetingsDetails} from "./CreateSteps/NegativeTargetingsDetails"

const defaultState = {
    //campaign
    name: undefined,
    portfolioId: null,
    startDate: dateFormatting(moment().tz(activeTimezone)),
    endDate: undefined,
    calculatedBudget: undefined,
    advertisingType: 'SponsoredProducts',
    calculatedCampaignSubType: 'Auto',
    bidding_strategy: 'legacyForSales',
    state: 'enabled',
    calculatedBudgetType: 'daily',
    bidding_adjustments: [
        {
            predicate: 'placementTop',
            percentage: 0
        },
        {
            predicate: 'placementProductPage',
            percentage: 0
        }],
    //ad group
    createAdGroup: false,
    adGroupName: '',
    adGroupBid: 0,
    //product ads
    createProductAds: false,
    selectedProductAds: [],
    //targetings
    createTargetings: false,
    targetingType: 'keywords',
    targets: [],
    keywords: [],
    //negative targetings
    createNegativeTargetings: false,
    negativeTargetingType: 'keywords',
    negativeTargets: [],
    negativeKeywords: [],
    negativeCampaignKeywords: [],
}

const steps = [
    'Advertising Type',
    'Campaign',
    'Ad Group',
    'Product Ads',
    'Targetings',
    'Negative Targetings',
    'Overview',
]

const CreateCampaignWindow = ({onReloadList}) => {
    const [currentStep, setCurrentStep] = useState(0),
        [skippedSteps, setSkippedSteps] = useState([]),
        [processSteps, setProcessSteps] = useState([]),
        [finishedSteps, setFinishedSteps] = useState([]),
        [createData, setCreateData] = useState({...defaultState}),
        [createProcessing, setCreateProcessing] = useState(false)


    const dispatch = useDispatch()

    const visibleWindow = useSelector(state => state.analytics.visibleCreationWindows.campaign)

    const goToNextStepHandler = () => {
        if (currentStep === 2 && !createData.createAdGroup) {
            setCurrentStep(6)
            setFinishedSteps(prevState => [...prevState, currentStep])
            setSkippedSteps([3, 4, 5])
        } else {
            setFinishedSteps(prevState => [...prevState, currentStep])
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
        setCreateData(prevState => ({...prevState, ...data}))
    }

    const createCampaignHandler = async () => {
        setCreateProcessing(true)

        try {
            const res = await analyticsServices.exactCreate('campaigns', {
                name: createData.name,
                portfolioId: createData.portfolioId,
                startDate: createData.startDate,
                endDate: createData.endDate,
                calculatedBudget: createData.calculatedBudget,
                advertisingType: createData.advertisingType,
                calculatedCampaignSubType: createData.calculatedCampaignSubType,
                bidding_strategy: createData.bidding_strategy,
                state: createData.state,
                bidding_adjustments: createData.bidding_adjustments,
                calculatedBudgetType: createData.calculatedBudgetType,
            })

            const failed = res.result.failed,
                success = res.result.success,
                notApplicable = res.result.notApplicable

            if (success > 0) {
                notification.success({title: `${success} ${success === 1 ? 'entity' : 'entities'} created`})
                closeWindowHandler()
                onReloadList()
                setCreateData({...defaultState})
            }

            if (failed > 0 || notApplicable > 0) {
                notification.error({title: `${failed + notApplicable} ${failed + notApplicable === 1 ? 'entity' : 'entities'} failed to create`})
            }
        } catch (e) {
            console.log(e)
        }

        setCreateProcessing(false)
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

        if (createData.createAdGroup) setSkippedSteps([])
    }, [createData.createAdGroup])

    useEffect(() => {
        setFinishedSteps([0])
        setProcessSteps([])
        setSkippedSteps([])
    }, [createData.targetings_type])

    useEffect(() => {
        dispatch(analyticsActions.setPortfolioList())
    }, [])

    const nextStepValidation = () => {
        if (currentStep === 1 && (!createData.name || !createData.calculatedBudget)) return true
        else if (currentStep === 2 && createData.createAdGroup && (!createData.adGroupName || !createData.adGroupBid)) return true
        else if (currentStep === 3 && createData.createProductAds && createData.selectedProductAds.length === 0) return true
        else if (currentStep === 4 && createData.createTargetings && (createData.targetingType === 'keywords' ? createData.keywords.length === 0 : createData.targets.length === 0)) return true
        else return false
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
                steps={steps}
                step={currentStep}
                skippedSteps={skippedSteps}
                finishedSteps={finishedSteps}
                processSteps={processSteps}
                setStep={goToSelectStep}
            />

            <div className="create-steps">
                {currentStep === 0 &&
                <AdvertisingType createData={createData} onChange={changeCampaignDataHandler}/>}

                {currentStep === 1 &&
                <CampaignDetails
                    createData={createData}
                    onChange={changeCampaignDataHandler}
                />}

                {currentStep === 2 &&
                <AdGroupDetails createData={createData} onChange={changeCampaignDataHandler}/>}

                {currentStep === 3 &&
                <ProductAdsDetails createData={createData} onChange={changeCampaignDataHandler}/>}

                {currentStep === 4 &&
                <TargetingsDetails createData={createData} onChange={changeCampaignDataHandler}/>}

                {currentStep === 5 &&
                <NegativeTargetingsDetails createData={createData} onChange={changeCampaignDataHandler}/>}

                {currentStep === 6 && <CreateCampaignOverview createData={createData}/>}
            </div>

            <WindowFooter
                steps={steps}
                currentStep={currentStep}
                goNext={goToNextStepHandler}
                disableNextStep={nextStepValidation()}
                goPrevious={goToPreviousStepHandler}
                onCreate={createCampaignHandler}
                createButtonTitle={'Create Campaign'}
                processing={createProcessing}
            />
        </ModalWindow>
    )
}

export default CreateCampaignWindow
