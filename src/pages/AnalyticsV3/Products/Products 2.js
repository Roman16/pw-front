import React from "react"
import {analyticsAvailableMetricsList} from "../components/MainMetrics/metricsList"
import RenderPageParts from "../components/RenderPageParts/RenderPageParts"
import {columnList} from "./tableComponents/columnList"

const Products = ({location}) => {
    const availableMetrics = analyticsAvailableMetricsList.map(i => i.key)

    return (
        <div className={'products-workplace'}>
            <RenderPageParts
                location={location}
                availableMetrics={availableMetrics}
                availableParts={['metrics', 'chart', 'table']}
                fixedColumns={[0, 1]}
                showRowSelection={false}

                columns={columnList(location)}
            />

        </div>
    )
}

export default Products
