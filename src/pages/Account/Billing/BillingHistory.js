import React from "react";
import CustomTable from "../../../components/Table/CustomTable";

const BillingHistory = ({history}) => {
    const columns = [
        {
            title: 'Invoice Number',
            dataIndex: 'id',
            width: '300px',
        },
        {
            title: 'Card',
            dataIndex: 'total_changes',
            key: 'total_changes',
            width: '50px',
        },
        {
            title: 'Date Issued',
            dataIndex: 'budget_allocation',
            key: 'budget_allocation',
            width: 100,
        },
        {
            title: 'Description',
            dataIndex: 'sales_share',
            key: 'sales_share',
            width: 100,
        },
        {
            title: 'CPA',
            dataIndex: 'cpa',
            key: 'cpa',
            width: 100,
        },
        {
            title: 'Amount Due',
            dataIndex: 'conversion_rate',
            key: 'conversion_rate',
            width: 100,
        },
        {
            title: 'Status',
            dataIndex: 'acos',
            key: 'acos',
            width: 100,
        },
    ];

    return (
        <section className='billing-history-block'>
            <div className='block-description'>
                <h3>
                    Billing History
                </h3>

                <span>
                    Access your store's account summary and <br/> review your monthly bill.
                </span>
            </div>

            {/*<div className='history-list'>*/}
            {/*    <h3>Campaign Statistics</h3>*/}

            {/*    <CustomTable*/}
            {/*        // onChangePagination={handlePaginationChange}*/}
            {/*        // loading={loading}*/}
            {/*        // dataSource={data}*/}
            {/*        columns={columns}*/}
            {/*        // currentPage={currentPage}*/}
            {/*        // totalSize={totalSize}*/}
            {/*    />*/}
            {/*</div>*/}
        </section>
    )
};

export default BillingHistory;