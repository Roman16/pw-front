import { put, call } from 'redux-saga/effects';


export function* fetchProductListSaga(payload) {
    try {
        console.log(payload);
    } catch (error) {
        console.log(error);
    }
}
