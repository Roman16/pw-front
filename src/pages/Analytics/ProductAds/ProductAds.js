import React from "react"
import MainChart from "../components/MainChart/MainChart"
import ProductAdsList from "./ProductAdsList/ProductAdsList"
import MainMetrics from "../components/MainMetrics/MainMetrics"
import {metricsKeysWithoutOrganic} from "../components/MainMetrics/metricsList"
import CreateProductAdsWindow from "./CreateProductAdsWindow/CreateProductAdsWindow"

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

            <CreateProductAdsWindow/>
        </div>
    )
}

export default ProductAds
