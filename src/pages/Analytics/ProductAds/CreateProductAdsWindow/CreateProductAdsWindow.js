import React, {useEffect, useState} from "react"
import ModalWindow from "../../../../components/ModalWindow/ModalWindow"
import WindowHeader from "../../Campaigns/CreateCampaignWindow/WindowHeader"
import {analyticsActions} from "../../../../actions/analytics.actions"
import {useDispatch, useSelector} from "react-redux"
import {Radio, Select, Spin} from "antd"
import CustomSelect from "../../../../components/Select/Select"
import AllProducts from "../../Campaigns/CreateCampaignWindow/CreateSteps/ProductAdsDetails/AllProducts"
import SelectedProduct from "../../Campaigns/CreateCampaignWindow/CreateSteps/ProductAdsDetails/SelectedProduct"
import '../../Campaigns/CreateCampaignWindow/CreateSteps/ProductAdsDetails/ProductAdsDetails.less'
import './CreateProductAdsWindow.less'
import {analyticsServices} from "../../../../services/analytics.services"
import {InfinitySelect, RenderTargetingsDetails} from "../../Targetings/CreateTargetingsWindow/CreateTargetingsWindow"
import {notification} from "../../../../components/Notification"
import CreateProcessing from "../../Campaigns/CreateCampaignWindow/CreateProcessing"
import CreateCampaignOverview from "../../Campaigns/CreateCampaignWindow/CreateSteps/CreateCampaignOverview"
import _ from 'lodash'
import {NegativeTargetingsDetails} from "../../NegativeTargetings/CreateNegativeTargetingsWindow/NegativeTargetingsDetails"
import {mapNegativeTargetings} from "../../NegativeTargetings/CreateNegativeTargetingsWindow/CreateNegativeTargetingsWindow"

const Option = Select.Option

const steps = [
    'Product Ads',
    'Targetings',
    'Negative Targetings',
    'Overview',
]

