export const FETCH_PRODUCT_LIST = 'FETCH_PRODUCT_LIST';
export const SET_PRODUCT_LIST = 'SET_PRODUCT_LIST';
export const SET_TOTAL_PRODUCT = 'SET_TOTAL_PRODUCT';
export const SET_ACTIVE_PRODUCT = 'SET_ACTIVE_PRODUCT';
export const FETCH_PRODUCT_ID_DATA = 'FETCH_PRODUCT_ID_DATA';
export const FETCH_PRODUCT_CHANGE_DATA = 'FETCH_PRODUCT_CHANGE_DATA';
export const SET_PRODUCT_CHANGE_DATA = 'SET_PRODUCT_CHANGE_DATA';
export const SET_PRODUCT_ID_DATA = 'SET_PRODUCT_ID_DATA';
export const SAVE_PRODUCT_ID_DATA = 'SAVE_PRODUCT_ID_DATA';
export const CHANGE_INVAILD_ERROR = 'CHANGE_INVAILD_ERROR';
export const CHANGE_PRODUCT_LIST = 'CHANGE_PRODUCT_LIST';
export const SET_NET_MARGIN = 'SET_NET_MARGIN';


export const setProductList = (productList) => ({
    type: SET_PRODUCT_LIST,
    productList,

});
export const setNetMargin = (productId, netMarginValue) => ({
    type: SET_NET_MARGIN,
    productId,
    netMarginValue,

});

export const changeProductList = (changedItem, indexItem) => ({
    type: CHANGE_PRODUCT_LIST,
    changedItem,
    indexItem,

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
export const fetchProductIdData = (productId) => ({
    type: FETCH_PRODUCT_ID_DATA,
    productId,

});

export const updateProductIdData = (data) => ({
    type: SET_PRODUCT_ID_DATA,
    data,

});
export const saveProductIdData = (status) => ({
    type: SAVE_PRODUCT_ID_DATA,
    status,

});
export const fetchProductChangeData = (productId) => ({
    type: FETCH_PRODUCT_CHANGE_DATA,
    productId,

});
export const setProductChangeData = (data) => ({
    type: FETCH_PRODUCT_CHANGE_DATA,
    data,

});

export const changeInvalidError = (status) => ({
    type: CHANGE_INVAILD_ERROR,
    status,

});
