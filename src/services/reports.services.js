import api from './request'
import {reportsUrls} from '../constans/api.urls'
import moment from "moment"

export const reasonFilterParams = {
    'adjusted_bid': ['ChangedKeywordBidACoS', 'ChangedKeywordBidImpressions', 'ChangedPATBidACoS', 'ChangedPATBidImpressions', 'RevertLastChangeKeywordNoSales', 'RevertLastChangePATNoSales'],
    'not_profitable_keyword_pt': ['PausedKeywordHighACoS', 'PausedKeywordNoSales', 'PausedPATHighACoS', 'PausedPATNoSales'],
    'created_keyword_pt': ['CreatedKeywordFromCST', 'CreatedPATFromCST'],
    'created_negative_keyword_pt': ['AddedCreatedKeywordAsNegative', 'AddedCreatedPATAsNegative', 'CreatedNegativeKeywordFromCSTHighACoS', 'CreatedNegativeKeywordFromCSTNoSales', 'CreatedNegativePATFromCSTHighACoS', 'CreatedNegativePATFromCSTNoSales'],
    'duplicate_keyword_pt': ['PausedKeywordDuplicateFromCustomerSearchTerm', 'PausedKeywordDuplicateOfPAT', 'PausedKeywordDuplicate', 'PausedPATDuplicate'],
    'created_campaign': ['CreatedCampaign'],
    'created_ad_group': ['CreatedAdGroup'],
    'created_product_ad': ['CreatedProductAd']
}

export const reportsServices = {
    getAllReports
}

function getAllReports(type, options, cancelToken) {
    const {
        id,
        page = 1,
        pageSize = 10,
        filters,
        sorterColumn
    } = options

    const parameters = []

    filters.forEach(({filterBy, type, value}) => {
        if (filterBy === 'datetime') {
            parameters.push(`&datetime:range=${moment.tz(`${moment(value.startDate).format('YYYY-MM-DD')} ${moment().startOf('day').format('HH:mm:ss')}`, 'America/Los_Angeles').toISOString()},${moment.tz(`${moment(value.endDate).format('YYYY-MM-DD')} ${moment().endOf('day').format('HH:mm:ss')}`, 'America/Los_Angeles').toISOString()}`)
        } else if (filterBy === 'object' || filterBy === 'keyword_pt' || filterBy === 'campaign_name' || filterBy === 'ad_group_name') {
            parameters.push(`&${filterBy === 'keyword_pt' ? 'object' : filterBy}:${type.key}=${value}`)
        } else if (filterBy === 'object_type' || filterBy === 'match_type') {
            parameters.push(`&object_type:in=${value.join(',')}`)
        } else if (filterBy === 'impressions' || filterBy === 'clicks' || filterBy === 'spend' || filterBy === 'sales' || filterBy === 'acos') {
            parameters.push(`&${filterBy}:${type.key}=${value}`)
        } else if (filterBy === 'keyword_id') {
            parameters.push(`&keyword_id:eq=${value}`)
        } else if (filterBy === 'type') {
            parameters.push(`&type:in=${value.map(item => reasonFilterParams[item].join(',')).join(',')}`)
        }
    })

    if (sorterColumn.type) {
        parameters.push(`&order_by:${sorterColumn.type}=${sorterColumn.column}`)
    }

    return api('get', `${reportsUrls.reports}/${type}?product_id=${id}&page=${page}&size=${pageSize}${parameters.join('')}`, false, false, cancelToken)
}