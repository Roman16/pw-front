import React, {useEffect, useState} from "react"
import './CampaignsConfiguration.less'
import {SVG} from "../../../../utils/icons"
import CustomTable from "../../../../components/Table/CustomTable"
import {productsServices} from "../../../../services/products.services"
import {Checkbox} from "antd"

const CampaignsConfiguration = ({productId, optimizationJobId}) => {
    const [sectionHeightState, setSectionHeightState] = useState(false)

    const columns = [
        {
            title: 'Campaign Name',
            dataIndex: 'campaign_name',
            key: 'campaign_name',
            minWidth: '200px',
        }, {
            title: 'Optimize',
            dataIndex: 'optimize',
            key: 'optimize',
            width: '150px',
            render: (optimize, item) => {

                return (
                    <Checkbox
                        // onChange={e => this.setState({remember_me: e.target.checked})}
                    />
                )
            }
        }, {
            title: 'Use for PPC Metrics',
            dataIndex: 'use_ppc_metrics',
            key: 'use_ppc_metrics',
            width: '250px',
            render: (use_ppc_metrics, item) => {

                return (
                    <Checkbox
                        // onChange={e => this.setState({remember_me: e.target.checked})}
                    />
                )
            }
        },
    ]

    const getCampaignBlackList = async () => {
        try {
            const res = await productsServices.getCampaignsBlacklist(optimizationJobId)

            console.log(res)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        if (optimizationJobId) {
            getCampaignBlackList()
        }
    }, [optimizationJobId])

    return (
        <section className={`campaigns-configuration ${sectionHeightState ? 'opened' : 'closed'}`}>
            <div className="section-header" onClick={() => setSectionHeightState(prevState => !prevState)}>
                <h2>Campaigns Configuration</h2>

                <SVG id={'select-icon'}/>
            </div>

            <div className={`table-block`}>
                <CustomTable
                    // loading={processing}
                    dataSource={[]}
                    columns={columns}
                />
            </div>
        </section>
    )
}

export default CampaignsConfiguration