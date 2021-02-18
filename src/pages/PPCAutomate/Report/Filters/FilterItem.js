import React from "react"
import moment from "moment"
import './Filters.less'

export const valueTile = {
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
    'asin': 'ASIN',
    'brand': 'Brand',
    'category': 'Category',
    'exact': 'Exact',
    'phrase': 'Phrase',
    'broad': 'Broad',
    'views': 'Views',
    'negativeExact': 'Negative Exact',
    'negativePhrase': 'Negative Phrase',
    'campaign_negativeExact': 'Campaign Negative Exact',
    'campaign_negativePhrase': 'Campaign Negative Phrase',
    //---------------------------
    //reason
    'adjusted_bid': 'Adjusted bid',
    'activating_keyword': 'Activating keyword / PT',
    'not_profitable_keyword_pt': 'Not profitable keyword / PT',
    'created_keyword_pt': 'Created keyword / PT',
    'created_negative_keyword_pt': 'Created negative keyword / PT',
    'negated_profitable_keyword_pt': 'Negated not profitable keyword / PT',
    'negated_keyword_pt_prevent_competition': 'Negated keyword / PT to prevent competition',
    'duplicate_keyword_pt': 'Duplicate keyword / PT',
    'created_campaign': 'Created campaign',
    'created_ad_group': 'Created ad group',
    'created_product_ad': 'Created product ad',
    'legacyForSales': 'Legacy For Sales',
    'autoForSales': 'Auto For Sales',
//
    'Top of Search on-Amazon': 'Top of Search on-Amazon',
    'Detail Page on-Amazon': 'Detail Page on-Amazon',
    'Other on-Amazon': 'Other on-Amazon',
    'Remarketing off-Amazon': 'Remarketing off-Amazon',
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
    'ad_profit': 'Net Ad Profit',
    'cost': 'Ad Spend',
    'ctr': 'CTR',
    'portfolioName': 'Portfolio',
    'conversion_rate': 'Ad CVR',
    'cpc': 'CPC',
    'type': 'Reason',
    'dailyBudget': 'Budget',
    'targetingType': 'Type',
    'budget_allocation': 'Budget Allocation',
    'attributedUnitsOrdered30d': 'Ad Units',
    'attributedSales30d': 'Ad Sales',
    'attributedConversions30d': 'Ad Orders',
    'bidding_strategy': 'Campaign bidding strategy',
    'campaignName': 'Campaign',
    'defaultBid': 'Default bid',
    'adGroupName': 'Ad Group',
    'campaigns_count': 'Сampaigns',
    'macos': 'MACoS',
    'organic_sales': 'Organic Sales',
    'total_ordered_quantity': 'Total Units',
    'total_ordered_quantity_cleared': 'Total Units Cleared',
    'total_orders_count': 'Total Orders',
    'total_orders_count_cleared': 'Total Orders Cleared',
    'organic_orders_count': 'Organic Orders',
    'total_sales': 'Total Sales',
    'total_returns_quantity': 'Returns',
    'organic_profit': 'Profit',
    'organic_profit_gross': 'Gross Profit',
    'calculatedTargetingMatchType': 'Match type',
    'total_sales_avg_price': 'Avg. Sale Price',
    'total_profit': 'Net Profit',
    'total_profit_gross': 'Gross Profit',
    'state': 'Status',
    'targetings_count': 'Total Targets',
    'product_ads_count': 'Products',
    'calculatedBid': 'Bid',
    'placementName': 'Placement',
}


export const FilterItem = ({filter}) => {
    if (filter.filterBy === 'datetime') {
        return (
            <>
                {`${filter.value.startDate === 'lifetime' ? 'lifetime' : moment(filter.value.startDate).format('MMM DD, YYYY')} - ${filter.value.endDate === 'lifetime' ? 'lifetime' : moment(filter.value.endDate).format('MMM DD, YYYY')}`}
            </>
        )
    } else if (filter.filterBy === 'object' || filter.filterBy === 'campaignName' || filter.filterBy === 'adGroupName' || filter.filterBy === 'keyword_pt' || filter.filterBy === 'portfolioName' || filter.filterBy === 'campaign_name' || filter.filterBy === 'ad_group_name') {
        return (
            <>
                {`${columnTitle[filter.filterBy]} ${filter.type.key}: ${filter.value}`}
            </>
        )
    } else if (filter.filterBy === 'impressions' ||
        filter.filterBy === 'clicks' ||
        filter.filterBy === 'spend' ||
        filter.filterBy === 'sales' ||
        filter.filterBy === 'sales_share' ||
        filter.filterBy === 'total_returns_quantity' ||
        filter.filterBy === 'acos' ||
        filter.filterBy === 'campaigns_count' ||
        filter.filterBy === 'roas' ||
        filter.filterBy === 'cpa' ||
        filter.filterBy === 'cpc' ||
        filter.filterBy === 'cost' ||
        filter.filterBy === 'ctr' ||
        filter.filterBy === 'total_ordered_quantity' ||
        filter.filterBy === 'total_ordered_quantity_cleared' ||
        filter.filterBy === 'total_orders_count' ||
        filter.filterBy === 'conversion_rate' ||
        filter.filterBy === 'attributedUnitsOrdered30d' ||
        filter.filterBy === 'attributedConversions30d' ||
        filter.filterBy === 'attributedSales30d' ||
        filter.filterBy === 'budget_allocation' ||
        filter.filterBy === 'dailyBudget' ||
        filter.filterBy === 'macos' ||
        filter.filterBy === 'organic_sales' ||
        filter.filterBy === 'defaultBid' ||
        filter.filterBy === 'ordered_quantity' ||
        filter.filterBy === 'organic_orders_count' ||
        filter.filterBy === 'total_sales' ||
        filter.filterBy === 'total_orders_count_cleared' ||
        filter.filterBy === 'ad_profit' ||
        filter.filterBy === 'total_sales_avg_price' ||
        filter.filterBy === 'organic_profit' ||
        filter.filterBy === 'organic_profit_gross' ||
        filter.filterBy === 'total_profit' ||
        filter.filterBy === 'total_profit_gross' ||
        filter.filterBy === 'targetings_count' ||
        filter.filterBy === 'calculatedBid' ||
        filter.filterBy === 'product_ads_count' ||
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
    } else if (filter.type.key === 'one_of') {
        return (
            <>
                {columnTitle[filter.filterBy]} is one of: {filter.value.map(item => valueTile[item]).join(', ')}
            </>
        )
    } else if (filter.type.key === 'except') {
        return (
            <>
                {columnTitle[filter.filterBy]} except: {filter.value.map(item => valueTile[item]).join(', ')}
            </>
        )
    }
}
