import React from "react"
import MainChart from "../components/MainChart/MainChart"
import ProductAdsList from "./ProductAdsList/ProductAdsList"
import Metrics from "./Metrics/Metrics"

const ProductAds = () => {

    return (
        <div className={'product-ads-workplace'}>
            <Metrics/>

            <MainChart/>

            <ProductAdsList/>
        </div>
    )
}

export default ProductAds
