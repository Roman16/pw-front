import React from "react";
import CustomTable from "../../../../components/Table/CustomTable";
import Pagination from "../../../../components/Pagination/Pagination";
import './AdGroupsList.less';
import {SVG} from "../../../../utils/icons";
import {Input} from "antd";
import TableFilters from "../../components/TableFilters/TableFilters";

const {Search} = Input;

const AdGroupsList = () => {

    const columns = [
        {
            title: 'Ad Group',
            dataIndex: 'ad_group',
            key: 'ad_group',
            minWidth: '200px',
            sorter: true
        },

        {
            title: 'Default bid',
            dataIndex: 'default_bid',
            key: 'default_bid',
            minWidth: '200px',
            sorter: true
        },

        {
            title: 'Total Targets',
            dataIndex: 'total_targets',
            key: 'total_targets',
            minWidth: '200px',
            sorter: true
        },

        {
            title: 'Products',
            dataIndex: 'products',
            key: 'products',
            minWidth: '200px',
            sorter: true
        },

        {
            title: 'Impressions',
            dataIndex: 'products',
            key: 'products',
            minWidth: '200px',
            sorter: true
        },
        {
            title: 'Clicks',
            dataIndex: 'products',
            key: 'products',
            minWidth: '200px',
            sorter: true
        },
        {
            title: 'CTR',
            dataIndex: 'products',
            key: 'products',
            minWidth: '200px',
            sorter: true
        },
        {
            title: 'Ad Spend',
            dataIndex: 'products',
            key: 'products',
            minWidth: '200px',
            sorter: true
        },
        {
            title: 'CPC',
            dataIndex: 'products',
            key: 'products',
            minWidth: '200px',
            sorter: true
        },
        {
            title: 'Ad Sales',
            dataIndex: 'products',
            key: 'products',
            minWidth: '200px',
            sorter: true
        },
        {
            title: 'ACoS',
            dataIndex: 'products',
            key: 'products',
            minWidth: '200px',
            sorter: true
        },
        {
            title: 'Ad CVR',
            dataIndex: 'products',
            key: 'products',
            minWidth: '200px',
            sorter: true
        },
        {
            title: 'CPA',
            dataIndex: 'products',
            key: 'products',
            minWidth: '200px',
            sorter: true
        },
        {
            title: 'Ad Orders',
            dataIndex: 'products',
            key: 'products',
            minWidth: '200px',
            sorter: true
        },
        {
            title: 'Ad Units',
            dataIndex: 'products',
            key: 'products',
            minWidth: '200px',
            sorter: true
        },
        {
            title: 'ROAS',
            dataIndex: 'products',
            key: 'products',
            minWidth: '200px',
            sorter: true
        },
        {
            title: 'Sales Share',
            dataIndex: 'products',
            key: 'products',
            minWidth: '200px',
            sorter: true
        },
        {
            title: 'Budget Allocation',
            dataIndex: 'products',
            key: 'products',
            minWidth: '200px',
            sorter: true
        },
        {
            title: 'Ad Profit',
            dataIndex: 'products',
            key: 'products',
            minWidth: '200px',
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

export default AdGroupsList;