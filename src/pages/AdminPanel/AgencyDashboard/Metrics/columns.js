import React from "react"
import {
    impressionsColumn,
    clicksColumn,
    ctrColumn, acosColumn, renderNumberField
} from "../../../Analytics/components/TableList/tableColumns"

export const columns = [
    {
        title: 'Account Name',
        dataIndex: 'marketplace_name',
        key: 'marketplace_name',
        width: '250px',
        render: (name, item) => <b>{name} <br/> {item.account_name}</b>
    },
    {
        title: 'Project Manager',
        dataIndex: 'project_manager_email',
        key: 'project_manager_email',
        width: '200px',
        render: email => email || '-'
    },
    {
        title: 'PPC Manager',
        dataIndex: 'ppc_manager_email',
        key: 'ppc_manager_email',
        width: '200px',
        render: email => email || '-'
    },
    {
        ...impressionsColumn, sorter: false,
    },
    {
        ...clicksColumn, sorter: false,
    },
    {
        title: 'Ad Sales',
        dataIndex: 'attributedSales',
        key: 'attributedSales',
        minWidth: '150px',
        sorter: false,
        filter: true,
        align: 'right',
        ...renderNumberField('currency', true, true)
    },
    {
        title: 'Ad Spend',
        dataIndex: 'cost',
        key: 'cost',
        minWidth: '130px',
        sorter: false,
        filter: true,
        align: 'right',
        ...renderNumberField('currency', true, true)
    },
    {
        ...ctrColumn, sorter: false,
    },
    {
        ...acosColumn, sorter: false,
    },
    {
        title: 'CPC',
        dataIndex: 'cpc',
        key: 'cpc',
        minWidth: '90px',
        sorter: false,
        filter: true,
        align: 'right',
        ...renderNumberField('currency', true, true)
    }
]