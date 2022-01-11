import React, {useState} from "react"
import ModalWindow from "../../../../components/ModalWindow/ModalWindow"
import ModalMetricItem from "./ModalMetricItem"
import {analyticsAvailableMetricsList} from './metricsList'
import _ from 'lodash'
import {SVG} from "../../../../utils/icons"
import {Input} from "antd"

const Search = Input.Search

const tabs = [
    'all',
    'total',
    'organic',
    'ads',
    'conversions',
    'performance',
    'other'
]

const MetricModal = ({
                         visibleModal,
                         handleOk,
                         handleCancel,
                         addMetric,
                         removeMetric,
                         metricsData,
                         visibleItems,
                         allMetrics,
                         availableMetricsCount
                     }) => {
    const [activeTab, setActiveTab] = useState('all')

    return (
        <ModalWindow
            className='add-metrics-modal'
            visible={visibleModal}
            handleCancel={handleCancel}
            footer={false}
            okText='Confirm'
        >
            <div className='added-metrics'>
                {visibleItems.length > 0 && <h3>Hover over metric to remove it</h3>}

                <div className="list">
                    {visibleItems.length > 0 ? visibleItems.map((key) => {
                            if (analyticsAvailableMetricsList.find(metric => metric.key === key)) {
                                return (
                                    <ModalMetricItem
                                        key={`visible-${key}`}
                                        item={{
                                            ...metricsData[key],
                                            ..._.find(analyticsAvailableMetricsList, {key: key})
                                        }}
                                        removeMetric={removeMetric}
                                        listType='visible'
                                    />
                                )
                            } else {
                                return ''
                            }
                        }
                        ) :
                        <div className='added-placeholder-text'>
                            Click on metrics below to add them to Quick Access
                        </div>}
                </div>
            </div>

            <div className="filters">
                <ul className={'tabs'}>
                    {tabs.map(i => <li
                        onClick={() => setActiveTab(i)}
                        className={activeTab === i && 'active'}
                    >
                        {i}
                    </li>)}
                </ul>

                <div className="form-group">
                    <Search
                        className="search-field"
                        placeholder={'Search by metric name'}
                        // value={searchStr}
                        // onChange={e => changeSearchHandler(e.target.value)}
                        suffix={<SVG id={'search'}/>}
                    />
                </div>
            </div>

            <div className='all-metrics'>
                <h3>Hover over metric to add it</h3>

                <div className="list">
                    {/*{allMetrics[activeTab].map((key) => {*/}
                    {/*    return (*/}
                    {/*        <ModalMetricItem*/}
                    {/*            key={`hidden-${key}`}*/}
                    {/*            item={{*/}
                    {/*                ...metricsData[key],*/}
                    {/*                ..._.find(analyticsAvailableMetricsList, {key: key})*/}
                    {/*            }}*/}
                    {/*            addMetric={addMetric}*/}
                    {/*            listType='hidden'*/}
                    {/*            disabled={visibleItems.find(i => i.key === key)}*/}
                    {/*        />*/}
                    {/*    )*/}
                    {/*})}*/}
                </div>
            </div>

            <div className="actions">
                <button className="btn grey" onClick={handleCancel}>Cancel</button>
                <button className="btn default" onClick={handleOk}>Confirm</button>
            </div>
        </ModalWindow>
    )
}

export default MetricModal
