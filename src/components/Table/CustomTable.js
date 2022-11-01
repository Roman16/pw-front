import React, {memo, useEffect, useRef, useState} from 'react'
import {Checkbox, Input, Select, Spin, Switch} from 'antd'
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
import {ADVERTISING_STRATEGY, BSR_TRACKING} from "../../pages/PPCAutomate/ProductsInfo/ProductList"
import CustomSelect from "../Select/Select"
import {activeTimezone} from "../../pages"
import {RenderMetricChanges} from "../../pages/Analytics/componentsV2/MainMetrics/MetricItem"
import {analyticsAvailableMetricsList} from "../../pages/Analytics/componentsV2/MainMetrics/metricsList"
import _ from "lodash"

const Option = Select.Option

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
                         onUpdateField,
                         emptyTitle,
                         emptyDescription,
                         emptyComponent
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
                                className={`th ${item.filter ? 'filter-column' : ''} ${item.sorter ? 'sorter-column' : ''} ${fixedColumns.includes(index) ? 'fixed' : ''} ${fixedColumns[fixedColumns.length - 1] === index ? 'with-shadow' : ''} ${item.className ?? ''}`}
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
                                {!item.noTotal && (item.render && columnIndex !== 0 ? item.totalRender ? item.totalRender(+totalDataSource[item.key].value, item, columnIndex) : item.render((typeof totalDataSource[item.key] === 'object' ? +totalDataSource[item.key].value : totalDataSource[item.key]), item, columnIndex, item.key) : (totalDataSource[item.key].value || totalDataSource[item.key]))}

                                {!item.noTotal && dataSource[0].compareWithPrevious && columnIndex > 2 &&
                                <RenderMetricChanges
                                    value={totalDataSource[item.key].value}
                                    prevValue={totalDataSource[item.key].value_prev}
                                    diff={totalDataSource[item.key].value_diff}
                                    type={_.find(analyticsAvailableMetricsList, {key: item.key})?.type}
                                    name={item.key}
                                />}
                            </div>
                        )
                    })}
                </div>}

                <div className="table-body">
                    {(!loading && (!dataSource || dataSource.length === 0)) && <div className="no-data">
                        {emptyComponent ? emptyComponent : emptyText ? emptyText === 'image' ?
                            <EmptyData title={emptyTitle}
                                       description={emptyDescription}/> : emptyText : 'You don’t have any data yet'}
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
                                                    columnParams={item}
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

export const EditableField = ({item, type, column, value, onUpdateField, render, disabled, columnInfo, columnParams}) => {
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
        } else if (type === 'checkbox') {
            onUpdateField(item, column, stateValue, onClose, stopProcessing)
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
                    {value ? `${moment(value).tz(activeTimezone).format('DD MMM YYYY')}` : 'No end date'}
                    {!disabled && <i className={'edit'}><SVG id={'edit-pen-icon'}/></i>}
                </div>

                {visibleEditableWindow && <DatePicker
                    value={newValue && newValue !== 'null' ? moment(newValue).tz(activeTimezone) : undefined}
                    open={visibleEditableWindow}
                    showToday={false}
                    allowClear={false}
                    className={`editable-date-picker ${newValue === 'null' ? 'no-date' : ''}`}
                    dropdownClassName={'edit-field-picker'}
                    onChange={(date) => setNewValue(dateFormatting(date))}
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

                        <p>{activeTimezone}</p>
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
                onClick={(e) => columnInfo.clickEvent(item, e)}
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
    } else if (type === 'editable-text') {
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
    } else if (type === 'select') {
        return <div className={''} ref={wrapperRef}>
            <div className={`field-value ${disabled ? 'disabled' : ''}`} onClick={openEditWindow}>
                {render ? render() : value ? `$${value}` : ''}

                {!disabled && <i className={'edit'}><SVG id={'edit-pen-icon'}/></i>}
            </div>

            {visibleEditableWindow && <div className="editable-window select">
                <div className="form-group">
                    <CustomSelect
                        getPopupContainer={triggerNode => triggerNode.parentNode}
                        value={newValue}
                        autoFocus={true}
                        onChange={value => setNewValue(value)}
                    >
                        {columnParams.options.map(k => (
                            <Option value={k.value}>
                                {k.icon && <i style={{fill: `#${k.fill}`}}>
                                    <SVG id={k.icon}/>
                                </i>}
                                {k.label}
                            </Option>
                        ))}
                    </CustomSelect>
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
    } else if (type === 'checkbox') {
        return (<div className={'checkbox-container'}>
            <Checkbox
                checked={value}
                disabled={processing}
                onChange={({target: {checked}}) => submitFieldHandler(checked)}
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
                        typeIcon={type === 'percent' ? 'percent' : 'currency'}
                        parser={value => value && Math.abs(value)}
                        onChange={(value) => setNewValue(value || undefined)}
                        onBlur={({target: {value}}) => setNewValue(value ? round(value, 2) : undefined)}
                        autoFocus={true}
                    />

                    <button
                        className={'btn default'}
                        onClick={() => submitFieldHandler()}
                        disabled={processing || (columnParams.saveValidation ? columnParams.saveValidation(newValue) : !newValue)}
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


export const EmptyData = ({title = 'No data yet', description = 'There’s currently no data to display'}) => (
    <div className="empty-data-block">
        <svg width="178" height="160" viewBox="0 0 178 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M16.0776 95.5398H48.7221C51.1793 95.5398 53.4567 96.8282 54.7222 98.9345L57.9594 104.322C59.4058 106.729 62.0084 108.202 64.8167 108.202H113.758C116.566 108.202 119.169 106.729 120.615 104.322L123.852 98.9345C125.118 96.8282 127.395 95.5398 129.853 95.5398H162.497L125.892 51.7988H52.6825L16.0776 95.5398Z"
                fill="#D2D7E1"/>
            <rect x="37.8965" width="103.355" height="123.165" rx="4" fill="#EDF0F5"/>
            <rect x="48.2319" y="17.2666" width="82.6839" height="42.5899" rx="2" fill="#DCDFE6"/>
            <rect x="48.2319" y="73.6689" width="82.6839" height="5.75539" rx="2.8777" fill="#DCDFE6"/>
            <rect x="48.2319" y="84.0283" width="82.6839" height="5.75539" rx="2.8777" fill="#DCDFE6"/>
            <ellipse cx="89" cy="145.611" rx="89" ry="14.3885" fill="#F7F7F7"/>
            <path
                d="M16.0776 145.64V95.5391H50.4194C51.8235 95.5391 53.1249 96.2753 53.8481 97.4789L59.125 106.261C59.8482 107.465 61.1495 108.201 62.5536 108.201H116.021C117.425 108.201 118.726 107.465 119.45 106.261L124.727 97.4789C125.45 96.2753 126.751 95.5391 128.155 95.5391H162.497V145.64C162.497 147.849 160.706 149.64 158.497 149.64H20.0776C17.8685 149.64 16.0776 147.849 16.0776 145.64Z"
                fill="#DCDFE6"/>
        </svg>

        <h4>{title}</h4>
        <p dangerouslySetInnerHTML={{__html: description}}/>
    </div>
)
export const NoFoundData = ({title = 'No results found', description = 'There’s currently no data to display'}) => (
    <div className="no-found-data-block">
        <svg width="178" height="128" viewBox="0 0 178 128" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="89" cy="109.169" rx="89" ry="15.831" fill="#F7F7F7"/>
            <path
                d="M33.1543 101.367H144.787C146.996 101.367 148.787 99.5759 148.787 97.3667V21.0615C148.787 18.8524 146.996 17.0615 144.787 17.0615H65.8483H33.1543C30.9452 17.0615 29.1543 18.8524 29.1543 21.0615V97.3667C29.1543 99.5759 30.9452 101.367 33.1543 101.367Z"
                fill="#D2D7E1"/>
            <path
                d="M44.4684 87.0732L135.955 84.3862C138.163 84.3213 139.901 82.4787 139.836 80.2705L137.588 3.99825C137.523 1.79007 135.68 0.0525602 133.472 0.117416L68.5006 2.02566L41.9851 2.80444C39.7769 2.8693 38.0396 4.71196 38.1046 6.92014L40.3523 83.1924C40.4174 85.4005 42.2602 87.1381 44.4684 87.0732Z"
                fill="#EDF0F5"/>
            <path opacity="0.3"
                  d="M33.1543 104.378H144.787C146.996 104.378 148.787 102.587 148.787 100.378V32.1018C148.787 29.8927 146.996 28.1018 144.787 28.1018H75.223C73.7789 28.1018 72.447 27.3235 71.7381 26.0654L69.509 22.1092C68.8002 20.8511 67.4682 20.0728 66.0241 20.0728H33.1543C30.9452 20.0728 29.1543 21.8636 29.1543 24.0728V100.378C29.1543 102.587 30.9452 104.378 33.1543 104.378Z"
                  fill="#C9CEDA"/>
            <path
                d="M33.1543 110.399H144.787C146.996 110.399 148.787 108.609 148.787 106.399V34.1233H72.7097C71.2656 34.1233 69.9337 33.345 69.2248 32.0868L66.9957 28.1307C66.2869 26.8726 64.9549 26.0942 63.5108 26.0942H29.1543V106.399C29.1543 108.609 30.9452 110.399 33.1543 110.399Z"
                fill="#DCDFE6"/>
            <path
                d="M155.811 118.719C157.74 120.696 157.703 123.863 155.728 125.793C153.754 127.724 150.589 127.687 148.661 125.71L155.811 118.719ZM137.122 99.5661L155.811 118.719L148.661 125.71L129.971 106.557L137.122 99.5661Z"
                fill="#CFD4DF"/>
            <path
                d="M148.51 114.703C149.667 115.888 149.644 117.789 148.46 118.947C147.275 120.105 145.377 120.083 144.219 118.897L148.51 114.703ZM129.82 95.5492L148.51 114.703L144.219 118.897L125.53 99.7437L129.82 95.5492Z"
                fill="#CFD4DF"/>
            <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M113.459 102.475C124.632 102.475 133.69 93.4085 133.69 82.2238C133.69 71.0391 124.632 61.9721 113.459 61.9721C102.286 61.9721 93.228 71.0391 93.228 82.2238C93.228 93.4085 102.286 102.475 113.459 102.475ZM113.459 107.241C127.261 107.241 138.45 96.0402 138.45 82.2238C138.45 68.4074 127.261 57.207 113.459 57.207C99.6568 57.207 88.4678 68.4074 88.4678 82.2238C88.4678 96.0402 99.6568 107.241 113.459 107.241Z"
                  fill="#C0C7D3"/>
            <mask id="mask0_21927_59490" maskUnits="userSpaceOnUse" x="93" y="61" width="41" height="42">
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M113.459 102.475C124.632 102.475 133.69 93.4085 133.69 82.2238C133.69 71.0391 124.632 61.9722 113.459 61.9722C102.285 61.9722 93.2275 71.0391 93.2275 82.2238C93.2275 93.4085 102.285 102.475 113.459 102.475Z"
                      fill="#C4C4C4"/>
            </mask>
            <g mask="url(#mask0_21927_59490)">
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M113.459 102.475C124.632 102.475 133.69 93.4085 133.69 82.2238C133.69 71.0391 124.632 61.9722 113.459 61.9722C102.285 61.9722 93.2275 71.0391 93.2275 82.2238C93.2275 93.4085 102.285 102.475 113.459 102.475Z"
                      fill="#D2D7E1"/>
                <path d="M135.277 61.9722L101.955 108.432" stroke="#EDF0F5" stroke-width="3" stroke-linecap="round"/>
                <path d="M140.831 66.0049L107.509 112.465" stroke="#EDF0F5" stroke-width="7" stroke-linecap="round"/>
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M113.459 102.475C124.632 102.475 133.69 93.4085 133.69 82.2238C133.69 71.0391 124.632 61.9721 113.459 61.9721C102.286 61.9721 93.228 71.0391 93.228 82.2238C93.228 93.4085 102.286 102.475 113.459 102.475ZM113.459 107.241C127.261 107.241 138.45 96.0402 138.45 82.2238C138.45 68.4074 127.261 57.207 113.459 57.207C99.6568 57.207 88.4678 68.4074 88.4678 82.2238C88.4678 96.0402 99.6568 107.241 113.459 107.241Z"
                      fill="#DCDFE6"/>
            </g>
        </svg>

        <h4>{title}</h4>
        <p dangerouslySetInnerHTML={{__html: description}}/>
    </div>
)

export default memo(CustomTable)
