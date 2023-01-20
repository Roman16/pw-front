import React, {useEffect, useState} from "react"
import ModalWindow from "../../../../components/ModalWindow/ModalWindow"
import WindowHeader from "../../Campaigns/CreateCampaignWindow/WindowHeader"
import {analyticsActions} from "../../../../actions/analytics.actions"
import {useDispatch, useSelector} from "react-redux"
import {Radio, Select, Spin} from "antd"
import CustomSelect from "../../../../components/Select/Select"
import '../../Campaigns/CreateCampaignWindow/CreateSteps/TargetingsDetails/TargetingsDetails.less'
import './CreateTargetingsWindow.less'
import {analyticsServices} from "../../../../services/analytics.services"
import KeywordsList from "./KeywordsList"
import TargetsList from "./TargetsList"
import {notification} from "../../../../components/Notification"
import _ from "lodash"

const Option = Select.Option

const defaultState = {
    targets: [],
    keywords: [],
    advertisingType: undefined,
    campaignId: undefined,
    adGroupId: undefined,
    calculatedBid: undefined
}

const CreateTargetingsWindow = ({onReloadList}) => {
    const [createData, setCreateData] = useState({...defaultState}),
        [createProcessing, setCreateProcessing] = useState(false),
        [fetchAdGroupDetailsProcessing, setFetchAdGroupDetailsProcessing] = useState(false),
        [campaigns, setCampaigns] = useState([]),
        [adGroups, setAdGroups] = useState([]),
        [targetingType, setTargetingType] = useState(),
        [disabledTargetingType, setDisabledTargetingType] = useState(true)


    const dispatch = useDispatch()

    const visibleWindow = useSelector(state => state.analytics.visibleCreationWindows.targetings),
        mainState = useSelector(state => state.analytics.mainState),
        stateDetails = useSelector(state => state.analytics.stateDetails)

    const closeWindowHandler = () => {
        dispatch(analyticsActions.setVisibleCreateWindow({targetings: false}))
    }

    const changeCreateDataHandler = (value) => {
        if (value.targetingType) setTargetingType(value.targetingType)
        else setCreateData(prevState => ({...prevState, ...value}))
    }

    const onCreate = async () => {
        if (createData[targetingType].some(i => i.calculatedBid > 1000 || i.calculatedBid < 0.02)) {
            notification.error({title: 'Targeting bid should be greater than $0.02 and less than $1,000'})
            return
        }

        setCreateProcessing(true)

        try {
            const res = await analyticsServices.bulkCreate('targetings', {
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
                }
            )
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

            if (failed + notApplicable === 0) {
                dispatch(analyticsActions.setVisibleCreateWindow({targetings: false}))
                if (mainState.adGroupId) {
                    setCreateData({
                        ...defaultState,
                        campaignId: mainState.campaignId,
                        adGroupId: mainState.adGroupId,
                        advertisingType: stateDetails.advertisingType
                    })

                    setDisabledTargetingType(true)
                } else if (mainState.campaignId) {
                    setCreateData({
                        ...defaultState,
                        campaignId: mainState.campaignId,
                        advertisingType: stateDetails.advertisingType,
                        adGroupId: undefined
                    })
                    setTargetingType(undefined)
                } else {
                    setCreateData({...defaultState})
                    setTargetingType(undefined)
                }
            }

            setCreateProcessing(false)
        } catch (e) {
            console.log(e)
            setCreateProcessing(false)
        }
    }

    const getCampaigns = async (type, page = 1, cb, searchStr = undefined) => {
        try {
            const res = await analyticsServices.fetchCampaignsForTargeting({
                page,
                type,
                name: searchStr
            })

            if (page === 1) setCampaigns([...res.result])
            else setCampaigns([...campaigns, ...res.result])
            cb && cb(res.result.length !== 0)
        } catch (e) {
            console.log(e)
        }
    }

    const getAdGroups = async (id, page = 1, cb, searchStr = undefined) => {
        try {
            const res = await analyticsServices.fetchAdGroupsForTargeting({
                page,
                id,
                name: searchStr
            })

            setAdGroups(res.result)

            if (page === 1) setAdGroups([...res.result])
            else setAdGroups([...adGroups, ...res.result])
            cb && cb(res.result.length !== 0)
        } catch (e) {
            console.log(e)
        }
    }

    const getAdGroupDetails = async (id) => {
        setFetchAdGroupDetailsProcessing(true)

        try {
            const res = await analyticsServices.fetchAdGroupDetails(id)

            const type = res.result.adGroupTargetingType

            setTargetingType(type === 'any' ? 'keywords' : type)
            setDisabledTargetingType(type !== 'any')
        } catch (e) {
            console.log(e)
        }

        setFetchAdGroupDetailsProcessing(false)
    }

    const targetingsValidation = async (data) => {
        try {
            const res = analyticsServices.targetingsValidation(data)

            return res
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        if (mainState.adGroupId) {
            getAdGroupDetails(mainState.adGroupId)

            setCreateData({
                ...createData,
                campaignId: mainState.campaignId,
                adGroupId: mainState.adGroupId
            })
        }

        if (mainState.campaignId) setCreateData({
            ...createData,
            campaignId: mainState.campaignId,
            adGroupId: undefined
        })
    }, [mainState.adGroupId, mainState.campaignId])

    useEffect(() => {
        if (mainState.campaignId) setCreateData({
            ...createData,
            campaignId: mainState.campaignId,
            advertisingType: stateDetails.advertisingType
        })
    }, [stateDetails])

    useEffect(() => {
        if (createData.campaignId) getAdGroups(createData.campaignId)
    }, [createData.campaignId])

    const changeAdvertisingTypeHandler = value => {
        if (!mainState.campaignId) {
            setCampaigns([])
            setAdGroups([])
            setTargetingType(undefined)
            setCreateData(prevState => ({
                ...prevState,
                advertisingType: value,
                campaignId: undefined,
                adGroupId: undefined
            }))

            getCampaigns(value)
        }
    }

    const changeCampaignHandler = value => {
        setAdGroups([])
        setTargetingType(undefined)
        setCreateData(prevState => ({
            ...prevState,
            campaignId: value,
            adGroupId: undefined
        }))
    }

    const changeAdGroupHandler = id => {
        setCreateData(prevState => ({
            ...prevState,
            adGroupId: id,
            adGroupBid: _.find(adGroups, {adGroupId: id}).defaultBid
        }))

        getAdGroupDetails(id)
    }

    return (<ModalWindow
            className={'create-campaign-window create-portfolio-window create-campaign-window create-targetings-window exact-create-window'}
            visible={visibleWindow}
            footer={false}
            destroyOnClose={true}
            handleCancel={closeWindowHandler}
        >
            <WindowHeader
                title={'Create Targetings'}
                onClose={closeWindowHandler}
            />

            <div className="create-steps">
                {!mainState.adGroupId && <>
                    {!mainState.campaignId && <>
                        <div className={`row`}>
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="">Advertising Type</label>
                                    <CustomSelect
                                        placeholder={'Select type'}
                                        getPopupContainer={trigger => trigger.parentNode}
                                        onChange={changeAdvertisingTypeHandler}
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

                            <div className="col description">

                            </div>
                        </div>

                        <div className={`row`}>
                            <div className="col">
                                <InfinitySelect
                                    label={'Campaign'}
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

                            <div className="col description">

                            </div>
                        </div>
                    </>}

                    <div className={`row`}>
                        <div className="col">
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

                        <div className="col description">

                        </div>
                    </div>
                </>}

                {fetchAdGroupDetailsProcessing ? <div className="targeting-type-loading">
                    Loading ad group information
                    <Spin/>
                </div> : targetingType ?
                    <RenderTargetingsDetails
                        createData={createData}
                        targetingType={targetingType}
                        disabledTargetingType={disabledTargetingType}
                        onUpdate={changeCreateDataHandler}
                        onValidate={targetingsValidation}
                    />
                    : ''}
            </div>

            <div className="window-footer">
                <button
                    className="btn default"
                    onClick={onCreate}
                    disabled={!targetingType || (targetingType && createData[targetingType].length === 0) || createProcessing}
                >
                    Create Targetings
                    {createProcessing && <Spin size={'small'}/>}
                </button>
            </div>
        </ModalWindow>
    )
}

