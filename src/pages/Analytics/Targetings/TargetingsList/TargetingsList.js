import React from "react"
import TableFilters from '../../components/TableFilters/TableFilters'
import {
    acosColumn,
    adCvrColumn,
    adOrdersColumn,
    adProfitColumn,
    adSalesColumn,
    adSpendColumn,
    adUnitsColumn,
    budgetAllocationColumn,
    clicksColumn,
    cpaColumn,
    cpcColumn,
    ctrColumn,
    impressionsColumn,
    roasColumn,
    salesShareColumn,
    statusColumn
} from "../../components/tableColumns"
import TableList from "../../components/TableList/TableList"


const columns = [
    {
        title: 'Keyword / PT',
        dataIndex: 'keyword_pt',
        key: 'keyword_pt',
        width: '200px',
        sorter: true,
    },
    {
        title: 'Match type',
        dataIndex: 'match_type',
        key: 'match_type',
        width: '150px',
        sorter: true
    },
    {
        ...statusColumn
    },
    {
        title: 'Bid',
        dataIndex: 'bid',
        key: 'bid',
        width: '150px',
        sorter: true
    },
    {
        ...impressionsColumn
    },
    {
        ...clicksColumn
    },
    {
        ...ctrColumn
    },
    {
        ...adSpendColumn
    },
    {
        ...cpcColumn
    },
    {
        ...adSalesColumn
    },
    {
        ...acosColumn
    },
    {
        ...adCvrColumn
    },
    {
        ...cpaColumn
    },
    {
        ...adOrdersColumn
    },
    {
        ...adUnitsColumn
    },
    {
        ...roasColumn
    },
    {
        ...salesShareColumn
    },
    {
        ...budgetAllocationColumn
    },
]


const TargetingsList = () => {


    const sortChangeHandler = (column) => {
        console.log(column)
    }

    const paginationChangeHandler = (column) => {
        console.log(column)
    }

    return (
        <section className={'list-section'}>
            <TableFilters
                columns={columns}
            />

            <TableList
                sortChangeHandler={sortChangeHandler}
                data={[]}
                totalData={[]}
                columns={columns}
                paginationChangeHandler={paginationChangeHandler}
                fixedColumns={[0]}
            />
        </section>
    )
}

export default TargetingsList