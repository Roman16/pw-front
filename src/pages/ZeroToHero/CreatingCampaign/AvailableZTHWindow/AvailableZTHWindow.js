import React from "react"
import ModalWindow from "../../../../components/ModalWindow/ModalWindow"
import {Link} from "react-router-dom"
import './AvailableZTHWindow.less'

const AvailableZTHWindow = ({visible}) => {
    return (<ModalWindow
        className={'available-zth-window'}
        visible={visible}
        footer={false}
    >
        <h2>You have reached the limit of unpaid ZTH products!</h2>
        <p>
            You already have [MAXIMUM_NUMBER] products with unpaid ZTH campaigns attached to them. To create ZTH
            campaigns for your other products, purchase at least one previously created ZTH that is waiting for payment.
            You can do this on the ZTH Statuses page.
        </p>

        <Link to={'/zero-to-hero/settings'} className={'sds-btn default'}>Go to ZTH Statuses</Link>
    </ModalWindow>)
}

export default AvailableZTHWindow