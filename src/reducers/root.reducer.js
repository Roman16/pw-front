import {combineReducers} from 'redux';
import {users} from './user.reducer';
import {products} from './products.reducers';

export default combineReducers({
    users,
    products,
});
