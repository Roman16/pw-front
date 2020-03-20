import React, {Fragment, useEffect, useState} from "react";
import ModalWindow from "../ModalWindow";
import {history} from "../../../utils/history";
import {useSelector, useDispatch} from "react-redux";
import {Result} from 'antd';
import '../ModalWindow.less';
import {userActions} from "../../../actions/user.actions";


const SubscriptionNotificationWindow = ({product, page}) => {
    const dispatch = useDispatch();

    const [visibleWindow, setWindow] = useState(true);
    const {subscribedProduct, bootstrapInProgress} = useSelector(state => ({
        subscribedProduct: state.user.subscriptions[Object.keys(state.user.subscriptions)[0]],
        bootstrapInProgress: state.user.notifications.account_bootstrap ? state.user.notifications.account_bootstrap.bootstrap_in_progress : true
    }));

    useEffect(() => {
        if (bootstrapInProgress) {
            setWindow(false);
        } else {
            if (!subscribedProduct.has_access || (subscribedProduct.pending_payment && subscribedProduct.pending_payment.has_pending_payment)) {
                setWindow(true);
            } else {
                setWindow(false);
            }
        }
    }, [subscribedProduct]);

    useEffect(() => {
        dispatch(userActions.getPersonalUserInfo())
    }, []);

    function RenderModalWindow() {
        return (
            <Fragment>
                {subscribedProduct.pending_payment && subscribedProduct.pending_payment.has_pending_payment &&
                <button onClick={() => setWindow(false)} className='close-window'>&#215;</button>}

                <Result
                    status="403"
                    title="Oops !"
                    subTitle="It looks like your trial has expired, or you didn’t renew your subscription plan. Please upgrade to Pro subscription to continue using Profit Whales Software."
                />
                <div className='buttons-block'>
                    {subscribedProduct.incomplete_payment.has_incomplete_payment || (subscribedProduct.pending_payment && subscribedProduct.pending_payment.has_pending_payment) ?
                        <button onClick={() => history.push('/account-subscription')} className='btn green-btn'>
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
            handleCancel={() => subscribedProduct.pending_payment && subscribedProduct.pending_payment.has_pending_payment && setWindow(false)}
        >

            <RenderModalWindow/>

        </ModalWindow>
    )
};

export default SubscriptionNotificationWindow;
