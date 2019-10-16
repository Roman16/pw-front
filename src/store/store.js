import { createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk";

import rootReducer from '../reducers/root.reducer';

const initialStore = () => {
    return {
        ...createStore(rootReducer, applyMiddleware(thunk)),
    };
};

const store = initialStore();

export default store;
