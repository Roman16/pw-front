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
import {Select} from "antd"
import {numberMask} from "../../../../utils/numberMask"
import {useDispatch, useSelector} from "react-redux"
import {analyticsActions} from "../../../../actions/analytics.actions"
import CustomSelect from "../../../../components/Select/Select"
import _ from 'lodash'

const Option = Select.Option

const ChangeProductsRequest = () => {
    const dispatch = useDispatch()

    const locationKey = useSelector(state => state.analytics.location)
    const filters = useSelector(state => state.analytics.filters[locationKey] || [])

    const changeTypeHandler = (value) => {
        if (_.find(filters, {filterBy: 'productView'})) {
            dispatch(analyticsActions.updateFiltersList([...filters.map(filter => {
                if (filter.filterBy === 'productView') {
                    filter = {
                        filterBy: 'productView',
                        type: 'type',
                        value: value
                    }
                }
                return filter
            })]))
        } else {
            dispatch(analyticsActions.updateFiltersList([...filters, {
                filterBy: 'productView',
                type: 'type',
                value: value
            }]))
        }
    }

    return (<div className={'switch-products-type'}>
        <CustomSelect
            value={_.find(filters, {filterBy: 'productView'}) ? _.find(filters, {filterBy: 'productView'}).value : 'regular'}
            onChange={changeTypeHandler}>
            <Option value={'regular'}>Regular view</Option>
            <Option value={'parent'}>Parents view</Option>
        </CustomSelect>
    </div>)
}

const ProductsList = () => {
    const dispatch = useDispatch()

    const setStateHandler = (location, state) => {
        dispatch(analyticsActions.setLocation(location))
        dispatch(analyticsActions.setMainState(state))
    }

    const columns = [
        {
            title: 'Product',
            dataIndex: 'product',
            key: 'product',
            width: '350px',
            locked: true,
            sorter: true,
            search: true,
            noTotal: true,
            render: (name, item) => <Link
                to={`/analytics/overview?productId=${item.product_id}`}
                className="product-field"
                onClick={() => setStateHandler('ad-groups', {
                    name: {productName: name},
                    productId: item.product_id
                })}
            >
                {item.product_image && <img src={item.product_image} alt=""/>}

                <div className="col">
                    <h4 title={item.product_name}>{item.product_name}</h4>
                    <p>{item.product_price !== null && `$${numberMask(item.product_price, 2)}`}</p>
                </div>
            </Link>
        },
        {
            title: 'SKU/ASIN',
            dataIndex: 'sku_asin',
            key: 'sku_asin',
            width: '250px',
            locked: true,
            sorter: true,
            noTotal: true,
            render: (text, item) => <div><b>SKU:</b> {item.sku} <br/> <b>ASIN:</b> {item.asin}</div>
        },
        {
            title: 'Campaigns',
            dataIndex: 'campaigns_count',
            key: 'campaigns_count',
            width: '150px',
            sorter: true,
            noTotal: true,
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
            ...renderNumberField('currency')
        },
        adUnitsColumn,
        {
            title: 'Total Units',
            dataIndex: 'total_ordered_quantity',
            key: 'total_ordered_quantity',
            width: '150px',
            sorter: true,
            ...renderNumberField()
        },
        {
            title: 'Total Units Cleared',
            dataIndex: 'total_ordered_quantity_cleared',
            key: 'total_ordered_quantity_cleared',
            width: '200px',
            sorter: true,
            ...renderNumberField()
        },
        {
            title: 'Total Orders',
            dataIndex: 'total_orders_count',
            key: 'total_orders_count',
            width: '150px',
            sorter: true,
            ...renderNumberField()
        },
        {
            title: 'Total Orders Cleared',
            dataIndex: 'total_orders_count_cleared',
            key: 'total_orders_count_cleared',
            width: '200px',
            sorter: true,
            ...renderNumberField()
        },
        adOrdersColumn,
        {
            title: 'Organic Orders',
            dataIndex: 'organic_orders_count',
            key: 'organic_orders_count',
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
            dataIndex: 'total_returns_quantity',
            key: 'total_returns_quantity',
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