const CreateProductAdsWindow = ({location, onReloadList}) => {
    const [currentStep, setCurrentStep] = useState(0),
        [skippedSteps, setSkippedSteps] = useState([]),
        [finishedSteps, setFinishedSteps] = useState([]),
        [processSteps, setProcessSteps] = useState([]),
        [createData, setCreateData] = useState({
            campaignId: undefined,
            adGroupId: undefined,
            advertisingType: undefined,

            selectedProductAds: [],

            create_targetings: false,
            keywords: [],
            targets: [],

            createNegativeTargetings: false,
            negativeTargets: [],
            negativeCampaignTargets: [],

            negativeKeywords: [],
            negativeCampaignKeywords: [],
        }),
        [campaigns, setCampaigns] = useState([]),
        [adGroups, setAdGroups] = useState([]),
        [createProcessing, setCreateProcessing] = useState(false)

    const dispatch = useDispatch()

    const visibleWindow = useSelector(state => state.analytics.visibleCreationWindows.productAds),
        mainState = useSelector(state => state.analytics.mainState),
        stateDetails = useSelector(state => state.analytics.stateDetails)

    const closeWindowHandler = () => {
        dispatch(analyticsActions.setVisibleCreateWindow({productAds: false}))
    }

    const goToSelectStep = (step) => {
        if (finishedSteps.includes(step) || processSteps.includes(step)) {
            setProcessSteps(prevState => [...prevState, currentStep])
            setCurrentStep(step)
        }
    }

    const goToNextStepHandler = (step) => {
        if (step) {
            setFinishedSteps([...Array(3).keys()].filter(i => i < step))
            setCurrentStep(step)
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

    const onCreate = async () => {
        setCreateProcessing(true)

        try {
            await analyticsServices.exactCreate(location, {
                campaignId: createData.campaignId,
                adGroupId: createData.adGroupId,
                advertisingType: createData.advertisingType,
                sku: createData.selectedProductAds[0].sku,
                state: 'enabled'
            })

            if (createData.create_targetings) {
                const targetingType = createData.targetingType

                await analyticsServices.exactCreate('targetings', {
                    targetings: createData[`${targetingType}`].map(i => ({
                            advertisingType: createData.advertisingType,
                            campaignId: createData.campaignId || mainState.campaignId,
                            adGroupId: createData.adGroupId || mainState.adGroupId,
                            state: 'enabled',
                            entityType: targetingType === 'keywords' ? 'keyword' : 'target',
                            calculatedBid: i.calculatedBid,
                            ...targetingType === 'keywords' ? {
                                calculatedTargetingText: i.keywordText,
                                calculatedTargetingMatchType: i.matchType
                            } : {
                                expressionType: 'manual',
                                expression: [{
                                    "type": "asinSameAs",
                                    "value": i.text
                                }]
                            }
                        }
                    ))
                })
            }

            if (createData.createNegativeTargetings) {
                await analyticsServices.bulkCreate('negative-targetings', {negativeTargetings: mapNegativeTargetings(createData)})
            }


            closeWindowHandler()
            onReloadList()
            notification.success({title: 'Product Ads created'})
        } catch (e) {
            console.log(e)
        }

        setCreateProcessing(false)
    }

    const resetFinishedSteps = () => {
        setFinishedSteps(finishedSteps.filter(i => i < currentStep))
        setProcessSteps(processSteps.filter(i => i < currentStep))
    }

    const changeCampaignHandler = value => {
        resetFinishedSteps()

        setAdGroups([])
        setCreateData(prevState => ({
            ...prevState,
            campaignId: value,
            campaignName: _.find(campaigns, {campaignId: value}).name,
            adGroupId: undefined
        }))
    }

    const targetingsValidation = async (data) => {
        try {
            const res = analyticsServices.targetingsValidation(data)

            return res
        } catch (e) {
            console.log(e)
        }
    }

    const changeAdGroupHandler = async id => {
        resetFinishedSteps()

        setCreateData(prevState => ({
            ...prevState,
            adGroupId: id,
            adGroupName: _.find(adGroups, {adGroupId: id}).name,
            adGroupBid: _.find(adGroups, {adGroupId: id}).defaultBid
        }))

        try {
            const res = await analyticsServices.fetchAdGroupDetails(id)

            const type = res.result.adGroupTargetingType

            setCreateData(prevState => ({
                ...prevState,
                targetingType: type === 'any' ? 'keywords' : type,
                disabledTargetingType: type !== 'any'
            }))
        } catch (e) {
            console.log(e)
        }

    }

    const changeDataHandler = data => {
        resetFinishedSteps()

        setCreateData(prevState => ({...prevState, ...data}))
    }

    const getCampaigns = async (type, page = 1, cb, searchStr = undefined) => {
        if (createData.advertisingType) {
            try {
                const res = await analyticsServices.fetchCampaignsForTargeting({
                    page,
                    type: type || createData.advertisingType,
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

    const getAdGroups = async (id, page = 1, cb, searchStr = undefined) => {
        if (createData.campaignId) {
            try {
                const res = await analyticsServices.fetchAdGroupsForTargeting({
                    page,
                    id: id || createData.campaignId,
                    name: searchStr
                })

                setAdGroups(res.result)

                if (page === 1) setAdGroups([...res.result])
                else setAdGroups([...adGroups, ...res.result])
                cb && cb(res.result.length !== 0)
            } catch (e) {
                console.log(e)
            }
        } else {
            setAdGroups([])
        }
    }

    const nextStepValidation = () => {
        if (currentStep === 0 && createData.selectedProductAds.length === 0) return true
        else if (currentStep === 1 && createData.create_targetings && (createData.targetingType === 'keywords' ? createData.keywords.length === 0 : createData.targets.length === 0)) return true
        else if (currentStep === 2 && createData.createNegativeTargetings && (createData.negativeTargetingType === 'keywords' ? (createData.negativeKeywords.length === 0 && createData.negativeCampaignKeywords.length === 0) : (createData.negativeTargets.length === 0 && createData.negativeCampaignTargets.length === 0))) return true
        else return false
    }


    useEffect(() => {
        if (mainState.adGroupId) setCreateData(prevState => ({
            ...prevState,
            advertisingType: stateDetails.advertisingType,
            campaignId: mainState.campaignId,
            adGroupId: mainState.adGroupId
        }))
        else if (mainState.campaignId) setCreateData(prevState => ({
            ...prevState,
            advertisingType: stateDetails.advertisingType,
            campaignId: mainState.campaignId,
        }))
    }, [mainState])

    useEffect(() => {
        getCampaigns()
    }, [createData.advertisingType])

    useEffect(() => {
        getAdGroups()
    }, [createData.campaignId])

    return (<ModalWindow
            className={'create-campaign-window create-product-ads-window'}
            visible={visibleWindow}
            footer={false}
            handleCancel={closeWindowHandler}
        >
            <WindowHeader
                title={'Create Product Ads'}
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
                {currentStep === 0 && <>
                    {!mainState.adGroupId && <>
                        {!mainState.campaignId && <>
                            <div className={`row`}>
                                <div className="col w-p">
                                    <div className="form-group">
                                        <label htmlFor="">Advertising Type</label>
                                        <CustomSelect
                                            placeholder={'Select by'}
                                            getPopupContainer={trigger => trigger.parentNode}
                                            onChange={(value) => changeDataHandler({advertisingType: value})}
                                            value={createData.advertisingType}
                                        >
                                            <Option value={'SponsoredProducts'}>
                                                Sponsored Products
                                            </Option>

                                            <Option value={'SponsoredDisplay'}>
                                                Sponsored Display
                                            </Option>
                                        </CustomSelect>
                                    </div>

                                </div>

                                <div className="col description"/>
                            </div>

                            <div className={`row`}>
                                <div className="col w-p">
                                    <InfinitySelect
                                        label={'Select Campaign'}
                                        placeholder={'Select campaign'}
                                        value={createData.campaignId}
                                        onChange={changeCampaignHandler}
                                        disabled={!createData.advertisingType}
                                        children={campaigns}
                                        onLoadMore={(page, cb, searchStr) => getCampaigns(createData.advertisingType, page, cb, searchStr)}
                                        reloadPage={createData.advertisingType}
                                        dataKey={'campaignId'}
                                        notFoundContent={'No campaigns'}
                                    />
                                </div>

                                <div className="col description"/>
                            </div>
                        </>}

                        <div className={`row`}>
                            <div className="col w-p">
                                <InfinitySelect
                                    label={'Ad Group'}
                                    placeholder={'Select ad group'}
                                    value={createData.adGroupId}
                                    onChange={changeAdGroupHandler}
                                    disabled={!createData.campaignId}
                                    reloadPage={createData.campaignId}
                                    children={adGroups}
                                    onLoadMore={(page, cb, searchStr) => getAdGroups(createData.campaignId, page, cb, searchStr)}
                                    dataKey={'adGroupId'}
                                    notFoundContent={'No ad groups'}
                                />
                            </div>

                            <div className="col description"/>
                        </div>
                    </>}

                    <div className="product-ads-details-step">
                        <h3>Products</h3>

                        <div className={`row  ${!createData.adGroupId ? 'disabled' : ''}`}>
                            <AllProducts
                                createData={createData}
                                disabledBlock={!createData.adGroupId}

                                onChange={changeDataHandler}
                            />

                            <SelectedProduct
                                selectedProducts={createData.selectedProductAds}

                                onChange={changeDataHandler}
                            />
                        </div>
                    </div>
                </>}


                {currentStep === 1 && <div className={'step step-4 targetings-details-step'}>
                    <div className="row">
                        <div className="col create-switch">
                            <Radio.Group value={createData.create_targetings}
                                         onChange={({target: {value}}) => changeDataHandler({create_targetings: value})}>
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
                        onUpdate={changeDataHandler}
                        onValidate={targetingsValidation}
                    />
                </div>}

                {currentStep === 2 && <div className={'step step-4 targetings-details-step'}>
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

                {currentStep === 3 && <CreateCampaignOverview createData={createData} overviewType={location}/>}
            </div>

            <div className="window-footer">
                {currentStep === 0 && <button
                    className={`btn white`}
                    onClick={() => goToNextStepHandler(3)}
                    disabled={createProcessing || createData.selectedProductAds.length === 0}
                >
                    Create Product Ads
                </button>}

                {currentStep > 0 && <button
                    className="btn white"
                    onClick={goToPreviousStepHandler}
                    disabled={createProcessing}
                >
                    Previous
                </button>}

                {currentStep < 2 && <button
                    className="btn default"
                    onClick={() => goToNextStepHandler()}
                    disabled={createProcessing || nextStepValidation()}
                >
                    Next
                </button>}

                {currentStep === 2 && <button
                    className={`btn default`}
                    onClick={onCreate}
                    disabled={createProcessing || createData.selectedProductAds.length === 0}
                >
                    Create Product Ads

                    {createProcessing && <Spin size={'small'}/>}
                </button>}
            </div>
        </ModalWindow>
    )
}

export default CreateProductAdsWindow
