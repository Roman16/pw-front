import React, {useEffect, useState, Fragment} from 'react'
import {useSelector} from "react-redux"
import axios from "axios"
import './PlacementsStatistics.less'
import SectionHeader from "./SectionHeader"
import Chart from "./Chart"
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
           const res = await analyticsServices.fetchPlacementStatistic(selectedMetric, selectedRangeDate,mainState, source.token)
            setChartData(res.response)
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
                data={chartData}
                processing={processing}
                selectedMetric={selectedMetric}
            />
        </div>
    )
}

export default React.memo(PlacementsStatistics)
