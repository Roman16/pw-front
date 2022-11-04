import React, {useEffect, useState} from 'react'
import {daypartingServices} from "../../../services/dayparting.services"
import axios from "axios"
import {Select, Spin, Switch} from "antd"
import './Placements.less'
import {Chart} from "./Chart"
import {metrics, MetricsStatistics} from "./MetricsStatistics"
import _ from 'lodash'
import moment from "moment"
import CustomSelect from "../../../components/Select/Select"

const CancelToken = axios.CancelToken
let sourceChart = null,
    sourceMainMetrics = null,
    sourceCompareMetrics = null


const Option = Select.Option

export const chartColors = [
    {
        stroke: '#FFA8AA',
        fill: '#ffcad1'
    },

    {
        stroke: '#A292E2',
        fill: '#d0c2f4'
    },
    {
        stroke: '#9852CE',
        fill: '#a290b9'
    },
]


const Placements = ({date, selectedCompareDate, campaignId, attributionWindow, fetchingCampaignList}) => {
    let localFetching = false

    const [chartData, setChartData] = useState([]),
        [metricsData, setMetricsData] = useState({}),
        [comparedMetricsData, setComparedMetricsData] = useState(),
        [processing, setProcessing] = useState(true),
        [selectedMetric, setSelectedMetric] = useState(metrics[0].key),
        [chartType, setChartType] = useState('hourly')

    const getChartData = async () => {
        sourceChart && sourceChart.cancel()
        sourceChart = CancelToken.source()

        setProcessing(true)

        try {
            if (chartType === 'daily') {
                const {result} = await daypartingServices.getPlacementChartDataByWeekday({
                    date,
                    campaignId,
                    attributionWindow,
                    cancelToken: sourceChart.token
                })

                setChartData(_.values(result.top_of_search).map((i, index) => {
                    const resultObj = {
                        date: moment(date.startDate).add(index, 'days').format('YYYY-MM-DD')
                    }

                    _.keys(i).forEach(key => {
                        resultObj[`top_of_search_${key}`] = i[key]
                        resultObj[`detail_page_${key}`] = result.detail_page[index][key]
                        resultObj[`other_${key}`] = result.other[index][key]
                    })

                    return ({...resultObj})
                }))
            } else {
                const {result} = await daypartingServices.getPlacementChartDataByHour({
                    date,
                    campaignId,
                    attributionWindow,
                    cancelToken: sourceChart.token
                })

                setChartData(_.values(result.top_of_search).map((i, index) => {
                    const resultObj = {
                        date: index,
                        dateRange: {
                            ...date
                        },
                    }

                    _.keys(i).forEach(key => {
                        resultObj[`top_of_search_${key}`] = i[key]
                        resultObj[`detail_page_${key}`] = result.detail_page[index][key]
                        resultObj[`other_${key}`] = result.other[index][key]
                    })

                    return ({...resultObj})
                }))
            }
        } catch (e) {
            console.log(e)
        }

        setProcessing(false)
    }

    const getMetricsData = async () => {
        sourceMainMetrics && sourceMainMetrics.cancel()
        sourceMainMetrics = CancelToken.source()

        try {
            const {result} = await daypartingServices.getPlacementMetricsData({
                date,
                campaignId,
                attributionWindow,
                cancelToken: sourceMainMetrics.token
            })
            setMetricsData(result)
        } catch (e) {
            console.log(e)
        }
    }

    const getComparedMetricsData = async () => {
        sourceCompareMetrics && sourceCompareMetrics.cancel()
        sourceCompareMetrics = CancelToken.source()
        setProcessing(true)

        try {
            const {result} = await daypartingServices.getPlacementMetricsData({
                date: selectedCompareDate,
                campaignId,
                attributionWindow,
                cancelToken: sourceCompareMetrics.token
            })
            setComparedMetricsData(result)
        } catch (e) {
            console.log(e)
        }

        setProcessing(false)
    }

    useEffect(() => {
        if (!fetchingCampaignList) {
            if (campaignId !== undefined && campaignId !== null) {
                getChartData()
            } else {
                setProcessing(false)
                setChartData([])
                setMetricsData({})
            }
        }
    }, [date, campaignId, chartType, attributionWindow, fetchingCampaignList])

    useEffect(() => {
        campaignId && getMetricsData()
    }, [date, campaignId, attributionWindow])

    useEffect(() => {
        if (selectedCompareDate) {
            campaignId && getComparedMetricsData()
        } else {
            setComparedMetricsData(undefined)
        }
    }, [campaignId, attributionWindow, selectedCompareDate])

    return (
        <section
            className={`placements ${(processing || fetchingCampaignList) ? 'disabled' : ''}`}>
            <div className="section-header">
                <h2>Placements</h2>

                <div className="metric-select">
                    <CustomSelect
                        getPopupContainer={trigger => trigger.parentNode}
                        value={selectedMetric}
                        dropdownClassName={'full-width-menu'}
                        className={'dark-mode'}
                        onChange={value => setSelectedMetric(value)}
                    >
                        {metrics.map((item) => (
                            <Option
                                key={item}
                                value={item.key}
                            >
                                {item.title}
                            </Option>
                        ))}
                    </CustomSelect>
                </div>


                <div className="chart-switch">
                    <span className={chartType === 'hourly' && 'active'}>Hourly</span>
                    <Switch
                        className={'dark'}
                        checked={chartType === 'daily'}
                        onChange={e => setChartType(e ? 'daily' : 'hourly')}
                    />
                    <span className={chartType === 'daily' && 'active'}>Daily</span>
                </div>
            </div>

            <Chart
                data={chartData}
                chartType={chartType}
                selectedMetric={selectedMetric}
            />

            <MetricsStatistics
                data={metricsData}
                comparedData={comparedMetricsData}
            />

            {(processing || fetchingCampaignList) && <div className="disable-page-loading">
                <Spin size="large"/>
            </div>}
        </section>
    )
}

export default React.memo(Placements)
