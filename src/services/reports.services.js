import api from './request';
import {reportsUrls} from '../constans/api.urls';

export const reportsServices = {
    getAllReports
};

function getAllReports(type, options, cancelToken) {
    const {
        id,
        page = 1,
        pageSize = 10,
        filters,
        sorterColumn
    } = options;

    const parameters = [];

    Object.keys(filters).forEach(key => {
        if (filters[key] != null) {
            if ((typeof filters[key] === 'object') && !Array.isArray(filters[key])) {
                parameters.push(`&${key}:${filters[key].type}=${filters[key].value}`)
            } else if (typeof filters[key] === 'string') {
                parameters.push(`&${key}:search=${filters[key]}`)
            } else if (Array.isArray(filters[key])) {
                parameters.push(`&${key}:in=${filters[key].join(',')}`)
            }
        }
    });


    // if (sorterColumn.type) {
    //     parameters.push(`&order_by:${sorterColumn.type}=${sorterColumn.column}`)
    // }

    return api('get', `${reportsUrls.reports}/${type}?product_id=${id}&page=${page}&size=${pageSize}${parameters.join('')}`, false, false, cancelToken)
}