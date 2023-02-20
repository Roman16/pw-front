export const metricKeys = {
    'impressions': 'impressions',
    'clicks': 'clicks',
    'ctr': 'ctr',
    'cost': 'cost',
    'cpc': 'cpc',
    'total_orders': 'total_orders_count',
    'total_orders_pure': 'total_orders_count_cleared',
    'ad_orders': 'attributedConversions',
    'organic_orders': 'organic_orders_count',
    'total_sales': 'total_sales',
    'ad_sales': 'attributedSales',
    'avg_sale_price': 'total_sales_avg_price',
    'organic_sales': 'organic_sales',
    'ad_units': 'attributedUnitsOrdered',
    'total_units': 'total_ordered_quantity',
    'total_units_pure': 'total_ordered_quantity_cleared',
    'acos': 'acos',
    'conversion_rate': 'conversion_rate',
    'cpa': 'cpa',
    'net_profit': 'total_profit',
    'gross_profit': 'total_profit_gross',
    'net_ad_profit': 'ad_profit',
    'macos': 'macos',
    'roas': 'roas',
    'sales_share': 'sales_share',
    'budget_allocation': 'budget_allocation',
    'returns': 'total_returns_count',
    'returns_units': 'total_returns_quantity',
    'adSalesSameSKU': 'attributedSalesSameSKU',
    'adSalesOtherSKU': 'attributedSalesOtherSKU',
    'SBAdSales': 'attributedSales_sponsored_brands',
    'SPAdSales': 'attributedSales_sponsored_products',
    'SDAdSales': 'attributedSales_sponsored_display',
    'rpc': 'rpc',
    'organicRate': 'organic_rate',
    'rpi': 'rpi',
    'icvr': 'icvr',
    'organicUnits': 'organic_units',
    'cpm': 'cpm',
    'bidCPC': 'bidMinusCPC',
    'cvr': 'cvr',
    'margin': 'margin'
}

