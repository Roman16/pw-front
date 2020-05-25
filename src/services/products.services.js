import api from './request';
import {productsUrls} from '../constans/api.urls';
import {productsConstants} from '../constans/actions.type';

export const productsServices = {
    getProducts,
    updateProductById,
    getProductDetails,
    getProductsSettingsList,
    updateProductSettings,
    updateProductSettingsByIdList,
    updateProductTargetAcos
};

function getProducts({pageSize, page, searchStr = '', onlyOptimization, onlyHasNew, ungroupVariations = 0, cancelToken}) {
    return api('get', `${productsUrls.allProducts}?search_query=${searchStr}&page=${page}&size=${pageSize}&ungroup_variations=${ungroupVariations}&only_under_optimization=${onlyOptimization ? 1 : 0}&only_has_new=${onlyHasNew ? 1 : 0}`, null, null, cancelToken)
}

function getProductsSettingsList({pageSize, page, searchStr = '', onlyActive, onlyOptimization, cancelToken}) {
    return api('get', `${productsUrls.productsSettingsList}?search_query=${searchStr}&page=${page}&size=${pageSize}&is_active=${onlyActive ? 1 : 0}&only_under_optimization=${onlyOptimization ? 1 : 0}`, false, false, cancelToken)
}

function updateProductSettings(parameters) {
    return api('post', `${productsUrls.updateSettings}/${parameters.id}`, {
        'product_margin_value': parameters.product_margin_value,
        'item_price': parameters.item_price,
        'item_price_from_user': parameters.item_price_from_user,
        'min_bid_manual_campaign': parameters.min_bid_manual_campaign,
        'max_bid_manual_campaign': parameters.max_bid_manual_campaign,
        'min_bid_auto_campaign': parameters.min_bid_auto_campaign,
        'max_bid_auto_campaign': parameters.max_bid_auto_campaign,
    })
}

function updateProductSettingsByIdList(params) {
    return api('post', `${productsUrls.updateSettings}`, params)
}

function updateProductTargetAcos(acos) {
    return api('post', `${productsUrls.updateSettings}`, acos)
}

function getProductDetails(id, cancelToken) {
    return api('get', `${productsUrls.productDetails(id)}`, false, false, cancelToken)
}

function updateProductById(product) {
    return api('post', productsUrls.saveProductData, {
        ...product,
        product_id: product.product_id ? product.product_id : product.id,
        status: product.status,
        optimization_strategy: product.optimization_strategy,
        add_negative_keywords: true,
        optimize_keywords: true,
        create_new_keywords: true,
        optimize_pats: true,
        add_negative_pats: true,
        create_new_pats: true
    })
}