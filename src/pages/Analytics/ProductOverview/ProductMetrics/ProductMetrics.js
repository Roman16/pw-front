import React from "react"
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
    cpaColumn, cpcColumn,
    ctrColumn,
    impressionsColumn,
    renderNumberField,
    roasColumn,
    salesShareColumn,
} from "../../components/TableList/tableColumns"
import TableList from "../../components/TableList/TableList"
import './ProductMetrics.less'

const ProductMetrics = () => {
    const columns = [
        {
            title: 'Campaigns',
            dataIndex: 'campaigns_count',
            key: 'campaigns_count',
            width: '150px',
            sorter: true,
            noTotal: true,
            filter: true,
            ...renderNumberField()
        },
        impressionsColumn,
        clicksColumn,
        ctrColumn,
        adSpendColumn,
        cpcColumn,
        adSalesColumn,
        acosColumn,
        {
            title: 'MACoS',
            dataIndex: 'macos',
            key: 'macos',
            width: '100px',
            sorter: true,
            filter: true,
            ...renderNumberField('percent')
        },
        adCvrColumn,
        cpaColumn,
        {
            title: 'Organic Sales',
            dataIndex: 'organic_sales',
            key: 'organic_sales',
            width: '180px',
            sorter: true,
            filter: true,
            ...renderNumberField('currency')
        },
        adUnitsColumn,
        {
            title: 'Total Units',
            dataIndex: 'total_ordered_quantity',
            key: 'total_ordered_quantity',
            width: '150px',
            sorter: true,
            filter: true,
            ...renderNumberField()
        },
        {
            title: 'Total Units Cleared',
            dataIndex: 'total_ordered_quantity_cleared',
            key: 'total_ordered_quantity_cleared',
            width: '200px',
            sorter: true,
            filter: true,
            ...renderNumberField()
        },
        {
            title: 'Total Orders',
            dataIndex: 'total_orders_count',
            key: 'total_orders_count',
            width: '150px',
            sorter: true,
            filter: true,
            ...renderNumberField()
        },
        {
            title: 'Total Orders Cleared',
            dataIndex: 'total_orders_count_cleared',
            key: 'total_orders_count_cleared',
            width: '200px',
            sorter: true,
            filter: true,
            ...renderNumberField()
        },
        adOrdersColumn,
        {
            title: 'Organic Orders',
            dataIndex: 'organic_orders_count',
            key: 'organic_orders_count',
            width: '200px',
            sorter: true,
            filter: true,
            ...renderNumberField()
        },
        {
            title: 'Total Sales',
            dataIndex: 'total_sales',
            key: 'total_sales',
            width: '200px',
            sorter: true,
            filter: true,
            ...renderNumberField('currency')
        },
        roasColumn,
        salesShareColumn,
        budgetAllocationColumn,
        {
            title: 'Returns',
            dataIndex: 'total_returns_quantity',
            key: 'total_returns_quantity',
            width: '150px',
            sorter: true,
            filter: true,
            ...renderNumberField()
        },
        {
            title: 'Profit',
            dataIndex: 'organic_profit',
            key: 'organic_profit',
            width: '150px',
            sorter: true,
            filter: true,
            ...renderNumberField('currency')
        },
        {
            title: 'Gross Profit',
            dataIndex: 'organic_profit_gross',
            key: 'organic_profit_gross',
            width: '150px',
            sorter: true,
            filter: true,
            ...renderNumberField('currency')
        },
        adProfitColumn
    ]


    return (
        <section className={'list-section'}>
            <TableList
                columns={columns}
                showFilters={false}
                showPagination={false}
                showTotal={false}
            />
        </section>
    )
}

export default ProductMetrics
