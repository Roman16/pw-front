import React, {memo, useEffect, useState} from "react"
import ModalWindow from "../../../../components/ModalWindow/ModalWindow"
import WindowHeader from "../../Campaigns/CreateCampaignWindow/WindowHeader"
import {analyticsActions} from "../../../../actions/analytics.actions"
import {useDispatch, useSelector} from "react-redux"
import {Radio, Select, Spin, Switch} from "antd"
import CustomSelect from "../../../../components/Select/Select"
import '../../Campaigns/CreateCampaignWindow/CreateSteps/TargetingsDetails/TargetingsDetails.less'
import NegativeKeywords from "../../Campaigns/CreateCampaignWindow/CreateSteps/TargetingsDetails/NegativeKeywords"
import './CreateTargetingsWindow.less'
import {analyticsServices} from "../../../../services/analytics.services"
import InputCurrency from "../../../../components/Inputs/InputCurrency"
import NegativePats from "../../Campaigns/CreateCampaignWindow/CreateSteps/TargetingsDetails/NegativePats"
import KeywordTargetingsList
    from "../../Campaigns/CreateCampaignWindow/CreateSteps/TargetingsDetails/KeywordTargetingsList"

const Option = Select.Option

const CreateTargetingsWindow = () => {
    const [createData, setCreateData] = useState({
            keyword_targetings: [],
            negative_pats: [],
            negative_keywords: [],
            advertisingType: undefined,
            campaignId: undefined,
            adGroupId: undefined
        }),
        [createProcessing, setCreateProcessing] = useState(false),
        [fetchAdGroupDetailsProcessing, setFetchAdGroupDetailsProcessing] = useState(false),
        [campaigns, setCampaigns] = useState([]),
        [adGroups, setAdGroups] = useState([]),
        [targetingType, setTargetingType] = useState()


    const dispatch = useDispatch()

    const visibleWindow = useSelector(state => state.analytics.visibleCreationWindows.targetings),
        mainState = useSelector(state => state.analytics.mainState)

    const closeWindowHandler = () => {
        dispatch(analyticsActions.setVisibleCreateWindow({targetings: false}))
    }

    const changeCreateDataHandler = (value) => {
        setCreateData(prevState => ({...prevState, ...value}))
    }

    const onCreate = async () => {
        setCreateProcessing(true)

        try {
            await analyticsServices.exactCreate('targetings', {
                advertisingType: createData.advertisingType,
                campaignId: createData.campaignId,
                adGroupId: createData.adGroupId,
                state: 'paused',
                calculatedTargetingText: createData.negative_keywords.join(',')

            })

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

            setTargetingType(res.result.adGroupTargetingType)
        } catch (e) {
            console.log(e)
        }

        setFetchAdGroupDetailsProcessing(false)
    }

    useEffect(() => {
        setCampaigns([])
        setAdGroups([])
        setTargetingType(undefined)
        setCreateData(prevState => ({
            ...prevState,
            campaignId: undefined,
            adGroupId: undefined
        }))

        if (createData.advertisingType) getCampaigns(createData.advertisingType)
    }, [createData.advertisingType])

    useEffect(() => {
        setAdGroups([])
        setTargetingType(undefined)
        setCreateData(prevState => ({
            ...prevState,
            adGroupId: undefined
        }))

        if (createData.campaignId) getAdGroups(createData.campaignId)
    }, [createData.campaignId])

    useEffect(() => {
        if (createData.adGroupId) getAdGroupDetails(createData.adGroupId)
    }, [createData.adGroupId])


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
            campaignId: mainState.campaignId
        })
    }, [mainState])

    return (<ModalWindow
            className={'create-campaign-window create-portfolio-window create-campaign-window create-targetings-window exact-create-window'}
            visible={visibleWindow}
            footer={false}
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
                                        onChange={(value) => changeCreateDataHandler({advertisingType: value})}
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
                                    onChange={(value) => changeCreateDataHandler({campaignId: value})}
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
                                onChange={(value) => changeCreateDataHandler({adGroupId: value})}
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
                        targetingsType={targetingType}
                        onUpdate={changeCreateDataHandler}
                    />
                    : ''}
            </div>

            <div className="window-footer">
                <button
                    className="btn default"
                    onClick={onCreate}
                    disabled={createData.negative_keywords.length === 0 || createProcessing}
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

