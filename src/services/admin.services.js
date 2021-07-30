import api from './request'
import {adminUrls} from '../constans/api.urls'
import moment from "moment"
import {reasonFilterParams} from "./reports.services"
import axios from "axios"
import {history} from "../utils/history"
import {userService} from "./user.services"
import {notification} from "../components/Notification"

export const adminServices = {
    checkUserEmail,
    checkAccountLinks,
    checkOptimizationJobs,
    checkOptimizationChanges,

    checkAdGroupsList,
    checkAdGroupsCanBeOptimized,
    checkPatsList,
    checkReports,

    generateReport,

    fetchUsers,
    impersonateUser,
    fetchUserProducts,
    changeUserPassword,

    zthVersionInformation,
    fetchZthJobs,
    fetchZthCreationJobs,
    fetchSemanticInformation,
    fetchEnums,
    fetchExactBids,
    convertSemantic,
    uploadSemantic,

    fetchZthTemplates,
    restartZthJob,
    downloadReport,
    fetchCreateParams,
    fetchReportFileSize,
    createZTH

}

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
    ]

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
    const parameters = []

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
            parameters.push(`&type:in=${value.map(item => reasonFilterParams[item].join(',')).join(',')}`)
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

function fetchUsers(isAgencyClient = true) {
    return api('get', `${adminUrls.usersList}?page=1&size=50000${isAgencyClient ? '&is_agency_client=1' : ''}`)
}

function impersonateUser(value, type) {
    return api('get', type === 'email' ? `${adminUrls.impersonateByEmail}?email=${value}` : adminUrls.impersonateById(value))
}

function fetchUserProducts(id) {
    return api('get', `${adminUrls.userProductsList}?id=${id}`)
}

function changeUserPassword(type, user, password) {
    return api('post',
        type === 'email' ? adminUrls.userPasswordByEmail : `${adminUrls.userPasswordById(user)}`,
        type === 'email' ? {...password, email: user} : password)
}

//----------------------------

const zthRequest = (method, url, data, contentType) => {
    const baseUrl =
        process.env.REACT_APP_ENV === 'production'
            ? `${process.env.REACT_APP_API_PROD}/api/agency-server/api/v1/` || ''
            : `${process.env.REACT_APP_API_URL}/api/agency-server/api/v1/` || ''

    const token = localStorage.getItem('token'),
        adminToken = localStorage.getItem('adminToken'),
        zthToken = localStorage.getItem('zthToken')

    const config = {
        method: method,
        url: baseUrl + url,
        headers: {
            'Authorization': adminToken ? `Bearer ${adminToken}` : `Bearer ${token}`,
            'X-PW-Agency-ZTH-API-Token': zthToken,
            'Content-Type': contentType ?  'multipart/form-data' : 'application/json'
        },
        data: data
    }

    return new Promise((resolve, reject) => {
        axios(config)
            .then(function (response) {
                resolve(response.data)
            })
            .catch(function (error) {
                if (error.response && error.response.data && error.response.data.errorMessage) {
                    notification.error({title: error.response.data.errorMessage})
                } else {
                    notification.error({title: 'Error!'})
                }
                reject(error)
            })
    })
}

function zthVersionInformation() {
    return zthRequest('get', `${adminUrls.zthVersion}`)
}

function fetchZthJobs({page, title, pageSize, status}) {
    return zthRequest('get', `${adminUrls.zthJobs}?limit=${pageSize}&offset=${(page - 1) * pageSize}${title && `&title=${title}`}${status && `&status=${status}`}`)
}

function fetchZthCreationJobs({page, title, pageSize, status}) {
    return zthRequest('get', `${adminUrls.zthCreationJobs}?limit=${pageSize}&offset=${(page - 1) * pageSize}${title && `&title=${title}`}${status && `&status=${status}`}`)
}

function fetchSemanticInformation(url) {
    return zthRequest('post', `${adminUrls.semanticInfo}`, url)
}

function fetchEnums() {
    return zthRequest('get', `${adminUrls.enums}`)
}

function fetchExactBids() {
    return zthRequest('get', `${adminUrls.exactBids}`)
}

function convertSemantic(data) {
    return zthRequest('post', `${adminUrls.convertSemantic}`, data)
}

function uploadSemantic(data) {
    return zthRequest('post', `${adminUrls.uploadSemantic}`, data)
}

function fetchZthTemplates({page, pageSize}) {
    return zthRequest('get', `${adminUrls.zthTemplates}`)
}

function restartZthJob(id) {
    return zthRequest('post', `${adminUrls.restartJob(id)}`)
}
function downloadReport(report,id) {
    return zthRequest('get', `${adminUrls.downloadReport(id)}`)
}
function fetchCreateParams() {
    return zthRequest('get', `${adminUrls.createParams}`)
}
function fetchReportFileSize() {
    return zthRequest('get', `${adminUrls.reportFileSize}`)
}
function createZTH(data) {
    return zthRequest('post', `${adminUrls.createSemantic}`, data, 'multipart/form-data')
}
//
// function createZTH(data) {
//     const config = {
//         method: 'POST',
//         url: 'https://software.profitwhales.com:45888/api/v1/zero-to-hero/create',
//         headers: {
//             'X-PW-Agency-ZTH-API-Token': '5VTC7QSZ3OQpU3f02ghgMKl4btib1lAcGV9GmcBXs4pJ1N73JfYfcrel9zMWSOcU',
//         },
//         data: data
//     }
//
//
//     return new Promise((resolve, reject) => {
//         axios(config)
//             .then(function (response) {
//                 resolve(response.data)
//             })
//             .catch(function (error) {
//                 if (error.response && error.response.data && error.response.data.errorMessage) {
//                     notification.error({title: error.response.data.errorMessage})
//                 } else {
//                     notification.error({title: 'Error!'})
//                 }
//                 reject(error)
//             })
//     })
// }

