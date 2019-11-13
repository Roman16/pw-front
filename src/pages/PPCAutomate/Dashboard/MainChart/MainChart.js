import React, {useState, useEffect} from 'react';
import Header from './ChartHeader';
import Chart from './LineChart';
import './MainChart.less';
import {dashboardActions} from "../../../../actions/dashboard.actions";
import {dashboardServices} from "../../../../services/dashboard.services";
import moment from "moment";
import {useDispatch, useSelector} from "react-redux";

let flag = 0;

const data = [
    {
        date: 'Jun 1', week_first_metric: 0, week_second_metric: 1000, daily_first_metric: 2000, daily_second_metric: 3000
    },
    {
        date: 'Jun 2', week_first_metric: 3000, week_second_metric: 2098, daily_first_metric: 1690, daily_second_metric: 2450
    },
    {
        date: 'Jun 3', week_first_metric: 2000, week_second_metric: 2300, daily_first_metric: 1390, daily_second_metric: 3450
    },
    {
        date: 'Jun 4', week_first_metric: 2780, week_second_metric: 3908, daily_first_metric: 1890, daily_second_metric: 2450
    },
    {
        date: 'Jun 5', week_first_metric: 2890, week_second_metric: 4800, daily_first_metric: 1550, daily_second_metric: 6450
    },
    {
        date: 'Jun 6', week_first_metric: 2000, week_second_metric: 3800, daily_first_metric: 1344, daily_second_metric: 6554
    },
    {
        date: 'Jun 7', week_first_metric: 2000, week_second_metric: 4300, daily_first_metric: 1344, daily_second_metric: 4567
    },
];

const data2 = [
    {
        date: 'Jun 1', week_first_metric: 1000, week_second_metric: 3000, daily_first_metric: 2000, daily_second_metric: 3000
    },
    {
        date: 'Jun 2', week_first_metric: 6000, week_second_metric: 5098, daily_first_metric: 1690, daily_second_metric: 2450
    },
    {
        date: 'Jun 3', week_first_metric: 3000, week_second_metric: 3300, daily_first_metric: 1390, daily_second_metric: 3450
    },
    {
        date: 'Jun 4', week_first_metric: 1780, week_second_metric: 1908, daily_first_metric: 1890, daily_second_metric: 2450
    },
    {
        date: 'Jun 5', week_first_metric: 5890, week_second_metric: 2800, daily_first_metric: 1550, daily_second_metric: 6450
    },
    {
        date: 'Jun 6', week_first_metric: 5000, week_second_metric: 1800, daily_first_metric: 1344, daily_second_metric: 6554
    },
    {
        date: 'Jun 7', week_first_metric: 3000, week_second_metric: 2300, daily_first_metric: 1344, daily_second_metric: 4567
    },
];


const MainChart = () => {
    const [chartData, updateChartData] = useState([]);

    const dispatch = useDispatch();

    const {showWeekChart, showDailyChart, selectedRangeDate, activeMetrics} = useSelector(state => ({
        showWeekChart: state.dashboard.showWeekChart,
        showDailyChart: state.dashboard.showDailyChart,
        selectedRangeDate: state.dashboard.selectedRangeDate,
        activeMetrics: state.dashboard.activeMetrics,
    }));

    const timeRange = (start, end) => {
        dispatch(dashboardActions.selectDateRange([
            moment(start, 'DD-MM-YYYY').format('YYYY-MM-DD'),
            moment(end, 'DD-MM-YYYY').format('YYYY-MM-DD'),
        ]))
    };

    const handleChangeSwitch = (type) => () => dispatch(dashboardActions.switchChart(type));

    const getChartData = () => {
        dashboardServices.fetchChartData({
            startDate: moment(selectedRangeDate.startDate).format('YYYY-MM-DD'),
            endDate: moment(selectedRangeDate.endDate).format('YYYY-MM-DD'),
            firstMetric: activeMetrics[0] ? activeMetrics[0].key : null,
            secondMetric: activeMetrics[1] ? activeMetrics[1].key : null,
        })
            .then(res => {
                // updateChartData(res);
                updateChartData((flag & 1) ? data : data2);
                flag++;
            })
    };

    useEffect(getChartData, [activeMetrics, selectedRangeDate]);

    return (
        <div className='main-chart'>
            <Header
                timeRange={timeRange}
                onChangeSwitch={handleChangeSwitch}
                selectedRangeDate={selectedRangeDate}
                firstActiveMetricTitle={activeMetrics && activeMetrics[0].title}
                secondActiveMetricTitle={activeMetrics && activeMetrics[1].title}
                showWeekChart={showWeekChart}
                showDailyChart={showDailyChart}
            />

            <Chart
                showWeekChart={showWeekChart}
                showDailyChart={showDailyChart}
                activeMetrics={activeMetrics}
                data={chartData}
            />
        </div>
    )
};

export default MainChart;
