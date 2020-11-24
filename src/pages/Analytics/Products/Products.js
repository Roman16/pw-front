import React from "react"
import MainChart from "../components/MainChart/MainChart"
import ProductList from './ProductsList/ProductsList'
import MainMetrics from "../components/MainMetrics/MainMetrics"
import {metricKeys} from "../components/MainMetrics/metricsList"

const Products = () => {
    const availableMetrics = Object.values(metricKeys)

    return (
        <div className={'products-workplace'}>
            <MainMetrics
                allMetrics={availableMetrics}
            />

            <MainChart allMetrics={availableMetrics}/>

            <ProductList/>
        </div>

    )
}

export default Products
