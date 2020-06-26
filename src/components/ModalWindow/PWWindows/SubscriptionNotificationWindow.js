import React from "react";
import ModalWindow from "../ModalWindow";
import '../ModalWindow.less';
import img from '../../../assets/img/expired-subscription-image.svg'
import {Link} from "react-router-dom";

const SubscriptionNotificationWindow = ({visible}) => {

    return (
        <ModalWindow
            className={'payment-notification-window'}
            footer={null}
            container={true}
            visible={visible}
            handleCancel={false}
        >

            <div className="image">
                <img src={img} alt=""/>
            </div>

            <div className={'description'}>
                <h3>Oops!</h3>

                <p>
                    It looks like your trial has expired, or you didn’t renew your <br/>
                    subscription plan. Please upgrade to Pro subscription to <br/>
                    continue using Profit Whales Software.
                </p>

                <Link to={'/account/subscription'} className={'btn white'}>
                    Upgrade Now
                </Link>
            </div>
        </ModalWindow>
    )
};

export default SubscriptionNotificationWindow;
