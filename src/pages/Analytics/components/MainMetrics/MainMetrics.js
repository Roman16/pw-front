import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {dashboardActions} from "../../../../actions/dashboard.actions";
import {metricsListArray} from "../../../PPCAutomate/Dashboard/Metrics/metricsList";
import MetricItem from "../../../PPCAutomate/Dashboard/Metrics/MetricItem";
import AddMetric from "../../../PPCAutomate/Dashboard/Metrics/AddMetric/AddMetric";
import './MainMetrics.less';
import {SVG} from "../../../../utils/icons";
import AddMetricModal from "../../../PPCAutomate/Dashboard/Metrics/AddMetric/AddMetricModal";
import MetricModal from "./MetricModal";

const MainMetrics = () => {
    const dispatch = useDispatch();

    const [visibleModal, switchModal] = useState(false);

    const {selectedMetrics, activeMetrics, selectedRangeDate, selectedProduct, onlyOptimization, allMetrics} = useSelector(state => ({
        selectedMetrics: state.dashboard.selectedMetrics,
        activeMetrics: state.dashboard.activeMetrics,
        selectedRangeDate: state.dashboard.selectedRangeDate,
        selectedProduct: state.dashboard.selectedProduct,
        onlyOptimization: state.products.onlyOptimization,
        allMetrics: state.dashboard.allMetrics,

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

            {selectedMetrics.length < 6 && <>
                <div className='add-metric'>
                    <button className="btn add-metric__button" onClick={openModal}>
                        <span className='blue'><SVG id='plus-blue'/></span>

                        Add Metric
                    </button>

                    <MetricModal
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
            </>}
        </div>
    )
};

export default MainMetrics;