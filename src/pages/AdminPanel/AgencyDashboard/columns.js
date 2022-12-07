import {
    impressionsColumn,
    clicksColumn,
    adSpendColumn,
    ctrColumn, acosColumn,
    cpcColumn, adSalesColumn
} from "../../Analytics/components/TableList/tableColumns"

export const columns = [
    {
        title: 'Account Name',
        dataIndex: 'name',
        key: 'name',
        render: (i, item) => `${item.account_alias || item.seller_id} ${item.marketplace_id}`
    },
    {
        ...impressionsColumn, sorter: false,
    },
    {
        ...clicksColumn, sorter: false,
    },
    {
        ...adSalesColumn, sorter: false,
    },
    {
        ...adSpendColumn, sorter: false,
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