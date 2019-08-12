export const FETCH_PRODUCT_LIST = 'FETCH_PRODUCT_LIST';
export const SET_PRODUCT_LIST = 'SET_PRODUCT_LIST';
export const SET_TOTAL_PRODUCT = 'SET_TOTAL_PRODUCT';
export const SET_ACTIVE_PRODUCT = 'SET_ACTIVE_PRODUCT';


export const setProductList = (productList) => ({
    type: SET_PRODUCT_LIST,
    productList,

});
export const setActiveProduct = (activeProductId) => ({
    type: SET_ACTIVE_PRODUCT,
    activeProductId,

});
export const setTotalProduct = (totalProduct) => ({
    type: SET_TOTAL_PRODUCT,
    totalProduct,

});

export const fetchProductList = (searchText, pageNumber) => ({
    type: FETCH_PRODUCT_LIST,
    searchText,
    pageNumber,

});
