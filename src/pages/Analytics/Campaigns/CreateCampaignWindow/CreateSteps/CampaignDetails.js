import React, {useEffect, useState} from "react"
import {Input, Radio, Select} from "antd"
import InputCurrency from "../../../../../components/Inputs/InputCurrency"
import CustomSelect from "../../../../../components/Select/Select"
import DatePicker from "../../../../../components/DatePicker/DatePicker"
import _ from 'lodash'
import moment from 'moment'
import {round} from "../../../../../utils/round"

const Option = Select.Option

const CampaignDetails = ({createData, onChange, confirmValidation}) => {
    const [failedFields, setFailedFields] = useState([])

    const campaignBudgetValidation = () => {
        setFailedFields([...failedFields.filter(i => i !== 'calculatedBudget')])

        if (!createData.calculatedBudget || createData.calculatedBudget < 1 || createData.calculatedBudget > 1000000) {
            setFailedFields([...failedFields, 'calculatedBudget'])
        }

        stepValidation()
    }

    const campaignNameValidation = () => {
        setFailedFields([...failedFields.filter(i => i !== 'name')])
        if (!createData.name || createData.name.trim().length > 128) {
            setFailedFields([...failedFields, 'name'])
        }

        stepValidation()
    }

    useEffect(() => {
        if (failedFields.length !== 0) {
            campaignNameValidation()
            campaignBudgetValidation()
        }
    }, [createData])

    const stepValidation = () => {
        if (createData.name && createData.calculatedBudget && failedFields.length === 0) {
            confirmValidation(true)
        } else {
            confirmValidation(false)
        }
    }

    function disabledStartDate(current) {
        if (current) {
            if (createData.endDate) {
                return current <= moment().add(-1, 'days').endOf('day') || current >= moment(createData.endDate).endOf('day')
            } else {
                return current <= moment().add(-1, 'days').endOf('day')
            }
        }
    }

    function disabledEndDate(current) {
        return current && current <= moment(createData.startDate).add(-1, 'days').endOf('day')
    }

    return (<div className={'step step-1 campaign-details-step'}>
        <div className="row">
            <div className="col">
                <div className="form-row">
                    <div className={`form-group ${failedFields.includes('name') ? 'error-field' : ''}`}>
                        <label htmlFor="">Campaign Name</label>
                        <Input
                            placeholder={'Campaign Name'}
                            value={createData.name}
                            onChange={({target: {value}}) => onChange({name: value})}
                            onBlur={({target: {value}}) => {
                                campaignNameValidation()
                                onChange({name: value.trim()})
                            }}
                        />

                        <p className={'error-message'}>
                            {!createData.name && 'Campaign name is required'}
                            {createData.name && createData.name.length > 128 && 'Campaign name should not be longer than 128 characters'}
                        </p>
                    </div>

                    <div className="form-group">
                        <label htmlFor="">Portfolio</label>
                        <CustomSelect
                            placeholder={'Select by'}
                            getPopupContainer={trigger => trigger.parentNode}
                            value={createData.portfolio_name}
                            onChange={(value) => onChange({portfolio_name: value})}
                        >
                            <Option
                                value={null}
                            >
                                No Portfolio
                            </Option>
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
                            value={createData.startDate}
                            showToday={false}
                            allowClear={false}
                            format={'MMM DD, YYYY'}
                            disabledDate={disabledStartDate}
                            dropdownClassName={'dropdown-with-timezone'}
                            renderExtraFooter={() => <>
                                <p>America/Los_Angeles</p>
                            </>}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="">End</label>
                        <DatePicker
                            placeholder={'No end date'}
                            getCalendarContainer={(trigger) => trigger.parentNode.parentNode.parentNode}
                            onChange={(date) => onChange({endDate: date})}
                            showToday={false}
                            format={'MMM DD, YYYY'}
                            disabledDate={disabledEndDate}
                            dropdownClassName={'dropdown-with-timezone'}
                            renderExtraFooter={() => <>
                                <p>America/Los_Angeles</p>
                            </>}
                        />
                    </div>
                </div>
            </div>

            <div className="col description">

            </div>
        </div>

        <div className="row">
            <div className="col">
                <div className="form-row">
                    <div
                        className={`form-group campaign-budget ${failedFields.includes('calculatedBudget') ? 'error-field' : ''}`}>
                        <label htmlFor="">Daily budget</label>
                        <InputCurrency
                            step={0.01}
                            value={createData.calculatedBudget}
                            onChange={(value) => onChange({calculatedBudget: value})}
                            onBlur={({target: {value}}) => {
                                campaignBudgetValidation()
                                onChange({calculatedBudget: value ? round(value, 2) : undefined})
                            }}
                        />
                        <p className={'error-message'}>
                            {(createData.calculatedBudget === 0 || createData.calculatedBudget < 1) ? 'Campaign budget should be at least $1.00' : !createData.calculatedBudget && 'Campaign budget is required'}
                            {createData.calculatedBudget !== 0 && createData.calculatedBudget > 1000000 && 'Campaign budget should not be more than $1,000,000.00'}
                        </p>
                    </div>
                </div>
            </div>

            <div className="col description">

            </div>
        </div>

        <div className="row">
            <div className="col">
                <Radio.Group
                    value={createData.calculatedTargetingType}
                    onChange={({target: {value}}) => onChange({calculatedTargetingType: value})}
                >
                    <h4>Targeting:</h4>

                    <Radio value={'auto'}>
                        Automatic Targeting
                    </Radio>
                    <div className="radio-description">
                        Amazon will target keywords and products that are similar to the product in your ad.
                    </div>

                    <Radio value={'manual'}>
                        Manual Targeting
                    </Radio>

                    <div className="radio-description">
                        Choose keywords or products to target shopper searches and set custom bids.
                    </div>
                </Radio.Group>
            </div>

            <div className="col description">

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
                        based on likelihood of a sale.
                    </div>
                </Radio.Group>
            </div>

            <div className="col description">

            </div>
        </div>

        <div className="row">
            <div className="col">
                <h4>Adjust bids by placement:</h4>

                <p className={'bids-description'}>
                    In addition to your bidding strategy, you can increase bids by up to 900%.
                </p>

                <div className="form-group row">
                    <label htmlFor="">Top of Search (first page)</label>
                    <InputCurrency
                        step={1}
                        max={900}
                        value={createData.bidding_adjustments[0].percentage}
                        onChange={value => onChange({
                            bidding_adjustments: [{
                                predicate: 'placementTop',
                                percentage: value ? value : 0
                            },
                                createData.bidding_adjustments[1]]
                        })}
                        typeIcon={'percent'}
                    />
                </div>

                <div className="form-group row">
                    <label htmlFor="">Product pages (competitors' pages)</label>
                    <InputCurrency
                        step={1}
                        max={900}
                        parser={value => Math.trunc(value)}
                        value={createData.bidding_adjustments[1].percentage}
                        onChange={value => onChange({
                            bidding_adjustments: [
                                createData.bidding_adjustments[0], {
                                    predicate: 'placementProductPage',
                                    percentage: value ? value : 0
                                }]
                        })}
                        typeIcon={'percent'}
                    />
                </div>
            </div>

            <div className="col description">

            </div>
        </div>
    </div>)
}

export default CampaignDetails
