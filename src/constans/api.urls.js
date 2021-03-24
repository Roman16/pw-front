export const userUrls = {
    login: 'user/login',
    loginAmazon: 'user/login/amazon/callback',
    regist: 'user/register',
    resetEmail: 'user/password/reset',
    checkToken: 'user/password/reset/check',
    resetPassword: 'user/password/reset/change',
    resendEmail: 'user/email/resend',
    confirmEmail: 'user/email/verify',
    mws: 'user/account/auth/mws/tokens',
    deleteMws: 'user/account/auth/mws/delete',
    deleteLwa: 'user/account/auth/lwa/delete',
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
    paymentHistoryList: 'user/account/payment/history/list',
    confirm: 'user/account/payment/method/default/confirm-payment-intent',
    //company
    companyInformation: (id) => `user/account/payment/method/${id}/metadata`,
    //subscription
    subscriptionList: `user/account/subscription/list`,
    subscribe: (subscriptionId) => `user/account/subscription/${subscriptionId}/subscribe`,
    reactivate: (subscriptionId) => `user/account/subscription/${subscriptionId}/resume`,
    cancel: (subscriptionId) => `user/account/subscription/${subscriptionId}/cancel`,
    updateStatus: 'user/account/subscription/all/update-preview',
    coupon: (subscriptionId) => `user/account/subscription/${subscriptionId}/update`,
    couponStatus: 'user/account/subscription/check-coupon',
    toggleMarketplace: id => `user/account/tokens/${id}/set-as-default`,
    ebookSubscribe: 'landings/ebook/send-me',
    userSubscribe: 'landings/subscribe',
    contacts: 'landings/contact-us',
    freeTrial: 'user/account/subscription/start-free-trial',
    contactForm: 'landings/request-talk-to-experts',
    shortContactForm: 'landings/contact-us-email',
    partnerContactForm: 'landings/request-partnership',
}

export const productsUrls = {
    allProducts: 'products/list',
    productsSettingsList: 'products/settings/list',
    updateSettings: 'products/settings',
    updateSettingsByProducts: 'products/settings/bulk',
    saveProductData: 'ppc-automation/start',
    productDetails: (id) => `products/${id}/details`,
    campaignsSettingList: (id) => `ppc-automation/${id}/custom-campaign-settings`,
}

export const reportsUrls = {
    lastReports: 'ppc-automation/last-changes',
    allReports: 'ppc-automation/reports-ch',
    downloadReports: 'ppc-automation/reports-ch/download',
    reports: 'ppc-automation/reports'
}

export const dashboardUrls = {
    allMetricsStatistic: 'ppc-automation/dashboard/metrics/list',
    chartData: 'ppc-automation/dashboard/charts/main-data',
    products: 'ppc-automation/dashboard/products/list',
    barChartData: 'ppc-automation/dashboard/charts/bar-data',
    pieChartData: 'ppc-automation/dashboard/charts/pie-data',
    productOptimizationDetails: 'ppc-automation/dashboard/products/optimization-jobs-log/periods',
}

export const scannerUrls = {
    scanStatus: 'ppc-scanner/get-scan-status',
    getChanges: 'ppc-scanner/get-changes-table',
    getScanning: 'ppc-scanner/scan-sp-campaigns',
}

