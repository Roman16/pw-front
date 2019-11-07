import React, { useState, useEffect } from 'react';
import TitleInfo from '../../../../../components/Table/renders/TitleInfo';
import TableButton from '../TableButton/TableButton';
import {
    indexField,
    infoField,
    bidActionField,
    pauseKeywordsActionField
} from './const';
import { useSelector } from 'react-redux';
import CustomTable from '../../../../../components/Table/CustomTable';

const changedKeywordBidAcos = 'changed-keyword-bid-acos';
const changedKeywordBidImpression = 'changed-keyword-bid-impressions';
const pausedKeywordHighAcos = 'paused-keyword-high-acos';
const pausedKeywordNoSales = 'paused-keyword-no-sales';

const defaultKeys = [
    {
        ...indexField
    },
    {
        title: 'Campaign',
        dataIndex: 'campaign',
        key: 'campaign',
        width: '180px'
    },
    {
        title: 'Ad Group',
        dataIndex: 'adGroup',
        key: 'adGroup',
        width: '180px'
    },
    {
        title: 'Keyword',
        dataIndex: 'keyword',
        key: 'keyword',
        width: '200px'
    },
    {
        title: 'Match Type',
        dataIndex: 'matchType',
        key: 'matchType',
        width: '132px',
        render: text => <span className="capitalize-field">{text}</span>
    }
];

const columns = {
    [changedKeywordBidAcos]: [
        ...defaultKeys,
        {
            title: 'ACoS',
            dataIndex: 'acos',
            key: 'acos',
            width: '132px',
            render: text => <span>{text && `${text}%`}</span>
        },
        {
            title: (
                <TitleInfo
                    title="Target ACoS"
                    info="The ACoS that our algorithm is aiming to reach your business goal."
                />
            ),
            dataIndex: 'targetACoS',
            key: 'targetACoS',
            width: '130px',
            render: text => <span>{text && `${text}%`}</span>
        },
        {
            ...bidActionField
        },
        {
            ...infoField
        }
    ],
    [changedKeywordBidImpression]: [
        ...defaultKeys,
        {
            title: 'Impressions',
            dataIndex: 'impressions',
            key: 'impressions',
            width: '132px'
        },
        {
            title: (
                <TitleInfo
                    title="Target Impressions"
                    info="The number of times your ads need to be displayed so you will get the click."
                />
            ),
            dataIndex: 'targetImpressions',
            key: 'targetImpressions',
            width: '130px'
        },
        {
            ...bidActionField
        },
        {
            ...infoField
        }
    ],
    [pausedKeywordHighAcos]: [
        ...defaultKeys,
        {
            title: 'ACoS',
            dataIndex: 'acos',
            key: 'acos',
            width: '132px',
            render: text => <span>{text && `${text}%`}</span>
        },
        {
            title: (
                <TitleInfo
                    title="Target ACoS"
                    info="The ACoS that our algorithm is aiming to reach your business goal."
                />
            ),
            dataIndex: 'targetACoS',
            key: 'targetACoS',
            width: '130px',
            render: text => <span>{text && `${text}%`}</span>
        },
        {
            ...pauseKeywordsActionField
        },
        {
            ...infoField
        }
    ],
    [pausedKeywordNoSales]: [
        ...defaultKeys,
        {
            title: 'Average Conv. Rate',
            dataIndex: 'averageConvRate',
            key: 'averageConvRate',
            width: '132px',
            render: text => <span>{text && `${text}%`}</span>
        },
        {
            title: 'Clicks',
            dataIndex: 'clicks',
            key: 'clicks',
            width: '120px'
        },
        {
            ...pauseKeywordsActionField
        },
        {
            ...infoField
        }
    ]
};

const KeywordsOptimization = ({
    data,
    onChangeSubTab,
    activeTab,
    currentPage,
    totalSize,
    handlePaginationChange,
    scroll
}) => {
    const [activeTable, changeTable] = useState(changedKeywordBidAcos);
    const { count, loading, productId } = useSelector(state => ({
        count: state.reports.counts['keywords-optimization'].subtypes_counts,
        loading: state.reports.loading,
        productId: state.products.selectedProduct.id
    }));

    const onChange = tab => {
        onChangeSubTab(tab);
        changeTable(tab);
    };

    useEffect(() => changeTable(changedKeywordBidAcos), [productId, activeTab]);

    return (
        <div className="report-item-table">
            <div className="report-item-table-btn">
                <TableButton
                    active={changedKeywordBidAcos === activeTable}
                    count={count[changedKeywordBidAcos]}
                    onClick={() => {
                        onChange(changedKeywordBidAcos);
                    }}
                >
                    Changed Keyword Bid (ACoS)
                </TableButton>
                <TableButton
                    active={changedKeywordBidImpression === activeTable}
                    count={count[changedKeywordBidImpression]}
                    onClick={() => {
                        onChange(changedKeywordBidImpression);
                    }}
                >
                    Changed Keyword Bid (Impressions)
                </TableButton>
                <TableButton
                    active={pausedKeywordHighAcos === activeTable}
                    count={count[pausedKeywordHighAcos]}
                    onClick={() => {
                        onChange(pausedKeywordHighAcos);
                    }}
                >
                    Paused Keyword (High ACoS)
                </TableButton>
                <TableButton
                    active={pausedKeywordNoSales === activeTable}
                    count={count[pausedKeywordNoSales]}
                    onClick={() => {
                        onChange(pausedKeywordNoSales);
                    }}
                >
                    Paused Keyword (No Sales)
                </TableButton>
            </div>

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

export default KeywordsOptimization;
