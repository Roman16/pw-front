import React from "react"
import {Input, Radio} from "antd"
import InputCurrency from "../../../../../components/Inputs/InputCurrency"

const AdGroupDetails = ({campaignData, onChange}) => {

    return (<div className={'step step-2 ad-group-details-step'}>
        <div className="row">
            <div className="col">
                <Radio.Group
                    value={campaignData.create_ad_group}
                    onChange={({target: {value}}) => onChange({create_ad_group: value})}
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna netus
                consequat ornare laoreet duis tellus dignissim nisl rhoncus. Adipiscing at dis a id urna. Aliquam massa
                faucibus blandit justo. Sed et orci tortor pellentesque sed
            </div>
        </div>

        <div className={`row ${!campaignData.create_ad_group ? 'disable' : ''}`}>
            <div className="col">
                <div className="form-group w-50">
                    <label htmlFor="">Ad Group Name</label>
                    <Input
                        value={campaignData.ad_group_name}
                        onChange={({target: {value}}) => onChange({ad_group_name: value})}
                        disabled={!campaignData.create_ad_group}/>
                </div>

            </div>

            <div className="col description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna netus
                consequat ornare laoreet duis tellus dignissim nisl rhoncus. Adipiscing at dis a id urna. Aliquam
                massa
                faucibus blandit justo. Sed et orci tortor pellentesque sed
            </div>
        </div>

        <div className={`row ${!campaignData.create_ad_group ? 'disable' : ''}`}>
            <div className="col">
                <div className="form-group">
                    <label htmlFor="">Default bid</label>
                    <InputCurrency
                        step={0.01}
                        value={campaignData.ad_group_default_bid}
                        onChange={(value) => onChange({ad_group_default_bid: value})}
                        disabled={!campaignData.create_ad_group}
                    />
                </div>

            </div>

            <div className="col description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna netus
                consequat ornare laoreet duis tellus dignissim nisl rhoncus. Adipiscing at dis a id urna. Aliquam
                massa
                faucibus blandit justo. Sed et orci tortor pellentesque sed
            </div>
        </div>
    </div>)
}

export default AdGroupDetails
