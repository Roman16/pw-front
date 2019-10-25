import React, {useEffect, useState} from 'react';
import Table from '../../../../../components/Table/Table';
import TitleInfo from '../../../../../components/Table/renders/TitleInfo';
import TableButton from '../TableButton/TableButton';
import {indexField, dateField, actionField, infoField} from './const';
import {useSelector} from "react-redux";

const highACoS = 'created-negative-keyword-from-cst-high-acos';
const noSales = 'created-negative-keyword-from-cst-no-sales';

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
            key: 'CSTACoS'
        },
        {
            title: () => <TitleInfo title="Target"/>,
            dataIndex: 'target',
            key: 'target'
        },
        {
            ...actionField
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
            ...actionField
        },
        {
            ...infoField
        }
    ]
};

const NewNegativeKeywords = ({data, totalSize, showPagination, onChangeSubTab}) => {
    const [activeTable, changeTable] = useState(highACoS);
    const {count, loading, productId} = useSelector(state => ({
        count: state.reports.counts['new-negative-keywords'].subtypesCounts,
        loading: state.reports.loading,
        productId: state.products.selectedProduct.id
    }));

    const onChange = (tab) => {
        onChangeSubTab(tab);
        changeTable(tab);
    };

    useEffect(() => changeTable(highACoS), [productId]);

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


export default NewNegativeKeywords;
