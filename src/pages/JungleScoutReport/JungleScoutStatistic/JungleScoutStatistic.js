import React from "react"
import {TreeMapChart} from "../components/TreeMapChart/TreeMapChart"
import {LineChart} from "../components/LineChart/LineChart"
import {StackedAreaPercentChart} from "../components/StackedAreaPercentChart/StackedAreaPercentChart"
import {Comment} from "../components/Comment/Comment"

export const JungleScoutStatistic = ({
                                         data: {revenue_trend, brand_sales, products_revenue},
                                         comments: {revenue_trend_comment, brand_sales_comment, products_revenue_comment}
                                     }) => {

    return (
        <section className={'jungle-scout-statistic'}>
            <Comment text={revenue_trend_comment}/>

            <LineChart
                data={revenue_trend.map(i => ({
                    ...i,
                    'monthly_unit_sales_7d': i.monthly_unit_sales,
                    'total_revenue_7d': i.total_revenue,
                }))}
                activeMetrics={['monthly_unit_sales', 'total_revenue']}
                dataKey={'year_month'}
                showWeekChart={true}
                showDailyChart={false}
            />

            <Comment text={brand_sales_comment}/>

            <StackedAreaPercentChart
                data={brand_sales}
            />

            <Comment text={products_revenue_comment}/>

            <TreeMapChart
                data={products_revenue}
            />
        </section>
    )
}