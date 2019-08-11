import { takeLatest, fork } from 'redux-saga/effects';
import {
    fetchProductListSaga,
} from './apiSaga';
import {
    FETCH_PRODUCT_LIST,
} from '../store/action';

export function* watchFetchProductList() {
    yield takeLatest(FETCH_PRODUCT_LIST, fetchProductListSaga);
}


export default [
    fork(watchFetchProductList),

];
