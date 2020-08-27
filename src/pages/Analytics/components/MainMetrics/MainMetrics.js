import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {dashboardActions} from "../../../../actions/dashboard.actions";
import {metricsListArray} from "../../../PPCAutomate/Dashboard/Metrics/metricsList";
import MetricItem from "../../../PPCAutomate/Dashboard/Metrics/MetricItem";
import AddMetric from "../../../PPCAutomate/Dashboard/Metrics/AddMetric/AddMetric";
import './MainMetrics.less';

const MainMetrics = () => {
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
        <div className="main-metrics metrics-block">
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

            {selectedMetrics.length < 6 && <AddMetric/>}
        </div>
    )
};

export default MainMetrics;