export const analyticsAvailableMetricsList = [
    {
        title: 'Total Orders',
        key: metricKeys['total_orders'],
        info: 'This metric shows the total amount of orders from organic and paid traffic.',
        label: 'Total',
        type: 'number',
        tabs: ['total', 'conversions']
    },
    {
        title: 'Returns',
        key: metricKeys['returns'],
        label: 'Total',
        type: 'number',
        tabs: ['total', 'conversions']
    },
    {
        title: `Total Orders Cleared`,
        key: metricKeys['total_orders_pure'],
        info: 'Total Orders Cleared = Total Orders - Returned Orders',
        label: 'Total',
        type: 'number',
        tabs: ['total', 'conversions']
    },
    {
        title: 'Total Units',
        key: metricKeys['total_units'],
        label: 'Total',
        type: 'number',
        tabs: ['total', 'conversions']
    },
    {
        title: 'Returned Units',
        key: metricKeys['returns_units'],
        label: 'Total',
        type: 'number',
        tabs: ['total', 'conversions']
    },
    {
        title: `Total Units Cleared`,
        key: metricKeys['total_units_pure'],
        info: 'Total Units Cleared = Total Units - Returned Units',
        label: 'Total',
        type: 'number',
        tabs: ['total', 'conversions']
    },
    {
        title: 'Total Sales',
        key: metricKeys['total_sales'],
        info: `Sales is the total value of products sold to shoppers within the specified timeframe for a type of campaign due to clicks on your ads. <br>
Sponsored Products: Sales from advertised products as well as other products from your inventory purchased within 7 days.<br>
It can take up to 12 hours for your sales data to update. As a result, sales data may be delayed in the Today date range. We recommend waiting until all sales data is populated before evaluating campaign performance.<br>
Payment failures and orders that are cancelled within 72 hours will be removed from sales totals.`,
        label: 'Total',
        type: 'currency',
        tabs: ['total', 'conversions']
    },
    {
        title: 'MACoS',
        info: 'MACoS will consider advertising spend relative to your total revenue so that organic sales will be incorporated into the overall performance.\n' +
            'A low MACoS indicates that a product generates strong sales when advertised. High MACoS tells you that advertising is cannibalizing your overall sales. It will help if you work on your conversion rate.',
        key: metricKeys['macos'],
        label: 'Average',
        type: 'percent',
        tabs: ['total', 'conversions', 'performance']
    },
    {
        title: 'Avg. Sale Price',
        key: metricKeys['avg_sale_price'],
        label: 'Average',
        type: 'currency',
        tabs: ['total', 'conversions']

    },
    //------------------------------------------------------------------------------------------------------------------
    {
        title: 'Organic Orders',
        key: metricKeys['organic_orders'],
        label: 'Total',
        type: 'number',
        tabs: ['organic', 'conversions']
    },
    {
        title: 'Organic Units',
        key: metricKeys['organicUnits'],
        label: 'Total',
        type: 'number',
        tabs: ['organic', 'conversions']
    },
    {
        title: 'Organic Sales',
        key: metricKeys['organic_sales'],
        label: 'Total',
        type: 'currency',
        tabs: ['organic', 'conversions']
    },
    //------------------------------------------------------------------------------------------------------------------
    {
        title: 'Impressions',
        key: metricKeys['impressions'],
        info: 'The number of times ads were displayed.',
        label: 'Total',
        type: 'number',
        tabs: ['ads', 'performance']
    },
    {
        title: 'Clicks',
        key: metricKeys['clicks'],
        info: 'The number of times your ads were clicked.',
        label: 'Total',
        type: 'number',
        tabs: ['ads', 'performance']
    },
    {
        title: 'CTR',
        key: metricKeys['ctr'],
        info: 'The ratio of how often shoppers click on your product ad when displayed. This is calculated as clicks divided by impressions.',
        label: 'Average',
        type: 'percent',
        tabs: ['ads', 'performance']
    },
    {
        title: 'Ad Spend',
        key: metricKeys['cost'],
        info: 'The total click charges for a campaign',
        label: 'Total',
        type: 'currency',
        tabs: ['ads', 'performance']
    },
    {
        title: 'CPC',
        key: metricKeys['cpc'],
        info: 'This is the average amount you paid for each click on an ad.',
        label: 'Average',
        type: 'currency',
        tabs: ['ads', 'performance']
    },
    {
        title: 'CPM',
        key: metricKeys['cpm'],
        label: 'Average',
        type: 'currency',
        tabs: ['ads', 'performance']
    },
    // {
    //     title: 'Bid - CPC',
    //     key: metricKeys['bidCPC'],
    //     label: 'Average',
    //     type: 'currency',
    //     tabs: ['ads', 'performance']
    // },
    {
        title: 'Budget Allocation',
        key: metricKeys['budget_allocation'],
        label: 'Average',
        type: 'percent',
        tabs: ['ads', 'performance', 'other']
    },
    //------------------------------------------------------------------------------------------------------------------
    {
        title: 'Ad Orders',
        key: metricKeys['ad_orders'],
        label: 'Total',
        type: 'number',
        tabs: ['ads', 'conversions']
    },
    {
        title: 'CPA',
        key: metricKeys['cpa'],
        info: 'Cost per one customer of a paid customer through Amazon Advertising',
        label: 'Average',
        type: 'currency',
        tabs: ['ads', 'performance']
    },
    {
        title: 'Ad CVR',
        key: metricKeys['conversion_rate'],
        info: 'The Conversion Rate of a campaign is the percentage of people who clicked on an ad and then completed an action/purchase/conversion.',
        label: 'Average',
        type: 'percent',
        tabs: ['ads', 'performance']
    },
    {
        title: 'Ad ICVR',
        key: metricKeys['icvr'],
        label: 'Average',
        type: 'percent',
        tabs: ['ads', 'performance']
    },
    {
        title: 'Ad Units',
        key: metricKeys['ad_units'],
        label: 'Total',
        type: 'number',
        tabs: ['ads', 'conversions']
    },
    {
        title: 'Ad Sales',
        key: metricKeys['ad_sales'],
        label: 'Total',
        type: 'currency',
        tabs: ['ads', 'conversions']
    },
    {
        title: 'ACoS',
        key: metricKeys['acos'],
        info: 'ACOS is the percent of attributed sales spent on advertising within the specified timeframe for a type of campaign due to clicks on your ads. This is calculated by dividing total spend by attributed sales.',
        label: 'Average',
        type: 'percent',
        tabs: ['ads', 'conversions', 'performance']
    },
    {
        title: 'ROAS',
        info: 'Return On Advertising Spend, (ROAS), is a marketing metric that measures the efficacy of a digital advertising campaign. ROAS helps online businesses evaluate which methods are working and how they can improve future advertising efforts.',
        key: metricKeys['roas'],
        label: 'Average',
        type: 'roas',
        tabs: ['ads', 'conversions', 'performance']
    },
    {
        title: 'RPC',
        key: metricKeys['rpc'],
        label: 'Average',
        type: 'currency',
        tabs: ['ads', 'conversions', 'performance']
    },
    {
        title: 'RPI',
        key: metricKeys['rpi'],
        label: 'Average',
        type: 'currency',
        tabs: ['ads', 'conversions', 'performance']
    },
    {
        title: 'Organic Rate',
        key: metricKeys['organicRate'],
        label: 'Average',
        type: 'roas',
        tabs: ['organic', 'ads', 'conversions']
    },
    {
        title: 'Ad Sales Same SKU',
        key: metricKeys['adSalesSameSKU'],
        label: 'Total',
        type: 'currency',
        tabs: ['ads', 'conversions']
    },
    {
        title: 'Ad Sales Other SKU',
        key: metricKeys['adSalesOtherSKU'],
        label: 'Total',
        type: 'currency',
        tabs: ['ads', 'conversions']
    },
    {
        title: 'SP Ad Sales',
        key: metricKeys['SPAdSales'],
        label: 'Total',
        type: 'currency',
        tabs: ['ads', 'conversions']
    },
    {
        title: 'SD Ad Sales',
        key: metricKeys['SDAdSales'],
        label: 'Total',
        type: 'currency',
        tabs: ['ads', 'conversions']
    },
    {
        title: 'SB Ad Sales',
        key: metricKeys['SBAdSales'],
        label: 'Total',
        type: 'currency',
        tabs: ['ads', 'conversions']
    },
    //------------------------------------------------------------------------------------------------------------------
    {
        title: 'Sales Share',
        key: metricKeys['sales_share'],
        label: 'Average',
        type: 'percent',
        tabs: ['total', 'ads', 'conversions', 'other']
    },
    //------------------------------------------------------------------------------------------------------------------
    {
        title: 'Net Profit',
        key: metricKeys['net_profit'],
        label: 'Total',
        type: 'currency',
        tabs: ['total', 'conversions']
    },
    {
        title: 'Gross Profit',
        key: metricKeys['gross_profit'],
        label: 'Total',
        type: 'currency',
        tabs: ['total', 'conversions']
    },
    {
        title: 'Net Ad Profit',
        key: metricKeys['net_ad_profit'],
        label: 'Total',
        type: 'currency',
        tabs: ['ads', 'conversions']
    },
    //------------------------------------------------------------------------------------------------------------------
    {
        title: 'CVR',
        key: metricKeys['cvr'],
        label: 'Total',
        type: 'percent',
        tabs: []
    },
    //------------------------------------------------------------------------------------------------------------------
    {
        title: 'Margin',
        key: metricKeys['margin'],
        label: 'Average',
        type: 'percent',
        tabs: ['performance']
    },
]

