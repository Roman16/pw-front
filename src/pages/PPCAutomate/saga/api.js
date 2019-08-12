import axios from 'axios';
import { DEFAULT_PAGE_SIZE } from '../const';

export const fetchProductList = (searchText, page) => (
    axios.get('https://profitwhales.com/ppc-automation/product', {
        params: {
            search_query: encodeURI(searchText),
            page,
            size: DEFAULT_PAGE_SIZE,
        },
        headers: {
            Authorization: 'Bearer INaDvhEVGFUEzhXDSpZtQ8i0PKZlb6E1pkpK99PqqnJKfCK3pGSwXuF4Y8Bq',
        },
    })
        .then((response) => response)

);
