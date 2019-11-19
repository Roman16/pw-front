import React, {useState, useEffect, Fragment} from "react";
import FirstPieChart from "./PieChart";
import SecondBarChart from "./BarChart";
import pieDefaultIcon from '../../../../assets/img/icons/pie-chart-default.svg';
import pieActiveIcon from '../../../../assets/img/icons/pie-chart-active.svg';
import barActiveIcon from '../../../../assets/img/icons/bar-chart-active.svg';
import barDefaultIcon from '../../../../assets/img/icons/bar-chart-default.svg';
import Tooltip from "../../../../components/Tooltip/Tooltip";
import {dashboardServices} from '../../../../services/dashboard.services'
import './Chart.less';
import {useSelector} from "react-redux";
import moment from "moment";

const pieDefaultData = [
    {name: 'organic', value: 400},
    {name: 'ppc', value: 300},
];

const pieDefaultData2 = [
    {name: 'organic', value: 587},
    {name: 'ppc', value: 400},
];

const barDefaultData = [
    {
        date: '2019-03-04T17:24:58.828Z', organic: 1398, ppc: 4000,
    },
    {
        date: '2019-03-05T17:24:58.828Z', organic: 1398, ppc: 3000,
    },
    {
        date: '2019-03-06T17:24:58.828Z', organic: 6800, ppc: 2000,
    },
    {
        date: '2019-03-07T17:24:58.828Z', organic: 3908, ppc: 2780,
    },
    {
        date: '2019-03-08T17:24:58.828Z', organic: 4800, ppc: 1890,
    },
    {
        date: '2019-03-09T17:24:58.828Z', organic: 3800, ppc: 2390,
    },
    {
        date: '2019-03-10T17:24:58.828Z', organic: 3300, ppc: 2890,
    },
];

const Chart = () => {

    const [defaultChart, changeChart] = useState('pie'),
        [pieChartData, updatePieChart] = useState([]),
        [barChartData, updateBarChart] = useState([]);

    const {selectedRangeDate, selectedProduct} = useSelector(state => ({
        activeMetrics: state.dashboard.activeMetrics,
        selectedRangeDate: state.dashboard.selectedRangeDate,
        selectedProduct: state.dashboard.selectedProduct,
    }));

    const startDate = selectedRangeDate ? selectedRangeDate.startDate : moment(new Date).format(),
        endDate = selectedRangeDate ? selectedRangeDate.endDate : moment(new Date).format();


    const getPieChartData = () => {
        dashboardServices.fetchPieChartData({startDate, endDate, selectedProduct})
            .then(res => {
                updatePieChart(res);
            })
    };

    const getBarChartData = () => {
        dashboardServices.fetchBarChartData({startDate, endDate, selectedProduct})
            .then(res => {
                updateBarChart(res);
            })
    };

    useEffect(() => {
        getPieChartData();
        getBarChartData();
    }, [selectedProduct]);
    useEffect(() => {
        getPieChartData();
    }, [selectedRangeDate]);

    return (
        <div className='chart'>
            <div className='bloc-title'>
                <span className='title'>Organic / PPC</span>

                {defaultChart === 'pie' && <Tooltip/>}

                <div className='chart-selector'>
                    <img src={defaultChart === 'pie' ? pieActiveIcon : pieDefaultIcon} alt=""
                         onClick={() => changeChart('pie')}/>

                    <img src={defaultChart === 'bar' ? barActiveIcon : barDefaultIcon} alt=""
                         onClick={() => changeChart('bar')}/>
                </div>
            </div>

            {defaultChart === 'bar' && <Fragment>
                <div className='bar-chart-legend'>
                    <div className='first-bar'>
                        <div className='example-fill'></div>
                        Organic
                    </div>
                    <div className='second-bar'>
                        <div className='example-fill'></div>
                        PPC
                    </div>

                    <div className='bar-chart-description'>Last 7 Days</div>
                </div>

                <SecondBarChart
                    data={barChartData}
                    selectedRangeDate={selectedRangeDate}
                />
            </Fragment>}

            {defaultChart === 'pie' &&
            <FirstPieChart
                data={pieChartData}
            />
            }

        </div>
    )
};

export default Chart;
