import React, {useEffect, useState} from "react"
import './MainChart.less'
import '../../../PPCAutomate/Dashboard/MainChart/MainChart.less'
import ChartHeader from "./ChartHeader"
import Chart from "./Chart"
import {useSelector} from "react-redux"
import {Spin} from "antd"
import {analyticsServices} from "../../../../services/analytics.services"
import axios from "axios"


const CancelToken = axios.CancelToken
let source = null
let prevActiveMetrics = []

const MainChart = ({allMetrics, location}) => {
    const [chartData, updateChartData] = useState([])
    const [fetching, switchFetch] = useState(false)
    const [fetchingError, setFetchingError] = useState(false)
    const [productOptimizationDateList, setProductOptimizationDateList] = useState([])

    location = location === 'campaignSettings' ? 'campaigns' : location
    location = location === 'portfolioSettings' ? 'portfolios' : location

    const {selectedRangeDate, metricsState, chartState, filters, mainState, visibleChart} = useSelector(state => ({
        selectedRangeDate: state.analytics.selectedRangeDate,
        metricsState: state.analytics.metricsState && state.analytics.metricsState[location],
        chartState: state.analytics.chartState[location],
        filters: state.analytics.filters[location] || [],
        mainState: state.analytics.mainState,
        visibleChart: state.analytics.visibleChart,

    }))

    const activeMetrics = (metricsState && metricsState.activeMetrics) ? metricsState.activeMetrics : allMetrics.slice(0, 2)

    const getChartData = async () => {
        if (activeMetrics.filter(metric => !!metric).length > 0) {
            switchFetch(true)
            setFetchingError(false)

            source && source.cancel()
            source = CancelToken.source()

            try {
                const filtersWithState = [
                    ...filters,
                    ...Object.keys(mainState).map(key => ({
                        filterBy: key,
                        type: 'eq',
                        value: mainState[key]
                    })).filter(item => !!item.value),
                    {
                        filterBy: 'datetime',
                        type: 'range',
                        value: selectedRangeDate
                    },
                ]

                const res = await analyticsServices.fetchChartData(location, activeMetrics, selectedRangeDate, filtersWithState, source.token)

                updateChartData(res.response)
                switchFetch(false)
                setFetchingError(false)
            } catch (e) {
                if (e.message !== undefined) {
                    setFetchingError(true)
                    switchFetch(false)
                }
            }

        } else {
            updateChartData([])
        }
    }

    useEffect(() => {
        prevActiveMetrics = []
    }, [mainState])


    useEffect(() => {
        if (JSON.stringify(prevActiveMetrics) !== JSON.stringify(activeMetrics.filter(item => item !== null))) {
            getChartData()
            prevActiveMetrics = [...activeMetrics]
        }
    }, [activeMetrics])

    useEffect(() => {
        getChartData()
    }, [selectedRangeDate, filters, mainState])

    return <section className={`main-chart ${visibleChart ? 'visible' : 'hidden'}`}>
        <Chart
            showWeekChart={chartState.showWeekChart}
            showDailyChart={chartState.showDailyChart}
            // showOptimizationChart={chartState.showOptimizationChart}
            showOptimizationChart={false}
            activeMetrics={activeMetrics}
            data={chartData}
            selectedRangeDate={selectedRangeDate}
            productOptimizationDateList={productOptimizationDateList}
        />

        <ChartHeader
            chartState={chartState}
            activeMetrics={activeMetrics}
        />

        {fetching && <div className="loading">
            <Spin size="large"/>
        </div>}
    </section>
}

export default MainChart
