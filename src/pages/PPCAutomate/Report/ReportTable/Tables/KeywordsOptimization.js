import React, {useState} from 'react';
import Table from '../../../../../components/Table/Table';
import TitleInfo from '../../../../../components/Table/renders/TitleInfo';
import TableButton from '../TableButton/TableButton';
import {indexField, dateField, actionField, infoField} from './const';

const changedKeywordBidAcos = 'changed-keyword-bid-acos';
const changedKeywordBidImpression = 'changed-keyword-bid-impressions';
const pausedKeywordHighAcos = 'paused-keyword-high-acos';
const pausedKeywordNoSales = 'paused-keyword-no-sales';

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
        key: 'matchType'
    }
];

const columns = {
    [changedKeywordBidAcos]: [
        ...defaultKeys,
        {
            title: 'ACos',
            dataIndex: 'acos',
            key: 'acos'
        },
        {
            title: () => <TitleInfo title="Target ACoS"/>,
            dataIndex: 'targetACoS',
            key: 'targetACoS'
        },
        {
            ...actionField
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
            ...actionField
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
            key: 'acos'
        },
        {
            title: () => <TitleInfo title="Target ACoS"/>,
            dataIndex: 'targetACoS',
            key: 'targetACoS'
        },
        {
            ...actionField
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
            key: 'averageConvRate'
        },
        {
            title: () => <TitleInfo title="Clicks"/>,
            dataIndex: 'clicks',
            key: 'clicks'
        },
        {
            ...actionField
        },
        {
            ...infoField
        }
    ]
};

const KeywordsOptimization = ({data, loading, totalSize, showPagination, count, onChangeSubTab}) => {
    const [activeTable, changeTable] = useState(changedKeywordBidAcos);

    const onChange = (tab) => {
        onChangeSubTab(tab);
        changeTable(tab);
    };

    return (
        <div className="ReportItemTable">
            <div className="ReportItemTable__Buttons">
                <TableButton
                    active={changedKeywordBidAcos === activeTable}
                    // count={count[changedKeywordBidAcos]}
                    onClick={() => {
                        onChange(changedKeywordBidAcos);
                    }}
                >
                    Changed Keyword Bid (ACoS)
                </TableButton>
                <TableButton
                    active={changedKeywordBidImpression === activeTable}
                    // count={count[changedKeywordBidImpression]}
                    onClick={() => {
                        onChange(changedKeywordBidImpression);
                    }}
                >
                    Changed Keyword Bid (Impressions)
                </TableButton>
                <TableButton
                    active={pausedKeywordHighAcos === activeTable}
                    // count={count[pausedKeywordHighAcos]}
                    onClick={() => {
                        onChange(pausedKeywordHighAcos);
                    }}
                >
                    Paused Keyword (High ACoS)
                </TableButton>
                <TableButton
                    active={pausedKeywordNoSales === activeTable}
                    // count={count[pausedKeywordNoSales]}
                    onClick={() => {
                        onChange(pausedKeywordNoSales);
                    }}
                >
                    Paused Keyword (No Sales)
                </TableButton>
            </div>

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


export default KeywordsOptimization;
