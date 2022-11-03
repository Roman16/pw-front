import React, {Fragment, useEffect, useState} from "react"
import Pagination from "../../../components/Pagination/Pagination"
import CustomTable, {EditableField} from "../../../components/Table/CustomTable"
import {amazonDefaultImageUrls} from "../../../components/ProductList/ProductItem"
import InputCurrency from "../../../components/Inputs/InputCurrency"
import _ from "lodash"
import {SVG} from "../../../utils/icons"
import {round} from "../../../utils/round"
import {Checkbox, Input, Popover, Select, Switch} from "antd"
import CustomSelect from "../../../components/Select/Select"
import noImage from "../../../assets/img/no-image-available.svg"
import TableList from "../../Analytics/componentsV2/TableList/TableList"
import CogsWindow from "../ProductSettings/CogsWindow/CogsWindow"
import AmazonFeeWindow from "../ProductSettings/AmazonFeesWindow/AmazonFeesWindow"
import MultiApply from "../ProductSettings/MultiApply/MultiApply"
import {marketplaceIdValues} from "../../../constans/amazonMarketplaceIdValues"
import $ from "jquery"
import {amazonDomain} from "../../../utils/amazonDomain"
import {currencyWithCode} from "../../../components/CurrencyCode/CurrencyCode"


export const ACTIVE = 'RUNNING'
export const PRODUCT = 'product'
export const NET_MARGIN = 'calculated_product_margin'
export const PRICE = 'item_price'
export const PRICE_FROM_USER = 'item_price_from_user'
export const MIN_BID_MANUAL_CAMPING = 'min_bid_manual_campaign'
export const MAX_BID_MANUAL_CAMPING = 'max_bid_manual_campaign'
export const MIN_BID_AUTO_CAMPING = 'min_bid_auto_campaign'
export const MAX_BID_AUTO_CAMPING = 'max_bid_auto_campaign'
export const TOTAL_CHANGES = 'total_changes'
export const BSR_TRACKING = 'bsr_tracking'
export const OPTIMIZATION_STATUS = 'optimization_status'
export const ADVERTISING_STRATEGY = 'advertising_strategy'
export const FRIENDLY_NAME = 'friendly_name'

export const DESIRED_ACOS = 'desired_acos'
export const BREAK_EVEN_ACOS = 'break_even_acos'
export const COGS = 'cogs'
export const AMAZON_FEES = 'amazon_total_fee'

