import React, {useEffect, useState} from "react"
import {SVG} from "../../../../../utils/icons"
import CustomSelect from "../../../../../components/Select/Select"
import {Input, Select} from "antd"
import './FastUpdateBlock.less'
import InputCurrency from "../../../../../components/Inputs/InputCurrency"
import DatePicker from "../../../../../components/DatePicker/DatePicker"

const Option = Select.Option

const updateActions = {
    'number': [
        {
            title: 'Set Exact',
            value: 'setExact'
        },
        {
            title: 'Add Exact',
            value: 'addExact'
        },
        {
            title: 'Sub Exact',
            value: 'subExact'
        },
        {
            title: 'Add Percent',
            value: 'addPercent'
        },
        {
            title: 'Sub Percent',
            value: 'subPercent'
        },

    ],
    'date': [{
        title: 'Set Exact',
        value: 'setExact'
    },],
    'status': [{
        title: 'Set Exact',
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
        [selectedColumn, setSelectedColumn] = useState(),
        [actionType, setActionType] = useState(),
        [changingValue, setChangingValue] = useState()

    const selectAllItemsHandler = () => {
        onSelectAll()
    }

    const submitHandler = (e) => {
        e.preventDefault()

        onSetChanges({bulkOperation: {
            entity: selectedColumn,
            action: actionType,
            value: changingValue
        }})
    }

    useEffect(() => {
        setSelectedColumn(columns.filter(column => column.fastUpdating)[0].dataIndex)
    }, [columns])

    useEffect(() => {
        if (selectedColumn === 'startDate' || selectedColumn === 'endDate') setAvailableActions(updateActions.date)
        else if (selectedColumn === 'state') setAvailableActions(updateActions.status)
        else setAvailableActions(updateActions.number)
    }, [selectedColumn])

    useEffect(() => {
        if (availableActions.length > 0) setActionType(availableActions[0].value)
    }, [availableActions])

    useEffect(() => {
        setChangingValue(undefined)
    }, [selectedColumn])

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
                        disabled={selectedColumn === 'state' || selectedColumn === 'startDate' || selectedColumn === 'endDate'}
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

                <button className={'btn green'}>Apply</button>
            </form>

            <button className={'btn icon close'} onClick={onClose}>
                <SVG id={'close-window-icon'}/>
            </button>
        </div>
    )
}

const ChangeValueField = ({selectedColumn, value, onChangeValue, actionType}) => {
    if (selectedColumn === 'startDate' || selectedColumn === 'endDate') {
        return (<DatePicker showToday={false}/>)
    } else if (selectedColumn === 'calculatedBudget') {
        return (<InputCurrency
            typeIcon={actionType === 'addPercent' || actionType === 'subPercent' ? 'percent' : ''}
            step={0.01}
            value={value}
            onChange={value => onChangeValue(value)}
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
    } else {
        return (<Input value={value} onChange={({target: {value}}) => onChangeValue(value)}/>)
    }
}

export default FastUpdateBlock