let timeoutId

export const InfinitySelect = React.memo((props) => {
    const [loading, setLoading] = useState(false),
        [loadingSearching, setLoadingSearching] = useState(false),
        [page, setPage] = useState(1),
        [hasMore, setHasMore] = useState(true),
        [selectList, setSelectList] = useState([]),
        [searchValue, setSearchValue] = useState()

    const scrollPopupHandler = (event) => {
        const target = event.target

        if (!loading && hasMore && target.scrollTop + target.offsetHeight === target.scrollHeight) {
            setLoading(true)

            props.onLoadMore(page + 1, (res) => {
                setLoading(false)
                setHasMore(res)
                target.scrollTo(0, target.scrollHeight - 1200)
            }, searchValue)
            setPage(page + 1)
        }
    }

    const changeSearchHandler = (value) => {
        setSearchValue(value)
        setPage(1)

        if (value.length > 2) {

            setLoadingSearching(true)

            clearTimeout(timeoutId)

            timeoutId = setTimeout(() => {
                props.onLoadMore(1, (res) => {
                    setLoading(false)
                    setHasMore(res)
                }, value)
            }, 500)
        } else if (value === '') {
            props.onLoadMore(1, (res) => {
                setLoading(false)
                setHasMore(res)
            }, undefined)
        }

        setLoadingSearching(false)
    }

    useEffect(() => {
        setPage(1)
        setHasMore(true)
    }, [props.reloadPage])

    useEffect(() => {
        setSelectList([...props.children])
    }, [props.children])

    return (<div className="form-group">
            <label htmlFor="">{props.label}</label>
            <CustomSelect
                showSearch
                optionFilterProp={false}
                filterOption={false}
                // searchValue={searchValue}
                getPopupContainer={trigger => trigger.parentNode}
                onPopupScroll={scrollPopupHandler}
                loading={loadingSearching}
                onSearch={changeSearchHandler}
                dropdownClassName={'infinity-select-popup'}

                {...props}
            >
                {selectList.map(i => <Option value={i[props.dataKey]}>
                    {i.name}
                </Option>)}

                {loading && <Option key="loading"><Spin size={'small'}/></Option>}
            </CustomSelect>
        </div>
    )
})

