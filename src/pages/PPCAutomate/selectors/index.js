import { createSelector } from 'reselect';

const PPCReducers = ({ PPCReducers }) => (
    PPCReducers
);


export const getProductList = createSelector(
    [PPCReducers], ({ productList }) => (
        productList
    ),
);
export const getProductIdData = createSelector(
    [PPCReducers], ({ dataProductId }) => (
        dataProductId
    ),
);
export const getInValidError = createSelector(
    [PPCReducers], ({ inValidError }) => (
        inValidError
    ),
);
export const getLastChanges = createSelector(
    [PPCReducers], ({ lastChanges }) => (
        lastChanges
    ),
);
export const getSaveProductIdData = createSelector(
    [PPCReducers], ({ saveDataProductId }) => (
        saveDataProductId
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
