import React, {useEffect} from "react"
import MainMetrics from "../components/MainMetrics/MainMetrics"
import MainChart from "../components/MainChart/MainChart"
import ProductAds from "./ProductAds/ProductAds"
import _ from "lodash"
import {analyticsActions} from "../../../actions/analytics.actions"
import {useDispatch, useSelector} from "react-redux"
import queryString from 'query-string'
import ProductMetrics from "./ProductMetrics/ProductMetrics"
import {metricKeys} from "../components/MainMetrics/metricsList"

const ProductOverview = () => {
    const filters = useSelector(state => state.analytics.filters.overview || [])
    const dispatch = useDispatch()

    const availableMetrics = Object.values(metricKeys)


    useEffect(() => {
        const isParent = queryString.parse(window.location.search).isParent === 'false' ? 'regular' : 'parent'

        if (_.find(filters, {filterBy: 'productView'})) {
            dispatch(analyticsActions.updateFiltersList([...filters.map(filter => {
                if (filter.filterBy === 'productView') {
                    filter = {
                        filterBy: 'productView',
                        type: 'type',
                        value: isParent
                    }
                }
                return filter
            })]))
        } else {
            dispatch(analyticsActions.updateFiltersList([...filters, {
                filterBy: 'productView',
                type: 'type',
                value: isParent
            }]))
        }
    }, [])

    return (
        <div className={'product-overview-workplace'}>
            <MainMetrics allMetrics={availableMetrics}/>

            <MainChart allMetrics={availableMetrics}/>

            {/*<ProductSettings/>*/}

            <ProductMetrics/>
        </div>

    )
}

export default ProductOverview
