import { createSelector } from 'reselect';

const PPCReducers = ({ PPCReducers }) => (
    PPCReducers
);


export const getProductList = createSelector(
    [PPCReducers], ({ productList }) => (
        productList
    ),
);
export const getTotalProduct = createSelector(
    [PPCReducers], ({ totalProduct }) => (
        totalProduct
    ),
);
export const getActiveProductId = createSelector(
    [PPCReducers], ({ activeProductId }) => (
        activeProductId
    ),
);
