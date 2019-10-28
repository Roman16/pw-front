import React, {useEffect, useState} from 'react';
import Table from '../../../../../components/Table/Table';
import TitleInfo from '../../../../../components/Table/renders/TitleInfo';
import {indexField, dateField, createdKeywordsActionField, infoField} from './const';
import TableButton from '../TableButton/TableButton';
import {useSelector} from "react-redux";

const CreatedCrossNegativePAT = 'created-cross-negative-pat';
const CreatedPATCST = 'created-pat-cst';

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
        title: () => <TitleInfo title="PAT Type"/>,
        dataIndex: 'PatType',
        key: 'PatType'
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
    }
];

const columns = {
    [CreatedCrossNegativePAT]: [
        ...defaultKeys,
        {
            ...createdKeywordsActionField
        },
        {
            ...infoField
        }
    ],
    [CreatedPATCST]: [
        ...defaultKeys,
        {
            title: 'Bid',
            dataIndex: 'bid',
            key: 'bid',
            render: text => <span>${text}</span>
        },
        {
            title: 'Customer Search Term',
            dataIndex: 'customerSearchTerm',
            key: 'customerSearchTerm'
        },
        {
            title: 'CST Clicks',
            dataIndex: 'CSTClicks',
            key: 'CSTClicks'
        },
        {
            title: 'CST ACOS',
            dataIndex: 'CSTACoS',
            key: 'CSTACoS',
            render: text => <span>{text}%</span>
        },
        {
            title: 'CST CPC',
            dataIndex: 'CSTCPC',
            key: 'CSTCPC',
            render: text => <span>${text}</span>
        },
        {
            title: 'Targe ACoS',
            dataIndex: 'TargetACoS',
            key: 'TargetACoS',
            render: text => <span>{text}%</span>
        },
        {
            ...createdKeywordsActionField
        },
        {
            ...infoField
        }
    ]
};

const NewPats = ({data, onChangeSubTab, activeTab, currentPage, totalSize, handlePaginationChange}) => {
    const [activeTable, changeTable] = useState(CreatedCrossNegativePAT);
    const {count, loading, productId} = useSelector(state => ({
        count: state.reports.counts['new-pats'].subtypes_counts,
        loading: state.reports.loading,
        productId: state.products.selectedProduct.id
    }));

    const onChange = (tab) => {
        onChangeSubTab(tab);
        changeTable(tab);
    };

    useEffect(() => changeTable(CreatedCrossNegativePAT), [productId, activeTab]);

    return (
        <div className="ReportItemTable">
            <TableButton
                active={activeTable === CreatedCrossNegativePAT}
                count={count[CreatedCrossNegativePAT]}
                onClick={() => {
                    onChange(CreatedCrossNegativePAT);
                }}
            >
                Created Cross-Negative PAT
            </TableButton>
            <TableButton
                active={activeTable === CreatedPATCST}
                count={count[CreatedPATCST]}
                onClick={() => {
                    onChange(CreatedPATCST);
                }}
            >
                Created PAT (CST)
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
}

export default NewPats;
