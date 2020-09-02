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
        title: 'Product',
        dataIndex: 'product',
        key: 'product',
        width: '200px',
        sorter: true,
        render: (campaign, item) => (<Link to={`/analytics/ad-groups?campaignId=${item.id}`}>{campaign}</Link>)
    },
    {
        title: 'SKU/ASIN',
        dataIndex: 'sku_asin',
        key: 'sku_asin',
        width: '200px',
        sorter: true
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
        title: 'MACoS',
        dataIndex: 'campaigns',
        key: 'campaigns',
        width: '150px',
        sorter: true,
        ...renderNumberField('percent')
    },
    {
        ...adCvrColumn
    },
    {
        ...cpaColumn
    },
    {
        title: 'Organic Sales',
        dataIndex: 'organic_sales',
        key: 'organic_sales',
        width: '200px',
        sorter: true,
        ...renderNumberField('currency')
    },
    {
        ...adUnitsColumn
    },
    {
        title: 'Total Units',
        dataIndex: 'total_units',
        key: 'total_units',
        width: '200px',
        sorter: true,
        ...renderNumberField()
    },
    {
        title: 'Total Units Cleared',
        dataIndex: 'total_units_cleared',
        key: 'total_units_cleared',
        width: '200px',
        sorter: true,
        ...renderNumberField()
    },
    {
        title: 'Total Orders',
        dataIndex: 'total_orders',
        key: 'total_orders',
        width: '200px',
        sorter: true,
        ...renderNumberField()
    },
    {
        title: 'Total Orders Cleared',
        dataIndex: 'total_orders_cleared',
        key: 'total_orders_cleared',
        width: '200px',
        sorter: true,
        ...renderNumberField()
    },
    {
        ...adOrdersColumn
    },
    {
        title: 'Organic Orders',
        dataIndex: 'organic_orders',
        key: 'organic_orders',
        width: '200px',
        sorter: true,
        ...renderNumberField()
    },
    {
        title: 'Total Sales',
        dataIndex: 'total_sales',
        key: 'total_sales',
        width: '200px',
        sorter: true,
        ...renderNumberField('currency')
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
        title: 'Returns',
        dataIndex: 'returns',
        key: 'returns',
        width: '150px',
        sorter: true,
        ...renderNumberField()
    },
    {
        title: 'Profit',
        dataIndex: 'profit',
        key: 'profit',
        width: '150px',
        sorter: true,
        ...renderNumberField('currency')
    },
    {
        ...adProfitColumn
    },
]


const ProductsList = () => {
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
                fixedColumns={[0, 1]}
            />
        </section>
    )
}

export default ProductsList