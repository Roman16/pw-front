import React, {useEffect, useState} from 'react';
import moment from 'moment';
import TableButton from '../TableButton/TableButton';
import {indexField, createdKeywordsActionField, infoField} from './const';
import {useSelector} from 'react-redux';
import CustomTable from '../../../../../components/Table/CustomTable';
import TitleInfo from "../../../../../components/Table/renders/TitleInfo";

const createdCampaign = 'created-campaign';
const createdAdGroup = 'created-ad-group';
const createdProductAd = 'created-product-ad';
const createdCrossNegativeKeyword = 'created-cross-negative-keyword';
const createdKeywordCST = 'created-keyword-cst';

const defaultKeys = [
    {
        ...indexField
    }
];

const columns = {
    [createdCampaign]: [
        ...defaultKeys,
        {
            title: 'Campaign',
            dataIndex: 'campaign',
            key: 'campaign',
            width: '350px'
        },
        {
            title: 'Campaign Targeting Type',
            dataIndex: 'campaignTargetingType',
            key: 'campaignTargetingType',
            width: '300px'
        },
        {
            title: 'Daily Budget',
            dataIndex: 'dailyBudget',
            key: 'dailyBudget',
            render: text => <span>{text && `$${text}`}</span>,
            width: '160px'
        },
        {
            title: 'Start Date.',
            dataIndex: 'startDate',
            key: 'startDate',
            render: text => moment(text).format('Y/M/D'),
            width: '160px'
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
            title: 'Campaign',
            dataIndex: 'campaign',
            key: 'campaign',
            width: '300px'
        },
        {
            title: 'Ad Group',
            dataIndex: 'adGroup',
            key: 'adGroup',
            width: '300px'
        },
        {
            title: 'Default Bid',
            dataIndex: 'defaultBid',
            key: 'defaultBid',
            render: text => <span>{text && `$${text}`}</span>,
            width: '300px'
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
            title: 'Campaign',
            dataIndex: 'campaign',
            key: 'campaign',
            width: '300px'
        },
        {
            title: 'Ad Group',
            dataIndex: 'adGroup',
            key: 'adGroup',
            width: '300px'
        },
        {
            title: 'ASIN',
            dataIndex: 'asin',
            key: 'asin'
            // width: '200px',
        },
        {
            title: 'SKU',
            dataIndex: 'sku',
            key: 'sku'
            // width: '200px',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            width: '180px',
            className: 'left-border',
            render: () => <div className="action-field">Created</div>
        },
        {
            ...infoField
        }
    ],
    [createdCrossNegativeKeyword]: [
        ...defaultKeys,
        {
            title: 'Campaign',
            dataIndex: 'campaign',
            key: 'campaign',
            width: '300px'
        },
        {
            title: 'Ad Group',
            dataIndex: 'adGroup',
            key: 'adGroup',
            width: '300px'
        },
        {
            title: 'Keyword',
            dataIndex: 'keyword',
            key: 'keyword'
            // width: '360px',
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
            title: 'Campaign',
            dataIndex: 'campaign',
            key: 'campaign',
            width: '160px'
        },
        {
            title: 'Ad Group',
            dataIndex: 'adGroup',
            key: 'adGroup',
            width: '160px'
        },
        {
            title: 'Keyword',
            dataIndex: 'keyword',
            key: 'keyword',
            width: '170px'
        },
        {
            title: 'Match Type',
            dataIndex: 'matchType',
            key: 'matchType',
            width: '110px'
        },
        {
            title: 'Bid',
            dataIndex: 'bid',
            key: 'bid',
            render: text => <span>{text && `$${text}`}</span>,
            width: '100px'
        },
        {
            title: <TitleInfo
                title='CST Clicks'
                info='It displays the number of clicks of certain customer search-term.'
            />,
            dataIndex: 'CSTClicks',
            key: 'CSTClicks',
            width: '110px'
        },
        {
            title: <TitleInfo
                title='CST ACoS'
                info='It displays the ACoS of certain customer search-term from your ad reports. '
            />,
            dataIndex: 'CSTACoS',
            key: 'CSTACoS',
            render: text => <span>{text && `${text}%`}</span>,
            width: '100px'
        },
        {
            title: <TitleInfo
                title='CST CPC'
                info='It displays the cost per click of certain customer search-term.'
            />,
            dataIndex: 'CSTCPC',
            key: 'CSTCPC',
            render: text => <span>{text && `${text}%`}</span>,
            width: '100px'
        },
        {
            title: 'Targe ACoS',
            dataIndex: 'targetACoS',
            key: 'targetACoS',
            render: text => <span>{text && `${text}%`}</span>,
            width: '100px'
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            width: '70px',
            className: 'left-border',
            render: () => <div className="action-field">Created</div>
        },
        {
            ...infoField
        }
    ]
};

const NewKeywords = ({
                         data,
                         onChangeSubTab,
                         activeTab,
                         currentPage,
                         totalSize,
                         handlePaginationChange,
                         scroll
                     }) => {
    const [activeTable, changeTable] = useState(createdCampaign);
    const {count, loading, productId} = useSelector(state => ({
        count: state.reports.counts['new-keywords'].subtypes_counts,
        loading: state.reports.loading,
        productId: state.products.selectedProduct.id
    }));

    const onChange = tab => {
        onChangeSubTab(tab);
        changeTable(tab);
    };

    useEffect(() => changeTable(createdCampaign), [productId, activeTab]);

    return (
        <div className="report-item-table">
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
