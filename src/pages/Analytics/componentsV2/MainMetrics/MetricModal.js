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


    const metricList = allMetrics
        .filter(i => activeTab === 'all' ? i : _.find(analyticsAvailableMetricsList, {key: i}).tabs.includes(activeTab))
        .filter(i => {
            if (searchStr) {
                const metricName = _.find(analyticsAvailableMetricsList, {key: i}).title

                const searchTermWords = searchStr.toLowerCase().split(' ')
                const metricNameWords = metricName.toLowerCase().split(' ')

                return searchTermWords.every(searchTermWord => metricNameWords.some(metricWord => metricWord.includes(searchTermWord)))
            } else return true
        })

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
                    {tabs
                        .filter(i => i === 'all' || allMetrics.some(metricKey => _.find(analyticsAvailableMetricsList, {key: metricKey}).tabs.includes(i)))
                        .map(i => <li
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
                {metricList.length === 0 ? '' : visibleItems.length >= AVAILABLE_METRICS_LENGTH ?
                    <h3>
                        <svg width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                  d="M24.3888 24.9998H1.61555C0.872165 24.9998 0.38867 24.2175 0.721121 23.5526L12.1078 0.779348C12.4763 0.0422991 13.5281 0.0423016 13.8966 0.77935L25.2832 23.5526C25.6157 24.2175 25.1322 24.9998 24.3888 24.9998ZM13.0022 8.27962C12.2327 8.27962 11.6089 8.90345 11.6089 9.67298C11.6089 10.4425 12.2327 11.0663 13.0022 11.0663C13.7717 11.0663 14.3956 10.4425 14.3956 9.67298C14.3956 8.90345 13.7717 8.27962 13.0022 8.27962ZM15.4406 22.2132C15.8254 22.2132 16.1373 21.9013 16.1373 21.5165C16.1373 21.1317 15.8254 20.8198 15.4406 20.8198C15.0558 20.8198 14.7439 20.5079 14.7439 20.1232V13.1564C14.7439 12.7716 14.432 12.4597 14.0472 12.4597H11.9572H11.2605C10.8758 12.4597 10.5638 12.7716 10.5638 13.1564C10.5638 13.5411 10.8758 13.853 11.2605 13.853C11.6453 13.853 11.9572 14.165 11.9572 14.5497V20.1232C11.9572 20.5079 11.6453 20.8198 11.2605 20.8198C10.8758 20.8198 10.5638 21.1317 10.5638 21.5165C10.5638 21.9013 10.8758 22.2132 11.2605 22.2132H15.4406Z"
                                  fill="#FFAF52"/>
                        </svg>
                        You have added maximum number of "Quick Access" metrics. Please remove any of them to add new
                        ones.
                    </h3>
                    :
                    <h3>Hover over metric to add it</h3>
                }

                <div className="list">
                    {metricList.map((key) => <ModalMetricItem
                            key={`hidden-${key}`}
                            item={{
                                ...metricsData[key],
                                ..._.find(analyticsAvailableMetricsList, {key: key})
                            }}
                            addMetric={addMetric}
                            listType='hidden'
                            disabled={visibleItems.find(i => i === key) || visibleItems.length >= AVAILABLE_METRICS_LENGTH}
                        />
                    )}
                </div>

                {metricList.length === 0 && <NoResult/>}
            </div>

            <div className="actions">
                <button className="btn grey" onClick={handleCancel}>Cancel</button>
                <button className="btn default" onClick={handleOk}>Confirm</button>
            </div>
        </ModalWindow>
    )
}

