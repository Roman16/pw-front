import React from "react"
import moment from "moment"
import './Filters.less'

const valueTile = {
    'keyword': 'Keyword',
    'pt': 'PT',
    'campaign': 'Campaign',
    'ad_group': 'Ad Group',
    'product_ad': 'Product Ad',
    //---------------------------
    'auto': 'Auto',
    'manual': 'Manual',
    'enabled': 'Enabled',
    'inactive': 'Inactive',
    'paused': 'Paused',
    'archived': 'Archived',
    //---------------------------
    //reason
    'adjusted_bid': 'Adjusted bid',
    'activating_keyword': 'Activating keyword / PT',
    'not_profitable_keyword_pt': 'Not profitable keyword / PT',
    'created_keyword_pt': 'Created keyword / PT',
    'created_negative_keyword_pt': 'Created negative keyword / PT',
    'duplicate_keyword_pt': 'Duplicate keyword / PT',
    'created_campaign': 'Created campaign',
    'created_ad_group': 'Created ad group',
    'created_product_ad': 'Created product ad'
}

const numberMark = {
    'gt': '>',
    'eq': '=',
    'lt': '<',
    'gte': '>=',
    'lte': '<=',
    'neq': '!=',
}

const columnTitle = {
    'object': 'Object',
    'keyword_pt': 'Keyword / PT',
    'object_type': 'Object Type',
    'match_type': 'Match Type',
    'campaign_name': 'Campaign',
    'ad_group_name': 'Ad Group',
    'impressions': 'Impressions',
    'clicks': 'Clicks',
    'spend': 'Spend',
    'roas': 'ROAS',
    'sales_share': 'Sales Share',
    'sales': 'Sales',
    'ordered_quantity': 'Ad Orders',
    'cpa': 'CPA',
    'acos': 'ACoS',
    'keyword_id': 'Keyword ID',
    'profit': 'Ad Profit',
    'cost': 'Ad Spend',
    'ctr': 'CTR',
    'portfolioName': 'Portfolio',
    'conversion_rate': 'Ad CVR',
    'cpc': 'CPC',
    'type': 'Reason',
    'dailyBudget': 'Budget',
    'targetingType': 'Type',
    'budget_allocation': 'Budget Allocation',
}


export const FilterItem = ({filter}) => {
    if (filter.filterBy === 'datetime') {
        return (
            <>
                {`${filter.value.startDate === 'lifetime' ? 'lifetime' : moment(filter.value.startDate).format('MMM DD, YYYY')} - ${filter.value.endDate === 'lifetime' ? 'lifetime' : moment(filter.value.endDate).format('MMM DD, YYYY')}`}
            </>
        )
    } else if (filter.filterBy === 'object' || filter.filterBy === 'keyword_pt' || filter.filterBy === 'portfolioName' || filter.filterBy === 'campaign_name' || filter.filterBy === 'ad_group_name') {
        return (
            <>
                {`${columnTitle[filter.filterBy]} ${filter.type.key}: ${filter.value}`}
            </>
        )
    } else if (filter.filterBy === 'object_type' || filter.filterBy === 'match_type') {
        return (
            <>
                {`${columnTitle[filter.filterBy]} is one of: ${filter.value.map(item => valueTile[item]).join(', ')}`}
            </>
        )
    } else if (filter.filterBy === 'impressions' ||
        filter.filterBy === 'clicks' ||
        filter.filterBy === 'spend' ||
        filter.filterBy === 'sales' ||
        filter.filterBy === 'sales_share' ||
        filter.filterBy === 'acos'||
        filter.filterBy === 'roas'||
        filter.filterBy === 'cpa'||
        filter.filterBy === 'cpc'||
        filter.filterBy === 'cost'||
        filter.filterBy === 'ctr'||
        filter.filterBy === 'conversion_rate'||
        filter.filterBy === 'budget_allocation'||
        filter.filterBy === 'dailyBudget'||
        filter.filterBy === 'ordered_quantity'||
        filter.filterBy === 'profit') {
        return (
            <>
                {`${columnTitle[filter.filterBy]} ${numberMark[filter.type.key]} ${filter.value}`}
            </>
        )
    } else if (filter.filterBy === 'keyword_id') {
        return (
            <>
                {`${columnTitle[filter.filterBy]} = ${filter.value}`}
            </>
        )
    } else if (filter.type.key === 'one_of' ) {
        return (
            <>
                {columnTitle[filter.filterBy]} is one of: {filter.value.map(item => valueTile[item]).join(', ')}
            </>
        )
    }
}
