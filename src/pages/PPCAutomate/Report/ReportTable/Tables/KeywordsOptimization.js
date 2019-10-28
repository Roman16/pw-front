import React, {useState, useEffect} from 'react';
import Table from '../../../../../components/Table/Table';
import TitleInfo from '../../../../../components/Table/renders/TitleInfo';
import TableButton from '../TableButton/TableButton';
import {indexField, infoField, bidActionField, pauseKeywordsActionField} from './const';
import {useSelector} from "react-redux";

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
        key: 'campaign'
    },
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
        title: 'Match Type',
        dataIndex: 'matchType',
        key: 'matchType',
        width: 130,
    }
];

const columns = {
    [changedKeywordBidAcos]: [
        ...defaultKeys,
        {
            title: 'ACos',
            dataIndex: 'acos',
            key: 'acos',
            render: text => <span>{text}%</span>
        },
        {
            title: () => <TitleInfo title="Target ACoS"/>,
            dataIndex: 'targetACoS',
            key: 'targetACoS',
            width: 130,
            render: text => <span>{text}%</span>
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
            key: 'impressions'
        },
        {
            title: () => <TitleInfo title="Target Impressions"/>,
            dataIndex: 'targetImpressions',
            key: 'targetImpressions'
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
            title: 'ACos',
            dataIndex: 'acos',
            key: 'acos',
            render: text => <span>{text}%</span>
        },
        {
            title: () => <TitleInfo title="Target ACoS"/>,
            dataIndex: 'targetACoS',
            key: 'targetACoS',
            render: text => <span>{text}%</span>
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
            render: text => <span>{text}%</span>
        },
        {
            title: () => <TitleInfo title="Clicks"/>,
            dataIndex: 'clicks',
            key: 'clicks'
        },
        {
            ...pauseKeywordsActionField
        },
        {
            ...infoField
        }
    ]
};

const KeywordsOptimization = ({data, onChangeSubTab, activeTab, currentPage, totalSize, handlePaginationChange}) => {
    const [activeTable, changeTable] = useState(changedKeywordBidAcos);
    const {count, loading, productId} = useSelector(state => ({
        count: state.reports.counts['keywords-optimization'].subtypes_counts,
        loading: state.reports.loading,
        productId: state.products.selectedProduct.id
    }));

    const onChange = (tab) => {
        onChangeSubTab(tab);
        changeTable(tab);
    };

    useEffect(() => changeTable(changedKeywordBidAcos), [productId, activeTab]);

    return (
        <div className="ReportItemTable">
            <div className="ReportItemTable__Buttons">
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

            <Table
                onChangePagination={handlePaginationChange}
                loading={loading}
                dataSource={data}
                columns={columns[activeTable]}
                currentPage={currentPage}
                totalSize={totalSize}
                showPagination={totalSize > 10}
            />
        </div>
    );
};


export default KeywordsOptimization;
