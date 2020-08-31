import React, {useEffect, useState} from "react"
import './MainChart.less'
import ChartHeader from "./ChartHeader"
import Chart from "../../../PPCAutomate/Dashboard/MainChart/LineChart"
import {dashboardServices} from "../../../../services/dashboard.services"
import {useDispatch, useSelector} from "react-redux"

const MainChart = () => {
    const [chartData, updateChartData] = useState([])
    const [fetching, switchFetch] = useState(false)
    const [fetchingError, setFetchingError] = useState(false)
    const [productOptimizationDateList, setProductOptimizationDateList] = useState([])

    const dispatch = useDispatch()

    const {showWeekChart, showDailyChart, selectedRangeDate, activeMetrics, selectedProduct, onlyOptimization, showOptimizationChart} = useSelector(state => ({
        showWeekChart: state.dashboard.showWeekChart == null ? true : state.dashboard.showWeekChart,
        showDailyChart: state.dashboard.showDailyChart == null ? true : state.dashboard.showDailyChart,
        showOptimizationChart: state.dashboard.showOptimizationChart == null ? true : state.dashboard.showOptimizationChart,
        selectedRangeDate: state.dashboard.selectedRangeDate,
        activeMetrics: state.dashboard.activeMetrics,
        selectedProduct: state.dashboard.selectedProduct,
        onlyOptimization: state.products.onlyOptimization,
    }))


    const getChartData = () => {
        if (activeMetrics[0].key || activeMetrics[1].key) {

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
    }, [])


    return <section className={'main-chart'}>
        <ChartHeader/>


        <Chart
            showWeekChart={showWeekChart}
            showDailyChart={showDailyChart}
            showOptimizationChart={showOptimizationChart}
            activeMetrics={activeMetrics}
            data={chartData}
            selectedRangeDate={selectedRangeDate}
            productOptimizationDateList={productOptimizationDateList}
        />
    </section>
}

export default MainChart