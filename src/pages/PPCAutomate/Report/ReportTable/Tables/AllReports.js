import React from 'react';

export const allReports = () => {

    const allSubTabs = {
        'changed-keyword-bid-acos': 'Changed Keyword Bid (ACoS)',
        'changed-keyword-bid-impressions': 'Changed Keyword Bid (Impressions)',
        'paused-keyword-high-acos': 'Paused Keyword (High ACoS)',
        'paused-keyword-no-sales': 'Paused Keyword (No Sales)',
        'paused-keyword-duplicate': 'Paused Keyword Duplicate',
        'paused-keyword-duplicate-of-pat': 'Paused Keyword Duplicate of PAT',
        'paused-keyword-duplicate-from-customer-search-term': 'Paused Keyword Duplicate From CST',

        'changed-pat-bid-acos': 'Changed PAT Bid (ACoS)',
        'changed-pat-bid-impressions': 'Changed PAT Bid (Impressions)',
        'paused-pat-high-acos': 'Paused PAT (High ACoS)',
        'paused-pat-no-sales': 'Paused PAT (No Sales)',
        'paused-pat-duplicate': 'Paused PAT Duplicate',

        'created-campaign': 'Created Campaign',
        'created-ad-group': 'Created Ad Group',
        'created-product-ad': 'Created Product Ad',
        'created-cross-negative-keyword': 'Created Cross-Negative Keyword',
        'created-keyword-cst': 'Created Keyword (CST)',

        'created-negative-keyword-from-cst-high-acos': 'Created Negative Keyword From CST (High ACoS)',
        'created-negative-keyword-from-cst-no-sales': 'Created Negative Keyword From CST (No Sales)',

        'created-cross-negative-pat': 'Created Cross-Negative PAT',
        'created-pat-cst': 'Created PAT (CST)',

        'created-negative-pat-from-cst-high-acos': 'Created Negative PAT From CST (High ACoS)',
        'created-negative-pat-from-cst-no-sales': 'Created Negative PAT From CST (No Sales)',
    };

    return ({
        columns: {
            ['all-reports']: [
                {
                    title: 'Type',
                    dataIndex: 'type',
                    key: 'type',
                    width: '20%',
                    // render: key => <span>{allSubTabs[key]}</span>,
                },
                {
                    title: 'Message',
                    dataIndex: 'info',
                    key: 'info',
                    render: text => <span dangerouslySetInnerHTML={{__html: text}}/>,
                },
            ]
        },
        subTabs: []
    });
};

