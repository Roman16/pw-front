import React from "react"
import {TreeMapChart} from "../components/TreeMapChart/TreeMapChart"
import {LineChart} from "../components/LineChart/LineChart"
import {StackedAreaPercentChart} from "../components/StackedAreaPercentChart/StackedAreaPercentChart"

export const JungleScoutStatistic = ({data}) => {

    return (
        <section className={'jungle-scout-statistic'}>
            <LineChart
                data={data.revenue_trend}
                activeMetrics={['product_units', 'Revenue']}
                showWeekChart={true}
                showDailyChart={false}
            />

            <StackedAreaPercentChart
                data={data.brand_sales}
            />

            <TreeMapChart/>
        </section>
    )
}