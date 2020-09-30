import React, {useEffect, useState} from "react"
import './MainChart.less'
import '../../../PPCAutomate/Dashboard/MainChart/MainChart.less'
import ChartHeader from "./ChartHeader"
import Chart from "./Chart"
import {dashboardServices} from "../../../../services/dashboard.services"
import {useDispatch, useSelector} from "react-redux"
import {analyticsActions} from "../../../../actions/analytics.actions"
import {Spin} from "antd"
import {metricsListArray} from "../../../../constans/metricsList"
import {metricsForTargetingsPanel, metricsWithoutOrganic} from "../MainMetrics/MainMetrics"

const MainChart = () => {
    const [chartData, updateChartData] = useState([])
    const [fetching, switchFetch] = useState(false)
    const [fetchingError, setFetchingError] = useState(false)
    const [productOptimizationDateList, setProductOptimizationDateList] = useState([])

    const dispatch = useDispatch()

    const location = useSelector(state => state.analytics.location)

    const {selectedRangeDate, metricsState, selectedProduct, onlyOptimization, chartState} = useSelector(state => ({
        selectedRangeDate: state.analytics.selectedRangeDate,
        metricsState: state.analytics.metricsState && state.analytics.metricsState[location],
        chartState: state.analytics.chartState[location]
    }))

    const allMetrics = location === 'targetings' ? [...metricsForTargetingsPanel] : location === 'products' ? [...metricsListArray] : [...metricsWithoutOrganic],
        selectedMetrics = metricsState ? metricsState.selectedMetrics : allMetrics.slice(0, 5),
        activeMetrics = metricsState ? metricsState.activeMetrics : allMetrics.slice(0, 2)


    const getChartData = () => {
        if (activeMetrics.length > 0 && (activeMetrics[0].key || activeMetrics[1].key)) {
            switchFetch(true)
            setFetchingError(false)


            dashboardServices.fetchLineChartData({
                startDate: selectedRangeDate.startDate,
                endDate: selectedRangeDate.endDate,
                firstMetric: activeMetrics[0] ? activeMetrics[0].key : null,
                secondMetric: activeMetrics[1] ? activeMetrics[1].key : null,
                productId: selectedProduct,
                onlyOptimization: onlyOptimization,
            })
                .then(res => {
                    updateChartData(res)
                    switchFetch(false)
                    setFetchingError(false)
                })
                .catch((error) => {
                    if (error.message !== undefined) {
                        setFetchingError(true)
                        switchFetch(false)
                    }
                })
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
            selectedMetrics={selectedMetrics}
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