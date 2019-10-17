import {productsConstants} from '../constans/request.types';
import {productsServices} from '../services/products.services';

export const productsActions = {
    fetchProducts,
    updateProduct
};

function fetchProducts(params) {
    return dispatch => {
        productsServices.getProducts(params)
            .then(res => {
                dispatch({
                    type: productsConstants.SET_PRODUCT_LIST,
                    payload: res
                });
            });
    };
}

function updateProduct(product) {
    return dispatch => {
        productsServices.updateProduct(product)
            .then(res => {
                dispatch({
                    type: productsConstants.UPDATE_PRODUCT_DATA,
                    payload: res
                });
            });
    };

}

