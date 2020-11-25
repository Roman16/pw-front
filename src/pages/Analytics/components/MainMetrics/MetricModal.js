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
                         hiddenItems
                     }) => {
    return (
        <ModalWindow
            className='metrics-modal'
            visible={visibleModal}
            handleOk={handleOk}
            handleCancel={handleCancel}
            okText='Confirm'
        >
            <div className='modal-title'>
                Add Metric
            </div>

            <div className='visible-list'>
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
                    <div className='default-visible-item'>
                        Add new metric
                    </div>
                }
            </div>

            <div className='hidden-list__title'>Hidden</div>

            <div className='hidden-list'>
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
                            disabled={visibleItems.length >= 6}
                        />
                    )
                })}
            </div>
        </ModalWindow>
    )
}

export default MetricModal
