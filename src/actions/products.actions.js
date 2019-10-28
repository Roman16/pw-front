import {productsConstants} from '../constans/actions.type';
import {productsServices} from '../services/products.services';

export const productsActions = {
    fetchProducts,
    updateProduct,
    onSwitchOptimization,
    setNetMargin,
    updateOptions,
    selectProduct,
    selectAllProducts
};

function fetchProducts(params) {
    return dispatch => {
        productsServices.getProducts(params)
            .then(res => {
                dispatch({
                    type: productsConstants.SET_PRODUCT_LIST,
                    payload: res
                });
                dispatch({
                    type: productsConstants.SELECT_PRODUCT,
                    payload: res.result[0]
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

function selectAllProducts() {
    return dispatch => {
        dispatch({
            type: productsConstants.SELECT_ALL_PRODUCT,
        });
    };
}

function updateProduct(product) {
    return dispatch => {
        productsServices.updateProductById(product)
            .then(() => {
                dispatch({
                    type: productsConstants.UPDATE_SELECTED_PRODUCT,
                    payload: product
                });
            });
    };
}

function updateOptions(options) {
    return dispatch => {
        dispatch({
            type: productsConstants.UPDATE_PRODUCT_OPTIONS,
            payload: options
        });
    };
}

function onSwitchOptimization(product) {
    return dispatch => {
        productsServices.updateProductById(product)
            .then(() => {
                dispatch({
                    type: productsConstants.UPDATE_SELECTED_PRODUCT,
                    payload: product
                });

                product.status === 'RUNNING' && dispatch({
                    type: productsConstants.UPDATE_PRODUCT_OPTIONS,
                    payload: product
                });
            });
    };
}

function setNetMargin(product) {
    return dispatch => {
        productsServices.updateProductById(product)
            .then(res => {
                dispatch({
                    type: productsConstants.UPDATE_SELECTED_PRODUCT,
                    payload: res
                });
            });
    };
}


