import React, {useEffect, useState} from "react"
import CustomTable from "../../../../components/Table/CustomTable"
import Pagination from "../../../../components/Pagination/Pagination"
import {useSelector} from "react-redux"
import _ from 'lodash'
import './TableList.less'
import {analyticsServices} from "../../../../services/analytics.services"
import TableFilters from "../TableFilters/TableFilters"
import {Popover} from "antd"
import {SVG} from "../../../../utils/icons"
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
        [paginationParams, setPaginationParams] = useState({
            page: 1,
            pageSizeOptions: [10, 50, 100],
            pageSize: 10,
            totalSize: 0,
            listLength: 0,
            processing: false
        })

    const {metricsValue, locationKey} = useSelector(state => ({
        metricsValue: state.dashboard.allMetrics,
        locationKey: state.analytics.location,
    }))

    const columnsBlackList = useSelector(state => state.analytics.columnsBlackList[locationKey] || [])
    const filters = useSelector(state => state.analytics.filters[locationKey] || [])


    const sortChangeHandler = () => {

    }
    const paginationChangeHandler = () => {

    }

    const getData = async () => {
        document.querySelector('.table-overflow').scrollTop = 0

        try {
            const res = await analyticsServices[`fetch${locationKey.capitalize()}List`]()
            setTableData(res.result)
            setPaginationParams({
                ...paginationParams,
                totalSize: res.totalSize
            })
        } catch (e) {

        }
    }

    useEffect(() => {
        getData()
    }, [locationKey])

    return (
        <>
            <TableFilters
                columns={columns}
                filters={filters}
            />

            {columnSelect && <ColumnsSelect
                columns={columns}
                columnsBlackList={columnsBlackList}
            />}

            <DateRange/>

            <CustomTable
                onChangeSorter={sortChangeHandler}
                // loading={processing}
                dataSource={tableData}
                totalDataSource={{
                    ..._.chain(metricsValue)
                        .keyBy('key')
                        .mapValues('metric_value')
                        .value(),
                    ...{
                        [columns[0].dataIndex]: `Total: ${paginationParams.totalSize}`
                    }
                }}
                // sorterColumn={sorterColumn}
                columns={columns.filter(column => !columnsBlackList.includes(column.key))}
                fixedColumns={fixedColumns}
                // rowClassName={(item) => !item.viewed && 'new-report'}
            />

            {paginationParams.totalSize !== 0 && <Pagination
                onChange={paginationChangeHandler}
                {...paginationParams}
            />}

            {/*<Pagination*/}
            {/*    onChange={paginationChangeHandler}*/}
            {/*    page={paginationParams.page}*/}
            {/*    pageSizeOptions={[25, 50, 100, 200]}*/}
            {/*    pageSize={paginationParams.pageSize}*/}
            {/*    totalSize={totalSize}*/}
            {/*    listLength={reportsList.length}*/}
            {/*    processing={processing}*/}
            {/*/>*/}
        </>
    )
}

export default React.memo(TableList)