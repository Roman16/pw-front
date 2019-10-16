import {productsConstants} from '../constans/request.types';
import {productsServices} from '../services/products.services';

export const productsActions = {
    fetchProducts
};

function fetchProducts(params) {
    return dispatch => {
        productsServices.getProducts(params).then(data => {
            dispatch({
                type: productsConstants.SET_PRODUCT_LIST,
                payload: data
            });
        });
    };
}

