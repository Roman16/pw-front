import React from "react"
import MainChart from "../components/MainChart/MainChart"
import ProductList from './ProductsList/ProductsList'
import Metrics from "./Metrics/Metrics"

const Products = () => {

    return (
        <div className={'products-workplace'}>
            <Metrics/>

            <MainChart/>

            <ProductList/>
        </div>

    )
}

export default Products
