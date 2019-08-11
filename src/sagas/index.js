import { all } from 'redux-saga/effects';
import PPCSaga from '../pages/PPCAutomate/saga';

export default function* rootSaga() {
    yield all([...PPCSaga]);
}
