import React, {useEffect, useState} from "react"
import CustomTable from "../../../../components/Table/CustomTable"
import Pagination from "../../../../components/Pagination/Pagination"
import {useDispatch, useSelector} from "react-redux"
import _ from 'lodash'
import TableFilters from "../TableFilters/TableFilters"
import DateRange from "../DateRange/DateRange"
import ColumnsSelect from "./ColumnsSelect"
import TableOptions from "./TableOptions"
import SwitchChartVisible from "./SwitchChartVisisble"
import ExpandWorkplace from "./ExpandWorkplace"
import {analyticsActions} from "../../../../actions/analytics.actions"
import {numberColumns} from './tableColumns'
import FastUpdateBlock from "./FastUpdateBlock/FastUpdateBlock"
import moment from "moment"
import {SVG} from "../../../../utils/icons"

import './TableList.less'
import {userTypeEnums} from "../../../../constans/userTypeEnums"

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1)
}

const TableList = ({
                       columns,
                       location,
                       moreActions,
                       fixedColumns,
                       showPagination = true,
                       columnSelect = true,
                       showFilters = true,
                       searchField = true,
                       showTotal = true,
                       dateRange = true,
                       showOptions = true,
                       expandedRowRender,
                       metricsData,
                       tableOptions,
                       tableData,
                       tableRequestParams,
                       onChange,
                       fetching,
                       localSorterColumn,
                       onChangeSorterColumn,
                       openedRow,
                       showRowSelection,
                       rowKey,
                       onUpdateField,
                       onUpdateColumn,
                       disabledRow,
                       onDownloadCSV,

                       selectedRangeDate,
                       compareDate
                   }) => {
    const [selectedRows, setSelectedRows] = useState([]),
        [selectedAllRows, setSelectedAllRows] = useState(false),
        [columnsWidth, setColumnsWidth] = useState(localStorage.getItem('analyticsColumnsWidth') ? JSON.parse(localStorage.getItem('analyticsColumnsWidth')) : {})

    const columnsBlackListFromLocalStorage = localStorage.getItem('analyticsColumnsBlackList') && JSON.parse(localStorage.getItem('analyticsColumnsBlackList'))
    const columnsOrderFromLocalStorage = localStorage.getItem('analyticsColumnsOrder') && JSON.parse(localStorage.getItem('analyticsColumnsOrder'))

    const [columnsBlackList, setColumnsBlackList] = useState(columnsBlackListFromLocalStorage ? columnsBlackListFromLocalStorage : {})
    const [columnsOrder, setColumnsOrder] = useState(columnsOrderFromLocalStorage ? columnsOrderFromLocalStorage : {})

    const dispatch = useDispatch()

    const user = useSelector(state => state.user)

    const localColumnBlackList = columnsBlackList[location] || [],
        filters = useSelector(state => state.analytics.filters[location] || [])

    const sortChangeHandler = (column) => {
        const setColumn = (data) => {
            onChangeSorterColumn(data)
        }

        if (numberColumns.includes(column)) {
            if (localSorterColumn && localSorterColumn.column === column) {
                if (localSorterColumn.type === 'desc') {
                    setColumn({
                        column: column,
                        type: 'asc'

                    })
                } else if (localSorterColumn.type === 'asc') {
                    setColumn({
                        column: null,
                        type: 'desc'
                    })
                }
            } else {
                setColumn({
                    column: column,
                    type: 'desc'
                })
            }
        } else {
            if (localSorterColumn && localSorterColumn.column === column) {
                if (localSorterColumn.type === 'asc') {
                    setColumn({
                        column: column,
                        type: 'desc'

                    })
                } else if (localSorterColumn.type === 'desc') {
                    setColumn({
                        column: null,
                        type: 'asc'
                    })
                }
            } else {
                setColumn({
                    column: column,
                    type: 'asc'
                })
            }
        }
    }

    const dateRangeHandler = (startDate, endDate) => {
        deselectAllRows()

        dispatch(analyticsActions.setDateRange({
            startDate: startDate != null ? moment(startDate).format('YYYY-MM-DD') : 'lifetime',
            endDate: endDate != null ? moment(endDate).format('YYYY-MM-DD') : 'lifetime'
        }))
    }

    const selectCompareDateHandler = (startDate, endDate) => {
        dispatch(analyticsActions.setCompareDate({
            startDate: startDate != null ? moment(startDate).format('YYYY-MM-DD') : 'lifetime',
            endDate: endDate != null ? moment(endDate).format('YYYY-MM-DD') : 'lifetime'
        }))

    }

    const changeBlackListHandler = (list) => {
        setColumnsBlackList({
            ...columnsBlackList,
            [location]: list
        })
    }

    const onChangeColumnsOrder = (list) => {
        setColumnsOrder({
            ...columnsOrder,
            [location]: list
        })

    }

    const paginationChangeHandler = (params) => {
        onChange({
            ...tableRequestParams,
            ...params
        })
    }

    useEffect(() => {
        localStorage.setItem('analyticsColumnsBlackList', JSON.stringify(columnsBlackList))
    }, [columnsBlackList])

    useEffect(() => {
        localStorage.setItem('analyticsColumnsOrder', JSON.stringify(columnsOrder))
    }, [columnsOrder])


    const selectAllRows = () => {
        setSelectedAllRows(true)
        setSelectedRows(tableData.data.map(item => item[rowKey]))
    }

    const deselectAllRows = () => {
        setSelectedAllRows(false)
        setSelectedRows([])
    }

    const rowSelection = {
        onChange: (rowsList) => {
            setSelectedRows(rowsList)
            setSelectedAllRows(false)
        }
    }

    const changeTableOptionsHandler = (data) => {
        dispatch(analyticsActions.setTableOptions({
            [location]: data
        }))

        if (data.comparePreviousPeriod) {
            const dateDiff = moment.duration(moment(selectedRangeDate.endDate).diff(moment(selectedRangeDate.startDate)))

            selectCompareDateHandler(moment(selectedRangeDate.startDate, 'YYYY-MM-DD').subtract(1, 'days').subtract(dateDiff), moment(selectedRangeDate.startDate, 'YYYY-MM-DD').subtract(1, 'days'))
        }
    }

    const setChangesHandler = async (data, failed) => {
        onUpdateColumn(data, selectedRows, selectedAllRows, () => {
            setSelectedAllRows(false)
            setSelectedRows([])
        }, failed)
    }
    const resizeColumnHandler = (data) => {
        setColumnsWidth(prevState => ({
            ...prevState,
            [location]: {
                ...prevState[location],
                ...data
            }
        }))
    }

    useEffect(() => {
        deselectAllRows()
    }, [filters, tableRequestParams, localSorterColumn])

    useEffect(() => {
        localStorage.setItem('analyticsColumnsWidth', JSON.stringify(columnsWidth))
    }, [columnsWidth])

    return (
        <section className={'list-section'}>
            <div className={'table-section'}>
                <div className="section-header">
                    {selectedRows.length > 0 && <FastUpdateBlock
                        totalSize={tableData.total_count}
                        location={location}
                        selectedRows={selectedRows}
                        selectedAll={selectedAllRows}
                        columns={columns.columnsWithFilters}

                        onClose={() => {
                            setSelectedAllRows(false)
                            setSelectedRows([])
                        }}
                        onSelectAll={selectAllRows}
                        onSetChanges={setChangesHandler}
                    />}

                    {showFilters && <TableFilters
                        columns={columns.columnsWithFilters}
                        filters={filters}
                        locationKey={location}
                        searchField={searchField}
                    />}

                    {moreActions}

                    {columnSelect && <ColumnsSelect
                        columns={columns.allColumns}
                        defaultColumnsList={columns.allColumns}
                        columnsBlackList={localColumnBlackList}
                        columnsOrder={columnsOrder[location] || columns.allColumns.map(i => i.dataIndex)}

                        onChangeBlackList={changeBlackListHandler}
                        onChangeColumnsOrder={onChangeColumnsOrder}
                    />}

                    <ExpandWorkplace/>

                    {showOptions && <TableOptions
                        options={tableOptions}
                        selectedRangeDate={selectedRangeDate}

                        onChange={changeTableOptionsHandler}
                    />}

                    <button className={'icon-btn download-csv'} onClick={onDownloadCSV}>
                        <i>
                            <SVG id={'download-file'}/>
                        </i>

                        download
                    </button>

                    {dateRange && <DateRange
                        selectedRangeDate={selectedRangeDate}
                        compareDate={compareDate}
                        tableOptions={tableOptions}

                        onChange={dateRangeHandler}
                        onChangeCompareDate={selectCompareDateHandler}
                    />}

                    <SwitchChartVisible/>
                </div>

                <CustomTable
                    loading={fetching}
                    dataSource={tableData.data}
                    {...showTotal && {
                        totalDataSource: {
                            ...metricsData,
                            ...{[showRowSelection ? columns.columnsWithFilters[1].dataIndex : columns.columnsWithFilters[0].dataIndex]: `Total: ${tableData.total_count}`}

                        }
                    }}
                    sorterColumn={localSorterColumn}
                    resizeColumns={user.userDetails.user_type === userTypeEnums.ADMIN || user.userDetails.user_type === userTypeEnums.AGENCY_CLIENT || localStorage.getItem('adminToken')}
                    columns={columns.columnsWithFilters
                        .filter(column => !localColumnBlackList.includes(column.dataIndex))
                        .sort((firstColumn, secondColumn) => {
                            return columnsOrder[location] ? secondColumn.title === 'Active' ? 9999 : columnsOrder[location].findIndex(i => i === firstColumn.dataIndex) - columnsOrder[location].findIndex(i => i === secondColumn.dataIndex) : true
                        })
                    }
                    columnsWidth={columnsWidth[location] || {}}
                    fixedColumns={fixedColumns}
                    expandedRowRender={expandedRowRender ? (props) => expandedRowRender(props, localColumnBlackList, columnsOrder) : undefined}
                    openedRow={openedRow}
                    revertSortingColumns={numberColumns}
                    emptyText={'image'}

                    rowKey={rowKey}
                    {...showRowSelection && {rowSelection: rowSelection}}
                    selectedAll={selectedAllRows}
                    selectedRows={selectedRows}
                    disabledRow={disabledRow}
                    onUpdateField={onUpdateField}

                    onChangeSorter={sortChangeHandler}
                    onResizeColumn={resizeColumnHandler}
                />

                {tableData.total_count !== 0 && showPagination && <Pagination
                    {...{...tableRequestParams, totalSize: tableData.total_count}}

                    pageSizeOptions={[10, 30, 50, 100, 200]}
                    showQuickJumper={true}
                    listLength={tableData.data.length}
                    processing={fetching}

                    onChange={paginationChangeHandler}
                />}
            </div>
        </section>
    )
}

export default React.memo(TableList)
