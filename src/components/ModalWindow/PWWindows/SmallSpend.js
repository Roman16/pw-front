import React from "react"
import ModalWindow from "../ModalWindow"
import '../ModalWindow.less'
import img from '../../../assets/img/only-desktop-img.svg'
import {Link} from "react-router-dom"

const SmallSpend = ({visible}) => {
    return (
        <ModalWindow
            className={'payment-notification-window small-spend-window'}
            footer={null}
            container={true}
            visible={visible}
            handleCancel={false}
        >
            <img src={img} alt=""/>

            <h3>Oops!</h3>

            <p>
                Unfortunately, PPC Automation is only accessible for <br/>
                Sellers with Ad Spend more than $1,000 per month. <br/>
                You can start by creating professionally structured <br/>
                PPC campaigns with <Link to={'/zero-to-hero/campaign'}>Zero to Hero</Link>.
            </p>
        </ModalWindow>
    )
}

export default SmallSpend
