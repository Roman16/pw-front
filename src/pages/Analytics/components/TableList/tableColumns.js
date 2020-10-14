import React from "react"
import moment from "moment"
import {numberMask} from "../../../../utils/numberMask"
import {round} from "../../../../utils/round"
import {Link} from "react-router-dom"

export const renderNumberField = (type = 'number') => {
    switch (type) {
        case 'number':
            return ({render: (number) => (number && number !== null ? numberMask(number, 0) : '-')})

        case 'percent':
            return ({render: (number) => (number && number !== null ? `${round(number * 100, 2)}%` : '-')})

        case 'currency':
            return ({render: (number) => (number && number !== null ? number < 0 ? `- $${numberMask(Math.abs(number), 2)}` : `$${numberMask(number, 2)}` : '-')})

        default:
            return ({})
    }
}


export const statusColumn = {
    title: 'Status',
    dataIndex: 'state',
    key: 'state',
    width: '150px',
    render: (status, item) => (<>{status === 'active' && <span className={'status active'}>Active</span>}
        {status === 'inactive' && <span className={'status inactive'}>Inactive</span>}
        {status === 'paused' && <span className={'status paused'}>Paused</span>}
        {status === 'archived' && <span className={'status archived'}>Archived</span>}
    </>),
    sorter: true
}

export const dateColumn = {
    render: (date) => (date && moment(date).format('DD.MM.YYYY')),
}

export const impressionsColumn = {
    title: 'Impressions',
    dataIndex: 'impressions',
    key: 'impressions',
    width: '150px',
    sorter: true,
    filter: true,
    ...renderNumberField()
}

export const clicksColumn = {
    title: 'Clicks',
    dataIndex: 'clicks',
    key: 'clicks',
    width: '150px',
    sorter: true,
    filter: true,
    ...renderNumberField()
}

export const ctrColumn = {
    title: 'CTR',
    dataIndex: 'ctr',
    key: 'ctr',
    width: '150px',
    sorter: true,
    ...renderNumberField('percent')
}

export const adSpendColumn = {
    title: 'Ad Spend',
    dataIndex: 'cost',
    key: 'cost',
    width: '150px',
    sorter: true,
    ...renderNumberField('currency')
}

export const cpcColumn = {
    title: 'CPC',
    dataIndex: 'cpc',
    key: 'cpc',
    width: '150px',
    sorter: true,
    ...renderNumberField('currency')
}

export const adSalesColumn = {
    title: 'Ad Sales',
    dataIndex: 'ad_sales',
    key: 'ad_sales',
    width: '150px',
    sorter: true,
    ...renderNumberField('currency')
}

export const acosColumn = {
    title: 'ACoS',
    dataIndex: 'acos',
    key: 'acos',
    width: '150px',
    sorter: true,
    filter: true,
    ...renderNumberField('percent')
}

export const adCvrColumn = {
    title: 'Ad CVR',
    dataIndex: 'conversion_rate',
    key: 'conversion_rate',
    width: '150px',
    sorter: true,
    ...renderNumberField('percent')
}

export const cpaColumn = {
    title: 'CPA',
    dataIndex: 'cpa',
    key: 'cpa',
    width: '150px',
    sorter: true,
    ...renderNumberField('currency')
}

export const adOrdersColumn = {
    title: 'Ad Orders',
    dataIndex: 'ordered_quantity',
    key: 'ordered_quantity',
    width: '150px',
    sorter: true,
    ...renderNumberField()
}

export const adUnitsColumn = {
    title: 'Ad Units',
    dataIndex: 'ad_units_ordered',
    key: 'ad_units_ordered',
    width: '150px',
    sorter: true,
    ...renderNumberField()
}

export const roasColumn = {
    title: 'ROAS',
    dataIndex: 'roas',
    key: 'roas',
    width: '150px',
    sorter: true,
    ...renderNumberField('percent')
}

export const salesShareColumn = {
    title: 'Sales Share',
    dataIndex: 'sales_share',
    key: 'sales_share',
    width: '150px',
    sorter: true,
    ...renderNumberField('percent')
}

export const budgetAllocationColumn = {
    title: 'Budget Allocation',
    dataIndex: 'budget_allocation',
    key: 'budget_allocation',
    width: '200px',
    sorter: true,
    ...renderNumberField('percent')
}

export const adProfitColumn = {
    title: 'Ad Profit',
    dataIndex: 'profit',
    key: 'profit',
    width: '150px',
    sorter: true,
    ...renderNumberField('currency')
}

export const campaignColumn = {
    title: 'Campaign',
    dataIndex: 'campaign',
    key: 'campaign',
    minWidth: '200px',
    sorter: true,
    render: (campaign, item) => (<Link to={`/analytics/ad-groups?campaignId=${item.id}`}>{campaign}</Link>)
}

export const adGroupColumn = {
    title: 'Ad Group',
    dataIndex: 'ad_group',
    key: 'ad_group',
    minWidth: '200px',
    sorter: true,
    filter: true,
    render: (adGroup, item) => (
        <Link to={`/analytics/product-ads?campaignId=${item.campaignId}&adGroupId=${item.id}`}>
            {adGroup}
        </Link>
    )
}
