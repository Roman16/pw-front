import React from "react"
import {
    impressionsColumn,
    clicksColumn,
    ctrColumn, acosColumn,
    cpcColumn, renderNumberField
} from "../../Analytics/components/TableList/tableColumns"

export const columns = [
    {
        title: 'Account Name',
        dataIndex: 'name',
        key: 'name',
        render: (i, item) => <b>{item.account_alias || item.seller_id} <br/> {item.marketplace_id}</b>
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
        ...cpcColumn, sorter: false,
    }
]