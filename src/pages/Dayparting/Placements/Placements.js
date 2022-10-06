import React, {useEffect, useState} from 'react'

import {daypartingServices} from "../../../services/dayparting.services"
import {useSelector} from "react-redux"
import axios from "axios"
import {Spin, Switch} from "antd"
import './Placements.less'
import {Chart} from "./Chart"
import {MetricsStatistics} from "./MetricsStatistics"
import _ from 'lodash'
import moment from "moment"

const CancelToken = axios.CancelToken
let source = null


export const chartColors = [
    {
        stroke: '#FFA8AA',
        fill: '#ffcad1'
    },

    {
        stroke: '#BA96F4',
        fill: '#d0c2f4'
    },
    {
        stroke: '#9464B9',
        fill: '#a290b9'
    },
]


const Placements = ({date, campaignId, selectedMetric}) => {
    let localFetching = false

    const [chartData, setChartData] = useState([]),
        [metricsData, setMetricsData] = useState({}),
        [processing, setProcessing] = useState(true),
        [chartType, setChartType] = useState('daily')

    const getChartData = async () => {
        setProcessing(true)
        try {
            if (chartType === 'daily') {
                const {result} = await daypartingServices.getPlacementChartDataByWeekday({date, campaignId})
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
                const {result} = await daypartingServices.getPlacementChartDataByHour({date, campaignId})

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
        try {
            const {result} = await daypartingServices.getPlacementMetricsData({date, campaignId})
            setMetricsData(result)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        campaignId && getChartData()
    }, [date, campaignId, chartType])

    useEffect(() => {
        campaignId && getMetricsData()
    }, [date, campaignId])

    return (
        <section
            className={`placements ${(processing || !campaignId) ? 'disabled' : ''}`}>
            <div className="section-header">
                <h2>Placements</h2>

                <div className="chart-switch">
                    <span className={chartType === 'daily' && 'active'}>Daily</span>
                    <Switch
                        className={'dark'}
                        checked={chartType === 'hourly'}
                        onChange={e => setChartType(e ? 'hourly' : 'daily')}
                    />
                    <span className={chartType === 'hourly' && 'active'}>Hourly</span>
                </div>
            </div>

            <Chart
                data={chartData}
                chartType={chartType}
                selectedMetric={selectedMetric}
            />

            <MetricsStatistics
                data={metricsData}
            />

            {(processing || !campaignId) && <div className="disable-page-loading">
                <Spin size="large"/>
            </div>}
        </section>
    )
}

export default React.memo(Placements)
