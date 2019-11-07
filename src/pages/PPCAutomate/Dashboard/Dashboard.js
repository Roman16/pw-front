import React from 'react';

import Metrics from './Metrics/Metrics';
import LineChart from "./MainChart/MainChart";
import ProductBreakdown from "./ProductBreakdown/ProductBreakdown";

import './Dashboard.less';
import Chart from "./Chart/Chart";

const Dashboard = () => (
    <div className="dashboard-page">
        <Metrics />

        <LineChart />

        <div className='products-statistic'>
            <ProductBreakdown />

            <Chart/>
        </div>
    </div>
);

export default Dashboard;