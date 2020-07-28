import api from './request';
import {adminUrls} from '../constans/api.urls';
import moment from "moment";
import {reasonFilterParams} from "./reports.services";

export const adminServices = {
    checkUserEmail,
    checkAccountLinks,
    checkOptimizationJobs,
    checkOptimizationChanges,

    checkAdGroupsList,
    checkAdGroupsCanBeOptimized,
    checkPatsList,
    checkReports,

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

function checkReports({userId, size, page, sorterColumn, sorterType, startDate, endDate, filters}) {
    const parameters = [];

    console.log(filters);

    filters.forEach(({filterBy, type, value}) => {
        if (filterBy === 'datetime') {
            parameters.push(`&datetime:range=${moment.tz(`${moment(value.startDate, 'DD-MM-YY').format('YYYY-MM-DD')} ${moment().startOf('day').format('HH:mm:ss')}`, 'America/Los_Angeles').toISOString()},${moment.tz(`${moment(value.endDate, 'DD-MM-YY').format('YYYY-MM-DD')} ${moment().endOf('day').format('HH:mm:ss')}`, 'America/Los_Angeles').toISOString()}`)
        } else if (filterBy === 'object' || filterBy === 'keyword_pt' || filterBy === 'campaign_name' || filterBy === 'ad_group_name') {
            parameters.push(`&${filterBy === 'keyword_pt' ? 'object' : filterBy}:${type.key}=${value}`)
        } else if (filterBy === 'object_type' || filterBy === 'match_type') {
            parameters.push(`&object_type:in=${value.join(',')}`)
        } else if (filterBy === 'impressions' || filterBy === 'clicks' || filterBy === 'spend' || filterBy === 'sales' || filterBy === 'acos') {
            parameters.push(`&${filterBy}:${type.key}=${value}`)
        } else if (filterBy === 'keyword_id') {
            parameters.push(`&keyword_id:eq=${value}`)
        } else if (filterBy === 'type') {
            parameters.push(`&reason_type:in=${value.map(item => reasonFilterParams[item].join(',')).join(',')}`)
        }
    })

    if (sorterType && sorterColumn) {
        parameters.push(`&order_by:${sorterType}=${sorterColumn}`)
    }

    return api('get', `${adminUrls.userReports}?user_id=${userId}&page=${page}&size=${size}${parameters.join('')}`)
}

function generateReport(data) {
    return api('post', `${adminUrls.report}`, data)
}

