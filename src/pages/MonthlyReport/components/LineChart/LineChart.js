import React, {useEffect, useState} from 'react'
import {
    LineChart as Chart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ReferenceLine,
    ReferenceArea,
} from 'recharts'
import moment from "moment"
import _ from "lodash"
import {activeTimezone} from "../../../index"
import {analyticsAvailableMetricsList} from "../../../AnalyticsV3/components/MainMetrics/metricsList"
import ChartTooltip from "../../../AnalyticsV3/components/MainChart/ChartTooltip"

const animationDuration = 1000,
    animationEasing = 'linear',
    isAnimationActive = false

const chartColors = ['#FF5256', '#9464B9', '#FFAF52', '#7FD3A1']


const fakeData = [
    {
        "eventDate": "2021-11-10",
        "total_sales": 13400,
        "total_sales_7d": 13400,
        "total_orders_count": 70,
        "total_orders_count_7d": 70,
        "ctr": 0.0052238805970149255,
        "ctr_7d": 0.0052238805970149255,
        "cost": 82.74000036716461,
        "cost_7d": 82.74000036716461
    }, {
        "eventDate": "2021-11-11",
        "total_sales": 10721,
        "total_sales_7d": 12060.5,
        "total_orders_count": 45,
        "total_orders_count_7d": 57.5,
        "ctr": 0.004197369648353698,
        "ctr_7d": 0.004710625122684312,
        "cost": 51.04999974183738,
        "cost_7d": 66.895000054501
    }, {
        "eventDate": "2021-11-12",
        "total_sales": 11209,
        "total_sales_7d": 11776.666666666666,
        "total_orders_count": 48,
        "total_orders_count_7d": 54.333333333333336,
        "ctr": 0.004282273173342849,
        "ctr_7d": 0.004567841139570491,
        "cost": 47.9600003361702,
        "cost_7d": 60.58333348172406
    }, {
        "eventDate": "2021-11-13",
        "total_sales": 16584,
        "total_sales_7d": 12978.5,
        "total_orders_count": 58,
        "total_orders_count_7d": 55.25,
        "ctr": 0.003497346840328027,
        "ctr_7d": 0.004300217564759875,
        "cost": 61.50000077486038,
        "cost_7d": 60.81250030500814
    }, {
        "eventDate": "2021-11-14",
        "total_sales": 22255,
        "total_sales_7d": 14833.8,
        "total_orders_count": 240,
        "total_orders_count_7d": 92.2,
        "ctr": 0.010784093462143339,
        "ctr_7d": 0.0055969927442365685,
        "cost": 197.9800000190735,
        "cost_7d": 88.24600024782121
    }, {
        "eventDate": "2021-11-15",
        "total_sales": 10217,
        "total_sales_7d": 14064.333333333334,
        "total_orders_count": 45,
        "total_orders_count_7d": 84.33333333333333,
        "ctr": 0.0044044239992169915,
        "ctr_7d": 0.0053982312867333045,
        "cost": 38.35999952442944,
        "cost_7d": 79.93166679392259
    }, {
        "eventDate": "2021-11-16",
        "total_sales": 7473,
        "total_sales_7d": 13122.714285714286,
        "total_orders_count": 47,
        "total_orders_count_7d": 79,
        "ctr": 0.006289308176100629,
        "ctr_7d": 0.005525527985214351,
        "cost": 38.63999995961785,
        "cost_7d": 74.03285724616477
    }, {
        "eventDate": "2021-11-17",
        "total_sales": 7082,
        "total_sales_7d": 12220.142857142857,
        "total_orders_count": 29,
        "total_orders_count_7d": 73.14285714285714,
        "ctr": 0.004094888449590511,
        "ctr_7d": 0.005364243392725149,
        "cost": 23.549999818205833,
        "cost_7d": 65.5771428820278
    }, {
        "eventDate": "2021-11-18",
        "total_sales": 3344,
        "total_sales_7d": 11166.285714285714,
        "total_orders_count": 28,
        "total_orders_count_7d": 70.71428571428571,
        "ctr": 0.008373205741626795,
        "ctr_7d": 0.005960791406049877,
        "cost": 24.5899997651577,
        "cost_7d": 61.79714288535927
    }, {
        "eventDate": "2021-11-19",
        "total_sales": 3427,
        "total_sales_7d": 10054.57142857143,
        "total_orders_count": 26,
        "total_orders_count_7d": 67.57142857142857,
        "ctr": 0.00758681062153487,
        "ctr_7d": 0.0064328681843630236,
        "cost": 29.88999953866005,
        "cost_7d": 59.215714200000676
    }, {
        "eventDate": "2021-11-20",
        "total_sales": 4471,
        "total_sales_7d": 8324.142857142857,
        "total_orders_count": 40,
        "total_orders_count_7d": 65,
        "ctr": 0.008946544397226572,
        "ctr_7d": 0.007211324978205673,
        "cost": 31.08000037074089,
        "cost_7d": 54.86999985655503
    }, {
        "eventDate": "2021-11-21",
        "total_sales": 10496,
        "total_sales_7d": 6644.285714285715,
        "total_orders_count": 86,
        "total_orders_count_7d": 43,
        "ctr": 0.00819359756097561,
        "ctr_7d": 0.006841254135181711,
        "cost": 75.42000162601471,
        "cost_7d": 37.36142865754664
    }, {
        "eventDate": "2021-11-22",
        "total_sales": 6957,
        "total_sales_7d": 6178.571428571428,
        "total_orders_count": 60,
        "total_orders_count_7d": 45.142857142857146,
        "ctr": 0.008624407072013798,
        "ctr_7d": 0.007444108859866969,
        "cost": 48.3000006377697,
        "cost_7d": 38.781428816595245
    }, {
        "eventDate": "2021-11-23",
        "total_sales": 4882,
        "total_sales_7d": 5808.428571428572,
        "total_orders_count": 17,
        "total_orders_count_7d": 40.857142857142854,
        "ctr": 0.003482179434657927,
        "ctr_7d": 0.007043090468232298,
        "cost": 15.220000050961971,
        "cost_7d": 35.435714543930125
    }, {
        "eventDate": "2021-11-24",
        "total_sales": 6589,
        "total_sales_7d": 5738,
        "total_orders_count": 53,
        "total_orders_count_7d": 44.285714285714285,
        "ctr": 0.00804370921232357,
        "ctr_7d": 0.007607207720051306,
        "cost": 42.76000000350177,
        "cost_7d": 38.180000284686685
    }, {
        "eventDate": "2021-11-25",
        "total_sales": 23658,
        "total_sales_7d": 8640,
        "total_orders_count": 214,
        "total_orders_count_7d": 70.85714285714286,
        "ctr": 0.009045565981908869,
        "ctr_7d": 0.007703259182948745,
        "cost": 178.95999892055988,
        "cost_7d": 60.232857306887
    }, {
        "eventDate": "2021-11-26",
        "total_sales": 10472,
        "total_sales_7d": 9646.42857142857,
        "total_orders_count": 40,
        "total_orders_count_7d": 72.85714285714286,
        "ctr": 0.0038197097020626434,
        "ctr_7d": 0.007165101908738427,
        "cost": 35.28999984264374,
        "cost_7d": 61.00428592174181
    }, {
        "eventDate": "2021-11-27",
        "total_sales": 5140,
        "total_sales_7d": 9742,
        "total_orders_count": 28,
        "total_orders_count_7d": 71.14285714285714,
        "ctr": 0.005447470817120622,
        "ctr_7d": 0.006665234254437577,
        "cost": 35.3399999961257,
        "cost_7d": 61.61285729679678
    }, {
        "eventDate": "2021-11-28",
        "total_sales": 5965,
        "total_sales_7d": 9094.714285714286,
        "total_orders_count": 27,
        "total_orders_count_7d": 62.714285714285715,
        "ctr": 0.0045264040234702435,
        "ctr_7d": 0.0061413494633653825,
        "cost": 27.199999772012234,
        "cost_7d": 54.72428560336785
    }, {
        "eventDate": "2021-11-29",
        "total_sales": 8896,
        "total_sales_7d": 9371.714285714286,
        "total_orders_count": 36,
        "total_orders_count_7d": 59.285714285714285,
        "ctr": 0.0040467625899280575,
        "ctr_7d": 0.005487400251638848,
        "cost": 39.03999970108271,
        "cost_7d": 53.40142832669829
    }, {
        "eventDate": "2021-11-30",
        "total_sales": 13653,
        "total_sales_7d": 10624.714285714286,
        "total_orders_count": 39,
        "total_orders_count_7d": 62.42857142857143,
        "ctr": 0.002856515051637003,
        "ctr_7d": 0.005398019625493002,
        "cost": 36.650000013411045,
        "cost_7d": 56.46285689276244
    }, {
        "eventDate": "2021-12-01",
        "total_sales": 18800,
        "total_sales_7d": 12369.142857142857,
        "total_orders_count": 74,
        "total_orders_count_7d": 65.42857142857143,
        "ctr": 0.003936170212765958,
        "ctr_7d": 0.004811228339841913,
        "cost": 66.25000053457916,
        "cost_7d": 59.818571254344924
    }, {
        "eventDate": "2021-12-02",
        "total_sales": 22733,
        "total_sales_7d": 12237,
        "total_orders_count": 137,
        "total_orders_count_7d": 54.42857142857143,
        "ctr": 0.0060264813267056705,
        "ctr_7d": 0.004379930531955743,
        "cost": 123.37999842129648,
        "cost_7d": 51.87857118302158
    }, {
        "eventDate": "2021-12-03",
        "total_sales": 29869,
        "total_sales_7d": 15008,
        "total_orders_count": 171,
        "total_orders_count_7d": 73.14285714285714,
        "ctr": 0.005724999163011818,
        "ctr_7d": 0.004652114740662767,
        "cost": 140.64999914169312,
        "cost_7d": 66.92999965431434
    }, {
        "eventDate": "2021-12-04",
        "total_sales": 22271,
        "total_sales_7d": 17455.285714285714,
        "total_orders_count": 107,
        "total_orders_count_7d": 84.42857142857143,
        "ctr": 0.004804454222980557,
        "ctr_7d": 0.004560255227214187,
        "cost": 72.049999833107,
        "cost_7d": 72.17428534531167
    }, {
        "eventDate": "2021-12-05",
        "total_sales": 27646,
        "total_sales_7d": 20552.571428571428,
        "total_orders_count": 131,
        "total_orders_count_7d": 99.28571428571429,
        "ctr": 0.0047384793460175075,
        "ctr_7d": 0.004590551701863795,
        "cost": 89.10999943688512,
        "cost_7d": 81.01857101172209
    }, {
        "eventDate": "2021-12-06",
        "total_sales": 24430,
        "total_sales_7d": 22771.714285714286,
        "total_orders_count": 141,
        "total_orders_count_7d": 114.28571428571429,
        "ctr": 0.005771592304543594,
        "ctr_7d": 0.004836955946808872,
        "cost": 96.08000108972192,
        "cost_7d": 89.16714263867054
    }]

