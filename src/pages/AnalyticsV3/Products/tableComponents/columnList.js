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
    ctrColumn,
    grossProfitColumn, ICVRColumn,
    impressionsColumn,
    netProfitColumn,
    renderNumberField,
    RenderProduct,
    roasColumn, RPCColumn, RPIColumn,
    salesShareColumn, SBAdSalesColumn, SDAdSalesColumn,
    skuAsinColumn, SPAdSalesColumn,
} from "../../components/TableList/tableColumns"
import {metricKeys} from "../../components/MainMetrics/metricsList"

const getColumns = (location) => [
    {
        title: 'Product',
        dataIndex: 'product_name',
        key: 'product_name',
        width: '300px',
        locked: true,
        sorter: true,
        search: true,
        filter: true,
        render: (name, item) => <RenderProduct
            product={item}
            isParent={location === 'products-parents'}
        />
    },
    skuAsinColumn,
    {
        title: 'Campaigns',
        dataIndex: 'campaigns_count',
        key: 'campaigns_count',
        width: '150px',
        sorter: true,
        noTotal: true,
        align: 'right',
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
        dataIndex: 'total_returns_count',
        key: 'total_returns_count',
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
        title: 'Returned Units',
        dataIndex: 'total_returns_quantity',
        key: 'total_returns_quantity',
        width: '180px',
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
        title: 'Avg. Sale Price',
        dataIndex: 'total_sales_avg_price',
        key: 'total_sales_avg_price',
        width: '160px',
        sorter: true,
        filter: true,
        align: 'right',
        ...renderNumberField('currency')
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
        title: 'Organic Units',
        dataIndex: metricKeys['organicUnits'],
        key: metricKeys['organicUnits'],
        width: '150px',
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
    {
        title: 'Organic Rate',
        dataIndex: metricKeys['organicRate'],
        key: metricKeys['organicRate'],
        width: '180px',
        sorter: true,
        filter: true,
        align: 'right',
        ...renderNumberField('roas')
    },
    adSalesSameSKUColumn,
    adSalesOtherSKUColumn,
    SPAdSalesColumn,
    SDAdSalesColumn,
    SBAdSalesColumn,
    salesShareColumn,
    netProfitColumn,
    grossProfitColumn,
    adProfitColumn,
    {
        title: 'Margin',
        dataIndex: metricKeys['margin'],
        key: metricKeys['margin'],
        width: '150px',
        sorter: true,
        filter: true,
        align: 'right',
        ...renderNumberField('percent')
    },
]

export const columnList = (...args) => ({columnsWithFilters: getColumns(...args), allColumns: getColumns()})


