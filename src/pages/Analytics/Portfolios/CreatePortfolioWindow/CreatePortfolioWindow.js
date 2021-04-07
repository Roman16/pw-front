import React, {useState} from "react"
import ModalWindow from "../../../../components/ModalWindow/ModalWindow"
import WindowHeader from "../../Campaigns/CreateCampaignWindow/WindowHeader"
import {analyticsActions} from "../../../../actions/analytics.actions"
import {useDispatch, useSelector} from "react-redux"
import {Input, Radio, Select} from "antd"
import CustomSelect from "../../../../components/Select/Select"
import './CreatePortfolioWindow.less'
import InputCurrency from "../../../../components/Inputs/InputCurrency"
import DatePicker from "../../../../components/DatePicker/DatePicker"
import {analyticsServices} from "../../../../services/analytics.services"
import {notification} from "../../../../components/Notification"

const Option = Select.Option

const CreatePortfolioWindow = () => {
    const [createPortfolioData, setCreatePortfolioData] = useState({
        name: '',
        state: 'enabled',
        budgetCap: 'no-budget',
        budget_amount: 0,
        create_ends_date: 'never'
    })

    const dispatch = useDispatch()

    const visibleWindow = useSelector(state => state.analytics.visibleCreationWindows.portfolio)

    const closeWindowHandler = () => {
        dispatch(analyticsActions.setVisibleCreateWindow({portfolio: false}))
    }

    const changeCreateDataHandler = (value) => {
        setCreatePortfolioData(prevState => ({...prevState, ...value}))
    }

    const onCreate = async () => {
        try {
            let requestData

            if (createPortfolioData.budgetCap === 'no-budget') {
                requestData = {
                    name: createPortfolioData.name,
                    state: createPortfolioData.state,
                    budget_amount: null,
                }
            } else if (createPortfolioData.budgetCap === 'recurring-monthly') {
                requestData = {
                    name: createPortfolioData.name,
                    state: createPortfolioData.state,
                    budget_amount: createPortfolioData.budget_amount,
                    budget_startDate: null,
                    budget_endDate: createPortfolioData.create_ends_date === 'never' ? null : createPortfolioData.budget_endDate,
                }
            } else if (createPortfolioData.budgetCap === 'date-range') {
                requestData = {
                    name: createPortfolioData.name,
                    state: createPortfolioData.state,
                    budget_amount: createPortfolioData.budget_amount,
                    budget_startDate: createPortfolioData.budget_startDate,
                    budget_endDate: createPortfolioData.budget_endDate,
                }
            }
            await analyticsServices.exactCreate('portfolios', requestData)
            closeWindowHandler()
            notification.success({title: 'Portfolio created'})
        } catch (e) {
            console.log(e)
        }
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
                                value={createPortfolioData.name}
                                onChange={({target: {value}}) => changeCreateDataHandler({name: value})}
                            />
                        </div>
                    </div>

                    <div className="col description">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna netus consequat ornare laoreet
                        duis
                        tellus dignissim nisl rhoncus. Adipiscing at dis a id urna. Aliquam massa faucibus blandit
                        justo.
                        Sed et orci tortor pellentesque sed
                    </div>
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
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna netus consequat ornare laoreet
                        duis
                        tellus dignissim nisl rhoncus. Adipiscing at dis a id urna. Aliquam massa faucibus blandit
                        justo.
                        Sed et orci tortor pellentesque sed
                    </div>
                </div>

                {createPortfolioData.budgetCap === 'recurring-monthly' && <>
                    <div className="row">
                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="">Monthly Budget Cap</label>
                                <InputCurrency
                                    step={0.01}
                                    value={createPortfolioData.budget_amount}
                                    onChange={(value) => changeCreateDataHandler({budget_amount: value})}
                                />
                            </div>
                        </div>

                        <div className="col description">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna netus consequat ornare laoreet
                            duis
                            tellus dignissim nisl rhoncus. Adipiscing at dis a id urna. Aliquam massa faucibus blandit
                            justo.
                            Sed et orci tortor pellentesque sed
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

                                <Radio value={'on'}>
                                    On

                                    <DatePicker
                                        getCalendarContainer={(trigger) => trigger.parentNode.parentNode.parentNode}
                                        onChange={(date) => changeCreateDataHandler({budget_endDate: date})}
                                        showToday={false}
                                        disabled={createPortfolioData.create_ends_date === 'never'}
                                    />
                                </Radio>
                            </Radio.Group>
                        </div>

                        <div className="col description">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna netus consequat ornare laoreet
                            duis
                            tellus dignissim nisl rhoncus. Adipiscing at dis a id urna. Aliquam massa faucibus blandit
                            justo.
                            Sed et orci tortor pellentesque sed
                        </div>
                    </div>
                </>}

                {createPortfolioData.budgetCap === 'date-range' && <>
                    <div className="row">
                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="">Monthly Budget Cap</label>
                                <InputCurrency
                                    step={0.01}
                                    value={createPortfolioData.budget_amount}
                                    onChange={(value) => changeCreateDataHandler({budget_amount: value})}
                                />
                            </div>
                        </div>

                        <div className="col description">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna netus consequat ornare laoreet
                            duis
                            tellus dignissim nisl rhoncus. Adipiscing at dis a id urna. Aliquam massa faucibus blandit
                            justo.
                            Sed et orci tortor pellentesque sed
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

                        <div className="col description">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna netus consequat ornare laoreet
                            duis
                            tellus dignissim nisl rhoncus. Adipiscing at dis a id urna. Aliquam massa faucibus blandit
                            justo.
                            Sed et orci tortor pellentesque sed
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="">Budget End</label>
                                <DatePicker
                                    getCalendarContainer={(trigger) => trigger.parentNode.parentNode.parentNode}
                                    onChange={(date) => changeCreateDataHandler({budget_endDate: date})}
                                    showToday={false}
                                />
                            </div>
                        </div>

                        <div className="col description">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna netus consequat ornare laoreet
                            duis
                            tellus dignissim nisl rhoncus. Adipiscing at dis a id urna. Aliquam massa faucibus blandit
                            justo.
                            Sed et orci tortor pellentesque sed
                        </div>
                    </div>
                </>}
            </div>

            <div className="window-footer">
                <button
                    className="btn default"
                    onClick={onCreate}
                >
                    Create Portfolio
                </button>
            </div>
        </ModalWindow>
    )
}

export default CreatePortfolioWindow
