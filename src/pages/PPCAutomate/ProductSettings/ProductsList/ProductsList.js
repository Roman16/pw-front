import React, {Fragment, useEffect, useState} from 'react'
import InputCurrency from '../../../../components/Inputs/InputCurrency'
import ProductItem from '../../../../components/ProductList/ProductItem'
import {notification} from '../../../../components/Notification'
import './TableSettings.less'
import InformationTooltip from "../../../../components/Tooltip/Tooltip"
import CustomTable from "../../../../components/Table/CustomTable"
import Pagination from "../../../../components/Pagination/Pagination"
import MultiApply from "../MultiApply/MultiApply"
import CustomSelect from "../../../../components/Select/Select"
import {Checkbox, Input, Select} from "antd"
import {SVG} from "../../../../utils/icons"
import TreeSelect from "../../../../components/TreeSelect/TreeSelect"
import $ from 'jquery'
import CogsWindow from "../CogsWindow/CogsWindow"
import {numberMask} from "../../../../utils/numberMask"
import {round} from "../../../../utils/round"
import AmazonFeeWindow from "../AmazonFeesWindow/AmazonFeesWindow"
import _ from 'lodash'
const ACTIVE = 'RUNNING'
const PRODUCT = 'product'
const NET_MARGIN = 'calculated_product_margin'
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
const FRIENDLY_NAME = 'friendly_name'

const DESIRED_ACOS = 'desired_acos'
const BREAK_EVEN_ACOS = 'break_even_acos'
const COGS = 'cogs'
const AMAZON_FEES = 'amazon_total_fee'

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


