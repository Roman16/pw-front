import React from "react";
import ModalWindow from "../../../../components/ModalWindow/ModalWindow";
import ModalMetricItem from "../../../PPCAutomate/Dashboard/Metrics/AddMetric/ModalMetricItem";
import {metricsListArray} from '../../../../constans/metricsList';

const MetricModal = ({visibleModal, handleOk, handleCancel, addMetric, removeMetric, visibleItems, hiddenItems}) => {
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
                {visibleItems.length > 0 ? visibleItems.map((item, index) => {
                        if (metricsListArray.find(metric => metric.key === item.key)) {
                            return (
                                <ModalMetricItem
                                    key={`visible-${item.key}`}
                                    item={item}
                                    removeMetric={removeMetric}
                                    listType='visible'
                                />
                            )
                        } else {
                            return '';
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
                {hiddenItems.map((item, index) => (
                    <ModalMetricItem
                        key={`hidden-${item.key}`}
                        item={item}
                        addMetric={addMetric}
                        listType='hidden'
                        disabled={visibleItems.length >= 6}
                    />
                ))}
            </div>
        </ModalWindow>
    )
};

export default MetricModal;