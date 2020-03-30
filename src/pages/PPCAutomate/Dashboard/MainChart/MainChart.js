import React, {useState, useEffect} from 'react';
import Header from './ChartHeader';
import Chart from './LineChart';
import './MainChart.less';
import {dashboardActions} from "../../../../actions/dashboard.actions";
import {dashboardServices} from "../../../../services/dashboard.services";
import moment from "moment";
import {useDispatch, useSelector} from "react-redux";
import {Spin} from "antd";
import axios from "axios";

const CancelToken = axios.CancelToken;
let source = null;


const MainChart = () => {
    const [chartData, updateChartData] = useState([]);
    const [fetching, switchFetch] = useState(false);
    const [fetchingError, setFetchingError] = useState(false);

    const dispatch = useDispatch();

    const {showWeekChart, showDailyChart, selectedRangeDate, activeMetrics, selectedProduct, onlyOptimization} = useSelector(state => ({
        showWeekChart: state.dashboard.showWeekChart,
        showDailyChart: state.dashboard.showDailyChart,
        selectedRangeDate: state.dashboard.selectedRangeDate,
        activeMetrics: state.dashboard.activeMetrics,
        selectedProduct: state.dashboard.selectedProduct,
        onlyOptimization: state.products.onlyOptimization,
    }));

    let localFetch = false;

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
            localFetch = true;

            switchFetch(true);
            setFetchingError(false);
            source = CancelToken.source();

            dashboardServices.fetchLineChartData({
                startDate: selectedRangeDate.startDate === 'lifetime' ? 'lifetime' : `${moment(selectedRangeDate.startDate).format('YYYY-MM-DD')}T00:00:00.000Z`,
                endDate: selectedRangeDate.endDate === 'lifetime' ? 'lifetime' : `${moment(selectedRangeDate.endDate).format('YYYY-MM-DD')}T00:00:00.000Z`,
                firstMetric: activeMetrics[0] ? activeMetrics[0].key : null,
                secondMetric: activeMetrics[1] ? activeMetrics[1].key : null,
                productId: selectedProduct,
                onlyOptimization: onlyOptimization,
                cancelToken: source.token
            })
                .then(res => {
                    updateChartData(res);
                    switchFetch(false);
                    setFetchingError(false);
                    localFetch= false;
                })
                .catch(() => {
                    localFetch = false;

                    !localFetch && setFetchingError(true);
                    !localFetch && switchFetch(false);
                })
        } else {
            updateChartData([])
        }
    };

    useEffect(() => {
        source && source.cancel();
        getChartData();
    }, [activeMetrics, selectedRangeDate, selectedProduct, onlyOptimization]);

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

            {fetching && <div className="loading">
                <Spin size="large"/>
            </div>}

            {fetchingError && <div className="loading">
               <button className='btn default' onClick={getChartData}>reload</button>
            </div>}
        </div>
    )
};

export default MainChart;
