import React, {useEffect, useState} from "react"
import './CampaignSettings.less'
import {Input, Radio, Select, Spin, Switch} from "antd"
import DatePicker from "../../../components/DatePicker/DatePicker"
import InputCurrency from "../../../components/Inputs/InputCurrency"
import {useDispatch, useSelector} from "react-redux"
import {analyticsServices} from "../../../services/analytics.services"
import moment from 'moment-timezone'
import _ from 'lodash'
import CustomSelect from "../../../components/Select/Select"
import {analyticsActions} from "../../../actions/analytics.actions"
import {round} from "../../../utils/round"
import {notification} from "../../../components/Notification"
import {disabledEndDate, disabledStartDate} from "../Campaigns/CreateCampaignWindow/CreateSteps/CampaignDetails"
import {dateFormatting, dateRequestFormat} from "../../../utils/dateFormatting"
import {updateResponseHandler} from "../components/RenderPageParts/RenderPageParts"
import {Prompt} from "react-router-dom"
import RouteLoader from "../../../components/RouteLoader/RouteLoader"
import locale from 'antd/lib/locale/en_US.js.map'
import {activeTimezone} from "../../index"
import ConfirmWindow from "../components/TableList/FastUpdateBlock/ConfirmWindow"

const Option = Select.Option

const SP = 'SponsoredProducts',
    SB = 'SponsoredBrands',
    SD = 'SponsoredDisplay'

let dataFromResponse = {}

