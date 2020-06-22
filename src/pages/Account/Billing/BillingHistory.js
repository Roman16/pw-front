import React, {Fragment} from "react";
import CustomTable from "../../../components/Table/CustomTable";
import visaLogo from '../../../assets/img/visa-logo.svg';
import masterLogo from '../../../assets/img/mastercard.svg';
import {Icon} from "antd";
import moment from "moment";
import {numberMask} from "../../../utils/numberMask";
import Pagination from "../../../components/Pagination/Pagination";

const BillingHistory = ({historyList, handlePaginationChange, paginationParams, processing}) => {
    const columns = [
        {
            title: 'Date Issued',
            dataIndex: 'date_issued',
            key: 'date_issued',
            render: (date) => <span>{moment(date).format('MMM DD, YYYY')}</span>
        },
        {
            title: 'Transaction Id',
            dataIndex: 'transaction_id',
            key: 'transaction_id',
            minWidth: '200px'
        },
        {
            title: 'Amount Due',
            dataIndex: 'amount_due',
            key: 'amount_due',
            render: (amount, item) => (
                <span>{item.amount_value != null ? `${numberMask(item.amount_value, 2)} ${item.currency_code != null ? item.currency_code : ''}` : 'N/A'}</span>
            )
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            width: '20%',
            render: description => <span className="description">{description}</span>
        },
        {
            title: 'Card',
            dataIndex: 'card',
            key: 'card',
            width: '15%',
            render: (text, item) => (<span className='card-number'>
                {item.card_type === 'visa' && <img src={visaLogo} alt=""/>}
                {item.card_type === 'mastercard' && <img src={masterLogo} alt=""/>}
                {item.card_number && <span>{item.card_number}</span>}
            </span>)
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text) => {
                let status = text;
                status.toUpperCase();
                if ((status === 'PAID') || (status === 'SUCCESS')) {
                    return (<span className='payment-status success'>{text.toLowerCase()}</span>);
                } else if ((status === 'PENDING') || (status === 'WAITING') || (status === 'OPEN') || (status === 'INCOMPLETE')) {
                    return (<span className='payment-status waiting'>{text.toLowerCase()}</span>);
                } else if ((status === 'CANCELLED') || (status === 'VOID') || (status === 'FAILED')) {
                    return (<span className='payment-status error'>{text.toLowerCase()}</span>);
                } else {
                    return (<span className='payment-status'>{text.toLowerCase()}</span>);
                }
            }
        },
        {
            title: 'Actions',
            dataIndex: 'status',
            key: 'status',
            width: '100px',
            render: (invoiceNumber, item) => {
                return (
                    <div className='invoice-actions'>
                        {item.invoice_link &&
                        <a className={'btn icon'} href={item.invoice_link} target='_blank'>
                            <Icon type="eye"/>
                        </a>}

                        {item.invoice_link_pdf && <a className={'btn icon'} href={item.invoice_link_pdf}>
                            <Icon type="file-pdf"/>
                        </a>}
                    </div>)
            }
        },
    ];

    return (
        <section className='billing-history-block' id={'billing-history'}>
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
                    dataSource={historyList}
                    columns={columns}
                    rowClassName={(item) => {
                        const status = item.status.toUpperCase();
                        if ((status === 'PAID') || (status === 'SUCCESS')) return ('success-invoice');
                        if ((status === 'PENDING') || (status === 'WAITING') || (status === 'OPEN') || (status === 'INCOMPLETE')) return ('waiting-invoice');
                        if ((status === 'CANCELLED') || (status === 'VOID') || (status === 'FAILED')) return ('error-invoice');
                    }}
                />

                <Pagination
                    onChange={handlePaginationChange}
                    page={paginationParams.page}
                    pageSizeOptions={[10, 25, 50]}
                    pageSize={paginationParams.pageSize}
                    totalSize={paginationParams.totalSize}
                    listLength={historyList.length}
                    processing={processing}
                />
            </div>}
        </section>
    )
};

export default BillingHistory;