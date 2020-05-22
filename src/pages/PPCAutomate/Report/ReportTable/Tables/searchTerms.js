import {actionField, reasonField, renderCurrencyField, renderNumberField, renderPercentField} from "./const";

export const searchTerms = () => {
    return ([
        {
            title: 'Object',
            dataIndex: 'object',
            key: 'object',
            width: '15.714285714285714rem',
            filter: true,
        },
        {
            title: 'Object Type',
            dataIndex: 'object_type',
            key: 'object_type',
            width: '14.285714285714286rem',
            filter: true,
        },
        {
            title: 'Clicks',
            dataIndex: 'clicks',
            key: 'clicks',
            minWidth: '100px',
            sorter: true,
            filter: true,
            align: 'right',
            ...renderNumberField
        },
        {
            title: 'Spend',
            dataIndex: 'spend',
            key: 'spend',
            minWidth: '100px',
            sorter: true,
            filter: true,
            align: 'right',
            ...renderCurrencyField
        },
        {
            title: 'Sales',
            dataIndex: 'sales',
            key: 'sales',
            minWidth: '100px',
            sorter: true,
            filter: true,
            align: 'right',
            ...renderCurrencyField
        },
        {
            title: 'ACoS',
            dataIndex: 'acos',
            key: 'acos',
            minWidth: '100px',
            sorter: true,
            filter: true,
            align: 'right',
            ...renderPercentField
        },
        {
            title: 'Normalized CVR',
            dataIndex: 'normalized',
            key: 'normalized',
            minWidth: '12.142857142857142rem',
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

