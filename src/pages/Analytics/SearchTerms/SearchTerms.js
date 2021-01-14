import React, {useEffect, useState} from 'react'
import {metricsKeysWithoutOrganic} from "../components/MainMetrics/metricsList"
import SearchTermsList from "./SearchTermsList/SearchTermsList"
import MainMetrics from "../componentsV2/MainMetrics/MainMetrics"
import MainChart from "../componentsV2/MainChart/MainChart"
import {analyticsServices} from "../../../services/analytics.services"
import {useSelector} from "react-redux"

const SearchTerms = () => {
    const location = 'searchTerms',
        availableMetrics = [...metricsKeysWithoutOrganic]

    const [pageData, setPageData] = useState({
            metrics: {},
            chart: [],
            table: {
                response: []
            }
        }),
        [tableRequestParams, setTableRequestParams] = useState({
            page: 1,
            pageSize: 30,
        }),
        [chartFetchingStatus, setChartFetchingStatus] = useState(false),
        [tableFetchingStatus, setTableFetchingStatus] = useState(false)

    const metricsState = useSelector(state => state.analytics.metricsState && state.analytics.metricsState[location])
    const activeMetrics = (metricsState && metricsState.activeMetrics) ? metricsState.activeMetrics : availableMetrics.slice(0, 2)

    const getPageData = async () => {
        try {
            setChartFetchingStatus(true)
            setTableFetchingStatus(true)

            const res = await analyticsServices.getSearchTermsData({
                ...tableRequestParams,
                activeMetrics,
            })

            setPageData(prevState => ({
                ...prevState,
                ...res
            }))

            setChartFetchingStatus(false)
            setTableFetchingStatus(false)
        } catch (e) {

        }
    }

    useEffect(() => {
        getPageData()
    }, [activeMetrics, tableRequestParams])

    return (
        <div className="search-terms-page">
            <MainMetrics
                metricsData={pageData.metrics}
                location={location}
                allMetrics={availableMetrics}
            />

            <MainChart
                chartData={pageData.chart}
                allMetrics={availableMetrics}
                location={location}
                fetching={chartFetchingStatus}
            />

            <SearchTermsList
                metricsData={pageData.metrics}
                tableData={pageData.table}
                location={location}
                tableRequestParams={tableRequestParams}
                onChangePagination={(data) => setTableRequestParams(data)}
                fetching={tableFetchingStatus}
            />
        </div>
    )
}

export default SearchTerms
