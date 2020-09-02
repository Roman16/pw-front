import React from "react"
import CustomTable from "../../../../components/Table/CustomTable"
import Pagination from "../../../../components/Pagination/Pagination"
import './CampaignsList.less'
import {SVG} from "../../../../utils/icons"
import TableFilters from '../../components/TableFilters/TableFilters'
import {Link} from "react-router-dom"
import {
    acosColumn, adCvrColumn, adOrdersColumn, adProfitColumn,
    adSalesColumn,
    adSpendColumn, adUnitsColumn, budgetAllocationColumn,
    clicksColumn, cpaColumn, cpcColumn,
    ctrColumn,
    dateColumn,
    impressionsColumn, roasColumn, salesShareColumn,
    statusColumn
} from "../../components/tableColumns"
import DateRange from "../../components/DateRange/DateRange"
import TableList from "../../components/TableList/TableList"

const demoData = [
    {
        id: 123,
        campaign: 'Test Test',
        status: 'active'
    },

    {
        id: 323,
        campaign: 'Test Test Test'
    },

]

const demoTotalData = {
    campaign: 'Total: 2'
}

const columns = [
    {
        title: 'Campaign',
        dataIndex: 'campaign',
        key: 'campaign',
        width: '200px',
        sorter: true,
        filter: true,
        render: (campaign, item) => (<Link to={`/analytics/ad-groups?campaignId=${item.id}`}>{campaign}</Link>)
    },
    {
        ...statusColumn
    },
    {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
        width: '200px',
        sorter: true
    },
    {
        title: 'Portfolio',
        dataIndex: 'portfolio',
        key: 'portfolio',
        width: '150px',
        sorter: true
    },
    {
        title: 'Campaign bidding strategy',
        dataIndex: 'bidding_strategy',
        key: 'bidding_strategy',
        width: '250px',
        sorter: true
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


    const sortChangeHandler = (column) => {
        console.log(column)
    }

    const paginationChangeHandler = (column) => {
        console.log(column)
    }

    return (
        <section className={'campaigns-list list-section'}>
            <TableFilters
                columns={columns}
            />

            <TableList
                sortChangeHandler={sortChangeHandler}
                data={demoData}
                totalData={demoTotalData}
                columns={columns}
                paginationChangeHandler={paginationChangeHandler}
                fixedColumns={[0]}
                paginationParams={{
                    page: 1,
                    pageSizeOptions: [10, 50, 100],
                    pageSize: 10,
                    totalSize: 2,
                    listLength: 2,
                    processing: false
                }}
            />
        </section>
    )
}

export default CampaignsList