import React, {useEffect, useState} from "react"
import CustomTable from "../../../../components/Table/CustomTable"
import Pagination from "../../../../components/Pagination/Pagination"
import {useDispatch, useSelector} from "react-redux"
import _ from 'lodash'
import '../../components/TableList/TableList.less'
import TableFilters from "../../components/TableFilters/TableFilters"
import DateRange from "../../components/DateRange/DateRange"
import ColumnsSelect from "../../components/TableList/ColumnsSelect"
import TableOptions from "../../components/TableList/TableOptions"
import SwitchChartVisible from "../../components/TableList/SwitchChartVisisble"
import ExpandWorkplace from "../../components/TableList/ExpandWorkplace"
import {analyticsActions} from "../../../../actions/analytics.actions"
import {numberColumns} from '../../components/TableList/tableColumns'
import FastUpdateBlock from "../../components/TableList/FastUpdateBlock/FastUpdateBlock"
import {notification} from "../../../../components/Notification"
import moment from "moment"
import {SVG} from "../../../../utils/icons"

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
                       localTableOptions,
                       tableData,
                       tableRequestParams,
                       onChange,
                       fetching,
                       localSorterColumn,
                       onChangeSorterColumn,
                       onChangeTableOptions,
                       openedRow,
                       showRowSelection,
                       rowKey,
                       onUpdateField,
                       onUpdateColumn,
                       disabledRow,
                       onDownloadCSV
                   }) => {

    const [selectedRows, setSelectedRows] = useState([]),
        [selectedAllRows, setSelectedAllRows] = useState(false)

    const columnsBlackListFromLocalStorage = localStorage.getItem('analyticsColumnsBlackList') && JSON.parse(localStorage.getItem('analyticsColumnsBlackList'))

    const [columnsBlackList, setColumnsBlackList] = useState(columnsBlackListFromLocalStorage ? columnsBlackListFromLocalStorage : {})

    const dispatch = useDispatch()

    const {selectedRangeDate} = useSelector(state => ({
        selectedRangeDate: state.analytics.selectedRangeDate,
    }))

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

    const changeBlackListHandler = (list) => {
        setColumnsBlackList({
            ...columnsBlackList,
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

    const selectAllRows = () => {
        setSelectedAllRows(true)
        setSelectedRows(tableData.response.map(item => item[rowKey]))
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

    const setChangesHandler = async (data, failed) => {
        onUpdateColumn(data, selectedRows, selectedAllRows, () => {
            setSelectedAllRows(false)
            setSelectedRows([])
        }, failed)
    }

    useEffect(() => {
        deselectAllRows()
    }, [filters, tableRequestParams, localSorterColumn])

    return (
        <section className={'list-section'}>
            <div className={'table-section'}>
                <div className="section-header">
                    {selectedRows.length > 0 && <FastUpdateBlock
                        totalSize={tableData.total_count}
                        location={location}
                        selectedRows={selectedRows}
                        selectedAll={selectedAllRows}
                        columns={columns}

                        onClose={() => {
                            setSelectedAllRows(false)
                            setSelectedRows([])
                        }}
                        onSelectAll={selectAllRows}
                        onSetChanges={setChangesHandler}
                    />}

                    {showFilters && <TableFilters
                        columns={columns}
                        filters={filters}
                        locationKey={location}
                        searchField={searchField}
                    />}

                    {moreActions}

                    {columnSelect && <ColumnsSelect
                        columns={columns}
                        columnsBlackList={localColumnBlackList}
                        onChangeBlackList={changeBlackListHandler}
                    />}

                    <ExpandWorkplace/>

                    {showOptions && <TableOptions
                        options={localTableOptions}
                        onChange={onChangeTableOptions}
                        selectedRangeDate={selectedRangeDate}
                    />}

                    <button className={'icon-btn download-csv'} onClick={onDownloadCSV}>
                        <i>
                            <SVG id={'download-file'}/>
                        </i>

                        download CSV
                    </button>

                    {dateRange && <DateRange
                        onChange={dateRangeHandler}
                        selectedRangeDate={selectedRangeDate}
                        tableOptions={localTableOptions}
                    />}

                    <SwitchChartVisible/>
                </div>

                <CustomTable
                    loading={fetching}
                    dataSource={tableData.response}
                    {...showTotal && {
                        totalDataSource: {
                            ..._.mapValues(metricsData, (value) => (+value.value)),
                            ...{[showRowSelection ? columns[1].dataIndex : columns[0].dataIndex]: `Total: ${tableData.total_count}`}

                        }
                    }}
                    sorterColumn={localSorterColumn}
                    columns={columns.filter(column => !localColumnBlackList.includes(column.key))}
                    fixedColumns={fixedColumns}
                    expandedRowRender={expandedRowRender ? (props) => expandedRowRender(props, localColumnBlackList) : undefined}
                    openedRow={openedRow}
                    onChangeSorter={sortChangeHandler}
                    revertSortingColumns={numberColumns}
                    emptyText={'image'}

                    rowKey={rowKey}
                    {...showRowSelection && {rowSelection: rowSelection}}
                    selectedAll={selectedAllRows}
                    selectedRows={selectedRows}
                    disabledRow={disabledRow}
                    onUpdateField={onUpdateField}
                />

                {tableData.total_count !== 0 && showPagination && <Pagination
                    {...{...tableRequestParams, totalSize: tableData.total_count}}

                    pageSizeOptions={[10, 30, 50, 100, 200]}
                    showQuickJumper={true}
                    listLength={tableData.response.length}
                    processing={fetching}

                    onChange={paginationChangeHandler}
                />}
            </div>
        </section>
    )
}

export default React.memo(TableList)
