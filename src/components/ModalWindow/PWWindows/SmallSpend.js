import React from "react"
import ModalWindow from "../ModalWindow"
import '../ModalWindow.less'
import img from '../../../assets/img/small-spend-image.svg'
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

            <div className="image">
                <img src={img} alt=""/>
            </div>

            <div className={'description'}>
                <h3>OOPS!</h3>

                <p>
                    Unfortunately, PPC Automate is only accessible for Sellers with Ad <br/>
                    Spend more than $1,000 per month. You can start by creating <br/>
                    professionally structured PPC campaigns with Zero to Hero for now.
                </p>

                <div className="actions">
                    <Link to={'/zero-to-hero/campaign'} className={'btn green-btn'}>
                        Go To Zero To Hero
                    </Link>

                    <button className={'btn white'} onClick={() => {window.Intercom('show')}}>
                        Talk to our Experts
                    </button>
                </div>
            </div>
        </ModalWindow>
    )
}

export default SmallSpend
