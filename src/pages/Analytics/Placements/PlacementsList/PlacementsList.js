import React from "react"
import TableFilters from '../../components/TableFilters/TableFilters'
import {
    acosColumn,
    adCvrColumn,
    adOrdersColumn,
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
} from "../../components/tableColumns"
import TableList from "../../components/TableList/TableList"

const columns = [
    {
        title: 'Placement',
        dataIndex: 'placement',
        key: 'placement',
        width: '200px',
        sorter: true,
    },
    {
        title: 'Campaign bidding strategy',
        dataIndex: 'campaign_bidding_strategy',
        key: 'campaign_bidding_strategy',
        width: '250px',
        sorter: true,
    },
    {
        title: 'Bid adjustment',
        dataIndex: 'bid_adjustment',
        key: 'bid_adjustment',
        width: '200px',
        sorter: true,
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


const PlacementsList = () => {


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

export default PlacementsList