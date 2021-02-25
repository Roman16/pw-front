import React, {memo, useEffect, useState} from 'react'
import {Checkbox, Spin} from 'antd'
import './CustomTable.less'
import {SVG} from "../../utils/icons"
import $ from "jquery"

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
                         disabledRows = []
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
                        const fieldWidth = item.width ? ((devicePixelRatio === 2 && (item.width.search('em') !== -1)) ? {width: `calc(${item.width} + 1.5em)`} : {width: item.width}) : {flex: 1},
                            leftStickyPosition = index === 0 ? {left: rowSelection ? 59 : 0} : (columns[index - 1].width && devicePixelRatio === 2 && (columns[index - 1].width.search('em') !== -1)) ? {left: `calc(${columns[index - 1].width} + 1.5em ${rowSelection ? '+ 59px' : '+ 0'})`} : {left: rowSelection ? `calc(${columns[index - 1].width} + 59px)` : columns[index - 1].width}

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
                        const fieldWidth = item.width ? ((devicePixelRatio === 2 && (item.width.search('em') !== -1)) ? {width: `calc(${item.width} + 1.5em)`} : {width: item.width}) : {flex: 1},
                            leftStickyPosition = columnIndex === 0 ? {left: rowSelection ? 59 : 0} : (columns[columnIndex - 1].width && devicePixelRatio === 2 && (columns[columnIndex - 1].width.search('em') !== -1)) ? {left: `calc(${columns[columnIndex - 1].width} + 1.5em ${rowSelection ? '+ 59px' : '+ 0'})`} : {left: rowSelection ? `calc(${columns[columnIndex - 1].width} + 59px)` : columns[columnIndex - 1].width}

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
                                className={`table-body__row ${rowClassName && rowClassName(report)} ${(selectedRows.length > 0 && selectedRows.find(item => item === report.id)) ? 'checked-row' : ''} ${isDisabledRow ? 'disabled-row' : ''}`}
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
                                    const fieldWidth = item.width ? ((devicePixelRatio === 2 && (item.width.search('em') !== -1)) ? {width: `calc(${item.width} + 1.5em)`} : {width: item.width}) : {flex: 1},
                                        leftStickyPosition = columnIndex === 0 ? {left: rowSelection ? 59 : 0} : (columns[columnIndex - 1].width && devicePixelRatio === 2 && (columns[columnIndex - 1].width.search('em') !== -1)) ? {left: `calc(${columns[columnIndex - 1].width} + 1.5em ${rowSelection ? '+ 59px' : '+ 0'})`} : {left: rowSelection ? `calc(${columns[columnIndex - 1].width} + 59px)` : columns[columnIndex - 1].width}

                                    return (
                                        <div
                                            className={`table-body__field ${fixedColumns.includes(columnIndex) ? 'fixed' : ''} ${fixedColumns[fixedColumns.length - 1] === columnIndex ? 'with-shadow' : ''}  ${item.align ? `align-${item.align}` : ''} ${item.edit ? 'editable-field' : ''}`}
                                            style={{
                                                ...fieldWidth,
                                                minWidth: item.minWidth || '0', ...fixedColumns.includes(columnIndex) && leftStickyPosition
                                            }}
                                        >
                                            {item.render
                                                ? item.render(report[item.key], report, index, item.dataIndex)
                                                : report[item.key]}
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

export default memo(CustomTable)
