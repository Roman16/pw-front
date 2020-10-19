import React, {Fragment, useState} from 'react'
import InputCurrency from '../../../components/Inputs/InputCurrency'
import ProductItem from '../../../components/ProductList/ProductItem'
import {notification} from '../../../components/Notification'
import InformationTooltip from "../../../components/Tooltip/Tooltip"
import CustomTable from "../../../components/Table/CustomTable"
import Pagination from "../../../components/Pagination/Pagination"
import MultiApply from "../../PPCAutomate/ProductSettings/MultiApply/MultiApply"
import CustomSelect from "../../../components/Select/Select"
import {Checkbox, Select} from "antd"
import {SVG} from "../../../utils/icons"
import TreeSelect from "../../../components/TreeSelect/TreeSelect"
import $ from 'jquery'
import '../../PPCAutomate/ProductSettings/ProductsList/TableSettings.less'

const ACTIVE = 'RUNNING'
const PRODUCT = 'product'
const NET_MARGIN = 'product_margin_value'
const PRICE = 'item_price'
const PRICE_FROM_USER = 'item_price_from_user'
const MIN_BID_MANUAL_CAMPING = 'min_bid_manual_campaign'
const MAX_BID_MANUAL_CAMPING = 'max_bid_manual_campaign'
const MIN_BID_AUTO_CAMPING = 'min_bid_auto_campaign'
const MAX_BID_AUTO_CAMPING = 'max_bid_auto_campaign'
const TOTAL_CHANGES = 'total_changes'
const BSR_TRACKING = 'bsr_tracking'
const OPTIMIZATION_STATUS = 'optimization_status'
const ADVERTISING_STRATEGY = 'advertising_strategy'

const DESIRED_ACOS = 'desired_acos'
const BREAK_EVEN_ACOS = 'break_even_acos'
const COGS = 'cogs'

const Option = Select.Option

let minBidManualTimerId = null,
    minBidAutoTimerId = null,
    maxBidManualTimerId = null,
    maxBidAutoTimerId = null,
    marginTimerId = null,
    priceTimerId = null

const advertisingStrategyVariations = [
    {
        label: 'ACoS Targeting',
        value: 'acos_targeting',
        icon: 'acos-targeting',
        fill: 'EC7F5C',
        sales: 3,
        acos: 1
    },
    {
        label: 'Overall Profit Growth',
        value: 'overall_profit_growth',
        icon: 'overall-profit-growth',
        fill: '6D6DF6',
        sales: 4,
        acos: 3
    },
    {
        label: 'PPC Profit Growth',
        value: 'ppc_profit_growth',
        icon: 'ppc-profit-growth',
        fill: '83FED0',
        sales: 4,
        acos: 2

    },
    {
        label: 'Product Launch',
        value: 'product_launch',
        icon: 'product-launch',
        fill: 'F0B849',
        sales: 3,
        acos: 5

    },
    {
        label: 'New Keywords Ranking',
        value: 'new_keywords_ranking',
        icon: 'new-keywords-ranking',
        fill: '5BEBF3',
        sales: 3,
        acos: 4

    },
    {
        label: 'Get Best Seller Tag',
        value: 'get_best_seller_tag',
        icon: 'get-best-seller-tag',
        fill: 'EC7F5C',
        sales: 5,
        acos: 5

    },
    {
        label: 'Defend Best Seller Tag',
        value: 'defend_best_seller_tag',
        icon: 'defend-best-seller-tag',
        fill: '6D6DF6',
        sales: 5,
        acos: 5
    },
    {
        label: 'Low Inventory HPLS',
        value: 'low_inventory_hpls',
        icon: 'low-inventory-hpls',
        fill: '83FED0',
        sales: 2,
        acos: 1

    },
]


