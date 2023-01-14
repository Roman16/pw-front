import React, {useEffect, useState} from "react"
import {Input, Radio, Select, Spin, Switch} from "antd"
import CustomSelect from "../../../components/Select/Select"
import InputCurrency from "../../../components/Inputs/InputCurrency"
import DatePicker from "../../../components/DatePicker/DatePicker"
import './PortfolioSettings.less'
import {analyticsServices} from "../../../services/analytics.services"
import {useSelector} from "react-redux"
import moment from "moment"
import {notification} from "../../../components/Notification"
import RouteLoader from "../../../components/RouteLoader/RouteLoader"
import {dateFormatting} from "../../../utils/dateFormatting"

const Option = Select.Option
let dataFromResponse = {
    budget_policy: '',
}


const PortfolioSettings = () => {
    const mainState = useSelector(state => state.analytics.mainState),
        currencyCode = useSelector(state => state.user.activeAmazonMarketplace.currency_code || 'USD')

    const [settingParams, setSettingsParams] = useState({
            budget_policy: '',
            status: false
        }),
        [saveProcessing, setSaveProcessing] = useState(false),
        [fetchProcessing, setFetchProcessing] = useState(true)


    const getSettingsDetails = async () => {
        setFetchProcessing(true)
        try {
            const {response} = await analyticsServices.fetchSettingsDetails('portfolios', mainState.portfolioId)
            dataFromResponse = {
                ...response,
                bidding_strategy: response.budget_endDate ? 'autoForSales' : 'legacyForSales'
            }
            setSettingsParams({
                ...response,
                bidding_strategy: response.budget_endDate ? 'autoForSales' : 'legacyForSales'
            })
        } catch (e) {
            console.log(e)
        }

        setFetchProcessing(false)
    }

    const changeSettingsHandler = (data) => {
        setSettingsParams({...settingParams, ...data})
    }

    const submitHandler = async () => {
        try {
            if (settingParams.name?.length > 0) {
                let requestData = {
                    portfolioId: settingParams.portfolioId,
                    portfolioName: settingParams.name
                }

                if (settingParams.budget_policy === 'MonthlyRecurring') {
                    if (!settingParams.budget_amount) {
                        notification.error({title: 'Budget field is required'})
                        return
                    }

                    if (settingParams.bidding_strategy === 'autoForSales' && !settingParams.budget_endDate) {
                        notification.error({title: 'End date field is required'})
                        return
                    }

                    requestData.budget_policy = settingParams.budget_policy
                    requestData.budget_amount = settingParams.budget_amount
                    requestData.currencyCode = currencyCode
                    requestData.budget_endDate = settingParams.bidding_strategy === 'legacyForSales' ? undefined : dateFormatting(settingParams.budget_endDate)
                } else if (settingParams.budget_policy === 'dateRange') {
                    if (!settingParams.budget_amount) {
                        notification.error({title: 'Budget field is required'})
                        return
                    } else if (!settingParams.budget_startDate) {
                        notification.error({title: 'Start date field is required'})
                        return
                    } else if (!settingParams.budget_endDate) {
                        notification.error({title: 'End date field is required'})
                        return
                    }

                    requestData.budget_policy = settingParams.budget_policy
                    requestData.budget_amount = settingParams.budget_amount
                    requestData.currencyCode = currencyCode
                    requestData.budget_startDate = dateFormatting(settingParams.budget_startDate, 'start')
                    requestData.budget_endDate = dateFormatting(settingParams.budget_endDate)
                } else {
                    requestData.budget = 'null'
                }

                setSaveProcessing(true)

                await analyticsServices.exactUpdateField('portfolios', requestData)
                notification.success({title: '1 entity updated'})

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
                                value={settingParams.budget_policy}
                                onChange={(value) => changeSettingsHandler({budget_policy: value})}
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
                                    value={settingParams.budget_amount}
                                    onChange={(e) => changeSettingsHandler({budget_amount: e})}
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
                                value={settingParams.bidding_strategy}
                                onChange={({target: {value}}) => changeSettingsHandler({bidding_strategy: value})}
                            >
                                <Radio value={'legacyForSales'}>
                                    Never
                                </Radio>

                                <Radio value={'autoForSales'}>
                                    On

                                    <DatePicker
                                        showToday={false}
                                        disabled={settingParams.bidding_strategy === 'legacyForSales'}
                                        value={settingParams.budget_endDate && moment(settingParams.budget_endDate, 'YYYYMMDD')}
                                        onChange={(value) => changeSettingsHandler({budget_endDate: value})}
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
                                    value={settingParams.budget_amount}
                                    onChange={(e) => changeSettingsHandler({budget_amount: e})}
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
                                <DatePicker
                                    value={settingParams.budget_startDate && moment(settingParams.budget_startDate, 'YYYYMMDD')}
                                    showToday={false}
                                    onChange={(value) => changeSettingsHandler({budget_startDate: value})}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="label">
                            Budget End
                        </div>


                        <div className="value date">
                            <div className="form-group">
                                <DatePicker
                                    value={settingParams.budget_endDate && moment(settingParams.budget_endDate, 'YYYYMMDD')}
                                    showToday={false}
                                    onChange={(value) => changeSettingsHandler({budget_endDate: value})}
                                />
                            </div>
                        </div>
                    </div>

                </>}
            </div>

            <div className="container daily-moving-budget">
                <h2>Daily moving budget</h2>

                <div className="row">
                    <div className="label">
                        Status
                    </div>

                    <div className="value status">
                        <span className={!settingParams.status && 'inactive'}>Inactive</span>
                        <Switch
                            checked={settingParams.status}
                            onChange={checked => changeSettingsHandler({status: checked})}
                        />
                        <span className={settingParams.status && 'active'}>Active</span>
                    </div>
                </div>

                <div className="row">
                    <div className="label">
                        Budget
                    </div>

                    <div className="value name">
                        <div className="form-group">
                            <InputCurrency
                                disabled={!settingParams.status}
                                // value={settingParams.budget_amount}
                                // onChange={(e) => changeSettingsHandler({budget_amount: e})}
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="label">
                        Next Budget Reset
                    </div>

                    <div className="value date">
                        24/24/2424
                    </div>
                </div>
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

            {fetchProcessing && <RouteLoader/>}
        </div>
    )
}

export default PortfolioSettings
