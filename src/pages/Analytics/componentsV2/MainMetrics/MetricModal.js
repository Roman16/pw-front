import React, {useEffect, useState} from "react"
import ModalWindow from "../../../../components/ModalWindow/ModalWindow"
import ModalMetricItem from "./ModalMetricItem"
import {analyticsAvailableMetricsList} from './metricsList'
import _ from 'lodash'
import {SVG} from "../../../../utils/icons"
import {Input} from "antd"
import {AVAILABLE_METRICS_LENGTH} from "./MainMetrics"

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
    const [activeTab, setActiveTab] = useState('all'),
        [searchStr, setSearchStr] = useState()


    const changeTabHandler = (tab) => {
        setActiveTab(tab)
        setSearchStr('')
    }

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
                        onClick={() => changeTabHandler(i)}
                        className={activeTab === i && 'active'}
                    >
                        {i}
                    </li>)}
                </ul>

                <div className="form-group">
                    <Search
                        className="search-field"
                        placeholder={'Search by metric name'}
                        value={searchStr}
                        onChange={e => setSearchStr(e.target.value)}
                        suffix={<SVG id={'search'}/>}
                    />
                </div>
            </div>

            <div className='all-metrics'>


                {visibleItems.length >= AVAILABLE_METRICS_LENGTH ?
                <h3>
                    <svg width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M24.3888 24.9998H1.61555C0.872165 24.9998 0.38867 24.2175 0.721121 23.5526L12.1078 0.779348C12.4763 0.0422991 13.5281 0.0423016 13.8966 0.77935L25.2832 23.5526C25.6157 24.2175 25.1322 24.9998 24.3888 24.9998ZM13.0022 8.27962C12.2327 8.27962 11.6089 8.90345 11.6089 9.67298C11.6089 10.4425 12.2327 11.0663 13.0022 11.0663C13.7717 11.0663 14.3956 10.4425 14.3956 9.67298C14.3956 8.90345 13.7717 8.27962 13.0022 8.27962ZM15.4406 22.2132C15.8254 22.2132 16.1373 21.9013 16.1373 21.5165C16.1373 21.1317 15.8254 20.8198 15.4406 20.8198C15.0558 20.8198 14.7439 20.5079 14.7439 20.1232V13.1564C14.7439 12.7716 14.432 12.4597 14.0472 12.4597H11.9572H11.2605C10.8758 12.4597 10.5638 12.7716 10.5638 13.1564C10.5638 13.5411 10.8758 13.853 11.2605 13.853C11.6453 13.853 11.9572 14.165 11.9572 14.5497V20.1232C11.9572 20.5079 11.6453 20.8198 11.2605 20.8198C10.8758 20.8198 10.5638 21.1317 10.5638 21.5165C10.5638 21.9013 10.8758 22.2132 11.2605 22.2132H15.4406Z" fill="#FFAF52"/>
                    </svg>
                    You have added maximum number of "Quick Access" metrics. Please remove any of them to add new ones.
                </h3>
                :
                    <h3>Hover over metric to add it</h3>
                }

                <div className="list">
                    {allMetrics
                        .filter(i => activeTab === 'all' ? i : _.find(analyticsAvailableMetricsList, {key: i}).tabs.includes(activeTab))
                        .filter(i => {
                            if (searchStr) {
                                const metricName = _.find(analyticsAvailableMetricsList, {key: i}).title

                                const searchTermWords = searchStr.toLowerCase().split(' ')
                                const metricNameWords = metricName.toLowerCase().split(' ')

                                return searchTermWords.every(searchTermWord => metricNameWords.some(metricWord => metricWord.includes(searchTermWord)))
                            } else return true
                        })
                        .map((key) => {
                            return (
                                <ModalMetricItem
                                    key={`hidden-${key}`}
                                    item={{
                                        ...metricsData[key],
                                        ..._.find(analyticsAvailableMetricsList, {key: key})
                                    }}
                                    addMetric={addMetric}
                                    listType='hidden'
                                    disabled={visibleItems.find(i => i === key) || visibleItems.length >= AVAILABLE_METRICS_LENGTH}
                                />
                            )
                        })}
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
