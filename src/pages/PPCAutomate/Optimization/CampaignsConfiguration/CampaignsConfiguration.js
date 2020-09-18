import React, {useEffect, useState} from "react"
import './CampaignsConfiguration.less'
import {SVG} from "../../../../utils/icons"
import CustomTable from "../../../../components/Table/CustomTable"
import {productsServices} from "../../../../services/products.services"
import {Checkbox} from "antd"
import {notification} from "../../../../components/Notification"

let requestSent = false


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
            width: '150px',
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
            width: '250px',
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
    ]

    const getCampaignBlackList = async () => {
        setJobState(true)

        try {
            const res = await productsServices.getCampaignsBlacklist(optimizationJobId)
            setJobsList(res.result)

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