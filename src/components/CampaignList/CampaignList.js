import React, {Fragment, useEffect, useState} from "react";
import {Spin} from "antd";
import Pagination from "../Pagination/Pagination";
import {SVG} from "../../utils/icons";
import '../ProductList/ProductList.less';
import './CampaignList.less';

import Filters from "./Filters";
import axios from "axios";
import {daypartingServices} from "../../services/dayparting.services";

const CancelToken = axios.CancelToken;
let source = null;

const CampaignList = () => {
    const [isOpenList, setIsOpenList] = useState(true),
        [searchStr, setSearchStr] = useState(''),
        [processing, setProcessing] = useState(false),
        [campaignList, setCampaignList] = useState([]),
        [totalSize, setTotalSize] = useState(0),
        [campaign_type, setCampaignType] = useState('all'),
        [campaign_status, setCampaignStatus] = useState('all'),
        [paginationParams, setPaginationParams] = useState({
            page: 1,
            pageSize: 10
        });

    const getCampaignList = async () => {
        source && source.cancel();
        source = CancelToken.source();

        const res = await daypartingServices.getCampaigns({
            ...paginationParams,
            campaign_type,
            campaign_status,
            cancelToken: source.token
        });

        setCampaignList(res.response);
        setTotalSize(res.total_count);
    }

    useEffect(() => {
        getCampaignList();
    }, [])

    return (
        <Fragment>
            <div className={`${isOpenList ? 'product-list campaign-list' : 'product-list campaign-list closed'}`}>
                <Filters
                    // onlyOptimization={onlyOptimization}

                    // onSearch={changeSearchHandler}
                    // onShowOnlyOnOptimization={changeSwitchHandler}
                />

                {processing && <div className='fetching-data'><Spin size={'large'}/></div>}


                <div className={`campaigns`}>
                    {campaignList && campaignList.map(product => (
                        <div
                            key={product.id}
                            // className={selectedProduct.id === item.id ? 'campaign-item active' : 'campaign-item'}
                            // onClick={() => this.onSelect(item)}
                            title={product.name}
                        >
                            {/*{product.hasEnabledDayparting && <InformationTooltip*/}
                            {/*    arrowPointAtCenter={true}*/}
                            {/*    type={'custom'}*/}
                            {/*    description={'Campaign on day-parting'}*/}
                            {/*    position={'topRight'}*/}
                            {/*>*/}
                            {/*    <div className='on-optimization'/>*/}
                            {/*</InformationTooltip>}*/}

                            <span className={'short-name'}>{product.name}</span>
                        </div>

                    ))}
                </div>

                <Pagination
                    // onChange={changePaginationHandler}

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