import React from "react"
import MainMetrics from "../components/MainMetrics/MainMetrics"
import MainChart from "../components/MainChart/MainChart"
import ProductList from './ProductsList/ProductsList'


const Products = () => {

    return (
        <div className={'products-workplace'}>
            <MainMetrics/>

            <MainChart/>

            <ProductList/>
        </div>

    )
}

export default Products