export const LineChart = ({
                              data,
                              activeMetrics = [],
                              showWeekChart,
                              showDailyChart,
                              showOptimizationChart,
                              selectedRangeDate,
                              productOptimizationDateList,
                          }) => {

    const [chartData, setChartData] = useState([])

    useEffect(() => {
        setChartData([...data.map(item => {
            let event = {
                eventDate: item.eventDate,
            }

            activeMetrics.forEach(metric => {
                if (metric) {
                    const metricType = _.find(analyticsAvailableMetricsList, {key: metric}).type

                    event[metric] = metricType === 'percent' ? +item[metric] * 100 : +item[metric]
                    event[`${metric}_7d`] = metricType === 'percent' ? +item[`${metric}_7d`] * 100 : +item[`${metric}_7d`]

                    if (`${moment().tz(activeTimezone).format('YYYY-MM-DD')}T00:00:00.000Z` === `${moment(item.eventDate).format('YYYY-MM-DD')}T00:00:00.000Z` || `${moment().tz(activeTimezone).subtract(1, "days").format('YYYY-MM-DD')}T00:00:00.000Z` === `${moment(item.eventDate).format('YYYY-MM-DD')}T00:00:00.000Z` || `${moment().tz(activeTimezone).subtract(2, "days").format('YYYY-MM-DD')}T00:00:00.000Z` === `${moment(item.eventDate).format('YYYY-MM-DD')}T00:00:00.000Z`) {
                        event[metric] = null
                        event[`dashed_${metric}`] = metricType === 'percent' ? +item[metric] * 100 : +item[metric]
                    } else if (`${moment().tz(activeTimezone).subtract(3, "days").format('YYYY-MM-DD')}T00:00:00.000Z` === `${moment(item.eventDate).format('YYYY-MM-DD')}T00:00:00.000Z`) {
                        event[`dashed_${metric}`] = metricType === 'percent' ? +item[metric] * 100 : +item[metric]
                    }
                }
            })

            return event
        })])
    }, [data])

    return (
        <div className='line-chart-container'>
            <ResponsiveContainer height='100%' width='100%'>
                <Chart
                    data={fakeData}
                    margin={activeMetrics.filter(item => item !== null).length === 0 ?
                        {top: 30, bottom: 20, left: 50, right: 50}
                        :
                        {top: 30, bottom: 20, left: 10, right: 10}
                    }
                >
                    {/*----------------------------------------------------------------*/}
                    {/*filters*/}

                    <filter id="dropshadow" height="130%">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="5"/>
                        <feOffset dx="2" dy="10" result="offsetblur"/>
                        <feComponentTransfer>
                            <feFuncA type="linear" slope="0.3"/>
                        </feComponentTransfer>
                        <feMerge>
                            <feMergeNode/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>

                        <feBlend in="SourceGraphic" in2="blurOut" mode="normal"/>

                    </filter>

                    <CartesianGrid
                        stroke="rgba(219, 220, 226, 0.3)"
                    />

                    <XAxis
                        dataKey="eventDate"
                        axisLine={false}
                        // interval={2}
                        // angle={50}
                        // dx={15}
                        dy={15}
                        // height={60}
                        // tick={<CustomizedAxisTick/>}
                        tickFormatter={(date) => moment(date).format('MMM DD')}
                    />

                    {activeMetrics && activeMetrics.map((item, index) => (
                        item !== null && <YAxis
                            yAxisId={`YAxis-${index}`}
                            orientation={!!((index) % 2) ? 'right' : 'left'}
                            stroke={chartColors[index]}
                            axisLine={false}
                            type="number"
                        />
                    ))}

                    {activeMetrics.filter(item => item !== null).length !== 0 && <Tooltip
                        isAnimationActive={false}
                        content={
                            <ChartTooltip
                                activeMetrics={activeMetrics.map(key => _.find(analyticsAvailableMetricsList, {key: key}))}
                                showWeekChart={showWeekChart}
                                showDailyChart={showDailyChart}
                                chartColors={chartColors}
                            />
                        }/>}


                    {/* Optimization line*/}
                    {showOptimizationChart && productOptimizationDateList.map(item => {
                        return (
                            <ReferenceLine
                                yAxisId={'YAxis-0'}
                                x={`${moment(item.started).format('YYYY-MM-DD')}T00:00:00.000Z`}
                                stroke={"#CDFFE2"}
                                label={null}
                                strokeWidth={4}
                                strokeDasharray="7"
                            />

                        )
                    })}

                    {showOptimizationChart && productOptimizationDateList.map(item => {
                        return (item.stopped !== null && <ReferenceLine
                                key={item.stooped}
                                yAxisId={'YAxis-0'}
                                x={`${moment(item.stopped).format('YYYY-MM-DD')}T00:00:00.000Z`}
                                stroke={"#C9CBD4"}
                                label={null}
                                strokeWidth={4}
                                strokeDasharray="7"
                            />
                        )
                    })}

                    {showOptimizationChart && productOptimizationDateList.map(item => {
                        return (
                            <ReferenceArea
                                className={'start-rect'}
                                yAxisId="YAxis-0"
                                x1={(moment(item.started) > moment(selectedRangeDate.startDate)) ? `${moment(item.started).format('YYYY-MM-DD')}T00:00:00.000Z` : `${moment(selectedRangeDate.startDate).format('YYYY-MM-DD')}T00:00:00.000Z`}
                                x2={item.stopped !== null && `${moment(item.stopped).format('YYYY-MM-DD')}T00:00:00.000Z`}
                                fillOpacity={1}
                            />
                        )
                    })}

                    {/*--------------------------------------------------------------*/}
                    {/*---------------------------general line-----------------------*/}
                    {/*--------------------------------------------------------------*/}

                    {/*---------------------------7-day line-----------------------*/}
                    {activeMetrics && activeMetrics.map((metric, index) => (
                        showWeekChart && <Line
                            yAxisId={`YAxis-${index}`}
                            type="monotone"
                            dataKey={`${metric}_7d`}
                            stroke={chartColors[index]}
                            strokeWidth={3}
                            dot={false}
                            filter={'url(#dropshadow)'}
                            animationEasing={animationEasing}
                            animationDuration={animationDuration}
                            isAnimationActive={isAnimationActive}
                        />
                    ))}

                    {/*---------------------------daily line-----------------------*/}
                    {activeMetrics && activeMetrics.map((metric, index) => (
                        showDailyChart && <Line
                            yAxisId={`YAxis-${index}`}
                            type="linear"
                            strokeOpacity={0.75}
                            dataKey={`${metric}`}
                            stroke={chartColors[index]}
                            strokeWidth={2}
                            activeDot={{r: 5}}
                            dot={{r: 2}}
                            animationEasing={animationEasing}
                            animationDuration={animationDuration}
                            isAnimationActive={isAnimationActive}
                        />
                    ))}
                    {/*--------------------------------------------------------------*/}
                </Chart>
            </ResponsiveContainer>
        </div>
    )
}
