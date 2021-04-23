import React, {memo, useEffect, useRef, useState} from 'react'
import {Checkbox, Spin, Switch, Tooltip} from 'antd'
import './CustomTable.less'
import {SVG} from "../../utils/icons"
import $ from "jquery"
import moment from "moment"
import DatePicker from "../DatePicker/DatePicker"
import InputCurrency from "../Inputs/InputCurrency"
import {dateFormatting} from "../../utils/dateFormatting"
import {round} from "../../utils/round"
import {
    disabledEndDate,
    disabledStartDate
} from "../../pages/Analytics/Campaigns/CreateCampaignWindow/CreateSteps/CampaignDetails"

const CustomTable = ({
                         columns,
                         dataSource,
                         totalDataSource,
                         loading,
                         rowClassName,
                         rowClick,
                         onChangeSorter,
                         sorterColumn,
                         processing,
                         rowSelection,
                         clickHandler,
                         expandedRowRender,
                         openedRow,
                         selectedAll,
                         emptyText,
                         fixedColumns = [],
                         onScroll,
                         showExpandRow,
                         rowKey,
                         selectedRows = [],
                         disabledRows = [],
                         revertSortingColumns = [],
                         onUpdateField
                     }) => {
    const devicePixelRatio = window.devicePixelRatio


    const checkAllRowsHandler = ({target: {checked}}) => {
        if (checked) {
            rowSelection.onChange(
                dataSource
                    .filter(item => !disabledRows.includes(item[rowKey]))
                    .map(item => item[rowKey]),
                true
            )
        } else {
            rowSelection.onChange([])
        }
    }

    const checkRowHandler = (id, value) => {
        if (value) {
            if ([...selectedRows, id].length === dataSource.filter(item => !disabledRows.includes(item[rowKey])).length) {
                rowSelection.onChange([...selectedRows, id])
            } else {
                rowSelection.onChange([...selectedRows, id])
            }
        } else {
            rowSelection.onChange(selectedRows.filter(item => item !== id))
        }
    }

    let scrollingNow = false

    const scrollHandler = (e) => {
        onScroll && onScroll(e)

        if (e.target.scrollLeft > 5) {
            if (!scrollingNow) document.querySelector('.custom-table').classList.add('scrolling')

            scrollingNow = true
        } else {
            if (scrollingNow) document.querySelector('.custom-table').classList.remove('scrolling')
            scrollingNow = false
        }
    }

    return (
        <div className={`custom-table ${rowSelection ? 'with-checkbox' : ''}`}>
            <div className="table-overflow" onScroll={scrollHandler}>
                <div className="table-head" key={'table-head'}>
                    {rowSelection && <div className={'th checkbox-column'}>
                        <Checkbox
                            disabled={dataSource.length === 0 || loading}
                            indeterminate={selectedRows.length > 0 && selectedRows.length !== dataSource.length}
                            checked={(selectedRows.length > 0 && selectedRows.length === dataSource.length) || selectedAll}
                            onChange={checkAllRowsHandler}
                        />
                    </div>}

                    {columns.map((item, index) => {
                        const checkboxWith = devicePixelRatio === 2 ? 54.5 : 59

                        const fieldWidth = item.width ? ((devicePixelRatio === 2 && (item.width.search('em') !== -1)) ? {width: `calc(${item.width} + 1.5em)`} : {width: item.width}) : {flex: 1},
                            leftStickyPosition = index === 0 ? {left: rowSelection ? checkboxWith : 0} : (columns[index - 1].width && devicePixelRatio === 2 && (columns[index - 1].width.search('em') !== -1)) ? {left: `calc(${columns[index - 1].width} + 1.5em ${rowSelection ? `+ ${checkboxWith}px` : '+ 0'})`} : {left: rowSelection ? `calc(${columns[index - 1].width} + ${checkboxWith}px)` : columns[index - 1].width}

                        return (
                            <div
                                className={`th ${item.filter ? 'filter-column' : ''} ${item.sorter ? 'sorter-column' : ''} ${fixedColumns.includes(index) ? 'fixed' : ''} ${fixedColumns[fixedColumns.length - 1] === index ? 'with-shadow' : ''}`}
                                key={`row_${item.dataIndex}_${index}`}
                                style={{
                                    ...fieldWidth,
                                    minWidth: item.minWidth || '0',
                                    ...fixedColumns.includes(index) && leftStickyPosition
                                }}
                                onClick={() => item.sorter && onChangeSorter(item.key)}
                            >
                                <div className={`title ${item.align ? `align-${item.align}` : ''}`}>
                                    {typeof item.title === 'function' ? item.title() : item.title}

                                    {item.sorter && <div
                                        className={`sorter-buttons
                                        ${revertSortingColumns.includes(item.dataIndex) ? 'revert' : ''}
                                         ${sorterColumn && sorterColumn.column === item.key ? sorterColumn.type === 'desc' ? 'is-sorter desc' : 'is-sorter asc' : ''}`}>
                                        <SVG id={'sorter-arrow'}/>
                                    </div>}
                                </div>
                            </div>
                        )
                    })}
                </div>

                {totalDataSource && dataSource.length > 0 &&
                <div className={`total-data ${rowSelection ? 'with-checkbox' : ''}`}>
                    {rowSelection && <div className={'table-body__field checkbox-column'}>
                    </div>}

                    {columns.map((item, columnIndex) => {
                        const checkboxWith = devicePixelRatio === 2 ? 54.5 : 59

                        const fieldWidth = item.width ? ((devicePixelRatio === 2 && (item.width.search('em') !== -1)) ? {width: `calc(${item.width} + 1.5em)`} : {width: item.width}) : {flex: 1},
                            leftStickyPosition = columnIndex === 0 ? {left: rowSelection ? checkboxWith : 0} : (columns[columnIndex - 1].width && devicePixelRatio === 2 && (columns[columnIndex - 1].width.search('em') !== -1)) ? {left: `calc(${columns[columnIndex - 1].width} + 1.5em ${rowSelection ? `+ ${checkboxWith}px` : '+ 0'})`} : {left: rowSelection ? `calc(${columns[columnIndex - 1].width} + ${checkboxWith}px)` : columns[columnIndex - 1].width}

                        return (
                            <div
                                className={`table-body__field ${item.align || ''} ${fixedColumns.includes(columnIndex) ? 'fixed' : ''} ${fixedColumns[fixedColumns.length - 1] === columnIndex ? 'with-shadow' : ''} ${item.align ? `align-${item.align}` : ''}`}
                                style={{
                                    ...fieldWidth,
                                    minWidth: item.minWidth || '0', ...fixedColumns.includes(columnIndex) && leftStickyPosition
                                }}
                            >
                                {!item.noTotal && (item.render && columnIndex !== 0 ? item.totalRender ? item.totalRender(totalDataSource[item.key], item, columnIndex) : item.render(totalDataSource[item.key], item, columnIndex) : totalDataSource[item.key])}
                            </div>
                        )
                    })}
                </div>}

                <div className="table-body">
                    {(!loading && (!dataSource || dataSource.length === 0)) && <div className="no-data">
                        {emptyText ? emptyText : 'You don’t have any data yet'}
                    </div>}

                    {dataSource &&
                    dataSource.length > 0 &&
                    dataSource.map((report, index) => {
                        const isDisabledRow = disabledRows.includes(report[rowKey])
                        return (<>
                            <div
                                className={`table-body__row ${rowClassName && rowClassName(report)} ${(selectedRows.length > 0 && selectedRows.find(item => item === report[rowKey])) ? 'checked-row' : ''} ${isDisabledRow ? 'disabled-row' : ''}`}
                                onClick={() => rowClick && rowClick(report, index)}
                            >
                                {rowSelection && <div className={'table-body__field checkbox-column'}>
                                    <Checkbox
                                        disabled={isDisabledRow}
                                        checked={isDisabledRow ? false : (selectedRows.length > 0 && selectedRows.find(item => item === report[rowKey])) || selectedAll}
                                        onChange={(e) => checkRowHandler(report[rowKey], e.target.checked)}
                                    />
                                </div>}


                                {columns.map((item, columnIndex) => {
                                    const checkboxWith = devicePixelRatio === 2 ? 54.5 : 59

                                    const fieldWidth = item.width ? ((devicePixelRatio === 2 && (item.width.search('em') !== -1)) ? {width: `calc(${item.width} + 1.5em)`} : {width: item.width}) : {flex: 1},
                                        leftStickyPosition = columnIndex === 0 ? {left: rowSelection ? checkboxWith : 0} : (columns[columnIndex - 1].width && devicePixelRatio === 2 && (columns[columnIndex - 1].width.search('em') !== -1)) ? {left: `calc(${columns[columnIndex - 1].width} + 1.5em ${rowSelection ? `+ ${checkboxWith}px` : '+ 0'})`} : {left: rowSelection ? `calc(${columns[columnIndex - 1].width} + ${checkboxWith}px)` : columns[columnIndex - 1].width}

                                    return (
                                        <div
                                            className={`table-body__field ${fixedColumns.includes(columnIndex) ? 'fixed' : ''} ${fixedColumns[fixedColumns.length - 1] === columnIndex ? 'with-shadow' : ''}  ${item.align ? `align-${item.align}` : ''} ${item.editType && item.editType !== 'switch' ? item.disableField && item.disableField(report[item.key], report) ? 'editable-field disabled' : 'editable-field' : ''}`}
                                            style={{
                                                ...fieldWidth,
                                                minWidth: item.minWidth || '0', ...fixedColumns.includes(columnIndex) && leftStickyPosition
                                            }}
                                        >
                                            {item.editType ?
                                                <EditableField
                                                    item={report}
                                                    type={item.editType}
                                                    value={report[item.key]}
                                                    column={item.dataIndex}
                                                    onUpdateField={onUpdateField}
                                                    render={item.render ? () => item.render(report[item.key], report, index, item.dataIndex) : undefined}
                                                    disabled={(report.state && report.state === 'archived') || (item.disableField && (item.disableField(report[item.key], report) || false))}
                                                /> : item.render ? item.render(report[item.key], report, index, item.dataIndex) : report[item.key]}
                                        </div>
                                    )
                                })}
                            </div>

                            {expandedRowRender && (openedRow ? openedRow(report) : true) &&
                            <div
                                className={`table-body__row expand-row ${selectedRows.length > 0 && selectedRows.find(item => item === report.id) ? 'checked-row' : ''}`}>
                                {expandedRowRender(report)}
                            </div>}
                        </>)
                    })}
                </div>
            </div>


            {loading && <div className={'load-data'}><Spin size={'large'}/></div>}

        </div>
    )
}

