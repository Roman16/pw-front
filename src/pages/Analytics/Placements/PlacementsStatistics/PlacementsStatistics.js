import React, {useEffect, useState, Fragment} from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import moment from "moment";
import {daypartingServices} from "../../../../services/dayparting.services";
import {useSelector} from "react-redux";
import axios from "axios";
import {round} from "../../../../utils/round";
import {Spin} from "antd";
import {SVG} from "../../../../utils/icons";
import {numberMask} from "../../../../utils/numberMask";
import './PlacementsStatistics.less'
import SectionHeader from "./SectionHeader"
import Chart from "./Chart"

const CancelToken = axios.CancelToken;
let source = null;



const statisticParams = [
    {
        title: 'Top of search',
        key: 'Top of Search on-Amazon'
    },
    {
        title: 'Product pages',
        key: 'Detail Page on-Amazon'
    },
    {
        title: 'Rest of search',
        key: 'Other on-Amazon'
    },
];

const statisticMetrics = [
    {
        title: 'Clicks',
        key: 'clicks'
    },
    {
        title: 'CTR',
        key: 'ctr'
    },
    {
        title: 'ACoS',
        key: 'acos'
    },
    {
        title: 'Orders',
        key: 'orders'
    },
];




const MetricValue = ({metric = {}, type}) => {
    if (metric.diff) {
        if (metric.key === 'acos') {
            return (
                <div className="value">
                    {+metric.diff === 0 ? <div/> : <SVG id={metric.diff > 0 ? 'down-red-arrow' : 'up-green-arrow'}/>}
                    {metric.value == null ? 'NaN' : type === 'ctr' || type === 'acos' ? `${round(metric.value, 2)}%` : (type === 'spend' || type === 'sales' ? `$${numberMask(metric.value, 0)}` : metric.value)}
                </div>
            )
        } else {
            return (
                <div className="value">
                    {+metric.diff === 0 ? <div/> : <SVG id={metric.diff > 0 ? 'up-green-arrow' : 'down-red-arrow'}/>}
                    {metric.value == null ? 'NaN' : type === 'ctr' || type === 'acos' ? `${round(metric.value, 2)}%` : (type === 'spend' || type === 'sales' ? `$${numberMask(metric.value, 0)}` : metric.value)}
                </div>
            )
        }
    } else {
        return (
            <div className="value">
                {metric.value == null ? 'NaN' : type === 'ctr' || type === 'acos' ? `${round(metric.value, 2)}%` : (type === 'spend' || type === 'sales' ? `$${numberMask(metric.value, 0)}` : metric.value)}
            </div>
        )
    }
};



const PlacementsStatistics = ({date}) => {
    let localFetching = false;

    const [chartData, setChartData] = useState([]),
        [statisticData, setStatisticData] = useState({}),
        [processing, setProcessing] = useState(false);

    const {campaignId, fetchingCampaignList} = useSelector(state => ({
        campaignId: state.dayparting.selectedCampaign.id,
        fetchingCampaignList: state.dayparting.processing,
    }));

    useEffect(() => {
        async function fetchData() {
            source && source.cancel();
            source = CancelToken.source();

            if (campaignId == null) {
                setChartData([]);
                setStatisticData({});
            } else if (!fetchingCampaignList) {
                setProcessing(true);
                localFetching = true;

                try {
                    const res = await daypartingServices.getPlacementsStatistic({
                        campaignId,
                        date,
                        cancelToken: source.token
                    });

                    const chartData = Object.keys(res.response.points).map(date => ({
                        date: date,
                        top_search: res.response.points[date].data['Top of Search on-Amazon'].value != null ? +res.response.points[date].data['Top of Search on-Amazon'].value : null,
                        product_pages: res.response.points[date].data['Detail Page on-Amazon'].value != null ? +res.response.points[date].data['Detail Page on-Amazon'].value : null,
                        rest_search: res.response.points[date].data['Other on-Amazon'].value != null ? +res.response.points[date].data['Other on-Amazon'].value : null,
                    }));

                    setStatisticData(res.response.statistics);
                    setChartData(chartData);
                    setProcessing(false);
                    localFetching = false;
                } catch (e) {
                    !localFetching && setProcessing(false);
                    localFetching = false;
                }
            }
        }

        fetchData();

    }, [date, campaignId]);

    useEffect(() => {
        if (campaignId == null && !fetchingCampaignList) {
            localFetching = false;
            setProcessing(false);
        }
    }, [fetchingCampaignList]);

    return (
        <div className={`placements-area-statistics`}>
            <SectionHeader/>

            <Chart/>
        </div>
    )
};

export default React.memo(PlacementsStatistics);
