import React from "react";
import CustomTable from "../../../../components/Table/CustomTable";
import Pagination from "../../../../components/Pagination/Pagination";
import './CampaignsList.less';
import {SVG} from "../../../../utils/icons";
import {Input} from "antd";

const {Search} = Input;

const CampaignsList = () => {

    const columns = [
        {
            title: 'Active',
            dataIndex: 'active',
            key: 'active',
            width: '100px',
            sorter: true
        },
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