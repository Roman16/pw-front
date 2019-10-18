import api from './request';
import { productsUrls } from '../constans/api.urls';
import {productsConstants} from '../constans/actions.type';

export const productsServices = {
    getProducts,
    updateProduct,
    getProductDetails,
};

function getProducts({size, page, searchStr}) {
    return api('get', `${productsUrls.allProducts}?search_query=${searchStr}&page=${page}&size=${size}`,null,null,true, productsConstants.SET_PRODUCT_LIST)
}

function getProductDetails(id) {
    return api('get', `${productsUrls.productDetails(id)}`)
}

function updateProduct() {
    return api('get', productsUrls.saveProductData)
}