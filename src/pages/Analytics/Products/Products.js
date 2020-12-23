import React from "react"
import MainChart from "../components/MainChart/MainChart"
import ProductList from './ProductsList/ProductsList'
import MainMetrics from "../components/MainMetrics/MainMetrics"
import {metricKeys} from "../components/MainMetrics/metricsList"

const Products = ({location}) => {
    const availableMetrics = Object.values(metricKeys)

    return (
        <div className={'products-workplace'}>
            <MainMetrics
                location={location}
                allMetrics={availableMetrics}
            />

            <MainChart
                location={location}
                allMetrics={availableMetrics}
            />

            <ProductList
                location={location}
            />
        </div>

    )
}

export default Products
