import React, {useEffect, useRef, useState} from "react"
import moment from "moment"
import {numberMask} from "../../../../utils/numberMask"
import {round} from "../../../../utils/round"
import {Link} from "react-router-dom"
import {SVG} from "../../../../utils/icons"
import InformationTooltip from "../../../../components/Tooltip/Tooltip"
import {Popover} from "antd"
import {useDispatch} from "react-redux"
import {analyticsActions} from "../../../../actions/analytics.actions"
import defaultProductImage from '../../../../assets/img/default-product-image.svg'
import {valueTile} from "../../../PPCAutomate/Report/Filters/FilterItem"
import {amazonDefaultImageUrls} from "../../../../components/ProductList/ProductItem"
import noImage from "../../../../assets/img/no-image-available.svg"
import {RenderMetricChanges} from "../../components/MainMetrics/MetricItem"
import {automatePatDescription} from "../../Targetings/tableComponents/columnList"
import InputCurrency from "../../../../components/Inputs/InputCurrency"
import DatePicker from "../../../../components/DatePicker/DatePicker"
import {metricKeys} from "../../components/MainMetrics/metricsList"
import {activeTimezone} from "../../../index"
import {currencyWithCode} from "../../../../components/CurrencyCode/CurrencyCode"
import {amazonDomain} from "../../../../utils/amazonDomain"
import {store} from "../../../../store/store"

const asinImageUrl = asin => `https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=US&ASIN=${asin}&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=SL150`

export const numberColumns = [
    'clicks',
    'impressions',
    'ctr',
    'cost',
    'cpc',
    'attributedSales',
    'acos',
    'conversion_rate',
    'cpa',
    'attributedConversions',
    'attributedUnitsOrdered',
    'roas',
    'sales_share',
    'budget_allocation',
    'total_profit',
    'total_profit_gross',
    'ad_profit',
    'startDate',
    'endDate',
    'dailyBudget',
    'campaigns_count',
    'macos',
    'organic_sales',
    'total_ordered_quantity',
    'total_ordered_quantity_cleared',
    'total_orders_count',
    'total_orders_count_cleared',
    'organic_orders_count',
    'total_sales',
    'total_returns_quantity',
    'total_sales_avg_price',
    'defaultBid',
    'targetings_count',
    'product_ads_count',
    'calculatedBid',
    'organic_profit'
]

export const RenderMetricValue = ({number, type, id, currencyCode}) => {
    switch (type) {
        case 'number':
            return ((number !== null && number !== undefined ? numberMask(number, 0) : '-'))

        case 'percent':
            return ((number !== null && number !== undefined ? `${round(+number * 100, id === metricKeys['icvr'] ? 4 : 2)}%` : '-'))

        case 'roas':
            return `${(number !== null ? `${round(+number, 2)}x` : '-')}`

        case 'currency':
            return ((number !== null && number !== undefined ? number < 0 ? <>- {currencyWithCode(numberMask(Math.abs(number), id === metricKeys['rpi'] ? 4 : 2, null, id === metricKeys['rpi'] ? 2 : undefined), currencyCode)} </> :
                currencyWithCode(numberMask(number, id === metricKeys['rpi'] ? 4 : 2, null, id === metricKeys['rpi'] ? 2 : undefined), currencyCode) : '-'))
    }
}


export const renderNumberField = (type = 'number', showDiff = true) => {
    return ({
        render: (number, item, array, dataIndex) => {
            const currencyCode = item?.currency_code || store.getState().user.activeAmazonMarketplace.currency_code || 'USD'

            return (<div className={'metric-value'}>
                <RenderMetricValue number={number} type={type} id={dataIndex} currencyCode={currencyCode}/>

                {item.compareWithPrevious && showDiff && <RenderMetricChanges
                    currencyCode={currencyCode}
                    value={number}
                    prevValue={item[`${dataIndex}_prev`] || undefined}
                    diff={item[`${dataIndex}_prev`] ? +item[`${dataIndex}_prev`] === 0 ? null : (+number - +item[`${dataIndex}_prev`]) / +item[`${dataIndex}_prev`] : null}
                    type={type}
                    name={dataIndex}
                    getPopupContainer={true}
                />}
            </div>)
        }
    })
}


