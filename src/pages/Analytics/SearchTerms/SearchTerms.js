import React from 'react'
import {metricsKeysWithoutOrganic} from "../components/MainMetrics/metricsList"
import SearchTermsList from "./SearchTermsList/SearchTermsList"
import MainMetrics from "../componentsV2/MainMetrics/MainMetrics"
import MainChart from "../componentsV2/MainChart/MainChart"

const SearchTerms = () => {
    const location = 'searchTerms'
    const availableMetrics = [...metricsKeysWithoutOrganic]

    return (
        <div className="search-terms-page">
            <MainMetrics
                location={location}
                allMetrics={availableMetrics}
            />

            <MainChart
                allMetrics={availableMetrics}
                location={location}
            />

            <SearchTermsList
                location={location}
            />
        </div>
    )
}

export default SearchTerms
