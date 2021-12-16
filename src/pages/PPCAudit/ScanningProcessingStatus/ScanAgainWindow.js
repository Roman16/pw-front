import React from "react"
import ModalWindow from "../../../components/ModalWindow/ModalWindow"
import StartScanning from "../StartScanning/StartScanning"
import {SVG} from "../../../utils/icons"

const ScanAgainWindow = ({visible = true, product, onClose, onStart}) => {

    return (<ModalWindow
        visible={visible}
        footer={false}
        className={'scan-again-window'}
        handleCancel={onClose}
        destroyOnClose={true}
    >
        <button className="btn icon" onClick={onClose}>
            <SVG id={'close-window-icon'}/>
        </button>

        <StartScanning
            product={product}
            onStart={onStart}
        />
    </ModalWindow>)
}

export default ScanAgainWindow