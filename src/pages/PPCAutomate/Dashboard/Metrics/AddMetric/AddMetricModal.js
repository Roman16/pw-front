import React from "react";

import ModalMetricItem from './ModalMetricItem';
import ModalWindow from "../../../../../components/ModalWindow/ModalWindow";

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
                {visibleItems.length > 0 ? visibleItems.map((item, index) => (
                        <ModalMetricItem
                            key={`visible-${item.key}`}
                            item={item}
                            removeMetric={removeMetric}
                            type='visible'
                        />
                    )) :
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
                        type='hidden'
                    />
                ))}
            </div>
        </ModalWindow>
    )
};

export default AddMetricModal;