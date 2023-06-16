import api from "./request"
import {adminUrls, jungleScoutReportsUrls} from "../constans/api.urls"

export const jungleScoutReportServices = {
    getReports,
    getSegments,
    getReportData,

    //admin
    getUserSegments,
    getUserReports,
    getUserReportData,
    saveUserReport,
}


function getReports({page, size}, segment) {
    return api('get', `${jungleScoutReportsUrls.allReports}?page=${page}&size=${size}${segment ? `&segment_id[]=${segment}` : ''}`)
}

function getSegments() {
    return api('get', `${jungleScoutReportsUrls.allSegments}`)
}

function getReportData(id, attributionWindow) {
    return api('get', `${jungleScoutReportsUrls.reportData(id)}?attribution_window=${attributionWindow}`)
}

//
function getUserSegments(userId) {
    return api('get', `${jungleScoutReportsUrls.userSegments}?page=1&size=1000&user_id[]=${userId}`, undefined, undefined, undefined, undefined, undefined, false)
}

function getUserReports(segmentId) {
    return api('get', `${jungleScoutReportsUrls.userReports}?page=1&size=1000&segment_id[]=${segmentId}`, undefined, undefined, undefined, undefined, undefined, false)
}

function getUserReportData(id, attributionWindow) {
    return api('get', `${jungleScoutReportsUrls.userReportData(id)}?attribution_window=${attributionWindow}`, undefined, undefined, undefined, undefined, undefined, false)
}

function saveUserReport(id, data) {
    return api('put', `${jungleScoutReportsUrls.userReports}/${id}`, data, undefined, undefined, undefined, undefined, false)
}