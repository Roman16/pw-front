import React from "react"
import {Input, Radio, Select} from "antd"
import CustomSelect from "../../../components/Select/Select"
import InputCurrency from "../../../components/Inputs/InputCurrency"
import DatePicker from "../../../components/DatePicker/DatePicker"
import './PortfolioSettings.less'

const Option = Select.Option

const PortfolioSettings = () => {

    return (
        <div className={'portfolio-settings-workplace'}>
            <div className="row">
                <div className="label">
                    Portfolio Name
                </div>

                <div className="value name">
                    <div className="form-group">
                        <Input
                            disabled
                            placeholder={'Portfolio Name'}
                        />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="label">
                    Budget Cap
                </div>

                <div className="value budget-cap">
                    <p>
                        Set a budget for a date range or to recur monthly. Your campaigns will stop delivering when your
                        spend reaches the budget cap amount or the budget end date is reached.
                        <a href="#">Learn more</a>
                    </p>

                    <div className="form-group">
                        <CustomSelect
                            disabled
                            placeholder={'Recurring monthly'}
                        >
                            <Option value={'1'}>1</Option>
                        </CustomSelect>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="label">
                    Monthly Budget Cap
                </div>

                <div className="value monthly-budget-cap">
                    <div className="form-group">
                        <InputCurrency/>
                    </div>

                    <span>Restarts on the 1st of each month.</span>
                </div>
            </div>


            <div className="row">
                <div className="label">
                    Ends
                </div>

                <div className="value ends">
                    <Radio.Group
                        disabled
                        // value={campaigns.bidding_strategy}
                        // onChange={({target: {value}}) => changeBrandHandler({bidding_strategy: value})}
                    >
                        <Radio value={'legacyForSales'}>
                           Never
                        </Radio>

                        <Radio value={'autoForSales'}>
                           On

                            <DatePicker
                                showToday={false}
                                disabled
                            />
                        </Radio>
                    </Radio.Group>

                </div>
            </div>

        </div>
    )
}

export default PortfolioSettings