import React from "react"
import ModalWindow from "../../../../components/ModalWindow/ModalWindow"
import ModalMetricItem from "./ModalMetricItem"
import {analyticsAvailableMetricsList} from './metricsList'
import _ from 'lodash'

const MetricModal = ({
                         visibleModal,
                         handleOk,
                         handleCancel,
                         addMetric,
                         removeMetric,
                         metricsData,
                         visibleItems,
                         hiddenItems,
                         availableMetricsCount
                     }) => {
    return (
        <ModalWindow
            className='add-metrics-modal'
            visible={visibleModal}
            handleOk={handleOk}
            handleCancel={handleCancel}
            footer={false}
            okText='Confirm'
        >
            <div className='added-metrics'>
                {visibleItems.length > 0 ? visibleItems.map((key) => {
                        if (analyticsAvailableMetricsList.find(metric => metric.key === key)) {
                            return (
                                <ModalMetricItem
                                    key={`visible-${key}`}
                                    item={{
                                        ...metricsData[key],
                                        ..._.find(analyticsAvailableMetricsList, {key: key})
                                    }}
                                    removeMetric={removeMetric}
                                    listType='visible'
                                />
                            )
                        } else {
                            return ''
                        }
                    }
                    ) :
                    <div className='added-placeholder-text'>
                        Click on metrics below to add them to Quick Access
                    </div>}
            </div>


            <div className='all-metrics'>
                {hiddenItems.map((key) => {
                    return (
                        <ModalMetricItem
                            key={`hidden-${key}`}
                            item={{
                                ...metricsData[key],
                                ..._.find(analyticsAvailableMetricsList, {key: key})
                            }}
                            addMetric={addMetric}
                            listType='hidden'
                            disabled={visibleItems.length >= availableMetricsCount}
                        />
                    )
                })}
            </div>
        </ModalWindow>
    )
}

export default MetricModal
