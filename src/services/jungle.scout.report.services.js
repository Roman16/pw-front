import api from "./request"
import {jungleScoutReportsUrls} from "../constans/api.urls"

export const jungleScoutReportServices = {
    getReports,
    getReportData
}


function getReports({page, size}) {
    return api('get', `${jungleScoutReportsUrls.allReports}?page=${page}&size=${size}`)
}

function getReportData(id, attributionWindow) {
    return api('get', `${jungleScoutReportsUrls.reportData(id)}?attribution_window=${attributionWindow}`)
}
