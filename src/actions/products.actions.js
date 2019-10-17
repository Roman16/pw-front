import {productsConstants} from '../constans/request.types';
import {productsServices} from '../services/products.services';

export const productsActions = {
    fetchProducts,
    updateProduct,
    selectProduct
};

function fetchProducts(params) {
    return dispatch => {
        productsServices.getProducts(params)
            .then(res => {
                dispatch({
                    type: productsConstants.SET_PRODUCT_LIST,
                    payload: res
                });

                dispatch(selectProduct(res.productList[0]));
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

function selectProduct(product) {
    return dispatch => {
        dispatch({
            type: productsConstants.SELECT_PRODUCT,
            payload: product
        });
    };
}

