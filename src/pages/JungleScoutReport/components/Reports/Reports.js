import React, {Fragment, useEffect, useState} from "react"
import './Reports.less'
import Pagination from "../../../../components/Pagination/Pagination"
import {jungleScoutReportServices} from "../../../../services/jungle.scout.report.services"
import RouteLoader from "../../../../components/RouteLoader/RouteLoader"
import moment from "moment"
import CustomSelect from "../../../../components/Select/Select"
import {Select} from "antd"
import {SVG} from "../../../../utils/icons"

const Option = Select.Option

export const Reports = ({selectedReport, onSelect}) => {
    const [requestParams, setRequestParams] = useState({
            page: 1,
            size: 10
        }),
        [totalSize, setTotalSize] = useState(0),
        [processing, setProcessing] = useState(true),
        [reports, setReports] = useState([]),
        [segments, setSegments] = useState([]),
        [selectedSegment, setSelectedSegment] = useState(null),
        [visibleList, setVisibleList] = useState(true)


    const getReports = async () => {
        setProcessing(true)

        try {
            const {result: {data, total_count}} = await jungleScoutReportServices.getReports(requestParams, selectedSegment)
            setReports(data)
            setTotalSize(total_count)

            if (data[0]) {
                onSelect(data[0])
            } else {
                onSelect({id: null})
            }
        } catch (e) {
            console.log(e)
        }

        setProcessing(false)
    }

    const getSegments = async () => {
        try {
            const {result} = await jungleScoutReportServices.getSegments()
            setSegments(result)
        } catch (e) {
            console.log(e)
        }
    }

    const changePaginationHandler = (params) => {
        setRequestParams(prevState => ({...prevState, ...params}))
    }

    useEffect(() => {
        getReports()
    }, [selectedSegment])

    useEffect(() => {
        getSegments()
    }, [])

    return (
        <>
            <div className={`reports-list ${visibleList ? 'visible' : 'hide'}`}>
                <div className="block-header">
                    <CustomSelect
                        onChange={setSelectedSegment}
                        getPopupContainer={trigger => trigger.parentNode}
                        value={selectedSegment}
                    >
                        <Option value={null}>All</Option>
                        {segments.map(segment => <Option value={segment.id}>{segment.name}</Option>)}
                    </CustomSelect>

                </div>


                {reports.map(report => (
                    <div className={`report-item ${selectedReport?.id === report.id ? 'active' : ''}`}>
                        <div className="comment">
                            Report for {moment(report.year_month, 'YYYY-MM').format('MM.YYYY')}
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
            </div>

            <div className={`switch-list ${visibleList ? 'opened' : 'closed'}`}>
                <button onClick={() => setVisibleList(prevState => !prevState)}>
                    <div className="image">
                        <SVG id='select-icon'/>
                    </div>
                </button>
            </div>
        </>)
}