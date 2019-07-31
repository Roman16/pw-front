import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducer';
import rootSaga from '../sagas';
import localStorageMiddleware from './local-storage';

const initialStore = () => {
    const sagaMiddleware = createSagaMiddleware();

    return {
        ...createStore(rootReducer,
            applyMiddleware(sagaMiddleware, localStorageMiddleware)),
        runSaga: sagaMiddleware.run(rootSaga),
    };
};

const store = initialStore();

export default store;
