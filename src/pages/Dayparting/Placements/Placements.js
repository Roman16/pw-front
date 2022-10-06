import React, {useEffect, useState} from 'react'

import {daypartingServices} from "../../../services/dayparting.services"
import {useSelector} from "react-redux"
import axios from "axios"
import {Select, Spin, Switch} from "antd"
import './Placements.less'
import {Chart} from "./Chart"
import {metrics, MetricsStatistics} from "./MetricsStatistics"
import _ from 'lodash'
import moment from "moment"
import CustomSelect from "../../../components/Select/Select"

const CancelToken = axios.CancelToken
let source = null

const Option = Select.Option

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


const Placements = ({date, campaignId, attributionWindow}) => {
    let localFetching = false

    const [chartData, setChartData] = useState([]),
        [metricsData, setMetricsData] = useState({}),
        [processing, setProcessing] = useState(true),
        [selectedMetric, setSelectedMetric] = useState('clicks'),
        [chartType, setChartType] = useState('hourly')

    const getChartData = async () => {
        setProcessing(true)
        try {
            if (chartType === 'daily') {
                const {result} = await daypartingServices.getPlacementChartDataByWeekday({date, campaignId, attributionWindow})
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
                const {result} = await daypartingServices.getPlacementChartDataByHour({date, campaignId, attributionWindow})

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
            const {result} = await daypartingServices.getPlacementMetricsData({date, campaignId, attributionWindow})
            setMetricsData(result)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        campaignId && getChartData()
    }, [date, campaignId, chartType, attributionWindow])

    useEffect(() => {
        campaignId && getMetricsData()
    }, [date, campaignId, attributionWindow])

    return (
        <section
            className={`placements ${(processing || !campaignId) ? 'disabled' : ''}`}>
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
            />

            {(processing || !campaignId) && <div className="disable-page-loading">
                <Spin size="large"/>
            </div>}
        </section>
    )
}

export default React.memo(Placements)
