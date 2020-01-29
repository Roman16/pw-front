import api from './request';
import {reportsUrls} from '../constans/api.urls';

export const reportsServices = {
    getLastReports,
    getAllReports
};

function getLastReports(id) {
    return api('get', `${reportsUrls.lastReports}?product_id=${id}`)
}

function getAllReports(options, cancelToken) {
    const {
        id,
        page = 1,
        pageSize = 10,
        dataType = 'keywords-optimization',
        dataSubType = 'changed-keyword-bid-acos',
        startDate,
        endDate,
        filteredColumns,
        sorterColumn
    } = options;

    const parameters = [
        startDate ? `&start_date=${startDate}` : '',
        endDate ? `&end_date=${endDate}` : '',
    ];

    Object.keys(filteredColumns).forEach(key => {
        if (filteredColumns[key] != null) {
            if ((typeof filteredColumns[key] === 'object') && !Array.isArray(filteredColumns[key])) {
                parameters.push(`&${key}:${filteredColumns[key].type}=${filteredColumns[key].value}`)
            } else if (typeof filteredColumns[key] === 'string') {
                parameters.push(`&${key}:search=${filteredColumns[key]}`)
            } else if (Array.isArray(filteredColumns[key])) {
                parameters.push(`&${key}:in=${filteredColumns[key].join(',')}`)
            }
        }
    });

    if (sorterColumn) {
        parameters.push(`&order_by:${sorterColumn.type}=${sorterColumn.key}`)
    }

    return api('get', `${reportsUrls.allReports}?product_id=${id}&page=${page}&size=${pageSize}&data_type=${dataType}&data_sub_type=${dataSubType}${parameters.join('')}`, false, false, cancelToken)
}