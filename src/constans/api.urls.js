export const userUrls = {
    login: 'user/login',
    loginAmazon: 'user/login/amazon/callback',
    regist: 'user/register',
    mws: 'user/account/auth/mws/tokens',
    allInfo: 'user/status',
    personalInformation: 'user/account/personal/information',
    updatePhoto: 'user/account/personal/change-avatar',
    changePassword: 'user/account/personal/change-password',
    //billing
    paymentMethodList: 'user/account/payment/method/list',
    addPaymentMethod: 'user/account/payment/method/add',
    updatePaymentMethod: (id) => `user/account/payment/method/${id}/update`,
    deletePaymentMethod: (id) => `user/account/payment/method/${id}/delete`,
    setDefaultPaymentMethod: (id) => `user/account/payment/method/${id}/set-as-default`,
    //company
    companyInformation: (id) => `user/account/payment/method/${id}/metadata`,
    //payment history
    paymentHistoryList: (id) => 'user/account/payment/method/list',

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
    allMetricsStatistic: 'ppc-automation/dashboard/metrics/list',
    chartData: 'ppc-automation/dashboard/charts/main-data',
    products: 'ppc-automation/dashboard/products/list',
    barChartData: 'ppc-automation/dashboard/charts/bar-data',
    pieChartData: 'ppc-automation/dashboard/charts/pie-data',
};
