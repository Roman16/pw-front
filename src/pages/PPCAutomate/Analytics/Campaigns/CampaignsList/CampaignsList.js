import React from "react";
import CustomTable from "../../../../../components/Table/CustomTable";
import {dateField, infoField, sorterByKeywordField} from "../../../Report/ReportTable/Tables/const";
import Pagination from "../../../../../components/Pagination/Pagination";
import './CampaignsList.less';


const CampaignsList = () => {

    const columns = [
        {
            title: 'Active',
            dataIndex: 'active',
            key: 'active',
            width: '100px',
            filter: true
        },
        {
            title: 'Campaigns',
            dataIndex: 'campaigns',
            key: 'campaigns',
            width: '200px',
            filter: true
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: '150px',
            filter: true
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            width: '200px',
            filter: true
        },
        {
            title: 'Portfolio',
            dataIndex: 'portfolio',
            key: 'portfolio',
            width: '150px',
            filter: true
        },
        {
            title: 'Campaign bidding strategy',
            dataIndex: 'bidding_strategy',
            key: 'bidding_strategy',
            width: '250px',
            filter: true
        },
        {
            title: 'Start date',
            dataIndex: 'start_date',
            key: 'start_date',
            width: '150px',
            filter: true
        },
        {
            title: 'Daily Budget',
            dataIndex: 'daily_budget',
            key: 'daily_budget',
            width: '150px',
            filter: true
        },
        {
            title: 'Impressions',
            dataIndex: 'impressions',
            key: 'impressions',
            width: '150px',
            filter: true
        },
        {
            title: 'Clicks',
            dataIndex: 'clicks',
            key: 'clicks',
            width: '150px',
            filter: true
        },
        {
            title: 'CTR',
            dataIndex: 'ctr',
            key: 'ctr',
            width: '150px',
            filter: true
        },
        {
            title: 'Spend',
            dataIndex: 'spend',
            key: 'spend',
            width: '150px',
            filter: true
        },
        {
            title: 'CPC',
            dataIndex: 'cpc',
            key: 'cpc',
            width: '150px',
            filter: true
        },
        {
            title: 'Orders',
            dataIndex: 'orders',
            key: 'orders',
            width: '150px',
            filter: true
        },
        {
            title: 'Sales',
            dataIndex: 'sales',
            key: 'sales',
            width: '150px',
            filter: true
        },
        {
            title: 'ACoS',
            dataIndex: 'acos',
            key: 'acos',
            width: '150px',
            filter: true
        },
        {
            title: 'Conversion Rate',
            dataIndex: 'conversion_rate',
            key: 'conversion_rate',
            width: '150px',
            filter: true
        },
        {
            title: 'CPA',
            dataIndex: 'cpa',
            key: 'cpa',
            width: '150px',
            filter: true
        },
        {
            title: 'Profit',
            dataIndex: 'profit',
            key: 'profit',
            width: '150px',
            filter: true
        },
    ];

    return (
        <section className={'campaigns-list'}>
            <CustomTable
                // onChangeSorter={sortChangeHandler}
                // loading={processing}
                // dataSource={reportsList}
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