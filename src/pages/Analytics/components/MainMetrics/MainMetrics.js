import React, {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {dashboardActions} from "../../../../actions/dashboard.actions"
import {metricsListArray} from "../../../../constans/metricsList"
import MetricItem from "../../../PPCAutomate/Dashboard/Metrics/MetricItem"
import AddMetric from "../../../PPCAutomate/Dashboard/Metrics/AddMetric/AddMetric"
import './MainMetrics.less'
import {SVG} from "../../../../utils/icons"
import AddMetricModal from "../../../PPCAutomate/Dashboard/Metrics/AddMetric/AddMetricModal"
import MetricModal from "./MetricModal"
import {analyticsActions} from "../../../../actions/analytics.actions"
import {analyticsServices} from "../../../../services/analytics.services"
import _ from 'lodash'

let activeMetricIndexTurn = [0, 1]

const MainMetrics = () => {
    const dispatch = useDispatch()

    const location = useSelector(state => state.analytics.location),
        metricsState = useSelector(state => state.analytics.metricsState && state.analytics.metricsState[location]),
        selectedRangeDate = useSelector(state => state.analytics.selectedRangeDate),
        selectFourMetrics = useSelector(state => state.analytics.chartState[location].selectFourMetrics)

    const allMetrics = metricsState.allMetrics,
        selectedMetrics = metricsState.selectedMetrics,
        activeMetrics = metricsState.activeMetrics


    const [visibleItems, updateVisibleList] = useState(selectedMetrics)
    const [hiddenItems, updateHiddenList] = useState(allMetrics.filter(metric => !selectedMetrics.find(i => i.key === metric.key)))
    const [visibleModal, switchModal] = useState(false)
    const [metricsData, setMetricsData] = useState([])

    const removeSelectedMetric = (metric) => updateMetricsState({
        selectedMetrics: selectedMetrics.filter(item => item.key !== metric.key),
        activeMetrics: activeMetrics.map(item => item.key !== metric.key && item)
    })

    const handleOk = () => {
        switchModal(false)
        updateMetricsState({selectedMetrics: visibleItems})
    }

    const activateMetric = (metric) => {
        let newActiveMetrics = [...activeMetrics]

        newActiveMetrics[activeMetricIndexTurn[0]] = metric

        updateMetricsState({
            activeMetrics: newActiveMetrics
        })

        activeMetricIndexTurn = [...activeMetricIndexTurn.slice(1), activeMetricIndexTurn[0]]
    }

    const deactivateMetric = (metric, index) => {
        activeMetricIndexTurn = [index, ...activeMetricIndexTurn]

        updateMetricsState({
            activeMetrics: activeMetrics.map(item => item.key === metric.key ? {} : item)
        })
    }

    const updateMetricsState = (data) => {
        dispatch(analyticsActions.updateMetricsState(data))
    }

    const getMetricsStatistics = async () => {
        try {
            const res = await analyticsServices.fetchMetricsData({
                startDate: selectedRangeDate.startDate,
                endDate: selectedRangeDate.endDate
            })

            setMetricsData(res)
        } catch (e) {
            console.log(e)
        }
    }

    const openModal = () => switchModal(true)
    const handleCancel = () => switchModal(false)

    const metricListFilter = (metric) => {
        return selectedMetrics.every((item) => {
            return item.key !== metric.key
        })
    }

    const addMetric = (item) => {
        updateVisibleList([...visibleItems, item])
        updateHiddenList([...hiddenItems.filter((hiddenMetric) => hiddenMetric.key !== item.key)])
    }

    const removeMetric = (item) => {
        updateVisibleList([...visibleItems.filter((visibleMetric) => visibleMetric.key !== item.key)])
        updateHiddenList([...hiddenItems, item])
    }

    useEffect(() => {
        updateVisibleList(selectedMetrics)
        updateHiddenList(allMetrics.filter(metricListFilter))
    }, [metricsState, metricsState, visibleModal])


    useEffect(() => {
        getMetricsStatistics()
    }, [selectedRangeDate])

    useEffect(() => {
        if (selectFourMetrics) {
            activeMetricIndexTurn = [2, 3, ...activeMetricIndexTurn]
        } else {
            activeMetricIndexTurn = [0, 1]
        }
    }, [selectFourMetrics])

    return (
        <div className="main-metrics metrics-block">
            {selectedMetrics.length > 0 && selectedMetrics.map(selected => {
                    if (metricsListArray.find(item => item.key === selected.key)) {
                        return (
                            <MetricItem
                                key={selected.key}
                                metric={{...selected, ...metricsData.find(i => i.metric_key === selected.key)}}
                                activeMetrics={activeMetrics}

                                removeSelectedMetric={removeSelectedMetric}
                                onActivateMetric={activateMetric}
                                onDeactivateMetric={deactivateMetric}
                            />
                        )
                    } else {
                        return ''
                    }
                }
            )}

            {selectedMetrics.length < 6 && <>
                <div className='add-metric'>
                    <button className="btn add-metric__button" onClick={openModal}>
                        <span className='blue'><SVG id='plus-blue'/></span>

                        Add Metric
                    </button>

                    <MetricModal
                        className={'added-metrics-window'}
                        visibleModal={visibleModal}
                        handleOk={handleOk}
                        handleCancel={handleCancel}
                        addMetric={addMetric}
                        removeMetric={removeMetric}
                        visibleItems={_.values(_.merge(_.keyBy(visibleItems, 'key'), _.keyBy(metricsData, 'metric_key'))).filter(item => item.title)}
                        hiddenItems={_.values(_.merge(_.keyBy(hiddenItems, 'key'), _.keyBy(metricsData, 'metric_key'))).filter(item => item.title)}
                    />
                </div>
            </>}
        </div>
    )
}

export default MainMetrics