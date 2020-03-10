import api from './request';
import {productsUrls} from '../constans/api.urls';
import {productsConstants} from '../constans/actions.type';

export const productsServices = {
    getProducts,
    updateProductById,
    getProductDetails,
    getProductsSettingsList,
    updateProductSettings,
    updateProductTargetAcos
};

function getProducts({size, page, searchStr = '', onlyOptimization, onlyHasNew, ungroupVariations = 0, cancelToken}) {
    return api('get', `${productsUrls.allProducts}?search_query=${searchStr}&page=${page}&size=${size}&ungroup_variations=${ungroupVariations}&only_under_optimization=${onlyOptimization ? 1 : 0}&only_has_new=${onlyHasNew ? 1 : 0}`, null, null, cancelToken)
}

function getProductsSettingsList({size, page, searchStr = '', onlyActive, cancelToken}) {
    return api('get', `${productsUrls.productsSettingsList}?search_query=${searchStr}&page=${page}&size=${size}&is_active=${onlyActive ? 1 : 0}`, false, false, cancelToken)
}

function updateProductSettings(parameters) {
    return api('post', `${productsUrls.updateSettings}`, parameters)
}

function updateProductTargetAcos(acos) {
    return api('post', `${productsUrls.updateSettings}`, acos)
}

function getProductDetails(id) {
    return api('get', `${productsUrls.productDetails(id)}`)
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