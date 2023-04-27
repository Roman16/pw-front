import React from "react"
import moment from "moment"
import './Filters.less'
import {metricKeys} from "../../../Analytics/componentsV2/MainMetrics/metricsList"
import _ from 'lodash'
import {useSelector} from "react-redux"
import {stringVariations} from '../../../Analytics/components/TableFilters/FilterWindow'

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
    'expandedASIN': 'Expanded ASIN',
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
//
    'SponsoredProducts': 'Sponsored Products',
    'SponsoredBrands': 'Sponsored Brands',
    'SponsoredDisplay': 'Sponsored Display',
//
    'autoTargeting': 'Auto Targeting',
    'manualTargeting': 'Manual Targeting',
//
    'Auto': 'Auto',
    'Manual': 'Manual',
    'Views Remarketing': 'Views Remarketing',
    'Audiences': 'Audiences',
    'Product Targeting': 'Product Targeting',
    'Product Collection': 'Product Collection',
    'Video': 'Video',
//
    'Critical': 'Critical',
    'Major': 'Major',
    'Minor': 'Minor',
    'PoorPerformingTargetings': 'Poor Performing Targetings',
    'DuplicateTargetings': 'Duplicate Targetings',
    'PoorSemanticCore': 'Poor Semantic Core',
    'TargetingsHarvesting': 'Targetings Harvesting',
    'AllCampaigns': 'All Campaigns',
    'Campaign': 'Campaign',
    'AdGroup': 'Ad Group',
    'ProductAd': 'Product Ad',
    'Keyword': 'Keyword',
    'ProductTargeting': 'Product Targeting',
    'CustomerSearchTerm': 'Customer Search Term',
}

