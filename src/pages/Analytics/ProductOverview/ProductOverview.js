import React from "react"
import MainMetrics from "../components/MainMetrics/MainMetrics"
import MainChart from "../components/MainChart/MainChart"
import ProductSettings from "./ProductSettings/ProductSettings"
import ProductAds from "./ProductAds/ProductAds"

const ProductOverview = () => {

    return(
        <div className={'product-overview-workplace'}>
            <MainMetrics/>

            <MainChart/>

            <ProductSettings/>

            <ProductAds/>
        </div>

    )
}

export default ProductOverview