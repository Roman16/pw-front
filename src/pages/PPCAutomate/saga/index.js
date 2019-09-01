import { takeLatest, fork } from 'redux-saga/effects';
import {
    fetchProductListSaga,
    fetchProductIdDataSaga,
    saveProductIdDataSaga,
    fetchProductChangeDataSaga,
} from './apiSaga';
import {
    FETCH_PRODUCT_LIST,
    FETCH_PRODUCT_ID_DATA,
    SAVE_PRODUCT_ID_DATA,
    FETCH_PRODUCT_CHANGE_DATA,
} from '../store/action';

export function* watchFetchProductList() {
    yield takeLatest(FETCH_PRODUCT_LIST, fetchProductListSaga);
}

export function* watchFetchProductIdData() {
    yield takeLatest(FETCH_PRODUCT_ID_DATA, fetchProductIdDataSaga);
}

export function* watchSaveProductIdData() {
    yield takeLatest(SAVE_PRODUCT_ID_DATA, saveProductIdDataSaga);
}

export function* watchFetchProductChangeData() {
    yield takeLatest(FETCH_PRODUCT_CHANGE_DATA, fetchProductChangeDataSaga);
}


export default [
    fork(watchFetchProductList),
    fork(watchFetchProductIdData),
    fork(watchSaveProductIdData),
    fork(watchFetchProductChangeData),

];