const NoResult = () => (
    <div className="no-result">
        <svg width="178" height="128" viewBox="0 0 178 128" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="89" cy="109.169" rx="89" ry="15.831" fill="#F7F7F7"/>
            <path
                d="M33.1543 101.367H144.787C146.996 101.367 148.787 99.5759 148.787 97.3667V21.0615C148.787 18.8524 146.996 17.0615 144.787 17.0615H65.8483H33.1543C30.9452 17.0615 29.1543 18.8524 29.1543 21.0615V97.3667C29.1543 99.5759 30.9452 101.367 33.1543 101.367Z"
                fill="#D2D7E1"/>
            <path
                d="M44.4684 87.0732L135.955 84.3862C138.163 84.3213 139.901 82.4787 139.836 80.2705L137.588 3.99825C137.523 1.79007 135.68 0.0525602 133.472 0.117416L68.5006 2.02566L41.9851 2.80444C39.7769 2.8693 38.0396 4.71196 38.1046 6.92014L40.3523 83.1924C40.4174 85.4005 42.2602 87.1381 44.4684 87.0732Z"
                fill="#EDF0F5"/>
            <path opacity="0.3"
                  d="M33.1543 104.378H144.787C146.996 104.378 148.787 102.587 148.787 100.378V32.1018C148.787 29.8927 146.996 28.1018 144.787 28.1018H75.223C73.7789 28.1018 72.447 27.3235 71.7381 26.0654L69.509 22.1092C68.8002 20.8511 67.4682 20.0728 66.0241 20.0728H33.1543C30.9452 20.0728 29.1543 21.8636 29.1543 24.0728V100.378C29.1543 102.587 30.9452 104.378 33.1543 104.378Z"
                  fill="#C9CEDA"/>
            <path
                d="M33.1543 110.399H144.787C146.996 110.399 148.787 108.609 148.787 106.399V34.1233H72.7097C71.2656 34.1233 69.9337 33.345 69.2248 32.0868L66.9957 28.1307C66.2869 26.8726 64.9549 26.0942 63.5108 26.0942H29.1543V106.399C29.1543 108.609 30.9452 110.399 33.1543 110.399Z"
                fill="#DCDFE6"/>
            <path
                d="M155.811 118.719C157.74 120.696 157.703 123.863 155.728 125.793C153.754 127.724 150.589 127.687 148.661 125.71L155.811 118.719ZM137.122 99.5661L155.811 118.719L148.661 125.71L129.971 106.557L137.122 99.5661Z"
                fill="#CFD4DF"/>
            <path
                d="M148.51 114.703C149.667 115.888 149.644 117.789 148.46 118.947C147.275 120.105 145.377 120.083 144.219 118.897L148.51 114.703ZM129.82 95.5492L148.51 114.703L144.219 118.897L125.53 99.7437L129.82 95.5492Z"
                fill="#CFD4DF"/>
            <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M113.459 102.475C124.632 102.475 133.69 93.4085 133.69 82.2238C133.69 71.0391 124.632 61.9721 113.459 61.9721C102.286 61.9721 93.228 71.0391 93.228 82.2238C93.228 93.4085 102.286 102.475 113.459 102.475ZM113.459 107.241C127.261 107.241 138.45 96.0402 138.45 82.2238C138.45 68.4074 127.261 57.207 113.459 57.207C99.6568 57.207 88.4678 68.4074 88.4678 82.2238C88.4678 96.0402 99.6568 107.241 113.459 107.241Z"
                  fill="#C0C7D3"/>
            <mask id="mask0_21872_57683" maskUnits="userSpaceOnUse" x="93" y="61" width="41"
                  height="42">
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M113.459 102.475C124.632 102.475 133.69 93.4085 133.69 82.2238C133.69 71.0391 124.632 61.9722 113.459 61.9722C102.285 61.9722 93.2275 71.0391 93.2275 82.2238C93.2275 93.4085 102.285 102.475 113.459 102.475Z"
                      fill="#C4C4C4"/>
            </mask>
            <g mask="url(#mask0_21872_57683)">
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M113.459 102.475C124.632 102.475 133.69 93.4085 133.69 82.2238C133.69 71.0391 124.632 61.9722 113.459 61.9722C102.285 61.9722 93.2275 71.0391 93.2275 82.2238C93.2275 93.4085 102.285 102.475 113.459 102.475Z"
                      fill="#D2D7E1"/>
                <path d="M135.277 61.9722L101.955 108.432" stroke="#EDF0F5" stroke-width="3" stroke-linecap="round"/>
                <path d="M140.831 66.0049L107.509 112.465" stroke="#EDF0F5" stroke-width="7" stroke-linecap="round"/>
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M113.459 102.475C124.632 102.475 133.69 93.4085 133.69 82.2238C133.69 71.0391 124.632 61.9721 113.459 61.9721C102.286 61.9721 93.228 71.0391 93.228 82.2238C93.228 93.4085 102.286 102.475 113.459 102.475ZM113.459 107.241C127.261 107.241 138.45 96.0402 138.45 82.2238C138.45 68.4074 127.261 57.207 113.459 57.207C99.6568 57.207 88.4678 68.4074 88.4678 82.2238C88.4678 96.0402 99.6568 107.241 113.459 107.241Z"
                      fill="#DCDFE6"/>
            </g>
        </svg>

        <h4>No results found</h4>

        <p>
            We can’t find any item matching your <br/> search. Please try adjusting your search.
        </p>
    </div>
)

export default MetricModal
