import React, {useEffect, useState} from "react"
import ModalWindow from "../../../../components/ModalWindow/ModalWindow"
import {Spin} from "antd"

let intervalId

const ConfirmUploadWindow = ({
                                 visible,
                                 semanticName,
                                 user = {
                                     name: '',
                                     last_name: '',
                                     email: ''
                                 },
                                 uploadProcessing,

                                 onSubmit,
                                 onCancel
                             }) => {
    const [disableSubmit, setDisabledSubmit] = useState(true),
        [disableInterval, setDisableInterval] = useState(3)

    useEffect(() => {
        if (visible) {
            setTimeout(() => {
                setDisabledSubmit(false)
            }, 3000)

            intervalId = setInterval(() => {
                setDisableInterval(prevState => --prevState)
            }, 1000)
        } else {
            clearInterval(intervalId)
            setDisabledSubmit(true)
            setDisableInterval(3)

        }
    }, [visible])

    return (
        <ModalWindow
            footer={false}
            className={'confirm-upload-window'}
            destroyOnClose={true}
            visible={visible}
        >
            <h1>Are You sure?</h1>

            <p>Upload semantic: </p>
            <b>{semanticName}</b>
            <br/>
            <p>for user: </p>
            <b>{`${user.name} ${user.last_name}`}</b>
            <b>{user.email}</b>

            <div className="actions">
                <button className={'btn white'} disabled={disableSubmit || uploadProcessing} onClick={onSubmit}>
                    I'm sure {disableInterval > 0 && `(${disableInterval})`}
                    {uploadProcessing && <Spin size={'small'}/>}
                </button>

                <button className={'btn default'} onClick={onCancel} disabled={uploadProcessing}>
                    No
                </button>
            </div>
        </ModalWindow>
    )
}

export default ConfirmUploadWindow
