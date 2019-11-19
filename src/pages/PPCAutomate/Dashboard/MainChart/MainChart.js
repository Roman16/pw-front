import React, {useState, useEffect} from 'react';
import Header from './ChartHeader';
import Chart from './LineChart';
import './MainChart.less';
import {dashboardActions} from "../../../../actions/dashboard.actions";
import {dashboardServices} from "../../../../services/dashboard.services";
import moment from "moment";
import {useDispatch, useSelector} from "react-redux";

const data = [
    {
        date: '2019-03-04T17:24:58.828Z',
        week_first_metric: 0,
        week_second_metric: 1000,
        daily_first_metric: 2000,
        daily_second_metric: 3000
    },
    {
        date: '2019-03-05T17:24:58.828Z',
        week_first_metric: 3000,
        week_second_metric: 2098,
        daily_first_metric: 1690,
        daily_second_metric: 2450
    },
    {
        date: '2019-03-06T17:24:58.828Z',
        week_first_metric: 2000,
        week_second_metric: 2300,
        daily_first_metric: 1390,
        daily_second_metric: 3450
    },
    {
        date: '2019-03-07T17:24:58.828Z',
        week_first_metric: 2780,
        week_second_metric: 3908,
        daily_first_metric: 1890,
        daily_second_metric: 2450
    },
    {
        date: '2019-03-08T17:24:58.828Z',
        week_first_metric: 2890,
        week_second_metric: 4800,
        daily_first_metric: 1550,
        daily_second_metric: 6450
    },
    {
        date: '2019-03-09T17:24:58.828Z',
        week_first_metric: 2000,
        week_second_metric: 3800,
        daily_first_metric: 1344,
        daily_second_metric: 6554
    },
    {
        date: '2019-03-10T17:24:58.828Z',
        week_first_metric: 2000,
        week_second_metric: 4300,
        daily_first_metric: 1344,
        daily_second_metric: 4567
    },
    {
        date: '2019-03-11T17:24:58.828Z',
        week_first_metric: 2000,
        week_second_metric: 4300,
        daily_first_metric: 1344,
        daily_second_metric: 4567
    },
    {
        date: '2019-03-12T17:24:58.828Z',
        week_first_metric: 2000,
        week_second_metric: 4300,
        daily_first_metric: 1344,
        daily_second_metric: 4567
    },
    {
        date: '2019-03-13T17:24:58.828Z',
        week_first_metric: 2000,
        week_second_metric: 4300,
        daily_first_metric: 1344,
        daily_second_metric: 4567
    },
    {
        date: '2019-03-14T17:24:58.828Z',
        week_first_metric: 2000,
        week_second_metric: 4300,
        daily_first_metric: 1344,
        daily_second_metric: 4567
    },
    {
        date: '2019-03-15T17:24:58.828Z',
        week_first_metric: 2000,
        week_second_metric: 4300,
        daily_first_metric: 1344,
        daily_second_metric: 4567
    },
    {
        date: '2019-03-16T17:24:58.828Z',
        week_first_metric: 2000,
        week_second_metric: 4300,
        daily_first_metric: 1344,
        daily_second_metric: 4567
    },
];

const data2 = [
    {
        date: '2019-03-04T17:24:58.828Z',
        week_first_metric: 1000,
        week_second_metric: 3000,
        daily_first_metric: 2000,
        daily_second_metric: 3000
    },
    {
        date: '2019-03-05T17:24:58.828Z',
        week_first_metric: 6000,
        week_second_metric: 5098,
        daily_first_metric: 1690,
        daily_second_metric: 2450
    },
    {
        date: '2019-03-06T17:24:58.828Z',
        week_first_metric: 3000,
        week_second_metric: 3300,
        daily_first_metric: 1390,
        daily_second_metric: 3450
    },
    {
        date: '2019-03-07T17:24:58.828Z',
        week_first_metric: 1780,
        week_second_metric: 1908,
        daily_first_metric: 1890,
        daily_second_metric: 2450
    },
    {
        date: '2019-03-08T17:24:58.828Z',
        week_first_metric: 5890,
        week_second_metric: 2800,
        daily_first_metric: 1550,
        daily_second_metric: 6450
    },
    {
        date: '2019-03-09T17:24:58.828Z',
        week_first_metric: 5000,
        week_second_metric: 1800,
        daily_first_metric: 1344,
        daily_second_metric: 6554
    },
    {
        date: '2019-03-10T17:24:58.828Z',
        week_first_metric: 3000,
        week_second_metric: 2300,
        daily_first_metric: 1344,
        daily_second_metric: 4567
    },
];

const MainChart = () => {
    const [chartData, updateChartData] = useState([]);

    const dispatch = useDispatch();

    const {showWeekChart, showDailyChart, selectedRangeDate, activeMetrics, selectedProduct} = useSelector(state => ({
        showWeekChart: state.dashboard.showWeekChart,
        showDailyChart: state.dashboard.showDailyChart,
        selectedRangeDate: state.dashboard.selectedRangeDate,
        activeMetrics: state.dashboard.activeMetrics,
        selectedProduct: state.dashboard.selectedProduct,
    }));

    const timeRange = (start, end) => {
        console.log(start);
        console.log(end);
        dispatch(dashboardActions.selectDateRange({
                startDate: moment(start, 'DD-MM-YYYY').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
                endDate: end ? moment(end, 'DD-MM-YYYY').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]') : moment(start, 'DD-MM-YYYY').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
            }
        ))
    };

    const handleChangeSwitch = (type) => () => dispatch(dashboardActions.switchChart(type));

    const getChartData = () => {
        if (activeMetrics[0].key || activeMetrics[1].key) {
            dashboardServices.fetchLineChartData({
                startDate: selectedRangeDate.startDate,
                endDate: selectedRangeDate.endDate,
                firstMetric: activeMetrics[0] ? activeMetrics[0].key : null,
                secondMetric: activeMetrics[1] ? activeMetrics[1].key : null,
                productId: selectedProduct
            })
                .then(res => {
                    updateChartData(res);
                })
        } else {
            updateChartData([])
        }
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
                selectedRangeDate={selectedRangeDate}
            />
        </div>
    )
};

export default MainChart;
