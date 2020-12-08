import React, {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {analyticsAvailableMetricsList} from "./metricsList"
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

const MainMetrics = ({allMetrics}) => {
    const dispatch = useDispatch()

    let location = useSelector(state => state.analytics.location)
    location = location === 'campaignSettings' ? 'campaigns' : location
    location = location === 'portfolioSettings' ? 'portfolios' : location

    const metricsState = useSelector(state => state.analytics.metricsState && state.analytics.metricsState[location]),
        selectedRangeDate = useSelector(state => state.analytics.selectedRangeDate),
        selectFourMetrics = useSelector(state => state.analytics.chartState[location].selectFourMetrics),
        filters = useSelector(state => state.analytics.filters[location] || []),
        mainState = useSelector(state => state.analytics.mainState),
        metricsData = useSelector(state => state.analytics.metricsData)

    const selectedMetrics = metricsState.selectedMetrics || allMetrics.slice(0, 5),
        activeMetrics = metricsState.activeMetrics || allMetrics.slice(0, 2)

    const [visibleItems, updateVisibleList] = useState(selectedMetrics)
    const [hiddenItems, updateHiddenList] = useState([])
    const [visibleModal, switchModal] = useState(false)

    const removeSelectedMetric = (metric) => {
        if (activeMetrics.includes(metric)) {
            const index = activeMetrics.findIndex(item => item === metric)
            if (activeMetricIndexTurn[1] === index) activeMetricIndexTurn.splice(1, 1)

            activeMetricIndexTurn = [index, ...activeMetricIndexTurn]

            updateMetricsState({
                selectedMetrics: selectedMetrics.filter(item => item !== metric),
                activeMetrics: activeMetrics.map(item => item !== metric && item)
            })
        } else {
            updateMetricsState({
                selectedMetrics: selectedMetrics.filter(item => item !== metric),
            })
        }
    }

    const handleOk = () => {
        switchModal(false)

        if (_.intersectionWith(hiddenItems, activeMetrics, _.isEqual).length > 0) {
            activeMetrics.forEach((activeMetric, index) => {
                if (hiddenItems.includes(activeMetric)) {
                    if (activeMetricIndexTurn[1] === index) activeMetricIndexTurn.splice(1, 1)

                    activeMetricIndexTurn = [index, ...activeMetricIndexTurn]
                }
            })

            updateMetricsState({
                selectedMetrics: visibleItems,
                activeMetrics: activeMetrics.map(item => visibleItems.includes(item) ? item : null)
            })
        } else {
            updateMetricsState({selectedMetrics: visibleItems})
        }
    }

    const activateMetric = (metric) => {
        let newActiveMetrics = [...activeMetrics]

        newActiveMetrics[activeMetricIndexTurn[0]] = metric

        updateMetricsState({
            activeMetrics: newActiveMetrics
        })

        if (activeMetricIndexTurn[activeMetricIndexTurn.length - 1] === activeMetricIndexTurn[0]) {
            activeMetricIndexTurn.splice(activeMetricIndexTurn.length - 1, 1)
        }

        activeMetricIndexTurn = [...activeMetricIndexTurn, activeMetricIndexTurn[0]]
        activeMetricIndexTurn.shift()
    }

    const deactivateMetric = (metric, index) => {
        if (activeMetricIndexTurn[1] === index) activeMetricIndexTurn.splice(1, 1)

        activeMetricIndexTurn = [index, ...activeMetricIndexTurn]

        updateMetricsState({
            activeMetrics: activeMetrics.map(item => item === metric ? null : item)
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
                ...selectedRangeDate,
                locationKey: location,
                filters: filtersWithState
            }, source.token)

            dispatch(analyticsActions.setMetricsData(res.response))
        } catch (e) {
            console.log(e)
            dispatch(analyticsActions.setMetricsData({}))
        }
    }

    const openModal = () => switchModal(true)
    const handleCancel = () => switchModal(false)

    const addMetric = (item) => {
        updateVisibleList([...visibleItems, item])
        updateHiddenList([...hiddenItems.filter((hiddenMetric) => hiddenMetric !== item)])
    }

    const removeMetric = (item) => {
        updateVisibleList([...visibleItems.filter((visibleMetric) => visibleMetric !== item)])
        updateHiddenList([...hiddenItems, item])
    }

    useEffect(() => {
        updateVisibleList(selectedMetrics)
        updateHiddenList([...allMetrics.filter(metric => !selectedMetrics.includes(metric))])
    }, [metricsState, visibleModal])


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

    useEffect(() => {
        if (selectFourMetrics) {
            activeMetricIndexTurn = [0, 1, 2, 3]
        } else {
            activeMetricIndexTurn = [0, 1]
        }
    }, [])

    if (selectedMetrics) {
        if (typeof selectedMetrics[0] === 'object') {
            localStorage.removeItem('analyticsMetricsState')
        }
    }

    // console.log(activeMetricIndexTurn)

    return (
        <div className="main-metrics metrics-block">
            {selectedMetrics.length > 0 && selectedMetrics.map(selectedKey => {
                    if (_.find(analyticsAvailableMetricsList, {key: selectedKey})) {
                        return (
                            <MetricItem
                                key={selectedKey}
                                metric={{
                                    ..._.find(analyticsAvailableMetricsList, {key: selectedKey}),
                                    ...metricsData[selectedKey]
                                }}
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
                        metricsData={metricsData}

                        visibleItems={visibleItems}
                        hiddenItems={hiddenItems}
                    />
                </div>
            </>}
        </div>
    )
}

export default MainMetrics
