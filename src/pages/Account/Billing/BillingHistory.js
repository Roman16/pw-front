import React from "react";
import CustomTable from "../../../components/Table/CustomTable";
import visaLogo from '../../../assets/img/visa-logo.svg';
import masterLogo from '../../../assets/img/mastercard.svg';
import moment from "moment";

const BillingHistory = ({historyList, handlePaginationChange, paginationParams}) => {
    const columns = [
        {
            title: 'Invoice Number',
            dataIndex: 'invoice_number',
            key: 'invoice_number',
            width: '20%',
            render: (invoiceNumber, item) => (<a href={item.hosted_invoice_url} target='_blank'>{invoiceNumber}</a>)
        },
        {
            title: 'Card',
            dataIndex: 'card',
            key: 'card',
            width: '15%',
            render: (text, item) => (<span className='card-number'>
                {item.card_type === 'visa' && <img src={visaLogo} alt=""/>}
                {item.card_type === 'master' && <img src={masterLogo} alt=""/>}
                {item.card_number && `**** **** **** ${item.card_number}`}
            </span>)
        },
        {
            title: 'Date Issued',
            dataIndex: 'date_issued',
            key: 'date_issued',
            // render: (date) => (<span>{moment(date).format('MMM DD, YYYY')}</span>)
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Amount Due',
            dataIndex: 'amount_due',
            key: 'amount_due',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
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

            {historyList.length > 0 && <div className='history-list'>
                <h3>Campaign Statistics</h3>

                <CustomTable
                    onChangePagination={handlePaginationChange}
                    dataSource={historyList}
                    columns={columns}
                    currentPage={paginationParams.page}
                    totalSize={paginationParams.totalSize}
                />
            </div>}
        </section>
    )
};

export default BillingHistory;