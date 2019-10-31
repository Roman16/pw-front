import React, {useState, useEffect} from 'react';
import TitleInfo from '../../../../../components/Table/renders/TitleInfo';
import TableButton from '../TableButton/TableButton';
import {indexField, infoField, bidActionField, pauseKeywordsActionField} from './const';
import {useSelector} from "react-redux";
import CustomTable from './CustomTable';

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
        width: '180px',
    },
    {
        title: 'Ad Group',
        dataIndex: 'adGroup',
        key: 'adGroup',
        width: '180px',
    },
    {
        title: 'Keyword',
        dataIndex: 'keyword',
        key: 'keyword',
        width: '200px',
    },
    {
        title: 'Match Type',
        dataIndex: 'matchType',
        key: 'matchType',
        width: '132px',
        render: text => <span className='capitalize-field'>{text}</span>
    }
];

const columns = {
    [changedKeywordBidAcos]: [
        ...defaultKeys,
        {
            title: 'ACoS',
            dataIndex: 'acos',
            key: 'acos',
            render: text => <span>{text && `${text}%`}</span>,
            // width: '132px',
        },
        {
            title: <TitleInfo title="Target ACoS"/>,
            dataIndex: 'targetACoS',
            key: 'targetACoS',
            render: text => <span>{text && `${text}%`}</span>,
            // width: '130px',
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
            // width: '132px',
        },
        {
            title: <TitleInfo title="Target Impressions"/>,
            dataIndex: 'targetImpressions',
            key: 'targetImpressions',
            width: '130px',
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
            render: text => <span>{text && `${text}%`}</span>,
            // width: '132px',
        },
        {
            title: <TitleInfo title="Target ACoS"/>,
            dataIndex: 'targetACoS',
            key: 'targetACoS',
            render: text => <span>{text && `${text}%`}</span>,
            // width: '130px',
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
            render: text => <span>{text && `${text}%`}</span>,
            // width: '132px',
        },
        {
            title: <TitleInfo title="Clicks"/>,
            dataIndex: 'clicks',
            key: 'clicks',
            // width: '120px',
        },
        {
            ...pauseKeywordsActionField
        },
        {
            ...infoField
        }
    ]
};

const KeywordsOptimization = ({data, onChangeSubTab, activeTab, currentPage, totalSize, handlePaginationChange, scroll}) => {
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
