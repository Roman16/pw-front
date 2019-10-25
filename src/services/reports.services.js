import api from './request';
import { reportsUrls } from '../constans/api.urls';

export const reportsServices = {
    getLastReports,
    getAllReports
};

function getLastReports(id) {
    return api('get', `${reportsUrls.lastReports}?product_id=${id}`)
}
function getAllReports(parameters) {
    console.log(parameters)
    return api('get', `${reportsUrls.lastReports}`)

}