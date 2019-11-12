import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {dashboardActions} from '../../../../actions/dashboard.actions';
import MetricItem from './MetricItem';
import AddMetric from './AddMetric/AddMetric';

import './Metrics.less';

const Metrics = () => {
    const dispatch = useDispatch();
    const {selectedMetrics, activeMetrics} = useSelector(state => ({
        selectedMetrics: state.dashboard.selectedMetrics,
        activeMetrics: state.dashboard.activeMetrics,
    }));

    const removeSelectedMetric = (metric) => {
        dispatch(dashboardActions.removeSelectedMetric(metric))
    };

    const activateMetric = (metric) => dispatch(dashboardActions.activateMetric(metric));

    const deactivateMetric = (metric) =>  dispatch(dashboardActions.deactivateMetric(metric));

    useEffect(() => {
        // dispatch(dashboardActions.getMetricsStatistics())
    }, []);

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
