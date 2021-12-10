import React, {useEffect, useState} from "react"
import '../../components/MainChart/MainChart.less'
import '../../../PPCAutomate/Dashboard/MainChart/MainChart.less'
import ChartHeader from "../../components/MainChart/ChartHeader"
import Chart from "../../components/MainChart/Chart"
import {useSelector} from "react-redux"
import {Spin} from "antd"

const fakeData = [{
        "eventDate": "2021-11-10",
        "impressions": 13400,
        "impressions_7d": 13400,
        "clicks": 70,
        "clicks_7d": 70,
        "ctr": 0.0052238805970149255,
        "ctr_7d": 0.0052238805970149255,
        "cost": 82.74000036716461,
        "cost_7d": 82.74000036716461
    }, {
        "eventDate": "2021-11-11",
        "impressions": 10721,
        "impressions_7d": 12060.5,
        "clicks": 45,
        "clicks_7d": 57.5,
        "ctr": 0.004197369648353698,
        "ctr_7d": 0.004710625122684312,
        "cost": 51.04999974183738,
        "cost_7d": 66.895000054501
    }, {
        "eventDate": "2021-11-12",
        "impressions": 11209,
        "impressions_7d": 11776.666666666666,
        "clicks": 48,
        "clicks_7d": 54.333333333333336,
        "ctr": 0.004282273173342849,
        "ctr_7d": 0.004567841139570491,
        "cost": 47.9600003361702,
        "cost_7d": 60.58333348172406
    }, {
        "eventDate": "2021-11-13",
        "impressions": 16584,
        "impressions_7d": 12978.5,
        "clicks": 58,
        "clicks_7d": 55.25,
        "ctr": 0.003497346840328027,
        "ctr_7d": 0.004300217564759875,
        "cost": 61.50000077486038,
        "cost_7d": 60.81250030500814
    }, {
        "eventDate": "2021-11-14",
        "impressions": 22255,
        "impressions_7d": 14833.8,
        "clicks": 240,
        "clicks_7d": 92.2,
        "ctr": 0.010784093462143339,
        "ctr_7d": 0.0055969927442365685,
        "cost": 197.9800000190735,
        "cost_7d": 88.24600024782121
    }, {
        "eventDate": "2021-11-15",
        "impressions": 10217,
        "impressions_7d": 14064.333333333334,
        "clicks": 45,
        "clicks_7d": 84.33333333333333,
        "ctr": 0.0044044239992169915,
        "ctr_7d": 0.0053982312867333045,
        "cost": 38.35999952442944,
        "cost_7d": 79.93166679392259
    }, {
        "eventDate": "2021-11-16",
        "impressions": 7473,
        "impressions_7d": 13122.714285714286,
        "clicks": 47,
        "clicks_7d": 79,
        "ctr": 0.006289308176100629,
        "ctr_7d": 0.005525527985214351,
        "cost": 38.63999995961785,
        "cost_7d": 74.03285724616477
    }, {
        "eventDate": "2021-11-17",
        "impressions": 7082,
        "impressions_7d": 12220.142857142857,
        "clicks": 29,
        "clicks_7d": 73.14285714285714,
        "ctr": 0.004094888449590511,
        "ctr_7d": 0.005364243392725149,
        "cost": 23.549999818205833,
        "cost_7d": 65.5771428820278
    }, {
        "eventDate": "2021-11-18",
        "impressions": 3344,
        "impressions_7d": 11166.285714285714,
        "clicks": 28,
        "clicks_7d": 70.71428571428571,
        "ctr": 0.008373205741626795,
        "ctr_7d": 0.005960791406049877,
        "cost": 24.5899997651577,
        "cost_7d": 61.79714288535927
    }, {
        "eventDate": "2021-11-19",
        "impressions": 3427,
        "impressions_7d": 10054.57142857143,
        "clicks": 26,
        "clicks_7d": 67.57142857142857,
        "ctr": 0.00758681062153487,
        "ctr_7d": 0.0064328681843630236,
        "cost": 29.88999953866005,
        "cost_7d": 59.215714200000676
    }, {
        "eventDate": "2021-11-20",
        "impressions": 4471,
        "impressions_7d": 8324.142857142857,
        "clicks": 40,
        "clicks_7d": 65,
        "ctr": 0.008946544397226572,
        "ctr_7d": 0.007211324978205673,
        "cost": 31.08000037074089,
        "cost_7d": 54.86999985655503
    }, {
        "eventDate": "2021-11-21",
        "impressions": 10496,
        "impressions_7d": 6644.285714285715,
        "clicks": 86,
        "clicks_7d": 43,
        "ctr": 0.00819359756097561,
        "ctr_7d": 0.006841254135181711,
        "cost": 75.42000162601471,
        "cost_7d": 37.36142865754664
    }, {
        "eventDate": "2021-11-22",
        "impressions": 6957,
        "impressions_7d": 6178.571428571428,
        "clicks": 60,
        "clicks_7d": 45.142857142857146,
        "ctr": 0.008624407072013798,
        "ctr_7d": 0.007444108859866969,
        "cost": 48.3000006377697,
        "cost_7d": 38.781428816595245
    }, {
        "eventDate": "2021-11-23",
        "impressions": 4882,
        "impressions_7d": 5808.428571428572,
        "clicks": 17,
        "clicks_7d": 40.857142857142854,
        "ctr": 0.003482179434657927,
        "ctr_7d": 0.007043090468232298,
        "cost": 15.220000050961971,
        "cost_7d": 35.435714543930125
    }, {
        "eventDate": "2021-11-24",
        "impressions": 6589,
        "impressions_7d": 5738,
        "clicks": 53,
        "clicks_7d": 44.285714285714285,
        "ctr": 0.00804370921232357,
        "ctr_7d": 0.007607207720051306,
        "cost": 42.76000000350177,
        "cost_7d": 38.180000284686685
    }, {
        "eventDate": "2021-11-25",
        "impressions": 23658,
        "impressions_7d": 8640,
        "clicks": 214,
        "clicks_7d": 70.85714285714286,
        "ctr": 0.009045565981908869,
        "ctr_7d": 0.007703259182948745,
        "cost": 178.95999892055988,
        "cost_7d": 60.232857306887
    }, {
        "eventDate": "2021-11-26",
        "impressions": 10472,
        "impressions_7d": 9646.42857142857,
        "clicks": 40,
        "clicks_7d": 72.85714285714286,
        "ctr": 0.0038197097020626434,
        "ctr_7d": 0.007165101908738427,
        "cost": 35.28999984264374,
        "cost_7d": 61.00428592174181
    }, {
        "eventDate": "2021-11-27",
        "impressions": 5140,
        "impressions_7d": 9742,
        "clicks": 28,
        "clicks_7d": 71.14285714285714,
        "ctr": 0.005447470817120622,
        "ctr_7d": 0.006665234254437577,
        "cost": 35.3399999961257,
        "cost_7d": 61.61285729679678
    }, {
        "eventDate": "2021-11-28",
        "impressions": 5965,
        "impressions_7d": 9094.714285714286,
        "clicks": 27,
        "clicks_7d": 62.714285714285715,
        "ctr": 0.0045264040234702435,
        "ctr_7d": 0.0061413494633653825,
        "cost": 27.199999772012234,
        "cost_7d": 54.72428560336785
    }, {
        "eventDate": "2021-11-29",
        "impressions": 8896,
        "impressions_7d": 9371.714285714286,
        "clicks": 36,
        "clicks_7d": 59.285714285714285,
        "ctr": 0.0040467625899280575,
        "ctr_7d": 0.005487400251638848,
        "cost": 39.03999970108271,
        "cost_7d": 53.40142832669829
    }, {
        "eventDate": "2021-11-30",
        "impressions": 13653,
        "impressions_7d": 10624.714285714286,
        "clicks": 39,
        "clicks_7d": 62.42857142857143,
        "ctr": 0.002856515051637003,
        "ctr_7d": 0.005398019625493002,
        "cost": 36.650000013411045,
        "cost_7d": 56.46285689276244
    }, {
        "eventDate": "2021-12-01",
        "impressions": 18800,
        "impressions_7d": 12369.142857142857,
        "clicks": 74,
        "clicks_7d": 65.42857142857143,
        "ctr": 0.003936170212765958,
        "ctr_7d": 0.004811228339841913,
        "cost": 66.25000053457916,
        "cost_7d": 59.818571254344924
    }, {
        "eventDate": "2021-12-02",
        "impressions": 22733,
        "impressions_7d": 12237,
        "clicks": 137,
        "clicks_7d": 54.42857142857143,
        "ctr": 0.0060264813267056705,
        "ctr_7d": 0.004379930531955743,
        "cost": 123.37999842129648,
        "cost_7d": 51.87857118302158
    }, {
        "eventDate": "2021-12-03",
        "impressions": 29869,
        "impressions_7d": 15008,
        "clicks": 171,
        "clicks_7d": 73.14285714285714,
        "ctr": 0.005724999163011818,
        "ctr_7d": 0.004652114740662767,
        "cost": 140.64999914169312,
        "cost_7d": 66.92999965431434
    }, {
        "eventDate": "2021-12-04",
        "impressions": 22271,
        "impressions_7d": 17455.285714285714,
        "clicks": 107,
        "clicks_7d": 84.42857142857143,
        "ctr": 0.004804454222980557,
        "ctr_7d": 0.004560255227214187,
        "cost": 72.049999833107,
        "cost_7d": 72.17428534531167
    }, {
        "eventDate": "2021-12-05",
        "impressions": 27646,
        "impressions_7d": 20552.571428571428,
        "clicks": 131,
        "clicks_7d": 99.28571428571429,
        "ctr": 0.0047384793460175075,
        "ctr_7d": 0.004590551701863795,
        "cost": 89.10999943688512,
        "cost_7d": 81.01857101172209
    }, {
        "eventDate": "2021-12-06",
        "impressions": 24430,
        "impressions_7d": 22771.714285714286,
        "clicks": 141,
        "clicks_7d": 114.28571428571429,
        "ctr": 0.005771592304543594,
        "ctr_7d": 0.004836955946808872,
        "cost": 96.08000108972192,
        "cost_7d": 89.16714263867054
    }, {
        "eventDate": "2021-12-07",
        "impressions": 28166,
        "impressions_7d": 24845,
        "clicks": 205,
        "clicks_7d": 138,
        "ctr": 0.007278278775829014,
        "ctr_7d": 0.005468636478836303,
        "cost": 141.3299998342991,
        "cost_7d": 104.12142832736883
    }, {
        "eventDate": "2021-12-08",
        "impressions": 153674,
        "impressions_7d": 44112.71428571428,
        "clicks": 316,
        "clicks_7d": 172.57142857142858,
        "ctr": 0.0020563010008199174,
        "ctr_7d": 0.005200083734272582,
        "cost": 204.53999915532768,
        "cost_7d": 123.87714241604719
    }, {
        "eventDate": "2021-12-09",
        "impressions": 33306,
        "impressions_7d": 45623.142857142855,
        "clicks": 277,
        "clicks_7d": 192.57142857142858,
        "ctr": 0.008316819792229629,
        "ctr_7d": 0.005527274943633148,
        "cost": 194.74000099301338,
        "cost_7d": 134.07142849772103
    }, {
        "eventDate": "2021-12-10",
        "impressions": 89,
        "impressions_7d": 41368.857142857145,
        "clicks": 0,
        "clicks_7d": 168.14285714285714,
        "ctr": 0,
        "ctr_7d": 0.004709417920345745,
        "cost": 0,
        "cost_7d": 113.97857147747916
    }]


const MainChart = ({activeMetrics, selectedRangeDate, location, chartData, fetching}) => {
    const [productOptimizationDateList, setProductOptimizationDateList] = useState([])

    const {chartState, visibleChart} = useSelector(state => ({
        chartState: state.analytics.chartState[location],
        visibleChart: state.analytics.visibleChart,
    }))

    return <section className={`main-chart ${visibleChart ? 'visible' : 'hidden'}`}>
        <Chart
            showWeekChart={chartState.showWeekChart}
            showDailyChart={chartState.showDailyChart}
            showOptimizationChart={false}
            activeMetrics={activeMetrics}
            data={fakeData}
            selectedRangeDate={selectedRangeDate}
            productOptimizationDateList={productOptimizationDateList}
        />

        <ChartHeader
            chartState={chartState}
            activeMetrics={activeMetrics}
        />

        {fetching && <div className="loading">
            <Spin size="large"/>
        </div>}
    </section>
}

export default MainChart
