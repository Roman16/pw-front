export const metricsListArray = [
    {
        title: 'Impressions',
        key: 'impressions',
        info: 'The number of times ads were displayed.',
        label: 'Total',
        type: ''
    },
    {
        title: 'Clicks',
        key: 'clicks',
        info: 'The number of times your ads were clicked.',
        label: 'Total',
        type: '',
        active: true
    },
    {
        title: 'CTR',
        key: 'ctr',
        info: 'The ratio of how often shoppers click on your product ad when displayed. This is calculated as clicks divided by impressions.',
        label: 'Average',
        type: 'percent'
    },
    {
        title: 'Spend',
        key: 'spend',
        info: 'The total click charges for a campaign',
        label: 'Total',
        type: 'currency'
    },
    {
        title: 'CPC',
        key: 'cpc',
        info: 'This is the average amount you paid for each click on an ad.',
        label: 'Average',
        type: 'currency',
        active: true
    },
    {
        title: 'Orders',
        key: 'total_orders',
        info: `Orders is the number of Amazon orders shoppers submitted after clicking on your ads.<br/>
Sponsored Products: Orders from advertised products as well as other products from your inventory purchased within 7 days.<br/>
It can take up to 12 hours for your orders data to update. As a result, orders data may be delayed in the Today date range. We recommend waiting until all orders data is populated before evaluating campaign performance.<br/>
Payment failures and orders that are cancelled within 72 hours will be removed from orders totals.`,
        label: 'Total',
        type: ''
    },
    {
        title: 'Ad Orders',
        key: 'ad_orders',
        label: 'Total',
        type: ''
    },
    {
        title: 'Organic Orders',
        key: 'organic_orders',
        label: 'Total',
        type: ''
    },
    {
        title: 'Total Sales',
        key: 'total_sales',
        info: `Sales is the total value of products sold to shoppers within the specified timeframe for a type of campaign due to clicks on your ads. <br>
Sponsored Products: Sales from advertised products as well as other products from your inventory purchased within 7 days.<br>
It can take up to 12 hours for your sales data to update. As a result, sales data may be delayed in the Today date range. We recommend waiting until all sales data is populated before evaluating campaign performance.<br>
Payment failures and orders that are cancelled within 72 hours will be removed from sales totals.`,
        label: 'Total',
        type: 'currency'
    },
    {
        title: 'Ad Sales',
        key: 'ad_sales',
        label: 'Total',
        type: 'currency'
    },
    {
        title: 'Organic Sales',
        key: 'organic_sales',
        label: 'Total',
        type: 'currency'
    },
    {
        title: 'ACoS',
        key: 'acos',
        info: 'ACOS is the percent of attributed sales spent on advertising within the specified timeframe for a type of campaign due to clicks on your ads. This is calculated by dividing total spend by attributed sales.',
        label: 'Average',
        type: 'percent'
    },
    {
        title: 'Conversion Rate',
        key: 'conversion_rate',
        label: 'Average',
        type: 'percent'
    },
    {
        title: 'CPA',
        key: 'cpa',
        label: 'Average',
        type: 'currency'
    },
    {
        title: 'Profit',
        key: 'profit',
        label: 'Total',
        type: 'currency'
    },
    {
        title: 'MACoS',
        key: 'macos',
        label: 'Average',
        type: 'percent'
    }
];