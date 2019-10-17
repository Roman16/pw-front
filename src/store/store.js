import { createStore, applyMiddleware, compose } from 'redux';
import thunk from "redux-thunk";
import { persistStore, persistReducer } from 'redux-persist'
import rootReducer from '../reducers/root.reducer';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web



const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const initialStore = () => {
    return {
        ...createStore(persistedReducer,  compose(
            applyMiddleware(thunk),
            window.devToolsExtension ? window.devToolsExtension() : f => f
        ))
    };
};

export const store = initialStore();
export const persistor = persistStore(store);

// export default () => {
//     let store = ;
//     let  = ;
//     return { store, persistor }
// }

