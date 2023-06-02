import React from "react"
import {TreeMapChart} from "../components/TreeMapChart/TreeMapChart"
import {LineChart} from "../components/LineChart/LineChart"
import {StackedAreaPercentChart} from "../components/StackedAreaPercentChart/StackedAreaPercentChart"
import {Comment} from "../components/Comment/Comment"
import {SectionName} from "../components/SectionName/SectionName"

export const JungleScoutStatistic = ({
                                         data: {revenue_trend, brand_sales, products_revenue},
                                         comments: {revenue_trend_comment, brand_sales_comment, products_revenue_comment}
                                     }) => {

    return (
        <section className={'jungle-scout-statistic'}>
            <SectionName
                name={'Segment Trends'}
                description={'Monitor the overall trend in your segment, how it evolves over time. (You can see what trends are present in the niche and whether the product has any seasonality.)'}
            />

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

            <SectionName
                name={'Brands Market Share'}
                description={' Keep an eye for the market share of the competitors by monitoring the top brands within your segment.(Find out how effectively your brand is able to take away a share of sales from competitors.)'}
            />

            <Comment text={brand_sales_comment}/>

            <StackedAreaPercentChart
                data={brand_sales}
            />

            <SectionName
                name={'Segment Product'}
                description={'The top (number) products by revenue in your segment. (Find out which products of your direct competitors have the highest demand among consumers.)'}
            />

            <Comment text={products_revenue_comment}/>

            <TreeMapChart
                data={products_revenue}
            />
        </section>
    )
}