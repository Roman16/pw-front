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

let fullResponse = []

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

    const [tableData, setTableData] = useState([]),
        [fetchingStatus, setFetchingStatus] = useState(false),
        [paginationParams, setPaginationParams] = useState({
            page: 1,
            pageSize: 30,
            totalSize: 0,
        }),
        [sorterColumn, setSorterColumn] = useState()

    const {locationKey, mainState, selectedRangeDate, metricsData} = useSelector(state => ({
        locationKey: state.analytics.location,
        mainState: state.analytics.mainState,
        selectedRangeDate: state.analytics.selectedRangeDate,
        metricsData: state.analytics.metricsData
    }))

    const columnsBlackList = useSelector(state => state.analytics.columnsBlackList[locationKey] || [])
    const filters = useSelector(state => state.analytics.filters[locationKey] || [])


    const sortChangeHandler = (column) => {

        if (sorterColumn && sorterColumn.column === column) {
            if (sorterColumn.type === 'desc') {
                setSorterColumn({
                    column: column,
                    type: 'asc'
                })
            } else if (sorterColumn.type === 'asc') {
                setSorterColumn({
                    column: null,
                    type: 'desc'
                })
            }
        } else {
            setSorterColumn({
                column: column,
                type: 'desc'
            })
        }

        setPaginationParams({
            ...paginationParams,
            page: 1,
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

            const res = await analyticsServices.fetchTableData(locationKey, paginationParams, sorterColumn, filtersWithState, source.token)

            setPaginationParams({
                ...paginationParams,
                totalSize: res.total_count
            })

            if (res.response) {
                setTableData(res.response)
                // fullResponse = res.response
            }



            setFetchingStatus(false)
        } catch (e) {

        }
    }

    useEffect(() => {
        getData()
    }, [locationKey, paginationParams.page, paginationParams.pageSize, sorterColumn, mainState, selectedRangeDate])

    // const scrollHandler = (e) => {
    //     if(e.target.scrollTop > 1500) {
    //         setTableData(fullResponse.slice(0, 500))
    //     } else if(e.target.scrollTop > 1000) {
    //         setTableData(fullResponse.slice(0, 200))
    //     } else if(e.target.scrollTop > 500) {
    //         setTableData(fullResponse.slice(0, 100))
    //     }
    // }

    useEffect(() => {
        setPaginationParams({
            ...paginationParams,
            page: 1
        })
        getData()
    }, [filters])


    return (
        <>
            <div className="section-header">
                {showFilters && <TableFilters
                    columns={columns}
                    filters={filters}
                    locationKey={locationKey}
                />}

                {moreActions}

                {columnSelect && <ColumnsSelect
                    columns={columns}
                    columnsBlackList={columnsBlackList}
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
                sorterColumn={sorterColumn}
                columns={columns.filter(column => !columnsBlackList.includes(column.key))}
                fixedColumns={fixedColumns}
                // onScroll={scrollHandler}
                // rowClassName={(item) => !item.viewed && 'new-report'}
            />

            {paginationParams.totalSize !== 0 && showPagination && <Pagination
                onChange={paginationChangeHandler}

                pageSizeOptions={[10, 30, 50, 100, 200]}
                showQuickJumper={true}
                listLength={tableData.length}
                processing={fetchingStatus}

                {...paginationParams}
            />}
        </>
    )
}

export default React.memo(TableList)
