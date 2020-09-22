import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {dashboardActions} from '../../../../actions/dashboard.actions';
import MetricItem from './MetricItem';
import AddMetric from './AddMetric/AddMetric';
import {metricsListArray} from '../../../../constans/metricsList';

import './Metrics.less';

const Metrics = () => {
    const dispatch = useDispatch();
    const {selectedMetrics, activeMetrics, selectedRangeDate, selectedProduct, onlyOptimization, advertisingType} = useSelector(state => ({
        selectedMetrics: state.dashboard.selectedMetrics,
        activeMetrics: state.dashboard.activeMetrics,
        selectedRangeDate: state.dashboard.selectedRangeDate,
        selectedProduct: state.dashboard.selectedProduct,
        onlyOptimization: state.products.onlyOptimization,
        advertisingType: state.dashboard.advertisingType,
    }));

    const removeSelectedMetric = (metric) => dispatch(dashboardActions.removeSelectedMetric(metric));

    const activateMetric = (metric) => dispatch(dashboardActions.activateMetric(metric));

    const deactivateMetric = (metric) => dispatch(dashboardActions.deactivateMetric(metric));

    const getMetricsStatistics = () => {
        dispatch(dashboardActions.getMetricsStatistics({
            startDate: selectedRangeDate.startDate,
            endDate: selectedRangeDate.endDate,
            selectedProduct,
            onlyOptimization,
            advertisingType
        }));
    };

    useEffect(() => {
        getMetricsStatistics();
    }, [selectedRangeDate, selectedProduct, onlyOptimization, advertisingType]);

    return (
        <div className="metrics-block">
            {selectedMetrics.length > 0 && selectedMetrics.map(selected => {
                    if (metricsListArray.find(item => item.key === selected.key)) {
                        return (
                            <MetricItem
                                key={selected.key}
                                removeSelectedMetric={removeSelectedMetric}
                                metric={selected}
                                activeMetrics={activeMetrics}
                                onActivateMetric={activateMetric}
                                onDeactivateMetric={deactivateMetric}
                            />
                        )
                    } else {
                        return '';
                    }
                }
            )}

            {selectedMetrics.length < metricsListArray.length && <AddMetric/>}
        </div>
    )
};

export default Metrics;
