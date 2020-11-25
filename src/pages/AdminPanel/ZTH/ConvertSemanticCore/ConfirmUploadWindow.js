import React, {useEffect, useState} from "react"
import ModalWindow from "../../../../components/ModalWindow/ModalWindow"
import {Spin} from "antd"

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
    const [disableSubmit, setDisabledSubmit] = useState(true)

    useEffect(() => {
        if (visible) {
            setTimeout(() => {
                setDisabledSubmit(false)
            }, 3000)
        } else {
            setDisabledSubmit(true)
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
                    Yes
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
