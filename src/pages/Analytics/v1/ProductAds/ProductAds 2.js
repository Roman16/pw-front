import React from "react"
import MainChart from "../../components/MainChart/MainChart"
import ProductAdsList from "./ProductAdsList/ProductAdsList"
import MainMetrics from "../../components/MainMetrics/MainMetrics"
import {metricsKeysWithoutOrganic} from "../../componentsV2/MainMetrics/metricsList"

const ProductAds = () => {
    const availableMetrics = [...metricsKeysWithoutOrganic]
    const location = 'product-ads'

    return (
        <div className={'product-ads-workplace'}>
            <MainMetrics
                allMetrics={availableMetrics}
                location={location}
            />
            <MainChart
                location={location}
                allMetrics={availableMetrics}
            />

            <ProductAdsList
                location={location}
            />
        </div>
    )
}

export default ProductAds
