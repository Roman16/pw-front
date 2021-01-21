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
    renderNumberField, RenderProduct,
    roasColumn,
    salesShareColumn, skuAsinColumn,
} from "../../components/TableList/tableColumns"
import TableList from "../../components/TableList/TableList"
import './ProductMetrics.less'

const ProductMetrics = ({location, isParent}) => {
    const columns = [
        // ...isParent ? [
        //     {
        //         title: 'Product',
        //         dataIndex: 'product_name',
        //         key: 'product_name',
        //         width: '300px',
        //         sorter: true,
        //         locked: true,
        //         search: true,
        //         render: (name, item) => <RenderProduct
        //             product={item}
        //         />
        //     },
        //     skuAsinColumn,
        // ] : [],
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
            align: 'right',
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
            align: 'right',
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
            title: 'Total Orders Cleared',
            dataIndex: 'total_orders_count_cleared',
            key: 'total_orders_count_cleared',
            width: '200px',
            sorter: true,
            filter: true,
            align: 'right',
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
            align: 'right',
            ...renderNumberField()
        },
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


    return (
        <section className={'list-section'}>
            <TableList
                columns={columns}
                showFilters={false}
                showPagination={false}
                showTotal={false}
                location={location}
            />
        </section>
    )
}

export default ProductMetrics