export const ParentStatus = ({status, widthLabel=false}) => {
    switch (status) {
        case 'enabled':
            return <span className={'status active'}><i title={'Enabled'}><SVG id={'enabled-status'}/></i> {widthLabel && 'Enabled'}</span>
        case 'paused':
            return <span className={'status paused'}><i title={'Paused'}><SVG id={'paused-status'}/></i> {widthLabel && 'Paused'}</span>
        case 'archived':
            return <span className={'status archived'}><i title={'Archived'}><SVG id={'archived-status'}/></i> {widthLabel && 'Archived'}</span>
        default:
            return ''
    }
}

export const statusColumn = {
    title: 'Status',
    dataIndex: 'state',
    key: 'state',
    width: '150px',
    render: (status, item) => (<>{status === 'enabled' &&
    <span className={'status active'}><i><SVG id={'enabled-status'}/></i>Enabled</span>}
        {status === 'inactive' && <span className={'status inactive'}>Inactive</span>}
        {status === 'paused' && <span className={'status paused'}><i><SVG id={'paused-status'}/></i> Paused</span>}
        {status === 'archived' &&
        <span className={'status archived'}><i><SVG id={'archived-status'}/></i>Archived</span>}
    </>),
    sorter: true,
    filter: true,
    noTotal: true,
    fastUpdating: true
}

export const dateColumn = {
    render: (date) => (date && moment(date).format('DD.MM.YYYY')),
}

