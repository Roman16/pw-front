import React, {useEffect, useState} from "react"
import CustomTable from "../../../components/Table/CustomTable"
import visaLogo from '../../../assets/img/visa-logo.svg'
import masterLogo from '../../../assets/img/mastercard.svg'
import {Icon} from "antd"
import moment from "moment"
import {numberMask} from "../../../utils/numberMask"
import Pagination from "../../../components/Pagination/Pagination"
import './BillingHistory.less'
import {userService} from "../../../services/user.services"


const columns = [
    {
        title: 'Date Issued',
        dataIndex: 'date_issued',
        key: 'date_issued',
        width: '200px',
        render: (date) => moment(date).format('MMM DD, YYYY')
    },
    {
        title: 'Amount Due',
        dataIndex: 'amount_due',
        key: 'amount_due',
        width: '200px',
        render: (amount, item) => item.amount_value != null ? `${numberMask(item.amount_value, 2)} ${item.currency_code != null ? item.currency_code : ''}` : 'N/A'
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        minWidth: '300px',
    },
    {
        title: 'Payment method',
        dataIndex: 'card',
        key: 'card',
        width: '200px',
        render: (text, item) => (<span className='card-number'>
            {item.card_number && <span>**** **** **** {item.card_number}</span>}
            </span>)
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        width: '200px',
        render: (status, item) => {
            return (<div className="status-field">
                {status.toLowerCase()}

                <div className='invoice-actions'>
                    {item.invoice_link &&
                    <a className={'btn icon'} href={item.invoice_link} target='_blank'>
                        <EyeIcon/>
                    </a>}

                    {item.invoice_link_pdf && <a className={'btn icon'} href={item.invoice_link_pdf}>
                        <DownloadIcon/>
                    </a>}
                </div>
            </div>)
        }
    }
]

const BillingHistory = () => {
    const [processing, setProcessing] = useState(true),
        [historyList, setHistoryList] = useState([]),
        [paginationParams, setPaginationParams] = useState({
            page: 1,
            pageSize: 10,
            totalSize: 0
        })

    const getHistory = async () => {
        setProcessing(true)

        try {
            const historyData = await userService.fetchBillingHistory(paginationParams)
            setHistoryList(historyData.result)

            setPaginationParams({
                ...paginationParams,
                totalSize: historyData.totalSize
            })
        } catch (e) {
            console.log(e)
        }

        setProcessing(false)
    }

    useEffect(() => {
        getHistory()
    }, [paginationParams.page, paginationParams.pageSize])

    return (
        <section className='billing-history'>
            <h3>Billing History</h3>

            <p>Access your store’s account summary and review your monthly bill.</p>

            <div className="table-block">
                <CustomTable
                    dataSource={historyList}
                    columns={columns}
                    loading={processing}
                    emptyText={'image'}
                    rowClassName={(item) => {
                        const status = item.status.toUpperCase()
                        if ((status === 'PAID') || (status === 'SUCCESS')) return ('success-invoice')
                        if ((status === 'PENDING') || (status === 'WAITING') || (status === 'OPEN') || (status === 'INCOMPLETE')) return ('waiting-invoice')
                        if ((status === 'CANCELLED') || (status === 'VOID') || (status === 'FAILED')) return ('error-invoice')
                    }}
                />

                <Pagination
                    onChange={(data) => setPaginationParams({...paginationParams, ...data})}
                    page={paginationParams.page}
                    pageSizeOptions={[10, 25, 50]}
                    pageSize={paginationParams.pageSize}
                    totalSize={paginationParams.totalSize}
                    listLength={historyList.length}
                    processing={processing}
                />
            </div>
        </section>
    )
}

const EyeIcon = () => <svg width="20" height="13" viewBox="0 0 20 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="mask0_20958:65799" maskUnits="userSpaceOnUse" x="0" y="-4" width="20" height="20">
        <rect y="-4" width="20" height="20" fill="#C4C4C4"/>
    </mask>
    <g>
        <path stroke={'none'} d="M12.5 6.5C12.5 7.84388 11.3783 8.9375 10 8.9375C8.62167 8.9375 7.5 7.84388 7.5 6.5C7.5 5.15612 8.62167 4.0625 10 4.0625C11.3783 4.0625 12.5 5.15612 12.5 6.5ZM20 6.13519C20 6.13519 16.4567 13 10.0125 13C4.02917 13 0 6.13519 0 6.13519C0 6.13519 3.705 0 10.0125 0C16.4242 0 20 6.13519 20 6.13519ZM14.1667 6.5C14.1667 4.25994 12.2975 2.4375 10 2.4375C7.7025 2.4375 5.83333 4.25994 5.83333 6.5C5.83333 8.74006 7.7025 10.5625 10 10.5625C12.2975 10.5625 14.1667 8.74006 14.1667 6.5Z"/>
    </g>
</svg>

const DownloadIcon = () => <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
    <mask id="mask0_20958:65800" maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
        <rect x="0.5" y="0.5" width="19" height="19" fill="#C4C4C4" stroke="#353A3E"/>
    </mask>
    <g>
        <path d="M10 1V13M10 13L6 9M10 13L14 9"  stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round"/>
        <path
            d="M2 15C2 14.4477 1.55228 14 1 14C0.447715 14 0 14.4477 0 15H2ZM20 15C20 14.4477 19.5523 14 19 14C18.4477 14 18 14.4477 18 15H20ZM0 15V18.5H2V15H0ZM1.5 20H18.5V18H1.5V20ZM20 18.5V15H18V18.5H20ZM18.5 20C19.3284 20 20 19.3284 20 18.5H18C18 18.2239 18.2239 18 18.5 18V20ZM0 18.5C0 19.3284 0.671573 20 1.5 20V18C1.77614 18 2 18.2239 2 18.5H0Z"
            stroke={'none'}/>
    </g>
</svg>


export default BillingHistory