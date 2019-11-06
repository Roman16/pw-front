import React, {useState} from 'react';

import metricsList from './metricsList';
import MetricItem from './MetricItem';
import AddMetric from './AddMetric/AddMetric';

import './Metrics.less';

const Metrics = () => {
    const [metrics, changeMetricsList] = useState(metricsList);

    return (
        <div className="metrics-block">
            {metrics.map(metric => (
                <MetricItem
                    key={metric.key}
                    metric={metric}
                />
            ))}

            {metrics.length < 16 && <AddMetric/>}
        </div>
    )
};

export default Metrics;
