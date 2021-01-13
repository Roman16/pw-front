import React, {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {analyticsAvailableMetricsList} from "../../components/MainMetrics/metricsList"
import MetricItem from "../../components/MainMetrics/MetricItem"
import AddMetric from "../../../PPCAutomate/Dashboard/Metrics/AddMetric/AddMetric"
import '../../components/MainMetrics/MainMetrics.less'
import {SVG} from "../../../../utils/icons"
import AddMetricModal from "../../../PPCAutomate/Dashboard/Metrics/AddMetric/AddMetricModal"
import MetricModal from "../../components/MainMetrics/MetricModal"
import {analyticsActions} from "../../../../actions/analytics.actions"
import {analyticsServices} from "../../../../services/analytics.services"
import _ from 'lodash'
import axios from "axios"

let activeMetricIndexTurn = [0, 1]

const availableMetricsCount = 12

const CancelToken = axios.CancelToken
let source = null
let prevActivatedIndex = undefined

const MainMetrics = ({allMetrics, location, metricsData = {}}) => {
    const dispatch = useDispatch()

    const metricsState = useSelector(state => state.analytics.metricsState && state.analytics.metricsState[location]),
        selectedRangeDate = useSelector(state => state.analytics.selectedRangeDate),
        selectFourMetrics = useSelector(state => state.analytics.chartState[location].selectFourMetrics || false),
        filters = useSelector(state => state.analytics.filters[location] || []),
        mainState = useSelector(state => state.analytics.mainState)

    const selectedMetrics = metricsState.selectedMetrics || allMetrics.slice(0, 5),
        activeMetrics = metricsState.activeMetrics || allMetrics.slice(0, 2)

    const [visibleItems, updateVisibleList] = useState(selectedMetrics)
    const [hiddenItems, updateHiddenList] = useState([])
    const [visibleModal, switchModal] = useState(false)

    const removeSelectedMetric = (metric) => {
        if (activeMetrics.includes(metric)) {
            activeMetricIndexTurn = selectFourMetrics ? [0, 1, 2, 3] : [0, 1]

            updateMetricsState({
                selectedMetrics: selectedMetrics.filter(item => item !== metric),
                activeMetrics: activeMetrics.map(item => item !== metric ? item : null)
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
            activeMetricIndexTurn = selectFourMetrics ? [0, 1, 2, 3] : [0, 1]

            updateMetricsState({
                selectedMetrics: visibleItems,
                activeMetrics: activeMetrics.map(item => visibleItems.includes(item) ? item : null)
            })

            activeMetricIndexTurn = selectFourMetrics ? [0, 1, 2, 3] : [0, 1]
        } else {
            updateMetricsState({selectedMetrics: visibleItems})
        }
    }

    const updateMetricsState = (data) => {
        dispatch(analyticsActions.updateMetricsState(data))
    }

    // const getMetricsStatistics = async () => {
    //     source && source.cancel()
    //     source = CancelToken.source()
    //
    //     try {
    //         const filtersWithState = [
    //             ...filters,
    //             ...Object.keys(mainState).map(key => ({
    //                 filterBy: key,
    //                 type: 'eq',
    //                 value: mainState[key]
    //             })).filter(item => !!item.value),
    //             {
    //                 filterBy: 'datetime',
    //                 type: 'range',
    //                 value: selectedRangeDate
    //             },
    //         ]
    //
    //         const res = await analyticsServices.fetchMetricsDataV2({
    //             ...selectedRangeDate,
    //             locationKey: location,
    //             filters: filtersWithState
    //         }, source.token)
    //
    //         dispatch(analyticsActions.setMetricsData(res.response))
    //     } catch (e) {
    //         console.log(e)
    //         dispatch(analyticsActions.setMetricsData({}))
    //     }
    // }

    const openModal = () => switchModal(true)
    const handleCancel = () => switchModal(false)

    const activateMetric = (metric) => {
        let newActiveMetrics = [...activeMetrics]

        const emptyIndex = newActiveMetrics.findIndex(item => item == null) === -1 ? false : newActiveMetrics.findIndex(item => item == null)

        if (emptyIndex !== false) {
            newActiveMetrics[emptyIndex] = metric
            prevActivatedIndex = emptyIndex
        } else {
            if (prevActivatedIndex === 0) {
                prevActivatedIndex = undefined

                newActiveMetrics[1] = metric

                if (selectFourMetrics) {
                    activeMetricIndexTurn = [2, 3, 0, 1]
                } else {
                    activeMetricIndexTurn = [0, 1]
                }
            } else {
                newActiveMetrics[activeMetricIndexTurn[0]] = metric
                activeMetricIndexTurn = [...activeMetricIndexTurn, activeMetricIndexTurn[0]]
                activeMetricIndexTurn.shift()
            }
        }

        updateMetricsState({
            activeMetrics: newActiveMetrics
        })
    }

    const deactivateMetric = (metric) => {
        activeMetricIndexTurn = selectFourMetrics ? [0, 1, 2, 3] : [0, 1]

        updateMetricsState({
            activeMetrics: activeMetrics.map(item => item === metric ? null : item)
        })
    }

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

    // useEffect(() => {
    //     getMetricsStatistics()
    // }, [selectedRangeDate, filters, mainState])

    useEffect(() => {
        if (selectFourMetrics) {
            activeMetricIndexTurn = [0, 1, 2, 3]
            if (activeMetrics.length === 2) {
                updateMetricsState({activeMetrics: [...activeMetrics, null, null]})
            }
        } else {
            activeMetricIndexTurn = [0, 1]
            updateMetricsState({activeMetrics: activeMetrics.slice(0, 2)})
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

            {selectedMetrics.length < availableMetricsCount && <>
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
                        availableMetricsCount={availableMetricsCount}

                        visibleItems={visibleItems}
                        hiddenItems={hiddenItems}
                    />
                </div>
            </>}
        </div>
    )
}

export default MainMetrics
