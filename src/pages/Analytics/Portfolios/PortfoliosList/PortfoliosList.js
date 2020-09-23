import React from "react"
import TableFilters from '../../components/TableFilters/TableFilters'
import {Link} from "react-router-dom"
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
} from "../../components/tableColumns"
import TableList from "../../components/TableList/TableList"


const columns = [
    {
        title: 'Portfolio',
        dataIndex: 'portfolio',
        key: 'portfolio',
        width: '200px',
        sorter: true,
        locked: true,
        render: (portfolio, item) => (<Link to={`/analytics/campaigns?portfolioId=${item.id}`}>{portfolio}</Link>)
    },
    {
        title: 'Campaigns',
        dataIndex: 'campaigns_count',
        key: 'campaigns_count',
        width: '150px',
        sorter: true,
        locked: true,
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

    return (
        <section className={'list-section'}>
            <TableList
                columns={columns}
                fixedColumns={[0]}
            />
        </section>
    )
}

export default PortfoliosList