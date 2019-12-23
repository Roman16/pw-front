import React, {useState, useEffect} from 'react';
import Header from './ChartHeader';
import Chart from './LineChart';
import './MainChart.less';
import {dashboardActions} from "../../../../actions/dashboard.actions";
import {dashboardServices} from "../../../../services/dashboard.services";
import moment from "moment";
import {useDispatch, useSelector} from "react-redux";

const MainChart = () => {
    const [chartData, updateChartData] = useState([]);

    const dispatch = useDispatch();

    const {showWeekChart, showDailyChart, selectedRangeDate, activeMetrics, selectedProduct, onlyOptimization} = useSelector(state => ({
        showWeekChart: state.dashboard.showWeekChart,
        showDailyChart: state.dashboard.showDailyChart,
        selectedRangeDate: state.dashboard.selectedRangeDate,
        activeMetrics: state.dashboard.activeMetrics,
        selectedProduct: state.dashboard.selectedProduct,
        onlyOptimization: state.products.onlyOptimization,
    }));

    const timeRange = (start, end) => {
        if (start) {
            dispatch(dashboardActions.selectDateRange({
                    startDate: moment(start, 'DD-MM-YYYY').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
                    endDate: end ? moment(end, 'DD-MM-YYYY').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]') : moment(start, 'DD-MM-YYYY').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
                }
            ))
        } else {
            dispatch(dashboardActions.selectDateRange({
                    startDate: 'lifetime',
                    endDate: 'lifetime'
                }
            ))
        }
    };

    const handleChangeSwitch = (type) => () => dispatch(dashboardActions.switchChart(type));

    const getChartData = () => {
        if (activeMetrics[0].key || activeMetrics[1].key) {
            dashboardServices.fetchLineChartData({
                startDate: selectedRangeDate.startDate === 'lifetime' ? 'lifetime' : `${moment(selectedRangeDate.startDate).format('YYYY-MM-DD')}T00:00:00.000Z`,
                endDate: selectedRangeDate.endDate === 'lifetime' ? 'lifetime' : `${moment(selectedRangeDate.endDate).format('YYYY-MM-DD')}T00:00:00.000Z`,
                firstMetric: activeMetrics[0] ? activeMetrics[0].key : null,
                secondMetric: activeMetrics[1] ? activeMetrics[1].key : null,
                productId: selectedProduct,
                onlyOptimization: onlyOptimization
            })
                .then(res => {
                    updateChartData(res);
                })
        } else {
            updateChartData([])
        }
    };

    useEffect(getChartData, [activeMetrics, selectedRangeDate, selectedProduct, onlyOptimization]);

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
            />

            <Chart
                showWeekChart={showWeekChart}
                showDailyChart={showDailyChart}
                activeMetrics={activeMetrics}
                data={chartData}
                selectedRangeDate={selectedRangeDate}
            />
        </div>
    )
};

export default MainChart;
