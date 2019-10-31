import React, {useEffect, useState} from 'react';
import TitleInfo from '../../../../../components/Table/renders/TitleInfo';
import {indexField, patIntentField, infoField} from './const';
import TableButton from '../TableButton/TableButton';
import {useSelector} from "react-redux";
import CustomTable from "./CustomTable";

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
        width: '160px',
    },
    {
        title: 'Ad Group',
        dataIndex: 'adGroup',
        key: 'adGroup',
        width: '160px',
    },
    {
        title: <TitleInfo title="PAT Type"/>,
        dataIndex: 'PatType',
        key: 'PatType',
        width: '150px',
        render: text => <span className='capitalize-field'>{text}</span>
    },
    {
        ...patIntentField
    },
    {
        title: 'PAT Value',
        dataIndex: 'PatValue',
        key: 'PatValue',
        width: '130px',
    },
    {
        title: <span>Customer <br/> Search Term</span>,
        dataIndex: 'customerSearchTerm',
        key: 'customerSearchTerm',
        width: '150px',
    }
];

const columns = {
    [HighACoS]: [
        ...defaultKeys,
        {
            title: 'CST ACOS',
            dataIndex: 'CSTACoS',
            key: 'CSTACoS',
            render: text => <span>{text && `${text}%` }</span>,
            width: '120px',
        },
        {
            title: 'Targe ACoS',
            dataIndex: 'target',
            key: 'target',
            render: text => <span>{text && `${text}%` }</span>,
            width: '110px',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            width: '60px',
            className: 'left-border',
            render: () => (
                <div className='action-field'>
                    Created
                </div>
            )
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
            render: text => <span>{text && `${text}%` }</span>,
            width: '120px',
        },
        {
            title: 'CST Clicks',
            dataIndex: 'CSTClicks',
            key: 'CSTClicks',
            width: '110px',
        },

        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            width: '100px',
            className: 'left-border',
            render: () => (
                <div className='action-field'>
                    Created
                </div>
            )
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

export default NewNegativePats;
