import React, {useEffect, useState} from "react"
import ModalWindow from "../../../../components/ModalWindow/ModalWindow"
import WindowHeader from "../../Campaigns/CreateCampaignWindow/WindowHeader"
import {analyticsActions} from "../../../../actions/analytics.actions"
import {useDispatch, useSelector} from "react-redux"
import {Select, Spin} from "antd"
import CustomSelect from "../../../../components/Select/Select"
import '../../Campaigns/CreateCampaignWindow/CreateSteps/TargetingsDetails/TargetingsDetails.less'
import '../../Targetings/CreateTargetingsWindow/CreateTargetingsWindow.less'
import {analyticsServices} from "../../../../services/analytics.services"
import {InfinitySelect} from "../../Targetings/CreateTargetingsWindow/CreateTargetingsWindow"
import {NegativeTargetingsDetails} from "./NegativeTargetingsDetails"
import {notification} from "../../../../components/Notification"

const Option = Select.Option

const defaultState = {
    campaignId: undefined,
    adGroupId: undefined,
    advertisingType: undefined,

    negativeTargetingType: '',
    disabledTargetingType: true,

    negativeTargets: [],
    negativeKeywords: [],
    negativeCampaignKeywords: [],
}

export const mapNegativeTargetings = (createData) => {
    const defaultData = {
        campaignId: createData.campaignId,
        adGroupId: createData.adGroupId,
        state: 'enabled',
        expressionType: 'manual',
        advertisingType: createData.advertisingType,
    }

    if (createData.negativeTargetingType === 'keywords') {
        return ([
            ...createData.negativeKeywords.map(i => ({
                ...defaultData,
                entityType: 'negativeKeyword',
                calculatedTargetingText: i.keywordText,
                calculatedTargetingMatchType: i.matchType,
            })),
            ...createData.negativeCampaignKeywords.map(i => ({
                ...defaultData,
                entityType: 'campaignNegativeKeyword',
                calculatedTargetingText: i.keywordText,
                calculatedTargetingMatchType: i.matchType,
            }))
        ])
    } else {
        return ([
            ...createData.negativeTargets.map(i => ({
                ...defaultData,
                entityType: 'negativeTarget',
                calculatedTargetingText: i.keywordText,
                calculatedTargetingMatchType: i.matchType,
            })),

            ...createData.advertisingType === 'SponsoredProducts' ? createData.negativeCampaignKeywords.map(i => ({
                ...defaultData,
                entityType: 'campaignNegativeKeyword',
                calculatedTargetingText: i.keywordText,
                calculatedTargetingMatchType: i.matchType,
            })) : []
        ])
    }
}

