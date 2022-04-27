import React, {useEffect, useState} from "react"
import ModalWindow from "../ModalWindow"

import img from '../../../assets/img/start-free-trial-image.svg'
import {Spin} from "antd"
import {history} from "../../../utils/history"

let intervalId

const StartFreeTrialWindow = ({visible}) => {
    const [processing, setProcessing] = useState(false)

    const handleOk = async () => {
        history.push('/account/subscriptions')
    }

    useEffect(() => {
        clearInterval(intervalId)

        setProcessing(false)
    }, [visible])

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