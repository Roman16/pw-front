import React, {useEffect, useState} from 'react';
import Table from '../../../../../components/Table/Table';
import TitleInfo from '../../../../../components/Table/renders/TitleInfo';
import {indexField, createdKeywordsActionField, infoField} from './const';
import TableButton from '../TableButton/TableButton';
import {useSelector} from "react-redux";

const HighACoS = 'created-negative-pat-from-cst-high-acos';
const NoSales = 'created-negative-pat-from-cst-no-sales';

const defaultKeys = [
    {
        ...indexField
    },
    {
        title: 'Campaign',
        dataIndex: 'campaign',
        key: 'campaign',
        width: '150px',
    },
    {
        title: 'Ad Group',
        dataIndex: 'adGroup',
        key: 'adGroup',
        width: '150px',
    },
    {
        title: () => <TitleInfo title="PAT Type"/>,
        dataIndex: 'PatType',
        key: 'PatType',
        width: '150px',
    },
    {
        title: () => <TitleInfo title="PAT Intent Type"/>,
        dataIndex: 'PatIntentType',
        key: 'PatIntentType'
    },
    {
        title: 'PAT Value',
        dataIndex: 'PatValue',
        key: 'PatValue'
    },
    {
        title: 'Customer Search Term',
        dataIndex: 'customerSearchTerm',
        key: 'customerSearchTerm'
    }
];

const columns = {
    [HighACoS]: [
        ...defaultKeys,
        {
            title: 'CST ACOS',
            dataIndex: 'CSTACoS',
            key: 'CSTACoS',
            render: text => <span>{text}%</span>
        },
        {
            title: 'Targe ACoS',
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
    [NoSales]: [
        ...defaultKeys,
        {
            title: 'Average Conv. Rate',
            dataIndex: 'averageConversionRate',
            key: 'averageConversionRate',
            render: text => <span>{text}%</span>
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

const NewNegativePats = ({data, onChangeSubTab, activeTab, currentPage, totalSize, handlePaginationChange, scroll}) => {
    const [activeTable, changeTable] = useState(HighACoS);
    const {count, loading, productId} = useSelector(state => ({
        count: state.reports.counts['new-negative-pats'].subtypes_counts,
        loading: state.reports.loading,
        productId: state.products.selectedProduct.id
    }));

    const onChange = (tab) => {
        onChangeSubTab(tab);
        changeTable(tab);
    };

    useEffect(() => changeTable(HighACoS), [productId, activeTab]);

    return (
        <div className="ReportItemTable">
            <TableButton
                active={activeTable === HighACoS}
                count={count[HighACoS]}
                onClick={() => {
                    onChange(HighACoS);
                }}
            >
                Created Negative PAT From CST (High ACoS)
            </TableButton>
            <TableButton
                active={activeTable === NoSales}
                count={count[NoSales]}
                onClick={() => {
                    onChange(NoSales);
                }}
            >
                Created Negative PAT From CST (No Sales)
            </TableButton>

            <Table
                onChangePagination={handlePaginationChange}
                loading={loading}
                dataSource={data}
                columns={columns[activeTable]}
                currentPage={currentPage}
                totalSize={totalSize}
                showPagination={totalSize > 10}
                scroll={scroll}
            />
        </div>
    );
};

export default NewNegativePats;
