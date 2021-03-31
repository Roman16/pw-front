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
            title: 'Set',
            value: 'set'
        }
    ],
    'date': [
        {
            title: 'Set',
            value: 'set'
        },
    ],
    'status': [{
        title: 'Set',
        value: 'set'
    }
    ]
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

    const [selectedColumn, setSelectedColumn] = useState(),
        [actionType, setActionType] = useState(),
        [availableActions, setAvailableActions] = useState([]),
        [changingValue, setChangingValue] = useState()

    const selectAllItemsHandler = () => {
        onSelectAll()
    }

    const submitHandler = (e) => {
        e.preventDefault()
        onSetChanges(selectedColumn, changingValue)
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
                        disabled={selectedColumn === 'state'}
                        value={actionType}
                    >
                        {availableActions.map(item => <Option value={item.value}>{item.title}</Option>)}
                    </CustomSelect>
                </div>

                <div className="form-group">
                    <ChangeValueField
                        selectedColumn={selectedColumn}
                        value={changingValue}

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

const ChangeValueField = ({selectedColumn, value, onChangeValue}) => {
    if (selectedColumn === 'startDate' || selectedColumn === 'endDate') {
        return (<DatePicker showToday={false}/>)
    } else if (selectedColumn === 'dailyBudget') {
        return (<InputCurrency step={0.01} value={value} onChange={value => onChangeValue(value)}/>)
    } else if (selectedColumn === 'state') {
        return (<CustomSelect
                getPopupContainer={trigger => trigger.parentNode}
                onChange={value => onChangeValue(value)}
                value={value}
            >
                <Option value={'enabled'}>Enabled</Option>
                <Option value={'inactive'}>Inactive</Option>
                <Option value={'paused'}>Paused</Option>
                <Option value={'archived'}>Archived</Option>
            </CustomSelect>
        )
    } else {
        return (<Input value={value} onChange={({target: {value}}) => onChangeValue(value)}/>)
    }
}

export default FastUpdateBlock
