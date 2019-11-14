import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {dashboardActions} from '../../../../actions/dashboard.actions';
import MetricItem from './MetricItem';
import AddMetric from './AddMetric/AddMetric';

import './Metrics.less';

const Metrics = () => {
    const dispatch = useDispatch();
    const {selectedMetrics, activeMetrics, selectedRangeDate, selectedProduct} = useSelector(state => ({
        selectedMetrics: state.dashboard.selectedMetrics,
        activeMetrics: state.dashboard.activeMetrics,
        selectedRangeDate: state.dashboard.selectedRangeDate,
        selectedProduct: state.dashboard.selectedProduct,
    }));

    const removeSelectedMetric  = (metric) => dispatch(dashboardActions.removeSelectedMetric(metric));

    const activateMetric = (metric) => dispatch(dashboardActions.activateMetric(metric));

    const deactivateMetric = (metric) => dispatch(dashboardActions.deactivateMetric(metric));

    const getMetricsStatistics = () => {
        dispatch(dashboardActions.getMetricsStatistics({
            startDate: selectedRangeDate.startDate,
            endDate: selectedRangeDate.endDate,
            selectedProduct
        }));
    };

    useEffect(() => {getMetricsStatistics();}, [selectedRangeDate, selectedProduct]);

    return (
        <div className="metrics-block">
            {selectedMetrics.length > 0 && selectedMetrics.map(selected => (
                <MetricItem
                    key={selected.key}
                    removeSelectedMetric={removeSelectedMetric}
                    metric={selected}
                    activeMetrics={activeMetrics}
                    onActivateMetric={activateMetric}
                    onDeactivateMetric={deactivateMetric}
                />
            ))}


            {selectedMetrics.length < 16 && <AddMetric/>}
        </div>
    )
};

export default Metrics;
