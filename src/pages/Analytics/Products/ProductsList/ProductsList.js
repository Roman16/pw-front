import React from "react"
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
    cpaColumn, cpcColumn,
    ctrColumn,
    impressionsColumn,
    renderNumberField,
    roasColumn,
    salesShareColumn,
} from "../../components/TableList/tableColumns"
import TableList from "../../components/TableList/TableList"
import {Switch} from "antd"

const columns = [
    {
        title: 'Product',
        dataIndex: 'product',
        key: 'product',
        width: '200px',
        locked: true,
        sorter: true,
        search: true,
        render: (product, item) => (<Link to={`/analytics/overview?productId=${item.id}`}>{product}</Link>)
    },
    {
        title: 'SKU/ASIN',
        dataIndex: 'sku_asin',
        key: 'sku_asin',
        width: '200px',
        locked: true,
        sorter: true
    },
    {
        title: 'Campaigns',
        dataIndex: 'campaigns',
        key: 'campaigns',
        width: '150px',
        sorter: true
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
        dataIndex: 'MACoS',
        key: 'MACoS',
        width: '150px',
        sorter: true,
        ...renderNumberField('percent')
    },
    adCvrColumn,
    cpaColumn,
    {
        title: 'Organic Sales',
        dataIndex: 'organic_sales',
        key: 'organic_sales',
        width: '200px',
        sorter: true,
        ...renderNumberField('currency')
    },
    adUnitsColumn,
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
    adOrdersColumn,
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
    roasColumn,
    salesShareColumn,
    budgetAllocationColumn,
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
    adProfitColumn
]

const ChangeProductsRequest = () => {

    return(<div className={'switch-products-type'}>
        <Switch/>

        <label htmlFor="">Only parents</label>
    </div>)
}

const ProductsList = () => {
    return (
        <section className={'list-section'}>
            <TableList
                columns={columns}
                fixedColumns={[0, 1]}
                moreActions={<ChangeProductsRequest/>}
            />
        </section>
    )
}

export default ProductsList