export const RenderTargetingsDetails = ({createData, onUpdate, targetingType, onValidate, disabledTargetingType, disabled}) => {
    return (<div className="targetings-details-step">
        <div className={`row `}>
            <div className="col">
                <Radio.Group
                    value={targetingType}
                    disabled={disabledTargetingType || disabled}
                    onChange={({target: {value}}) => onUpdate({targetingType: value})}
                >
                    <h4>Targeting type</h4>
                    <p className={'block-description'}>
                        Can't be changed since ad group already
                        has {targetingType === 'keywords' ? 'keyword' : 'product'} targetings
                    </p>

                    <Radio value={'keywords'}>
                        Keyword Targeting
                    </Radio>
                    <div className="radio-description">
                        Choose keywords to help your products appear in shopper searches.
                    </div>

                    <Radio value={'targets'}>
                        Product Targeting
                    </Radio>

                    <div className="radio-description">
                        Choose specific products, categories, brands, or other product features to target your ads.
                    </div>
                </Radio.Group>
            </div>

            <div className="col description">

            </div>
        </div>

        {targetingType === 'keywords' ? <KeywordsList
            createData={createData}
            targetingType={targetingType}
            keywords={createData.keywords}
            onUpdate={(value) => onUpdate({keywords: value})}
            onValidate={onValidate}
            disabled={disabled}
        /> : <TargetsList
            createData={createData}
            targetingType={targetingType}
            keywords={createData.targets}
            onUpdate={(value) => onUpdate({targets: value})}
            onValidate={onValidate}
            disabled={disabled}
        />}
    </div>)
}

export default CreateTargetingsWindow
