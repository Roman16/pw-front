import { put, call, select } from 'redux-saga/effects';
import * as types from '../store/action';
import {
    fetchProductList, fetchProductData, saveProductData, fetchProductChangeData,
} from './api';
import { SET_PRODUCT_CHANGE_DATA } from '../store/action';
import { CHANGE_PRODUCT_LIST } from '../store/action';

const PPCReducers = ({ PPCReducers }) => PPCReducers;

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

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
            yield put({
                type: types.FETCH_PRODUCT_ID_DATA,
                productId: productList[0].id,
            });
        }
    } catch (error) {
        console.log(error);
    }
}

export function* fetchProductChangeDataSaga({ productId }) {
    try {
        const {
            data,
        } = yield call(fetchProductChangeData, productId);

        if (Array.isArray(data)) {
            yield put({
                type: types.SET_PRODUCT_CHANGE_DATA,
                data,

            });
        } else {
            yield put({
                type: types.SET_PRODUCT_CHANGE_DATA,
                data: [],

            });
        }
    } catch (error) {
        console.log(error);
    }
}

export function* fetchProductIdDataSaga({ productId }) {
    try {
        const {
            data,
        } = yield call(fetchProductData, productId);

        yield fetchProductChangeDataSaga({ productId });
        console.log(data);
        console.log(isEmpty(data));
        if (!isEmpty(data)) {
            yield put({
                type: types.SET_PRODUCT_ID_DATA,
                data,

            });
        } else {
            const localData = { status: 'STOP' };

            yield put({
                type: types.SET_PRODUCT_ID_DATA,
                data: localData,

            });
        }
    } catch (error) {
        console.log(error);
    }
}


export function* saveProductIdDataSaga({ status }) {
    try {
        const {
            dataProductId,
            activeProductId,
            productList,
        } = yield select(PPCReducers);

        const {
            create_new_keywords = false,
            add_negative_keywords = false,
            add_negative_pats = false,
            create_new_pats = false,
            optimize_keywords = false,
            optimize_pats = false,
        } = dataProductId;

        const optionsValidate = [create_new_keywords,
            add_negative_keywords,
            add_negative_pats,
            create_new_pats,
            optimize_keywords,
            optimize_pats].some((elem) => elem);

        if (optionsValidate) {
            yield put({
                type: types.CHANGE_INVAILD_ERROR,
                status: false,

            });
            const {
                data,
            } = yield call(saveProductData, status, activeProductId, dataProductId);

            const activeProductIndex = productList.findIndex((item) => item.id === activeProductId);

            const updatedProductItem = {
                ...productList[activeProductIndex],
                under_optimization: data.status === 'RUNNING',
            };

            yield put({
                type: types.SET_PRODUCT_ID_DATA,
                data,

            });
            yield put({
                type: types.CHANGE_PRODUCT_LIST,
                updatedProductItem,
                activeProductIndex,

            });
        } else {
            yield put({
                type: types.CHANGE_INVAILD_ERROR,
                status: true,

            });
        }
    } catch (error) {
        console.log(error);
    }
}
