import React, {memo, useEffect, useRef, useState} from 'react'
import {Checkbox, Input, Spin, Switch} from 'antd'
import './CustomTable.less'
import {SVG} from "../../utils/icons"
import moment from 'moment-timezone'
import DatePicker from "../DatePicker/DatePicker"
import InputCurrency from "../Inputs/InputCurrency"
import {dateFormatting, dateRequestFormat} from "../../utils/dateFormatting"
import {round} from "../../utils/round"
import {
    disabledEndDate,
    disabledStartDate
} from "../../pages/Analytics/Campaigns/CreateCampaignWindow/CreateSteps/CampaignDetails"
import locale from 'antd/lib/locale/en_US.js.map'
import {Link} from "react-router-dom"
import {notification} from "../Notification"

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
                         disabledRow = () => false,
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
            <div
                className={`table-overflow ${(!loading && (!dataSource || dataSource.length === 0)) ? 'disabled' : ''}`}
                onScroll={scrollHandler}>
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
                        {emptyText ? emptyText === 'image' ? <EmptyData/> : emptyText : 'You don’t have any data yet'}
                    </div>}

                    {dataSource &&
                    dataSource.length > 0 &&
                    dataSource.map((report, index) => {
                        const isDisabledRow = disabledRows.includes(report[rowKey]) || disabledRow(report[rowKey], index)
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
                                            {(typeof item.editType === 'function' ? item.editType(report) : item.editType) ?
                                                <EditableField
                                                    item={report}
                                                    type={item.editType}
                                                    value={report[item.key]}
                                                    column={item.dataIndex}
                                                    columnInfo={item}
                                                    onUpdateField={onUpdateField}
                                                    render={item.render ? () => item.render(report[item.key], report, index, item.dataIndex) : undefined}
                                                    disabled={(report.state && report.state === 'archived') || isDisabledRow || (item.disableField && (item.disableField(report[item.key], report) || false))}
                                                /> : item.render ? item.render(report[item.key], report, index, item.dataIndex) : report[item.key]}
                                        </div>
                                    )
                                })}
                            </div>

                            {expandedRowRender && (openedRow ? openedRow(report) : true) &&
                            <div
                                className={`table-body__row expand-row ${selectedRows.length > 0 && selectedRows.find(item => item === report.id) ? 'checked-row' : ''}`}>
                                {expandedRowRender(report, index)}
                            </div>}
                        </>)
                    })}
                </div>
            </div>


            {loading && <div className={'load-data'}><Spin size={'large'}/></div>}

        </div>
    )
}

