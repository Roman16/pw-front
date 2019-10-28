import api from './request';
import {reportsUrls} from '../constans/api.urls';

export const reportsServices = {
    getLastReports,
    getAllReports
};

function getLastReports(id) {
    return api('get', `${reportsUrls.lastReports}?product_id=${id}`)
}

function getAllReports({
                           id,
                           page = 1,
                           dataType = 'keywords-optimization',
                           dataSubType = 'changed-keyword-bid-acos',
                           startDate,
                           endDate,
                       }) {
    const parameters = [
        startDate ? `&start_date=${startDate}` : '',
        endDate ? `&end_date=${endDate}` : ''
    ];

    return api('get', `${reportsUrls.allReports}?product_id=${id}&page=${page}&size=10&data_type=${dataType}&data_sub_type=${dataSubType}${parameters.join('')}`)
}