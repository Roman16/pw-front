import React from "react"
import './Actions.less'
import {Spin} from "antd"

export const Actions = ({onSave, onApprove, onDisapprove, status, saveProcessing, approveProcessing}) => {

    return (<div className="report-actions">
        <button className={'btn grey'} onClick={onSave}>
            Save
            {saveProcessing && <Spin size={'small'}/>}
        </button>

        {status === 'approved' ? <button className={'btn default'} onClick={onDisapprove}>
                Disapprove
                {approveProcessing && <Spin size={'small'}/>}
            </button>
            : <button className={'btn default'} onClick={onApprove}>
                Approve
                {approveProcessing && <Spin size={'small'}/>}
            </button>}
    </div>)
}