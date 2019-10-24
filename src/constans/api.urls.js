export const userUrls = {
    login: 'user/login',
    regist: 'user/register',
    allInfo: 'user/status',
    mws: 'user/account/auth/mws/tokens',
};

export const productsUrls = {
    allProducts: 'products/list',
    saveProductData: 'ppc-automation/start',
    productDetails: (id) => `products/${id}/details`,
};

export const reportsUrls = {
    lastReports: 'ppc-automation/last-changes',
};
