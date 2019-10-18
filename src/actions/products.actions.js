import {productsConstants} from '../constans/actions.type';
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

                if(res.productList.length > 0) {
                    dispatch(selectProduct(res.productList[0]));
                }
            });
    };
}

function updateProduct(product) {
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

function fetchProductDetails(id) {
    return dispatch => {
        productsServices.getProductDetails(id)
            .then(res => {
                dispatch({
                    type: productsConstants.UPDATE_SELECTED_PRODUCT,
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
        if (product) {
            dispatch(fetchProductDetails(product.id))
        }
    };
}