export const EditableField = ({item, type, column, value, onUpdateField, render, disabled, columnInfo}) => {
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

        const stopProcessing = () => setProcessing(false)

        if (type === 'text') {
            if (columnInfo.uniqueIndex === 'adGroupName' && newValue.trim().length > 255) {
                notification.error({title: 'Ad group name should not be longer than 255 characters'})
                stopProcessing()
            } else if (columnInfo.uniqueIndex === 'campaignName' && newValue.trim().length > 128) {
                notification.error({title: 'Campaign name should not be longer than 128 characters'})
                stopProcessing()
            } else {
                onUpdateField(item, column, newValue.trim(), onClose, stopProcessing)
            }
        } else {
            onUpdateField(item, column, stateValue ? stateValue : type === 'date' ? newValue !== 'null' ? newValue : 'null' : newValue, onClose, stopProcessing)
        }
    }


    useEffect(() => {
        function handleClickOutside({target}) {
            try {
                if (target && target !== null && target.className) {
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
            } catch (e) {
                console.log(e)
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

    const openEditWindow = (e) => {
        e.stopPropagation()
        e.preventDefault()

        if (!disabled) {
            setVisibleEditableWindow(prevState => !prevState)
        }
    }

    if (type === 'date') {
        return (<div ref={wrapperRef}>

                <div className={`field-value ${disabled ? 'disabled' : ''}`} onClick={openEditWindow}>
                    {value ? `${moment(value).tz('America/Los_Angeles').format('DD MMM YYYY')}` : 'No end date'}
                    {!disabled && <i className={'edit'}><SVG id={'edit-pen-icon'}/></i>}
                </div>

                {visibleEditableWindow && <DatePicker
                    value={newValue && newValue !== 'null' ? moment(newValue).tz('America/Los_Angeles') : undefined}
                    open={visibleEditableWindow}
                    showToday={false}
                    allowClear={false}
                    className={`editable-date-picker ${newValue === 'null' ? 'no-date' : ''}`}
                    dropdownClassName={'edit-field-picker'}
                    onChange={(date) => setNewValue(dateRequestFormat(date))}
                    format={'DD MMM YYYY'}
                    locale={locale}
                    placeholder={column === 'endDate' ? 'No end date' : 'No start date'}
                    disabledDate={(date) => column === 'endDate' ? disabledEndDate(date, item.startDate) : disabledStartDate(date, item.endDate)}
                    defaultPickerValue={column === 'endDate' && (newValue === null || !newValue) && moment.max([moment(item.startDate), moment()]).add(1, 'month').startOf('month')}
                    renderExtraFooter={() => <>
                        {column === 'endDate' && (newValue && newValue !== 'null') &&
                        <button className="btn clear" onClick={() => setNewValue('null')}>
                            Remove
                        </button>}

                        <p>America/Los_Angeles</p>
                        <div className="actions">
                            <button disabled={processing || newValue === value} className={'btn default'}
                                    onClick={() => submitFieldHandler()}>
                                Save

                                {processing && <Spin size={'small'}/>}
                            </button>

                            <button
                                className={'btn white'}
                                disabled={processing}
                                onClick={() => setVisibleEditableWindow(false)}
                            >
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
    } else if (type === 'text') {
        return <div className={''} ref={wrapperRef}>
            <Link
                to={columnInfo.redirectLink(item)}
                onClick={() => columnInfo.clickEvent(item)}
                className={`field-value text ${disabled ? 'disabled' : ''}`}
            >
                {render ? render() : value}

                {!disabled && <i className={'edit'} onClick={openEditWindow}><SVG id={'edit-pen-icon'}/></i>}
            </Link>

            {visibleEditableWindow && <div className="editable-window text">
                <div className="form-group">
                    <Input
                        value={newValue}
                        onChange={({target: {value}}) => setNewValue(value)}
                        autoFocus={true}
                    />
                </div>

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
                    disabled={processing}
                    onClick={() => setVisibleEditableWindow(false)}
                >
                    Cancel
                </button>
            </div>}
        </div>
    } else if(type === 'editable-text') {
        return <div className={''} ref={wrapperRef}>
            <div className={`field-value ${disabled ? 'disabled' : ''}`} onClick={openEditWindow}>
                {render ? render() : value ? `$${value}` : ''}

                {!disabled && <i className={'edit'}><SVG id={'edit-pen-icon'}/></i>}
            </div>

            {visibleEditableWindow && <div className="editable-window text">
                <div className="form-group">
                    <Input
                        value={newValue}
                        onChange={({target: {value}}) => setNewValue(value)}
                        autoFocus={true}
                    />
                </div>

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
                    disabled={processing}
                    onClick={() => setVisibleEditableWindow(false)}
                >
                    Cancel
                </button>
            </div>}
        </div>
    } else if(type === 'select') {
        return <div className={''} ref={wrapperRef}>
            <div className={`field-value ${disabled ? 'disabled' : ''}`} onClick={openEditWindow}>
                {render ? render() : value ? `$${value}` : ''}

                {!disabled && <i className={'edit'}><SVG id={'edit-pen-icon'}/></i>}
            </div>

            {visibleEditableWindow && <div className="editable-window text">
                <div className="form-group">
                    <Input
                        value={newValue}
                        onChange={({target: {value}}) => setNewValue(value)}
                        autoFocus={true}
                    />
                </div>

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
                    disabled={processing}
                    onClick={() => setVisibleEditableWindow(false)}
                >
                    Cancel
                </button>
            </div>}
        </div>
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
                        typeIcon={type === 'percent' ? 'percent' : 'currency'}
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
                        disabled={processing}
                        onClick={() => setVisibleEditableWindow(false)}
                    >
                        Cancel
                    </button>
                </div>}
            </div>
        )
    }
}


const EmptyData = () => (
    <div className="empty-data-block">
        <svg width="216" height="200" viewBox="0 0 216 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M15.9091 136.364H48.175C50.6297 136.364 52.905 137.649 54.1715 139.752L57.3267 144.991C58.7741 147.394 61.3744 148.864 64.1798 148.864H112.525C115.33 148.864 117.93 147.394 119.378 144.991L122.533 139.752C123.799 137.649 126.075 136.364 128.529 136.364H160.795L124.574 93.1818H52.1306L15.9091 136.364Z"
                fill="#AEB6C3"/>
            <rect x="37.5" y="42.0454" width="102.273" height="121.591" rx="4" fill="#F5F4F7"/>
            <rect x="47.7272" y="59.0909" width="81.8182" height="42.0455" rx="2" fill="#DCDFE6"/>
            <rect x="47.7272" y="114.773" width="81.8182" height="5.68182" rx="2.84091" fill="#DCDFE6"/>
            <rect x="47.7272" y="125" width="81.8182" height="5.68182" rx="2.84091" fill="#DCDFE6"/>
            <ellipse cx="88.0682" cy="185.796" rx="88.0682" ry="14.2045" fill="#F7F7F7"/>
            <path
                d="M15.9091 185.773V136.364H49.8703C51.273 136.364 52.5732 137.098 53.2968 138.3L58.4929 146.927C59.2166 148.129 60.5167 148.864 61.9194 148.864H114.785C116.188 148.864 117.488 148.129 118.212 146.927L123.408 138.3C124.131 137.098 125.432 136.364 126.834 136.364H160.795V185.773C160.795 187.982 159.005 189.773 156.795 189.773H19.9091C17.6999 189.773 15.9091 187.982 15.9091 185.773Z"
                fill="#DCDFE6"/>
            <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M215.909 23.8636C215.909 37.0432 202.173 47.7273 185.227 47.7273C178.867 47.7273 172.958 46.2219 168.059 43.6442L158.755 47.4942C157.977 47.8158 157.174 47.0926 157.413 46.2861L160.024 37.4762C156.57 33.6153 154.546 28.9234 154.546 23.8636C154.546 10.6841 168.282 0 185.227 0C202.173 0 215.909 10.6841 215.909 23.8636ZM172.159 28.4091C174.356 28.4091 176.137 26.6285 176.137 24.4319C176.137 22.2353 174.356 20.4546 172.159 20.4546C169.963 20.4546 168.182 22.2353 168.182 24.4319C168.182 26.6285 169.963 28.4091 172.159 28.4091ZM189.773 24.4319C189.773 26.6285 187.992 28.4092 185.795 28.4092C183.599 28.4092 181.818 26.6285 181.818 24.4319C181.818 22.2353 183.599 20.4546 185.795 20.4546C187.992 20.4546 189.773 22.2353 189.773 24.4319ZM199.432 28.4092C201.628 28.4092 203.409 26.6285 203.409 24.4319C203.409 22.2353 201.628 20.4546 199.432 20.4546C197.235 20.4546 195.455 22.2353 195.455 24.4319C195.455 26.6285 197.235 28.4092 199.432 28.4092Z"
                  fill="#DCDFE6"/>
        </svg>

        <h4>No data yet</h4>
        <p>There’s currently no data to display</p>
    </div>
)

export default memo(CustomTable)
