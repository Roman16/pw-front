export const allReports = () => {

    const allSubTabs = {
        'changed-keyword-bid-acos': 'Changed Keyword Bid (ACoS)',
        'changed-keyword-bid-impressions': 'Changed Keyword Bid (Impressions)',
        'paused-keyword-high-acos': 'Paused Keyword (High ACoS)',
        'paused-keyword-no-sales': 'Paused Keyword (No Sales)',
        'paused-keyword-duplicate': 'Paused Keyword Duplicate',
        'paused-keyword-duplicate-of-pat': 'Paused Keyword Duplicate of PAT',
        'paused-keyword-duplicate-from-customer-search-term': 'Paused Keyword Duplicate From CST',
        'revert-last-change-keyword-no-sales': 'revert-last-change-keyword-no-sales',

        'changed-pat-bid-acos': 'Changed PAT Bid (ACoS)',
        'changed-pat-bid-impressions': 'Changed PAT Bid (Impressions)',
        'paused-pat-high-acos': 'Paused PAT (High ACoS)',
        'paused-pat-no-sales': 'Paused PAT (No Sales)',
        'paused-pat-duplicate': 'Paused PAT Duplicate',
        'revert-last-change-pat-no-sales': 'revert-last-change-pat-no-sales',

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
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            minWidth: '14.285714285714286rem',
        },
        {
            title: 'Reason',
            dataIndex: 'reason',
            key: 'reason',
            minWidth: '14.285714285714286rem',
        },
    ])
};

