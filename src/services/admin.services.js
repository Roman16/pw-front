import api from './request';
import {adminUrls} from '../constans/api.urls';

export const adminServices = {
    checkUserEmail,
    checkAccountLinks,
    checkOptimizationJobs,
    checkProductByAsin
};

function checkUserEmail(email) {
    return api('get', `${adminUrls.userEmail}?email=${email}`)
}

function checkAccountLinks(userId) {
    return api('get', `${adminUrls.accountLinks}?user_id=${userId}`)
}

function checkOptimizationJobs(userId) {
    return api('get', `${adminUrls.optimizationJobs}?user_id=${userId}`)
}

function checkProductByAsin({asin, user_id, marketplace_id}) {
    return api('get', `${adminUrls.productInfo}?user_id=${user_id}&asin=${asin}&marketplace_id=${marketplace_id}`)
}

