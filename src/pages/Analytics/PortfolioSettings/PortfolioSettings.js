import React, {useEffect, useState} from "react"
import {Input, Radio, Select, Spin} from "antd"
import CustomSelect from "../../../components/Select/Select"
import InputCurrency from "../../../components/Inputs/InputCurrency"
import DatePicker from "../../../components/DatePicker/DatePicker"
import './PortfolioSettings.less'
import {analyticsServices} from "../../../services/analytics.services"
import {useSelector} from "react-redux"
import moment from "moment"
import {notification} from "../../../components/Notification"

const Option = Select.Option
let dataFromResponse = {
    budget_policy: ''
}


const PortfolioSettings = () => {
    const mainState = useSelector(state => state.analytics.mainState)

    const [settingParams, setSettingsParams] = useState({
            budget_policy: ''
        }),
        [saveProcessing, setSaveProcessing] = useState(false)


    const getSettingsDetails = async () => {
        try {
            const {response} = await analyticsServices.fetchSettingsDetails('portfolios', mainState.portfolioId)
            dataFromResponse = {...response}
            setSettingsParams({...response})
        } catch (e) {
            console.log(e)
        }
    }

    const changeSettingsHandler = (data) => {
        setSettingsParams({...settingParams, ...data})
    }

    const submitHandler = async () => {
        setSaveProcessing(true)
        try {
            if (settingParams.name?.length > 0) {
                const res = await analyticsServices.exactUpdateField('portfolios', {
                    portfolioId: settingParams.portfolioId,
                    portfolioName: settingParams.name
                })


                dataFromResponse = {...settingParams}
            } else {
                notification.error({title: 'Portfolio name field is required'})
            }
        } catch (e) {
            console.log(e)
        }

        setSaveProcessing(false)
    }

    const refreshData = () => setSettingsParams({...dataFromResponse})

    useEffect(() => {
        if (mainState.portfolioId) {
            getSettingsDetails()
        }
    }, [mainState])

    return (
        <div className={'portfolio-settings-workplace'}>
            <div className="container">

                <div className="row">
                    <div className="label">
                        Portfolio Name
                    </div>

                    <div className="value name">
                        <div className="form-group">
                            <Input
                                placeholder={'Portfolio Name'}
                                value={settingParams.name}
                                onChange={({target: {value}}) => changeSettingsHandler({name: value})}
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
                            Set a budget for a date range or to recur monthly. Your campaigns will stop delivering when
                            your
                            spend reaches the budget cap amount or the budget end date is reached.
                        </p>

                        <div className="form-group">
                            <CustomSelect
                                disabled
                                value={settingParams.budget_policy}
                                onChange={(value) => setSettingsParams({...settingParams, budget_policy: value})}
                                placeholder={'Recurring monthly'}
                            >
                                <Option value={'MonthlyRecurring'}>Recurring monthly</Option>
                                <Option value={'dateRange'}>Date range</Option>
                                <Option value={''}>No budget cap</Option>
                            </CustomSelect>
                        </div>
                    </div>
                </div>

                {settingParams.budget_policy === 'MonthlyRecurring' && <>
                    <div className="row">
                        <div className="label">
                            Monthly Budget Cap
                        </div>

                        <div className="value monthly-budget-cap">
                            <div className="form-group">
                                <InputCurrency
                                    disabled
                                    value={settingParams.budget_amount}
                                />
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
                                value={settingParams.budget_endDate ? 'autoForSales' : 'legacyForSales'}
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
                                        value={settingParams.budget_endDate && moment(settingParams.budget_endDate, 'YYYYMMDD')}
                                    />
                                </Radio>
                            </Radio.Group>

                        </div>
                    </div>
                </>}


                {settingParams.budget_policy === 'dateRange' && <>
                    <div className="row">
                        <div className="label">
                            Date Range Budget Cap
                        </div>

                        <div className="value monthly-budget-cap">
                            <div className="form-group">
                                <InputCurrency
                                    disabled
                                    value={settingParams.budget_amount}
                                />
                            </div>

                            <span>Restarts on the 1st of each month.</span>
                        </div>
                    </div>

                    <div className="row">
                        <div className="label">
                            Budget Start
                        </div>


                        <div className="value date">
                            <div className="form-group">
                                <DatePicker disabled
                                            value={settingParams.budget_startDate && moment(settingParams.budget_startDate, 'YYYYMMDD')}/>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="label">
                            Budget End
                        </div>


                        <div className="value date">
                            <div className="form-group">
                                <DatePicker disabled
                                            value={settingParams.budget_endDate && moment(settingParams.budget_endDate, 'YYYYMMDD')}/>

                            </div>
                        </div>
                    </div>

                </>}
            </div>

            <div
                className={`actions ${(JSON.stringify(dataFromResponse) !== JSON.stringify(settingParams) && settingParams.portfolioId) ? 'visible' : ''}`}>
                <p>{saveProcessing ? 'Saving changes' : 'You have unsaved changes'}</p>

                {!saveProcessing && <button
                    className="btn white"
                    onClick={refreshData}
                    disabled={saveProcessing}
                >
                    Cancel
                </button>}

                <button
                    className="btn default"
                    onClick={submitHandler}
                    disabled={saveProcessing}
                >
                    Save Changes

                    {saveProcessing && <Spin size={'small'}/>}
                </button>
            </div>
        </div>
    )
}

export default PortfolioSettings
