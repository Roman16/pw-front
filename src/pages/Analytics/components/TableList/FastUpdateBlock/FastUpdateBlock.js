import React, {useEffect, useState} from "react"
import {SVG} from "../../../../../utils/icons"
import CustomSelect from "../../../../../components/Select/Select"
import {Input, Select, Spin} from "antd"
import './FastUpdateBlock.less'
import InputCurrency from "../../../../../components/Inputs/InputCurrency"
import DatePicker from "../../../../../components/DatePicker/DatePicker"
import {useSelector} from "react-redux"
import moment from "moment"
import {dateFormatting} from "../../../../../utils/dateFormatting"
import ConfirmWindow from "./ConfirmWindow"
import {round} from "../../../../../utils/round"
import {disabledStartDate} from "../../../Campaigns/CreateCampaignWindow/CreateSteps/CampaignDetails"
import {notification} from "../../../../../components/Notification"

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
            notification.error({title: 'Campaign budget should not be more than $1,000,000.00'})
        } else {
            setSubmitProcessing(true)

            onSetChanges({
                bulkOperation: {
                    entity: selectedColumn,
                    action: actionType,
                    value: actionType === 'subPercent' || actionType === 'addPercent' ? changingValue / 100 : changingValue
                }
            })
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
        } else if (selectedColumn === 'calculatedBudget' || selectedColumn === 'calculatedBid') {
            setAvailableActions(updateActions.number)
            setChangingValue(undefined)
        } else if (selectedColumn === 'portfolioId') {
            setAvailableActions(updateActions.state)
            setChangingValue('null')
        } else if (selectedColumn === 'state') {
            setAvailableActions(updateActions.state)
            setChangingValue('enabled')
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
                    />
                </div>

                <button className={'btn green'}
                        disabled={(changingValue === undefined) || submitProcessing}
                >
                    Apply

                    {submitProcessing && <Spin size={'small'}/>}
                </button>
            </form>

            <button className={'btn icon close'} onClick={onClose}>
                <SVG id={'close-window-icon'}/>
            </button>

            <ConfirmWindow
                visible={visibleConfirmWindow}
                count={selectedAll ? totalSize : selectedRows.length}

                onCancel={() => setVisibleConfirmWindow(false)}
                onSubmit={(e) => submitHandler(e, true)}
            />
        </div>
    )
}

const ChangeValueField = ({selectedColumn, value, onChangeValue, actionType}) => {
    const portfolioList = useSelector(state => state.analytics.portfolioList)

    const [availablePortfolios, setAvailablePortfolios] = useState([]),
        [visibleDatePopup, setVisibleDatePopup] = useState(false)

    useEffect(() => {
        setAvailablePortfolios([...portfolioList])
    }, [portfolioList])


    if (selectedColumn === 'startDate' || selectedColumn === 'endDate') {
        return (<DatePicker
            format={'DD MMM YYYY'}
            showToday={false}
            disabledDate={(date) => disabledStartDate(date, undefined)}
            value={value && value !== 'null' ? moment(value) : undefined}
            allowClear={false}
            placeholder={value === 'null' ? 'No end date' : 'Select date'}
            onChange={(date) => onChangeValue(dateFormatting(date))}
            open={visibleDatePopup}
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

                <p className={'time-zone'}>America/Los_Angeles</p>
            </>}
        />)
    } else if (selectedColumn === 'calculatedBudget' || selectedColumn === 'calculatedBid') {
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
                <Option value={'enabled'}>Enabled</Option>
                <Option value={'paused'}>Paused</Option>
                <Option value={'archived'}>Archived</Option>
            </CustomSelect>
        )
    } else if (selectedColumn === 'portfolioId') {
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
