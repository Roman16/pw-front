import React from "react"
import ModalWindow from "../../../../../components/ModalWindow/ModalWindow"
import {Spin} from "antd"

const countLabel = {
    campaigns: ['campaign', 'campaigns'],
    targetings: ['targeting', 'targetings'],
    'negative-targetings': ['negative-targeting', 'negative-targetings'],
    'ad-groups': ['ad-group', 'ad-groups'],
    'product-ads': ['product-ad', 'product-ads'],
}

const ConfirmWindow = ({
                           visible,
                           count,
                           onSubmit,
                           onCancel,
                           location,
                           submitProcessing
                       }) => {

    const submitHandler = (e) => {
        onSubmit(e)
    }

    return (<ModalWindow
            footer={false}
            className={'confirm-window'}
            destroyOnClose={true}
            visible={visible}
        >
            <h1>Permanently archive {count} {count === 1 ? countLabel[location][0] : countLabel[location][1]}?</h1>

            {location === 'negative-targetings' ? <p>Once an entity is archived, it can't be re-enabled. </p>
                :
                <p>
                    Once an entity is archived, it can't be re-enabled. Instead of archiving, you can pause entities to
                    stop accumulating new charges. Paused entities can be re-enabled at any time.
                </p>}

            <form className="actions" onSubmit={submitHandler}>
                <button className={'btn white'} disabled={submitProcessing}>
                    Confirm
                    {submitProcessing && <Spin size={'small'}/>}
                </button>

                <button type={'button'} className={'btn default'} onClick={onCancel} disabled={submitProcessing}>
                    Cancel
                </button>
            </form>
        </ModalWindow>

    )
}

export default ConfirmWindow