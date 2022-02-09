import React from "react"
import {Input, Radio} from "antd"
import InputCurrency from "../../../../../components/Inputs/InputCurrency"

const AdGroupDetails = ({createData, onChange}) => {

    return (<div className={'step step-2 ad-group-details-step'}>
        <div className="row">
            <div className="col">
                <Radio.Group
                    value={createData.create_ad_group}
                    disabled={true}
                    // onChange={({target: {value}}) => onChange({create_ad_group: value})}
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

        <div className={`row ${!createData.create_ad_group ? 'disable' : ''}`}>
            <div className="col">
                <div className="form-group w-50">
                    <label htmlFor="">Ad Group Name</label>
                    <Input
                        placeholder={'Ad Group Name'}
                        value={createData.ad_group_name}
                        onChange={({target: {value}}) => onChange({ad_group_name: value})}
                        disabled={!createData.create_ad_group}/>
                </div>

            </div>

            <div className="col description">

            </div>
        </div>

        <div className={`row ${!createData.create_ad_group ? 'disable' : ''}`}>
            <div className="col">
                <div className="form-group">
                    <label htmlFor="">Default bid</label>
                    <InputCurrency
                        step={0.01}
                        value={createData.ad_group_default_bid}
                        onChange={(value) => onChange({ad_group_default_bid: value})}
                        disabled={!createData.create_ad_group}
                    />
                </div>

            </div>

            <div className="col description">

            </div>
        </div>
    </div>)
}

export default AdGroupDetails
