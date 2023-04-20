import React from "react"
import {TreeMapChart} from "../components/TreeMapChart/TreeMapChart"
import {LineChart} from "../components/LineChart/LineChart"
import {StackedAreaPercentChart} from "../components/StackedAreaPercentChart/StackedAreaPercentChart"
import {Comment} from "../components/Comment/Comment"

export const JungleScoutStatistic = ({data}) => {

    return (
        <section className={'jungle-scout-statistic'}>
            <Comment/>

            <LineChart
                data={data.revenue_trend}
                activeMetrics={['product_units', 'Revenue']}
                showWeekChart={true}
                showDailyChart={false}
            />

            <Comment/>

            <StackedAreaPercentChart
                data={data.brand_sales}
            />

            <Comment/>

            <TreeMapChart/>
        </section>
    )
}