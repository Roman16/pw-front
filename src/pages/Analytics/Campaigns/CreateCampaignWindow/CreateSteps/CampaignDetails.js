import React from "react"
import {Input, Radio} from "antd"
import DatePicker from "../../../../../components/DatePicker/DatePicker"
import InputCurrency from "../../../../../components/Inputs/InputCurrency"

const CampaignDetails = () => {

    return (<div className={'step step-1 campaign-details-step'}>
        <div className="row">
            <div className="col">
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="">Campaign Name</label>
                        <Input/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="">Portfolio</label>
                        <Input/>
                    </div>
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
                <div className="form-row date">
                    <div className="form-group">
                        <label htmlFor="">Start</label>
                        <DatePicker/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="">End</label>
                        <DatePicker/>
                    </div>
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
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="">Daily budget</label>
                       <InputCurrency/>
                    </div>
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
                <Radio.Group>
                    <h4>Choose Targeting</h4>

                    <Radio value={'automatic_targetig'}>
                        Automatic Targeting
                    </Radio>
                    <div className="radio-description">
                        We'll use your exact bid any manual adjustments you set, and won’'t change your bids based on
                        likelihood a sale. <a href="">Learn more</a>
                    </div>

                    <Radio value={'automatic_targetig'}>
                        Manual Targeting
                    </Radio>

                    <div className="radio-description">
                        We'll use your exact bid any manual adjustments you set, and won’'t change your bids based on
                        likelihood a sale. <a href="">Learn more</a>
                    </div>
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
                <Radio.Group>
                    <h4>Campaign bidding strategy:</h4>

                    <Radio value={'down'}>
                        Dynamic bids - down only
                    </Radio>
                    <div className="radio-description">
                        Amazon will lower your bids in real time when your ad may be less likely to convert to a sale.
                        Any campaigns created before January 2019 used this setting.
                    </div>

                    <Radio value={'dynamic'}>
                        Dynamic bids - up and down
                    </Radio>

                    <div className="radio-description">
                        Amazon will raise your bids (by a maximum of 100%) in real time when your ad may be more likely
                        to convert to a sale, and lower your bids when less likely to convert to a sale.
                    </div>

                    <Radio value={'fixed'}>
                        Fixed bids
                    </Radio>

                    <div className="radio-description">
                        Amazon will use your exact bid and any manual adjustments you set, and won’t change your bids
                        based on likelihood of sale.
                    </div>
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
                <h4>Adjust bids by placement:</h4>
                
                <div className="form-group row">
                    <label htmlFor="">Top of Search (first page)</label>
                    <InputCurrency typeIcon={'percent'}/>
                </div>

                <div className="form-group row">
                    <label htmlFor="">Product pages (competitors pages)</label>
                    <InputCurrency typeIcon={'percent'}/>
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

export default CampaignDetails
