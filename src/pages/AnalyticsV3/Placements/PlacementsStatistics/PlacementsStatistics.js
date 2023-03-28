import React from 'react'
import {useSelector} from "react-redux"
import SectionHeader from "./SectionHeader"
import Chart from "./Chart"

import './PlacementsStatistics.less'
import CartLegend from "./ChartLegend"

const PlacementsStatistics = ({chartData, selectedMetric, processing, onSelectMetric}) => {
    const { visibleChart} = useSelector(state => ({
        visibleChart: state.analytics.visibleChart,
    }))

    const changeMetricHandler = (value) => {
        localStorage.setItem('placementActiveMetric', value)

        onSelectMetric(value)
    }

    return (
        <div className={`placements-area-statistics ${visibleChart ? 'visible' : 'hidden'}`}>
            <div className="col">
                <SectionHeader
                    selectedMetric={selectedMetric}
                    onChange={changeMetricHandler}
                />
                <Chart
                    data={chartData}
                    processing={processing}
                    selectedMetric={selectedMetric}
                />
            </div>

            <CartLegend/>
        </div>
    )
}

export default React.memo(PlacementsStatistics)
