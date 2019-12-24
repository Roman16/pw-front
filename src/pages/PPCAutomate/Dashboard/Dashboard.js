import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Metrics from './Metrics/Metrics';
import LineChart from "./MainChart/MainChart";
import ProductBreakdown from "./ProductBreakdown/ProductBreakdown";
import {dashboardActions} from "../../../actions/dashboard.actions";
import './Dashboard.less';
import Chart from "./Chart/Chart";

import SubscriptionNotificationWindow from "../../../components/ModalWindow/InformationWindows/SubscriptionNotificationWindow";


const Dashboard = () => {
    const dispatch = useDispatch();
    const {dashboard} = useSelector(state => ({
        dashboard: state.dashboard,
    }));

    if (!dashboard.selectedRangeDate) {
        dispatch(dashboardActions.reSetDashboard());
    }
    
    return (
        <div className={`dashboard-page`}>
            <Metrics/>

            <LineChart/>

            <div className='products-statistic'>
                <ProductBreakdown/>

                <Chart/>
            </div>

            <SubscriptionNotificationWindow product={'ppc'}/>
        </div>
    )
};

export default Dashboard;