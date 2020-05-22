import React, {Fragment, useEffect, useState} from "react";
import {Spin} from "antd";
import Pagination from "../Pagination/Pagination";
import {SVG} from "../../utils/icons";
import '../ProductList/ProductList.less';
import './CampaignList.less';

import Filters from "./Filters";
import axios from "axios";
import {daypartingServices} from "../../services/dayparting.services";
import {debounce} from "throttle-debounce";
import {daypartingActions} from "../../actions/dayparting.actions";
import {useDispatch, useSelector} from "react-redux";

const CancelToken = axios.CancelToken;
let source = null;

const CampaignList = () => {
    const dispatch = useDispatch();

    const [isOpenList, setIsOpenList] = useState(true),
        [searchStr, setSearchStr] = useState(''),
        [onlyOndayparting, setOnlyOndayparting] = useState(false),
        [filterParams, setFilterParams] = useState({
            campaign_status: 'all',
            campaign_type: 'all'
        }),
        [paginationParams, setPaginationParams] = useState({
            page: 1,
            pageSize: 10
        });

    const {campaignList, processing, totalSize, selectedCampaign} = useSelector(state => ({
        campaignList: state.dayparting.campaignList,
        processing: state.dayparting.processing,
        totalSize: state.dayparting.totalSize,
        selectedCampaign: state.dayparting.selectedCampaign,
    }))

    const getCampaignList = () => {
        source && source.cancel();
        source = CancelToken.source();

        dispatch(daypartingActions.getCampaignList({
            ...paginationParams,
            ...filterParams,
            onlyOndayparting,
            cancelToken: source.token
        }))
    }

    const selectCampaignHandler = (campaign) => {
        dispatch(daypartingActions.selectCampaign(campaign))
    }

    const changePaginationHandler = (params) => {
        setPaginationParams(params);
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
        setSearchStr(str);
        setPaginationParams({
            ...paginationParams,
            page: 1
        })
    });

    useEffect(() => {
        getCampaignList();
    }, [paginationParams, searchStr, filterParams, onlyOndayparting])

    return (
        <Fragment>
            <div className={`${isOpenList ? 'product-list campaign-list' : 'product-list campaign-list closed'}`}>
                <Filters
                    onSearch={changeSearchHandler}
                    onlyOndayparting={onlyOndayparting}

                    onApplyFilter={changeSelectHandler}
                    onChangeSwitch={changeSwitchHandler}
                />

                {processing && <div className='fetching-data'><Spin size={'large'}/></div>}

                <div className={`campaigns`}>
                    {campaignList && campaignList.map(campaign => (
                        <div
                            key={campaign.id}
                            className={`${selectedCampaign.id === campaign.id ? 'campaign-item active' : 'campaign-item'} ${campaign.hasEnabledDayparting ? 'enabled-dayparting' : ''}`}
                            onClick={() => selectCampaignHandler(campaign)}
                            title={campaign.name}
                        >
                            <span className={'short-name'}>{campaign.name}</span>
                        </div>

                    ))}
                </div>

                <Pagination
                    onChange={changePaginationHandler}

                    page={paginationParams.page}
                    pageSizeOptions={[10, 30, 50]}
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
};

export default CampaignList;