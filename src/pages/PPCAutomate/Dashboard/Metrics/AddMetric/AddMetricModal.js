import React, {useState} from "react";
import {Modal} from "antd";
import metricsList from "../metricsList";
import ModalMetricItem from './ModalMetricItem';

const AddMetricModal = ({visibleModal, handleOk, handleCancel}) => {
    const [visibleItems, updateVisibleList] = useState([]);
    const [hiddenItems, updateHiddenList] = useState(metricsList);

    const addMetric = (item) => {
        updateVisibleList([...visibleItems, item]);
        updateHiddenList([...hiddenItems.filter((hiddenMetric) => hiddenMetric.key !== item.key)]);
    };

    const removeMetric = (item) => {
        updateVisibleList([...visibleItems.filter((visibleMetric) => visibleMetric.key !== item.key)]);
        updateHiddenList([...hiddenItems, item]);
    };

    return (
        <Modal
            className='metrics-modal'
            title='Add Metric'
            visible={visibleModal}
            onOk={handleOk}
            onCancel={handleCancel}
            okText='Confirm'
        >
            <div className='visible-list'>
                {visibleItems.length > 0 ? visibleItems.map((item) => (
                        <ModalMetricItem
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
                {hiddenItems.map((item) => (
                    <ModalMetricItem
                        item={item}
                        addMetric={addMetric}
                        type='hidden'
                    />
                ))}
            </div>
        </Modal>
    )
};

export default AddMetricModal;