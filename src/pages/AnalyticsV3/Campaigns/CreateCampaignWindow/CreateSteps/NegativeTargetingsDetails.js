import React from "react"
import {Radio} from "antd"
import {NegativeTargetingsDetails as NegativeDetails} from "../../../NegativeTargetings/CreateNegativeTargetingsWindow/NegativeTargetingsDetails"

export const NegativeTargetingsDetails = ({createData, onChange}) => {
    return (<div className={'step step-4 targetings-details-step'}>
        <div className="row">
            <div className="col create-switch">
                <Radio.Group value={createData.createNegativeTargetings}
                             onChange={({target: {value}}) => onChange({createNegativeTargetings: value})}>
                    <h4>Negative Targetings</h4>

                    <Radio value={true}>
                        Create Negative Targetings
                    </Radio>

                    <Radio value={false}>
                        Do not create Negative Targetings
                    </Radio>
                </Radio.Group>
            </div>
        </div>

        <NegativeDetails
            createData={createData}
            onChange={onChange}
            disabled={!createData.createNegativeTargetings}
        />
    </div>)
}