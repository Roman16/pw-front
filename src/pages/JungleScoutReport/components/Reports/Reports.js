import React, {useEffect, useState} from "react"
import './Reports.less'
import Pagination from "../../../../components/Pagination/Pagination"
import {jungleScoutReportServices} from "../../../../services/jungle.scout.report.services"
import RouteLoader from "../../../../components/RouteLoader/RouteLoader"
import moment from "moment"


export const Reports = ({selectedReport, onSelect}) => {
    const [requestParams, setRequestParams] = useState({
            page: 1,
            size: 10
        }),
        [totalSize, setTotalSize] = useState(0),
        [processing, setProcessing] = useState(true),
        [reports, setReports] = useState([])

    const getReports = async () => {
        setProcessing(true)

        try {
            const {result: {data, total_count}} = await jungleScoutReportServices.getReports(requestParams)
            setReports(data)
            setTotalSize(total_count)

            data[0] && onSelect(data[0])
        } catch (e) {
            console.log(e)
        }

        setProcessing(false)
    }

    const changePaginationHandler = (params) => {
        setRequestParams(prevState => ({...prevState, ...params}))
    }

    useEffect(() => {
        getReports()
    }, [])

    return (<div className="reports-list">
        {reports.map(report => (
            <div className={`report-item ${selectedReport?.id === report.id ? 'active' : ''}`}>
                <div className="comment">
                    {report.comment}
                </div>

                <div className="date">
                    {moment(report.month, 'M').format('MM')}.{report.year}
                </div>
            </div>
        ))}
        <Pagination
            page={requestParams.page}
            pageSizeOptions={[10, 30, 50]}
            pageSize={requestParams.size}
            totalSize={totalSize}
            processing={processing}
            listLength={reports && reports.length}

            onChange={changePaginationHandler}
        />
        {processing && <RouteLoader/>}
    </div>)
}