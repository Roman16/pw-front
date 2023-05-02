import api from "./request"
import {jungleScoutReportsUrls} from "../constans/api.urls"

export const jungleScoutReportServices = {
    getReports,
    getSegments,
    getReportData,
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
