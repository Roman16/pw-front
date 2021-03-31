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
        dispatch(analyticsActions.setDateRange({startDate: startDate || 'lifetime', endDate: endDate || 'lifetime'}))
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
        setSelectedRows(tableData.map(item => item[rowKey]))
    }


    const rowSelection = {
        onChange: (rowsList) => {
            setSelectedRows(rowsList)
            setSelectedAllRows(false)
        }
    }

    const setChangesHandler = async (key, value) => {
        // await setTableData([...tableData.map(item => {
        //     if (selectedRows.includes(item.campaignId)) {
        //         item[key] = value
        //     }
        //
        //     return item
        // })])

        notification.success({title: 'Success'})
        setSelectedAllRows(false)
        setSelectedRows([])
    }

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

                    <TableOptions
                        options={localTableOptions}
                        onChange={onChangeTableOptions}
                        selectedRangeDate={selectedRangeDate}
                    />

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

                    rowKey={rowKey}
                    {...showRowSelection && {rowSelection: rowSelection}}
                    selectedAll={selectedAllRows}
                    selectedRows={selectedRows}
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
