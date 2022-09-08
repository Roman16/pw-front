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
                data={chartData}
            />

            <MetricsStatistics
                data={metricsStatistics}
            />

            {(processing || fetchingCampaignList) && <div className="disable-page-loading">
                <Spin size="large"/>
            </div>}
        </section>
    )
}

export default React.memo(Placements)
