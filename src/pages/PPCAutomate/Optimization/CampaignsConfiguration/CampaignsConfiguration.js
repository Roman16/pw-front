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

const multiSelectVariations = [
    // {title: 'Select All', key: 'all', value: 'all'},
    {title: 'Bid Optimization PAT', key: 'bid_optimization_pat', value: 'bid_optimization_pat'},
    {title: 'Pause Bleeding Keywords', key: 'pause_bleeding_keywords', value: 'pause_bleeding_keywords'},
    {title: 'Bid Optimization Keywords', key: 'bid_optimization_keywords', value: 'bid_optimization_keywords'},
    {title: 'Harvest & Rank New Keywords', key: 'harvest_rank_new_keywords', value: 'harvest_rank_new_keywords'},
    {title: 'Add Bad ST to Negatives', key: 'add_bad_negatives', value: 'add_bad_negatives'},
    {title: 'Activate Keywords', key: 'activate_keywords', value: 'activate_keywords'},
    {title: 'Remove Duplicates', key: 'remove_duplicates', value: 'remove_duplicates'},
    {title: 'Pause Bleeding PATs', key: 'pause_bleeding', value: 'pause_bleeding'},
    {title: 'Activate PATs', key: 'activate_pats', value: 'activate_pats'},
]

let lastError

const CampaignsConfiguration = ({optimizationJobId}) => {
    const [sectionHeightState, setSectionHeightState] = useState(false),
        [jobsList, setJobsList] = useState([]),
        [hasJob, setJobState] = useState(false)

    const showNotification = (text) => {
        if (lastError !== text) {
            lastError = text

            notification.error({title: text})

            setTimeout(() => {
                lastError = null
            }, 2000)
        }
    }

    const changeSettingsHandler = (index, name, value, label) => {
        setJobsList(jobsList.map((item, listIndex) => {
            if (listIndex === index) {
                if (name === 'dont_optimize' || name === 'dont_use_metrics') {
                    item[name] = !value
                } else if (name === 'min_bid') {
                    if (value === '' || value == null) {
                        item[name] = null
                    } else if (value > jobsList[index].max_bid) {
                        showNotification('Min Bid should be less than Max Bid')
                        item[name] = jobsList[index].max_bid - 0.01
                    } else if (value < 0.002) {
                        showNotification('Bids should be greater than or equal to 0.02$')
                        item[name] = 0.002
                    } else {
                        item[name] = value
                    }
                } else if (name === 'max_bid') {
                    if (value === '' || value == null) {
                        item[name] = null
                    } else if (value < 0.002) {
                        showNotification('Bids should be greater than or equal to 0.02$')
                        item[name] = 0.002
                    } else if (value < jobsList[index].min_bid) {
                        showNotification('Max Bid should be greater than Min Bid')
                        item[name] = jobsList[index].min_bid + 0.01
                    } else {
                        item[name] = value
                    }
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
            width: '100px',
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
            width: '100px',
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
            width: '100px',
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
            width: '240px',
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

    const getCampaignsSettings = async () => {
        try {
            const res = await productsServices.getCampaignsSettings(optimizationJobId)
            setJobsList(res.result.map(campaign => ({
                ...campaign.custom_settings,
                campaignName: campaign.campaignName,
                campaign_id: campaign.campaignId,
                enable_optimization_parts: !!(campaign.custom_settings && campaign.custom_settings.optimization_parts)
            })))
            setJobState(true)

            requestSent = true
        } catch (e) {
            console.log(e)
        }
    }

    const saveConfigurationHandler = async () => {
        try {
            const custom_campaigns_settings = jobsList.map(item => ({
                    campaign_id: item.campaign_id,
                    dont_optimize: item.dont_optimize || false,
                    dont_use_metrics: item.dont_use_metrics || false,
                    optimization_parts: !item.enable_optimization_parts || item.optimization_parts.length === 0 ? null : item.optimization_parts,
                    ...item.min_bid && {min_bid: item.min_bid},
                    ...item.max_bid && {max_bid: item.max_bid}
                }
            ))

            await productsServices.updateCampaignsBlacklist(optimizationJobId, custom_campaigns_settings)

            notification.success({title: 'Success!'})
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        requestSent = false

        if (!optimizationJobId) {
            setJobsList([])
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

                {jobsList.length > 0 && <div className="actions">
                    <button className={'btn white'} onClick={getCampaignsSettings}>
                        Reset
                    </button>

                    <button className={'btn default'} onClick={saveConfigurationHandler}>
                        Save
                    </button>
                </div>}
            </div>
        </section>
    )
}

export default CampaignsConfiguration
