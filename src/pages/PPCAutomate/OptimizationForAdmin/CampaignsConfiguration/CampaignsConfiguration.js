import React, {useEffect, useState} from "react"
import './CampaignsConfiguration.less'
import {SVG} from "../../../../utils/icons"
import CustomTable from "../../../../components/Table/CustomTable"
import {Checkbox, Input} from "antd"
import InputCurrency from "../../../../components/Inputs/InputCurrency"
import TreeSelect from "../../../../components/TreeSelect/TreeSelect"
import _ from "lodash"

const {Search} = Input

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


const CampaignsConfiguration = ({optimizationJobId, isDisabled, getSettings, loading, jobsList, onUpdate}) => {
    const [sectionHeightState, setSectionHeightState] = useState(false),
        [hasJob, setJobState] = useState(false),
        [searchText, setSearchText] = useState()


    useEffect(() => {
        if (isDisabled) {
            setSectionHeightState(false)
        }
    }, [isDisabled])

    const changeSettingsHandler = (id, name, value, label) => {

        onUpdate(jobsList.map((item, listIndex) => {
            if (item.campaign_id === id) {
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

    const resetSettingsHandler = (field) => {
        onUpdate(jobsList.map((i) => {
            return ({
                ...i,
                ...(field === 'all' || field === 'dont_optimize') && {dont_optimize: false},
                ...(field === 'all' || field === 'dont_use_metrics') && {dont_use_metrics: false},
                ...(field === 'all' || field === 'min_bid') && {min_bid: null},
                ...(field === 'all' || field === 'max_bid') && {max_bid: null},
                ...(field === 'all' || field === 'optimization_parts') && {
                    optimization_parts: multiSelectVariations.map(item => item.value),
                    enable_optimization_parts: false
                },
            })
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
            title: () => <div className={'with-reset'}>Optimize <button className="btn icon"
                                                                        onClick={() => resetSettingsHandler('dont_optimize')}>
                <SVG id='reload-icon'/>
            </button></div>,
            dataIndex: 'dont_optimize',
            key: 'dont_optimize',
            width: '160px',
            render: (dont_optimize, item, index) => {
                return (
                    <Checkbox
                        checked={!dont_optimize}
                        onChange={(e) => changeSettingsHandler(item.campaign_id, 'dont_optimize', e.target.checked)}
                    />
                )
            }
        },
        {
            title: () => <div className={'with-reset'}>Use for PPC Metrics <button className="btn icon"
                                                                                   onClick={() => resetSettingsHandler('dont_use_metrics')}>
                <SVG id='reload-icon'/>
            </button></div>,
            dataIndex: 'dont_use_metrics',
            key: 'dont_use_metrics',
            width: '200px',
            render: (dontUseMetrics, item, index) => {
                return (
                    <Checkbox
                        checked={!dontUseMetrics}
                        disabled={!item.dont_optimize}
                        onChange={(e) => changeSettingsHandler(item.campaign_id, 'dont_use_metrics', e.target.checked)}
                    />
                )
            }
        },
        {
            title: () => <div className={'with-reset'}>Min Bid
                <button className="btn icon" onClick={() => resetSettingsHandler('min_bid')}>
                    <SVG id='reload-icon'/>
                </button></div>,
            dataIndex: 'min_bid',
            key: 'min_bid',
            width: '130px',
            render: (min_bid, item, index) => {
                return (
                    <InputCurrency
                        disabled={item.dont_optimize}
                        value={min_bid}
                        onChange={(value) => changeSettingsHandler(item.campaign_id, 'min_bid', value)}
                    />
                )
            }
        },
        {
            title: () => <div className={'with-reset'}>Max Bid
                <button className="btn icon" onClick={() => resetSettingsHandler('max_bid')}>
                    <SVG id='reload-icon'/>
                </button></div>,
            dataIndex: 'max_bid',
            key: 'max_bid',
            width: '130px',
            render: (max_bid, item, index) => {
                return (
                    <InputCurrency
                        disabled={item.dont_optimize}
                        value={max_bid}
                        onChange={(value) => changeSettingsHandler(item.campaign_id, 'max_bid', value)}
                    />
                )
            }
        },
        {
            title: () => <div className={'with-reset'}>Custom Optimization Parts
                <button className="btn icon" onClick={() => resetSettingsHandler('optimization_parts')}>
                    <SVG id='reload-icon'/>
                </button></div>,
            dataIndex: 'optimization_parts',
            key: 'optimization_parts',
            width: '260px',
            render: (optimization_parts, item, index) => {
                return (
                    <>
                        <Checkbox
                            disabled={item.dont_optimize}
                            checked={item.enable_optimization_parts}
                            onChange={(e) => changeSettingsHandler(item.campaign_id, 'enable_optimization_parts', e.target.checked)}

                        />

                        <TreeSelect
                            treeCheckable={true}
                            showSearch={false}
                            placeholder={'Type'}
                            dropdownClassName={'optimization-parts-dropdown'}
                            disabled={item.dont_optimize || !item.enable_optimization_parts}
                            value={optimization_parts}
                            treeData={multiSelectVariations}
                            onChange={(e, label) => changeSettingsHandler(item.campaign_id, 'optimization_parts', e, label)}
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
                <div className={'block-header'}>
                    <div className="form-group">
                        <Search
                            className="search-field"
                            placeholder={`Search by campaign name`}
                            onPressEnter={e => setSearchText(e.target.value)}
                            onBlur={e => setSearchText(e.target.value)}
                            data-intercom-target='search-field'
                            suffix={<SVG id={'search'}/>}
                        />
                    </div>

                    <button className="btn default" onClick={() => resetSettingsHandler('all')}>
                        Reset All
                    </button>
                </div>

                <CustomTable
                    loading={loading}
                    dataSource={_.orderBy(searchText ? _.filter(jobsList, (item) => _.includes(item.campaignName.toLowerCase(), searchText.toLowerCase())) : jobsList, ['campaignName'], ['asc'])}
                    columns={columns}
                    emptyText={!hasJob ? 'Can\'t configure campaigns, start optimization first' : 'No campaigns for optimization, check product ads'}
                />
            </div>
        </section>
    )
}

export default CampaignsConfiguration
