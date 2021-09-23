import React, {useEffect, useState} from "react"
import '../../components/MainChart/MainChart.less'
import '../../../PPCAutomate/Dashboard/MainChart/MainChart.less'
import ChartHeader from "../../components/MainChart/ChartHeader"
import Chart from "../../components/MainChart/Chart"
import {useSelector} from "react-redux"
import {Spin} from "antd"
import {analyticsServices} from "../../../../services/analytics.services"
import axios from "axios"

const MainChart = ({activeMetrics,selectedRangeDate, location, chartData, fetching}) => {
    const [productOptimizationDateList, setProductOptimizationDateList] = useState([])

    const { chartState, visibleChart} = useSelector(state => ({
        chartState: state.analytics.chartState[location],
        visibleChart: state.analytics.visibleChart,
    }))

    return <section className={`main-chart ${visibleChart ? 'visible' : 'hidden'}`}>
        <Chart
            showWeekChart={chartState.showWeekChart}
            showDailyChart={chartState.showDailyChart}
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
