import React, {useEffect, useState} from "react"
import CustomTable from "../../../../components/Table/CustomTable"
import Pagination from "../../../../components/Pagination/Pagination"
import {useSelector} from "react-redux"
import _ from 'lodash'
import './TableList.less'
import {analyticsServices} from "../../../../services/analytics.services"
import TableFilters from "../TableFilters/TableFilters"
import DateRange from "../DateRange/DateRange"
import ColumnsSelect from "../ColumnsSelect/ColumnsSelect"
import axios from "axios"

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1)
}

const CancelToken = axios.CancelToken
let source = null


const TableList = ({
                       columns,
                       fixedColumns,
                       columnSelect = true,
                       dateRange = true,
                       showFilters = true,
                       showPagination = true,
                       moreActions,
                       showTotal = true
                   }) => {

    const columnsBlackListFromLocalStorage = localStorage.getItem('analyticsColumnsBlackList') && JSON.parse(localStorage.getItem('analyticsColumnsBlackList')),
        sorterColumnFromLocalStorage = localStorage.getItem('analyticsSorterColumn') && JSON.parse(localStorage.getItem('analyticsSorterColumn'))

    const [tableData, setTableData] = useState([]),
        [fetchingStatus, setFetchingStatus] = useState(false),
        [columnsBlackList, setColumnsBlackList] = useState(columnsBlackListFromLocalStorage ? columnsBlackListFromLocalStorage : {}),
        [sorterColumn, setSorterColumn] = useState(sorterColumnFromLocalStorage ? sorterColumnFromLocalStorage : {}),
        [paginationParams, setPaginationParams] = useState({
            page: 1,
            pageSize: 30,
            totalSize: 0,
        })


    const {locationKey, mainState, selectedRangeDate, metricsData} = useSelector(state => ({
        locationKey: state.analytics.location,
        mainState: state.analytics.mainState,
        selectedRangeDate: state.analytics.selectedRangeDate,
        metricsData: state.analytics.metricsData
    }))

    const localColumnBlackList = columnsBlackList[locationKey] || [],
        localSorterColumn = sorterColumn[locationKey] || undefined,
        filters = useSelector(state => state.analytics.filters[locationKey] || [])


    const sortChangeHandler = (column) => {
        const setColumn = (data) => {
            setSorterColumn({
                ...sorterColumn,
                [locationKey]: data
            })
        }

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

        setPaginationParams({
            ...paginationParams,
            page: 1,
        })
    }

    const changeBlackListHandler = (list) => {
        setColumnsBlackList({
            ...columnsBlackList,
            [locationKey]: list
        })
    }

    const paginationChangeHandler = (params) => {
        setPaginationParams(prevState => ({
            ...prevState,
            ...params
        }))
    }

    const getData = async () => {
        document.querySelector('.table-overflow').scrollTop = 0

        setFetchingStatus(true)

        source && source.cancel()
        source = CancelToken.source()

        try {
            const filtersWithState = [
                ...filters,
                ...Object.keys(mainState).map(key => ({
                    filterBy: key,
                    type: 'eq',
                    value: mainState[key]
                })).filter(item => !!item.value),
                {
                    filterBy: 'datetime',
                    type: 'range',
                    value: selectedRangeDate
                },
            ]

            const res = await analyticsServices.fetchTableData(locationKey, paginationParams, localSorterColumn, filtersWithState, source.token)

            setPaginationParams({
                ...paginationParams,
                totalSize: res.total_count
            })

            if (res.response) {
                setTableData(res.response)
            }
            setFetchingStatus(false)

        } catch (e) {

        }
    }

    useEffect(() => {
        getData()
    }, [locationKey, paginationParams.page, paginationParams.pageSize, sorterColumn, mainState, selectedRangeDate])

    useEffect(() => {
        setPaginationParams({
            ...paginationParams,
            page: 1
        })
        getData()
    }, [filters])

    useEffect(() => {
        localStorage.setItem('analyticsColumnsBlackList', JSON.stringify(columnsBlackList))
    }, [columnsBlackList])

    useEffect(() => {
        localStorage.setItem('analyticsSorterColumn', JSON.stringify(sorterColumn))
    }, [sorterColumn])


    return (
        <div className={'table-section'}>
            <div className="section-header">
                {showFilters && <TableFilters
                    columns={columns}
                    filters={filters}
                    locationKey={locationKey}
                />}

                {moreActions}

                {columnSelect && <ColumnsSelect
                    columns={columns}
                    columnsBlackList={localColumnBlackList}
                    onChangeBlackList={changeBlackListHandler}
                />}

                {dateRange && <DateRange/>}
            </div>

            <CustomTable
                onChangeSorter={sortChangeHandler}
                loading={fetchingStatus}
                dataSource={tableData}
                {...showTotal && {
                    totalDataSource: {
                        ..._.mapValues(metricsData, (value) => (+value.value)),
                        ...{[columns[0].dataIndex]: `Total: ${paginationParams.totalSize}`}
                    }
                }}
                sorterColumn={localSorterColumn}
                columns={columns.filter(column => !localColumnBlackList.includes(column.key))}
                fixedColumns={fixedColumns}
            />

            {paginationParams.totalSize !== 0 && showPagination && <Pagination
                onChange={paginationChangeHandler}

                pageSizeOptions={[10, 30, 50, 100, 200]}
                showQuickJumper={true}
                listLength={tableData.length}
                processing={fetchingStatus}

                {...paginationParams}
            />}
        </div>
    )
}

export default React.memo(TableList)
