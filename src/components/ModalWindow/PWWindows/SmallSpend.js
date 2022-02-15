import React, {useState} from "react"
import ModalWindow from "../ModalWindow"
import '../ModalWindow.less'
import img from '../../../assets/img/small-spend-img.png'
import {Checkbox} from "antd"

const SmallSpend = ({visible, onSubmit, onCancel = false, btnText = 'Get Started'}) => {

    const [userAccept, setUserAccept] = useState(false)

    return (
        <ModalWindow
            className={'payment-notification-window small-spend-window'}
            footer={null}
            container={true}
            visible={visible}
            handleCancel={onCancel}
        >
            <img src={img} alt=""/>
            <h3>Attention!</h3>

            <p>
                To make your advertising campaign efficient and <br/>
                optimized properly, the following rules should be followed:
            </p>

            <p>
                1. The appropriate amount of information regarding the <br/> user must be entered into the system.
                <br/>
                2. Your campaign budget must exceed $1000.
            </p>

            <Checkbox
                value={userAccept}
                onChange={({target: {checked}}) => setUserAccept(checked)}
            >
                I’ve read and accept the terms
            </Checkbox>

            <button className="btn default" disabled={!userAccept} onClick={userAccept && onSubmit}>
                {btnText}
            </button>
        </ModalWindow>
    )
}

export default SmallSpend
