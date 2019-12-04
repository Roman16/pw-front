import React, {Fragment} from "react";
import CustomTable from "../../../components/Table/CustomTable";
import visaLogo from '../../../assets/img/visa-logo.svg';
import masterLogo from '../../../assets/img/mastercard.svg';
import {Icon} from "antd";
import moment from "moment";
import {numberMask} from "../../../utils/numberMask";

const BillingHistory = ({historyList, handlePaginationChange, paginationParams}) => {
    const columns = [
        {
            title: 'Date Issued',
            dataIndex: 'date_issued',
            key: 'date_issued',
            render: (date) => <span>{moment(date).format('MMM DD, YYYY')}</span>
        },
        {
            title: 'Amount Due',
            dataIndex: 'amount_due',
            key: 'amount_due',
            render: (amount, item) => (
                <span>{numberMask(item.amount_value, 2)} {item.currency_code}</span>
            )
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
            render: (text) => {
                let status = text;
                status.toUpperCase();
                if ((status === 'PAID') || (status === 'SUCCESS')) return (
                    <span className='payment-status success'>{text.toLowerCase()}</span>);
                if ((status === 'PENDING') || (status === 'WAITING') || (status === 'OPEN')) return (
                    <span className='payment-status waiting'>{text.toLowerCase()}</span>);
                if ((status === 'CANCELLED') || (status === 'VOID') || (status === 'FAILED')) return (
                    <span className='payment-status error'>{text.toLowerCase()}</span>);
            }
        },
        {
            title: 'Actions',
            dataIndex: 'status',
            key: 'status',
            render: (invoiceNumber, item) => {
                const status = item.status.toUpperCase();
                if ((status !== 'CANCELLED') && (status !== 'VOID') && (status !== 'FAILED')) return (
                    <div className='invoice-actions'>
                        <a href={`https://pay.stripe.com/invoice/${item.invoice_link_id}`} target='_blank'>
                            <Icon type="eye"/>
                        </a>
                        <a href={`https://pay.stripe.com/invoice/${item.invoice_link_id}/pdf`}>
                            <Icon type="file-pdf"/>
                        </a>
                    </div>)
            }
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

            {paginationParams.totalSize > 0 &&
            <div className={`history-list ${paginationParams.totalSize > 10 && 'full-list'}`}>
                <CustomTable
                    onChangePagination={handlePaginationChange}
                    dataSource={historyList}
                    columns={columns}
                    currentPage={paginationParams.page}
                    totalSize={paginationParams.totalSize}
                    pageSize={paginationParams.pageSize}
                    rowClassName={(item) => {
                        const status = item.status.toUpperCase();
                        if ((status === 'PAID') || (status === 'SUCCESS')) return ('success-invoice');
                        if ((status === 'PENDING') || (status === 'WAITING') || (status === 'OPEN')) return ('waiting-invoice');
                        if ((status === 'CANCELLED') || (status === 'VOID') || (status === 'FAILED')) return ('error-invoice');
                    }}
                />
            </div>}
        </section>
    )
};

export default BillingHistory;