export const adminUrls = {
    userEmail: 'admin/support-manager/user',
    accountLinks: 'admin/support-manager/linked-accounts/list',
    accountLinksBySellerId: 'admin/support-manager/linked-accounts',
    optimizationJobs: 'admin/support-manager/optimization-jobs/list',
    optimizationJobsByMarketplace: 'admin/support-manager/optimization-jobs',
    productOptimizationChanges: 'admin/support-manager/optimization-changes',
    adGroupsList: 'admin/support-manager/optimization-conditions-check/enabled-ad-groups',
    adGroupsCanBeOptimized: 'admin/support-manager/optimization-conditions-check/ad-groups-can-be-optimized',
    patsList: 'admin/support-manager/optimization-conditions-check/keywords-and-pats',
    report: 'admin/support-manager/report',
    userReports: 'admin/support-manager/optimization-changes/list',
    usersList: 'admin/support-manager/user/list',
    impersonateById: userId => `admin/support-manager/user/${userId}/tokens-for-impersonate`,
    impersonateByEmail: `admin/support-manager/tokens-for-impersonate-by-email`,
    userProductsList: 'admin/support-manager/userProducts',
    userPasswordById: userId => `admin/support-manager/user/${userId}/force-change-user-password`,
    userPasswordByEmail: `admin/support-manager/force-change-user-password-by-email`,
    zthVersion: 'zero-to-hero/get-service-information',
    zthJobs: 'zero-to-hero/upload-jobs',
    semanticInfo: 'zero-to-hero/parse-semantic-data',
    enums: 'zero-to-hero/get-enums',
    exactBids: 'zero-to-hero/get-bids-provider-config',
    convertSemantic: 'zero-to-hero/convert-semantic-data',
    uploadSemantic: 'zero-to-hero/upload',
}

export const daypartingUrls = {
    campaigns: 'ppc-automation/dayparting/campaigns',
    outBudget: (id) => id ? `ppc-automation/dayparting/campaigns/${id}/sales-oob` : 'ppc-automation/dayparting/campaigns/sales-oob',
    recommendedBudget: (id) => `ppc-automation/dayparting/campaigns/${id}/recommended-budget`,
    dailyBudget: (id) => `ppc-automation/dayparting/campaigns/${id}/daily-budget`,
    dailyStatistic: (id) => `ppc-automation/dayparting/campaigns/${id}/chart-data`,
    getDayParting: (id) => id ? `ppc-automation/dayparting/campaigns/${id}/state` : `ppc-automation/dayparting/campaigns/state`,
    dayParting: (id) => `ppc-automation/dayparting/campaigns/${id}/state`,
    placements: (id) => id ? `ppc-automation/dayparting/campaigns/${id}/placements` : 'ppc-automation/dayparting/campaigns/placements'
}

export const zthUrls = {
    productsList: 'zero-to-hero/products',
    zthProductsList: 'zero-to-hero/jobs',
    setupSettings: 'zero-to-hero/setup-settings',
    incompleteBatch: 'zero-to-hero/batch/incomplete-batch-data',
    deleteIncompleteBatch: (batchId) => `zero-to-hero/batch/${batchId}/delete`,
    payBatch: (batchId) => `zero-to-hero/batch/${batchId}/make-payment`,
    batchInfo: `zero-to-hero/batch`,
    portfolioList: 'zero-to-hero/portfolio',
    saveBatchSettings: (batchId) => `zero-to-hero/batch/${batchId}/setup-settings`
}

export const analyticsUrls = {
    tableData: location => `analytics/${location}`,
    campaignsTableList: 'analytics/campaigns',

    productsList: 'analytics/products',
    placementsList: 'analytics/placements',
    portfolioList: 'analytics/portfolio',
    targetingsList: 'analytics/targetings',
    negativeTargetingsList: 'analytics/negative-targetings',
    productAdsList: 'analytics/product-ads',
    placementStatistic: 'analytics/placements/percent-stacked-area-charts',
    metricsData: location => `analytics/${location}/metrics`,
    chartData: location => `analytics/${location}/charts`,
    stateInformation: (state, id) => `analytics/v2/${state}/${id}/details`,
    settingsDetails: (page, id) => `analytics/v2/${page}/${id}/settings`,

    searchTermsData: 'analytics/v2/search-terms',
    placementData: 'analytics/v2/placements',
    targetingsDetails: 'analytics/v2/search-terms/targetings-data',
    pageData: (location) => `analytics/v2/${location}`,
    createUrl: location => `dynamic-analytics/${location}/exact-create`
}
