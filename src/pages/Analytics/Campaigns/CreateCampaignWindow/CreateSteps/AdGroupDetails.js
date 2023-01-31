import React from "react"
import {Input, Radio} from "antd"
import InputCurrency from "../../../../../components/Inputs/InputCurrency"

const AdGroupDetails = ({createData, onChange}) => {

    return (<div className={'step step-2 ad-group-details-step'}>
        <div className="row">
            <div className="col create-switch">
                <Radio.Group
                    value={createData.createAdGroup}
                    onChange={({target: {value}}) => onChange({createAdGroup: value})}
                >
                    <h4>Ad Group</h4>

                    <Radio value={true}>
                        Create Ad Group
                    </Radio>

                    <Radio value={false}>
                        Do not create Ad Group
                    </Radio>
                </Radio.Group>
            </div>

            <div className="col description">

            </div>
        </div>

        <div className={`row ${!createData.createAdGroup ? 'disable' : ''}`}>
            <div className="col">
                <div className="form-group w-50">
                    <label htmlFor="">Ad Group Name</label>
                    <Input
                        placeholder={'Ad Group Name'}
                        value={createData.adGroupName}
                        onChange={({target: {value}}) => onChange({adGroupName: value})}
                        disabled={!createData.createAdGroup}/>
                </div>

            </div>

            <div className="col description">

            </div>
        </div>

        <div className={`row ${!createData.createAdGroup ? 'disable' : ''}`}>
            <div className="col">
                <div className="form-group">
                    <label htmlFor="">Default bid</label>
                    <InputCurrency
                        step={0.01}
                        value={createData.adGroupBid}
                        onChange={(value) => onChange({adGroupBid: value})}
                        disabled={!createData.createAdGroup}
                    />
                </div>

            </div>

            <div className="col description">

            </div>
        </div>
    </div>)
}

export default AdGroupDetails
