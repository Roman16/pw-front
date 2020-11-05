import React, {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {dashboardActions} from "../../../../actions/dashboard.actions"
import {analyticsMetricsListArray} from "./metricsList"
import MetricItem from "./MetricItem"
import AddMetric from "../../../PPCAutomate/Dashboard/Metrics/AddMetric/AddMetric"
import './MainMetrics.less'
import {SVG} from "../../../../utils/icons"
import AddMetricModal from "../../../PPCAutomate/Dashboard/Metrics/AddMetric/AddMetricModal"
import MetricModal from "./MetricModal"
import {analyticsActions} from "../../../../actions/analytics.actions"
import {analyticsServices} from "../../../../services/analytics.services"
import _ from 'lodash'
import axios from "axios"

let activeMetricIndexTurn = [0, 1]

const CancelToken = axios.CancelToken
let source = null

const MainMetrics = () => {
    const dispatch = useDispatch()

    const location = useSelector(state => state.analytics.location),
        metricsState = useSelector(state => state.analytics.metricsState && state.analytics.metricsState[location]),
        selectedRangeDate = useSelector(state => state.analytics.selectedRangeDate),
        selectFourMetrics = useSelector(state => state.analytics.chartState[location].selectFourMetrics),
        filters = useSelector(state => state.analytics.filters[location] || []),
        mainState = useSelector(state => state.analytics.mainState)


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
        source && source.cancel()
        source = CancelToken.source()

        try {
            const filtersWithState = [
                ...filters,
                ...Object.keys(mainState).map(key => ({
                    filterBy: key,
                    type: 'eq',
                    value: mainState[key]
                })).filter(item => !!item.value),
                {
                    filterBy: 'datetime',
                    type: 'range',
                    value: selectedRangeDate
                },
            ]

            const res = await analyticsServices.fetchMetricsData({
                startDate: selectedRangeDate.startDate,
                endDate: selectedRangeDate.endDate,
                locationKey: location,
                filters: filtersWithState
            }, source.token)

            setMetricsData(Object.keys(res.response).map(item => ({
                metric_key: item,
                metric_diff: res.response[item].value_diff,
                metric_value: res.response[item].value,
                metric_prev_value: res.response[item].value_prev
            })))

            updateMetricsState({
                allMetrics: allMetrics.map(metric => ({
                    ...metric,
                    metric_key: metric.key,
                    metric_diff: res.response[metric.key].value_diff,
                    metric_value: res.response[metric.key].value,
                    metric_prev_value: res.response[metric.key].value_prev
                }))
            })
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
    }, [selectedRangeDate, filters, mainState])

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
                    if (analyticsMetricsListArray.find(item => item.key === selected.key)) {
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
