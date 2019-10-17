import { createStore, applyMiddleware, compose } from 'redux';
import thunk from "redux-thunk";

import rootReducer from '../reducers/root.reducer';

const initialStore = () => {
    return {

        ...createStore(rootReducer,  compose(
            applyMiddleware(thunk),
            window.devToolsExtension ? window.devToolsExtension() : f => f
        ))
    };
};

const store = initialStore();

export default store;
