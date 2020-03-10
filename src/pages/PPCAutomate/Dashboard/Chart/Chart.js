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
import {Spin} from "antd";

const Chart = () => {

    const [defaultChart, changeChart] = useState('pie'),
        [pieChartData, updatePieChart] = useState([]),
        [barChartData, updateBarChart] = useState([]);
    const [fetching, switchFetch] = useState(false);
    const [barFetchingError, setBarFetchingError] = useState(false);
    const [pieFetchingError, setPieFetchingError] = useState(false);

    const {selectedRangeDate, selectedProduct} = useSelector(state => ({
        activeMetrics: state.dashboard.activeMetrics,
        selectedRangeDate: state.dashboard.selectedRangeDate,
        selectedProduct: state.dashboard.selectedProduct,
    }));

    const startDate = selectedRangeDate ? selectedRangeDate.startDate : moment(new Date).format(),
        endDate = selectedRangeDate ? selectedRangeDate.endDate : moment(new Date).format();


    const getPieChartData = () => {
        switchFetch(true);
        setPieFetchingError(false);

        dashboardServices.fetchPieChartData({startDate, endDate, selectedProduct})
            .then(res => {
                switchFetch(false);
                setPieFetchingError(false);

                updatePieChart(res);
            })
            .catch(error => {
                switchFetch(false);
                setPieFetchingError(true);
            })
    };

    const getBarChartData = () => {
        switchFetch(true);
        setBarFetchingError(false);

        dashboardServices.fetchBarChartData({endDate, selectedProduct})
            .then(res => {
                switchFetch(false);
                setBarFetchingError(false);

                updateBarChart(res);
            })
            .catch(error => {
                switchFetch(false);
                setBarFetchingError(true);
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

                {defaultChart === 'pie' && <Tooltip
                    description={`Organic to PPC Sales Ratio shows the percentage of sales that are coming from organic versus pay-per-click — seeing this information can reveal whether or not you may be spending too aggressively on PPC.`}/>}

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
                        <div className='example-fill'/>
                        Organic
                    </div>

                    <div className='second-bar'>
                        <div className='example-fill'/>
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

            {fetching && <div className="loading">
                <Spin size="large"/>
            </div>}

            {(pieFetchingError || barFetchingError) && <div className="loading">
                <button className='btn default' onClick={() => {
                    pieFetchingError && getPieChartData();
                    barFetchingError && getBarChartData();
                }}>reload
                </button>
            </div>}
        </div>
    )
};

export default Chart;
