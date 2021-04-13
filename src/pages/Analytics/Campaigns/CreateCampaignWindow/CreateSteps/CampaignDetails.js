import React from "react"
import {Input, Radio, Select} from "antd"
import InputCurrency from "../../../../../components/Inputs/InputCurrency"
import CustomSelect from "../../../../../components/Select/Select"
import DatePicker from "../../../../../components/DatePicker/DatePicker"

const Option = Select.Option

const CampaignDetails = ({createData, onChange}) => {

    return (<div className={'step step-1 campaign-details-step'}>
        <div className="row">
            <div className="col">
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="">Campaign Name</label>
                        <Input
                            placeholder={'Campaign Name'}
                            value={createData.name}
                            onChange={({target: {value}}) => onChange({name: value})}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="">Portfolio</label>
                        <CustomSelect
                            placeholder={'Select by'}
                            getPopupContainer={trigger => trigger.parentNode}
                            onChange={(value) => onChange({portfolio_name: value})}
                        >
                            <Option
                                value={'Portfolio'}
                            >
                                Portfolio
                            </Option>
                        </CustomSelect>
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
                        <DatePicker
                            getCalendarContainer={(trigger) => trigger.parentNode.parentNode.parentNode}
                            onChange={(date) => onChange({startDate: date})}
                            showToday={false}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="">End</label>
                        <DatePicker
                            getCalendarContainer={(trigger) => trigger.parentNode.parentNode.parentNode}
                            onChange={(date) => onChange({endDate: date})}
                            showToday={false}
                        />
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
                        <InputCurrency
                            step={0.01}
                            value={createData.calculatedBudget}
                            onChange={(value) => onChange({calculatedBudget: value})}
                        />
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
                <Radio.Group
                    value={createData.calculatedTargetingType}
                    onChange={({target: {value}}) => onChange({calculatedTargetingType: value})}
                >
                    <h4>Choose Targeting</h4>

                    <Radio value={'auto'}>
                        Automatic Targeting
                    </Radio>
                    <div className="radio-description">
                        We'll use your exact bid any manual adjustments you set, and won’'t change your bids based on
                        likelihood a sale. <a href="">Learn more</a>
                    </div>

                    <Radio value={'manual'}>
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
                <Radio.Group
                    value={createData.bidding_strategy}
                    onChange={({target: {value}}) => onChange({bidding_strategy: value})}
                >
                    <h4>Campaign bidding strategy:</h4>

                    <Radio value={'legacyForSales'}>
                        Dynamic bids - down only
                    </Radio>
                    <div className="radio-description">
                        Amazon will lower your bids in real time when your ad may be less likely to convert to a sale.
                        Any campaigns created before January 2019 used this setting.
                    </div>

                    <Radio value={'autoForSales'}>
                        Dynamic bids - up and down
                    </Radio>

                    <div className="radio-description">
                        Amazon will raise your bids (by a maximum of 100%) in real time when your ad may be more likely
                        to convert to a sale, and lower your bids when less likely to convert to a sale.
                    </div>

                    <Radio value={'manual'}>
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
                    <InputCurrency
                        step={0.01}
                        value={createData.bidding_adjustments[0].percentage}
                        onChange={value => onChange({
                            bidding_adjustments: [{
                                predicate: 'placementTop',
                                percentage: value
                            }, createData.bidding_adjustments[1]]
                        })}
                        typeIcon={'percent'}
                    />
                </div>

                <div className="form-group row">
                    <label htmlFor="">Product pages (competitors pages)</label>
                    <InputCurrency
                        step={0.01}
                        value={createData.bidding_adjustments[1].percentage}
                        onChange={value => onChange({
                            bidding_adjustments: [createData.bidding_adjustments[0], {
                                predicate: 'placementProductPage',
                                percentage: value
                            }]
                        })}
                        typeIcon={'percent'}
                    />
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
