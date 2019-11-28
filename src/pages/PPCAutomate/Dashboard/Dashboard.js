import React, {Fragment, useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Metrics from './Metrics/Metrics';
import LineChart from "./MainChart/MainChart";
import ProductBreakdown from "./ProductBreakdown/ProductBreakdown";
import {dashboardActions} from "../../../actions/dashboard.actions";
import './Dashboard.less';
import Chart from "./Chart/Chart";
import ModalWindow from "../../../components/ModalWindow/ModalWindow";
import AddMetricModal from "./Metrics/AddMetric/AddMetricModal";
import {history} from "../../../utils/history";
import SubscriptionNotificationWindow from "../../../components/ModalWindow/SubscriptionNotificationWindow";


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

            <SubscriptionNotificationWindow product={'dashboard'}/>
        </div>
    )
};

export default Dashboard;