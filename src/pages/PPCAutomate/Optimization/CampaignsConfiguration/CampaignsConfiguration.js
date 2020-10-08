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
    {title: 'Select All', key: 'all', value: 'all'},
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

const CampaignsConfiguration = ({optimizationJobId}) => {
    const [sectionHeightState, setSectionHeightState] = useState(false),
        [jobsList, setJobsList] = useState([]),
        [hasJob, setJobState] = useState(false)

    const changeCheckboxHandler = (index, type, value) => {
        setJobsList(jobsList.map((item, listIndex) => {
            if (listIndex === index) {
                item[type] = !value

                if (type === 'dontOptimize' && value) {
                    item['dontUseMetrics'] = false
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
            dataIndex: 'dontOptimize',
            key: 'dontOptimize',
            width: '100px',
            render: (dontOptimize, item, index) => {

                return (
                    <Checkbox
                        checked={!dontOptimize}
                        onChange={(e) => changeCheckboxHandler(index, 'dontOptimize', e.target.checked)}
                    />
                )
            }
        },
        {
            title: 'Use for PPC Metrics',
            dataIndex: 'dontUseMetrics',
            key: 'dontUseMetrics',
            width: '150px',
            render: (dontUseMetrics, item, index) => {

                return (
                    <Checkbox
                        checked={!dontUseMetrics}
                        disabled={!item.dontOptimize}
                        onChange={(e) => changeCheckboxHandler(index, 'dontUseMetrics', e.target.checked)}
                    />
                )
            }
        },
        {
            title: 'Min Bid',
            dataIndex: 'min_bid',
            key: 'min_bid',
            width: '100px',
            render: (dontUseMetrics, item, index) => {
                return (
                    <InputCurrency  disabled={!item.dontOptimize}/>
                )
            }
        },
        {
            title: 'Max Bid',
            dataIndex: 'max_bid',
            key: 'max_bid',
            width: '100px',
            render: (dontUseMetrics, item, index) => {
                return (
                    <InputCurrency  disabled={!item.dontOptimize}/>
                )
            }
        },
        {
            title: 'Target ACoS',
            dataIndex: 'target_acos',
            key: 'target_acos',
            width: '120px',
            render: (dontUseMetrics, item, index) => {
                return (
                    <InputCurrency
                        typeIcon={'percent'}
                        disabled={!item.dontOptimize}
                    />
                )
            }
        },
        {
            title: 'Custom Optimization Parts',
            dataIndex: 'custom_optimization_parts',
            key: 'custom_optimization_parts',
            width: '240px',
            render: (dontUseMetrics, item, index) => {
                return (
                    <>
                        <Checkbox  disabled={!item.dontOptimize}/>

                        <TreeSelect
                            // getPopupContainer={triggerNode => triggerNode.parentNode}
                            treeCheckable={true}
                            showSearch={false}
                            placeholder={'Type'}
                            disabled={!item.dontOptimize}
                            // value={filterValue}
                            treeData={multiSelectVariations}

                            // onChange={changeValueHandler}
                        />
                    </>
                )
            }
        },
    ]

    const getCampaignBlackList = async () => {

        try {
            const res = await productsServices.getCampaignsBlacklist(optimizationJobId)
            setJobsList(res.result)
            setJobState(true)

            requestSent = true
        } catch (e) {
            console.log(e)
        }
    }

    const saveConfigurationHandler = async () => {
        try {
            const dont_optimize_ids = jobsList.filter(item => item.dontOptimize).map(item => item.campaignId),
                dont_use_metrics_ids = jobsList.filter(item => item.dontUseMetrics).map(item => item.campaignId)

            await productsServices.updateCampaignsBlacklist(optimizationJobId, {
                dont_optimize_ids,
                dont_use_metrics_ids
            })

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
            getCampaignBlackList()
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
                    <button className={'btn white'} onClick={getCampaignBlackList}>
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
