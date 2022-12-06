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
    },
    impressionsColumn,
    clicksColumn,
    adSalesColumn,
    adSpendColumn,
    ctrColumn,
    acosColumn,
    cpcColumn
]