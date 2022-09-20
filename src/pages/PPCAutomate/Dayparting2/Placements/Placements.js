import React, {useEffect, useState, Fragment} from 'react'

import {daypartingServices} from "../../../../services/dayparting.services"
import {useSelector} from "react-redux"
import axios from "axios"
import {round} from "../../../../utils/round"
import {Spin, Switch} from "antd"
import {SVG} from "../../../../utils/icons"
import {numberMask} from "../../../../utils/numberMask"
import {CurrencyWithCode} from "../../../../components/CurrencyCode/CurrencyCode"
import './Placements.less'
import {Chart} from "./Chart"
import {MetricsStatistics} from "./MetricsStatistics"

const CancelToken = axios.CancelToken
let source = null


export const chartColors = [
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

]

const fakeDataDaily = [
    {
        date: '2022-09-18',
        top_search: 300,
        product_pages: 450,
        rest_search: 600,
    },
    {
        date: '2022-09-19',
        top_search: 200,
        product_pages: 550,
        rest_search: 600,
    },
    {
        date: '2022-09-20',
        top_search: 240,
        product_pages: 450,
        rest_search: 560,
    },
    {
        date: '2022-09-21',
        top_search: 440,
        product_pages: 650,
        rest_search: 660,
    },
    {
        date: '2022-09-22',
        top_search: 540,
        product_pages: 550,
        rest_search: 360,
    },
    {
        date: '2022-09-23',
        top_search: 320,
        product_pages: 750,
        rest_search: 460,
    },
    {
        date: '2022-09-24',
        top_search: 420,
        product_pages: 850,
        rest_search: 560,
    },
]

const Placements = ({date}) => {
    let localFetching = false

    const [chartData, setChartData] = useState([]),
        [metricsStatistics, setMetricsStatistics] = useState({}),
        [processing, setProcessing] = useState(false),
        [chartType, setChartType] = useState('daily')

    const {campaignId, fetchingCampaignList} = useSelector(state => ({
        campaignId: state.dayparting.selectedCampaign.id,
        fetchingCampaignList: state.dayparting.processing,
    }))

    const fakeDataHourly = Array.from({length: 24}, (item, index) => ({
        date: index,
        dateRange: {
            ...date
        },
        top_search: Math.floor(Math.random() * (1000 - 1 + 1) + 1),
        product_pages: Math.floor(Math.random() * (1000 - 1 + 1) + 1),
        rest_search: Math.floor(Math.random() * (1000 - 1 + 1) + 1),
    }))


    useEffect(() => {
        async function fetchData() {
            source && source.cancel()
            source = CancelToken.source()

            if (campaignId == null) {
                setChartData([])
                setMetricsStatistics({})
            } else if (!fetchingCampaignList) {
                setProcessing(true)
                localFetching = true

                try {
                    const res = await daypartingServices.getPlacementsStatistic({
                        campaignId,
                        date,
                        cancelToken: source.token
                    })

                    const chartData = Object.keys(res.response.points).map(date => ({
                        date: date,
                        top_search: res.response.points[date].data['Top of Search on-Amazon'].value != null ? +res.response.points[date].data['Top of Search on-Amazon'].value : null,
                        product_pages: res.response.points[date].data['Detail Page on-Amazon'].value != null ? +res.response.points[date].data['Detail Page on-Amazon'].value : null,
                        rest_search: res.response.points[date].data['Other on-Amazon'].value != null ? +res.response.points[date].data['Other on-Amazon'].value : null,
                    }))

                    setMetricsStatistics(res.response.statistics)
                    setChartData(chartData)
                    setProcessing(false)
                    localFetching = false
                } catch (e) {
                    !localFetching && setProcessing(false)
                    localFetching = false
                }
            }
        }

        fetchData()

    }, [date, campaignId])

    useEffect(() => {
        if (campaignId == null && !fetchingCampaignList) {
            localFetching = false
            setProcessing(false)
        }
    }, [fetchingCampaignList])

    return (
        <section
            className={`placements ${(processing || fetchingCampaignList) ? 'disabled' : ''}`}>
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
                data={chartType === 'daily' ? fakeDataDaily : fakeDataHourly}
                chartType={chartType}
            />

            <MetricsStatistics
                data={chartType === 'daily' ? metricsStatistics : fakeDataHourly}
            />

            {(processing || fetchingCampaignList) && <div className="disable-page-loading">
                <Spin size="large"/>
            </div>}
        </section>
    )
}

export default React.memo(Placements)
