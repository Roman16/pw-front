import React from "react";

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

export const subChangesCount = (counts = [], type, countsWithNew = []) => {
    if (Array.isArray(counts)) {
        const countObject = counts.find(item => item.type === type) || null,
            hasNewReport = countsWithNew.find(item => item.type === type) || false;

        return (countObject ? {
            ...countObject,
            hasNewReport: hasNewReport
        } : {
            count: 0,
            hasNewReport: false
        });
    }
};

export const mainChangesCount = (counts = [], type) => {
    let count = 0;
    if (Array.isArray(counts)) {
        mainTypeList[type].forEach((type) => {
            if (counts.find(item => item.type === type)) {
                count = count + +counts.find(item => item.type === type).count;
            }
        });
    }

    return count || 0;
};

export const mainHasNewReport = (countsWithNew = [], type) => {
    let hasNew = false;

    if (Array.isArray(countsWithNew)) {
        mainTypeList[type].forEach((type) => {
            if (countsWithNew.find(item => item.type === type)) {
                hasNew = true;
            }
        });
    }

    return hasNew;
};
