import React, {useEffect, useState} from "react"
import ModalWindow from "../../../../components/ModalWindow/ModalWindow"
import WindowHeader from "../../../Analytics/Campaigns/CreateCampaignWindow/WindowHeader"
import {Spin} from "antd"

export const NewSegmentWindow = ({visible, processing, onClose, onSave}) => {
    const [segmentData, setSegmentData] = useState({
        name: '',
        segment_id: ''
    })

    useEffect(() => {
        setSegmentData({
            name: '',
            segment_id: ''
        })
    }, [visible])

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
                        value={segmentData.name}
                        onChange={({target: {value}}) => setSegmentData(prevState => ({...prevState, name: value}))}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="">Segment id</label>
                    <input
                        type="text"
                        value={segmentData.segment_id}
                        onChange={({target: {value}}) => setSegmentData(prevState => ({
                            ...prevState,
                            segment_id: value
                        }))}
                    />
                </div>
            </div>

            <div className="window-footer">
                <button className="btn default" disabled={processing} onClick={() => onSave(segmentData)}>
                    Save

                    {processing && <Spin size={'small'}/>}
                </button>
            </div>
        </ModalWindow>
    )
}