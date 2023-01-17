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
import {RenderTargetingsDetails} from "../../Targetings/CreateTargetingsWindow/CreateTargetingsWindow"


const CreateAdGroupWindow = () => {
    const [createData, setCreateData] = useState({
            advertisingType: undefined,
            name: '',
            defaultBid: 0,
            campaignId: undefined,
            state: 'enabled',
            calculatedTargetingType: 'auto',
            //product ads
            create_product_ads: false,
            selectedProductAds: [],
            //targetings
            create_targetings: false,
            keywords: [],
            targets: [],

            negative_keywords: [],
            negative_pats: [],
            keyword_targetings: [],
            targetingType: 'keywords',
            disabledTargetingType: false,
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
        [finishedSteps, setFinishedSteps] = useState([]),
        [campaigns, setCampaigns] = useState([])

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

    const changeCreateDataHandler = (value) => {
        resetFinishedSteps()

        setCreateData(prevState => ({...prevState, ...value}))
    }

    const createAdGroupHandler = async () => {
        try {
            await analyticsServices.exactCreate('ad-groups', {
                advertisingType: createData.advertisingType,
                name: createData.name,
                defaultBid: createData.defaultBid,
                campaignId: createData.campaignId,
                state: createData.state,
            })
            closeWindowHandler()
            notification.success({title: 'Ad Group created'})
        } catch (e) {
            console.log(e)
        }
    }

    const targetingsValidation = async (data) => {
        try {
            const res = analyticsServices.targetingsValidation(data)

            return res
        } catch (e) {
            console.log(e)
        }
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
        if (currentStep === 0 && (!createData.name || createData.defaultBid === 0)) return true
        else if (currentStep === 1 && createData.create_product_ads && createData.selectedProductAds.length === 0) return true
        else if (currentStep === 2 && createData.create_targetings && (createData.targetingType === 'keywords' ? createData.keywords.length === 0 : createData.targets.length === 0)) return true
        else return false
    }


    useEffect(() => {
        getCampaigns()
    }, [createData.advertisingType])

    useEffect(() => {
        if (mainState.campaignId) setCreateData(prevState => ({...prevState, campaignId: '444'}))
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
                    createData={createData}
                    campaigns={campaigns}

                    getCampaigns={getCampaigns}
                    onChange={changeCreateDataHandler}
                />}

                {currentStep === 1 &&
                <ProductAdsDetails
                    createData={createData}
                    onChange={changeCreateDataHandler}
                />}

                {currentStep === 2 && <div className={'step step-4 targetings-details-step'}>
                    <div className="row">
                        <div className="col">
                            <Radio.Group value={createData.create_targetings}
                                         onChange={({target: {value}}) => changeCreateDataHandler({create_targetings: value})}>
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
                        disabled={!createData.create_targetings}
                        onUpdate={changeCreateDataHandler}
                        onValidate={targetingsValidation}
                    />
                </div>}

                {currentStep === 3 &&
                <CreateCampaignOverview
                    createData={createData}
                    overviewType={'adGroups'}
                />}
            </div>

            <WindowFooter
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
