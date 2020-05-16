import {actionField, reasonField, renderCurrencyField, renderNumberField, renderPercentField} from "./const";

export const targetingImprovements = () => {
    return ([
        {
            title: 'Keyword / PT',
            dataIndex: 'keyword_PT',
            key: 'keyword_PT',
            minWidth: '14.285714285714286rem',
            filter: true,
        },
        {
            title: 'Match Type',
            dataIndex: 'match_type',
            key: 'match_type',
            minWidth: '14.285714285714286rem',
            filter: true,
        },
        {
            title: 'Campaign',
            dataIndex: 'campaign_name',
            key: 'campaign_name',
            minWidth: '14.285714285714286rem',
            sorter: true,
            filter: true
        },
        {
            title: 'Ad Group',
            dataIndex: 'ad_group_name',
            key: 'ad_group_name',
            minWidth: '14.285714285714286rem',
            sorter: true,
            filter: true
        },
        {
            title: 'Impressions',
            dataIndex: 'impressions',
            key: 'impressions',
            minWidth: '14.285714285714286rem',
            sorter: true,
            filter: true,
            align: 'right',
            ...renderNumberField
        },
        {
            title: 'Clicks',
            dataIndex: 'clicks',
            key: 'clicks',
            minWidth: '14.285714285714286rem',
            sorter: true,
            filter: true,
            align: 'right',
            ...renderNumberField
        },
        {
            title: 'Spend',
            dataIndex: 'spend',
            key: 'spend',
            minWidth: '14.285714285714286rem',
            sorter: true,
            filter: true,
            align: 'right',
            ...renderCurrencyField
        },
        {
            title: 'Sales',
            dataIndex: 'sales',
            key: 'sales',
            minWidth: '14.285714285714286rem',
            sorter: true,
            filter: true,
            align: 'right',
            ...renderCurrencyField
        },
        {
            title: 'ACoS',
            dataIndex: 'acos',
            key: 'acos',
            minWidth: '14.285714285714286rem',
            sorter: true,
            filter: true,
            align: 'right',
            ...renderPercentField
        },
        {
            title: 'Normalized CVR',
            dataIndex: 'normalized_cvr',
            key: 'normalized_cvr',
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

