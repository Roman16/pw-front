import React, {useEffect, useState} from "react"
import ModalWindow from "../../../../components/ModalWindow/ModalWindow"
import {Checkbox} from "antd"

const ConfirmChangeProductWindow = ({visibleWindow, onClose, onChange}) => {
    const [dontShowAgain, setDontShowAgain] = useState(false)

    const changeConfirmHandler = () => {
        onChange()

        if (dontShowAgain) localStorage.setItem('dontShowConfirmChaneZTHProduct', 'true')

        setDontShowAgain(false)
    }

    useEffect(() => {
        if (!visibleWindow) setDontShowAgain(false)
    }, [visibleWindow])

    return (<ModalWindow
        className={'confirm-change-product-window'}
        visible={visibleWindow}
        footer={false}
        handleCancel={onClose}
    >
        <h2>Are you sure you want to change the product for ZTH?</h2>
        <p>
            All settings you have provided will be saved, but Seed Keywords will be cleared. You will need to enter new
            Seed Keywords that are relevant to new selected product.
        </p>

        <div className="actions">
            <Checkbox
                checked={dontShowAgain}
                onChange={({target: {checked}}) => setDontShowAgain(checked)}
            >
                Don’t show this message again
            </Checkbox>

            <button className="sds-btn white" onClick={onClose}>No</button>
            <button className="sds-btn default" onClick={changeConfirmHandler}>Yes</button>
        </div>
    </ModalWindow>)
}

export default ConfirmChangeProductWindow