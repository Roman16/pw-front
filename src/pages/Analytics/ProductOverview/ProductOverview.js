import React, {useEffect, useState} from "react"
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
    const [isParent, setParentStatus] = useState(queryString.parse(window.location.search).isParent === 'false' ? 'regular' : 'parent')
    const filters = useSelector(state => state.analytics.filters.overview || [])
    const dispatch = useDispatch()

    const availableMetrics = Object.values(metricKeys)

    const location = 'overview'


    useEffect(() => {
        const isParent = queryString.parse(window.location.search).isParent === 'false' ? 'regular' : 'parent'
        setParentStatus(isParent)

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
            <MainMetrics
                location={location}
                allMetrics={availableMetrics}
            />

            <MainChart
                location={location}
                allMetrics={availableMetrics}
            />

            {/*<ProductSettings/>*/}

            <ProductMetrics
                isParent={isParent === 'parent'}
                location={location}
            />
        </div>

    )
}

export default ProductOverview
