import React from "react"
import ModalWindow from "../../../../components/ModalWindow/ModalWindow"
import WindowHeader from "../../../Analytics/Campaigns/CreateCampaignWindow/WindowHeader"
import {Spin} from "antd"

export const ConfirmDeleteWindow = ({
                                        visible,
                                        segment,
                                        onClose,
                                        onConfirm,
                                        processing
                                    }) => {

    return (<ModalWindow
            visible={visible}
            footer={false}
            className={'new-segment-window'}
        >
            <WindowHeader
                title={'Delete segment'}

                onClose={onClose}
            />

            <div className="window-body">
                <h3>Are you sure to delete this segment?</h3>
            </div>

            <div className="window-footer">
                <button className="btn default" disabled={processing} onClick={onConfirm}>
                    Confirm

                    {processing && <Spin size={'small'}/>}
                </button>
            </div>
        </ModalWindow>
    )

}