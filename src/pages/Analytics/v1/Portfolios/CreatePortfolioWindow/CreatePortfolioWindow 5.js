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

const Option = Select.Option

const CreatePortfolioWindow = () => {
    const [createPortfolioData, setCreatePortfolioData] = useState({
        portfolio_name: '',
        budget_cap: 'no-budget',
        monthly_budget_cap: 0,
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

    const onCreate = () => {

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
                                value={createPortfolioData.portfolio_name}
                                onChange={({target: {value}}) => changeCreateDataHandler({portfolio_name: value})}
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
                                value={createPortfolioData.budget_cap}
                                onChange={(value) => changeCreateDataHandler({budget_cap: value})}
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

                {createPortfolioData.budget_cap === 'recurring-monthly' && <>
                    <div className="row">
                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="">Monthly Budget Cap</label>
                                <InputCurrency
                                    step={0.01}
                                    value={createPortfolioData.monthly_budget_cap}
                                    onChange={(value) => changeCreateDataHandler({monthly_budget_cap: value})}
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
                                        onChange={(date) => changeCreateDataHandler({ends_date: date})}
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

                {createPortfolioData.budget_cap === 'date-range' && <>
                    <div className="row">
                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="">Monthly Budget Cap</label>
                                <InputCurrency
                                    step={0.01}
                                    value={createPortfolioData.monthly_budget_cap}
                                    onChange={(value) => changeCreateDataHandler({monthly_budget_cap: value})}
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
                                    onChange={(date) => changeCreateDataHandler({start_date: date})}
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
                                    onChange={(date) => changeCreateDataHandler({end_date: date})}
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
