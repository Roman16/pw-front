export const userUrls = {
    login: 'user/login',
    regist: 'user/register',
    allInfo: 'user/status',
    mws: 'user/account/auth/mws/tokens',
};

export const productsUrls = {
    allProducts: 'products/list',
    saveProductData: 'ppc-automation/save-parameters',
    productDetails: (id) => `product/${id}/details`,
};
