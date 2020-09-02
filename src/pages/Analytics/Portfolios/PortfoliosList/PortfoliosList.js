import React from "react"
import CustomTable from "../../../../components/Table/CustomTable"
import Pagination from "../../../../components/Pagination/Pagination"
import {SVG} from "../../../../utils/icons"
import TableFilters from '../../components/TableFilters/TableFilters'
import {Link} from "react-router-dom"
import {
    acosColumn, adCvrColumn, adOrdersColumn, adProfitColumn,
    adSalesColumn,
    adSpendColumn, adUnitsColumn, budgetAllocationColumn,
    clicksColumn, cpaColumn, cpcColumn,
    ctrColumn,
    dateColumn,
    impressionsColumn, renderNumberField, roasColumn, salesShareColumn,
    statusColumn
} from "../../components/tableColumns"
import DateRange from "../../components/DateRange/DateRange"
import TableList from "../../components/TableList/TableList"


const columns = [
    {
        title: 'Portfolio',
        dataIndex: 'portfolio',
        key: 'portfolio',
        width: '200px',
        sorter: true,
        render: (portfolio, item) => (<Link to={`/analytics/ad-groups?campaignId=${item.id}`}>{portfolio}</Link>)
    },
    {
        title: 'Campaigns',
        dataIndex: 'campaigns',
        key: 'campaigns',
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
    {
        ...adProfitColumn
    },
]


const PortfoliosList = () => {


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

export default PortfoliosList