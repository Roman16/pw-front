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
    ctrColumn, grossProfitColumn,
    impressionsColumn, netProfitColumn,
    renderNumberField, RenderProduct,
    roasColumn,
    salesShareColumn, skuAsinColumn,
} from "../../components/TableList/tableColumns"
import TableList from "../../components/TableList/TableList"
import {useSelector} from "react-redux"
import _ from 'lodash'

const ProductsList = ({location}) => {
    const filters = useSelector(state => state.analytics.filters['products'])

    const columns = [
        {
            title: 'Product',
            dataIndex: 'product_name_sku_asin',
            key: 'product_name_sku_asin',
            width: '300px',
            locked: true,
            sorter: true,
            search: true,
            render: (name, item) => <RenderProduct
                product={item}
                isParent={_.find(filters, {filterBy: 'productView'}) && _.find(filters, {filterBy: 'productView'}).value === 'parent'}
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
            title: 'Avg. Sale Price',
            dataIndex: 'total_sales_avg_price',
            key: 'total_sales_avg_price',
            width: '150px',
            sorter: true,
            filter: true,
            align: 'right',
            ...renderNumberField('currency')
        },
        netProfitColumn,
        grossProfitColumn,
        adProfitColumn
    ]


    return (
        <section className={'list-section'}>
            <TableList
                columns={columns}
                fixedColumns={[0, 1]}
                location={location}
            />
        </section>
    )
}

export default ProductsList