export const metricsKeysWithoutOrganic = analyticsAvailableMetricsList.filter(({key}) =>
    key === metricKeys['ad_orders'] ||
    key === metricKeys['ad_sales'] ||
    key === metricKeys['adSalesSameSKU'] ||
    key === metricKeys['adSalesOtherSKU'] ||
    key === metricKeys['ad_units'] ||
    key === metricKeys['acos'] ||
    key === metricKeys['conversion_rate'] ||
    key === metricKeys['cpa'] ||
    key === metricKeys['net_ad_profit'] ||
    key === metricKeys['roas'] ||
    key === metricKeys['sales_share'] ||
    key === metricKeys['budget_allocation'] ||
    key === metricKeys['impressions'] ||
    key === metricKeys['clicks'] ||
    key === metricKeys['ctr'] ||
    key === metricKeys['cost'] ||
    key === metricKeys['rpc'] ||
    key === metricKeys['rpi'] ||
    key === metricKeys['icvr'] ||
    key === metricKeys['cpm'] ||
    key === metricKeys['cpc']
).map(i => i.key)


//известные группы в нужном порядке:
// All, Total, Organic, Ads, Conversions, Performance, Other
//
// в All находятся абсолютно все метрики.
// для остальных групп по каждой метрике отдельно указано:
//
// Total Orders: Total, Conversions
// Returns: Total, Conversions
// Total Orders Cleared: Total, Conversions
// Total Units: Total, Conversions
// Returned Units: Total, Conversions
// Total Units Cleared: Total, Conversions
// Total Sales: Total, Conversions
// MACoS: Total, Conversions, Performance
// Avg. Sale Price: Total, Conversions
//
// Organic Orders: Organic, Conversions
// Organic Units: Organic, Conversions
// Organic Sales: Organic, Conversions
//
// Impressions: Ads, Performance
// Clicks: Ads, Performance
// CTR: Ads, Performance
// Ad Spend: Ads, Performance
// CPC: Ads, Performance
// CPM: Ads, Performance
// Bid - CPC: Ads, Other
// Budget Allocation: Ads, Performance, Other
//
// Ad Orders: Ads, Conversions
// CPA: Ads, Performance
// Ad CVR: Ads, Performance
// Ad ICVR: Ads, Performance
// Ad Units: Ads, Conversions
// Ad Sales: Ads, Conversions
// ACoS: Ads, Conversions, Performance
// ROAS: Ads, Conversions, Performance
// RPC: Ads, Conversions, Performance
// RPI: Ads, Conversions, Performance
// Organic Rate: Organic, Ads, Conversions
// Ad Sales Same SKU: Ads, Conversions
// Ad Sales Other SKU: Ads, Conversions
// SP Ad Sales: Ads, Conversions
// SD Ad Sales: Ads, Conversions
// SB Ad Sales: Ads, Conversions
//
// Sales Share: Total, Ads, Conversions, Other
//
// Net Profit: Total, Conversions
// Gross Profit: Total, Conversions
// Net Ad Profit: Ads, Conversions
//======================================================================================================================
//metrics order
// Total Orders
// Returns
// Total Orders Cleared
// Total Units
// Returned Units
// Total Units Cleared
// Total Sales
// MACoS
// Avg. Sale Price
//
// Organic Orders
// Organic Units
// Organic Sales
//
// Impressions
// Clicks
// CTR
// Ad Spend
// CPC
// CPM
// Bid - CPC
// Budget Allocation
//
// Ad Orders
// CPA
// Ad CVR
// Ad ICVR
// Ad Units
// Ad Sales
// ACoS
// ROAS
// RPC
// RPI
// Organic Rate
// Ad Sales Same SKU
// Ad Sales Other SKU
// SP Ad Sales
// SD Ad Sales
// SB Ad Sales
//
// Sales Share
//
// Net Profit
// Gross Profit
// Net Ad Profit