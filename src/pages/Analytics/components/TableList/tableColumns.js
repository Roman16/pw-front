import React from "react"
import moment from "moment"
import {numberMask} from "../../../../utils/numberMask"
import {round} from "../../../../utils/round"
import {Link} from "react-router-dom"
import {SVG} from "../../../../utils/icons"
import InformationTooltip from "../../../../components/Tooltip/Tooltip"
import {Popover} from "antd"
import {useDispatch, useSelector} from "react-redux"
import {analyticsActions} from "../../../../actions/analytics.actions"
import _ from "lodash"
import defaultProductImage from '../../../../assets/img/default-product-image.svg'
import {valueTile} from "../../../PPCAutomate/Report/Filters/FilterItem"
import {amazonDefaultImageUrls} from "../../../../components/ProductList/ProductItem"
import noImage from "../../../../assets/img/no-image-available.svg"
import {RenderMetricChanges} from "../MainMetrics/MetricItem"
import {marketplaceIdValues} from "../../../../constans/amazonMarketplaceIdValues"
import {automatePatDescription} from "../../Targetings/TargetingsList/TargetingsList"

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
                    prevValue={item[`${dataIndex}_prev`]}
                    diff={+item[`${dataIndex}_prev`] === 0 ? null : (+number - +item[`${dataIndex}_prev`]) / +item[`${dataIndex}_prev`]}
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


                    {/*<Link*/}
                    {/*    to={`/analytics/overview?productId=${product.productId}&isParent=${true}`}*/}
                    {/*    className={'see-all-link'}*/}
                    {/*    onClick={() => setStateHandler('ad-groups', {*/}
                    {/*        name: {productName: product.product_name},*/}
                    {/*        productId: product.productId*/}
                    {/*    })}*/}
                    {/*>*/}
                    {/*    See all*/}
                    {/*</Link>*/}
                </div>}
            >
                <i> <SVG id={'home-icon'}/></i>
            </Popover>}
        </div>
    )
}

export const keywordPTColumn = {
    render: (text, item) => {
        if (item.calculatedTargetingMatchType === 'asin' || item.calculatedTargetingMatchType === 'negativeAsin' || item.calculatedTargetingMatchType === 'negativeASIN') {
            const asin = text.replace('asin="', '').replace('"', '')

            return (<div className="asin-link"><span>asin= </span>
                <a
                    href={`https://www.amazon.com/dp/${asin}`}
                    target={'_blank'}
                >
                    {asin}
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
    sorter: true,
    noTotal: true,
    render: (text, item) => <div className={'sku-asin'}>
        <div title={item.sku}><b>SKU:</b> {item.sku}</div>
        <div title={item.asin}><b>ASIN:</b>
            <a target={'_blank'}
               href={`https://www.amazon.${item.marketplaceId ? marketplaceIdValues[item.marketplaceId].domain : 'com'}/dp/${item.asin}`}
            >
                {item.asin}
            </a>
        </div>
    </div>
}

export const clicksColumn = {
    title: 'Clicks',
    dataIndex: 'clicks',
    key: 'clicks',
    minWidth: '90px',
    sorter: true,
    filter: true,
    align: 'right',
    ...renderNumberField()
}

export const ctrColumn = {
    title: 'CTR',
    dataIndex: 'ctr',
    key: 'ctr',
    minWidth: '90px',
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
    minWidth: '130px',
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
    width: '150px',
    sorter: true,
    locked: true,
    noTotal: true,
    filter: true,
    render: (type) => valueTile[type]
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
        <Link to={`/analytics/product-ads?campaignId=${item.campaignId}&adGroupId=${item.adGroupName}`}>
            {item.adGroupName}
        </Link>
    )
}
