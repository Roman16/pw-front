import { put, call, select } from 'redux-saga/effects';
import * as types from '../store/action';
import { fetchProductList } from './api';

const PPCReducers = ({ PPCReducers }) => PPCReducers;


export function* fetchProductListSaga({ searchText, pageNumber }) {
    try {
        const { activeProductId } = yield select(PPCReducers);

        const {
            data: { productList, totalSize },
        } = yield call(fetchProductList, searchText, pageNumber);

        yield put({
            type: types.SET_PRODUCT_LIST,
            productList,
            totalProduct: totalSize,
        });
        yield put({
            type: types.SET_TOTAL_PRODUCT,
            totalProduct: totalSize,
        });
        if ([null, undefined].includes(activeProductId)) {
            yield put({
                type: types.SET_ACTIVE_PRODUCT,
                activeProductId: productList[0].id,
            });
        }
    } catch (error) {
        console.log(error);
    }
}
