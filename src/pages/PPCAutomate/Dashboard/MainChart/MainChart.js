import React  from 'react';
import Header from './ChartHeader';
import Chart from './LineChart';
import './MainChart.less';


const MainChart = () => {
    return (
        <div className='main-chart'>
            <Header/>

            <Chart />
        </div>
    )
};

export default MainChart;