import React from "react"
import MainChart from "../components/MainChart/MainChart"
import ProductAdsList from "./ProductAdsList/ProductAdsList"
import MainMetrics from "../components/MainMetrics/MainMetrics"
import {metricsKeysWithoutOrganic} from "../components/MainMetrics/metricsList"

const ProductAds = () => {
    const availableMetrics = [...metricsKeysWithoutOrganic]

    return (
        <div className={'product-ads-workplace'}>
            <MainMetrics
                allMetrics={availableMetrics}
            />
            <MainChart  allMetrics={availableMetrics}/>

            <ProductAdsList/>
        </div>
    )
}

export default ProductAds
