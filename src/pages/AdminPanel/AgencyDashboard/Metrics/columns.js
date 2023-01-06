import React from "react"
import {
    impressionsColumn,
    clicksColumn,
    ctrColumn, acosColumn,
    cpcColumn, renderNumberField
} from "../../../Analytics/components/TableList/tableColumns"

export const columns = [
    {
        title: 'Account Name',
        dataIndex: 'marketplace_name',
        key: 'marketplace_name',
        render: (name, item) => <b>{name} <br/> {item.account_name}</b>
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