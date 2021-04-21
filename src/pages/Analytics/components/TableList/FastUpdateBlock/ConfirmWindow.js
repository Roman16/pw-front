import React, {useEffect, useState} from "react"
import ModalWindow from "../../../../../components/ModalWindow/ModalWindow"
import {Spin} from "antd"

const ConfirmWindow = ({
                           visible,
                           count,
                           onSubmit,
                           onCancel
                       }) => {
    const [processing, setProcessing] = useState(false)

    const submitHandler = (e) => {
        setProcessing(true)
        onSubmit(e)
    }

    useEffect(() => {
        if (!visible) setProcessing(false)
    }, [visible])

    return (<ModalWindow
            footer={false}
            className={'confirm-window'}
            destroyOnClose={true}
            visible={visible}
        >
            <h1>Permanently archive {count} {count === 1 ? 'campaign' : 'campaigns'}?</h1>

            <p>Once an entity is archived, it can't be re-enabled. Instead of archiving, you can pause entities to stop
                accumulating new charges. Paused entities can be re-enabled at any time.</p>

            <form className="actions" onSubmit={submitHandler}>
                <button className={'btn white'} disabled={processing}>
                    Confirm
                    {processing && <Spin size={'small'}/>}
                </button>

                <button type={'button'} className={'btn default'} onClick={onCancel}>
                    Cancel
                </button>
            </form>
        </ModalWindow>

    )
}

export default ConfirmWindow