import React from "react"
import './CampaignsList.less'
import {Link} from "react-router-dom"
import {
    acosColumn,
    adCvrColumn,
    adOrdersColumn,
    adProfitColumn,
    adSalesColumn,
    adSpendColumn,
    adUnitsColumn,
    budgetAllocationColumn,
    clicksColumn,
    cpaColumn,
    cpcColumn,
    ctrColumn,
    dateColumn,
    impressionsColumn,
    roasColumn,
    salesShareColumn,
    statusColumn
} from "../../components/tableColumns"
import TableList from "../../components/TableList/TableList"

const columns = [
    {
        title: 'Campaign',
        dataIndex: 'campaign',
        key: 'campaign',
        width: '200px',
        sorter: true,
        filter: true,
        locked: true,
        render: (campaign, item) => (<Link to={`/analytics/ad-groups?campaignId=${item.id}`}>{campaign}</Link>)
    },
    {
        ...statusColumn,
        locked: true,
    },
    {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
        width: '200px',
        sorter: true,
        locked: true,
    },
    {
        title: 'Portfolio',
        dataIndex: 'portfolio',
        key: 'portfolio',
        width: '150px',
        sorter: true,
        locked: true,
    },
    {
        title: 'Campaign bidding strategy',
        dataIndex: 'bidding_strategy',
        key: 'bidding_strategy',
        width: '250px',
        sorter: true,
        locked: true,
    },
    {
        title: 'Start date',
        dataIndex: 'start_date',
        key: 'start_date',
        width: '150px',
        sorter: true,
        ...dateColumn
    },
    {
        title: 'End date',
        dataIndex: 'start_date',
        key: 'start_date',
        width: '150px',
        sorter: true,
        ...dateColumn
    },
    {
        title: 'Budget',
        dataIndex: 'daily_budget',
        key: 'daily_budget',
        width: '150px',
        sorter: true
    },
    {
        ...impressionsColumn
    },
    {
        ...clicksColumn
    },
    {
        ...ctrColumn
    },
    {
        ...adSpendColumn
    },
    {
        ...cpcColumn
    },
    {
        ...adSalesColumn
    },
    {
        ...acosColumn
    },
    {
        ...adCvrColumn
    },
    {
        ...cpaColumn
    },
    {
        ...adOrdersColumn
    },
    {
        ...adUnitsColumn
    },
    {
        ...roasColumn
    },
    {
        ...salesShareColumn
    },
    {
        ...budgetAllocationColumn
    },
    {
        ...adProfitColumn
    },
]


const CampaignsList = () => {
    return (
        <section className={'campaigns-list list-section'}>
            <TableList
                columns={columns}
                fixedColumns={[0]}
            />
        </section>
    )
}

export default CampaignsList