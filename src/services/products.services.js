import api from './request';
import { productsUrls } from '../constans/api.urls';

export const productsServices = {
    getProducts,
};

function getProducts({size, page, searchStr}) {
    return api('get', `${productsUrls.allProducts}?search_query=${searchStr}&page=${page}&size=${size}`)
}
