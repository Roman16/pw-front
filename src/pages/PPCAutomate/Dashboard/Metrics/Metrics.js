import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {dashboardActions} from '../../../../actions/dashboard.actions';
import MetricItem from './MetricItem';
import AddMetric from './AddMetric/AddMetric';

import './Metrics.less';

const Metrics = () => {
    const dispatch = useDispatch();
    const {selectedMetrics} = useSelector(state => ({
        selectedMetrics: state.dashboard.selectedMetrics
    }));

    const [metrics, changeMetricsList] = useState(selectedMetrics);

    const removeSelectedMetric = (metric) => {
        dispatch(dashboardActions.removeSelectedMetric(metric))
    };

    useEffect(() => {
        changeMetricsList(selectedMetrics)
    }, [selectedMetrics]);

    return (
        <div className="metrics-block">
            {metrics.length > 0 && metrics.map(selected => (
                <MetricItem
                    key={selected.key}
                    removeSelectedMetric={removeSelectedMetric}
                    metric={selected}
                />
            ))}


            {metrics.length < 16 && <AddMetric/>}
        </div>
    )
};

export default Metrics;
