import React, {Fragment, useEffect, useState} from "react";
import ModalWindow from "./ModalWindow";
import {history} from "../../utils/history";
import {useSelector} from "react-redux";
import {Result, Button} from 'antd';
import './ModalWindow.less';

const productsName = {
    dashboard: 'prod_G8YHW9gpThjntf'
};


const SubscriptionNotificationWindow = ({product}) => {

    const currentPage = document.querySelector(`.${product}-page`),
        modalWrap = document.querySelector('.ant-modal-wrap');

    const [visibleWindow, openWindow] = useState(false);
    const {dashboardSubscribed} = useSelector(state => ({
        dashboardSubscribed: state.user.subscriptions[productsName[product]]
    }));

    // useEffect(() => {
    //     console.log(dashboardSubscribed);
    //
    //     if (!dashboardSubscribed.has_access && (currentPage !== null)) {
    //         openWindow(true);
    //         currentPage.classList.add("disable-page");
    //     }
    // }, [currentPage, dashboardSubscribed]);

    function RenderModalWindow() {
        return (
            <Fragment>
                <Result
                    status="403"
                    title="Hey 👋"
                    subTitle="The PPC Automate tool is only available to customers with an active subscription. Upgrade now."
                />

                <div className='buttons-block'>
                    <button onClick={() => history.push('/account-subscription')} className='btn default'>Free Trial
                    </button>
                    <button onClick={() => history.push('/account-subscription')} className='btn green-btn'>Upgrade
                        Now
                    </button>
                </div>
            </Fragment>
        )
    }

    modalWrap && modalWrap.classList.add('payment-modal-wrap');


    return (
        <ModalWindow
            className={'payment-notification-window'}
            mask={false}
            footer={null}
            visible={visibleWindow}
        >

            <RenderModalWindow/>

        </ModalWindow>
    )
};

export default SubscriptionNotificationWindow;