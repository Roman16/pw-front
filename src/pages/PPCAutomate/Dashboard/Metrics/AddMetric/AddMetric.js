import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import AddMetricModal from "./AddMetricModal";
import {dashboardActions} from '../../../../../actions/dashboard.actions';

import './AddMetric.less';
import {SVG} from "../../../../../utils/icons";

const AddMetric = () => {
    const [visibleModal, switchModal] = useState(false);
    const dispatch = useDispatch();
    const {selectedMetrics, allMetrics} = useSelector(state => ({
        selectedMetrics: state.dashboard.selectedMetrics,
        allMetrics: state.dashboard.allMetrics,
    }));

    const openModal = () => switchModal(true);
    const handleCancel = () => switchModal(false);

    const [visibleItems, updateVisibleList] = useState(selectedMetrics);
    const [hiddenItems, updateHiddenList] = useState(allMetrics);

    const metricListFilter = (metric) => {
        return selectedMetrics.every((item) => {
            return item.key !== metric.key;
        });
    };

    const addMetric = (item) => {
        updateVisibleList([...visibleItems, item]);
        updateHiddenList([...hiddenItems.filter((hiddenMetric) => hiddenMetric.key !== item.key)]);
    };

    const removeMetric = (item) => {
        updateVisibleList([...visibleItems.filter((visibleMetric) => visibleMetric.key !== item.key)]);
        updateHiddenList([...hiddenItems, item]);
    };

    const handleOk = () => {
        switchModal(false);
        dispatch(dashboardActions.updateMetricList(visibleItems));
    };

    useEffect(() => {
        updateVisibleList(selectedMetrics);
        updateHiddenList(allMetrics.filter(metricListFilter));
    }, [selectedMetrics, allMetrics, visibleModal]);

    return (
        <div className='add-metric'>
            <div className="add-metric__button" onClick={openModal}>
                <span className='blue'><SVG id='plus-blue'/></span>

                Add Metric
            </div>

            <AddMetricModal
                className={'added-metrics-window'}
                visibleModal={visibleModal}
                handleOk={handleOk}
                handleCancel={handleCancel}
                addMetric={addMetric}
                removeMetric={removeMetric}
                visibleItems={visibleItems}
                hiddenItems={hiddenItems}
            />
        </div>
    )
};

export default AddMetric;
