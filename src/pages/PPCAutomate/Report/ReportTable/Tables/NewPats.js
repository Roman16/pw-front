import React, {useEffect, useState} from 'react';
import Table from '../../../../../components/Table/Table';
import TitleInfo from '../../../../../components/Table/renders/TitleInfo';
import {indexField, dateField, actionField, infoField} from './const';
import TableButton from '../TableButton/TableButton';
import {useSelector} from "react-redux";

const CreatedCrossNegativePAT = 'created-cross-negative-pat';
const CreatedPATCST = 'created-pat-cst';

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
        title: () => <TitleInfo title="PAT Type"/>,
        dataIndex: 'PatType',
        key: 'PatType'
    },
    {
        title: () => <TitleInfo title="Pat Intent Type"/>,
        dataIndex: 'PatIntentType',
        key: 'PatIntentType'
    },
    {
        title: 'Pat Value',
        dataIndex: 'PatValue',
        key: 'PatValue'
    }
];

const columns = {
    [CreatedCrossNegativePAT]: [
        ...defaultKeys,
        {
            ...actionField
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
            key: 'bid'
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
            key: 'CSTACoS'
        },
        {
            title: 'CST CPC',
            dataIndex: 'CSTCPC',
            key: 'CSTCPC'
        },
        {
            title: 'Targe ACoS',
            dataIndex: 'TargetACoS',
            key: 'TargetACoS'
        },
        {
            ...actionField
        },
        {
            ...infoField
        }
    ]
};

const NewPats = ({data, totalSize, showPagination, onChangeSubTab}) => {
    const [activeTable, changeTable] = useState(CreatedCrossNegativePAT);
    const {count, loading, productId} = useSelector(state => ({
        count: state.reports.counts['new-pats'].subtypesCounts,
        loading: state.reports.loading,
        productId: state.products.selectedProduct.id
    }));

    const onChange = (tab) => {
        onChangeSubTab(tab);
        changeTable(tab);
    };

    useEffect(() => changeTable(CreatedCrossNegativePAT), [productId]);

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
}

export default NewPats;