const ProductsList = ({products, totalSize, paginationOption, changePagination, processing, isAgencyClient, setRowData, updateSettingsHandlerByIdList, onBlur, onSetCogs}) => {
    const [selectedRows, setSelectedRows] = useState([]),
        [selectedAll, setSelectedAll] = useState(false),
        [strategiesDescriptionState, setStrategiesDescriptionState] = useState(false),
        [visibleCogsWindow, setVisibleCogsWindow] = useState(false),
        [visibleAmazonFeesWindow, setVisibleAmazonFeesWindow] = useState(false),
        [selectedProduct, setSelectedProduct] = useState()

    const isAdmin = localStorage.getItem('adminToken')

    const switchStrategyDescription = () => {
        setStrategiesDescriptionState(prevState => !prevState)
        $('.table-overflow').animate({scrollLeft: 100000}, 400)
    }

    const onChangeRow = (value, item, index, parentIndex) => {
        if (parentIndex ? products[parentIndex].product.variations[index][item] !== value : products[index][item] !== value) {
            if (value === '' || value == null) {
                setRowData(null, item, index, parentIndex)
            } else if (item === PRICE_FROM_USER && value > 0) {
                setRowData(value, item, index, parentIndex)
                clearTimeout(priceTimerId)
            } else if (item === PRICE_FROM_USER && value <= 0) {
                setRowData(value, item, index, parentIndex)

                clearTimeout(priceTimerId)
                priceTimerId = setTimeout(() => {
                    notification.warning({
                        title: 'Price should be greater than 0'
                    })
                }, 1000)
                return
            } else if (item === BSR_TRACKING || item === FRIENDLY_NAME) {
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

    const expandedRowRender = (props, parentIndex) => {
        const columns = [
            {
                width: '35rem',
                render: (props) => {
                    return (<ProductItem
                            product={props}
                        />
                    )
                }
            },
            {
                minWidth: '160px',
                render: (props, item) => (
                    <InputCurrency
                        value={props[PRICE]}
                        disabled
                    />
                )
            },
            {
                minWidth: '160px',
                render: (props, item, indexRow) => (
                    <InputCurrency
                        key={PRICE_FROM_USER}
                        value={props[PRICE_FROM_USER]}
                        min={0}
                        step={0.01}
                        onChange={event => onChangeRow(event, PRICE_FROM_USER, indexRow, parentIndex)}
                        onBlur={({target: {value}}) => onBlur(value, PRICE_FROM_USER, indexRow, parentIndex)}
                        disabled
                    />
                )
            },
            {
                minWidth: '15.5rem',
                render: (props, item) => {
                    return (
                        <div className={'cogs-field'} onClick={() => onEditCogs(props)}>
                            <InputCurrency
                                value={props[COGS]}
                                disabled={true}
                                data-intercom-target="net-margin-field"
                            />

                            <button className="btn icon edit-btn">
                                <SVG id={'edit-pen-icon'}/>
                            </button>
                        </div>
                    )
                }
            },
            {
                minWidth: '15.5rem',
                render: (props) => {
                    return (
                        <div className={'cogs-field amazon-fees-field'} onClick={() => onShowAmazonFees(props)}>
                            <InputCurrency
                                value={props[AMAZON_FEES]}
                                disabled={true}
                                // placeholder={'Non'}
                            />

                            <button className="btn icon edit-btn full-width-icon">
                                <SVG id={'question-mark-icon'}/>
                            </button>
                        </div>
                    )
                }
            },
            {
                minWidth: '175px',
                render: (props, item) => (
                    <InputCurrency
                        value={item[MIN_BID_MANUAL_CAMPING]}
                        disabled
                        step={0.01}
                    />
                )
            },
            {
                minWidth: '175px',
                render: (props, item) => (
                    <InputCurrency
                        value={item[MAX_BID_MANUAL_CAMPING]}
                        disabled
                        step={0.01}
                    />
                )
            },
            {
                minWidth: '175px',
                render: (props, item) => (
                    <InputCurrency
                        value={item[MIN_BID_AUTO_CAMPING]}
                        disabled
                        step={0.01}
                    />
                )
            },
            {
                minWidth: '175px',
                render: (props, item) => (
                    <InputCurrency
                        value={item[MAX_BID_AUTO_CAMPING]}
                        disabled
                        step={0.01}
                    />
                )
            },
            {
                minWidth: '160px',
                render: (props, item) => (
                    <InputCurrency
                        value={item[DESIRED_ACOS]}
                        typeIcon='percent'
                        disabled
                        step={0.01}
                    />
                )
            },
            {
                minWidth: '170px',
                render: (props, item) => (
                    <InputCurrency
                        value={item[BREAK_EVEN_ACOS]}
                        typeIcon='percent'
                        disabled
                        step={0.01}
                    />
                )
            },
            {
                width: '100px',
                render: (props) => (<div style={{textAlign: 'right'}}></div>)
            },
            ...isAdmin ? [{
                width: '130px',
                render: (props) => (<div style={{textAlign: 'right'}}></div>)
            }] : [],
            ...isAgencyClient ? [
                    {
                        width: '135px',
                        render: (props, item) => (
                            <span> {item[OPTIMIZATION_STATUS] === ACTIVE ? <span className={'running'}>Running</span> :
                                <span className={'paused'}>Paused</span>}</span>)
                    },
                    {
                        width: '18.571428571428573rem',
                        render: (props) => (<div style={{textAlign: 'right'}}></div>)
                    }
                ]
                :
                [
                    {
                        width: '135px',
                        render: (props, item) => (
                            <span> {item[OPTIMIZATION_STATUS] === ACTIVE ? <span className={'running'}>Running</span> :
                                <span className={'paused'}>Paused</span>}</span>)
                    },
                ]
        ]


        return (
            props.product.variations && props.product.variations.map((productVariation, i) => (
                    <div>

                        {columns.map((item, index) => {
                                const fieldWidth = item.width ? ((devicePixelRatio === 2 && (item.width.search('em') !== -1)) ? {width: `calc(${item.width} + 1.5em)`} : {width: item.width}) : {flex: 1}

                                return (
                                    <div
                                        className={`table-body__field ${item.align || ''}`}
                                        style={{...fieldWidth, minWidth: item.minWidth || '0'}}
                                    >
                                        {index === 0 && <div className="variation-indicator"/>}

                                        {item.render(productVariation, props, i)}
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

    const onEditCogs = (product) => {
        setVisibleCogsWindow(true)
        setSelectedProduct(product)
    }

    const onShowAmazonFees = (product) => {
        setVisibleAmazonFeesWindow(true)
        setSelectedProduct(product)
    }

    const columns = [
        {
            title: 'Product Name',
            dataIndex: PRODUCT,
            key: PRODUCT,
            width: '31.428571428571427rem',
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
            title: 'Product Price',
            dataIndex: PRICE,
            key: PRICE,
            minWidth: '160px',
            render: (index, item) => (
                <InputCurrency
                    value={item[PRICE]}
                    disabled
                />
            )
        },
        {
            title: <>Overwrite <br/> Product Price</>,
            dataIndex: PRICE_FROM_USER,
            key: PRICE_FROM_USER,
            minWidth: '160px',
            render: (index, item, indexRow) => (
                <InputCurrency
                    key={PRICE_FROM_USER}
                    value={item[PRICE_FROM_USER]}
                    min={0}
                    step={0.01}
                    onChange={event => onChangeRow(event, PRICE_FROM_USER, indexRow)}
                    onBlur={({target: {value}}) => onBlur(value, PRICE_FROM_USER, indexRow)}
                />
            )
        },
        {
            title: 'CoGS',
            dataIndex: COGS,
            key: COGS,
            minWidth: '15.5rem',
            render: (index, item) => {
                return (
                    <div className={'cogs-field'} onClick={() => onEditCogs(item)}>
                        <InputCurrency
                            value={item[COGS]}
                            disabled={true}
                            data-intercom-target="net-margin-field"
                        />

                        <button className="btn icon edit-btn">
                            <SVG id={'edit-pen-icon'}/>
                        </button>
                    </div>
                )
            }
        },
        {
            title: () => 'Amazon Fees',
            dataIndex: AMAZON_FEES,
            key: AMAZON_FEES,
            minWidth: '15.5rem',
            render: (index, item) => {
                return (
                    <div className={'cogs-field amazon-fees-field'} onClick={() => onShowAmazonFees(item)}>
                        <InputCurrency
                            value={item[AMAZON_FEES]}
                            disabled={true}
                            // placeholder={'Non'}
                            data-intercom-target="net-margin-field"
                        />

                        <button className="btn icon edit-btn full-width-icon">
                            <SVG id={'question-mark-icon'}/>
                        </button>
                    </div>
                )
            }
        },
        // {
        //     title: () => 'Net Margin',
        //     dataIndex: NET_MARGIN,
        //     key: NET_MARGIN,
        //     minWidth: '190px',
        //     render: (index, item, indexRow) => (
        //         <InputCurrency
        //             value={item[NET_MARGIN] ? round(item[NET_MARGIN] * 100, 2) : undefined}
        //             typeIcon={'percent'}
        //             className={'full-width'}
        //             placeholder={'Can’t calculate'}
        //             disabled
        //         />
        //     )
        // },
        {
            title: () => (<span>Min Bid <br/> (Manual Campaign)</span>),
            dataIndex: MIN_BID_MANUAL_CAMPING,
            key: MIN_BID_MANUAL_CAMPING,
            minWidth: '175px',
            render: (index, item, indexRow) => (
                <InputCurrency
                    value={item[MIN_BID_MANUAL_CAMPING]}
                    min={0}
                    max={item[MAX_BID_MANUAL_CAMPING] || 999999999}
                    step={0.01}
                    data-intercom-target="min-bid-field"
                    onChange={event => onChangeRow(event, MIN_BID_MANUAL_CAMPING, indexRow)}
                    onBlur={({target: {value}}) => onBlur(value, MIN_BID_MANUAL_CAMPING, indexRow)}
                />
            )
        },
        {
            title: () => (<span>Max Bid <br/> (Manual Campaign)</span>),
            dataIndex: MAX_BID_MANUAL_CAMPING,
            key: MAX_BID_MANUAL_CAMPING,
            minWidth: '175px',
            render: (index, item, indexRow) => (
                <InputCurrency
                    value={item[MAX_BID_MANUAL_CAMPING]}
                    min={item[MIN_BID_MANUAL_CAMPING] || 0}
                    step={0.01}
                    onChange={event => onChangeRow(event, MAX_BID_MANUAL_CAMPING, indexRow)}
                    onBlur={({target: {value}}) => onBlur(value, MAX_BID_MANUAL_CAMPING, indexRow)}
                />
            )
        },
        {
            title: () => (<span>Min Bid <br/> (Auto Campaign)</span>),
            dataIndex: MIN_BID_AUTO_CAMPING,
            key: MIN_BID_AUTO_CAMPING,
            minWidth: '175px',
            render: (index, item, indexRow) => (
                <InputCurrency
                    value={item[MIN_BID_AUTO_CAMPING]}
                    min={0}
                    max={item[MAX_BID_AUTO_CAMPING] || 999999999}
                    step={0.01}
                    onChange={event => onChangeRow(event, MIN_BID_AUTO_CAMPING, indexRow)}
                    onBlur={({target: {value}}) => onBlur(value, MIN_BID_AUTO_CAMPING, indexRow)}
                />
            )
        },
        {
            title: () => (<span>Max Bid <br/> (Auto Campaign)</span>),
            dataIndex: MAX_BID_AUTO_CAMPING,
            key: MAX_BID_AUTO_CAMPING,
            minWidth: '175px',
            render: (index, item, indexRow) => (
                <InputCurrency
                    value={item[MAX_BID_AUTO_CAMPING]}
                    min={item[MIN_BID_AUTO_CAMPING] || 0}
                    step={0.01}
                    onChange={event => onChangeRow(event, MAX_BID_AUTO_CAMPING, indexRow)}
                    onBlur={({target: {value}}) => onBlur(value, MAX_BID_AUTO_CAMPING, indexRow)}
                />
            )
        },
        {
            title: () => (<span>Desired ACoS</span>),
            dataIndex: DESIRED_ACOS,
            key: DESIRED_ACOS,
            minWidth: '160px',
            render: (index, item, indexRow) => (
                <InputCurrency
                    value={item[DESIRED_ACOS]}
                    step={0.01}
                    typeIcon='percent'
                    onChange={event => onChangeRow(event, DESIRED_ACOS, indexRow)}
                    onBlur={({target: {value}}) => onBlur(value, DESIRED_ACOS, indexRow)}
                />
            )
        },
        {
            title: () => (<span>Break-even ACoS</span>),
            dataIndex: BREAK_EVEN_ACOS,
            key: BREAK_EVEN_ACOS,
            minWidth: '170px',
            render: (index, item, indexRow) => (
                <InputCurrency
                    value={item[BREAK_EVEN_ACOS]}
                    step={0.01}
                    typeIcon='percent'
                    onChange={event => onChangeRow(event, BREAK_EVEN_ACOS, indexRow)}
                    onBlur={({target: {value}}) => onBlur(value, BREAK_EVEN_ACOS, indexRow)}
                />
            )
        },
        {
            title: 'Total Changes',
            dataIndex: TOTAL_CHANGES,
            key: TOTAL_CHANGES,
            width: '100px',
            align: 'right',
            render: (index, item) => (
                <div>{item[TOTAL_CHANGES]}</div>
            )
        },
        ...isAdmin ? [{
            title: () => <div style={{width: '100%', textAlign: 'center'}}>BSR Tracking</div>,
            dataIndex: BSR_TRACKING,
            key: BSR_TRACKING,
            width: '130px',
            align: 'center',
            render: (value, item, indexRow) => (
                <div className={'checkbox-container'}>
                    <Checkbox
                        checked={value}
                        onChange={e => onChangeRow(e.target.checked, BSR_TRACKING, indexRow)}
                        onBlur={({target: {value}}) => onBlur(value, BSR_TRACKING, indexRow)}
                    />
                </div>
            )
        }] : [],
        {
            title: 'Optimization Status',
            dataIndex: OPTIMIZATION_STATUS,
            key: OPTIMIZATION_STATUS,
            width: '135px',
            render: (index, item) => (
                <span> {item[OPTIMIZATION_STATUS] === ACTIVE ? <span className={'running'}>Running</span> :
                    <span className={'paused'}>Paused</span>}</span>)
        },
        ...isAdmin ? [{
            title: 'Friendly name',
            dataIndex: FRIENDLY_NAME,
            key: FRIENDLY_NAME,
            width: '200px',
            align: 'center',
            render: (value, item, indexRow) => (
                <div className="form-group">
                    <Input
                        value={value}
                        onChange={e => onChangeRow(e.target.value, FRIENDLY_NAME, indexRow)}
                        onBlur={({target: {value}}) => onBlur(value, FRIENDLY_NAME, indexRow)}
                        type="text"
                    />
                </div>
            )
        }] : [],
        ...isAgencyClient ? [{
            title: () => <div onClick={switchStrategyDescription}>
                <span>Advertising <br/> Strategy</span>

                <i className={strategiesDescriptionState ? 'opened' : ''}>
                    <SVG id={'right-icon'}/>
                </i>
            </div>,
            dataIndex: ADVERTISING_STRATEGY,
            key: ADVERTISING_STRATEGY,
            width: '18.571428571428573rem',
            render: (index, item, indexRow) => (
                <CustomSelect
                    getPopupContainer={triggerNode => triggerNode.parentNode}
                    value={item[ADVERTISING_STRATEGY] || undefined}
                    onChange={event => onChangeRow(event, ADVERTISING_STRATEGY, indexRow)}
                    onBlur={(value) => onBlur(value, ADVERTISING_STRATEGY, indexRow)}
                    placeholder={'Select a goal'}
                >
                    <Option value={null}>
                        Select a goal
                    </Option>

                    {advertisingStrategyVariations.map(item => (
                        <Option value={item.value}>
                            <i style={{fill: `#${item.fill}`}}>
                                <SVG id={item.icon}/>
                            </i>
                            {item.label}
                        </Option>
                    ))}
                </CustomSelect>
            )
        }] : []
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


            <div className={`table-block ${!isAgencyClient && 'not-agency'}`}>
                <CustomTable
                    key={'table'}
                    rowKey="id"
                    dataSource={products}
                    columns={columns}
                    loading={processing}
                    rowSelection={rowSelection}
                    openedRow={(product) => product.id === openedProduct}
                    selectedAll={selectedAll}
                    selectedRows={selectedRows}

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

                {isAgencyClient &&
                <div className={`strategies-description ${strategiesDescriptionState ? 'opened' : ''}`}>
                    <div className="title">
                        Advertising Strategies
                    </div>

                    <div className="list">
                        {advertisingStrategyVariations.map(item => (
                            <div>
                                <div className="row">
                                    <i><SVG id={item.icon}/></i>
                                    <b>{item.label}</b>
                                </div>

                                <div className="row">
                                    <div className="sales">
                                        Sales

                                        <div className="starts">
                                            {[0, 1, 2, 3, 4].map(star => (
                                                <div style={{width: `${4 + star}px`, height: `${4 + star}px`}}
                                                     className={star <= item.sales ? 'active' : ''}/>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="acos">
                                        ACoS
                                        <div className="starts">
                                            {[0, 1, 2, 3, 4].map(star => (
                                                <div style={{width: `${4 + star}px`, height: `${4 + star}px`}}
                                                     className={star <= item.acos ? 'active' : ''}/>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>}
            </div>

            <CogsWindow
                visible={visibleCogsWindow}
                productId={selectedProduct && selectedProduct.id}
                product={selectedProduct}
                onSetCogs={onSetCogs}
                onClose={() => {
                    setSelectedProduct(undefined)
                    setVisibleCogsWindow(false)
                }}
            />

            <AmazonFeeWindow
                visible={visibleAmazonFeesWindow}
                productId={selectedProduct && selectedProduct.id}
                product={selectedProduct}
                onClose={() => {
                    setSelectedProduct(undefined)
                    setVisibleAmazonFeesWindow(false)
                }}
            />
        </Fragment>
    )
}

export default React.memo(ProductsList)

