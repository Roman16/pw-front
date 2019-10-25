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

function getProducts({size, page, searchStr=''}) {
    return api('get', `${productsUrls.allProducts}?search_query=${searchStr}&page=${page}&size=${size}`,null,null,true, productsConstants.SET_PRODUCT_LIST)
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
    return api('post', productsUrls.saveProductData, product)
}