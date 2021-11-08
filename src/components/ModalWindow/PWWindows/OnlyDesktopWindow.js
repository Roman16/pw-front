import React from "react"
import ModalWindow from "../ModalWindow"
import {Link} from "react-router-dom"
import img from '../../../assets/img/only-desktop-img.svg'

const OnlyDesktopWindow = ({visible, text}) => {

    return (
        <ModalWindow
            className={'only-desktop'}
            visible={visible}
            footer={false}
            handleCancel={false}
            container={true}
        >
            <img src={img} alt=""/>

            <h3>Desktop device recommended</h3>

            <p>
                For better experience we recommend using either a PC, a laptop or a tablet to access Sponsoreds
                software. You can login to your account on another device using <Link to={'/login'}> this
                link </Link> and continue your journey
            </p>

        </ModalWindow>
    )
}

export default OnlyDesktopWindow