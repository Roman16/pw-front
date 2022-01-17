import React from "react"
import {
    acosColumn,
    adCvrColumn,
    adOrdersColumn,
    adProfitColumn,
    adSalesColumn, adSalesOtherSKUColumn, adSalesSameSKUColumn,
    adSpendColumn,
    adUnitsColumn,
    budgetAllocationColumn,
    clicksColumn,
    cpaColumn,
    cpcColumn, CPMColumn,
    ctrColumn, ICVRColumn,
    impressionsColumn,
    renderNumberField,
    RenderProduct,
    roasColumn, RPCColumn, RPIColumn,
    salesShareColumn,
    skuAsinColumn,
} from "../../components/TableList/tableColumns"
import './ProductMetrics.less'

export const columnList = (location, isParent) => [
    ...isParent ? [
        {
            title: 'Product',
            dataIndex: 'product_name',
            key: 'product_name',
            width: '300px',
            sorter: true,
            locked: true,
            search: true,
            render: (name, item) => <RenderProduct
                product={item}
            />
        },
        skuAsinColumn,
    ] : [],
    {
        title: 'Campaigns',
        dataIndex: 'campaigns_count',
        key: 'campaigns_count',
        width: '150px',
        sorter: true,
        noTotal: true,
        filter: true,
        ...renderNumberField('number', false)
    },
    {
        title: 'Total Orders',
        dataIndex: 'total_orders_count',
        key: 'total_orders_count',
        width: '150px',
        sorter: true,
        filter: true,
        align: 'right',
        ...renderNumberField()
    },
    {
        title: 'Returns',
        dataIndex: 'total_returns_quantity',
        key: 'total_returns_quantity',
        width: '150px',
        sorter: true,
        filter: true,
        align: 'right',
        ...renderNumberField()
    },
    {
        title: 'Total Orders Cleared',
        dataIndex: 'total_orders_count_cleared',
        key: 'total_orders_count_cleared',
        width: '200px',
        sorter: true,
        filter: true,
        align: 'right',
        ...renderNumberField()
    },
    {
        title: 'Total Units',
        dataIndex: 'total_ordered_quantity',
        key: 'total_ordered_quantity',
        width: '150px',
        sorter: true,
        filter: true,
        align: 'right',
        ...renderNumberField()
    },
    {
        title: 'Total Units Cleared',
        dataIndex: 'total_ordered_quantity_cleared',
        key: 'total_ordered_quantity_cleared',
        width: '200px',
        sorter: true,
        filter: true,
        align: 'right',
        ...renderNumberField()
    },
    {
        title: 'Total Sales',
        dataIndex: 'total_sales',
        key: 'total_sales',
        width: '200px',
        sorter: true,
        filter: true,
        align: 'right',
        ...renderNumberField('currency')
    },
    {
        title: 'MACoS',
        dataIndex: 'macos',
        key: 'macos',
        width: '100px',
        sorter: true,
        filter: true,
        align: 'right',
        ...renderNumberField('percent')
    },
    {
        title: 'Organic Orders',
        dataIndex: 'organic_orders_count',
        key: 'organic_orders_count',
        width: '200px',
        sorter: true,
        filter: true,
        align: 'right',
        ...renderNumberField()
    },
    {
        title: 'Organic Sales',
        dataIndex: 'organic_sales',
        key: 'organic_sales',
        width: '180px',
        sorter: true,
        filter: true,
        align: 'right',
        ...renderNumberField('currency')
    },
    impressionsColumn,
    clicksColumn,
    ctrColumn,
    adSpendColumn,
    cpcColumn,
    CPMColumn,
    budgetAllocationColumn,
    adOrdersColumn,
    cpaColumn,
    adCvrColumn,
    ICVRColumn,
    adUnitsColumn,
    adSalesColumn,
    acosColumn,
    roasColumn,
    RPCColumn,
    RPIColumn,
    adSalesSameSKUColumn,
    adSalesOtherSKUColumn,
    salesShareColumn,
    {
        title: 'Profit',
        dataIndex: 'organic_profit',
        key: 'organic_profit',
        width: '150px',
        sorter: true,
        filter: true,
        align: 'right',
        ...renderNumberField('currency')
    },
    {
        title: 'Gross Profit',
        dataIndex: 'organic_profit_gross',
        key: 'organic_profit_gross',
        width: '150px',
        sorter: true,
        filter: true,
        align: 'right',
        ...renderNumberField('currency')
    },
    adProfitColumn
]
