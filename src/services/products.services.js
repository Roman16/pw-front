import api, {encodeString} from './request'
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


export const searchStrWrap = (searchStr, wrap) => {
    let searchParams = []

    if (searchStr.value) {
        if(searchStr?.strictSearch) {
            searchParams.push(`&search_strict=1`)
        }

        if(searchStr?.multiSearch) {
            searchStr.value.forEach(i => {
                if (wrap) {
                    searchParams.push(`&${wrap}[search][]=${encodeString(i)}`)
                } else {
                    searchParams.push(`&search[]=${encodeString(i)}`)
                }
            })
        } else {
            if (wrap) {
                searchParams.push(`&${wrap}[search][]=${encodeString(searchStr.value)}`)
            } else {
                searchParams.push(`&search[]=${encodeString(searchStr.value)}`)
            }
        }
    }

    return searchParams
}

function getProducts({pageSize, page, searchStr = '', onlyOptimization, onlyHasNew, ungroupVariations = 0, idList = [], cancelToken}) {
    return api('get', `${productsUrls.allProducts}?page=${page}&size=${pageSize}&ungroup_variations=${ungroupVariations}&only_under_optimization=${onlyOptimization ? 1 : 0}&only_has_new=${onlyHasNew ? 1 : 0}${searchStrWrap(searchStr).join('')}${idList.length > 0 ? `&product_id[]=${idList.join('&product_id[]=')}` : ''}`, null, null, cancelToken)
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
    return api('get', `${productsUrls.productsSettingsList}?page=${page}&size=${pageSize}&is_active=${onlyActive ? 1 : 0}&only_under_optimization=${onlyOptimization ? 1 : 0}${searchStrWrap(searchStr).join('')}`, false, false, cancelToken)
}

function updateProductSettings(parameters) {
    return api('post', `${productsUrls.updateSettings}/${parameters.id}`, {
        'product_margin_value': parameters.product_margin_value,
        'item_price': parameters.item_price,
        'item_price_from_user': parameters.item_price_from_user || null,
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
        item_price_from_user: variation.item_price_from_user || null
    })
}

function updateProductSettingsById(parameters) {
    return api('post', `${productsUrls.updateSettings}/${parameters.product_id}`, {
        'item_price_from_user': parameters.item_price_from_user || null,
        'min_bid_manual_campaign': parameters.min_bid_manual_campaign,
        'max_bid_manual_campaign': parameters.max_bid_manual_campaign,
        'min_bid_auto_campaign': parameters.min_bid_auto_campaign,
        'max_bid_auto_campaign': parameters.max_bid_auto_campaign,
    })
}

function updateProductSettingsByIdList(params, searchStr = '') {
    return api('post', `${productsUrls.updateSettings}?${searchStrWrap(searchStr).join('')}`.replace(/[^=&]+=(?:&|$)/g, ""), params)
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

function getActualCogs(productId, cancelToken) {
    return api('get', `${productsUrls.actualCogs}?product_id=${productId}`, undefined, undefined, cancelToken)
}
