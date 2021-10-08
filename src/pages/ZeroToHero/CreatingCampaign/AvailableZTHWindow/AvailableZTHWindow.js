import React from "react"
import ModalWindow from "../../../../components/ModalWindow/ModalWindow"
import {Link} from "react-router-dom"
import './AvailableZTHWindow.less'

const AvailableZTHWindow = ({visible}) => {
    return(<ModalWindow
        className={'available-zth-window'}
        visible={visible}
        footer={false}
    >
        <h2>Are you sure you want to change the product for ZTH?</h2>
        <p>
            Settings you've provided will be saved, but you will need to check Seed Keywords to make sure that they are
            relevant to the new product.
        </p>

        <Link to={'zero-to-hero/settings'} className={'sds-btn default'}>Zero to Hero Products</Link>
    </ModalWindow>)
}

export default AvailableZTHWindow