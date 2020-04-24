import api from './request';
import {adminUrls} from '../constans/api.urls';

export const adminServices = {
    checkUserEmail,
    checkAccountLinks,
    checkOptimizationJobs,
    checkOptimizationChanges,
    checkOptimizationConditions
};

function checkUserEmail(email) {
    return api('get', `${adminUrls.userEmail}?email=${email}`)
}

function checkAccountLinks({id, type='user_id'}) {
    if(type === 'user_id') {
        return api('get', `${adminUrls.accountLinks}?user_id=${id}`)
    } else if(type === 'seller_id') {
        return api('get', `${adminUrls.accountLinksBySellerId}?seller_id=${id}`)
    }
}

function checkOptimizationJobs({userId,marketplaceId, type, asin, sku}) {
    const parameters = [
        asin ? `&asin=${asin}` : '',
        sku ? `&sku=${sku}` : '',
    ];

    if(type === 'marketplace') {
        return api('get', `${adminUrls.optimizationJobsByMarketplace}?user_id=${userId}&marketplace_id=${marketplaceId}${parameters.join('')}`)
    } else {
        return api('get', `${adminUrls.optimizationJobs}?user_id=${userId}`)
    }
}

function checkOptimizationChanges({userId, productId, asin, marketplace_id}) {
    return api('get', `${adminUrls.productOptimizationChanges}?user_id=${userId}&product_id=${productId}&asin=${asin}&marketplace_id=${marketplace_id}`)
        .then(res => {
            return(res.data.map(item => ({
                ...item,
                product_id: productId
            })))
        })
}

function checkOptimizationConditions({userId, profile_id, sku}) {
    return api('get', `${adminUrls.productOptimizationConditions}?user_id=${userId}&profile_id=${profile_id}&sku=${sku}`)
}