const advertisingStrategyVariations = [
    {
        label: 'Select a goal',
        value: null,
    },
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

const Option = Select.Option

const ProductList = ({
                         products,
                         processing,
                         requestParams,
                         processingVariation,
                         isAgencyClient,

                         onChangePagination,
                         onUpdateField,
                         onSetCogs,
                         setVariation,
                         onSubmitSettingParams
                     }) => {

    const [visibleCogsWindow, setVisibleCogsWindow] = useState(false),
        [visibleAmazonFeesWindow, setVisibleAmazonFeesWindow] = useState(false),
        [selectedProduct, setSelectedProduct] = useState(),
        [openedProduct, setOpenedProduct] = useState(),
        [selectedRows, setSelectedRows] = useState([]),
        [selectedAll, setSelectedAll] = useState(false),
        [strategiesDescriptionState, setStrategiesDescriptionState] = useState(false)

    const isAdmin = localStorage.getItem('adminToken')

    const getValueFromDefaultVariation = (variations, key) => _.find(variations, {is_default_variation: true}) ? _.find(variations, {is_default_variation: true})[key] : variations[0][key]

    const getValue = (product, key, fromVariation = false, type = 'currency') => {
        const value = (fromVariation && product.product.variations) ? getValueFromDefaultVariation(product.product.variations, key) : product[key]

        return value ? type === 'currency' ? currencyWithCode(value): `${round(value * 100, 2)}%` : key === NET_MARGIN ? 'Can’t calculate' : '-'
    }

    const openEditableWindow = (key, product) => {
        if (key === 'cogs') setVisibleCogsWindow(true)
        else setVisibleAmazonFeesWindow(true)
        setSelectedProduct(product)
    }

    const switchStrategyDescription = () => {
        setStrategiesDescriptionState(prevState => !prevState)
        $('.table-overflow').animate({scrollLeft: 100000}, 400)
    }

    const expandedRowRender = (props, parentIndex) => {
        const columns = [
            {
                render: () => ''
            },
            {
                width: '400px',
                render: (props) => {
                    return (<ProductItem
                            product={props}
                        />
                    )
                }
            },
            {
                width: '200px',
                render: ({sku, asin}) => <div className={'sku-asin'}>
                    <div title={sku}><b>SKU:</b>{sku}</div>
                    <div title={asin}><b>ASIN:</b>
                        <a
                            target={'_blank'}
                            href={`https://www.amazon.${amazonDomain()}/dp/${asin}`}
                        >
                            {asin}
                        </a>
                    </div>
                </div>
            },
            {
                width: '130px',
                align: 'right',
                render: (item) => getValue(item, PRICE)
            },
            {
                width: '170px',
                key: PRICE_FROM_USER,
                editType: 'currency',
                saveValidation: () =>  false,
                render: (item) => getValue(item, PRICE_FROM_USER)
            },
            {
                width: '130px',
                render: (item) => <div className="field-with-window"
                                       onClick={() => openEditableWindow('cogs', item)}>
                    {getValue(item, COGS)}
                    <button className="btn icon edit-btn">
                        <SVG id={'edit-pen-icon'}/>
                    </button>
                </div>
            },
            {
                width: '130px',
                render: (item) => <div className="field-with-window"
                                       onClick={() => openEditableWindow('amazonFees', item)}>
                    {getValue(item, AMAZON_FEES)}
                    <button className="btn icon edit-btn question-icon">
                        <SVG id={'question-mark-icon'}/>
                    </button>
                </div>
            },
            {
                width: '130px',
                render: (item) => getValue(item, NET_MARGIN, false, 'percent')
            },
            {
                width: '200px',
                render: (item, parent) => (
                    <div className="switch-block">
                        <Switch
                            checked={item.is_default_variation}
                            onChange={(checked) => setVariation(checked ? {
                                parent_product_id: parent.id,
                                variation_product_id: item.id
                            } : null)}
                            loading={processingVariation === item.id}
                            disabled={processingVariation || item.is_default_variation}
                        />
                    </div>
                )
            },
            {
                width: '175px',
                render: (index, item) => getValue(item, MIN_BID_MANUAL_CAMPING)

            },
            {
                width: '175px',
                render: (index, item) => getValue(item, MAX_BID_MANUAL_CAMPING)
            },
            {
                width: '175px',
                render: (index, item) => getValue(item, MIN_BID_AUTO_CAMPING)
            },
            {
                width: '175px',
                render: (index, item) => getValue(item, MAX_BID_AUTO_CAMPING)
            },
            ...(isAdmin || isAgencyClient) ? [{
                width: '160px',
                render: (item, parent) => (parent[DESIRED_ACOS] ? `${parent[DESIRED_ACOS]}%` : '-')
            }] : [],
            ...(isAdmin || isAgencyClient) ? [{
                width: '170px',
                render: (item, parent) => (parent[BREAK_EVEN_ACOS] ? `${parent[BREAK_EVEN_ACOS]}%` : '-')
            }] : [],
            {
                width: '100px',
                render: () => ''

            },
            ...isAdmin ? [{
                width: '120px',
                render: () => ''
            }] : [],
            {
                width: '135px',
                render: (item) => (
                    <span> {item[OPTIMIZATION_STATUS] === ACTIVE ? <span className={'running'}>Running</span> :
                        <span className={'paused'}>Paused</span>}</span>)
            },
            ...isAdmin ? [{
                width: '200px',
                render: () => ''
            }] : [],
            ...isAgencyClient ? [
                {
                    width: '200px',
                    render: () => ''
                }
            ] : []
        ]

        return (
            props.product.variations && props.product.variations.map((productVariation, i) => (
                    <div>
                        {columns.map((item, index) => {
                                const fieldWidth = item.width ? ((devicePixelRatio === 2 && (item.width.search('em') !== -1)) ? {width: `calc(${item.width} + 1.5em)`} : {width: item.width}) : {flex: 1}

                                return (
                                    <div
                                        className={`table-body__field ${item.align || ''} ${i === 1 ? 'with-shadow' : ''} ${item.editType ? 'editable-field' : ''}`}
                                        style={{...fieldWidth, minWidth: item.minWidth || '0'}}
                                    >
                                        {index === 1 && <div className="variation-indicator"/>}

                                        {/*{item.render && item.render(productVariation, props, i)}*/}

                                        {item.editType ?
                                            <EditableField
                                                item={productVariation}
                                                type={item.editType}
                                                value={productVariation[item.key]}
                                                column={item.dataIndex}
                                                columnInfo={item}
                                                columnParams={item}
                                                onUpdateField={(item, column, value, success, error) => onUpdateField(item, column, value, success, error, openedProduct)}
                                                render={() => item.render(productVariation, props, index, item.dataIndex)}
                                            /> : item.render(productVariation, props, index, item.dataIndex)}

                                    </div>
                                )
                            }
                        )}
                    </div>
                )
            )
        )
    }

    const columns = [
        {
            title: 'Product Name',
            dataIndex: PRODUCT,
            key: PRODUCT,
            width: '400px',
            render: (item) => <ProductItem
                product={item}
                openedProduct={openedProduct}
                onOpenVariations={setOpenedProduct}
            />
        },
        {
            title: 'SKU/ASIN',
            dataIndex: 'sku_asin',
            key: 'sku_asin',
            width: '200px',
            render: (text, {product: {sku, asin}}) => <div className={'sku-asin'}>
                <div title={sku}><b>SKU:</b>{sku}</div>
                <div title={asin}><b>ASIN:</b>
                    <a
                        target={'_blank'}
                        href={`https://www.amazon.${amazonDomain()}/dp/${asin}`}
                    >
                        {asin}
                    </a>
                </div>
            </div>
        },
        {
            title: 'Product Price',
            dataIndex: PRICE,
            key: PRICE,
            width: '130px',
            align: 'right',
            render: (index, item) => getValue(item, PRICE, true)
        },
        {
            title: <>Overwrite <br/> Product Price</>,
            dataIndex: PRICE_FROM_USER,
            key: PRICE_FROM_USER,
            width: '170px',
            editType: (item) => item.product.variations ? false : 'currency',
            saveValidation: () =>  false,
            render: (index, item) => getValue(item, PRICE_FROM_USER, true)
        },
        {
            title: 'CoGS',
            dataIndex: COGS,
            key: COGS,
            width: '130px',
            render: (index, item) => <div className={`field-with-window ${item.product.variations ? 'disabled' : ''}`}
                                          onClick={() => item.product.variations ? false : openEditableWindow('cogs', item)}>
                {getValue(item, COGS, true)}
                {(item.product.variations === null || !item.product.variations) &&
                <button className="btn icon edit-btn">
                    <SVG id={'edit-pen-icon'}/>
                </button>}
            </div>
        },
        {
            title: () => 'Amazon Fees',
            dataIndex: AMAZON_FEES,
            key: AMAZON_FEES,
            width: '130px',
            render: (index, item) => <div className={`field-with-window ${item.product.variations ? 'disabled' : ''}`}
                                          onClick={() => item.product.variations ? false : openEditableWindow('amazonFees', item)}>
                {getValue(item, AMAZON_FEES, true)}

                {(item.product.variations === null || !item.product.variations) &&
                <button className="btn icon edit-btn question-icon">
                    <SVG id={'question-mark-icon'}/>
                </button>}
            </div>
        },
        {
            title: () => 'Net Margin',
            dataIndex: NET_MARGIN,
            key: NET_MARGIN,
            width: '130px',
            render: (index, item) => getValue(item, NET_MARGIN, true, 'percent')
        },
        ...openedProduct ? [{
            title: 'Calculate Net Margin based on product',
            dataIndex: NET_MARGIN,
            key: NET_MARGIN,
            width: '200px',
            render: () => ('')
        }] : [],
        {
            title: <>Min Bid <br/> (Manual Campaign)</>,
            dataIndex: MIN_BID_MANUAL_CAMPING,
            key: MIN_BID_MANUAL_CAMPING,
            width: '175px',
            editType: 'currency',
            saveValidation: () =>  false,
            render: (index, item) => getValue(item, MIN_BID_MANUAL_CAMPING)
        },
        {
            title: <>Max Bid <br/> (Manual Campaign)</>,
            dataIndex: MAX_BID_MANUAL_CAMPING,
            key: MAX_BID_MANUAL_CAMPING,
            width: '175px',
            editType: 'currency',
            saveValidation: () =>  false,
            render: (index, item) => getValue(item, MAX_BID_MANUAL_CAMPING)
        },
        {
            title: () => (<span>Min Bid <br/> (Auto Campaign)</span>),
            dataIndex: MIN_BID_AUTO_CAMPING,
            key: MIN_BID_AUTO_CAMPING,
            width: '175px',
            editType: 'currency',
            render: (index, item) => getValue(item, MIN_BID_AUTO_CAMPING)
        },
        {
            title: () => (<span>Max Bid <br/> (Auto Campaign)</span>),
            dataIndex: MAX_BID_AUTO_CAMPING,
            key: MAX_BID_AUTO_CAMPING,
            width: '175px',
            editType: 'currency',
            render: (index, item) => getValue(item, MAX_BID_AUTO_CAMPING)
        },
        ...(isAdmin || isAgencyClient) ? [{
            title: () => (<span>Desired ACoS</span>),
            dataIndex: DESIRED_ACOS,
            key: DESIRED_ACOS,
            width: '160px',
            editType: 'percent',
            render: (value) => value ? `${value}%` : '-'
        }] : [],
        ...(isAdmin || isAgencyClient) ? [{
            title: () => (<span>Break-even ACoS</span>),
            dataIndex: BREAK_EVEN_ACOS,
            key: BREAK_EVEN_ACOS,
            width: '170px',
            editType: 'percent',
            render: (value) => value ? `${value}%` : '-'
        }] : [],
        {
            title: 'Total Changes',
            dataIndex: TOTAL_CHANGES,
            key: TOTAL_CHANGES,
            width: '100px',
            align: 'right',
            render: (value) => value ?? '-'
        },
        ...isAdmin ? [{
            title: 'BSR Tracking',
            dataIndex: BSR_TRACKING,
            key: BSR_TRACKING,
            width: '120px',
            align: 'center',
            editType: 'checkbox',
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
            editType: 'editable-text',
            render: (value) => value ? <div className="friendly-name">{value}</div> : '-'
        }] : [],
        ...isAgencyClient ? [{
            title: () => <div
                onClick={switchStrategyDescription}
            >
                <span>Advertising Strategy</span>

                <i className={strategiesDescriptionState ? 'opened' : ''}>
                    <SVG id={'right-icon'}/>
                </i>
            </div>,
            dataIndex: ADVERTISING_STRATEGY,
            key: ADVERTISING_STRATEGY,
            className: 'advertising-strategy-column',
            width: '200px',
            editType: 'select',
            options: advertisingStrategyVariations,
            render: value => _.find(advertisingStrategyVariations, {value: value}).label
        }] : []
    ]

    const rowSelection = {
        onChange: (selectedRows, type) => {
            if (type) {
                setSelectedAll(true)
                setSelectedRows(products.map(i => i.id))
            } else {
                setSelectedRows(selectedRows)
                setSelectedAll(false)
            }
        }
    }

    useEffect(() => {
        setSelectedRows([])
        setSelectedAll(false)
    }, [requestParams])

    return (
        <div className="row">
            <div className={`table-block ${strategiesDescriptionState ? 'opened' : ''}`}>
                <MultiApply
                    visible={selectedRows.length > 0}
                    selectedRows={selectedRows}
                    totalSize={requestParams.totalSize}
                    onSelectAll={() => rowSelection.onChange([], true)}
                    selectedAll={selectedAll}

                    onSubmit={(value, success) => onSubmitSettingParams({
                        ...value,
                        ...!selectedAll && {product_id: selectedRows},
                    }, success)}
                />

                <CustomTable
                    key={'table'}
                    rowKey="id"
                    dataSource={products}
                    columns={columns}
                    loading={processing}
                    fixedColumns={[0]}
                    emptyText={'image'}

                    rowSelection={rowSelection}
                    openedRow={(product) => product.id === openedProduct}
                    selectedAll={selectedAll}
                    selectedRows={selectedRows}

                    expandedRowRender={expandedRowRender}

                    onUpdateField={onUpdateField}

                />

                <Pagination
                    onChange={onChangePagination}
                    page={requestParams.page}
                    pageSizeOptions={[10, 30, 50]}
                    pageSize={requestParams.pageSize}
                    totalSize={requestParams.totalSize}
                    listLength={products.length}
                    processing={processing}
                    disabled={(!processing && (!products || products.length === 0))}
                />


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
            </div>

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
    )
}

const ProductItem = ({product: {image_url, asin, name, id, variations}, openedProduct, onOpenVariations}) => {
    return (<div className="product">
        <div className="image">
            <img src={amazonDefaultImageUrls.includes(image_url) ? noImage : image_url}/>
        </div>

        <a
            target={'_blank'}
            href={`https://www.amazon.${amazonDomain()}/dp/${asin}`}
            className={'short-name'}
            title={name}
        >
            {name}
        </a>

        <div
            className={`open-children-list-button ${variations ? 'has-variations' : ''} ${openedProduct === id ? 'opened' : ''}`}
            onClick={variations ? () => onOpenVariations(openedProduct === id ? undefined : id) : false}
        >
            {variations && <SVG id='select-icon'/>}
        </div>
    </div>)
}

export default ProductList