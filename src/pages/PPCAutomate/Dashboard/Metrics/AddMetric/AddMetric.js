import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import plusIcon from '../../../../../assets/img/icons/plus-blue.svg';
import plusIconWhite from '../../../../../assets/img/icons/plus-white.svg';
import AddMetricModal from "./AddMetricModal";
import {metricsListArray, metricsListObject} from "../metricsList";
import {dashboardActions} from '../../../../../actions/dashboard.actions';

const AddMetric = () => {
    const [visibleModal, switchModal] = useState(false);
    const dispatch = useDispatch();
    const {selectedMetrics} = useSelector(state => ({
        selectedMetrics: state.dashboard.selectedMetrics
    }));


    const metricListFilter = (metric) => {
        return selectedMetrics.every((item) => {
            return item.key !== metric.key;
        });
    };

    const [visibleItems, updateVisibleList] = useState([]);

    const [hiddenItems, updateHiddenList] = useState([metricsListArray]);

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
        updateVisibleList(selectedMetrics.map(item => metricsListObject[item.key]));
        updateHiddenList(metricsListArray.filter(metricListFilter));

    }, [selectedMetrics]);


    const openModal = () => switchModal(true);
    const handleCancel = () => switchModal(false);

    return (
        <div className='add-metric'>
            <div className="add-metric__button" onClick={openModal}>
                <img src={plusIcon} alt="" className='blue'/>
                <img src={plusIconWhite} alt="" className='white'/>

                Add Metric
            </div>

            <AddMetricModal
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