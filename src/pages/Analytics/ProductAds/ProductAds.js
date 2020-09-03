import React from "react"
import MainMetrics from "../components/MainMetrics/MainMetrics"
import MainChart from "../components/MainChart/MainChart"
import ProductAdsList from "./ProductAdsList/ProductAdsList"

const ProductAds = () => {

    return (
        <div className={'product-ads-workplace'}>
            <MainMetrics/>

            <MainChart/>

            <ProductAdsList/>
        </div>
    )
}

export default ProductAds