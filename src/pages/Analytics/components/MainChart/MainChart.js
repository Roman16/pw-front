import React, {useEffect, useState} from "react"
import './MainChart.less'
import '../../../PPCAutomate/Dashboard/MainChart/MainChart.less'
import ChartHeader from "./ChartHeader"
import Chart from "../../../PPCAutomate/Dashboard/MainChart/LineChart"
import {dashboardServices} from "../../../../services/dashboard.services"
import {useDispatch, useSelector} from "react-redux"
import {analyticsActions} from "../../../../actions/analytics.actions"
import {Spin} from "antd"

const MainChart = () => {
    const [chartData, updateChartData] = useState([])
    const [fetching, switchFetch] = useState(false)
    const [fetchingError, setFetchingError] = useState(false)
    const [productOptimizationDateList, setProductOptimizationDateList] = useState([])

    const dispatch = useDispatch()

    const {chartState} = useSelector(state => ({
        chartState: state.analytics.chartState
    }))

    const { selectedRangeDate, activeMetrics, selectedProduct, onlyOptimization} = useSelector(state => ({
        selectedRangeDate: state.analytics.selectedRangeDate,
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



    const changeChartStateHandler = (type, value) => {
        dispatch(analyticsActions.setChartState({[type]: value}))
    }

    useEffect(() => {
        getChartData()
    }, [selectedRangeDate, activeMetrics])


    return <section className={'main-chart'}>
        <ChartHeader
            chartState={chartState}
            onChangeState={changeChartStateHandler}
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