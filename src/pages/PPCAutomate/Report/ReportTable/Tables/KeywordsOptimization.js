import React from 'react';

export const keywordsOptimization = () => {
    return ([
        {
            title: "Campaign",

            dataIndex: 'd_campaignName',
            key: 'd_campaignName',
            width: '180px',
            sorter: true,
        },
        {
            title: 'Ad Group',
            dataIndex: 'd_adGroupName',
            key: 'd_adGroupName',
            width: '180px',
            sorter: true,
        },
        {
            title: 'Keyword',
            dataIndex: 'd_keywordText',
            key: 'd_keywordText',
            width: '200px',
            sorter: true,
        },
        {
            title: 'Match Type',
            dataIndex: 'd_keywordMatchType',
            key: 'd_keywordMatchType',
            width: '11em',
            render: (str) => (<span className="capitalize-field"> {str}</span>),
            sorter: true,
        }
    ]);
};