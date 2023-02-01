import React, {useEffect, useState} from "react"
import ModalWindow from "../../../../components/ModalWindow/ModalWindow"
import WindowHeader from "../../Campaigns/CreateCampaignWindow/WindowHeader"
import {analyticsActions} from "../../../../actions/analytics.actions"
import {useDispatch, useSelector} from "react-redux"
import CreateProcessing from "../../Campaigns/CreateCampaignWindow/CreateProcessing"
import WindowFooter from "../../Campaigns/CreateCampaignWindow/WindowFooter"
import ProductAdsDetails from "../../Campaigns/CreateCampaignWindow/CreateSteps/ProductAdsDetails/ProductAdsDetails"
import CreateCampaignOverview from "../../Campaigns/CreateCampaignWindow/CreateSteps/CreateCampaignOverview"
import AdGroupDetails from "./AdGroupDetails"
import {analyticsServices} from "../../../../services/analytics.services"
import {notification} from "../../../../components/Notification"
import {Radio} from "antd"
import {
    mapTargetingsDataRequest,
    RenderTargetingsDetails
} from "../../Targetings/CreateTargetingsWindow/CreateTargetingsWindow"
import {NegativeTargetingsDetails} from "../../NegativeTargetings/CreateNegativeTargetingsWindow/NegativeTargetingsDetails"
import {mapNegativeTargetings} from "../../NegativeTargetings/CreateNegativeTargetingsWindow/CreateNegativeTargetingsWindow"
import _ from "lodash"

const steps = [
    'Ad Group',
    'Product Ads',
    'Targetings',
    'Negative Targetings',
    'Overview',
]

const defaultState = {
    advertisingType: undefined,
    campaignId: undefined,
    name: '',
    adGroupBid: 0,
    state: 'enabled',
    //product ads
    createProductAds: false,
    selectedProductAds: [],
    //targetings
    createTargetings: false,
    targetingType: 'keywords',
    keywords: [],
    targets: [],
    //negative targetings
    createNegativeTargetings: false,
    negativeTargetingType: 'keywords',
    negativeTargets: [],

    negativeKeywords: [],
    negativeCampaignKeywords: []
}

