import api from './request'
import {productsUrls} from '../constans/api.urls'
import {productsConstants} from '../constans/actions.type'
import {optimizationOptions} from '../pages/PPCAutomate/Optimization/OptimizationIncludes/OptimizationIncludes'
import {func} from "prop-types"

export const productsServices = {
    getProducts,
    updateProductById,
    getProductDetails,
    getProductsSettingsList,
    updateProductSettings,
    updateVariationSettings,
    updateProductSettingsByIdList,
    stopProductOptimization,
    getCampaignsSettings,
    updateCampaignsBlacklist,
    updateProductSettingsById,
    getProductCogs,
    getProductAmazonFees,
    createProductCogs,
    updateProductCogs,
    deleteProductCogs,
    setDefaultVariation,
    getActualCogs,

    startProductOptimization
}

function getProducts({pageSize, page, searchStr = '', onlyOptimization, onlyHasNew, ungroupVariations = 0, cancelToken}) {
    return api('get', `${productsUrls.allProducts}?search_query=${searchStr}&page=${page}&size=${pageSize}&ungroup_variations=${ungroupVariations}&only_under_optimization=${onlyOptimization ? 1 : 0}&only_has_new=${onlyHasNew ? 1 : 0}`, null, null, cancelToken)
}

function getProductDetails(id, cancelToken) {
    return api('get', `${productsUrls.productDetails(id)}`, false, false, cancelToken)
}

function getProductCogs(id) {
    return api('get', `${productsUrls.productCogs}?product_id=${id}&force=1`)
}

function getProductAmazonFees(id) {
    return api('get', `${productsUrls.productAmazonFees}?product_id=${id}&force=1`)
}

function createProductCogs(data) {
    return api('post', `${productsUrls.productCogs}`, data)
}

function updateProductCogs(data) {
    return api('put', `${productsUrls.productCogs}`, {...data, force: 1})
}

function deleteProductCogs(recordId, productId) {
    return api('delete', `${productsUrls.productCogs}?record_id=${recordId}&product_id=${productId}`,)
}

function startProductOptimization(product) {
    const data = {
        desired_target_acos: product.optimization_strategy === 'AchieveTargetACoS' ? product.desired_target_acos : undefined,
        optimization_strategy: product.optimization_strategy
    }

    optimizationOptions.forEach(item => {
        data[item.value] = product[item.value] !== null ? product[item.value] : true
    })

    return api('post', `${productsUrls.startOptimization(product.id)}`, data)
}

function stopProductOptimization(productId) {
    return api('post', `${productsUrls.stopOptimization(productId)}`,)
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
        'desired_acos': parameters.desired_acos,
        'break_even_acos': parameters.break_even_acos,
        'advertising_strategy': parameters.advertising_strategy,
        'bsr_tracking': parameters.bsr_tracking,
        'friendly_name': parameters.friendly_name,
    })
}

function updateVariationSettings(variation) {
    return api('post', `${productsUrls.updateVariation}`, {
        product_id: variation.id,
        item_price_from_user: variation.item_price_from_user
    })
}

function updateProductSettingsById(parameters) {
    return api('post', `${productsUrls.updateSettings}/${parameters.product_id}`, {
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

function updateProductById(product) {
    const data = {
        product_id: product.product_id ? product.product_id : product.id,
        status: product.status,
        desired_target_acos: product.desired_target_acos,
        optimization_strategy: product.optimization_strategy
    }

    optimizationOptions.forEach(item => {
        data[item.value] = localStorage.getItem('adminToken') ? product[item.value] : true
    })

    return api('post', productsUrls.saveProductData, data)
}

function getCampaignsSettings(id) {
    return api('get', `${productsUrls.campaignsSettingList(id)}`)
}

function updateCampaignsBlacklist(id, data) {
    return api('post', `${productsUrls.campaignsSettingList(id)}`, data)
}

function setDefaultVariation(data) {
    return api('post', `${productsUrls.defaultVariation}`, data)
}

function getActualCogs(productId) {
    return api('get', `${productsUrls.actualCogs}?product_id=${productId}`)
}
