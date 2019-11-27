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

const dashboardProductName = 'prod_G8YHW9gpThjntf';

const Dashboard = () => {
    const dispatch = useDispatch();
    const [visibleWindow, openWindow] = useState(false);
    const {dashboard, dashboardSubscribed} = useSelector(state => ({
        dashboard: state.dashboard,
        dashboardSubscribed: state.user.subscriptions[dashboardProductName]
    }));

    if (!dashboard.selectedRangeDate) {
        dispatch(dashboardActions.reSetDashboard());
    }

    useEffect(() => {
        if (dashboardSubscribed.has_access) {
            openWindow(true)
        }
    }, []);

    function RenderModalWindow() {
        return (
            <Fragment>
                <h3>You haven't subscriptions</h3>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Accusamus aperiam, atque est excepturi exercitationem in laborum natus numquam quibusdam soluta
                veritatis vitae.
                Accusamus amet assumenda ea excepturi magni obcaecati quo!
            </Fragment>
        )
    }


    return (
        <div className={`dashboard-page ${dashboardSubscribed.has_access && 'disable-page'}`}>
            <Metrics/>

            <LineChart/>

            <div className='products-statistic'>
                <ProductBreakdown/>

                <Chart/>
            </div>

            <ModalWindow
                className={'dashboard-payment-window'}
                mask={false}
                visible={visibleWindow}
                handleOk={() => {
                    history.push('/account-subscription')
                }}
                handleCancel={() => {
                    history.push('/account-settings')
                }}
            >

                <RenderModalWindow/>

            </ModalWindow>
        </div>
    )
};

export default Dashboard;