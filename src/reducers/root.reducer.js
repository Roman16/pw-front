import {combineReducers} from 'redux';
import {user} from './user.reducer';
import {products} from './products.reducer';
import {reports} from './reports.reducer';

const appReducer = combineReducers({
    products,
    user,
    reports
});

export const  rootReducer = (state, action) => {
    if (action.type === 'USER_LOGOUT') {
        state = undefined
    }

    return appReducer(state, action)
};