const CampaignSettings = () => {
    const mainState = useSelector(state => state.analytics.mainState)
    const portfolioList = useSelector(state => state.analytics.portfolioList)
    const user = useSelector(state => state.user.userDetails)

    const dispatch = useDispatch()

    const [settingParams, setSettingsParams] = useState({
            servingStatus: '',
            bidding_adjustments: [
                {
                    predicate: 'placementTop',
                    percentage: 0
                },
                {
                    predicate: 'placementProductPage',
                    percentage: 0
                }],
        }),
        [availablePortfolios, setAvailablePortfolios] = useState([]),
        [failedFields, setFailedFields] = useState([]),
        [editFields, setEditFields] = useState([]),
        [saveProcessing, setSaveProcessing] = useState(false),
        [fetchProcessing, setFetchProcessing] = useState(true),
        [visibleDatePopup, setVisibleDatePopup] = useState(false),
        [visibleConfirmChangeStateWindow, setVisibleConfirmChangeStateWindow] = useState(false)


    const changeSettingsHandler = (data) => {
        if (data.name) setFailedFields(prevState => [...prevState.filter(i => i !== 'name')])
        if (data.dailyBudget) setFailedFields(prevState => [...prevState.filter(i => i !== 'budget')])

        setSettingsParams({...settingParams, ...data})
        setEditFields(prevState => [...prevState, ...Object.keys(data)])
    }

    const getSettingsDetails = async () => {
        setFetchProcessing(true)

        try {
            const res = await analyticsServices.fetchSettingsDetails('campaigns', mainState.campaignId)

            const response = {
                ...res.response,
                portfolioId: res.response.portfolioId === '0' || res.response.portfolioId === null ? 'null' : res.response.portfolioId,
                endDate: res.response.endDate ? res.response.endDate : 'null',
                id: mainState.campaignId,
                bidding_adjustments: [
                    _.find(res.response.bidding_adjustments, {predicate: 'placementTop'}) ? _.find(res.response.bidding_adjustments, {predicate: 'placementTop'}) : {
                        predicate: 'placementTop',
                        percentage: 0
                    },
                    _.find(res.response.bidding_adjustments, {predicate: 'placementProductPage'}) ? _.find(res.response.bidding_adjustments, {predicate: 'placementProductPage'}) : {
                        predicate: 'placementProductPage',
                        percentage: 0
                    },
                ]
            }

            dataFromResponse = {...response}
            setFetchProcessing(false)

            setSettingsParams({...response})
        } catch (e) {
            console.log(e)
        }
    }

    const campaignNameValidation = () => {
        setFailedFields([...failedFields.filter(i => i !== 'name')])
        if (!settingParams.name || settingParams.name.trim().length > 128) {
            notification.error({title: 'Campaign name field is required!'})
            setFailedFields([...failedFields, 'name'])
        }
    }

    const refreshData = () => setSettingsParams({...dataFromResponse})

    const campaignBudgetValidation = (value) => {
        setFailedFields([...failedFields.filter(i => i !== 'budget')])

        if (!value || value < 1 || value > 1000000) {
            notification.error({title: !value || value < 1 ? 'Campaign budget should be at least $1.00' : 'Campaign budget should not be more than $1,000,000.00'})
            setFailedFields([...failedFields, 'budget'])
        }
    }

    const submitHandler = async () => {
        setSaveProcessing(true)

        if (failedFields.length === 0) {
            try {
                let requestDate = {
                    advertisingType: settingParams.advertisingType,
                    campaignId: settingParams.id,
                }

                if (editFields.includes('bidding_adjustments') || editFields.includes('bidding_strategy')) {
                    requestDate.bidding_adjustments = settingParams.bidding_adjustments
                    requestDate.bidding_strategy = settingParams.bidding_strategy
                }

                editFields.forEach(key => requestDate[key] = settingParams[key])

                const res = await analyticsServices.exactUpdateField('campaigns', requestDate)

                if (res.result.failed === 0) {
                    dataFromResponse = {...dataFromResponse, ...settingParams}
                    setEditFields([])
                }

                updateResponseHandler(res)
            } catch (e) {
                console.log(e)
            }
        }

        setSaveProcessing(false)
    }

    useEffect(() => {
        dispatch(analyticsActions.setPortfolioList())
    }, [])


    useEffect(() => {
        if (mainState.campaignId) {
            getSettingsDetails()
        }
    }, [mainState])

    useEffect(() => {
        setAvailablePortfolios([...portfolioList])
    }, [portfolioList])


    return (
        <div className={'campaign-settings-workplace'}>
            <div className={'settings-form'}>
                <div className="row">
                    <div className="label">
                        Campaign Name
                    </div>

                    <div className="value name">
                        <div className={`form-group ${failedFields.includes('name') ? 'error-field' : ''}`}>
                            <Input
                                placeholder={'Campaign Name'}
                                disabled={settingParams.state === 'archived'}
                                value={settingParams.name}
                                onChange={({target: {value}}) => changeSettingsHandler({name: value})}
                                onBlur={({target: {value}}) => {
                                    campaignNameValidation()
                                    changeSettingsHandler({name: value.trim()})
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="label">
                        Campaign ID
                    </div>

                    <div className="value">
                        {settingParams.id || '-'}
                    </div>
                </div>

                {settingParams.advertisingType !== SD && <div className="row">
                    <div className="label">
                        Portfolio
                    </div>

                    <div className="value portfolio">
                        <div className="form-group">
                            <CustomSelect
                                showSearch
                                disabled={settingParams.state === 'archived'}
                                placeholder={'Select by'}
                                getPopupContainer={trigger => trigger.parentNode}
                                value={settingParams.portfolioId}
                                onChange={(value) => changeSettingsHandler({portfolioId: value})}
                                optionFilterProp="children"
                                filterOption={(input, option) => {
                                    return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 || option.props.children === 'No Portfolio'
                                }}
                            >
                                <Option
                                    value={'null'}
                                >
                                    No Portfolio
                                </Option>

                                {availablePortfolios.map(portfolio => <Option
                                    value={portfolio.portfolioId}
                                >
                                    {portfolio.name}
                                </Option>)}
                            </CustomSelect>

                        </div>

                    </div>
                </div>}

                <div className="row advertising-type">
                    <div className="label">
                        Advertising Type
                    </div>

                    <div className="value">
                        {_.lowerCase(settingParams.advertisingType)}
                    </div>
                </div>

                <div className="row advertising-type">
                    <div className="label">
                        Targeting Type
                    </div>

                    <div className="value">
                        {settingParams.calculatedTargetingType && `${settingParams.calculatedTargetingType} Targeting`}
                    </div>
                </div>

                <div className="row advertising-type">
                    <div className="label">
                        Sub Type
                    </div>

                    <div className="value">
                        {settingParams.calculatedCampaignSubType && settingParams.calculatedCampaignSubType.replace(/([a-z])([A-Z])/g, '$1 $2')}
                    </div>
                </div>

                <div className="row">
                    <div className="label">
                        Status
                    </div>

                    <div className="value state">
                        {dataFromResponse.state === 'archived' ? <span className={'archived'}>Archived</span> : <>
                            <div className='switch-block'>
                                <Switch
                                    checked={settingParams.state === 'enabled'}
                                    disabled={settingParams.state === 'archived'}
                                    onChange={checked => changeSettingsHandler({'state': checked ? 'enabled' : 'paused'})}
                                />
                            </div>
                            <div className="col">
                                {settingParams.state === 'paused' && <span className={'paused'}>Paused</span>}
                                {settingParams.state === 'enabled' && <span className={'active'}>Enabled</span>}
                                {settingParams.state === 'archived' && <span>Archived</span>}

                                <div className="archived-link"
                                     onClick={() => {
                                         if (settingParams.state === 'archived') changeSettingsHandler({'state': dataFromResponse.state})
                                         else setVisibleConfirmChangeStateWindow(true)
                                     }}>

                                    {settingParams.state === 'archived' ? 'Cancel archiving' : 'Archive'}
                                </div>
                            </div>

                        </>}
                    </div>
                </div>

                <div className="row">
                    <div className="label">
                        Serving Status
                    </div>

                    <div className="value status">
                        {_.lowerCase(settingParams.servingStatus)}
                    </div>
                </div>

                <div className="row">
                    <div className="label">
                        Schedule
                    </div>

                    <div className="value date">
                        <DatePicker
                            disabled={settingParams.state === 'archived' || moment(settingParams.startDate).endOf('day') <= moment().tz(activeTimezone).endOf('day')}
                            showToday={false}
                            allowClear={false}
                            value={settingParams.startDate && moment(settingParams.startDate).tz(activeTimezone)}
                            onChange={(date) => changeSettingsHandler({startDate: dateFormatting(date)})}
                            format={'MMM DD, YYYY'}
                            locale={locale}
                            dropdownClassName={`dropdown-with-timezone`}
                            disabledDate={date => disabledStartDate(date, settingParams.endDate)}
                            renderExtraFooter={() => <>
                                <p className={'time-zone'}>{activeTimezone}</p>
                            </>}
                        />

                        <DatePicker
                            value={settingParams.endDate && settingParams.endDate !== 'null' ? moment(settingParams.endDate).tz(activeTimezone) : undefined}
                            placeholder={'No end date'}
                            disabled={settingParams.state === 'archived'}
                            showToday={false}
                            allowClear={false}
                            onChange={(date) => changeSettingsHandler({endDate: dateFormatting(date)})}
                            format={'MMM DD, YYYY'}
                            locale={locale}
                            open={visibleDatePopup}
                            onOpenChange={(value) => setVisibleDatePopup(value)}
                            dropdownClassName={`dropdown-with-timezone with-clear`}
                            className={settingParams.endDate === 'null' && 'no-date'}
                            defaultPickerValue={(settingParams.endDate === 'null' || !settingParams.endDate) && moment.max([moment(settingParams.startDate), moment()]).add(1, 'month').startOf('month')}
                            disabledDate={date => disabledEndDate(date, settingParams.startDate)}
                            renderExtraFooter={() => <>
                                <button className={'btn clear-date'} onClick={() => {
                                    setVisibleDatePopup(false)
                                    changeSettingsHandler({endDate: 'null'})
                                }}>
                                    No end date
                                </button>

                                <p className={'time-zone'}>{activeTimezone}</p>
                            </>}

                        />
                    </div>
                </div>

                <div className="row">
                    <div className="label">
                        Budget
                    </div>

                    <div className="value budget">
                        <div className={`form-group ${failedFields.includes('budget') ? 'error-field' : ''}`}>
                            <InputCurrency
                                disabled={settingParams.state === 'archived'}
                                value={settingParams.calculatedBudget ? round(settingParams.calculatedBudget, 2) : undefined}
                                step={0.01}
                                onChange={(value) => changeSettingsHandler({calculatedBudget: value})}
                                onBlur={({target: {value}}) => {
                                    value = value ? round(value, 2) : undefined
                                    campaignBudgetValidation(value)
                                    changeSettingsHandler({calculatedBudget: value})
                                }}
                            />
                        </div>
                        <span>{settingParams.advertisingType === SP ? 'Daily' : settingParams.budgetType}</span>
                    </div>
                </div>

                {settingParams.advertisingType === SP && <>
                    <div className="row">
                        <div className="label">
                            Campaign Bidding Strategy
                        </div>

                        <div className="value strategy">
                            <Radio.Group
                                value={settingParams.bidding_strategy}
                                disabled={settingParams.state === 'archived'}
                                onChange={({target: {value}}) => changeSettingsHandler({bidding_strategy: value})}
                            >
                                <div className="col">
                                    <Radio value={'legacyForSales'}>
                                        Dynamic bids - down only
                                    </Radio>

                                    <div className="radio-description down-only">
                                        Amazon will lower your bids in real time when your ad may be less likely to
                                        convert
                                        to a
                                        sale. Any campaigns created before January 2019 used this setting.
                                    </div>
                                </div>

                                <div className="col">
                                    <Radio value={'autoForSales'}>
                                        Dynamic bids - up and down
                                    </Radio>

                                    <div className="radio-description up-down">
                                        Amazon will raise your bids (by a maximum of 100%) in real time when your ad may
                                        be
                                        more
                                        likely to convert to a sale, and lower your bids when less likely to convert to
                                        a
                                        sale.
                                    </div>
                                </div>

                                <div className="col">
                                    <Radio value={'manual'}>
                                        Fixed bids
                                    </Radio>

                                    <div className="radio-description">
                                        Amazon will use your exact bid and any manual adjustments you set, and won’t
                                        change
                                        your
                                        bids based on likelihood of sale.
                                    </div>
                                </div>
                            </Radio.Group>

                        </div>
                    </div>

                    <div className="row">
                        <div className="label">
                            Adjust bids by placements <br/> (replaces Bid+)
                        </div>

                        <div className="value bids">
                            <div className="description">
                                In addition to your bidding strategy, you can increase bids by up to 900%.
                                {/*<a href="#">Learn more</a>*/}
                            </div>

                            <div className="form-group">
                                <label htmlFor="">
                                    Top of Search (first page)
                                </label>

                                <InputCurrency
                                    disabled={settingParams.state === 'archived'}
                                    step={1}
                                    parser={value => value && Math.abs(Math.trunc(value))}
                                    value={settingParams.bidding_adjustments[0].percentage}
                                    onChange={value => changeSettingsHandler({
                                        bidding_adjustments: [{
                                            predicate: 'placementTop',
                                            percentage: value
                                        },
                                            settingParams.bidding_adjustments[1]]
                                    })}
                                    onBlur={({target: {value}}) => changeSettingsHandler({
                                        bidding_adjustments: [{
                                            predicate: 'placementTop',
                                            percentage: value ? value : 0
                                        },
                                            settingParams.bidding_adjustments[1]]
                                    })}
                                    typeIcon={'percent'}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="">
                                    Product pages (competitors pages)
                                </label>

                                <InputCurrency
                                    disabled={settingParams.state === 'archived'}
                                    step={1}
                                    parser={value => value && Math.abs(Math.trunc(value))}
                                    value={settingParams.bidding_adjustments[1].percentage}
                                    onChange={value => changeSettingsHandler({
                                        bidding_adjustments: [
                                            settingParams.bidding_adjustments[0], {
                                                predicate: 'placementProductPage',
                                                percentage: value
                                            }]
                                    })}
                                    onBlur={({target: {value}}) => changeSettingsHandler({
                                        bidding_adjustments: [
                                            settingParams.bidding_adjustments[0], {
                                                predicate: 'placementProductPage',
                                                percentage: value ? value : 0
                                            }]
                                    })}
                                    typeIcon={'percent'}
                                />
                            </div>
                        </div>
                    </div>
                </>}

                {fetchProcessing && <RouteLoader/>}
            </div>

            {(dataFromResponse.state !== 'archived') && <div
                className={`actions ${(JSON.stringify(dataFromResponse) !== JSON.stringify(settingParams) && failedFields.length === 0 && settingParams.portfolioId) ? 'visible' : ''}`}>
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
            </div>}

            <ConfirmWindow
                visible={visibleConfirmChangeStateWindow}
                count={1}
                location={'campaigns'}

                onCancel={() => setVisibleConfirmChangeStateWindow(false)}
                onSubmit={(e) => {
                    e.preventDefault()
                    setVisibleConfirmChangeStateWindow(false)
                    changeSettingsHandler({'state': 'archived'})
                }}
            />


            <Prompt
                when={JSON.stringify(dataFromResponse) !== JSON.stringify(settingParams)}
                message={'campaign-settings'}
            />
        </div>
    )
}

export default CampaignSettings
