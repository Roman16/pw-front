import React, {useEffect, useRef, useState} from "react"
import moment from "moment"
import {numberMask} from "../../../../utils/numberMask"
import {round} from "../../../../utils/round"
import {Link} from "react-router-dom"
import {SVG} from "../../../../utils/icons"
import InformationTooltip from "../../../../components/Tooltip/Tooltip"
import {Popover, Tooltip} from "antd"
import {useDispatch, useSelector} from "react-redux"
import {analyticsActions} from "../../../../actions/analytics.actions"
import _ from "lodash"
import defaultProductImage from '../../../../assets/img/default-product-image.svg'
import {valueTile} from "../../../PPCAutomate/Report/Filters/FilterItem"
import {amazonDefaultImageUrls} from "../../../../components/ProductList/ProductItem"
import noImage from "../../../../assets/img/no-image-available.svg"
import {RenderMetricChanges} from "../MainMetrics/MetricItem"
import {marketplaceIdValues} from "../../../../constans/amazonMarketplaceIdValues"
import {automatePatDescription} from "../../Targetings/tableComponents/columnList"
import InputCurrency from "../../../../components/Inputs/InputCurrency"
import DatePicker from "../../../../components/DatePicker/DatePicker"

export const numberColumns = [
    'clicks',
    'impressions',
    'ctr',
    'cost',
    'cpc',
    'attributedSales30d',
    'acos',
    'conversion_rate',
    'cpa',
    'attributedConversions30d',
    'attributedUnitsOrdered30d',
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

export const RenderMetricValue = ({number, type}) => {
    switch (type) {
        case 'number':
            return ((number !== null && number !== undefined ? numberMask(number, 0) : '-'))

        case 'percent':
            return ((number !== null && number !== undefined ? `${round(+number * 100, 2)}%` : '-'))

        case 'roas':
            return `${(number !== null ? `${round(+number, 2)}x` : '-')}`

        case 'currency':
            return ((number !== null && number !== undefined ? number < 0 ? `- $${numberMask(Math.abs(number), 2)}` : `$${numberMask(number, 2)}` : '-'))
    }
}

export const renderNumberField = (type = 'number', showDiff = true) => {
    return ({
        render: (number, item, array, dataIndex) => {
            return (<div className={'metric-value'}>
                <RenderMetricValue number={number} type={type}/>

                {item.compareWithPrevious && showDiff && <RenderMetricChanges
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

export const statusColumn = {
    title: 'Status',
    dataIndex: 'state',
    key: 'state',
    width: '150px',
    render: (status, item) => (<>{status === 'enabled' && <span className={'status active'}>Enabled</span>}
        {status === 'inactive' && <span className={'status inactive'}>Inactive</span>}
        {status === 'paused' && <span className={'status paused'}>Paused</span>}
        {status === 'archived' && <span className={'status archived'}>Archived</span>}
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

    const setStateHandler = (location, state) => {
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
                        to={`/analytics/overview?productId=${product.productId}&isParent=${isParent}`}
                        onClick={() => setStateHandler('ad-groups', {
                            name: {productName: product.product_name},
                            productId: product.productId
                        })}
                    >
                        <h4 title={product.product_name}>{product.product_name}</h4>
                    </Link>
                    <p>{product.product_price !== null && `$${numberMask(product.product_price, 2)}`}</p>
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
                                    to={`/analytics/overview?productId=${product.childs_product_id_array[index]}&isParent=${false}`}
                                    onClick={() => setStateHandler('ad-groups', {
                                        name: {productName: product.childs_product_name_array[index]},
                                        productId: product.childs_product_id_array[index]
                                    })}
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
                        to={`/analytics/overview?productId=${product.productId}&isParent=${true}`}
                        className={'see-all-link'}
                        onClick={() => setStateHandler('ad-groups', {
                            name: {productName: product.product_name},
                            productId: product.productId
                        })}
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
            return (<div className="asin-link"><span>asin="</span>
                <a
                    href={`https://www.amazon.com/dp/${asin}`}
                    target={'_blank'}
                >
                    {asin}
                </a>
                "
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
               href={`https://www.amazon.${item.product_marketplace_id ? marketplaceIdValues[item.product_marketplace_id].domain : 'com'}/dp/${item.asin}`}
            >
                {item.asin}
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
                        <p>America/Los_Angeles</p>
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

                    {value ? `$${value}` : ''}

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
    minWidth: '100px',
    sorter: true,
    filter: true,
    align: 'right',
    ...renderNumberField()
}

export const ctrColumn = {
    title: 'CTR',
    dataIndex: 'ctr',
    key: 'ctr',
    minWidth: '100px',
    sorter: true,
    filter: true,
    align: 'right',
    ...renderNumberField('percent')
}

export const adSpendColumn = {
    title: 'Ad Spend',
    dataIndex: 'cost',
    key: 'cost',
    minWidth: '130px',
    sorter: true,
    filter: true,
    align: 'right',
    ...renderNumberField('currency')
}

export const cpcColumn = {
    title: 'CPC',
    dataIndex: 'cpc',
    key: 'cpc',
    minWidth: '90px',
    sorter: true,
    filter: true,
    align: 'right',
    ...renderNumberField('currency')
}

export const adSalesColumn = {
    title: 'Ad Sales',
    dataIndex: 'attributedSales30d',
    key: 'attributedSales30d',
    minWidth: '150px',
    sorter: true,
    filter: true,
    align: 'right',
    ...renderNumberField('currency')
}

export const acosColumn = {
    title: 'ACoS',
    dataIndex: 'acos',
    key: 'acos',
    minWidth: '100px',
    sorter: true,
    filter: true,
    align: 'right',
    ...renderNumberField('percent')
}

export const adCvrColumn = {
    title: 'Ad CVR',
    dataIndex: 'conversion_rate',
    key: 'conversion_rate',
    minWidth: '120px',
    sorter: true,
    filter: true,
    align: 'right',
    ...renderNumberField('percent')
}

export const cpaColumn = {
    title: 'CPA',
    dataIndex: 'cpa',
    key: 'cpa',
    minWidth: '90px',
    sorter: true,
    filter: true,
    align: 'right',
    ...renderNumberField('currency')
}

export const adOrdersColumn = {
    title: 'Ad Orders',
    dataIndex: 'attributedConversions30d',
    key: 'attributedConversions30d',
    minWidth: '130px',
    sorter: true,
    filter: true,
    align: 'right',
    ...renderNumberField()
}

export const adUnitsColumn = {
    title: 'Ad Units',
    dataIndex: 'attributedUnitsOrdered30d',
    key: 'attributedUnitsOrdered30d',
    minWidth: '130px',
    sorter: true,
    filter: true,
    align: 'right',
    ...renderNumberField()
}

export const roasColumn = {
    title: 'ROAS',
    dataIndex: 'roas',
    key: 'roas',
    minWidth: '120px',
    sorter: true,
    filter: true,
    align: 'right',
    ...renderNumberField('roas')
}

export const salesShareColumn = {
    title: 'Sales Share',
    dataIndex: 'sales_share',
    key: 'sales_share',
    minWidth: '130px',
    sorter: true,
    align: 'right',
    ...renderNumberField('percent')
}

export const budgetAllocationColumn = {
    title: 'Budget Allocation',
    dataIndex: 'budget_allocation',
    key: 'budget_allocation',
    minWidth: '170px',
    sorter: true,
    align: 'right',
    ...renderNumberField('percent')
}

export const netProfitColumn = {
    title: 'Net Profit',
    dataIndex: 'total_profit',
    key: 'total_profit',
    minWidth: '120px',
    sorter: true,
    filter: true,
    align: 'right',
    ...renderNumberField('currency')
}
export const grossProfitColumn = {
    title: 'Gross Profit',
    dataIndex: 'total_profit_gross',
    key: 'total_profit_gross',
    minWidth: '150px',
    sorter: true,
    filter: true,
    align: 'right',
    ...renderNumberField('currency')
}
export const adProfitColumn = {
    title: 'Net Ad Profit',
    dataIndex: 'ad_profit',
    key: 'ad_profit',
    minWidth: '150px',
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
    locked: true,
    noTotal: true,
    filter: true,
    render: (type) => valueTile[type] || type
}

export const adGroupColumn = {
    title: 'Ad Group',
    dataIndex: 'adGroupName',
    key: 'adGroupName',
    minWidth: '200px',
    sorter: true,
    filter: true,
    noTotal: true,
    render: (adGroup, item) => (
        <Link to={`/analytics/product-ads?campaignId=${item.campaignId}&adGroupId=${item.adGroupId}`}>
            {item.adGroupName}
        </Link>
    )
}
