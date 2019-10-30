import React, {useState, useEffect} from 'react';
import Table from '../../../../../components/Table/Table';
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
        width: 200,
    },
    {
        title: 'Ad Group',
        dataIndex: 'adGroup',
        key: 'adGroup',
        width: 200,
    },
    {
        title: 'Keyword',
        dataIndex: 'keyword',
        key: 'keyword',
        width: 200,
    },
    {
        title: 'Match Type',
        dataIndex: 'matchType',
        key: 'matchType',
        width: 132,
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
            render: text => <span>{text}%</span>,
            width: '132px',
        },
        {
            title: <TitleInfo title="Target ACoS"/>,
            dataIndex: 'targetACoS',
            key: 'targetACoS',
            render: text => <span>{text}%</span>,
            width: '130px',
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
            width: 100,
        },
        {
            title: () => <TitleInfo title="Target Impressions"/>,
            dataIndex: 'targetImpressions',
            key: 'targetImpressions',
            width: 200,
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
            render: text => <span>{text}%</span>,
            width: 100,
        },
        {
            title: () => <TitleInfo title="Target ACoS"/>,
            dataIndex: 'targetACoS',
            key: 'targetACoS',
            render: text => <span>{text}%</span>,
            width: 150,
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
            render: text => <span>{text}%</span>,
            width: 200,
        },
        {
            title: () => <TitleInfo title="Clicks"/>,
            dataIndex: 'clicks',
            key: 'clicks',
            width: 100,
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

            {/*<table className="MyClassName">*/}
            {/*    <thead>*/}
            {/*    <tr>*/}
            {/*        {columns[activeTable].map(item =>*/}
            {/*            <th key={item.title}>{item.title}</th>*/}
            {/*        )}*/}
            {/*    </tr>*/}
            {/*    </thead>*/}
            {/*    <tbody>*/}
            {/*    {data.map((row, i) =>*/}
            {/*        <tr key={i}>*/}
            {/*            1*/}
            {/*            /!*{columns[activeTable].map(item => (*!/*/}
            {/*            /!*    <span>{typeof row[item.key] === 'string' && row[item.key]}</span>*!/*/}
            {/*            /!*))}*!/*/}
            {/*            /!*{row.map((col, j) =>*!/*/}
            {/*            /!*    <td key={j}>{col}</td>*!/*/}
            {/*            /!*)}*!/*/}
            {/*        </tr>*/}
            {/*    )}*/}
            {/*    </tbody>*/}
            {/*</table>*/}

            <CustomTable
                onChangePagination={handlePaginationChange}
                loading={loading}
                dataSource={data}
                columns={columns[activeTable]}
                currentPage={currentPage}
                totalSize={totalSize}
                showPagination={totalSize > 10}
            />

            {/*<Table*/}
            {/*    onChangePagination={handlePaginationChange}*/}
            {/*    loading={loading}*/}
            {/*    dataSource={data}*/}
            {/*    columns={columns[activeTable]}*/}
            {/*    currentPage={currentPage}*/}
            {/*    totalSize={totalSize}*/}
            {/*    showPagination={totalSize > 10}*/}
            {/*    scroll={scroll}*/}
            {/*/>*/}
        </div>
    );
};


export default KeywordsOptimization;
