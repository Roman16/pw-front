import React, {useState} from "react"
import ModalWindow from "../../../../components/ModalWindow/ModalWindow"
import {Checkbox} from "antd"

export const AdBlockWindow = ({visible, setVisibleWindow}) => {
    return <ModalWindow
        visible={visible}
        footer={false}
        className={'adblock-message-window'}
    >
        <h2>Ad blocker usage is detected.</h2>
        <p>
            Pay attention that using ad blockers may cause inaccuracy showing up in analytics in the software.
        </p>

        <div className="actions">
            <button className="btn default" onClick={() => setVisibleWindow(false)}>
                Ok
            </button>
        </div>
    </ModalWindow>

}