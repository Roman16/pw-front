import React, {useEffect, useState, Fragment} from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import moment from "moment";
import {daypartingServices} from "../../../services/dayparting.services";
import {useSelector} from "react-redux";
import axios from "axios";
import {round} from "../../../utils/round";
import {Spin} from "antd";
import {SVG} from "../../../utils/icons";
import {numberMask} from "../../../utils/numberMask";
import {currencyWithCode} from "../../../components/CurrencyCode/CurrencyCode"

const CancelToken = axios.CancelToken;
let source = null;

const chartLabel = {
    top_search: 'Top of search',
    product_pages: 'Product pages',
    rest_search: 'Rest of search'
};

const weakDays = [
    {
        date: 'Sunday',
    },
    {
        date: 'Monday',
    },
    {
        date: 'Tuesday',
    },
    {
        date: 'Wednesday',
    },
    {
        date: 'Thursday',
    },
    {
        date: 'Friday',
    },
    {
        date: 'Saturday',
    },
];

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
    {
        title: 'Spend',
        key: 'spend'
    },
    {
        title: 'Sales',
        key: 'sales'
    },
     {
        title: 'Impressions',
        key: 'impressions'
    },

];

const chartColors = [
    {
        stroke: '#9464B9',
        fill: '#a290b9'
    },
    {
        stroke: '#BA96F4',
        fill: '#d0c2f4'
    },
    {
        stroke: '#FFA8AA',
        fill: '#ffcad1'
    }

];

