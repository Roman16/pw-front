import React, {useEffect} from "react"
import _ from "lodash"
import {analyticsActions} from "../../../actions/analytics.actions"
import {useDispatch, useSelector} from "react-redux"
import queryString from 'query-string'
import {columnList} from "./tableComponents/columnList"
import {metricKeys} from "../componentsV2/MainMetrics/metricsList"
import RenderPageParts from "../componentsV2/RenderPageParts/RenderPageParts"

const ProductOverview = () => {
    const filters = useSelector(state => state.analytics.filters.overview || [])
    const mainState = useSelector(state => state.analytics.mainState)
    const dispatch = useDispatch()

    const availableMetrics = Object.values(metricKeys)

    const location = 'overview'

    const productType = queryString.parse(window.location.search).isParent === 'false' ? 'regular' : 'parent'

    useEffect(() => {
        if (_.find(filters, {filterBy: 'productView'})) {
            dispatch(analyticsActions.updateFiltersList([...filters.map(filter => {
                if (filter.filterBy === 'productView') {
                    filter = {
                        filterBy: 'productView',
                        type: 'type',
                        value: productType
                    }
                }
                return filter
            })]))
        } else {
            dispatch(analyticsActions.updateFiltersList([...filters, {
                filterBy: 'productView',
                type: 'type',
                value: productType
            }]))
        }
    }, [mainState])

    return (
        <div className={'product-overview-workplace'}>
            <RenderPageParts
                location={location}
                availableMetrics={availableMetrics}
                availableParts={['metrics', 'chart', 'table']}
                fixedColumns={[0, 1]}
                showRowSelection={false}
                productType={productType}
                showFilters={false}

                columns={columnList(location, productType === 'parent')}
            />
        </div>

    )
}

export default ProductOverview
