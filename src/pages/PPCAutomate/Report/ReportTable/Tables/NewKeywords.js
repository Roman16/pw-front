import React, {useEffect, useState} from 'react';
import moment from 'moment';
import Table from '../../../../../components/Table/Table';
import TableButton from '../TableButton/TableButton';
import {indexField, dateField, actionField, infoField} from './const';
import {useSelector} from "react-redux";

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
        ...dateField
    },
    {
        title: 'Campaign',
        dataIndex: 'campaign',
        key: 'campaign'
    }
];

const columns = {
    [createdCampaign]: [
        ...defaultKeys,
        {
            title: 'Ad Group',
            dataIndex: 'adGroup',
            key: 'adGroup'
        },
        {
            title: 'Campaign Targeting Type',
            dataIndex: 'campaignTargetingType',
            key: 'campaignTargetingType'
        },
        {
            title: 'Daily Budget',
            dataIndex: 'dailyBudget',
            key: 'dailyBudget'
        },
        {
            title: 'Start Date.',
            dataIndex: 'startDate',
            key: 'startDate',
            render: text => moment(text).format('Y/M/D')
        },
        {
            ...actionField
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
            key: 'adGroup'
        },
        {
            title: 'Default Bid',
            dataIndex: 'defaultBid',
            key: 'defaultBid'
        },
        {
            ...actionField
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
            key: 'adGroup'
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
            ...actionField
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
            key: 'adGroup'
        },
        {
            title: 'Keyword',
            dataIndex: 'keyword',
            key: 'keyword'
        },
        {
            ...actionField
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
            key: 'bid'
        },
        {
            title: 'CST Clicks',
            dataIndex: 'CSTClicks',
            key: 'CSTClicks'
        },
        {
            title: 'CST ACOS',
            dataIndex: 'CSTACoS',
            key: 'CSTACoS'
        },
        {
            title: 'CST CPC',
            dataIndex: 'CSTCPC',
            key: 'CSTCPC'
        },
        {
            title: 'Targe ACoS',
            dataIndex: 'targetACoS',
            key: 'targetACoS'
        },
        {
            ...actionField
        },
        {
            ...infoField
        }
    ]
};

const NewKeywords = ({data, totalSize, showPagination, onChangeSubTab}) => {
    const [activeTable, changeTable] = useState(createdCampaign);
    const {count, loading, productId} = useSelector(state => ({
        count: state.reports.counts['new-keywords'].subtypesCounts,
        loading: state.reports.loading,
        productId: state.products.selectedProduct.id
    }));

    const onChange = (tab) => {
        onChangeSubTab(tab);
        changeTable(tab);
    };

    useEffect(() => changeTable(createdCampaign), [productId]);

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
            <Table
                // onChangePagination={this.handlePaginationChange}
                loading={loading}
                dataSource={data}
                columns={columns[activeTable]}
                // currentPage={currentPage}
                totalSize={totalSize}
                showPagination={showPagination}
            />
        </div>
    );
};


export default NewKeywords;