const RenderTargetingsDetails = ({createData, targetingsType, onUpdate}) => {

    if (targetingsType === 'keywords') {
        return (<div className="targetings-details-step">
            <div className={`row `}>
                <div className="col">
                    <Radio.Group
                        value={'keywords'}
                        disabled={true}
                    >
                        <h4>Targeting type</h4>
                        <p className={'block-description'}>Can't be changed since ad group already has keyword
                            targetings</p>

                        <Radio value={'keywords'}>
                            Keyword Targeting
                        </Radio>
                        <div className="radio-description">
                            Choose keywords to help your products appear in shopper searches.
                        </div>

                        <Radio value={'product'}>
                            Product Targeting
                        </Radio>

                        <div className="radio-description">
                            Choose specific products, categories, brands, or other product features to target your ads.
                        </div>
                    </Radio.Group>

                    <div className="bid-block">
                        <h3>Keywords</h3>

                        <div className="form-group row">
                            <label htmlFor="">Bid</label>
                            <InputCurrency/>
                        </div>
                    </div>
                </div>

                <div className="col description">

                </div>
            </div>

            <KeywordTargetingsList
                disabled={false}
                keywords={createData.negative_keywords}
                onUpdate={onUpdate}
                withMatchType={true}
            />

            {/*<NegativeKeywords*/}
            {/*    disabled={!createData.adGroupId}*/}
            {/*    keywords={createData.negative_keywords}*/}
            {/*    onUpdate={onUpdate}*/}
            {/*    withMatchType={true}*/}
            {/*    // title={'Negative Keyword Targeting'}*/}
            {/*/>*/}
        </div>)
    } else if (targetingsType === 'targets') {
        return (<div className="targetings-details-step">
            <div className={`row `}>
                <div className="col">
                    <Radio.Group
                        value={'product'}
                        disabled={true}
                    >
                        <h4>Targeting type</h4>
                        <p className={'block-description'}>Can't be changed since ad group already has keyword
                            targetings</p>

                        <Radio value={'keywords'}>
                            Keyword Targeting
                        </Radio>
                        <div className="radio-description">
                            Choose keywords to help your products appear in shopper searches.
                        </div>

                        <Radio value={'product'}>
                            Product Targeting
                        </Radio>

                        <div className="radio-description">
                            Choose specific products, categories, brands, or other product features to target your ads.
                        </div>
                    </Radio.Group>

                    <div className="bid-block">
                        <h3>Keywords</h3>

                        <div className="form-group row">
                            <label htmlFor="">Bid</label>
                            <InputCurrency/>
                        </div>
                    </div>
                </div>

                <div className="col description">

                </div>
            </div>

            <KeywordTargetingsList
                disabled={false}
                keywords={createData.negative_keywords}
                onUpdate={onUpdate}
                withMatchType={false}
            />

            {/*<NegativeKeywords*/}
            {/*    disabled={!createData.adGroupId}*/}
            {/*    keywords={createData.negative_keywords}*/}
            {/*    onUpdate={onUpdate}*/}
            {/*    withMatchType={true}*/}
            {/*    // title={'Negative Keyword Targeting'}*/}
            {/*/>*/}
        </div>)
    } else if (targetingsType === 'any') {
        return (<div className="targetings-details-step">
            {/*<KeywordTargetingsList*/}
            {/*    disabled={!createData.selected_ad_group}*/}
            {/*    keywords={createData.keyword_targetings}*/}
            {/*    onUpdate={changeCreateDataHandler}*/}
            {/*    withMatchType={createData.t_targeting_type === 'keyword'}*/}
            {/*/>*/}

            <NegativeKeywords
                disabled={!createData.adGroupId}
                keywords={createData.negative_keywords}
                onUpdate={onUpdate}
                confirmRemove={false}
                title={'Keywords'}
            />
        </div>)
    } else {
        return ''
    }
}

export default CreateTargetingsWindow
