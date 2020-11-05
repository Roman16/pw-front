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
    render: (status, item) => (<>{status === 'enabled' && <span className={'status active'}>Enabled</span>}
        {status === 'inactive' && <span className={'status inactive'}>Inactive</span>}
        {status === 'paused' && <span className={'status paused'}>Paused</span>}
        {status === 'archived' && <span className={'status archived'}>Archived</span>}
    </>),
    sorter: true,
    filter: true,
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
    minWidth: '90px',
    sorter: true,
    filter: true,
    ...renderNumberField()
}

export const ctrColumn = {
    title: 'CTR',
    dataIndex: 'ctr',
    key: 'ctr',
    minWidth: '90px',
    sorter: true,
    filter: true,
    ...renderNumberField('percent')
}

export const adSpendColumn = {
    title: 'Ad Spend',
    dataIndex: 'cost',
    key: 'cost',
    minWidth: '130px',
    sorter: true,
    filter: true,
    ...renderNumberField('currency')
}

export const cpcColumn = {
    title: 'CPC',
    dataIndex: 'cpc',
    key: 'cpc',
    minWidth: '90px',
    sorter: true,
    filter: true,
    ...renderNumberField('currency')
}

export const adSalesColumn = {
    title: 'Ad Sales',
    dataIndex: 'attributedSales30d',
    key: 'attributedSales30d',
    minWidth: '130px',
    sorter: true,
    filter: true,
    ...renderNumberField('currency')
}

export const acosColumn = {
    title: 'ACoS',
    dataIndex: 'acos',
    key: 'acos',
    minWidth: '90px',
    sorter: true,
    filter: true,
    ...renderNumberField('percent')
}

export const adCvrColumn = {
    title: 'Ad CVR',
    dataIndex: 'conversion_rate',
    key: 'conversion_rate',
    minWidth: '120px',
    sorter: true,
    filter: true,
    ...renderNumberField('percent')
}

export const cpaColumn = {
    title: 'CPA',
    dataIndex: 'cpa',
    key: 'cpa',
    minWidth: '90px',
    sorter: true,
    filter: true,
    ...renderNumberField('currency')
}

export const adOrdersColumn = {
    title: 'Ad Orders',
    dataIndex: 'attributedConversions30d',
    key: 'attributedConversions30d',
    minWidth: '130px',
    sorter: true,
    filter: true,
    ...renderNumberField()
}

export const adUnitsColumn = {
    title: 'Ad Units',
    dataIndex: 'attributedUnitsOrdered30d',
    key: 'attributedUnitsOrdered30d',
    minWidth: '130px',
    sorter: true,
    filter: true,
    ...renderNumberField()
}

export const roasColumn = {
    title: 'ROAS',
    dataIndex: 'roas',
    key: 'roas',
    minWidth: '90px',
    sorter: true,
    filter: true,
    ...renderNumberField('percent')
}

export const salesShareColumn = {
    title: 'Sales Share',
    dataIndex: 'sales_share',
    key: 'sales_share',
    minWidth: '130px',
    sorter: true,
    filter: true,
    ...renderNumberField('percent')
}

export const budgetAllocationColumn = {
    title: 'Budget Allocation',
    dataIndex: 'budget_allocation',
    key: 'budget_allocation',
    minWidth: '170px',
    sorter: true,
    filter: true,
    ...renderNumberField('percent')
}

export const adProfitColumn = {
    title: 'Ad Profit',
    dataIndex: 'ad_profit',
    key: 'ad_profit',
    minWidth: '100px',
    sorter: true,
    filter: true,
    ...renderNumberField('currency')
}

export const campaignColumn = {
    title: 'Campaign',
    dataIndex: 'campaignName',
    key: 'campaignName',
    width: '350px',
    sorter: true,
    filter: true,
}

export const adGroupColumn = {
    title: 'Ad Group',
    dataIndex: 'adGroupName',
    key: 'adGroupName',
    minWidth: '200px',
    sorter: true,
    filter: true,
    render: (adGroup, item) => (
        <Link to={`/analytics/product-ads?campaignId=${item.campaignId}&adGroupId=${item.adGroupName}`}>
            {item.adGroupName}
        </Link>
    )
}
