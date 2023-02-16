import React, {useState} from "react"
import ModalWindow from "../../../../components/ModalWindow/ModalWindow"
import {Checkbox} from "antd"

export const AdBlockWindow = ({visible, setVisibleWindow}) => {
    const [dontShowAgain, setDontShowAgain] = useState(false)

    const setWindowStateHandler = () => {
        // if (dontShowAgain) localStorage.setItem('dontShowDaypartingWindow', 'true')

        setVisibleWindow(false)
    }


    return <ModalWindow
        visible={visible}
        footer={false}
        className={'adblock-message-window'}
    >
        <h2>Please disable Adblock</h2>
        <p>
            Adblock badly affects the operation of our website. Please disable Adblock and reload page
        </p>

        <div className="actions">
            {/*<Checkbox*/}
            {/*    checked={dontShowAgain}*/}
            {/*    onChange={({target: {checked}}) => setDontShowAgain(checked)}*/}
            {/*>*/}
            {/*    Don’t show this message again*/}
            {/*</Checkbox>*/}

            <button className="btn default" onClick={setWindowStateHandler}>
                Ok
            </button>
        </div>
    </ModalWindow>

}