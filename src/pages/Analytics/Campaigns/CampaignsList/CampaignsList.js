import React from "react";
import CustomTable from "../../../../components/Table/CustomTable";
import Pagination from "../../../../components/Pagination/Pagination";
import './CampaignsList.less';
import {SVG} from "../../../../utils/icons";
import {Input} from "antd";

const {Search} = Input;

const CampaignsList = () => {

    const columns = [
        // {
        //     title: 'Active',
        //     dataIndex: 'active',
        //     key: 'active',
        //     width: '100px',
        //     sorter: true
        // },
        {
            title: 'Campaigns',
            dataIndex: 'campaigns',
            key: 'campaigns',
            width: '200px',
            sorter: true
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
            title: 'MACoS',
            dataIndex: 'conversion_rate',
            key: 'conversion_rate',
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
    ];

    return (
        <section className={'campaigns-list'}>
            <div className="form-group">
                <Search
                    className="search-field"
                    placeholder={'Search'}
                    // onChange={e => onSearch(e.target.value)}
                    data-intercom-target='search-field'
                    suffix={<SVG id={'search'}/>}
                />
            </div>


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