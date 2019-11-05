import React from 'react';

import Metrics from './Metrics/Metrics';
import LineChart from "./LineChart/LineChart";
import ProductBreakdown from "./ProductBreakdown/ProductBreakdown";

import './Dashboard.less';

const Dashboard = () => (
    <div className="dashboard-page">
        <Metrics />

        <LineChart />

        <div className='products-statistic'>
            <ProductBreakdown />
        </div>
    </div>
);

export default Dashboard;