const CreateAdGroupWindow = ({onReloadList}) => {
    const [createData, setCreateData] = useState({...defaultState}),
        [currentStep, setCurrentStep] = useState(0),
        [skippedSteps, setSkippedSteps] = useState([]),
        [processSteps, setProcessSteps] = useState([]),
        [finishedSteps, setFinishedSteps] = useState([]),
        [campaigns, setCampaigns] = useState([]),
        [createProcessing, setCreateProcessing] = useState(false)


    const dispatch = useDispatch()

    const visibleWindow = useSelector(state => state.analytics.visibleCreationWindows.adGroup),
        mainState = useSelector(state => state.analytics.mainState),
        stateDetails = useSelector(state => state.analytics.stateDetails)

    const closeWindowHandler = () => {
        dispatch(analyticsActions.setVisibleCreateWindow({adGroup: false}))
    }

    const resetFinishedSteps = () => {
        setFinishedSteps(finishedSteps.filter(i => i < currentStep))
        setProcessSteps(processSteps.filter(i => i < currentStep))
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

    const changeDataHandler = (value) => {
        resetFinishedSteps()

        setCreateData(prevState => ({...prevState, ...value}))
    }

    const createAdGroupHandler = async () => {
        setCreateProcessing(true)

        try {
            const {result} = await analyticsServices.exactCreate('ad-groups', {
                advertisingType: createData.advertisingType,
                name: createData.name,
                defaultBid: createData.adGroupBid,
                campaignId: createData.campaignId,
                state: createData.state,
            })

            if (createData.createProductAds) {
                await analyticsServices.exactCreate('product-ads', {
                    campaignId: createData.campaignId,
                    adGroupId: result.entities[0].adGroupId,
                    advertisingType: createData.advertisingType,
                    sku: createData.selectedProductAds[0].sku,
                    state: 'enabled'
                })
            }

            if (createData.createTargetings) {
                await analyticsServices.bulkCreate('targetings', {
                    targetings: mapTargetingsDataRequest(createData)
                })
            }

            if (createData.createNegativeTargetings) {
                await analyticsServices.bulkCreate('negative-targetings', {
                    negativeTargetings: mapNegativeTargetings({
                        ...createData,
                        adGroupId: result.entities[0].adGroupId
                    })
                })
            }

            onReloadList()
            closeWindowHandler()
            setCreateData({...defaultState})
            notification.success({title: 'Ad Group created'})
        } catch (e) {
            console.log(e)
        }

        setCreateProcessing(false)
    }

    const getCampaigns = async (type, page = 1, cb, searchStr = undefined) => {
        if (createData.advertisingType) {
            try {
                const res = await analyticsServices.fetchCampaignsForTargeting({
                    page,
                    type: createData.advertisingType,
                    name: searchStr
                })

                if (page === 1) setCampaigns([...res.result])
                else setCampaigns([...campaigns, ...res.result])
                cb && cb(res.result.length !== 0)
            } catch (e) {
                console.log(e)
            }
        } else {
            setCampaigns([])
        }
    }

    const nextStepValidation = () => {
        if (currentStep === 0 && (!createData.name || createData.adGroupBid === 0)) return true
        else if (currentStep === 1 && createData.createProductAds && createData.selectedProductAds.length === 0) return true
        else if (currentStep === 2 && createData.createTargetings && (createData.targetingType === 'keywords' ? createData.keywords.length === 0 : createData.targets.length === 0)) return true
        else if (currentStep === 3 && createData.createNegativeTargetings && (createData.negativeTargetingType === 'keywords' ? (createData.negativeKeywords.length === 0 && createData.negativeCampaignKeywords.length === 0) : (createData.negativeTargets.length === 0 && createData.negativeCampaignKeywords.length === 0))) return true
        else return false
    }


    useEffect(() => {
        getCampaigns()
    }, [createData.advertisingType])

    useEffect(() => {
        if (mainState.campaignId) {
            setCreateData(prevState => ({
                ...prevState,
                campaignId: mainState.campaignId,
                campaignName: stateDetails.name,
                advertisingType: stateDetails.advertisingType,
            }))
        }
    }, [mainState, stateDetails])

    useEffect(() => {
        if (createData.createTargetings) {
            changeDataHandler({
                negativeTargetingType: createData.targetingType,
                disabledNegativeTargetingType: true,
            })
        } else {
            changeDataHandler({
                disabledNegativeTargetingType: false
            })
        }
    }, [createData.createTargetings, createData.targetingType])

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
                    createData={createData}
                    campaigns={campaigns}

                    getCampaigns={getCampaigns}
                    onChange={changeDataHandler}
                />}

                {currentStep === 1 &&
                <ProductAdsDetails
                    createData={createData}
                    onChange={changeDataHandler}
                />}

                {currentStep === 2 && <div className={'step step-4 targetings-details-step'}>
                    <div className="row">
                        <div className="col create-switch">
                            <Radio.Group value={createData.createTargetings}
                                         onChange={({target: {value}}) => changeDataHandler({createTargetings: value})}>
                                <h4>Targetings</h4>

                                <Radio value={true}>
                                    Create Targetings
                                </Radio>

                                <Radio value={false}>
                                    Do not create Targetings
                                </Radio>
                            </Radio.Group>
                        </div>
                    </div>

                    <RenderTargetingsDetails
                        createData={createData}
                        targetingType={createData.targetingType}
                        disabledTargetingType={createData.disabledTargetingType}
                        disabled={!createData.createTargetings}
                        onUpdate={changeDataHandler}
                    />
                </div>}

                {currentStep === 3 && <div className={'step step-4 targetings-details-step'}>
                    <div className="row">
                        <div className="col create-switch">
                            <Radio.Group value={createData.createNegativeTargetings}
                                         onChange={({target: {value}}) => changeDataHandler({createNegativeTargetings: value})}>
                                <h4>Negative Targetings</h4>

                                <Radio value={true}>
                                    Create Negative Targetings
                                </Radio>

                                <Radio value={false}>
                                    Do not create Negative Targetings
                                </Radio>
                            </Radio.Group>
                        </div>
                    </div>

                    <NegativeTargetingsDetails
                        createData={createData}
                        onChange={changeDataHandler}
                        disabled={!createData.createNegativeTargetings}
                    />
                </div>}

                {currentStep === 4 &&
                <CreateCampaignOverview
                    createData={createData}
                    overviewType={'adGroups'}
                />}
            </div>

            <WindowFooter
                processing={createProcessing}
                steps={steps}
                currentStep={currentStep}
                goNext={goToNextStepHandler}
                goPrevious={goToPreviousStepHandler}
                onCreate={createAdGroupHandler}
                disableNextStep={nextStepValidation()}
                createButtonTitle={'Create Ad Group'}
            />
        </ModalWindow>
    )
}

export default CreateAdGroupWindow
