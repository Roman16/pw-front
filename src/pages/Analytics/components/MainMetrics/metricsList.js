import _ from 'lodash'

export const metricKeys = {
    'impressions': 'impressions',
    'clicks': 'clicks',
    'ctr': 'ctr',
    'cost': 'cost',
    'cpc': 'cpc',
    'total_orders': 'total_orders',
    'total_orders_pure': 'total_orders_pure',
    'attributedConversions30d': 'attributedConversions30d',
    'organic_orders': 'organic_orders',
    'total_sales': 'total_sales',
    'attributedSales30d': 'attributedSales30d',
    'organic_sales': 'organic_sales',
    'attributedUnitsOrdered30d': 'attributedUnitsOrdered30d',
    'total_units': 'total_units',
    'total_units_pure': 'total_units_pure',
    'acos': 'acos',
    'conversion_rate': 'conversion_rate',
    'cpa': 'cpa',
    'profit': 'profit',
    'ad_profit': 'ad_profit',
    'macos': 'macos',
    'roas': 'roas',
    'sales_share': 'sales_share',
    'budget_allocation': 'budget_allocation',
    'returns': 'returns',
    'returns_units': 'returns_units',
}

export const metricsKeysWithoutOrganic = Object.values(_.pickBy(metricKeys, function (value, key) {
    return key !== 'total_orders' &&
        key !== 'total_orders_pure' &&
        key !== 'organic_orders' &&
        key !== 'total_sales' &&
        key !== 'organic_sales' &&
        key !== 'total_units' &&
        key !== 'total_units_pure' &&
        key !== 'profit' &&
        key !== 'macos' &&
        key !== 'returns' &&
        key !== 'returns_units'
}))

export const analyticsAvailableMetricsList = [
    {
        title: 'Impressions',
        key: metricKeys['impressions'],
        info: 'The number of times ads were displayed.',
        label: 'Total',
        type: 'number'
    },
    {
        title: 'Clicks',
        key: metricKeys['clicks'],
        info: 'The number of times your ads were clicked.',
        label: 'Total',
        type: 'number',
    },
    {
        title: 'CTR',
        key: metricKeys['ctr'],
        info: 'The ratio of how often shoppers click on your product ad when displayed. This is calculated as clicks divided by impressions.',
        label: 'Average',
        type: 'percent'
    },
    {
        title: 'Ad Spend',
        key: metricKeys['cost'],
        info: 'The total click charges for a campaign',
        label: 'Total',
        type: 'currency'
    },
    {
        title: 'CPC',
        key: metricKeys['cpc'],
        info: 'This is the average amount you paid for each click on an ad.',
        label: 'Average',
        type: 'currency',
    },
    {
        title: 'Total Orders',
        key: metricKeys['total_orders'],
        info: 'This metric shows the total amount of orders from organic and paid traffic.',
        label: 'Total',
        type: 'number'
    },
    {
        title: `Total Orders Cleared`,
        key: metricKeys['total_orders_pure'],
        info: 'Total Orders Cleared = Total Orders - Returned Orders',
        label: 'Total',
        type: 'number'
    },
    {
        title: 'Ad Orders',
        key: metricKeys['attributedConversions30d'],
        label: 'Total',
        type: 'number'
    },
    {
        title: 'Organic Orders',
        key: metricKeys['organic_orders'],
        label: 'Total',
        type: 'number'
    },
    {
        title: 'Total Sales',
        key: metricKeys['total_sales'],
        info: `Sales is the total value of products sold to shoppers within the specified timeframe for a type of campaign due to clicks on your ads. <br>
Sponsored Products: Sales from advertised products as well as other products from your inventory purchased within 7 days.<br>
It can take up to 12 hours for your sales data to update. As a result, sales data may be delayed in the Today date range. We recommend waiting until all sales data is populated before evaluating campaign performance.<br>
Payment failures and orders that are cancelled within 72 hours will be removed from sales totals.`,
        label: 'Total',
        type: 'currency'
    },
    // {
    //     title: 'Total Sales Cleared',
    //     key: 'total_sales_pure',
    //     info: 'Total Sales Cleared = Total Sales - Organic Sales',
    //     label: 'Total',
    //     type: 'currency'
    // },
    {
        title: 'Ad Sales',
        key: metricKeys['attributedSales30d'],
        label: 'Total',
        type: 'currency'
    },
    {
        title: 'Organic Sales',
        key: metricKeys['organic_sales'],
        label: 'Total',
        type: 'currency'
    },
    {
        title: 'Ad Units',
        key: metricKeys['attributedUnitsOrdered30d'],
        label: 'Total',
        type: 'number'
    },
    {
        title: 'Total units',
        key: metricKeys['total_units'],
        label: 'Total',
        type: 'number'
    },
    {
        title: `Total Units Cleared`,
        key: metricKeys['total_units_pure'],
        info: 'Total Units Cleared = Total Units - Returned Units',
        label: 'Total',
        type: 'number'
    },
    {
        title: 'ACoS',
        key: metricKeys['acos'],
        info: 'ACOS is the percent of attributed sales spent on advertising within the specified timeframe for a type of campaign due to clicks on your ads. This is calculated by dividing total spend by attributed sales.',
        label: 'Average',
        type: 'percent'
    },
    {
        title: 'Ad CVR',
        key: metricKeys['conversion_rate'],
        info: 'The Conversion Rate of a campaign is the percentage of people who clicked on an ad and then completed an action/purchase/conversion.',
        label: 'Average',
        type: 'percent'
    },
    {
        title: 'CPA',
        key: metricKeys['cpa'],
        info: 'Cost per one customer of a paid customer through Amazon Advertising',
        label: 'Average',
        type: 'currency'
    },
    {
        title: 'Profit',
        key: metricKeys['profit'],
        label: 'Total',
        type: 'currency'
    },
    {
        title: 'Ad Profit',
        key: metricKeys['ad_profit'],
        label: 'Total',
        type: 'currency'
    },
    {
        title: 'MACoS',
        info: 'MACoS will consider advertising spend relative to your total revenue so that organic sales will be incorporated into the overall performance.\n' +
            'A low MACoS indicates that a product generates strong sales when advertised. High MACoS tells you that advertising is cannibalizing your overall sales. It will help if you work on your conversion rate.',
        key: metricKeys['macos'],
        label: 'Average',
        type: 'percent'
    },
    // {
    //     title: 'ROI',
    //     key: 'roi',
    //     label: 'Average',
    //     type: 'number'
    // },
    {
        title: 'ROAS',
        info: 'Return On Advertising Spend, (ROAS), is a marketing metric that measures the efficacy of a digital advertising campaign. ROAS helps online businesses evaluate which methods are working and how they can improve future advertising efforts.',
        key: metricKeys['roas'],
        label: 'Average',
        type: 'roas'
    },
    {
        title: 'Sales Share',
        key: 'sales_share',
        label: 'Average',
        type: 'percent'
    },
    {
        title: 'Budget Allocation',
        key: metricKeys['budget_allocation'],
        label: 'Average',
        type: 'percent'
    },
    {
        title: 'Returns',
        key: metricKeys['returns'],
        label: 'Total',
        type: 'number'
    },
    {
        title: 'Returned Units',
        key: metricKeys['returns_units'],
        label: 'Total',
        type: 'number'
    },
]


