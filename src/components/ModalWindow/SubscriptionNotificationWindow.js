import React, {Fragment, useEffect, useState} from "react";
import ModalWindow from "./ModalWindow";
import {history} from "../../utils/history";
import {useSelector} from "react-redux";
import {Result, Button} from 'antd';
import './ModalWindow.less';
import {subscriptionProducts} from '../../constans/subscription.products.name';


const SubscriptionNotificationWindow = ({product}) => {
    const mainContainer = document.querySelector(`.main-pages`),
        modalWrap = document.querySelector('.ant-modal-wrap');

    const [visibleWindow, openWindow] = useState(false);
    const {subscribedProduct} = useSelector(state => ({
        subscribedProduct: state.user.subscriptions[subscriptionProducts.find(item => item.key === product).productId]
    }));

    useEffect(() => {
        if (!subscribedProduct.has_access && (mainContainer != null)) {
            openWindow(true);
            mainContainer.classList.add("disable-page");
        }

        return (() => {
            if (subscribedProduct.has_access && (mainContainer != null)) {
                mainContainer.classList.remove("disable-page");
            }
        })
    }, [mainContainer, subscribedProduct]);

    function RenderModalWindow() {
        return (
            <Fragment>
                <Result
                    status="403"
                    title="Hey 👋"
                    subTitle="The PPC Automate tool is only available to customers with an active subscription. Upgrade now."
                />
                <div className='buttons-block'>
                    {!subscribedProduct.incomplete_payment.has_incomplete_payment && <button onClick={() => history.push('/account-subscription')} className='btn default'>Free Trial
                    </button>}

                    {subscribedProduct.incomplete_payment.has_incomplete_payment ?
                        <button onClick={() => history.push('/account-billing')} className='btn green-btn'>
                            Upgrade Now
                        </button>
                        :
                        <button onClick={() => history.push('/account-subscription')} className='btn green-btn'>
                            Upgrade Now
                        </button>
                    }
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