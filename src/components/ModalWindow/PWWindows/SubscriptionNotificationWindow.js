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
                It looks like your Free Trial has expired, <br/>
                or you didn’t renew your subscription plan.<br/>
                Please subscribe to continue using this <br/>
                feature of Sponsoreds Software.
            </p>

            <Link to={'/account/subscription'} className={'btn default'}>
                See Subscription Plans
            </Link>
        </ModalWindow>
    )
}

export default SubscriptionNotificationWindow
