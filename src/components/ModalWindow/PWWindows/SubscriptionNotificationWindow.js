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
                It looks like your Free Trial has expired or your subscription <br/> plan doesn't include this Sponsoreds feature. <br/>
                Please subscribe or upgrade your subscription plan <br/> to get access to this feature of Sponsoreds software.
            </p>

            <Link to={'/account/subscriptions'} className={'btn default'}>
                See Subscription Plans
            </Link>
        </ModalWindow>
    )
}

export default SubscriptionNotificationWindow
