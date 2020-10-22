import React, {useEffect, useState} from "react"
import './MainChart.less'
import '../../../PPCAutomate/Dashboard/MainChart/MainChart.less'
import ChartHeader from "./ChartHeader"
import Chart from "./Chart"
import {dashboardServices} from "../../../../services/dashboard.services"
import { useSelector} from "react-redux"
import {Spin} from "antd"
import {analyticsServices} from "../../../../services/analytics.services"

const MainChart = () => {
    const [chartData, updateChartData] = useState([])
    const [fetching, switchFetch] = useState(false)
    const [fetchingError, setFetchingError] = useState(false)
    const [productOptimizationDateList, setProductOptimizationDateList] = useState([])


    const location = useSelector(state => state.analytics.location)

    const {selectedRangeDate, metricsState, chartState} = useSelector(state => ({
        selectedRangeDate: state.analytics.selectedRangeDate,
        metricsState: state.analytics.metricsState && state.analytics.metricsState[location],
        chartState: state.analytics.chartState[location]
    }))

    const allMetrics = metricsState.allMetrics,
        selectedMetrics = allMetrics.selectedMetrics,
        activeMetrics = metricsState.activeMetrics


    const getChartData = async () => {
        if (activeMetrics.length > 0) {
            switchFetch(true)
            setFetchingError(false)

            try {
                const res = await analyticsServices.fetchChartData(location, activeMetrics, selectedRangeDate)

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
        getChartData()
    }, [selectedRangeDate, metricsState])

    return <section className={'main-chart'}>
        <ChartHeader
            chartState={chartState}
            activeMetrics={activeMetrics}
        />

        <Chart
            showWeekChart={chartState.showWeekChart}
            showDailyChart={chartState.showDailyChart}
            showOptimizationChart={chartState.showOptimizationChart}
            activeMetrics={activeMetrics}
            data={chartData}
            selectedRangeDate={selectedRangeDate}
            productOptimizationDateList={productOptimizationDateList}
        />

        {fetching && <div className="loading">
            <Spin size="large"/>
        </div>}
    </section>
}

export default MainChart