const ProductsList = ({products, totalSize, paginationOption, changePagination, processing, isAgencyClient, setRowData, updateSettingsHandlerByIdList}) => {
    const [selectedRows, setSelectedRows] = useState([]),
        [selectedAll, setSelectedAll] = useState(false),
        [strategiesDescriptionState, setStrategiesDescriptionState] = useState(false)

    const isAdmin = localStorage.getItem('adminToken')


    const switchStrategyDescription = () => {
        setStrategiesDescriptionState(prevState => !prevState)

        // setTimeout(() => {

        $('.table-overflow').animate({scrollLeft: 100000}, 400)

        // const objDiv = document.querySelector('.table-overflow');
        // objDiv.scro = 10000000;
        // }, 300)

    }


    const onChangeRow = (value, item, index) => {
        if (products[index][item] !== value) {
            if (value === '' || value == null) {
                setRowData(null, item, index)
            } else if (item === PRICE_FROM_USER && value > 0) {
                setRowData(value, item, index)
                clearTimeout(priceTimerId)
            } else if (item === PRICE_FROM_USER && value <= 0) {
                setRowData(value, item, index)

                clearTimeout(priceTimerId)
                priceTimerId = setTimeout(() => {
                    notification.warning({
                        title: 'Price should be greater than 0'
                    })
                }, 1000)
                return
            } else if (item === BSR_TRACKING) {
                setRowData(value, item, index)
            } else if (item !== NET_MARGIN) {
                if (value < 0.02 || ((item === MIN_BID_MANUAL_CAMPING) && (value > products[index][MAX_BID_MANUAL_CAMPING]) && products[index][MAX_BID_MANUAL_CAMPING] != null)) {
                    clearTimeout(minBidManualTimerId)
                    minBidManualTimerId = setTimeout(() => {
                        notification.warning({
                            title: value < 0.02 ? 'Bids should be greater than or equal to 0.02$' : 'Min Bid (Manual Campaign) should be less than Max Bid (Manual Campaign)'
                        })
                    }, 1000)
                    return
                }
                if (value < 0.02 || ((item === MAX_BID_MANUAL_CAMPING) && (value < products[index][MIN_BID_MANUAL_CAMPING]) && products[index][MIN_BID_MANUAL_CAMPING] != null)) {
                    clearTimeout(maxBidManualTimerId)
                    maxBidManualTimerId = setTimeout(() => {
                        notification.warning({
                            title: value < 0.02 ? 'Bids should be greater than or equal to 0.02$' : 'Max Bid (Manual Campaign) should be greater than Min Bid (Manual Campaign)'
                        })
                    }, 1000)
                    return
                }
                if (value < 0.02 || ((item === MIN_BID_AUTO_CAMPING) && (value > products[index][MAX_BID_AUTO_CAMPING]) && products[index][MAX_BID_AUTO_CAMPING] != null)) {
                    clearTimeout(minBidAutoTimerId)
                    minBidAutoTimerId = setTimeout(() => {
                        notification.warning({
                            title: value < 0.02 ? 'Bids should be greater than or equal to 0.02$' : 'Min Bid (Auto Campaign) should be less than Max Bid (Auto Campaign)'
                        })
                    }, 1000)
                    return
                }
                if (value < 0.02 || ((item === MAX_BID_AUTO_CAMPING) && (value < products[index][MIN_BID_AUTO_CAMPING]) && products[index][MIN_BID_AUTO_CAMPING] != null)) {
                    clearTimeout(maxBidAutoTimerId)
                    maxBidAutoTimerId = setTimeout(() => {
                        notification.warning({
                            title: value < 0.02 ? 'Bids should be greater than or equal to 0.02$' : 'Max Bid (Manual Campaign) should be greater than  Min Bid (Manual Campaign)'
                        })
                    }, 1000)
                    return
                }

                clearTimeout(maxBidAutoTimerId)
                clearTimeout(minBidAutoTimerId)
                clearTimeout(minBidManualTimerId)
                clearTimeout(maxBidManualTimerId)

                setRowData(value, item, index)
            } else if (item === NET_MARGIN && value > 0 && value <= 100) {
                setRowData(value, item, index)
                clearTimeout(marginTimerId)
            } else if (item === NET_MARGIN && (value < 0 || value > 100)) {
                clearTimeout(marginTimerId)
                marginTimerId = setTimeout(() => {
                    notification.warning({
                        title: 'Product net margin should be greater than 0% and less than 100%'
                    })
                }, 1000)
            } else {
                notification.warning({
                    title: item === NET_MARGIN ? 'Product net margin should be greater than 0% and less than 100%' : 'Bids should be greater than or equal to 0.02$'
                })
            }
        }
    }

    const onSubmitSettingParams = (value) => {
        updateSettingsHandlerByIdList({
            ...value,
            ...!selectedAll && {product_id: selectedRows},
        })
    }

    const expandedRowRender = (props) => {
        const columns = [
            {
                width: '32.428571428571427rem',
                render: (props) => {
                    return (<ProductItem
                            product={props}
                        />
                    )
                }
            },
            {
                minWidth: '173px',
                render: (props) => (<div/>)
            },
            {
                minWidth: '173px',
                render: (props) => (<div/>)
            },
            {
                minWidth: '250px',
                render: (props) => (<div/>)
            },
            {
                minWidth: '250px',
                render: (props) => (<div/>)
            },
            {
                minWidth: '250px',
                render: (props) => (<div/>)
            },
            {
                minWidth: '200px',
                render: (props) => (<div/>)
            },
            {
                width: '135px',
                render: (props, item) => (
                    <span> {item[OPTIMIZATION_STATUS] === ACTIVE ? <span className={'running'}>Running</span> :
                        <span className={'paused'}>Paused</span>}</span>)
            },
        ]


        return (
            props.product.variations.map(productVariation => (
                    <div>

                        {columns.map((item, index) => {
                                const fieldWidth = item.width ? ((devicePixelRatio === 2 && (item.width.search('em') !== -1)) ? {width: `calc(${item.width} + 1.5em)`} : {width: item.width}) : {flex: 1}

                                return (
                                    <div
                                        className={`table-body__field ${item.align || ''}`}
                                        style={{...fieldWidth, minWidth: item.minWidth || '0'}}
                                    >
                                        {index === 0 && <div className="variation-indicator"/>}

                                        {item.render(productVariation, props)}
                                    </div>
                                )
                            }
                        )}
                    </div>
                )
            )
        )
    }

    const rowSelection = {
        onChange: (selectedRows, type) => {
            setSelectedRows(selectedRows)
            if (type !== 'all') {
                setSelectedAll(false)
            }
        }
    }

    const [openedProduct, setOpenedProduct] = useState(null)

    const openVariationsHandler = (id) => {
        setOpenedProduct(prevState => prevState === id ? null : id)
    }

    const columns = [
        {
            title: 'Product Name',
            dataIndex: PRODUCT,
            key: PRODUCT,
            width: '32.428571428571427rem',
            render: (product) => (
                <ProductItem
                    product={product}
                    products={products}
                    onOpenChild={openVariationsHandler}
                    openedProductOnSetting={openedProduct}
                />
            )
        },
        {
            title: () => <div style={{width: '100%', textAlign: 'center'}}>BSR Tracking</div>,
            dataIndex: BSR_TRACKING,
            key: BSR_TRACKING,
            minWidth: '173px',
            align: 'center',
            render: (value, item, indexRow) => (
                <div className={'checkbox-container'}>
                    <Checkbox
                        checked={value}
                        onChange={e => onChangeRow(e.target.checked, BSR_TRACKING, indexRow)}
                    />
                </div>
            )
        },
        {
            title: () => <div style={{width: '100%', textAlign: 'center'}}>Rating Tracking</div>,
            dataIndex: BSR_TRACKING,
            key: BSR_TRACKING,
            minWidth: '173px',
            align: 'center',
            render: (value, item, indexRow) => (
                <div className={'checkbox-container'}>
                    <Checkbox
                        checked={value}
                        onChange={e => onChangeRow(e.target.checked, BSR_TRACKING, indexRow)}
                    />
                </div>
            )
        },
        {
            title: () => <div style={{width: '100%', textAlign: 'center'}}>Competitors Price Tracking</div>,
            dataIndex: BSR_TRACKING,
            key: BSR_TRACKING,
            minWidth: '250px',
            align: 'center',
            render: (value, item, indexRow) => (
                <div className={'checkbox-container'}>
                    <Checkbox
                        checked={value}
                        onChange={e => onChangeRow(e.target.checked, BSR_TRACKING, indexRow)}
                    />
                </div>
            )
        },
        {
            title: () => <div style={{width: '100%', textAlign: 'center'}}>Competitors Coupons Tracking</div>,
            dataIndex: BSR_TRACKING,
            key: BSR_TRACKING,
            minWidth: '250px',
            align: 'center',
            render: (value, item, indexRow) => (
                <div className={'checkbox-container'}>
                    <Checkbox
                        checked={value}
                        onChange={e => onChangeRow(e.target.checked, BSR_TRACKING, indexRow)}
                    />
                </div>
            )
        },
        {
            title: () => <div style={{width: '100%', textAlign: 'center'}}>Variations Integrity Tracking</div>,
            dataIndex: BSR_TRACKING,
            key: BSR_TRACKING,
            minWidth: '250px',
            align: 'center',
            render: (value, item, indexRow) => (
                <div className={'checkbox-container'}>
                    <Checkbox
                        checked={value}
                        onChange={e => onChangeRow(e.target.checked, BSR_TRACKING, indexRow)}
                    />
                </div>
            )
        },
        {
            title: 'Optimization Status',
            dataIndex: OPTIMIZATION_STATUS,
            key: OPTIMIZATION_STATUS,
            minWidth: '200px',
            render: (index, item) => (
                <span> {item[OPTIMIZATION_STATUS] === ACTIVE ? <span className={'running'}>Running</span> :
                    <span className={'paused'}>Paused</span>}</span>)
        }
    ]

    return (
        <Fragment>
            {selectedRows.length > 0 && <MultiApply
                selectedRows={selectedRows}
                totalSize={totalSize}
                onSelectAll={() => setSelectedAll(true)}
                selectedAll={selectedAll}

                onSubmit={onSubmitSettingParams}
            />}


            <div className={`table-block not-agency`}>
                <CustomTable
                    key={'table'}
                    rowKey="id"
                    dataSource={products}
                    columns={columns}
                    loading={processing}
                    rowSelection={rowSelection}
                    openedRow={openedProduct}
                    selectedAll={selectedAll}

                    expandedRowRender={expandedRowRender}
                />

                <Pagination
                    onChange={changePagination}
                    page={paginationOption.page}
                    pageSizeOptions={[10, 30, 50]}
                    pageSize={paginationOption.pageSize}
                    totalSize={totalSize}
                    listLength={products.length}
                    processing={processing}
                />
            </div>
        </Fragment>
    )
}

export default React.memo(ProductsList)

