import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/rootReducer';

const initialStore = () => {
    return {
        ...createStore(rootReducer),
    };
};

const store = initialStore();

export default store;