export const EditableField = ({item, type, column, value, onUpdateField, render, disabled}) => {
    const [visibleEditableWindow, setVisibleEditableWindow] = useState(false),
        [newValue, setNewValue] = useState(value),
        [processing, setProcessing] = useState(false)

    const wrapperRef = useRef(null)

    const onClose = () => {
        setProcessing(false)
        setVisibleEditableWindow(false)
    }

    const submitFieldHandler = (stateValue) => {
        setProcessing(true)
        onUpdateField(item, column, stateValue ? stateValue : type === 'date' ? dateFormatting(newValue) : newValue, onClose, () => setProcessing(false))
    }


    useEffect(() => {
        function handleClickOutside({target}) {
            if (target && target.className) {
                if (target.className === 'icon' ||
                    target.className === 'ant-modal-wrap over-modal-wrap' ||
                    target.parentNode.className === 'ant-calendar-date-panel' ||
                    target.parentNode.parentNode.className === 'ant-calendar-date-panel' ||
                    target.parentNode.parentNode.parentNode.className === 'ant-calendar-date-panel' ||
                    target.parentNode.parentNode.parentNode.parentNode.className === 'ant-calendar-date-panel' ||
                    target.parentNode.parentNode.parentNode.parentNode.parentNode.className === 'ant-calendar-date-panel' ||
                    target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.className === 'ant-calendar-date-panel'
                ) {

                } else if (wrapperRef.current && !wrapperRef.current.contains(target)) {
                    setVisibleEditableWindow(false)
                }
            }
        }

        document.addEventListener("click", handleClickOutside, true)
        return () => {
            document.removeEventListener("click", handleClickOutside)
        }
    }, [wrapperRef])


    useEffect(() => {
        if (type === 'date' && visibleEditableWindow) {
            document.querySelector('section.list-section .table-overflow').addEventListener('scroll', () => {
                setVisibleEditableWindow(false)
            })
        }

        if (visibleEditableWindow) {
            setNewValue(value)
        }
    }, [visibleEditableWindow])

    const openEditWindow = () => {
        if (!disabled) {
            setVisibleEditableWindow(prevState => !prevState)
        }
    }

    if (type === 'date') {
        return (<div ref={wrapperRef}>

                <div className={`field-value ${disabled ? 'disabled' : ''}`} onClick={openEditWindow}>
                    {value ? `${moment(value).format('DD MMM YYYY')}` : 'No end date'}
                    {!disabled && <i className={'edit'}><SVG id={'edit-pen-icon'}/></i>}
                </div>


                {visibleEditableWindow && <DatePicker
                    value={newValue ? moment(newValue) : moment()}
                    format={'DD MMM YYYY'}
                    open={visibleEditableWindow}
                    showToday={false}
                    className={'editable-date-picker'}
                    dropdownClassName={'edit-field-picker'}
                    onChange={value => setNewValue(value)}
                    disabledDate={(data) => column === 'endDate' ? disabledEndDate(data, item.startDate) : disabledStartDate(data, item.endDate)}
                    renderExtraFooter={() => <>
                        <p>America/Los_Angeles</p>
                        <div className="actions">
                            <button disabled={processing} className={'btn default'} onClick={() => submitFieldHandler()}>
                                Save

                                {processing && <Spin size={'small'}/>}
                            </button>

                            <button className={'btn white'} onClick={() => setVisibleEditableWindow(false)}>
                                Cancel
                            </button>
                        </div>
                    </>}
                />}
            </div>
        )
    } else if (type === 'switch') {
        return (<div className="switch-block">
            <Switch
                disabled={item.state === 'archived' || processing}
                checked={item.state === 'enabled'}
                loading={processing}
                onChange={checked => submitFieldHandler(checked ? 'enabled' : 'paused')}
            />
        </div>)
    } else {
        return (<div className={''} ref={wrapperRef}>
                <div className={`field-value ${disabled ? 'disabled' : ''}`} onClick={openEditWindow}>
                    {render ? render() : value ? `$${value}` : ''}

                    {!disabled && <i className={'edit'}><SVG id={'edit-pen-icon'}/></i>}
                </div>

                {visibleEditableWindow && <div className="editable-window">
                    <InputCurrency
                        value={newValue ? round(newValue, 2) : undefined}
                        step={0.01}
                        // max={column === 'calculatedBudget' ? 1000000 : 1000}
                        // min={column === 'calculatedBudget' ? 1 : 0.02}
                        parser={value => value && Math.abs(value)}
                        onChange={(value) => setNewValue(value || undefined)}
                        onBlur={({target: {value}}) => setNewValue(value ? round(value, 2) : undefined)}
                        autoFocus={true}
                    />

                    <button
                        className={'btn default'}
                        onClick={() => submitFieldHandler()}
                        disabled={processing || !newValue}
                    >
                        Save

                        {processing && <Spin size={'small'}/>}
                    </button>

                    <button
                        className={'btn transparent'}
                        onClick={() => setVisibleEditableWindow(false)}
                    >
                        Cancel
                    </button>
                </div>}
            </div>
        )
    }
}


export default memo(CustomTable)
