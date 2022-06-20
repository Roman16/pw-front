import {createStore, applyMiddleware, compose} from 'redux'
import thunk from "redux-thunk"
import {rootReducer} from '../reducers/root.reducer'
import {composeWithDevTools} from 'redux-devtools-extension'


const initialStore = () => {
    const middlewares = [thunk]

    return {
        ...createStore(rootReducer, composeWithDevTools(
            applyMiddleware(...middlewares))
        )

    }
}

export const store = initialStore()