const CreateNegativeTargetingsWindow = ({location, onReloadList}) => {
    const [createData, setCreateData] = useState({...defaultState}),
        [campaigns, setCampaigns] = useState([]),
        [adGroups, setAdGroups] = useState([]),
        [createProcessing, setCreateProcessing] = useState(false),
        [fetchAdGroupDetailsProcessing, setFetchAdGroupDetailsProcessing] = useState(false)

    const dispatch = useDispatch()

    const visibleWindow = useSelector(state => state.analytics.visibleCreationWindows[location]),
        mainState = useSelector(state => state.analytics.mainState),
        stateDetails = useSelector(state => state.analytics.stateDetails)

    const closeWindowHandler = () => {
        dispatch(analyticsActions.setVisibleCreateWindow({[`${location}`]: false}))
    }

    const changeCreateDataHandler = (value) => {
        setCreateData(prevState => ({...prevState, ...value}))
    }

    const getAdGroupDetails = async (id) => {
        setFetchAdGroupDetailsProcessing(true)

        try {
            const res = await analyticsServices.fetchAdGroupDetails(id)

            const type = res.result.adGroupTargetingType

            changeCreateDataHandler({
                negativeTargetingType: type === 'any' ? 'keywords' : type,
                disabledNegativeTargetingType: type !== 'any'
            })
        } catch (e) {
            console.log(e)
        }

        setFetchAdGroupDetailsProcessing(false)
    }


    const onCreate = async () => {
        setCreateProcessing(true)

        try {
            const res = await analyticsServices.bulkCreate(location, {negativeTargetings: mapNegativeTargetings(createData)})

            const success = res.result.success,
                failed = res.result.failed,
                notApplicable = res.result.notApplicable

            if (failed > 0 || notApplicable > 0) {
                notification.error({title: `${failed + notApplicable} ${failed + notApplicable === 1 ? 'entity' : 'entities'} failed to create`})
            }

            if (success > 0) {
                notification.success({title: `${success} ${success === 1 ? 'entity' : 'entities'} created`})
                onReloadList()
            }

            if (failed === 0) {
                closeWindowHandler()

                setCreateData({...defaultState})
            }
        } catch (e) {
            console.log(e)
        }

        setCreateProcessing(false)
    }

    const changeCampaignHandler = value => {
        setAdGroups([])
        setCreateData(prevState => ({
            ...prevState,
            campaignId: value,
            adGroupId: undefined,
        }))
    }
    const changeAdGroupHandler = id => {
        setCreateData(prevState => ({
            ...prevState,
            adGroupId: id
        }))
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

    useEffect(() => {
        if (mainState.adGroupId) setCreateData(prevState => ({
            ...prevState,
            advertisingType: stateDetails.advertisingType,
            campaignId: mainState.campaignId,
            adGroupId: mainState.adGroupId,
            campaignName: stateDetails.campaignName,
            adGroupName: stateDetails.adGroupName
        }))
        else if (mainState.campaignId) setCreateData(prevState => ({
            ...prevState,
            advertisingType: stateDetails.advertisingType,
            campaignId: mainState.campaignId,
            campaignName: stateDetails.name,
        }))
    }, [mainState, stateDetails])

    useEffect(() => {
        getCampaigns()
    }, [createData.advertisingType])

    useEffect(() => {
        getAdGroups()
    }, [createData.campaignId])

    useEffect(() => {
        if (createData.adGroupId) getAdGroupDetails(createData.adGroupId)
    }, [createData.adGroupId])

    const nextStepValidation = () => {
        if (createData.negativeTargetingType === 'keywords' ? (createData.negativeKeywords.length === 0 && createData.negativeCampaignKeywords.length === 0) : (createData.negativeTargets.length === 0 && createData.negativeCampaignKeywords.length === 0)) return true
        else return false
    }

    return (<ModalWindow
            className={'create-campaign-window  create-targetings-window create-negative-targetings-window'}
            visible={visibleWindow}
            footer={false}
            handleCancel={closeWindowHandler}
        >
            <WindowHeader
                title={'Create Negative Targetings'}
                onClose={closeWindowHandler}
            />

            <div className="create-steps">
                {!mainState.adGroupId && <div className={'step step-0'}>
                    {!mainState.campaignId && <>
                        <div className={`row`}>
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="">Advertising Type</label>
                                    <CustomSelect
                                        placeholder={'Select by'}
                                        getPopupContainer={trigger => trigger.parentNode}
                                        onChange={(value) => changeCreateDataHandler({
                                            advertisingType: value,
                                            negativeTargetingType: undefined,
                                            campaignId: undefined,
                                            adGroupId: undefined
                                        })}
                                        value={createData.advertisingType}
                                    >
                                        <Option value={'SponsoredProducts'}>
                                            Sponsored Products
                                        </Option>

                                        <Option value={'SponsoredDisplay'}>
                                            Sponsored Display
                                        </Option>

                                        <Option value={'SponsoredBrands'}>
                                            Sponsored Brands
                                        </Option>
                                    </CustomSelect>
                                </div>

                            </div>

                            <div className="col description"/>
                        </div>

                        <div className={`row`}>
                            <div className="col">
                                <div className="form-group">
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
                            </div>

                            <div className="col description"/>
                        </div>
                    </>}

                    <div className={`row`}>
                        <div className="col">
                            <div className="form-group">
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
                        </div>

                        <div className="col description"/>
                    </div>
                </div>}

                {fetchAdGroupDetailsProcessing ? <div className="targeting-type-loading">
                    Loading ad group information
                    <Spin/>
                </div> : createData.negativeTargetingType ?
                    <NegativeTargetingsDetails
                        createData={createData}
                        widthBid={false}
                        onChange={changeCreateDataHandler}
                    />
                    : ''}
            </div>

            <div className="window-footer">
                <button
                    className="btn default"
                    onClick={onCreate}
                    disabled={createProcessing || nextStepValidation()}
                >
                    Create Negative Targetings

                    {createProcessing && <Spin size={'small'}/>}
                </button>
            </div>
        </ModalWindow>
    )
}

export default CreateNegativeTargetingsWindow
