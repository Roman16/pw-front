import React, {useState} from "react"
import ModalWindow from "../ModalWindow"

import img from '../../../assets/img/start-free-trial-image.svg'
import {userService} from "../../../services/user.services"
import {Spin} from "antd"
import {notification} from "../../Notification"

const StartFreeTrialWindow = ({visible, onClose}) => {
    const [processing, setProcessing] = useState(false)

    const handleOk = async () => {
        setProcessing(true)

        try {
            await userService.startFreeTrial()
            notification.success({title: 'Success!'})
            onClose()
        } catch (e) {
            console.log(e)
        }

        setProcessing(false)
    }

    return (
        <ModalWindow
            className={'start-free-trial-window'}
            visible={visible}
            footer={false}
            handleCancel={false}
            container={true}
        >

            <img src={img} alt=""/>

            <h3>Hello!</h3>

            <p>
                In order to start the 14-days free trial <br/> please click this button below.
            </p>

            <button className={'btn default'} onClick={handleOk} disabled={processing}>
                Start My Free Trial

                {processing && <Spin size={'small'}/>}
            </button>
        </ModalWindow>
    )
}

export default StartFreeTrialWindow