export const issuesTypeEnums = [
    {
        title: 'Ad Group Does Not Have All Negatives',
        key: 'AdGroupDoesNotHaveAllNegatives',
        value: 'AdGroupDoesNotHaveAllNegatives'
    },
    {title: 'Ad Group With Foreign Products', key: 'AdGroupWithForeignProducts', value: 'AdGroupWithForeignProducts'},
    {title: 'Average ASIN PTs', key: 'AverageASINPTs', value: 'AverageASINPTs'},
    {title: 'Average Broad Keywords', key: 'AverageBroadKeywords', value: 'AverageBroadKeywords'},
    {title: 'Average Keywords', key: 'AverageKeywords', value: 'AverageKeywords'},
    {title: 'Average Long Tail Keywords', key: 'AverageLongTailKeywords', value: 'AverageLongTailKeywords'},
    {
        title: 'Found Ad Groups With Foreign Products',
        key: 'FoundAdGroupsWithForeignProducts',
        value: 'FoundAdGroupsWithForeignProducts'
    },
    {title: 'Low ASIN PTs', key: 'LowASINPTs', value: 'LowASINPTs'},
    {title: 'Low Broad Keywords', key: 'LowBroadKeywords', value: 'LowBroadKeywords'},
    {title: 'Low Keywords', key: 'LowKeywords', value: 'LowKeywords'},
    {title: 'Low Long Tail Keywords', key: 'LowLongTailKeywords', value: 'LowLongTailKeywords'},
    {title: 'No ASIN PTs', key: 'NoASINPTs', value: 'NoASINPTs'},
    {title: 'No Auto Campaigns', key: 'NoAutoCampaigns', value: 'NoAutoCampaigns'},
    {title: 'No Brand Keywords', key: 'NoBrandKeywords', value: 'NoBrandKeywords'},
    {title: 'No Broad Keywords', key: 'NoBroadKeywords', value: 'NoBroadKeywords'},
    {title: 'No Category PTs', key: 'NoCategoryPTs', value: 'NoCategoryPTs'},
    {title: 'No Keywords', key: 'NoKeywords', value: 'NoKeywords'},
    {title: 'No Long Tail Keywords', key: 'NoLongTailKeywords', value: 'NoLongTailKeywords'},
    {title: 'Obsolete Auto Campaign', key: 'ObsoleteAutoCampaign', value: 'ObsoleteAutoCampaign'},
    {title: 'Should Change Keyword Bid ACoS', key: 'ShouldChangeKeywordBidACoS', value: 'ShouldChangeKeywordBidACoS'},
    {
        title: 'Should Change Keyword Bid Impressions',
        key: 'ShouldChangeKeywordBidImpressions',
        value: 'ShouldChangeKeywordBidImpressions'
    },
    {title: 'Should Change PT Bid ACoS', key: 'ShouldChangePTBidACoS', value: 'ShouldChangePTBidACoS'},
    {
        title: 'Should Change PT Bid Impressions',
        key: 'ShouldChangePTBidImpressions',
        value: 'ShouldChangePTBidImpressions'
    },
    {title: 'Should Create Keyword From CST', key: 'ShouldCreateKeywordFromCST', value: 'ShouldCreateKeywordFromCST'},
    {
        title: 'Should Create Negative Keyword From CST High ACoS',
        key: 'ShouldCreateNegativeKeywordFromCSTHighACoS',
        value: 'ShouldCreateNegativeKeywordFromCSTHighACoS'
    },
    {
        title: 'Should Create Negative Keyword From CST No Sales',
        key: 'ShouldCreateNegativeKeywordFromCSTNoSales',
        value: 'ShouldCreateNegativeKeywordFromCSTNoSales'
    },
    {
        title: 'Should Create Negative PT From CST High ACoS',
        key: 'ShouldCreateNegativePTFromCSTHighACoS',
        value: 'ShouldCreateNegativePTFromCSTHighACoS'
    },
    {
        title: 'Should Create Negative PT From CST No Sales',
        key: 'ShouldCreateNegativePTFromCSTNoSales',
        value: 'ShouldCreateNegativePTFromCSTNoSales'
    },
    {title: 'Should Create PT From CST', key: 'ShouldCreatePTFromCST', value: 'ShouldCreatePTFromCST'},
    {
        title: 'Should Pause Keyword Duplicate From Customer Search Term',
        key: 'ShouldPauseKeywordDuplicateFromCustomerSearchTerm',
        value: 'ShouldPauseKeywordDuplicateFromCustomerSearchTerm'
    },
    {title: 'Should Pause Keyword Duplicate', key: 'ShouldPauseKeywordDuplicate', value: 'ShouldPauseKeywordDuplicate'},
    {
        title: 'Should Pause Keyword Duplicate Of PT',
        key: 'ShouldPauseKeywordDuplicateOfPT',
        value: 'ShouldPauseKeywordDuplicateOfPT'
    },
    {title: 'Should Pause Keyword High ACoS', key: 'ShouldPauseKeywordHighACoS', value: 'ShouldPauseKeywordHighACoS'},
    {title: 'Should Pause Keyword No Sales', key: 'ShouldPauseKeywordNoSales', value: 'ShouldPauseKeywordNoSales'},
    {title: 'Should Pause PT Duplicate', key: 'ShouldPausePTDuplicate', value: 'ShouldPausePTDuplicate'},
    {title: 'Should Pause PT High ACoS', key: 'ShouldPausePTHighACoS', value: 'ShouldPausePTHighACoS'},
    {title: 'Should Pause PT No Sales', key: 'ShouldPausePTNoSales', value: 'ShouldPausePTNoSales'},
    {title: 'Too Much Broad Keywords', key: 'TooMuchBroadKeywords', value: 'TooMuchBroadKeywords'},
]

const numberMark = {
    'gt': '>',
    'eq': '=',
    'lt': '<',
    'gte': '>=',
    'lte': '<=',
    'neq': '!=',
}

const columnTitle = (location) => ({
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
    'attributedUnitsOrdered': 'Ad Units',
    'attributedSales': 'Ad Sales',
    'attributedConversions': 'Ad Orders',
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
    'campaignState': 'Campaign Status',
    'adGroupState': 'Ad Group Status',
    'targetings_count': 'Total Targets',
    'product_ads_count': 'Products',
    'calculatedBid': 'Bid',
    'placementName': 'Placement',
    'advertisingType': 'Advertising Type',
    'calculatedTargetingType': 'Targeting Type',
    'calculatedCampaignSubType': 'Sub Type',
    'calculatedBudget': 'Budget',
    'problemLevel': 'Problem Level',
    [metricKeys['icvr']]: 'Ad ICVR',
    [metricKeys['rpc']]: 'RPC',
    [metricKeys['rpi']]: 'RPI',
    [metricKeys['organicRate']]: 'Organic Rate',
    [metricKeys['SPAdSales']]: 'SP Ad Sales',
    [metricKeys['SDAdSales']]: 'SD Ad Sales',
    [metricKeys['SBAdSales']]: 'SB Ad Sales',
    [metricKeys['adSalesSameSKU']]: 'Ad Sales Same SKU',
    [metricKeys['adSalesOtherSKU']]: 'Ad Sales Other SKU',
    [metricKeys['cpm']]: 'CPM',
    [metricKeys['bidCPC']]: 'Bid - CPC',
    [metricKeys['organicUnits']]: 'Organic Units',

    'severity': 'Severity',
    'group': 'Group',
    'issueObjectType': 'Object Type',
    'issueType': 'Type',
    'total_returns_count': 'Returns',

    'margin_percent': 'Margin Percent',
    'name': location === 'ad-groups' ? 'Ad Group' : 'Campaign',
    'product_name_sku_asin': 'Product',
    'product_name': 'Product',
    'calculatedTargetingText': 'Keyword / PT',
    'query': 'Query',
    'margin': 'Margin',
})


