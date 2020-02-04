import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {dashboardActions} from '../../../../actions/dashboard.actions';
import MetricItem from './MetricItem';
import AddMetric from './AddMetric/AddMetric';
import {metricsListArray} from './metricsList';

import './Metrics.less';

const Metrics = () => {
    const dispatch = useDispatch();
    const {selectedMetrics, activeMetrics, selectedRangeDate, selectedProduct, onlyOptimization} = useSelector(state => ({
        selectedMetrics: state.dashboard.selectedMetrics,
        activeMetrics: state.dashboard.activeMetrics,
        selectedRangeDate: state.dashboard.selectedRangeDate,
        selectedProduct: state.dashboard.selectedProduct,
        onlyOptimization: state.products.onlyOptimization,
    }));

    const removeSelectedMetric = (metric) => dispatch(dashboardActions.removeSelectedMetric(metric));

    const activateMetric = (metric) => dispatch(dashboardActions.activateMetric(metric));

    const deactivateMetric = (metric) => dispatch(dashboardActions.deactivateMetric(metric));

    const getMetricsStatistics = () => {
        dispatch(dashboardActions.getMetricsStatistics({
            startDate: selectedRangeDate.startDate,
            endDate: selectedRangeDate.endDate,
            selectedProduct,
            onlyOptimization
        }));
    };

    useEffect(() => {
        getMetricsStatistics();
    }, [selectedRangeDate, selectedProduct, onlyOptimization]);

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

            {selectedMetrics.length < metricsListArray.length && <AddMetric/>}
        </div>
    )
};

export default Metrics;
