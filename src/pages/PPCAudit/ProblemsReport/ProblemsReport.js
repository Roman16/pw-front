import React from "react"
import './ProblemsReport.less'
import Filters from "./Filters"
import CustomTable from "../../../components/Table/CustomTable"

const columns = [
    {
        title: 'Et at erat',
        dataIndex: 'datetime',
        key: 'datetime',
    },
    {
        title: 'Et at erat',
        dataIndex: 'datetime',
        key: 'datetime',
    },
    {
        title: 'Et at erat',
        dataIndex: 'datetime',
        key: 'datetime',
    },
    {
        title: 'Et at erat',
        dataIndex: 'datetime',
        key: 'datetime',
    },
]

const ProblemsReport = ({problems}) => {

    return (<div className={'problems-report'}>
        <Filters/>

        <div className="table-block">
            <CustomTable
                // onChangeSorter={sortChangeHandler}
                // loading={processing}
                dataSource={[]}
                // sorterColumn={sorterColumn}
                emptyText={'image'}

                columns={columns}
                rowClassName={(item) => !item.viewed && 'new-report'}
            />
        </div>
    </div>)
}

export default ProblemsReport