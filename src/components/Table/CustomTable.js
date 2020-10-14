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
                         fixedColumns = []
                     }) => {

    const devicePixelRatio = window.devicePixelRatio

    const [checkedRows, setCheckedRows] = useState([]),
        [scrolling, setScrolling] = useState(false)

    const checkAllRowsHandler = ({target: {checked}}) => {
        if (checked) {
            setCheckedRows(dataSource.map(item => item.id))
        } else {
            setCheckedRows([])
        }
    }

    const checkRowHandler = (id, value) => {
        if (value) {
            setCheckedRows([...checkedRows, id])
        } else {
            if (selectedAll) {
                setCheckedRows(dataSource.map(item => item.id).filter(item => item !== id))
            } else {
                setCheckedRows(prevState => prevState.filter(item => item !== id))
            }
        }
    }

    const scrollHandler = (e) => {
        if (e.target.scrollLeft > 5) {
            setScrolling(true)
        } else {
            setScrolling(false)
        }
    }


    useEffect(() => {
        if (rowSelection) {
            rowSelection.onChange(checkedRows)
        }
    }, [checkedRows])

    return (
        <div className={`custom-table ${scrolling ? 'scrolling' : ''}`}>
            <div className="table-overflow" onScroll={scrollHandler}>
                <div className="table-head" key={'table-head'}>
                    {rowSelection && <div className={'th checkbox-column'}>
                        <Checkbox
                            indeterminate={checkedRows.length > 0 && checkedRows.length !== dataSource.length}
                            checked={(checkedRows.length > 0 && checkedRows.length === dataSource.length) || selectedAll}
                            onChange={checkAllRowsHandler}
                        />
                    </div>}

                    {columns.map((item, index) => {
                        const fieldWidth = item.width ? ((devicePixelRatio === 2 && (item.width.search('em') !== -1)) ? {width: `calc(${item.width} + 1.5em)`} : {width: item.width}) : {flex: 1},
                            leftStickyPosition = index === 0 ? {left: 0} : (columns[index - 1].width && devicePixelRatio === 2 && (columns[index - 1].width.search('em') !== -1)) ? {left: `calc(${columns[index - 1].width} + 1.5em)`} : {left: columns[index - 1].width}

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
                                <div className={`title ${item.align || ''}`}>
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

                <div className="table-body">
                    {(!loading && (!dataSource || dataSource.length === 0)) && <div className="no-data">
                        {emptyText ? emptyText : 'You don’t have any data yet'}
                    </div>}

                    {dataSource &&
                    dataSource.length > 0 &&
                    dataSource.map((report, index) => (
                        <>
                            <div
                                className={`table-body__row ${rowClassName && rowClassName(report)} ${(checkedRows.length > 0 && checkedRows.find(item => item === report.id)) || selectedAll ? 'checked-row' : ''}`}
                                onClick={() => rowClick && rowClick(report, index)}
                            >
                                {rowSelection && <div className={'table-body__field checkbox-column'}>
                                    <Checkbox
                                        checked={(checkedRows.length > 0 && checkedRows.find(item => item === report.id)) || selectedAll}
                                        onChange={(e) => checkRowHandler(report.id, e.target.checked)}
                                    />
                                </div>}


                                {columns.map((item, columnIndex) => {
                                    const fieldWidth = item.width ? ((devicePixelRatio === 2 && (item.width.search('em') !== -1)) ? {width: `calc(${item.width} + 1.5em)`} : {width: item.width}) : {flex: 1},
                                        leftStickyPosition = columnIndex === 0 ? {left: 0} : (columns[columnIndex - 1].width && devicePixelRatio === 2 && (columns[columnIndex - 1].width.search('em') !== -1)) ? {left: `calc(${columns[columnIndex - 1].width} + 1.5em)`} : {left: columns[columnIndex - 1].width}

                                    return (
                                        <div
                                            className={`table-body__field ${item.align || ''} ${fixedColumns.includes(columnIndex) ? 'fixed' : ''} ${fixedColumns[fixedColumns.length - 1] === columnIndex ? 'with-shadow' : ''}`}
                                            style={{
                                                ...fieldWidth,
                                                minWidth: item.minWidth || '0', ...fixedColumns.includes(columnIndex) && leftStickyPosition
                                            }}
                                        >
                                            {item.render
                                                ? item.render(report[item.key], report, index)
                                                : report[item.key]}
                                        </div>
                                    )
                                })}
                            </div>

                            {expandedRowRender && openedRow === report.id &&
                            <div
                                className={`table-body__row expand-row ${checkedRows.length > 0 && checkedRows.find(item => item === report.id) ? 'checked-row' : ''}`}>
                                {expandedRowRender(report)}
                            </div>}
                        </>
                    ))}
                </div>

                {totalDataSource && dataSource.length > 0 && <div className="total-data">
                    {columns.map((item, columnIndex) => {
                        const fieldWidth = item.width ? ((devicePixelRatio === 2 && (item.width.search('em') !== -1)) ? {width: `calc(${item.width} + 1.5em)`} : {width: item.width}) : {flex: 1},
                            leftStickyPosition = columnIndex === 0 ? {left: 0} : (columns[columnIndex - 1].width && devicePixelRatio === 2 && (columns[columnIndex - 1].width.search('em') !== -1)) ? {left: `calc(${columns[columnIndex - 1].width} + 1.5em)`} : {left: columns[columnIndex - 1].width}

                        return (
                            <div
                                className={`table-body__field ${item.align || ''} ${fixedColumns.includes(columnIndex) ? 'fixed' : ''} ${fixedColumns[fixedColumns.length - 1] === columnIndex ? 'with-shadow' : ''}`}
                                style={{
                                    ...fieldWidth,
                                    minWidth: item.minWidth || '0', ...fixedColumns.includes(columnIndex) && leftStickyPosition
                                }}
                            >
                                {(item.render && !item.noTotal)
                                    ? item.render(totalDataSource[item.key], item, columnIndex)
                                    : totalDataSource[item.key]}
                            </div>
                        )
                    })}
                </div>}
            </div>


            {loading && <div className={'load-data'}><Spin size={'large'}/></div>}

        </div>
    )
}

export default memo(CustomTable)
