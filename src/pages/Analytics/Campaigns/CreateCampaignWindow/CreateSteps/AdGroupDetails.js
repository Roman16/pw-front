import React from "react"
import {Input, Radio} from "antd"
import InputCurrency from "../../../../../components/Inputs/InputCurrency"

const AdGroupDetails = () => {

    return (<div className={'step step-2 ad-group-details-step'}>
        <div className="row">
            <div className="col">
                <Radio.Group>
                    <h4>Ad Group</h4>

                    <Radio value={'create'}>
                        Create Ad Group
                    </Radio>

                    <Radio value={'not'}>
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

        <div className="row">
            <div className="col">
               <div className="form-group w-50">
                   <label htmlFor="">Ad Group Name</label>
                   <Input/>
               </div>

            </div>

            <div className="col description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna netus
                consequat ornare laoreet duis tellus dignissim nisl rhoncus. Adipiscing at dis a id urna. Aliquam massa
                faucibus blandit justo. Sed et orci tortor pellentesque sed
            </div>
        </div>

        <div className="row">
            <div className="col">
               <div className="form-group">
                   <label htmlFor="">Default bid</label>
                   <InputCurrency/>
               </div>

            </div>

            <div className="col description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna netus
                consequat ornare laoreet duis tellus dignissim nisl rhoncus. Adipiscing at dis a id urna. Aliquam massa
                faucibus blandit justo. Sed et orci tortor pellentesque sed
            </div>
        </div>
    </div>)
}

export default AdGroupDetails
