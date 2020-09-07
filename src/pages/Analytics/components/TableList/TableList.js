import React from "react"
import CustomTable from "../../../../components/Table/CustomTable"
import Pagination from "../../../../components/Pagination/Pagination"
import {useSelector} from "react-redux"
import _ from 'lodash'
import './TableList.less'

const TableList = ({
                       sortChangeHandler,
                       data,
                       totalData,
                       columns,
                       paginationChangeHandler,
                       fixedColumns,
                       paginationParams = {
                           page: 1,
                           pageSizeOptions: [10, 50, 100],
                           pageSize: 10,
                           totalSize: 0,
                           listLength: 0,
                           processing: false
                       }
                   }) => {

    const {metricsValue} = useSelector(state => ({
        metricsValue: state.dashboard.allMetrics
    }))

    return (
        <>
            <CustomTable
                onChangeSorter={sortChangeHandler}
                // loading={processing}
                dataSource={data}
                totalDataSource={{
                    ..._.chain(metricsValue)
                        .keyBy('key')
                        .mapValues('metric_value')
                        .value(),
                    ...totalData
                }}
                // sorterColumn={sorterColumn}
                columns={columns}
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

export default TableList