export const RenderProduct = ({product, isParent = false}) => {
    const dispatch = useDispatch()

    const setStateHandler = (location, state, event) => {
        if (event.ctrlKey || event.metaKey) return

        dispatch(analyticsActions.setLocation(location))
        dispatch(analyticsActions.setMainState(state))
    }

    return (
        <div className="product-field">
            <div className={'image'}>
                {amazonDefaultImageUrls.includes(product.product_image) ? <img src={noImage} alt=""/> :
                    <img
                        src={!product.product_name && (product.product_id === 0 || product.product_id == null) ? defaultProductImage : product.product_image}
                        alt=""/>}
            </div>

            {!product.product_name && (product.product_id === 0 || product.product_id == null) ?
                <h3 className={'not-found'}>Product not found</h3> :
                <div className="col">
                    <Link
                        to={`/analytics-v3/overview?productId=${product.productId}&isParent=${isParent}`}
                        onClick={(e) => setStateHandler('ad-groups', {
                            name: {productName: product.product_name},
                            productId: product.productId
                        }, e)}
                    >
                        <h4 title={product.product_name}>{product.product_name}</h4>
                    </Link>
                    <p>{product.product_price !== null &&
                    currencyWithCode(numberMask(product.product_price, 2))}</p>
                </div>}

            {product.childs_sku_array && product.childs_sku_array.length > 0 && <Popover
                placement="bottom"
                overlayClassName={'product-child-popover'}
                content={<div className="child-list">
                    <div className="header">
                        <div>
                            Child products <b>({product.childs_sku_array.length})</b>
                        </div>
                    </div>

                    <ul>
                        {[...product.childs_sku_array.slice(0, 5)].map((sku, index) => (
                            <li>
                                <Link
                                    to={`/analytics-v3/overview?productId=${product.childs_product_id_array[index]}&isParent=${false}`}
                                    onClick={(e) => setStateHandler('ad-groups', {
                                        name: {productName: product.childs_product_name_array[index]},
                                        productId: product.childs_product_id_array[index]
                                    }, e)}
                                >
                                    <div
                                        className={'name'}
                                        title={product.childs_product_name_array[index]}
                                    >
                                        {product.childs_product_name_array[index]}
                                    </div>

                                    <div className={'sku'}>{sku}</div>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {product.childs_sku_array.length > 5 && <p>And others</p>}

                    <Link
                        to={`/analytics-v3/overview?productId=${product.productId}&isParent=${true}`}
                        className={'see-all-link'}
                        onClick={(e) => setStateHandler('ad-groups', {
                            name: {productName: product.product_name},
                            productId: product.productId
                        }, e)}
                    >
                        See all
                    </Link>
                </div>}
            >
                <i> <SVG id={'home-icon'}/></i>
            </Popover>}
        </div>
    )
}

export const keywordPTColumn = {
    render: (text, item) => {
        if (text && (item.calculatedTargetingMatchType === 'asin' || item.calculatedTargetingMatchType === 'negativeAsin' || item.calculatedTargetingMatchType === 'negativeASIN')) {
            const asin = text.replace('asin="', '').replace('"', '')
            return (<div className="asin-link"><a
                    href={`https://www.amazon.${amazonDomain()}/dp/${asin}`}
                    target={'_blank'}
                >
                asin="{asin}"
                </a>
            </div>)
        } else if(text && item.calculatedTargetingMatchType === 'expandedASIN') {
            const asin = text.replace('asinExpandedFrom="', '').replace('"', '')
            return (<div className="asin-link"><span></span><a
                    href={`https://www.amazon.${amazonDomain()}/dp/${asin}`}
                    target={'_blank'}
                >
                asinExpandedFrom="{asin}"
                </a>
            </div>)
        } else {
            return (<>
                    <span className={'overflow-text'} title={text}>
                        {text}
                     </span>

                {item.calculatedTargetingMatchType === 'auto' && <InformationTooltip
                    title={text}
                    description={automatePatDescription[text]}
                />}
            </>)
        }
    }
}

export const impressionsColumn = {
    title: 'Impressions',
    dataIndex: 'impressions',
    key: 'impressions',
    width: '150px',
    sorter: true,
    filter: true,
    align: 'right',
    ...renderNumberField()
}


export const skuAsinColumn = {
    title: 'SKU/ASIN',
    dataIndex: 'sku_asin',
    key: 'sku_asin',
    width: '180px',
    locked: true,
    sorter: false,
    noTotal: true,
    render: (text, item) => <div className={'sku-asin'}>
        <div title={item.sku}><b>SKU:</b> {item.sku}</div>
        <div title={item.asin}><b>ASIN:</b>
            <a target={'_blank'}
               href={`https://www.amazon.${amazonDomain()}/dp/${item.asin}`}
            >
                <Popover
                    overlayClassName={'sku-asin-image-popover'}
                    content={<img src={asinImageUrl(item.asin)} alt=""/>}
                >
                    {item.asin}
                </Popover>
            </a>
        </div>
    </div>
}

export const EditableField = ({type, value, onUpdateField, id}) => {
    const [visibleEditableWindow, setVisibleEditableWindow] = useState(false)
    const wrapperRef = useRef(null)

    const submitFieldHandler = () => {
        onUpdateField({
            id,
            column: '',
            value: ''
        })

        // setVisibleEditableWindow(false)
    }

    useEffect(() => {
        function handleClickOutside({target}) {
            if (target && target.className) {
                if (target.className === 'icon' || target.parentNode.className === 'ant-popover-open' || target.parentNode.parentNode.className === 'ant-popover-open' || target.parentNode.parentNode.parentNode.className === 'ant-popover-open') {

                } else if (wrapperRef.current && !wrapperRef.current.contains(target)) {
                    setVisibleEditableWindow(false)
                }
            }
        }

        document.addEventListener("click", handleClickOutside, true)
        return () => {
            document.removeEventListener("click", handleClickOutside)
        }
    }, [wrapperRef])


    useEffect(() => {
        if (type === 'date' && visibleEditableWindow) {
            document.querySelector('section.list-section .table-overflow').addEventListener('scroll', () => {
                setVisibleEditableWindow(false)
            })
        }
    }, [visibleEditableWindow])

    if (type === 'date') {
        return (<div ref={wrapperRef}>

                <div className={'field-value'} onClick={() => setVisibleEditableWindow(prevState => !prevState)}>
                    {value ? `${moment(value).format('DD MMM YYYY')}` : 'No end date'}
                    <i className={'edit'}><SVG id={'edit-pen-icon'}/></i>
                </div>


                {visibleEditableWindow && <DatePicker
                    value={value ? moment(value) : moment()}
                    format={'DD MMM YYYY'}
                    open={visibleEditableWindow}
                    showToday={false}
                    className={'editable-date-picker'}
                    dropdownClassName={'edit-field-picker'}
                    // getCalendarContainer={(trigger) => trigger.parentNode.parentNode}
                    panelRender={<div>ttttt</div>}
                    renderExtraFooter={() => <>
                        <p>{activeTimezone}</p>
                        <div className="actions">
                            <button className={'btn default'} onClick={submitFieldHandler}>
                                Save
                            </button>

                            <button className={'btn white'} onClick={() => setVisibleEditableWindow(false)}>
                                Cancel
                            </button>
                        </div>
                    </>}
                />}
            </div>
        )
    } else {
        return (<div className={''} ref={wrapperRef}>
                <div className={'field-value'} onClick={() => setVisibleEditableWindow(prevState => !prevState)}>
                    {/*<InputCurrency disabled value={value}/>*/}

                    {value ? currencyWithCode(value) : ''}

                    <i className={'edit'}><SVG id={'edit-pen-icon'}/></i>
                </div>

                {visibleEditableWindow && <div className="editable-window">
                    <InputCurrency
                        value={value}
                        autoFocus={true}
                    />

                    <button className={'btn default'} onClick={submitFieldHandler}>Save</button>
                    <button className={'btn transparent'} onClick={() => setVisibleEditableWindow(false)}>Cancel
                    </button>
                </div>}
            </div>
        )
    }
}

export const clicksColumn = {
    title: 'Clicks',
    dataIndex: 'clicks',
    key: 'clicks',
    width: '100px',
    sorter: true,
    filter: true,
    align: 'right',
    ...renderNumberField()
}

export const ctrColumn = {
    title: 'CTR',
    dataIndex: 'ctr',
    key: 'ctr',
    width: '100px',
    sorter: true,
    filter: true,
    align: 'right',
    ...renderNumberField('percent')
}

export const adSpendColumn = {
    title: 'Ad Spend',
    dataIndex: 'cost',
    key: 'cost',
    width: '130px',
    sorter: true,
    filter: true,
    align: 'right',
    ...renderNumberField('currency')
}

export const cpcColumn = {
    title: 'CPC',
    dataIndex: 'cpc',
    key: 'cpc',
    width: '90px',
    sorter: true,
    filter: true,
    align: 'right',
    ...renderNumberField('currency')
}

export const adSalesColumn = {
    title: 'Ad Sales',
    dataIndex: 'attributedSales',
    key: 'attributedSales',
    width: '150px',
    sorter: true,
    filter: true,
    align: 'right',
    ...renderNumberField('currency')
}

export const adSalesSameSKUColumn = {
    title: 'Ad Sales Same SKU',
    dataIndex: metricKeys['adSalesSameSKU'],
    key: metricKeys['adSalesSameSKU'],
    width: '190px',
    sorter: true,
    filter: true,
    align: 'right',
    ...renderNumberField('currency')
}

export const adSalesOtherSKUColumn = {
    title: 'Ad Sales Other SKU',
    dataIndex: metricKeys['adSalesOtherSKU'],
    key: metricKeys['adSalesOtherSKU'],
    width: '190px',
    sorter: true,
    filter: true,
    align: 'right',
    ...renderNumberField('currency')
}

export const SBAdSalesColumn = {
    title: 'SB Ad Sales',
    dataIndex: metricKeys['SBAdSales'],
    key: metricKeys['SBAdSales'],
    width: '150px',
    sorter: true,
    filter: true,
    align: 'right',
    ...renderNumberField('currency')
}

export const SPAdSalesColumn = {
    title: 'SP Ad Sales',
    dataIndex: metricKeys['SPAdSales'],
    key: metricKeys['SPAdSales'],
    width: '150px',
    sorter: true,
    filter: true,
    align: 'right',
    ...renderNumberField('currency')
}
export const SDAdSalesColumn = {
    title: 'SD Ad Sales',
    dataIndex: metricKeys['SDAdSales'],
    key: metricKeys['SDAdSales'],
    width: '150px',
    sorter: true,
    filter: true,
    align: 'right',
    ...renderNumberField('currency')
}
export const RPCColumn = {
    title: 'RPC',
    dataIndex: metricKeys['rpc'],
    key: metricKeys['rpc'],
    width: '150px',
    sorter: true,
    filter: true,
    align: 'right',
    ...renderNumberField('currency')
}
export const RPIColumn = {
    title: 'RPI',
    dataIndex: metricKeys['rpi'],
    key: metricKeys['rpi'],
    width: '150px',
    sorter: true,
    filter: true,
    align: 'right',
    ...renderNumberField('currency')
}

export const acosColumn = {
    title: 'ACoS',
    dataIndex: 'acos',
    key: 'acos',
    width: '100px',
    sorter: true,
    filter: true,
    align: 'right',
    ...renderNumberField('percent')
}

export const adCvrColumn = {
    title: 'Ad CVR',
    dataIndex: 'conversion_rate',
    key: 'conversion_rate',
    width: '120px',
    sorter: true,
    filter: true,
    align: 'right',
    ...renderNumberField('percent')
}

export const cpaColumn = {
    title: 'CPA',
    dataIndex: 'cpa',
    key: 'cpa',
    width: '100px',
    sorter: true,
    filter: true,
    align: 'right',
    ...renderNumberField('currency')
}
export const ICVRColumn = {
    title: 'Ad ICVR',
    dataIndex: metricKeys['icvr'],
    key: metricKeys['icvr'],
    width: '120px',
    sorter: true,
    filter: true,
    align: 'right',
    ...renderNumberField('percent')
}
export const CPMColumn = {
    title: 'CPM',
    dataIndex: metricKeys['cpm'],
    key: metricKeys['cpm'],
    width: '100px',
    sorter: true,
    filter: true,
    align: 'right',
    ...renderNumberField('currency')
}

export const adOrdersColumn = {
    title: 'Ad Orders',
    dataIndex: 'attributedConversions',
    key: 'attributedConversions',
    width: '130px',
    sorter: true,
    filter: true,
    align: 'right',
    ...renderNumberField()
}

export const adUnitsColumn = {
    title: 'Ad Units',
    dataIndex: 'attributedUnitsOrdered',
    key: 'attributedUnitsOrdered',
    width: '130px',
    sorter: true,
    filter: true,
    align: 'right',
    ...renderNumberField()
}

export const roasColumn = {
    title: 'ROAS',
    dataIndex: 'roas',
    key: 'roas',
    width: '120px',
    sorter: true,
    filter: true,
    align: 'right',
    ...renderNumberField('roas')
}

export const salesShareColumn = {
    title: 'Sales Share',
    dataIndex: 'sales_share',
    key: 'sales_share',
    width: '130px',
    sorter: true,
    align: 'right',
    ...renderNumberField('percent')
}

export const budgetAllocationColumn = {
    title: 'Budget Allocation',
    dataIndex: 'budget_allocation',
    key: 'budget_allocation',
    width: '180px',
    sorter: true,
    align: 'right',
    ...renderNumberField('percent')
}

export const netProfitColumn = {
    title: 'Net Profit',
    dataIndex: 'total_profit',
    key: 'total_profit',
    width: '130px',
    sorter: true,
    filter: true,
    align: 'right',
    ...renderNumberField('currency')
}
export const grossProfitColumn = {
    title: 'Gross Profit',
    dataIndex: 'total_profit_gross',
    key: 'total_profit_gross',
    width: '150px',
    sorter: true,
    filter: true,
    align: 'right',
    ...renderNumberField('currency')
}
export const adProfitColumn = {
    title: 'Net Ad Profit',
    dataIndex: 'ad_profit',
    key: 'ad_profit',
    width: '150px',
    sorter: true,
    filter: true,
    align: 'right',
    ...renderNumberField('currency')
}

export const campaignColumn = {
    title: 'Campaign',
    dataIndex: 'campaignName',
    key: 'campaignName',
    width: '350px',
    sorter: true,
    filter: true,
    noTotal: true,
}

export const matchTypeColumn = {
    title: 'Match type',
    dataIndex: 'calculatedTargetingMatchType',
    key: 'calculatedTargetingMatchType',
    width: '200px',
    sorter: true,
    locked: false,
    noTotal: true,
    filter: true,
    render: (type) => valueTile[type] || type
}
export const returnedUnitsColumn = {
    title: 'Returned Units',
    dataIndex: 'total_returns_quantity',
    key: 'total_returns_quantity',
    width: '200px',
    sorter: true,
    filter: true,
}

export const adGroupColumn = {
    title: 'Ad Group',
    dataIndex: 'adGroupName',
    key: 'adGroupName',
    width: '200px',
    sorter: true,
    filter: true,
    noTotal: true,
    render: (adGroup, item) => (
        <Link to={`/analytics-v3/product-ads?campaignId=${item.campaignId}&adGroupId=${item.adGroupId}`}>
            {item.adGroupName}
        </Link>
    )
}
