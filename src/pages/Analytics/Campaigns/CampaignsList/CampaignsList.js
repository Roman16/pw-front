import React from "react";
import CustomTable from "../../../../components/Table/CustomTable";
import Pagination from "../../../../components/Pagination/Pagination";
import './CampaignsList.less';
import {SVG} from "../../../../utils/icons";
import TableFilters from '../../components/TableFilters/TableFilters';
import {Link} from "react-router-dom";

const demoData = [
    {
        id: 123,
        campaign: 'Test Test'
    },

    {
        id: 323,
        campaign: 'Test Test Test'
    },

];


const CampaignsList = () => {

    const columns = [
        {
            title: 'Campaigns',
            dataIndex: 'campaign',
            key: 'campaign',
            width: '200px',
            sorter: true,
            filter: true,
            render: (campaign, item) => (<Link to={`/analytics/ad-groups?campaignId=${item.id}`}>{campaign}</Link>)
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: '150px',
            sorter: true
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
            sorter: true
        },
        {
            title: 'End date',
            dataIndex: 'start_date',
            key: 'start_date',
            width: '150px',
            sorter: true
        },
        {
            title: 'Budget',
            dataIndex: 'daily_budget',
            key: 'daily_budget',
            width: '150px',
            sorter: true
        },
        {
            title: 'Impressions',
            dataIndex: 'impressions',
            key: 'impressions',
            width: '150px',
            sorter: true
        },
        {
            title: 'Clicks',
            dataIndex: 'clicks',
            key: 'clicks',
            width: '150px',
            sorter: true
        },
        {
            title: 'CTR',
            dataIndex: 'ctr',
            key: 'ctr',
            width: '150px',
            sorter: true
        },
        {
            title: 'Ad Spend',
            dataIndex: 'spend',
            key: 'spend',
            width: '150px',
            sorter: true
        },
        {
            title: 'CPC',
            dataIndex: 'cpc',
            key: 'cpc',
            width: '150px',
            sorter: true
        },
        {
            title: 'Ad Sales',
            dataIndex: 'ad_sales',
            key: 'ad_sales',
            width: '150px',
            sorter: true
        },
        {
            title: 'ACoS',
            dataIndex: 'acos',
            key: 'acos',
            width: '150px',
            sorter: true
        },
        {
            title: 'Ad CVR',
            dataIndex: 'cpa',
            key: 'cpa',
            width: '150px',
            sorter: true
        },
        {
            title: 'CPA',
            dataIndex: 'cpa',
            key: 'cpa',
            width: '150px',
            sorter: true
        },
        {
            title: 'Ad Orders',
            dataIndex: 'cpa',
            key: 'cpa',
            width: '150px',
            sorter: true
        },
        {
            title: 'Ad Units',
            dataIndex: 'cpa',
            key: 'cpa',
            width: '150px',
            sorter: true
        },
        {
            title: 'ROAS',
            dataIndex: 'cpa',
            key: 'cpa',
            width: '150px',
            sorter: true
        },
        {
            title: 'Sales Share',
            dataIndex: 'cpa',
            key: 'cpa',
            width: '150px',
            sorter: true
        },
        {
            title: 'Budget Allocation',
            dataIndex: 'profit',
            key: 'profit',
            width: '250px',
            sorter: true
        },
        {
            title: 'Ad Profit',
            dataIndex: 'profit',
            key: 'profit',
            width: '250px',
            sorter: true
        },
    ];

    return (
        <section className={'campaigns-list'}>
            <TableFilters
                columns={columns}
            />

            <CustomTable
                // onChangeSorter={sortChangeHandler}
                // loading={processing}
                dataSource={demoData}
                // sorterColumn={sorterColumn}
                columns={columns}
                // rowClassName={(item) => !item.viewed && 'new-report'}
            />


            {/*<Pagination*/}
            {/*    onChange={paginationChangeHandler}*/}
            {/*    page={paginationParams.page}*/}
            {/*    pageSizeOptions={[25, 50, 100, 200]}*/}
            {/*    pageSize={paginationParams.pageSize}*/}
            {/*    totalSize={totalSize}*/}
            {/*    listLength={reportsList.length}*/}
            {/*    processing={processing}*/}
            {/*/>*/}
        </section>
    )
};

export default CampaignsList;