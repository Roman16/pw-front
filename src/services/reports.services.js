import api from './request';
import { reportsUrls } from '../constans/api.urls';

export const reportsServices = {
    getLastReports,
    getAllReports
};

function getLastReports(id) {
    return api('get', `${reportsUrls.lastReports}?product_id=${id}`)
}
function getAllReports() {
    console.log('get last reports')
    // return api('get', `${reportsUrls.lastReports}`)
}