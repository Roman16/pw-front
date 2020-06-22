import api from './request';
import {adminUrls} from '../constans/api.urls';

export const adminServices = {
    checkUserEmail,
    checkAccountLinks,
    checkOptimizationJobs,
    checkOptimizationChanges,

    checkAdGroupsList,
    checkAdGroupsCanBeOptimized,
    checkPatsList,

    generateReport
};

function checkUserEmail(email) {
    return api('get', `${adminUrls.userEmail}?email=${email}`)
}

function checkAccountLinks({id, sellerId, type = 'user_id'}) {
    if (type === 'user_id') {
        return api('get', `${adminUrls.accountLinks}?user_id=${id}`)
    } else if (type === 'seller_id') {
        return api('get', `${adminUrls.accountLinksBySellerId}?user_id=${id}&seller_id=${sellerId}`)
            .then(res => ({
                data: {
                    'linked-accounts': [res.data]
                }
            }))
    }
}

function checkOptimizationJobs({userId, marketplaceId, type, asin, sku}) {
    const parameters = [
        asin ? `&asin=${asin}` : '',
        sku ? `&sku=${sku}` : '',
    ];

    if (type === 'marketplace') {
        return api('get', `${adminUrls.optimizationJobsByMarketplace}?user_id=${userId}&marketplace_id=${marketplaceId}${parameters.join('')}`)
    } else {
        return api('get', `${adminUrls.optimizationJobs}?user_id=${userId}`)
    }
}

function checkOptimizationChanges({userId, productId, asin, marketplace_id}) {
    return api('get', `${adminUrls.productOptimizationChanges}?user_id=${userId}&product_id=${productId}&asin=${asin}&marketplace_id=${marketplace_id}`)
        .then(res => {
            return (res.data.map(item => ({
                ...item,
                product_id: productId
            })))
        })
}

function checkAdGroupsList({userId, profile_id, sku}) {
    return api('get', `${adminUrls.adGroupsList}?user_id=${userId}&profile_id=${profile_id}&sku=${sku}`)
}

function checkAdGroupsCanBeOptimized({userId, profile_id, sku}) {
    return api('get', `${adminUrls.adGroupsCanBeOptimized}?user_id=${userId}&profile_id=${profile_id}&sku=${sku}`)
}

function checkPatsList({userId, profile_id, ad_groups_ids}) {
    return api('get', `${adminUrls.patsList}?user_id=${userId}&profile_id=${profile_id}&ad_groups_ids=${ad_groups_ids}`)
}


function generateReport(data) {
    return api('post', `${adminUrls.report}`, data)
}

