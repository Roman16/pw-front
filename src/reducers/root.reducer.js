import {combineReducers} from 'redux';
import {user} from './user.reducer';
import {products} from './products.reducer';
import {dashboard} from './dashboard.reducer';

const appReducer = combineReducers({
    products,
    user,
    dashboard
});

export const  rootReducer = (state, action) => {
    if (action.type === 'USER_LOGOUT') {
        state = undefined
    }

    return appReducer(state, action)
};