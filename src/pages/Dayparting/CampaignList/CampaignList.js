import React, {Fragment, useEffect, useState} from "react"
import {Spin} from "antd"
import Pagination from "../../../components/Pagination/Pagination"
import {SVG} from "../../../utils/icons"
import '../../../components/ProductList/ProductList.less'
import './CampaignList.less'

import Filters from "./Filters"
import axios from "axios"
import {debounce} from "throttle-debounce"
import {daypartingActions} from "../../../actions/dayparting.actions"
import {useDispatch, useSelector} from "react-redux"
import InformationTooltip from "../../../components/Tooltip/Tooltip"
import _ from 'lodash'
import ProductItem from "../../../components/ProductList/ProductItem"

const CancelToken = axios.CancelToken
let source = null

const navigationTabs = ['campaigns', 'accounts', 'products']

const CampaignList = ({multiselect, onSetMultiselect}) => {
    const dispatch = useDispatch()

    const [isOpenList, setIsOpenList] = useState(true),
        [searchStr, setSearchStr] = useState(''),
        [onlyOnDayparting, setOnlyOnDayparting] = useState(false),
        [filterParams, setFilterParams] = useState({
            campaign_status: 'all',
            campaign_type: 'all'
        }),
        [paginationParams, setPaginationParams] = useState({
            page: 1,
            pageSize: 25
        })

    const {campaignList, processing, totalSize, selectedCampaign, activeTab} = useSelector(state => ({
        campaignList: state.dayparting.campaignList,
        processing: state.dayparting.processing,
        totalSize: state.dayparting.totalSize,
        selectedCampaign: state.dayparting.selectedCampaign,
        activeTab: state.dayparting.activeTab
    }))

    const getDataList = () => {
        source && source.cancel()
        source = CancelToken.source()

        dispatch(daypartingActions.getDataList({
            ...paginationParams,
            ...filterParams,
            onlyOnDayparting,
            searchStr,
            cancelToken: source.token
        }, activeTab))
    }

    const selectCampaignHandler = (campaign) => {
        if (multiselect) {
            if (_.find(selectedCampaign, {id: campaign.id})) {
                if (selectedCampaign.length > 1) {
                    dispatch(daypartingActions.selectCampaign([...selectedCampaign.filter(i => i.id !== campaign.id)]))
                }
            } else {
                dispatch(daypartingActions.selectCampaign([...selectedCampaign, campaign]))
            }
        } else {
            dispatch(daypartingActions.selectCampaign(campaign))
        }
    }

    const changePaginationHandler = (params) => {
        setPaginationParams(params)
    }

    const changeSelectHandler = (params) => {
        setPaginationParams({
            ...paginationParams,
            page: 1
        })

        setFilterParams(params)
    }
    const changeSwitchHandler = (value) => {
        setPaginationParams({
            ...paginationParams,
            page: 1
        })

        setOnlyOnDayparting(value)
    }

    const changeSearchHandler = debounce(500, false, str => {
        setSearchStr(str)
        setPaginationParams({
            ...paginationParams,
            page: 1
        })
    })

    const setMultiselectHandler = (value) => {
        if (value === 'all') {
            onSetMultiselect(true)

            if (selectedCampaign.length === campaignList.length) {
                dispatch(daypartingActions.selectCampaign([campaignList[0]]))
            } else {
                dispatch(daypartingActions.selectCampaign([...campaignList]))
            }
        } else if (value) {
            dispatch(daypartingActions.selectCampaign([selectedCampaign[0] || selectedCampaign]))
            onSetMultiselect(value)
        } else {
            dispatch(daypartingActions.selectCampaign(selectedCampaign[0] || campaignList[0] || {id: null}))
            onSetMultiselect(value)
        }
    }

    const setActiveTabHandler = (tab) => {
        dispatch(daypartingActions.setActiveTab(tab))

        setPaginationParams(prevState => ({
            ...prevState,
            page: 1
        }))
    }

    useEffect(() => {
        getDataList()

        onSetMultiselect(false)
        dispatch(daypartingActions.selectCampaign(selectedCampaign[0] || {id: null}))

        return (() => {
            dispatch(daypartingActions.setCampaignList({
                data: [],
                total: 0,
            }))

            selectCampaignHandler({})
        })
    }, [paginationParams, searchStr, filterParams, onlyOnDayparting])


    return (
        <Fragment>
            <div className={`campaign-list ${isOpenList ? '' : 'closed'}`}>
                <div className="tabs">
                    {navigationTabs.map((i, index) => (<div
                        onClick={() => index !== 1 && setActiveTabHandler(i)}
                        className={`tab ${activeTab === i ? 'active' : ''}`}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <g>
                                <rect x="2.5" y="9.5" width="2.15789" height="2.15789" rx="0.5"/>
                                <rect x="2.5" y="3.5" width="2.15789" height="2.15789" rx="0.5"/>
                                <rect x="2.5" y="15.0264" width="2.15789" height="2.15789" rx="0.5"/>
                                <path d="M8.31543 10.5791L16.9996 10.5791" fill='none' stroke-width="2"
                                      stroke-linecap="round"/>
                                <path d="M8.31543 4.5791L16.9996 4.5791" fill='none' stroke-width="2"
                                      stroke-linecap="round"/>
                                <path d="M8.31592 16.1055L17.0001 16.1055" fill='none' stroke-width="2"
                                      stroke-linecap="round"/>
                            </g>
                        </svg>

                        {i}
                    </div>))}
                </div>

                <Filters
                    onSearch={changeSearchHandler}
                    onlyOndayparting={onlyOnDayparting}
                    multiselect={multiselect}
                    selectedCampaign={selectedCampaign}
                    tab={activeTab}

                    onApplyFilter={changeSelectHandler}
                    onChangeSwitch={changeSwitchHandler}
                    onSetMultiselect={setMultiselectHandler}
                />

                <div className={`campaigns`}>
                    {processing ?
                        <div className='fetching-data'><Spin size={'large'}/></div> :
                        campaignList && campaignList.map(item => <>
                            {activeTab === 'campaigns' && <Campaign
                                campaign={item}
                                selectedCampaign={selectedCampaign}
                                onSelect={selectCampaignHandler}
                            />}

                            {activeTab === 'products' && <ProductItem
                                product={item}
                                selectedCampaign={selectedCampaign}
                                onSelect={selectCampaignHandler}
                            />}
                        </>)}
                </div>

                <Pagination
                    onChange={changePaginationHandler}

                    page={paginationParams.page}
                    pageSizeOptions={[25, 50, 100]}
                    pageSize={paginationParams.pageSize}
                    totalSize={totalSize}
                    processing={processing}
                    listLength={campaignList && campaignList.length}
                />
            </div>

            <div className={`switch-list ${isOpenList ? 'opened' : 'closed'}`}>
                <button onClick={() => setIsOpenList(prevState => !prevState)}>
                    <div className="image">
                        <SVG id='select-icon'/>
                    </div>
                </button>
            </div>
        </Fragment>
    )
}

const Campaign = ({campaign, campaign: {id, name}, selectedCampaign, hasEnabledDayparting, onSelect}) => (
    <div
        key={id}
        className={`campaign-item ${_.find(selectedCampaign, {id: id}) || selectedCampaign.id === id ? 'active' : ''} ${hasEnabledDayparting ? 'enabled-dayparting' : ''}`}
        onClick={() => onSelect(campaign)}
    >
        <span className={'short-name'} title={name}>{name}</span>

        {hasEnabledDayparting && <InformationTooltip
            arrowPointAtCenter={true}
            type={'custom'}
            description={'Campaign on dayparting'}
            position={'topRight'}
        >
            <div className='on-dayparting'/>
        </InformationTooltip>}
    </div>
)


export default CampaignList