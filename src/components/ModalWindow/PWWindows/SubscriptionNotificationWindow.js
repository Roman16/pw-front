import React from "react"
import ModalWindow from "../ModalWindow"
import '../ModalWindow.less'
import img from '../../../assets/img/expired-subscription-image.svg'
import {Link} from "react-router-dom"

const SubscriptionNotificationWindow = ({visible}) => {
    return (
        <ModalWindow
            className={'payment-notification-window'}
            footer={null}
            container={true}
            visible={visible}
            handleCancel={false}
        >

            <img src={img} alt=""/>

            <h3>Oops!</h3>

            <p>
                It looks like your trial has expired, or you <br/>
                didn’t renew your subscription plan. Please <br/>
                upgrade to Pro subscription to continue <br/>
                using Sponsoreds Software.
            </p>

            <Link to={'/account/subscriptions'} className={'btn default'}>
                Upgrade Now
            </Link>
        </ModalWindow>
    )
}

export default SubscriptionNotificationWindow
