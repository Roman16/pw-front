import React, {useEffect, useState} from "react"
import './CampaignsConfiguration.less'
import {SVG} from "../../../../utils/icons"
import CustomTable from "../../../../components/Table/CustomTable"
import {productsServices} from "../../../../services/products.services"
import {Checkbox} from "antd"
import {notification} from "../../../../components/Notification"
import InputCurrency from "../../../../components/Inputs/InputCurrency"
import TreeSelect from "../../../../components/TreeSelect/TreeSelect"

let requestSent = false

export const multiSelectVariations = [
    {title: 'Bid Optimization Keywords', key: 'bid_optimization_keywords', value: 'bid_optimization_keywords'},
    {title: 'Bid Optimization PAT', key: 'bid_optimization_pats', value: 'bid_optimization_pats'},
    {title: 'Activate Keywords', key: 'activate_keywords', value: 'activate_keywords'},
    {title: 'Activate PATs', key: 'activate_pats', value: 'activate_pats'},
    {title: 'Pause Bleeding Keywords', key: 'pause_bleeding_keywords', value: 'pause_bleeding_keywords'},
    {title: 'Pause Bleeding PATs', key: 'pause_bleeding_pats', value: 'pause_bleeding_pats'},
    {title: 'Remove Duplicates', key: 'remove_duplicates', value: 'remove_duplicates'},
]

let lastError

const CampaignsConfiguration = ({optimizationJobId, isDisabled, getSettings, jobsList, onUpdate}) => {
    const [sectionHeightState, setSectionHeightState] = useState(false),
        [hasJob, setJobState] = useState(false)


    useEffect(() => {
        if (isDisabled) {
            setSectionHeightState(false)
        }
    }, [isDisabled])

    const changeSettingsHandler = (index, name, value, label) => {
        onUpdate(jobsList.map((item, listIndex) => {
            if (listIndex === index) {
                if (name === 'dont_optimize' || name === 'dont_use_metrics') {
                    item[name] = !value
                } else {
                    item[name] = value
                }

                if (name === 'dont_optimize' && value) {
                    item['dont_use_metrics'] = false
                }
            }

            return item
        }))
    }

    const columns = [
        {
            title: 'Campaign Name',
            dataIndex: 'campaignName',
            key: 'campaignName',
            minWidth: '200px',
        },
        {
            title: 'Optimize',
            dataIndex: 'dont_optimize',
            key: 'dont_optimize',
            width: '120px',
            render: (dont_optimize, item, index) => {
                return (
                    <Checkbox
                        checked={!dont_optimize}
                        onChange={(e) => changeSettingsHandler(index, 'dont_optimize', e.target.checked)}
                    />
                )
            }
        },
        {
            title: 'Use for PPC Metrics',
            dataIndex: 'dont_use_metrics',
            key: 'dont_use_metrics',
            width: '150px',
            render: (dontUseMetrics, item, index) => {
                return (
                    <Checkbox
                        checked={!dontUseMetrics}
                        disabled={!item.dont_optimize}
                        onChange={(e) => changeSettingsHandler(index, 'dont_use_metrics', e.target.checked)}
                    />
                )
            }
        },
        {
            title: 'Min Bid',
            dataIndex: 'min_bid',
            key: 'min_bid',
            width: '130px',
            render: (min_bid, item, index) => {
                return (
                    <InputCurrency
                        disabled={item.dont_optimize}
                        value={min_bid}
                        onChange={(value) => changeSettingsHandler(index, 'min_bid', value)}
                    />
                )
            }
        },
        {
            title: 'Max Bid',
            dataIndex: 'max_bid',
            key: 'max_bid',
            width: '130px',
            render: (max_bid, item, index) => {
                return (
                    <InputCurrency
                        disabled={item.dont_optimize}
                        value={max_bid}
                        onChange={(value) => changeSettingsHandler(index, 'max_bid', value)}
                    />
                )
            }
        },
        {
            title: 'Custom Optimization Parts',
            dataIndex: 'optimization_parts',
            key: 'optimization_parts',
            width: '260px',
            render: (optimization_parts, item, index) => {
                return (
                    <>
                        <Checkbox
                            disabled={item.dont_optimize}
                            checked={item.enable_optimization_parts}
                            onChange={(e) => changeSettingsHandler(index, 'enable_optimization_parts', e.target.checked)}

                        />

                        <TreeSelect
                            getPopupContainer={triggerNode => triggerNode.parentNode}
                            treeCheckable={true}
                            showSearch={false}
                            placeholder={'Type'}
                            disabled={item.dont_optimize || !item.enable_optimization_parts}
                            value={optimization_parts}
                            treeData={multiSelectVariations}
                            onChange={(e, label) => changeSettingsHandler(index, 'optimization_parts', e, label)}
                        />
                    </>
                )
            }
        },
    ]

    const getCampaignsSettings = () => {
        getSettings()
        setJobState(true)
        requestSent = true
    }

    useEffect(() => {
        requestSent = false

        if (!optimizationJobId) {
            onUpdate([])
            setJobState(false)
        }
    }, [optimizationJobId])

    useEffect(() => {
        if (optimizationJobId && sectionHeightState && !requestSent) {
            getCampaignsSettings()
        }
    }, [sectionHeightState, optimizationJobId])

    return (
        <section className={`campaigns-configuration ${sectionHeightState ? 'opened' : 'closed'}`}>
            <div className="section-header" onClick={() => setSectionHeightState(prevState => !prevState)}>
                <h2>Campaigns Configuration</h2>

                <SVG id={'select-icon'}/>
            </div>

            <div className={`table-block`}>
                <CustomTable
                    // loading={processing}
                    dataSource={jobsList}
                    columns={columns}
                    emptyText={!hasJob ? 'Can\'t configure campaigns, start optimization first' : 'No campaigns for optimization, check product ads'}
                />
            </div>
        </section>
    )
}

export default CampaignsConfiguration
