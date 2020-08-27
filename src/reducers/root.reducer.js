import {combineReducers} from 'redux';
import {user} from './user.reducer';
import {products} from './products.reducer';
import {dashboard} from './dashboard.reducer';
import {dayparting} from "./dayparting.reducer";
import {zth} from "./zth.reducer";
import {analytics} from "./analytics.reducer";

const appReducer = combineReducers({
    products,
    user,
    dashboard,
    dayparting,
    zth,
    analytics
});

export const rootReducer = (state, action) => {
    if (action.type === 'USER_LOGOUT') {
        state = undefined
    }

    return appReducer(state, action)
};