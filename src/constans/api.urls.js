export const userUrls = {
    login: 'user/login',
    loginAmazon: 'user/login/amazon/callback',
    regist: 'user/register',
    mws: 'user/account/auth/mws/tokens',
    allInfo: 'user/status',
    updatePhoto: 'user/change-avatar',
    changePassword: 'user/change-password',
};

export const productsUrls = {
    allProducts: 'products/list',
    productsSettingsList: 'products/settings/list',
    updateSettings: 'products/settings',
    saveProductData: 'ppc-automation/start',
    productDetails: (id) => `products/${id}/details`,
};

export const reportsUrls = {
    lastReports: 'ppc-automation/last-changes',
    allReports: 'ppc-automation/reports',
    downloadReports: 'ppc-automation/reports/download',
};

export const dashboardUrls = {
    allMetricsStatistic: 'ppc-automation/metrics-statistic',
    chartData: 'ppc-automation/main-chart-data',
    products: 'products/settings/list',
    // products: 'products/dashboard/list',
    barChartData: 'ppc-automation/bar-chart-data',
    pieChartData: 'ppc-automation/pie-chart-data',
};
