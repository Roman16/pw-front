import React, {useEffect, useState} from "react"
import {SVG} from "../../../../../utils/icons"
import CustomSelect from "../../../../../components/Select/Select"
import {Input, Select, Spin} from "antd"
import './FastUpdateBlock.less'
import InputCurrency from "../../../../../components/Inputs/InputCurrency"
import DatePicker from "../../../../../components/DatePicker/DatePicker"
import {useSelector} from "react-redux"
import moment from 'moment-timezone'
import {dateFormatting, dateRequestFormat} from "../../../../../utils/dateFormatting"
import ConfirmWindow from "./ConfirmWindow"
import {round} from "../../../../../utils/round"
import {disabledStartDate} from "../../../Campaigns/CreateCampaignWindow/CreateSteps/CampaignDetails"
import {notification} from "../../../../../components/Notification"
import locale from 'antd/lib/locale/en_US.js.map'
import {activeTimezone} from "../../../../index"

const Option = Select.Option

const updateActions = {
    'number': [
        {
            title: 'Set to',
            value: 'setExact'
        },
        {
            title: 'Increase by amount',
            value: 'addExact'
        },
        {
            title: 'Increase by percentage',
            value: 'addPercent'
        },
        {
            title: 'Decrease by amount',
            value: 'subExact'
        },
        {
            title: 'Decrease by percentage',
            value: 'subPercent'
        },

    ],
    'date': [{
        title: 'Set to',
        value: 'setExact'
    },],
    'state': [{
        title: 'Set to',
        value: 'setExact'
    }]
}


const FastUpdateBlock = ({
                             totalSize,
                             location,
                             selectedRows,
                             selectedAllOnPage,
                             columns,
                             onClose,
                             onSelectAll,
                             onSetChanges,
                             selectedAll
                         }) => {

    const
        [availableActions, setAvailableActions] = useState([]),
        [visibleConfirmWindow, setVisibleConfirmWindow] = useState(false),
        [selectedColumn, setSelectedColumn] = useState(),
        [actionType, setActionType] = useState(),
        [changingValue, setChangingValue] = useState(),
        [submitProcessing, setSubmitProcessing] = useState(false)


    const selectAllItemsHandler = () => {
        onSelectAll()
    }

    const submitHandler = (e, confirmAction = false) => {
        e.preventDefault()

        if (selectedColumn === 'state' && changingValue === 'archived' && !confirmAction) {
            setVisibleConfirmWindow(true)
        } else if (selectedColumn === 'calculatedBudget' && actionType === 'setExact' && changingValue < 1) {
            notification.error({title: 'Campaign budget should be at least $1.00'})
        } else if (selectedColumn === 'calculatedBudget' && actionType === 'setExact' && changingValue > 1000000) {
            notification.error({title: 'Campaign budget should not be more than $1,000,000'})
        } else if (selectedColumn === 'calculatedBid' && actionType === 'setExact' && changingValue < 0.02) {
            notification.error({title: 'Targeting bid should be at least $0.02'})
        } else if (selectedColumn === 'calculatedBid' && actionType === 'setExact' && changingValue > 1000) {
            notification.error({title: 'Targeting bid should not be more than $1,000'})
        } else if (selectedColumn === 'defaultBid' && actionType === 'setExact' && changingValue < 0.02) {
            notification.error({title: 'Ad Group bid should be at least $0.02'})
        } else if (selectedColumn === 'defaultBid' && actionType === 'setExact' && changingValue > 1000) {
            notification.error({title: 'Ad Group bid should not be more than $1,000'})
        } else {
            setSubmitProcessing(true)

            onSetChanges({
                bulkOperation: {
                    entity: selectedColumn === 'portfolioName' ? 'portfolioId' : selectedColumn,
                    action: actionType,
                    value: actionType === 'subPercent' || actionType === 'addPercent' ? changingValue / 100 : changingValue
                }
            }, () => setSubmitProcessing(false), () => setSubmitProcessing(false))
        }
    }

    useEffect(() => {
        if (selectedRows.length === 0) setSubmitProcessing(false)
    }, [selectedRows])

    useEffect(() => {
        setSelectedColumn(columns.filter(column => column.fastUpdating)[0].dataIndex)
    }, [columns])

    useEffect(() => {
        if (selectedColumn === 'startDate' || selectedColumn === 'endDate') {
            setAvailableActions(updateActions.date)
            setChangingValue(undefined)
        } else if (selectedColumn === 'calculatedBudget' || selectedColumn === 'calculatedBid' || selectedColumn === 'defaultBid') {
            setAvailableActions(updateActions.number)
            setChangingValue(undefined)
        } else if (selectedColumn === 'portfolioName') {
            setAvailableActions(updateActions.state)
            setChangingValue('null')
        } else if (selectedColumn === 'state') {
            setAvailableActions(updateActions.state)
            setChangingValue(location === 'negative-targetings' ? 'archived' : 'enabled')
        } else {
            setAvailableActions(updateActions.state)
            setChangingValue(undefined)
        }
    }, [selectedColumn])

    useEffect(() => {
        if (availableActions.length > 0) setActionType(availableActions[0].value)
    }, [availableActions])

    return (
        <div className="fast-update-block">
            {selectedAll || selectedRows.length == totalSize ?
                <p><b>All {totalSize}</b> selected</p>
                :
                <p><b>{selectedRows.length}</b> selected {totalSize > 1 && <>(
                    <button className={'select-all-btn'} onClick={selectAllItemsHandler}>or select
                        all {totalSize}</button>
                    )</>}
                </p>
            }

            <form action="" onSubmit={submitHandler}>
                <label htmlFor="">Change:</label>

                <div className="form-group">
                    <CustomSelect
                        required
                        getPopupContainer={trigger => trigger.parentNode}
                        onChange={value => setSelectedColumn(value)}
                        value={selectedColumn}
                    >
                        {columns
                            .filter(column => column.fastUpdating)
                            .map(column => (<Option value={column.dataIndex}>{column.title}</Option>))
                        }
                    </CustomSelect>
                </div>

                <div className="form-group">
                    <CustomSelect
                        required
                        getPopupContainer={trigger => trigger.parentNode}
                        onChange={value => setActionType(value)}
                        value={actionType}
                    >
                        {availableActions.map(item => <Option value={item.value}>{item.title}</Option>)}
                    </CustomSelect>
                </div>

                <div className="form-group">
                    <ChangeValueField
                        selectedColumn={selectedColumn}
                        value={changingValue}
                        actionType={actionType}
                        onChangeValue={setChangingValue}
                        location={location}
                    />
                </div>

                <button className={'btn default'}
                        disabled={(changingValue === undefined) || submitProcessing}
                >
                    Apply

                    {submitProcessing && <Spin size={'small'}/>}
                </button>
            </form>

            <button className={`btn icon close ${submitProcessing ? 'disabled' : ''}`} onClick={onClose}>
                <SVG id={'close-window-icon'}/>
            </button>

            <ConfirmWindow
                visible={visibleConfirmWindow}
                count={selectedAll ? totalSize : selectedRows.length}
                location={location}

                onCancel={() => setVisibleConfirmWindow(false)}
                onSubmit={(e) => submitHandler(e, true)}
            />
        </div>
    )
}

