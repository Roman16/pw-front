import React, {useState, Fragment} from "react";
import FirstPieChart from "./PieChart";
import SecondBarChart from "./BarChart";
import pieDefaultIcon from '../../../../assets/img/icons/pie-chart-default.svg';
import pieActiveIcon from '../../../../assets/img/icons/pie-chart-active.svg';
import barActiveIcon from '../../../../assets/img/icons/bar-chart-active.svg';
import barDefaultIcon from '../../../../assets/img/icons/bar-chart-default.svg';
import Tooltip from "../../../../components/Tooltip/Tooltip";

import './Chart.less';
import {useSelector} from "react-redux";

const Chart = () => {
    const [defaultChart, changeChart] = useState('pie');
    const {activeMetrics} = useSelector(state => ({
        activeMetrics: state.dashboard.activeMetrics,
    }));

    return (
        <div className='chart'>
            <div className='bloc-title'>
                <span className='title'>Organic / PPC</span>

                {defaultChart === 'pie' && <Tooltip />}

                <div className='chart-selector'>
                    <img src={defaultChart === 'pie' ? pieActiveIcon : pieDefaultIcon} alt=""
                         onClick={() => changeChart('pie')}/>

                    <img src={defaultChart === 'bar' ? barActiveIcon : barDefaultIcon} alt=""
                         onClick={() => changeChart('bar')}/>
                </div>
            </div>

            {defaultChart === 'bar' && <Fragment>
                <div className='bar-chart-legend'>
                    <div className='first-bar'><div className='example-fill'></div>Organic</div>
                    <div className='second-bar'><div className='example-fill'></div>PPC</div>

                    <div className='bar-chart-description'>Last 7 Days</div>
                </div>

                <SecondBarChart/>
            </Fragment>}

            {defaultChart === 'pie' && <FirstPieChart/>}

        </div>
    )
};

export default Chart;