const ChartTooltip = ({payload}) => {
    if (payload && payload.length > 0) {
        const total = payload.reduce((result, entry) => (result + entry.value), 0);

        return (
            <div className='area-chart-tooltip'>
                {/*<h3>{moment(payload[0].payload.date).format('DD MMMM YYYY')}</h3>*/}
                <h3>{`${weakDays[moment(payload[0].payload.date).day()].date}, ${moment(payload[0].payload.date).format('MMMM DD')}`}</h3>

                <div className='content'>
                    {payload.reverse().map((entry, index) => (
                        <div key={`item-${index}`}>
                            <div className='name'>
                                <div style={{background: entry.color}}/>
                                {chartLabel[entry.name]}
                            </div>

                            <div className='percent' style={{color: entry.color}}>
                                {getPercent(entry.value, total)}
                            </div>

                            <div className='value'>
                                ({entry.value})
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    } else {
        return '';
    }
};

const CustomizedAxisTick = ({x, y, payload, lastIndex}) => {
    if (payload.index === 0) {
        return (
            <g transform={`translate(${x},${y})`}>
                <text x={65} y={0} dy={16} textAnchor="end"
                      fill="#666">{moment(payload.value).format('DD MMM YY')}</text>
            </g>
        );
    } else if (payload.index === lastIndex) {
        return (
            <g transform={`translate(${x},${y})`}>
                <text x={0} y={0} dy={16} textAnchor="end"
                      fill="#666">{moment(payload.value).format('DD MMM YY')}</text>
            </g>
        );

    } else {
        return ('');
    }
};

const MetricValue = ({metric = {}, type}) => {
    if (metric.diff) {
        if (metric.key === 'acos') {
            return (
                <div className="value">
                    {+metric.diff === 0 ? <div/> : <SVG id={metric.diff > 0 ? 'down-red-arrow' : 'up-green-arrow'}/>}
                    {metric.value == null ? 'NaN' : type === 'ctr' || type === 'acos' ? `${round(metric.value, 2)}%` : (type === 'spend' || type === 'sales' ? currencyWithCode(numberMask(metric.value, 0)) : metric.value)}
                </div>
            )
        } else {
            return (
                <div className="value">
                    {+metric.diff === 0 ? <div/> : <SVG id={metric.diff > 0 ? 'up-green-arrow' : 'down-red-arrow'}/>}
                    {metric.value == null ? 'NaN' : type === 'ctr' || type === 'acos' ? `${round(metric.value, 2)}%` : (type === 'spend' || type === 'sales' ? currencyWithCode(numberMask(metric.value, 0)) : metric.value)}
                </div>
            )
        }
    } else {
        return (
            <div className="value">
                {metric.value == null ? 'NaN' : type === 'ctr' || type === 'acos' ? `${round(metric.value, 2)}%` : (type === 'spend' || type === 'sales' ? currencyWithCode(numberMask(metric.value, 0)) : metric.value)}
            </div>
        )
    }
};

const getPercent = (value, total) => {
    const ratio = total > 0 ? value / total : 0;

    return toPercent(ratio, 2);
};

const toPercent = (decimal, fixed = 0) => `${(decimal * 100).toFixed(fixed)}%`;

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
        <section
            className={`${(processing || fetchingCampaignList) ? 'placements-statistics disabled' : 'placements-statistics'}`}>
            <div className="section-header">
                <h2>Placements</h2>
            </div>

            <div className="row">
                <div className='chart'>
                    <ResponsiveContainer height={200} width='100%'>
                        <AreaChart
                            width={400}
                            height={200}
                            data={chartData}
                            stackOffset="expand"
                            isAnimationActive={false}
                            margin={{
                                top: 10, right: 5, left: -15, bottom: 0,
                            }}
                        >
                            <defs>
                                <linearGradient spreadMethod="pad" id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor='rgb(161, 161, 249)' stopOpacity='1'/>
                                    <stop offset="100%" stopColor='rgba(161, 161, 249, 0)' stopOpacity='0'/>
                                </linearGradient>

                                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#F3AD97"/>
                                    <stop offset="100%" stopColor="rgba(243, 173, 151, 0)"/>
                                </linearGradient>

                                <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#F6DB97"/>
                                    <stop offset="100%" stopColor="rgba(246, 219, 151, 0)"/>
                                </linearGradient>
                            </defs>

                            <CartesianGrid vertical={false} stroke={'rgba(101, 106, 132, 0.2)'}/>

                            <YAxis
                                tickFormatter={toPercent}
                                interval={1}
                            />

                            <XAxis
                                minTickGap={2}
                                tickSize={9}
                                dataKey="date"
                                interval={chartData.length - 2}
                                padding={{left: 10, right: 10}}
                                tick={<CustomizedAxisTick lastIndex={chartData.length - 1}/>}
                            />

                            <Tooltip
                                isAnimationActive={false}
                                content={
                                    <ChartTooltip/>
                                }
                            />

                            <Area
                                type="linear"
                                dataKey="rest_search"
                                stackId="1"
                                stroke={chartColors[2].stroke}
                                fill="url(#colorUv)"
                                fillOpacity={1}
                                isAnimationActive={false}
                                activeDot={{stroke: chartColors[2].stroke, strokeWidth: 2}}
                            />

                            <Area
                                type="linear"
                                dataKey="product_pages"
                                stackId="1"
                                stroke={chartColors[1].stroke}
                                fill="url(#colorPv)"
                                fillOpacity={1}
                                isAnimationActive={false}
                                activeDot={{stroke: chartColors[1].stroke, strokeWidth: 2}}
                            />

                            <Area
                                type="linear"
                                dataKey="top_search"
                                stackId="1"
                                stroke={chartColors[0].stroke}
                                fill="url(#colorAmt)"
                                fillOpacity={1}
                                isAnimationActive={false}
                                activeDot={{stroke: chartColors[0].stroke, strokeWidth: 2}}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                <div className='metrics-statistics'>
                    <div className="row metrics-name">
                        <div>Description</div>

                        {statisticMetrics.map(item => (
                            <div key={item.key}>{item.title}</div>
                        ))}
                    </div>

                    {statisticParams.map((item, index) => {
                        const metricValues = statisticData[item.key] || null;

                        return (
                            <div className="row" key={item.key}>
                                <div className="parameter-name">
                                    <div style={{background: chartColors[index].stroke}}/>
                                    {item.title}
                                </div>

                                {metricValues ? <Fragment>
                                        {statisticMetrics.map(item => (
                                            <MetricValue key={item.key} metric={metricValues[item.key]} type={item.key}/>
                                        ))}
                                    </Fragment>
                                    :
                                    <Fragment>
                                        {statisticMetrics.map(item => (
                                            <MetricValue key={item.key} metric={{diff: null, value: 0}}
                                                         type={item.key}/>
                                        ))}
                                    </Fragment>}
                            </div>
                        )
                    })}
                </div>
            </div>


            {(processing || fetchingCampaignList) && <div className="disable-page-loading">
                <Spin size="large"/>
            </div>}
        </section>
    )
};

export default React.memo(PlacementsStatistics);
