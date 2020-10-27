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

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1)
}

const TableList = ({
                       columns,
                       fixedColumns,
                       columnSelect = true
                   }) => {

    const [tableData, setTableData] = useState([]),
        [fetchingStatus, setFetchingStatus] = useState(false),
        [paginationParams, setPaginationParams] = useState({
            page: 1,
            pageSize: 25,
            totalSize: 0,
        }),
        [sorterColumn, setSorterColumn] = useState()

    const {locationKey, mainState, selectedRangeDate} = useSelector(state => ({
        locationKey: state.analytics.location,
        mainState: state.analytics.mainState,
        selectedRangeDate: state.analytics.selectedRangeDate,
    }))

    const metricsState = useSelector(state => state.analytics.metricsState && state.analytics.metricsState[locationKey])

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


            const res = await analyticsServices.fetchTableData(locationKey,paginationParams, sorterColumn, filtersWithState)
            if(res.response) {
                setTableData(res.response)
            }

            setPaginationParams({
                ...paginationParams,
                totalSize: res.total_count
            })

            setFetchingStatus(false)
        } catch (e) {

        }
    }

    useEffect(() => {
        getData()
    }, [locationKey, paginationParams.page, paginationParams.pageSize, sorterColumn, filters, mainState, selectedRangeDate])

    return (
        <>
            <div className="section-header">
                <TableFilters
                    columns={columns}
                    filters={filters}
                />

                {columnSelect && <ColumnsSelect
                    columns={columns}
                    columnsBlackList={columnsBlackList}
                />}

                <DateRange/>
            </div>

            <CustomTable
                onChangeSorter={sortChangeHandler}
                loading={fetchingStatus}
                dataSource={tableData}
                totalDataSource={{
                    ..._.chain(metricsState.allMetrics)
                        .keyBy('key')
                        .mapValues('metric_value')
                        .value(),
                    ...{
                        [columns[0].dataIndex]: `Total: ${paginationParams.totalSize}`
                    }
                }}
                sorterColumn={sorterColumn}
                columns={columns.filter(column => !columnsBlackList.includes(column.key))}
                fixedColumns={fixedColumns}
                // rowClassName={(item) => !item.viewed && 'new-report'}
            />

            {paginationParams.totalSize !== 0 && <Pagination
                onChange={paginationChangeHandler}

                pageSizeOptions={[25, 50, 100]}
                listLength={tableData.length}
                processing={fetchingStatus}

                {...paginationParams}
            />}
        </>
    )
}

export default React.memo(TableList)
