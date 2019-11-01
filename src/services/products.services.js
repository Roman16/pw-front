import api from './request';
import { productsUrls } from '../constans/api.urls';
import {productsConstants} from '../constans/actions.type';

export const productsServices = {
    getProducts,
    updateProductById,
    getProductDetails,
    getProductsSettingsList,
    updateProductSettings
};

function getProducts({size, page, searchStr='', onlyOptimization}) {
    return api('get', `${productsUrls.allProducts}?search_query=${searchStr}&page=${page}&size=${size}&only_under_optimization=${onlyOptimization ? 1 : 0}`,null,null,true, productsConstants.SET_PRODUCT_LIST)
}

function getProductsSettingsList({size, page, searchStr=''}) {
    return api('get', `${productsUrls.productsSettingsList}?search_query=${searchStr}&page=${page}&size=${size}`)
}

function updateProductSettings(parameters) {
    return api('post', `${productsUrls.updateSettings}`, parameters)
}

function getProductDetails(id) {
    return api('get', `${productsUrls.productDetails(id)}`)
}

function updateProductById(product) {
    return api('post', productsUrls.saveProductData, {
        product_id: product.product_id ? product.product_id : product.id,
        status: product.status,
        optimization_strategy: product.optimization_strategy,
        add_negative_keywords: product.add_negative_keywords,
        optimize_keywords: product.optimize_keywords,
        create_new_keywords: product.create_new_keywords,
        optimize_pats: product.optimize_pats,
        add_negative_pats: product.add_negative_pats,
        create_new_pats: product.create_new_pats
    })
}