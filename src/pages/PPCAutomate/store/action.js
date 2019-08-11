export const FETCH_PRODUCT_LIST = 'FETCH_PRODUCT_LIST';
export const SET_PRODUCT_LIST = 'SET_PRODUCT_LIST';


export const setProductList = (productList) => ({
    type: SET_PRODUCT_LIST,
    productList,

});

export const fetchProductList = (searchText, pageNumber) => ({
    type: FETCH_PRODUCT_LIST,
    searchText,
    pageNumber,

});
