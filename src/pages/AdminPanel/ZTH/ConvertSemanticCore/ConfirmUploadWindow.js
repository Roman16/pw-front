import React, {useEffect, useState} from "react"
import ModalWindow from "../../../../components/ModalWindow/ModalWindow"
import {Spin} from "antd"
import {marketplaceIdValues} from "../../../../constans/amazonMarketplaceIdValues"

let intervalId

const ConfirmUploadWindow = ({
                                 visible,
                                 semanticName,
                                 user = {
                                     name: '',
                                     last_name: '',
                                     email: '',
                                     ARA: {
                                         alias: '',
                                         seller_id: ''
                                     },
                                     ARAM: {
                                         marketplace_name: '',
                                         marketplace_id: ''
                                     }
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

            <p>Upload semantic:  <b>{semanticName}</b></p>


            <div className="tr">
                <div className="label">For user</div>

                <div className="value">
                    <b>{`${user.name} ${user.last_name}`}</b>
                    <b>{user.email}</b>
                </div>
            </div>

            <div className="tr">
                <div className="label">For Amazon Account</div>

                <div className="value">
                    <b>{user.ARA.alias}</b>
                    <b>{user.ARA.seller_id}</b>
                </div>
            </div>

            <div className="tr">
                <div className="label">For Marketplace</div>

                <div className="value">
                    <div className="row marketplace">
                        <div className="flag">
                            <img src={marketplaceIdValues[user.ARAM.marketplace_id].flag} alt=""/>
                        </div>

                        <div className="col">
                            <b>{user.ARAM.marketplace_name}</b>
                            <b>{user.ARAM.marketplace_id}</b>
                        </div>
                    </div>
                </div>
            </div>

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
