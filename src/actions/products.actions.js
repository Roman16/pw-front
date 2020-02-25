import {productsConstants} from '../constans/actions.type';
import {productsServices} from '../services/products.services';
import {notification} from '../components/Notification';
import {daypartingServices} from "../services/dayparting.services";

export const productsActions = {
    fetchProducts,
    updateProduct,
    fetchProductDetails,
    onSwitchOptimization,
    setNetMargin,
    updateOptions,
    showOnlyOptimized,
    showOnlyActive,
    changeOptimizedOptions,
    changeOptimizedStrategy,
    dontShowWindowAgain,
    updateCampaignBudget
};

function fetchProducts(paginationParams) {
    return dispatch => {
        // dispatch({
        //     type: productsConstants.SET_PRODUCT_LIST,
        //     payload: {
        //         result: [],
        //         fetching: true
        //     }
        // });

        if (paginationParams.type === 'campaigns') {
            daypartingServices.getCampaigns(paginationParams)
                .then(res => {
                    dispatch({
                        type: productsConstants.SET_PRODUCT_LIST,
                        payload: {
                            result: res.response,
                            totalSize: res.total_count,
                            fetching: false
                        }
                    });

                    if (res.response && res.response.length > 0 && !paginationParams.selectedAll) {
                        dispatch(fetchProductDetails(res.response[0], paginationParams.pathname));
                    } else {
                        dispatch(fetchProductDetails({id: null}, paginationParams.pathname));
                    }
                });
        } else {
            productsServices.getProducts(paginationParams)
                .then(res => {
                    dispatch({
                        type: productsConstants.SET_PRODUCT_LIST,
                        payload: {
                            ...res,
                            fetching: false
                        }
                    });

                    if (res.result && res.result.length > 0 && !paginationParams.selectedAll) {
                        dispatch(fetchProductDetails(res.result[0], paginationParams.pathname));
                    } else {
                        dispatch(fetchProductDetails({id: null}, paginationParams.pathname));
                    }
                });
        }
    };
}

function fetchProductDetails(product, pathname) {
    return dispatch => {
        if (pathname === '/ppc/scanner') {
            dispatch({
                type: productsConstants.SELECT_PRODUCT,
                payload: {
                    ...product,
                    id: product.id,
                    product_id: product.id,
                }
            });
        } else if (pathname === '/ppc/dayparting') {
            dispatch({
                type: productsConstants.SELECT_PRODUCT,
                payload: {
                    ...product,
                    id: product.id,
                    product_id: product.id,
                }
            });

        } else {
            productsServices.getProductDetails(product === 'all' ? 'all' : product.id)
                .then(res => {
                    if (product !== 'all') {
                        dispatch({
                            type: productsConstants.SELECT_PRODUCT,
                            payload: {
                                ...product,
                                ...res,
                                id: product.id,
                                product_id: product.id,
                                optimized: !!res.id
                            }
                        });
                    } else {
                        dispatch({
                            type: productsConstants.SELECT_ALL_PRODUCT,
                            payload: res
                        });
                    }
                });
        }
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

                // notification.start({title: 'Optimization successfully started'});
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

                product.status === 'RUNNING' && notification.start({title: 'Optimize is started'});

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

function showOnlyOptimized(data) {
    return dispatch => {
        dispatch({
            type: productsConstants.SHOW_ONLY_OPTIMIZED,
            payload: data
        });
    };
}

function showOnlyActive(data) {
    return dispatch => {
        dispatch({
            type: productsConstants.SHOW_ONLY_ACTIVE,
            payload: data
        });
    };
}

function changeOptimizedOptions() {
    return dispatch => {
        dispatch({
            type: productsConstants.CHANGE_OPTIONS,
        });
    };
}

function changeOptimizedStrategy() {
    return dispatch => {
        dispatch({
            type: productsConstants.CHANGE_STRATEGY,
        });
    };
}

function dontShowWindowAgain(window) {
    return dispatch => {
        dispatch({
            type: productsConstants[`SWITCH_${window.windowName}_CONFIRM_WINDOW`],
            payload: window.status
        });
    };
}

function updateCampaignBudget(product) {
    return dispatch => {
        dispatch({
            type: productsConstants.CAMPAIGN_BUDGET,
            payload: product
        });
    };
}

