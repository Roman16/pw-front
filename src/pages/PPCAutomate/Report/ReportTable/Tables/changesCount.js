const mainTypeList = {
    "keywords-optimization": [
        'changed-keyword-bid-acos',
        'changed-keyword-bid-impressions',
        'paused-keyword-high-acos',
        'paused-keyword-no-sales'
    ],
    "pats-optimization": [
        'changed-pat-bid-acos',
        'changed-pat-bid-impressions',
        'paused-manual-pat-high-acos',
        'paused-manual-pat-no-sales'
    ],
    "new-keywords": [
        'created-campaign',
        'created-ad-group',
        'created-product-ad',
        'created-cross-negative-keyword',
        'created-keyword-cst'
    ],
    "new-negative-keywords": [
        'created-negative-keyword-from-cst-high-acos',
        'created-negative-keyword-from-cst-no-sales'
    ],
    "new-pats": [
        'created-cross-negative-pat',
        'created-pat-cst'
    ],
    "new-negative-pats": [
        'created-negative-pat-from-cst-high-acos',
        'created-negative-pat-from-cst-no-sales'
    ]
};

export const subChangesCount = (counts, type) => {
    const countObject = counts.find(item => item.type === type) || null;
    return (countObject ? countObject.count : 0);
};

export const mainChangesCount = (counts, type) => {
    console.log(counts);
    console.log(type);
    const count = mainTypeList[type].reduce((accumulator, type) => {
        if (counts.find(item => item.type === type)) {
            accumulator = +counts.find(item => item.type === type).count;
        }
    }, 0);

    return count || 0;
};
