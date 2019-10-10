import axios from 'axios';
import { DEFAULT_PAGE_SIZE } from '../const';

export const fetchProductList = (searchText, page) => (
    axios.get('/ppc-automation/product', {
        params: {
            search_query: encodeURI(searchText),
            page,
            size: DEFAULT_PAGE_SIZE,
        },
    })
        .then((response) => response)

);
export const fetchProductData = (productId) => (
    axios.get('/ppc-automation/get-parameters', {
        params: {
            product_id: productId,
        },
    })
        .then((response) => response)

);
export const fetchProductChangeData = (productId) => (
    axios.get('/ppc-automation/get-changes-data', {
        params: {
            product_id: productId,
        },
    })
        .then((response) => response)

);
export const setNetMargin = (productId, netMargin) => (
    axios.post('/api/product-settings/product-margin', {
        id: productId,
        'net-margin': netMargin,
    })
        .then((response) => response)

);


export const saveProductData = (status, activeProductId, {
    optimization_strategy, create_new_keywords,
    add_negative_keywords,
    add_negative_pats,
    create_new_pats,
    optimize_keywords,
    optimize_pats,
}) => (
    axios.get('/ppc-automation/save-parameters', {
        params: {
            status,
            product_id: activeProductId,
            optimization_strategy,
            add_negative_keywords: +add_negative_keywords,
            create_new_keywords: +create_new_keywords,
            add_negative_pats: +add_negative_pats,
            create_new_pats: +create_new_pats,
            optimize_keywords: +optimize_keywords,
            optimize_pats: +optimize_pats,
        },
    })
        .then((response) => response)

);
