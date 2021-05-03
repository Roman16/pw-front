import React, {useEffect, useState} from "react"
import ModalWindow from "../../../../components/ModalWindow/ModalWindow"
import WindowHeader from "../../Campaigns/CreateCampaignWindow/WindowHeader"
import {analyticsActions} from "../../../../actions/analytics.actions"
import {useDispatch, useSelector} from "react-redux"
import {Select} from "antd"
import CustomSelect from "../../../../components/Select/Select"
import '../../Campaigns/CreateCampaignWindow/CreateSteps/TargetingsDetails/TargetingsDetails.less'
import NegativeKeywords from "../../Campaigns/CreateCampaignWindow/CreateSteps/TargetingsDetails/NegativeKeywords"
import './CreateTargetingsWindow.less'
import {analyticsServices} from "../../../../services/analytics.services"

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
        [campaigns, setCampaigns] = useState([]),
        [adGroups, setAdGroups] = useState([])

    const dispatch = useDispatch()

    const visibleWindow = useSelector(state => state.analytics.visibleCreationWindows.targetings),
        mainState = useSelector(state => state.analytics.mainState)

    const closeWindowHandler = () => {
        dispatch(analyticsActions.setVisibleCreateWindow({targetings: false}))
    }

    const changeCreateDataHandler = (value) => {
        setCreateData(prevState => ({...prevState, ...value}))
    }

    const onCreate = () => {

    }

    useEffect(() => {
        if (mainState.adGroupId) setCreateData(prevState => ({
            ...prevState,
            advertisingType: '444',
            selected_campaign: 'rrf',
            selected_ad_group: 'ttt'
        }))
        else if (mainState.campaignId) setCreateData(prevState => ({
            ...prevState,
            advertisingType: '444',
            selected_campaign: 'rrf',
        }))
    }, [mainState])

    const getCampaigns = async (type, page = 1, cb, searchStr = undefined) => {
        try {
            const res = await analyticsServices.fetchCampaignsForTargeting({
                page,
                type,
                name: searchStr
            })

            if (page === 1) setCampaigns([...res.result])
            else setCampaigns(prevState => [...prevState, ...res.result])
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
            else setAdGroups(prevState => [...prevState, ...res.result])
            cb && cb(res.result.length !== 0)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        setCampaigns([])
        setAdGroups([])

        if (createData.advertisingType) getCampaigns(createData.advertisingType)
    }, [createData.advertisingType])

    useEffect(() => {
        setAdGroups([])
        if (createData.campaignId) getAdGroups(createData.campaignId)
    }, [createData.campaignId])


    return (<ModalWindow
            className={'create-campaign-window create-portfolio-window create-campaign-window create-targetings-window'}
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
                            />
                        </div>

                        <div className="col description">

                        </div>
                    </div>
                </>}

                <div className="targetings-details-step">
                    {/*<KeywordTargetingsList*/}
                    {/*    disabled={!createData.selected_ad_group}*/}
                    {/*    keywords={createData.keyword_targetings}*/}
                    {/*    onUpdate={changeCreateDataHandler}*/}
                    {/*    withMatchType={createData.t_targeting_type === 'keyword'}*/}
                    {/*/>*/}

                    <NegativeKeywords
                        disabled={!createData.adGroupId}
                        keywords={createData.negative_keywords}
                        onUpdate={changeCreateDataHandler}
                        confirmRemove={false}
                        title={'Keywords'}
                    />

                </div>
            </div>

            <div className="window-footer">
                <button
                    className="btn default"
                    onClick={onCreate}
                    disabled={createData.negative_keywords.length === 0}
                >
                    Create Targetings
                </button>
            </div>
        </ModalWindow>
    )
}

let timeoutId

const InfinitySelect = (props) => {
    const [loading, setLoading] = useState(false),
        [loadingSearching, setLoadingSearching] = useState(false),
        [page, setPage] = useState(1),
        [hasMore, setHasMore] = useState(true)

    const scrollPopupHandler = (event) => {
        const target = event.target

        if (!loading && hasMore && target.scrollTop + target.offsetHeight === target.scrollHeight) {
            setLoading(true)

            target.scrollTo(0, target.scrollHeight)
            props.onLoadMore(page + 1, (res) => {
                setLoading(false)
                setHasMore(res)
            })
            setPage(page + 1)
        }
    }

    const changeSearchHandler = (value) => {

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


    return (<div className="form-group">
            <label htmlFor="">{props.label}</label>
            <CustomSelect
                showSearch
                optionFilterProp={false}
                filterOption={false}

                getPopupContainer={trigger => trigger.parentNode}
                onPopupScroll={scrollPopupHandler}
                loading={loadingSearching}
                onSearch={changeSearchHandler}

                {...props}
            >
                {props.children.map(i => <Option key={i[props.dataKey]} value={i[props.dataKey]}>
                    {i.name}
                </Option>)}

                {loading && <Option key="loading">Loading...</Option>}
            </CustomSelect>
        </div>
    )
}

export default CreateTargetingsWindow
