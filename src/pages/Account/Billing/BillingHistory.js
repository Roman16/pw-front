import React from "react";
import CustomTable from "../../../components/Table/CustomTable";
import visaLogo from '../../../assets/img/visa-logo.svg';
import masterLogo from '../../../assets/img/mastercard.svg';
import {Icon} from "antd";
import moment from "moment";

const BillingHistory = ({historyList, handlePaginationChange, paginationParams}) => {
    const columns = [
        {
            title: 'Date Issued',
            dataIndex: 'date_issued',
            key: 'date_issued',
            // render: (date) => (<span>{moment(date).format('MMM DD, YYYY')}</span>)
        },
        {
            title: 'Amount Due',
            dataIndex: 'amount_due',
            key: 'amount_due',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
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
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text) => <b>{text}</b>
        },
        {
            title: 'Actions',
            dataIndex: 'status',
            key: 'status',
            render: (invoiceNumber, item) => (
                <div className='invoice-actions'>
                    <a href={item.hosted_invoice_url} target='_blank'>
                        <Icon type="eye"/>
                    </a>
                    <a href={item.invoice_pdf}>
                        <Icon type="file-pdf"/>
                    </a>
                </div>
            )
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