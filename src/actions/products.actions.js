import {productsConstants} from '../constans/actions.type';
import {productsServices} from '../services/products.services';

export const productsActions = {
    fetchProducts,
    updateProduct,
    fetchProductDetails,
};

function fetchProducts(params) {
    return dispatch => {
        productsServices.getProducts(params)
            .then(res => {
                dispatch({
                    type: productsConstants.SET_PRODUCT_LIST,
                    payload: res
                });

                if (res.productList.length > 0) {
                    dispatch(fetchProductDetails(res.productList[0]));
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


