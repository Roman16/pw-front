import {productsConstants} from '../constans/actions.type';
import {productsServices} from '../services/products.services';

export const productsActions = {
    fetchProducts,
    updateProduct,
    fetchProductDetails,
    onSwitchOptimization,
    setNetMargin,
    updateOptions,
};

function fetchProducts(paginationParams) {
    return dispatch => {
        productsServices.getProducts(paginationParams)
            .then(res => {
                dispatch({
                    type: productsConstants.SET_PRODUCT_LIST,
                    payload: res
                });

                if (res.result.length > 0) {
                    dispatch(fetchProductDetails(res.result[0]));
                }
            });
    };
}

function fetchProductDetails(product) {
    return dispatch => {
        productsServices.getProductDetails(product === 'all' ? 'all' : product.id)
            .then(res => {
                if (product !== 'all') {
                    dispatch({
                        type: productsConstants.SELECT_PRODUCT,
                        payload: {
                            ...product,
                            ...res,
                            id: product.id
                        }
                    });
                } else {
                    dispatch({
                        type: productsConstants.SELECT_ALL_PRODUCT,
                        payload: res
                    });
                }
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