const ChangeValueField = ({selectedColumn, value, onChangeValue, actionType, location}) => {
    const portfolioList = useSelector(state => state.analytics.portfolioList)


    const statusOptions = location === 'negative-targetings' ? ['archived'] : ['enabled', 'paused', 'archived']


    const [availablePortfolios, setAvailablePortfolios] = useState([]),
        [visibleDatePopup, setVisibleDatePopup] = useState(false)

    useEffect(() => {
        setAvailablePortfolios([...portfolioList])
    }, [portfolioList])


    if (selectedColumn === 'startDate' || selectedColumn === 'endDate') {
        return (<DatePicker
            format={'DD MMM YYYY'}
            showToday={false}
            allowClear={false}
            disabledDate={(date) => disabledStartDate(date, undefined)}
            value={value && value !== 'null' ? moment(value).tz(activeTimezone) : undefined}
            placeholder={value === 'null' ? 'No end date' : 'Select date'}
            onChange={(date) => onChangeValue(dateFormatting(date))}
            open={visibleDatePopup}
            locale={locale}
            onOpenChange={(value) => setVisibleDatePopup(value)}
            dropdownClassName={`dropdown-with-timezone ${selectedColumn === 'endDate' ? 'with-clear' : ''}`}
            className={value === 'null' && 'no-date'}
            renderExtraFooter={() => <>
                {selectedColumn === 'endDate' &&
                <button className={'btn clear-date'} onClick={() => {
                    setVisibleDatePopup(false)
                    onChangeValue('null')
                }}>
                    No end date
                </button>}

                <p className={'time-zone'}>{activeTimezone}</p>
            </>}
        />)
    } else if (selectedColumn === 'calculatedBudget' || selectedColumn === 'calculatedBid' || selectedColumn === 'defaultBid') {
        return (<InputCurrency
            typeIcon={actionType === 'addPercent' || actionType === 'subPercent' ? 'percent' : ''}
            step={0.01}
            parser={value => value && Math.abs(value)}
            value={value}
            onChange={value => onChangeValue(value || undefined)}
            onBlur={({target: {value}}) => onChangeValue(value ? round(value, 2) : undefined)}
        />)
    } else if (selectedColumn === 'state') {
        return (<CustomSelect
                getPopupContainer={trigger => trigger.parentNode}
                onChange={value => onChangeValue(value)}
                value={value}
            >
                {statusOptions.map(i => <Option value={i}>{i.capitalize()}</Option>)}
            </CustomSelect>
        )
    } else if (selectedColumn === 'portfolioName') {
        return (<CustomSelect
                showSearch
                placeholder={'Select by'}
                getPopupContainer={trigger => trigger.parentNode}
                onChange={(value) => onChangeValue(value)}
                optionFilterProp="children"
                value={value}
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
        )
    } else {
        return (<Input value={value} onChange={({target: {value}}) => onChangeValue(value)}/>)
    }
}

export default FastUpdateBlock
