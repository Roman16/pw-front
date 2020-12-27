import React, {useEffect, useState, Fragment} from 'react'
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'
import moment from "moment"
import {daypartingServices} from "../../../../services/dayparting.services"
import {useSelector} from "react-redux"
import axios from "axios"
import {round} from "../../../../utils/round"
import {Spin} from "antd"
import {SVG} from "../../../../utils/icons"
import {numberMask} from "../../../../utils/numberMask"
import './PlacementsStatistics.less'
import SectionHeader from "./SectionHeader"
import Chart from "./Chart"
import {analytics} from "../../../../reducers/analytics.reducer"
import {analyticsServices} from "../../../../services/analytics.services"

const CancelToken = axios.CancelToken
let source = null

const PlacementsStatistics = () => {
    const [chartData, setChartData] = useState([]),
        [selectedMetric, setSelectedMetric] = useState('impressions'),
        [processing, setProcessing] = useState(false)

    const {selectedRangeDate, mainState,visibleChart} = useSelector(state => ({
        selectedRangeDate: state.analytics.selectedRangeDate,
        mainState: state.analytics.mainState,
        visibleChart: state.analytics.visibleChart,
    }))

    const changeMetricHandler = (value) => setSelectedMetric(value)

    const fetchData = async () => {
        setProcessing(true)

        source && source.cancel()
        source = CancelToken.source()

        try {
           const res = await analyticsServices.fetchPlacementStatistic(selectedMetric, selectedRangeDate, source.token)

        } catch (e) {
            console.log(e)
        }

        setProcessing(false)
    }

    useEffect(() => {
        fetchData()
    }, [selectedMetric, selectedRangeDate, mainState])


    return (
        <div className={`placements-area-statistics ${visibleChart ? 'visible' : 'hidden'}`}>
            <SectionHeader
                selectedMetric={selectedMetric}
                onChange={changeMetricHandler}
            />

            <Chart
                processing={processing}
            />
        </div>
    )
}

export default React.memo(PlacementsStatistics)
