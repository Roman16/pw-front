import React, {useEffect, useState} from 'react';
import Table from '../../../../../components/Table/Table';
import TitleInfo from '../../../../../components/Table/renders/TitleInfo';
import TableButton from '../TableButton/TableButton';
import {indexField, createdKeywordsActionField, infoField} from './const';
import {useSelector} from "react-redux";

const highACoS = 'created-negative-keyword-from-cst-high-acos';
const noSales = 'created-negative-keyword-from-cst-no-sales';

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
        title: 'Customer Search Term',
        dataIndex: 'customerSearchTerm',
        key: 'customerSearchTerm'
    },
    {
        title: 'Negative Match Type',
        dataIndex: 'negativeMatchType',
        key: 'negativeMatchType'
    }
];

const columns = {
    [highACoS]: [
        ...defaultKeys,
        {
            title: 'CST ACoS',
            dataIndex: 'CSTACoS',
            key: 'CSTACoS',
            render: text => <span>{text}%</span>
        },
        {
            title: () => <TitleInfo title="Target"/>,
            dataIndex: 'target',
            key: 'target',
            render: text => <span>{text}%</span>
        },
        {
            ...createdKeywordsActionField
        },
        {
            ...infoField
        }
    ],
    [noSales]: [
        ...defaultKeys,
        {
            title: 'Average Conversion Rate',
            dataIndex: 'averageConversionRate',
            key: 'averageConversionRate'
        },
        {
            title: 'CST Clicks',
            dataIndex: 'CSTClicks',
            key: 'CSTClicks'
        },
        {
            ...createdKeywordsActionField
        },
        {
            ...infoField
        }
    ]
};

const NewNegativeKeywords = ({data, onChangeSubTab, activeTab, currentPage, totalSize, handlePaginationChange}) => {
    const [activeTable, changeTable] = useState(highACoS);
    const {count, loading, productId} = useSelector(state => ({
        count: state.reports.counts['new-negative-keywords'].subtypes_counts,
        loading: state.reports.loading,
        productId: state.products.selectedProduct.id
    }));

    const onChange = (tab) => {
        onChangeSubTab(tab);
        changeTable(tab);
    };

    useEffect(() => changeTable(highACoS), [productId, activeTab]);

    return (
        <div className="ReportItemTable">
            <TableButton
                active={activeTable === highACoS}
                count={count[highACoS]}
                onClick={() => {
                    onChange(highACoS);
                }}
            >
                Created Negative Keyword From CST (High ACoS)
            </TableButton>
            <TableButton
                active={activeTable === noSales}
                count={count[noSales]}
                onClick={() => {
                    onChange(noSales);
                }}
            >
                Created Negative Keyword From CST (No Sales)
            </TableButton>

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


export default NewNegativeKeywords;
