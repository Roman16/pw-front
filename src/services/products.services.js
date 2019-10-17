import api from './request';
import { productsUrls } from '../constans/api.urls';

export const productsServices = {
    getProducts,
    updateProduct,
};

function getProducts({size, page, searchStr}) {
    return api('get', `${productsUrls.allProducts}?search_query=${searchStr}&page=${page}&size=${size}`)
}

function updateProduct() {
    return api('get', productsUrls.saveProductData)
}