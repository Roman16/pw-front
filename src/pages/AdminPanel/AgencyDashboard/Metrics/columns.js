import React from "react"
import {
    impressionsColumn,
    clicksColumn,
    ctrColumn, acosColumn, renderNumberField
} from "../../../Analytics/components/TableList/tableColumns"
import {metricKeys} from "../../../Analytics/componentsV2/MainMetrics/metricsList"

export const columns = (onImpersonate) => [
    {
        title: 'Account Name',
        dataIndex: 'marketplace_name',
        key: 'marketplace_name',
        width: '400px',
        search: true,
        render: (name, item) => <div className={'account-name'}>
            <div className="col">
                <span title={name}><b>{name}</b></span>
                <span title={item.account_name}><b>{item.account_name}</b></span>
                <span title={item.user_email}>{item.user_email}</span>
            </div>

            <button className="btn default" onClick={() => onImpersonate(item.user_email, item.marketplace_id, item.amazon_region_account_marketplace_id)}>
                Impersonate
            </button>
        </div>
    },
    {
        title: 'Project Manager',
        dataIndex: 'project_manager_email',
        key: 'project_manager_email',
        width: '200px',
        render: email => email ? <span title={email} className="trim-text">{email}</span> : '-'
    },
    {
        title: 'PPC Manager',
        dataIndex: 'ppc_manager_email',
        key: 'ppc_manager_email',
        width: '200px',
        render: email => email ? <span title={email} className="trim-text">{email}</span> : '-'
    },
    {
        title: 'Comment',
        dataIndex: 'comment',
        key: 'comment',
        width: '300px',
    },
    {
        ...impressionsColumn,
    },
    {
        ...clicksColumn,
    },
    {
        title: 'Ad Sales',
        dataIndex: 'attributedSales',
        key: 'attributedSales',
        minWidth: '150px',
        sorter: true,
        filter: true,
        align: 'right',
        ...renderNumberField('currency', true, true)
    },
    {
        title: 'Ad Spend',
        dataIndex: 'cost',
        key: 'cost',
        minWidth: '130px',
        sorter: true,
        filter: true,
        align: 'right',
        ...renderNumberField('currency', true, true)
    },
    {
        ...ctrColumn,
    },
    {
        ...acosColumn,
    },
    {
        title: 'CPC',
        dataIndex: 'cpc',
        key: 'cpc',
        minWidth: '90px',
        sorter: true,
        filter: true,
        align: 'right',
        ...renderNumberField('currency', true, true)
    },
    {
        title: 'MACoS',
        dataIndex: 'macos',
        key: 'macos',
        minWidth: '90px',
        align: 'right',
        sorter: true,
        filter: true,
        ...renderNumberField('percent')
    },
    {
        title: 'Margin Percent',
        dataIndex: 'margin_percent',
        key: 'margin_percent',
        minWidth: '160px',
        align: 'right',
        sorter: true,
        filter: true,
        ...renderNumberField('percent')
    },
    {
        title: 'Gross Profit',
        dataIndex: metricKeys['gross_profit'],
        key: metricKeys['gross_profit'],
        minWidth: '130px',
        align: 'right',
        sorter: true,
        filter: true,
        ...renderNumberField('currency', true, true)
    },
    {
        title: 'Total Sales',
        dataIndex: metricKeys['total_sales'],
        key: metricKeys['total_sales'],
        minWidth: '130px',
        align: 'right',
        sorter: true,
        filter: true,
        ...renderNumberField('currency', true, true)
    }
]