import {actionField, reasonField, renderCurrencyField, renderNumberField, renderPercentField} from "./const";

export const searchTerms = () => {
    return ([
        {
            title: 'Object',
            dataIndex: 'object',
            key: 'object',
            minWidth: '14.285714285714286rem',
            sorter: true,
        },
        {
            title: 'Object Type',
            dataIndex: 'object_type',
            key: 'object_type',
            minWidth: '14.285714285714286rem',
            sorter: true,
        },
        {
            title: 'Clicks',
            dataIndex: 'clicks',
            key: 'clicks',
            minWidth: '14.285714285714286rem',
            sorter: true,
            align: 'right',
            ...renderNumberField
        },
        {
            title: 'Spend',
            dataIndex: 'spend',
            key: 'spend',
            minWidth: '14.285714285714286rem',
            sorter: true,
            align: 'right',
            ...renderCurrencyField
        },
        {
            title: 'Sales',
            dataIndex: 'sales',
            key: 'sales',
            minWidth: '14.285714285714286rem',
            sorter: true,
            align: 'right',
            ...renderCurrencyField
        },
        {
            title: 'ACoS',
            dataIndex: 'acos',
            key: 'acos',
            minWidth: '14.285714285714286rem',
            sorter: true,
            align: 'right',
            ...renderPercentField
        },
        {
            title: 'Normalized CVR',
            dataIndex: 'normalized',
            key: 'normalized',
            minWidth: '14.285714285714286rem',
            sorter: true,
            align: 'right',
            ...renderPercentField
        },
        {
            ...actionField
        },
        {
            ...reasonField
        },
    ])
};

