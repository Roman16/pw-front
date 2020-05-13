import React from "react";

import ModalMetricItem from './ModalMetricItem';
import ModalWindow from "../../../../../components/ModalWindow/ModalWindow";
import {metricsListArray} from "../metricsList";

const AddMetricModal = ({visibleModal, handleOk, handleCancel, addMetric, removeMetric, visibleItems, hiddenItems}) => {
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
                    />
                ))}
            </div>
        </ModalWindow>
    )
};

export default AddMetricModal;