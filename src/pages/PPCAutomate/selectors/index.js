import { createSelector } from 'reselect';

const PPCReducers = ({ PPCReducers }) => (
    PPCReducers
);


export const getProductList = createSelector(
    [PPCReducers], ({ productList }) => (
        productList
    )
);