export const FilterItem = ({filter}) => {
    const location = useSelector(state => state.analytics.location)

    if (filter.filterBy === 'datetime') {
        return (
            <>
                {`${filter.value.startDate === 'lifetime' ? 'lifetime' : moment(filter.value.startDate).format('MMM DD, YYYY')} - ${filter.value.endDate === 'lifetime' ? 'lifetime' : moment(filter.value.endDate).format('MMM DD, YYYY')}`}
            </>
        )
    } else if (filter.filterBy === 'issueType') {
        return (
            <>
                Type is one
                of: {filter.value.map(item => _.find(issuesTypeEnums, {key: item}).title).join(', ')}
            </>
        )
    } else if (stringVariations.some(i => i.key === filter.type.key)) {
        return (
            <>
                {`${columnTitle(location)[filter.filterBy]} ${filter.type.key.replace('_', ' ')}: ${filter.value}`}
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
        filter.filterBy === metricKeys['icvr'] ||
        filter.filterBy === metricKeys['rpc'] ||
        filter.filterBy === metricKeys['rpi'] ||
        filter.filterBy === metricKeys['organicRate'] ||
        filter.filterBy === metricKeys['SPAdSales'] ||
        filter.filterBy === metricKeys['SDAdSales'] ||
        filter.filterBy === metricKeys['SBAdSales'] ||
        filter.filterBy === metricKeys['adSalesSameSKU'] ||
        filter.filterBy === metricKeys['adSalesOtherSKU'] ||
        filter.filterBy === metricKeys['cpm'] ||
        filter.filterBy === metricKeys['bidCPC'] ||
        filter.filterBy === metricKeys['organicUnits'] ||
        filter.filterBy === metricKeys['margin'] ||
        filter.filterBy === 'cpa' ||
        filter.filterBy === 'cpc' ||
        filter.filterBy === 'cost' ||
        filter.filterBy === 'ctr' ||
        filter.filterBy === 'total_ordered_quantity' ||
        filter.filterBy === 'total_ordered_quantity_cleared' ||
        filter.filterBy === 'total_orders_count' ||
        filter.filterBy === 'conversion_rate' ||
        filter.filterBy === 'attributedUnitsOrdered' ||
        filter.filterBy === 'attributedConversions' ||
        filter.filterBy === 'attributedSales' ||
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
        filter.filterBy === 'calculatedBudget' ||
        filter.filterBy === 'product_ads_count' ||
        filter.filterBy === 'total_returns_count' ||
        filter.filterBy === 'margin_percent' ||
        filter.filterBy === 'profit') {
        return (
            <>
                {`${columnTitle()[filter.filterBy]} ${numberMark[filter.type.key]} ${filter.value}`}
            </>
        )
    } else if (filter.filterBy === 'keyword_id' || filter.filterBy === 'problemLevel') {
        return (
            <>
                {`${columnTitle()[filter.filterBy]} = ${filter.value}`}
            </>
        )
    } else if (filter.type.key === 'one_of') {
        return (
            <>
                {columnTitle()[filter.filterBy]} is one of: {filter.value.map(item => valueTile[item]).join(', ')}
            </>
        )
    } else if (filter.type.key === 'except') {
        return (
            <>
                {columnTitle()[filter.filterBy]} except: {filter.value.map(item => valueTile[item]).join(', ')}
            </>
        )
    }
}
