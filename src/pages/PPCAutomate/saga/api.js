import axios from 'axios';
import { DEFAULT_PAGE_SIZE } from '../const';

export const fetchProductList = (searchText, page) => (
    axios.get(`${window.BASE_URL}/ppc-automation/product`, {
        params: {
            search_query: encodeURI(searchText),
            page,
            size: DEFAULT_PAGE_SIZE,
            api_token: 'INaDvhEVGFUEzhXDSpZtQ8i0PKZlb6E1pkpK99PqqnJKfCK3pGSwXuF4Y8Bq',
        },
    })
        .then((response) => response)

);
export const fetchProductData = (productId) => (
    axios.get(`${window.BASE_URL}/ppc-automation/get-parameters`, {
        params: {
            product_id: productId,
            api_token: 'INaDvhEVGFUEzhXDSpZtQ8i0PKZlb6E1pkpK99PqqnJKfCK3pGSwXuF4Y8Bq',
        },
    })
        .then((response) => response)

);
export const fetchProductChangeData = (productId) => (
    axios.get(`${window.BASE_URL}/ppc-automation/get-changes-data`, {
        params: {
            product_id: productId,
            api_token: 'INaDvhEVGFUEzhXDSpZtQ8i0PKZlb6E1pkpK99PqqnJKfCK3pGSwXuF4Y8Bq',
        },
    })
        .then((response) => response)

);


export const saveProductData = (status, {
    product_id, optimization_strategy, create_new_keywords,
    add_negative_keywords,
    add_negative_pats,
    create_new_pats,
    optimize_keywords,
    optimize_pats,
}) => (
    axios.get(`${window.BASE_URL}/ppc-automation/save-parameters`, {
        params: {
            status,
            product_id,
            optimization_strategy,
            add_negative_keywords: +add_negative_keywords,
            create_new_keywords: +create_new_keywords,
            add_negative_pats: +add_negative_pats,
            create_new_pats: +create_new_pats,
            optimize_keywords: +optimize_keywords,
            optimize_pats: +optimize_pats,
            api_token: 'INaDvhEVGFUEzhXDSpZtQ8i0PKZlb6E1pkpK99PqqnJKfCK3pGSwXuF4Y8Bq',
        },
    })
        .then((response) => response)

);
