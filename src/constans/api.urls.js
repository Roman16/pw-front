export const userUrls = {
    login: 'user/login',
    logOut: 'user/logout',
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
    customerSatisfactionSurveyForm: 'landings/customer-satisfaction-survey',
    growthAccelerationForm: 'landings/get-started-growth-acceleration',
    registrationTokens: 'admin/support-manager/tokens-for-agency',
    importStatus: 'user/import-status'
}

export const productsUrls = {
    productsSettingsList: 'products/settings/list',
    updateSettings: 'products/settings',
    updateSettingsByProducts: 'products/settings/bulk',
    saveProductData: 'ppc-automation/start',
    campaignsSettingList: (id) => `ppc-automation/${id}/custom-campaign-settings`,
    productCogs: 'products-data/cogs',
    productAmazonFees: 'products-data/fees',
    defaultVariation: 'products-data/variations/set-default-variation',
    updateVariation: 'products-data/prices/overridden-price',

    allProducts: 'v2/ppc-automation/products',
    productDetails: (id) => `v2/ppc-automation/products/${id}/automation-params`,
    stopOptimization: (id) => `v2/ppc-automation/products/${id}/automation-stop`,
    startOptimization: (id) => `v2/ppc-automation/products/${id}/automation-start`,
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
    zthCreationJobs: 'zero-to-hero/creation-jobs',
    zthTemplates: 'zero-to-hero/get-templates',
    semanticInfo: 'zero-to-hero/parse-semantic-data',
    enums: 'zero-to-hero/get-enums',
    exactBids: 'zero-to-hero/get-bids-provider-config',
    convertSemantic: 'zero-to-hero/convert-semantic-data',
    uploadSemantic: 'zero-to-hero/upload',
    restartJob: id => `zero-to-hero/creation-jobs/${id}/restart`,
    downloadReport: (report, id) => `zero-to-hero/creation-jobs/${id}/download-${report}-report`,
    createParams: `zero-to-hero/get-default-input-parameters`,
    reportFileSize: `zero-to-hero/get-max-report-file-sizes`,
    createSemantic: `zero-to-hero/create`,
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
    productsList: 'v2/zero-to-hero/products',
    portfolioList: 'v2/zero-to-hero/portfolios',
    setupSettings: 'v2/zero-to-hero/setup-settings',
    zthProductsList: 'v2/zero-to-hero/products-jobs',
    keysCount: `v2/zero-to-hero/get-estimated-keywords-count`,
    variationsEligibilityStatus: 'v2/zero-to-hero/variations-eligibility',
    payBatch: `v2/zero-to-hero/products-jobs/pay`,
    batchInformation: 'v2/zero-to-hero/products-jobs/ready-for-payment',
    incompleteJobs: 'v2/zero-to-hero/available-slots-info',

    deleteIncompleteBatch: (batchId) => `zero-to-hero/batch/${batchId}/delete`,
    batchInfo: `zero-to-hero/batch`,
    saveBatchSettings: (batchId) => `zero-to-hero/batch/${batchId}/setup-settings`,
}

export const analyticsUrls = {
    // tableData: location => `analytics/${location}`,
    // campaignsTableList: 'analytics/campaigns',

    // productsList: 'analytics/products',
    // placementsList: 'analytics/placements',
    // portfolioList: 'analytics/portfolio',
    // targetingsList: 'analytics/targetings',
    // negativeTargetingsList: 'analytics/negative-targetings',
    // productAdsList: 'analytics/product-ads',
    // placementStatistic: 'analytics/placements/percent-stacked-area-charts',
    // metricsData: location => `analytics/${location}/metrics`,
    // chartData: location => `analytics/${location}/charts`,
    stateInformation: (state, id) => `analytics/v2/${state}/${id}/details`,
    settingsDetails: (page, id) => `analytics/v2/${page}/${id}/settings`,

    searchTermsData: 'analytics/v2/search-terms',
    placementData: 'analytics/v2/placements',
    targetingsDetails: 'analytics/v2/search-terms/targetings-data',
    pageData: (location) => `analytics/v2/${location}`,
    portfolios: 'dynamic-analytics/entities/portfolios',
    campaigns: 'dynamic-analytics/entities/campaigns',
    adGroups: 'dynamic-analytics/entities/ad-groups',
    adGroupDetails: id => `dynamic-analytics/entities/ad-group/${id}/targeting-type`,

    createUrl: location => `dynamic-analytics/${location}/exact-create`,
    bulkCreateUrl: location => `dynamic-analytics/${location}/bulk-create`,
    exactUpdate: location => `dynamic-analytics/${location}/exact-update`,
    bulkUpdate: location => `dynamic-analytics/${location}/bulk-update`,
    targetingsValidation: `dynamic-analytics/targetings/bulk-validate`,
}

export const tableauUrls = {
    token: 'tableau/trusted-ticket-urls'
}
