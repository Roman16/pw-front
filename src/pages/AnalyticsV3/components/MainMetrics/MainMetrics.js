import React, {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {analyticsAvailableMetricsList, metricKeys} from "./metricsList"
import MetricItem from "./MetricItem"
import './MainMetrics.less'
import {SVG} from "../../../../utils/icons"
import MetricModal from "./MetricModal"
import {analyticsActions} from "../../../../actions/analytics.actions"
import _ from 'lodash'

let activeMetricIndexTurn = [0, 1]

const availableMetricsCount = 12

let prevActivatedIndex = undefined

export const AVAILABLE_METRICS_LENGTH = 12


const metricsOrder = {
    products: [
        metricKeys['total_orders'],
        metricKeys['organic_orders'],
        metricKeys['ad_orders'],
        metricKeys['macos'],
        metricKeys['conversion_rate'],
        metricKeys['cpa'],
        metricKeys['total_units'],
        metricKeys['cost'],
        metricKeys['ad_sales'],
        metricKeys['acos'],
        metricKeys['net_profit'],
        metricKeys['adSalesOtherSKU']],
    all: [
        metricKeys['impressions'],
        metricKeys['clicks'],
        metricKeys['ctr'],
        metricKeys['cpc'],
        metricKeys['cost'],
        metricKeys['ad_sales'],
        metricKeys['acos'],
        metricKeys['roas'],
        metricKeys['conversion_rate'],
        metricKeys['cpa'],
        metricKeys['ad_orders'],
        metricKeys['adSalesOtherSKU']
    ]
}

const MainMetrics = ({allMetrics, location, metricsData = {}}) => {
    const dispatch = useDispatch()

    allMetrics = [...analyticsAvailableMetricsList.filter(i => allMetrics.includes(i.key)).map(i => i.key)]

    const metricsState = useSelector(state => state.analytics.metricsState && state.analytics.metricsState[location]),
        selectFourMetrics = useSelector(state => state.analytics.chartState[location].selectFourMetrics || false)

    const selectedMetrics = metricsState.selectedMetrics || ((location === 'products' || location === 'products-parents') ? metricsOrder.products : metricsOrder.all),
        activeMetrics = metricsState.activeMetrics || ((location === 'products' || location === 'products-parents') ? metricsOrder.products : metricsOrder.all).slice(0, 2)

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
                        allMetrics={allMetrics}
                    />
                </div>
            </>}
        </div>
    )
}

export default MainMetrics
