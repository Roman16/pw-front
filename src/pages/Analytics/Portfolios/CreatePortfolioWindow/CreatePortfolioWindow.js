import React, {useState} from "react"
import ModalWindow from "../../../../components/ModalWindow/ModalWindow"
import WindowHeader from "../../Campaigns/CreateCampaignWindow/WindowHeader"
import {analyticsActions} from "../../../../actions/analytics.actions"
import {useDispatch, useSelector} from "react-redux"
import {Input, Radio, Select, Spin} from "antd"
import CustomSelect from "../../../../components/Select/Select"
import './CreatePortfolioWindow.less'
import InputCurrency from "../../../../components/Inputs/InputCurrency"
import DatePicker from "../../../../components/DatePicker/DatePicker"
import {analyticsServices} from "../../../../services/analytics.services"
import {notification} from "../../../../components/Notification"

const Option = Select.Option

const defaultState = {
    portfolioName: '',
    state: 'enabled',
    budgetCap: 'no-budget',
    budget_amount: 0,
    create_ends_date: 'never'
}

const CreatePortfolioWindow = ({onReloadList}) => {
    const [createPortfolioData, setCreatePortfolioData] = useState({...defaultState}),
        [createProcessing, setCreateProcessing] = useState(false),
        [errorFields, setErrorFields] = useState([])

    const dispatch = useDispatch()

    const visibleWindow = useSelector(state => state.analytics.visibleCreationWindows.portfolio)

    const closeWindowHandler = () => {
        dispatch(analyticsActions.setVisibleCreateWindow({portfolio: false}))
    }

    const changeCreateDataHandler = (value) => {
        setErrorFields(errorFields.filter(i => i !== Object.keys(value)[0]))

        setCreatePortfolioData(prevState => ({...prevState, ...value}))
    }

    const onCreate = async () => {
        setCreateProcessing(true)

        try {
            let requestData

            if (createPortfolioData.budgetCap === 'no-budget') {
                requestData = {
                    portfolioName: createPortfolioData.portfolioName,
                    state: createPortfolioData.state,
                    budget: 'null',
                }
            } else if (createPortfolioData.budgetCap === 'recurring-monthly') {
                if (createPortfolioData.budget_amount < 1) {
                    setErrorFields(['budget_amount'])
                    setCreateProcessing(false)
                    return
                }

                requestData = {
                    budget_policy: 'MonthlyRecurring',
                    portfolioName: createPortfolioData.portfolioName,
                    state: createPortfolioData.state,
                    budget_amount: createPortfolioData.budget_amount,
                    budget_startDate: null,
                    budget_endDate: createPortfolioData.create_ends_date === 'never' ? null : createPortfolioData.budget_endDate,
                }
            } else if (createPortfolioData.budgetCap === 'date-range') {
                if (createPortfolioData.budget_amount < 1) {
                    setErrorFields(['budget_amount'])
                    setCreateProcessing(false)
                    return
                }

                requestData = {
                    budget_policy: 'dateRange',
                    portfolioName: createPortfolioData.portfolioName,
                    state: createPortfolioData.state,
                    budget_amount: createPortfolioData.budget_amount,
                    budget_startDate: createPortfolioData.budget_startDate,
                    budget_endDate: createPortfolioData.budget_endDate,
                }
            }
            await analyticsServices.exactCreate('portfolios', requestData)
            closeWindowHandler()
            onReloadList()
            setCreatePortfolioData({...defaultState})
            notification.success({title: 'Portfolio created'})
        } catch (e) {
            console.log(e)
        }

        setCreateProcessing(false)
    }

    return (<ModalWindow
            className={'create-campaign-window create-portfolio-window'}
            visible={visibleWindow}
            footer={false}
            handleCancel={closeWindowHandler}
        >
            <WindowHeader
                title={'Create Portfolio'}
                onClose={closeWindowHandler}
            />

            <div className="create-steps">
                <div className="row">
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="">Portfolio Name</label>
                            <Input
                                placeholder={'Portfolio Name'}
                                value={createPortfolioData.portfolioName}
                                onChange={({target: {value}}) => changeCreateDataHandler({portfolioName: value})}
                            />
                        </div>
                    </div>

                    <div className="col description"/>
                </div>

                <div className="row">
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="">Budget Cap</label>
                            <CustomSelect
                                getPopupContainer={trigger => trigger.parentNode}
                                value={createPortfolioData.budgetCap}
                                onChange={(value) => changeCreateDataHandler({budgetCap: value})}
                            >
                                <Option value={'no-budget'}>
                                    No budget Cap
                                </Option>
                                <Option value={'recurring-monthly'}>
                                    Recurring monthly
                                </Option>
                                <Option value={'date-range'}>
                                    Date range
                                </Option>
                            </CustomSelect>
                        </div>
                    </div>

                    <div className="col description">
                        Set a budget cap for a date range or to recur monthly. <br/>
                        Your campaigns will stop delivering when your spend reaches <br/>
                        the budget cap amount or the budget end date is reached.
                    </div>
                </div>

                {createPortfolioData.budgetCap === 'recurring-monthly' && <>
                    <div className="row">
                        <div className="col">
                            <div className={`form-group ${errorFields.includes('budget_amount') ? 'error-field' : ''}`}>
                                <label htmlFor="">Monthly Budget Cap</label>
                                <InputCurrency
                                    step={0.01}
                                    value={createPortfolioData.budget_amount}
                                    onChange={(value) => changeCreateDataHandler({budget_amount: value})}
                                />

                                <p className="error-message">
                                    Monthly Budget Cap should be at least $1.00
                                </p>
                            </div>
                        </div>

                        <div className="col description">
                            The maximum spend for all campaigns in the portfolio for the current month. <br/>
                            When the budget cap is reached, all campaigns in the portfolio will stop delivering.
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <Radio.Group
                                value={createPortfolioData.create_ends_date}
                                onChange={({target: {value}}) => changeCreateDataHandler({create_ends_date: value})}
                            >
                                <h4>Ends</h4>

                                <Radio value={'never'}>
                                    Never
                                </Radio>

                                <div className="radio-row">
                                    <Radio value={'on'}>
                                        On
                                    </Radio>

                                    <DatePicker
                                        getCalendarContainer={(trigger) => trigger.parentNode.parentNode.parentNode}
                                        onChange={(date) => changeCreateDataHandler({budget_endDate: date})}
                                        showToday={false}
                                        disabled={createPortfolioData.create_ends_date === 'never'}
                                    />
                                </div>
                            </Radio.Group>
                        </div>

                        <div className="col description"/>
                    </div>
                </>}

                {createPortfolioData.budgetCap === 'date-range' && <>
                    <div className="row">
                        <div className="col">
                            <div className={`form-group ${errorFields.includes('budget_amount') ? 'error-field' : ''}`}>
                                <label htmlFor="">Date Range Budget Cap</label>
                                <InputCurrency
                                    step={0.01}
                                    value={createPortfolioData.budget_amount}
                                    onChange={(value) => changeCreateDataHandler({budget_amount: value})}
                                />
                                <p className="error-message">
                                    Date Range Budget Cap should be at least $1.00
                                </p>
                            </div>
                        </div>

                        <div className="col description">
                            The maximum spend by all campaigns in your portfolio for the budget date range. <br/>
                            When the budget cap is reached, all campaigns in the portfolio will stop delivering.
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="">Budget Start</label>
                                <DatePicker
                                    getCalendarContainer={(trigger) => trigger.parentNode.parentNode.parentNode}
                                    onChange={(date) => changeCreateDataHandler({budget_startDate: date})}
                                    showToday={false}
                                />
                            </div>
                        </div>

                        <div className="col description"/>
                    </div>

                    <div className="row">
                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="">Budget End</label>
                                <DatePicker
                                    placeholder={'No end date'}
                                    getCalendarContainer={(trigger) => trigger.parentNode.parentNode.parentNode}
                                    onChange={(date) => changeCreateDataHandler({budget_endDate: date})}
                                    showToday={false}
                                />
                            </div>
                        </div>

                        <div className="col description"/>
                    </div>
                </>}
            </div>

            <div className="window-footer">
                <button
                    className="btn default"
                    onClick={onCreate}
                    disabled={createProcessing || !createPortfolioData.portfolioName}
                >
                    Create Portfolio

                    {createProcessing && <Spin size={'small'}/>}
                </button>
            </div>
        </ModalWindow>
    )
}

export default CreatePortfolioWindow
