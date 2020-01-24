import React, {Fragment, useEffect, useState} from "react";
import ModalWindow from "../ModalWindow";
import {history} from "../../../utils/history";
import {useSelector, useDispatch} from "react-redux";
import {Result} from 'antd';
import '../ModalWindow.less';
import {subscriptionProducts} from '../../../constans/subscription.products.name';
import {userActions} from "../../../actions/user.actions";


const SubscriptionNotificationWindow = ({product}) => {
    const dispatch = useDispatch();

    const [visibleWindow, openWindow] = useState(true);
    const {subscribedProduct, bootstrapInProgress} = useSelector(state => ({
        subscribedProduct: state.user.subscriptions[subscriptionProducts.find(item => item.key === product).productId],
        bootstrapInProgress: state.user.notifications.account_bootstrap ? state.user.notifications.account_bootstrap.bootstrap_in_progress : true
    }));

    useEffect(() => {
        if (bootstrapInProgress) {
            openWindow(false);
        } else {
            if (!subscribedProduct.has_access) {
                openWindow(true);
            } else {
                openWindow(false);
            }
        }
    }, [subscribedProduct]);

    useEffect(() => {
        dispatch(userActions.getPersonalUserInfo())
    }, []);

    function RenderModalWindow() {
        return (
            <Fragment>
                <Result
                    status="403"
                    title="Hey 👋"
                    subTitle="The PPC Automate tool is only available to customers with an active subscription. Please upgrade your subscription to continue using the software."
                />
                <div className='buttons-block'>
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


    return (
        <ModalWindow
            className={'payment-notification-window'}
            footer={null}
            container={true}
            visible={visibleWindow}
        >

            <RenderModalWindow/>

        </ModalWindow>
    )
};

export default SubscriptionNotificationWindow;
