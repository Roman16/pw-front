import React, {useEffect, useState} from 'react';
import moment from 'moment';
import TableButton from '../TableButton/TableButton';
import {indexField, createdKeywordsActionField, infoField} from './const';
import {useSelector} from "react-redux";
import CustomTable from "./CustomTable";

const createdCampaign = 'created-campaign';
const createdAdGroup = 'created-ad-group';
const createdProductAd = 'created-product-ad';
const createdCrossNegativeKeyword = 'created-cross-negative-keyword';
const createdKeywordCST = 'created-keyword-cst';

const defaultKeys = [
    {
        ...indexField
    },
    {
        title: 'Campaign',
        dataIndex: 'campaign',
        key: 'campaign',
        width: '150px',
    }
];

const columns = {
    [createdCampaign]: [
        ...defaultKeys,
        {
            title: 'Ad Group',
            dataIndex: 'adGroup',
            key: 'adGroup',
            width: '150px',
        },
        {
            title: 'Campaign Targeting Type',
            dataIndex: 'campaignTargetingType',
            key: 'campaignTargetingType'
        },
        {
            title: 'Daily Budget',
            dataIndex: 'dailyBudget',
            key: 'dailyBudget',
            render: text => <span>${text}</span>

        },
        {
            title: 'Start Date.',
            dataIndex: 'startDate',
            key: 'startDate',
            render: text => moment(text).format('Y/M/D')
        },
        {
            ...createdKeywordsActionField
        },
        {
            ...infoField
        }
    ],
    [createdAdGroup]: [
        ...defaultKeys,
        {
            title: 'Ad Group',
            dataIndex: 'adGroup',
            key: 'adGroup',
            width: '150px',
        },
        {
            title: 'Default Bid',
            dataIndex: 'defaultBid',
            key: 'defaultBid',
            render: text => <span>${text}</span>
        },
        {
            ...createdKeywordsActionField
        },
        {
            ...infoField
        }
    ],
    [createdProductAd]: [
        ...defaultKeys,
        {
            title: 'Ad Group',
            dataIndex: 'adGroup',
            key: 'adGroup',
            width: '150px',
        },
        {
            title: 'ASIN',
            dataIndex: 'asin',
            key: 'asin'
        },
        {
            title: 'SKU',
            dataIndex: 'sku',
            key: 'sku'
        },
        {
            ...createdKeywordsActionField
        },
        {
            ...infoField
        }
    ],
    [createdCrossNegativeKeyword]: [
        ...defaultKeys,
        {
            title: 'Ad Group',
            dataIndex: 'adGroup',
            key: 'adGroup',
            width: '150px',
        },
        {
            title: 'Keyword',
            dataIndex: 'keyword',
            key: 'keyword'
        },
        {
            ...createdKeywordsActionField
        },
        {
            ...infoField
        }
    ],
    [createdKeywordCST]: [
        ...defaultKeys,
        {
            title: 'Campaign Type',
            dataIndex: 'campaignTargetingType',
            key: 'campaignTargetingType'
        },
        {
            title: 'Customer Search Term',
            dataIndex: 'customerSearchTerm',
            key: 'customerSearchTerm'
        },
        {
            title: 'Match Type',
            dataIndex: 'matchType',
            key: 'matchType'
        },
        {
            title: 'Bid',
            dataIndex: 'bid',
            key: 'bid',
            render: text => <span>${text}</span>
        },
        {
            title: 'CST Clicks',
            dataIndex: 'CSTClicks',
            key: 'CSTClicks'
        },
        {
            title: 'CST ACOS',
            dataIndex: 'CSTACoS',
            key: 'CSTACoS',
            render: text => <span>{text}%</span>

        },
        {
            title: 'CST CPC',
            dataIndex: 'CSTCPC',
            key: 'CSTCPC',
            render: text => <span>${text}</span>
        },
        {
            title: 'Targe ACoS',
            dataIndex: 'targetACoS',
            key: 'targetACoS',
            render: text => <span>{text}%</span>
        },
        {
            ...createdKeywordsActionField
        },
        {
            ...infoField
        }
    ]
};

const NewKeywords = ({data, onChangeSubTab, activeTab, currentPage, totalSize, handlePaginationChange, scroll}) => {
    const [activeTable, changeTable] = useState(createdCampaign);
    const {count, loading, productId} = useSelector(state => ({
        count: state.reports.counts['new-keywords'].subtypes_counts,
        loading: state.reports.loading,
        productId: state.products.selectedProduct.id
    }));

    const onChange = (tab) => {
        onChangeSubTab(tab);
        changeTable(tab);
    };

    useEffect(() => changeTable(createdCampaign), [productId, activeTab]);

    return (
        <div className="ReportItemTable">
            <TableButton
                active={createdCampaign === activeTable}
                count={count[createdCampaign]}
                onClick={() => {
                    onChange(createdCampaign);
                }}
            >
                Created Campaign
            </TableButton>
            <TableButton
                active={createdAdGroup === activeTable}
                count={count[createdAdGroup]}
                onClick={() => {
                    onChange(createdAdGroup);
                }}
            >
                Created Ad Group
            </TableButton>
            <TableButton
                active={createdProductAd === activeTable}
                count={count[createdProductAd]}
                onClick={() => {
                    onChange(createdProductAd);
                }}
            >
                Created Product Ad
            </TableButton>
            <TableButton
                active={createdCrossNegativeKeyword === activeTable}
                count={count[createdCrossNegativeKeyword]}
                onClick={() => {
                    onChange(createdCrossNegativeKeyword);
                }}
            >
                Created Cross-Negative Keyword
            </TableButton>
            <TableButton
                active={createdKeywordCST === activeTable}
                count={count[createdKeywordCST]}
                onClick={() => {
                    onChange(createdKeywordCST);
                }}
            >
                Created Keyword (CST)
            </TableButton>

            <CustomTable
                onChangePagination={handlePaginationChange}
                loading={loading}
                dataSource={data}
                columns={columns[activeTable]}
                currentPage={currentPage}
                totalSize={totalSize}
            />
        </div>
    );
};


export default NewKeywords;
