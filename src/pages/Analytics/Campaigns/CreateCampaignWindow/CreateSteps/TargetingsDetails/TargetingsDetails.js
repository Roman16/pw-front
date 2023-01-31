import React from "react"
import {Radio} from "antd"
import './TargetingsDetails.less'
import {RenderTargetingsDetails} from "../../../../Targetings/CreateTargetingsWindow/CreateTargetingsWindow"

const TargetingsDetails = ({createData, onChange}) => {
    return (<div className={'step step-4 targetings-details-step'}>
        <div className="row">
            <div className="col create-switch">
                <Radio.Group value={createData.createTargetings}
                             onChange={({target: {value}}) => onChange({createTargetings: value})}>
                    <h4>Targetings</h4>

                    <Radio value={true}>
                        Create Targetings
                    </Radio>

                    <Radio value={false}>
                        Do not create Targetings
                    </Radio>
                </Radio.Group>
            </div>
        </div>

        <RenderTargetingsDetails
            createData={createData}
            targetingType={createData.targetingType}
            disabledTargetingType={createData.disabledTargetingType}
            disabled={!createData.createTargetings}
            onUpdate={onChange}
        />
    </div>)
}

export default TargetingsDetails
