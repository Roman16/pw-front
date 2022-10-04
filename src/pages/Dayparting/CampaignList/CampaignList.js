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

const CancelToken = axios.CancelToken
let source = null

const navigationTabs = ['CAMPAIGNS', 'ACCOUNTS', 'PRODUCTS']

const CampaignList = ({multiselect, onSetMultiselect}) => {
    const dispatch = useDispatch()

    const [isOpenList, setIsOpenList] = useState(true),
        [searchStr, setSearchStr] = useState(''),
        [onlyOndayparting, setOnlyOndayparting] = useState(false),
        [filterParams, setFilterParams] = useState({
            campaign_status: 'all',
            campaign_type: 'all'
        }),
        [paginationParams, setPaginationParams] = useState({
            page: 1,
            pageSize: 25
        })

    const {campaignList, processing, totalSize, selectedCampaign} = useSelector(state => ({
        campaignList: state.dayparting.campaignList,
        processing: state.dayparting.processing,
        totalSize: state.dayparting.totalSize,
        selectedCampaign: state.dayparting.selectedCampaign,
    }))

    const getCampaignList = () => {
        source && source.cancel()
        source = CancelToken.source()

        dispatch(daypartingActions.getCampaignList({
            ...paginationParams,
            ...filterParams,
            onlyOndayparting,
            searchStr,
            cancelToken: source.token
        }))
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

        setOnlyOndayparting(value)
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

    useEffect(() => {
        getCampaignList()

        onSetMultiselect(false)
        dispatch(daypartingActions.selectCampaign(selectedCampaign[0] || {id: null}))

        return (() => {
            dispatch(daypartingActions.setCampaignList({
                response: [],
                total_count: 0,
            }))

            selectCampaignHandler({})
        })
    }, [paginationParams, searchStr, filterParams, onlyOndayparting])


    return (
        <Fragment>
            <div className={`campaign-list ${isOpenList ? '' : 'closed'}`}>
                <div className="tabs">
                    {navigationTabs.map((i, index) => (<div className={`tab ${index === 0 ? 'active' : ''}`}>
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
                    onlyOndayparting={onlyOndayparting}
                    multiselect={multiselect}
                    selectedCampaign={selectedCampaign}

                    onApplyFilter={changeSelectHandler}
                    onChangeSwitch={changeSwitchHandler}
                    onSetMultiselect={setMultiselectHandler}
                />

                <div className={`campaigns`}>
                    {processing ?
                        <div className='fetching-data'><Spin size={'large'}/></div> :
                        campaignList && campaignList.map(campaign => (
                            <div
                                key={campaign.id}
                                className={`${_.find(selectedCampaign, {id: campaign.id}) || selectedCampaign.id === campaign.id ? 'campaign-item active' : 'campaign-item'} ${campaign.hasEnabledDayparting ? 'enabled-dayparting' : ''}`}
                                onClick={() => selectCampaignHandler(campaign)}

                            >
                                <span className={'short-name'} title={campaign.name}>{campaign.name}</span>

                                {campaign.hasEnabledDayparting && <InformationTooltip
                                    arrowPointAtCenter={true}
                                    type={'custom'}
                                    description={'Campaign on dayparting'}
                                    position={'topRight'}
                                >
                                    <div className='on-dayparting'/>
                                </InformationTooltip>}
                            </div>

                        ))}
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

export default CampaignList