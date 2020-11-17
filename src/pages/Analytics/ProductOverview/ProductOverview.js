import React, {useEffect} from "react"
import MainMetrics from "../components/MainMetrics/MainMetrics"
import MainChart from "../components/MainChart/MainChart"
import ProductAds from "./ProductAds/ProductAds"
import _ from "lodash"
import {analyticsActions} from "../../../actions/analytics.actions"
import {useDispatch, useSelector} from "react-redux"
import queryString from 'query-string'

const ProductOverview = () => {
    const filters = useSelector(state => state.analytics.filters.overview || [])
    const dispatch = useDispatch()

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
            <MainMetrics/>

            <MainChart/>

            {/*<ProductSettings/>*/}

            <ProductAds/>
        </div>

    )
}

export default ProductOverview
