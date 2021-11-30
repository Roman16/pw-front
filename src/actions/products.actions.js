import {productsConstants} from '../constans/actions.type'
import {productsServices} from '../services/products.services'
import {notification} from '../components/Notification'
import {daypartingServices} from "../services/dayparting.services"

export const productsActions = {
    fetchProducts,
    updateProduct,
    fetchProductDetails,
    selectAll,
    onSwitchOptimization,
    setNetMargin,
    updateOptions,
    showOnlyOptimized,
    showOnlyActive,
    dontShowWindowAgain,
    updateCampaignBudget,
    showOnlyOnDayparting,
    switchFetching,
    setProductsList
}

function switchFetching(state) {
    return ({
        type: productsConstants.SET_FETCHING_STATE,
        payload: state
    })

}

function fetchProducts(paginationParams) {
    return dispatch => {
        dispatch(switchFetching(true))

        productsServices.getProducts(paginationParams)
            .then(({result}) => {

                if (result.total_count > 0 && !result.products) {
                    localStorage.setItem('productsSearchParams', JSON.stringify({
                        ...JSON.parse(localStorage.getItem('productsSearchParams')),
                        page: 1,
                    }))

                    dispatch({
                        type: productsConstants.SET_PRODUCT_LIST,
                        payload: {
                            result: [],
                            totalSize: result.total_count,
                            fetching: false
                        }
                    })

                    dispatch(fetchProducts({...paginationParams, page: 1}))
                } else if (result.total_count) {
                    dispatch({
                        type: productsConstants.SET_PRODUCT_LIST,
                        payload: {
                            ...result,
                            totalSize: result.total_count,
                            result: result.products,
                            fetching: false
                        }
                    })
                } else {
                    dispatch({
                        type: productsConstants.SET_PRODUCT_LIST,
                        payload: {
                            result: [],
                            totalSize: 0,
                            fetching: false
                        }
                    })

                }
            })
    }
}

function setProductsList(list) {
    return ({
        type: productsConstants.SET_PRODUCT_LIST,
        payload: {
            result: list,
            totalSize: 0,
            fetching: false
        }
    })
}

function fetchProductDetails(product) {
    return dispatch => {
        dispatch({
            type: productsConstants.SELECT_PRODUCT,
            payload: {...product},
        })
    }
}

function updateProduct(product) {
    return dispatch => {
        dispatch({
            type: productsConstants.UPDATE_SELECTED_PRODUCT,
            payload: product
        })
    }
}

function updateOptions(options) {
    return dispatch => {
        dispatch({
            type: productsConstants.UPDATE_PRODUCT_OPTIONS,
            payload: options
        })
    }
}

function onSwitchOptimization(product) {
    return dispatch => {
        productsServices.updateProductById(product)
            .then(() => {
                dispatch({
                    type: productsConstants.UPDATE_SELECTED_PRODUCT,
                    payload: product
                })

                product.status === 'RUNNING' && notification.start({title: 'Optimize is started'})

                product.status === 'RUNNING' && dispatch({
                    type: productsConstants.UPDATE_PRODUCT_OPTIONS,
                    payload: product
                })
            })
    }
}

function setNetMargin(product) {
    return dispatch => {
        productsServices.updateProductById(product)
            .then(res => {
                dispatch({
                    type: productsConstants.UPDATE_SELECTED_PRODUCT,
                    payload: res
                })
            })
    }
}

function selectAll(data) {
    return ({
        type: productsConstants.SELECT_ALL_PRODUCT,
        payload: data
    })

}

function showOnlyOptimized(data) {
    return dispatch => {
        dispatch({
            type: productsConstants.SHOW_ONLY_OPTIMIZED,
            payload: data
        })
    }
}

function showOnlyOnDayparting(data) {
    return dispatch => {
        dispatch({
            type: productsConstants.SHOW_ONLY_ON_DAYPARTING,
            payload: data
        })
    }
}

function showOnlyActive(data) {
    return dispatch => {
        dispatch({
            type: productsConstants.SHOW_ONLY_ACTIVE,
            payload: data
        })
    }
}


function dontShowWindowAgain(window) {
    return dispatch => {
        dispatch({
            type: productsConstants[`SWITCH_${window.windowName}_CONFIRM_WINDOW`],
            payload: window.status
        })
    }
}

function updateCampaignBudget(product) {
    return dispatch => {
        dispatch({
            type: productsConstants.CAMPAIGN_BUDGET,
            payload: product
        })
    }
}

