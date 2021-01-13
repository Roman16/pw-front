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
        [fetchingStatus, setFetchingStatus] = useState(false)

    const metricsState = useSelector(state => state.analytics.metricsState && state.analytics.metricsState[location])
    const activeMetrics = (metricsState && metricsState.activeMetrics) ? metricsState.activeMetrics : availableMetrics.slice(0, 2)

    const getPageData = async () => {
        try {
            setFetchingStatus(true)

            const res = await analyticsServices.getSearchTermsData({
                activeMetrics
            })

            setPageData(prevState => ({
                ...prevState,
                ...res
            }))

            setFetchingStatus(false)
        } catch (e) {

        }
    }

    useEffect(() => {
        getPageData()
    }, [activeMetrics])

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
                fetching={fetchingStatus}
            />

            <SearchTermsList
                metricsData={pageData.metrics}
                tableData={pageData.table.response}
                location={location}
            />
        </div>
    )
}

export default SearchTerms
