import React, {useState, useEffect} from 'react'
import Header from './ChartHeader'
import Chart from './LineChart'
import './MainChart.less'
import {dashboardActions} from "../../../../actions/dashboard.actions"
import {dashboardServices} from "../../../../services/dashboard.services"
import moment from "moment"
import {useDispatch, useSelector} from "react-redux"
import {Spin} from "antd"
import axios from "axios"

const CancelToken = axios.CancelToken
let source = null


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

    let localFetch = false

    const timeRange = (startDate, endDate) => {
        if (startDate) {
            dispatch(dashboardActions.selectDateRange({
                    startDate,
                    endDate
                }
            ))
        } else {
            dispatch(dashboardActions.selectDateRange({
                    startDate: 'lifetime',
                    endDate: 'lifetime'
                }
            ))
        }
    }

    const handleChangeSwitch = (type, value) => dispatch(dashboardActions.switchChart(type, value))

    const getChartData = () => {
        if (activeMetrics[0].key || activeMetrics[1].key) {
            localFetch = true

            switchFetch(true)
            setFetchingError(false)

            source = CancelToken.source()

            dashboardServices.fetchLineChartData({
                startDate: selectedRangeDate.startDate,
                endDate: selectedRangeDate.endDate,
                firstMetric: activeMetrics[0] ? activeMetrics[0].key : null,
                secondMetric: activeMetrics[1] ? activeMetrics[1].key : null,
                productId: selectedProduct,
                onlyOptimization: onlyOptimization,
                cancelToken: source.token
            })
                .then(res => {
                    updateChartData(res)
                    switchFetch(false)
                    setFetchingError(false)
                    localFetch = false
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

    const getProductOptimizationDetails = (productId) => {
        if (productId) {
            dashboardServices.fetchProductOptimizationDetails({
                productId: productId,
                startDate: selectedRangeDate.startDate === 'lifetime' ? 'lifetime' : `${moment(selectedRangeDate.startDate).format('YYYY-MM-DD')}T00:00:00.000Z`,
                endDate: selectedRangeDate.endDate === 'lifetime' ? 'lifetime' : `${moment(selectedRangeDate.endDate).format('YYYY-MM-DD')}T00:00:00.000Z`,
            })
                .then(res => {
                    setProductOptimizationDateList(res.data ? res.data : [])
                })
        } else {
            setProductOptimizationDateList([])
        }
    }

    useEffect(() => {
        getProductOptimizationDetails(selectedProduct)
    }, [selectedProduct, selectedRangeDate])

    useEffect(() => {
        source && source.cancel()
        getChartData()
    }, [activeMetrics, selectedRangeDate, selectedProduct, onlyOptimization])

    return (
        <div className='main-chart'>
            <Header
                timeRange={timeRange}
                onChangeSwitch={handleChangeSwitch}
                selectedRangeDate={selectedRangeDate}
                firstActiveMetricTitle={activeMetrics[0] && activeMetrics[0].title}
                secondActiveMetricTitle={activeMetrics[0] && activeMetrics[1].title}
                showWeekChart={showWeekChart}
                showDailyChart={showDailyChart}
                showOptimizationChart={showOptimizationChart}
            />

            <Chart
                showWeekChart={showWeekChart}
                showDailyChart={showDailyChart}
                showOptimizationChart={showOptimizationChart}
                activeMetrics={activeMetrics}
                data={chartData}
                selectedRangeDate={selectedRangeDate}
                productOptimizationDateList={productOptimizationDateList}
            />

            <div className="main-legend">
                {activeMetrics[0] && activeMetrics[0].title && <div className="first-line">
                    <div className="green-line"/>

                    {activeMetrics[0] && <span dangerouslySetInnerHTML={{__html: activeMetrics[0].title}}/>}
                </div>}

                {activeMetrics[0] && activeMetrics[1].title && <div className="second-line">
                    <div className="violet-line"/>

                    {activeMetrics[0] && <span dangerouslySetInnerHTML={{__html: activeMetrics[1].title}}/>}
                </div>}
            </div>

            {fetching && <div className="loading">
                <Spin size="large"/>
            </div>}

            {fetchingError && <div className="loading">
                <button className='btn default' onClick={getChartData}>reload</button>
            </div>}
        </div>
    )
}

export default MainChart
