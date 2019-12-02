import React, {Fragment, useEffect, useState} from "react";
import ModalWindow from "./ModalWindow";
import {history} from "../../utils/history";
import {useSelector} from "react-redux";
import {Result, Button} from 'antd';
import './ModalWindow.less';
import {subscriptionProducts} from '../../constans/subscription.products.name';


const SubscriptionNotificationWindow = ({product}) => {
    const currentPage = document.querySelector(`.${product}-page`),
        modalWrap = document.querySelector('.ant-modal-wrap');

    const [visibleWindow, openWindow] = useState(false);
    const {subscribedProduct} = useSelector(state => ({
        subscribedProduct: state.user.subscriptions[subscriptionProducts.find(item => item.key === product).id]
    }));

    useEffect(() => {
        if (!subscribedProduct.has_access && (currentPage != null)) {
            openWindow(true);
            currentPage.classList.add("disable-page");
        }
    }, [currentPage, subscribedProduct]);

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