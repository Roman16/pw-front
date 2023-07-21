import React, {useEffect, useState} from "react"
import ModalWindow from "../../../../components/ModalWindow/ModalWindow"
import WindowHeader from "../../../Analytics/Campaigns/CreateCampaignWindow/WindowHeader"
import {Spin} from "antd"

export const NewSegmentWindow = ({visible, segment, processing, onChange, onClose, onSave}) => {

    return (<ModalWindow
            visible={visible}
            footer={false}
            className={'new-segment-window'}
        >
            <WindowHeader
                title={'Add new segment'}

                onClose={onClose}
            />

            <div className="window-body">
                <div className="form-group">
                    <label htmlFor="">Segment name</label>
                    <input
                        type="text"
                        value={segment.name}
                        onChange={({target: {value}}) => onChange({name: value})}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="">Segment id</label>
                    <input
                        type="text"
                        value={segment.segment_id}
                        onChange={({target: {value}}) => onChange({segment_id: value})}
                    />
                </div>
            </div>

            <div className="window-footer">
                <button className="btn default" disabled={processing} onClick={onSave}>
                    Save

                    {processing && <Spin size={'small'}/>}
                </button>
            </div>
        </ModalWindow>
    )
}