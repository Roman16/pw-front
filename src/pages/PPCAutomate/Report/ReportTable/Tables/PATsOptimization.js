import React, {useEffect, useState} from 'react';
import TitleInfo from '../../../../../components/Table/renders/TitleInfo';
import {indexField, infoField, bidActionField, patIntentField, pausePatActionField} from './const';
import TableButton from '../TableButton/TableButton';
import {useSelector} from "react-redux";
import CustomTable from "./CustomTable";

const changedPATBidACoS = 'changed-pat-bid-acos';
const changedPATBidImpressions = 'changed-pat-bid-impressions';
const pausedManualPATHighACoS = 'paused-manual-pat-high-acos';
const pausedManualPatNoSales = 'paused-manual-pat-no-sales';

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
        title: <TitleInfo title="PAT type"/>,
        dataIndex: 'PatType',
        key: 'PatType',
        width: '130px',
        render: text => <span className='capitalize-field'>{text}</span>
    },
    {
        ...patIntentField
    },
    {
        title: 'PAT Value',
        dataIndex: 'PatValue',
        key: 'PatValue',
        width: '100px',
    }
];

const columns = {
    [changedPATBidACoS]: [
        ...defaultKeys,
        {
            title: 'ACoS',
            dataIndex: 'acos',
            key: 'acos',
            render: text => <span>{text}%</span>,
            width: 100,
        },
        {
            title: <TitleInfo title="Target ACoS"/>,
            dataIndex: 'targetACoS',
            key: 'targetACoS',
            render: text => <span>{text}%</span>,
            width: 150,
        },
        {
            ...bidActionField
        },
        {
            ...infoField
        }
    ],
    [changedPATBidImpressions]: [
        ...defaultKeys,
        {
            title: 'Impressions',
            dataIndex: 'impressions',
            key: 'impressions',
            width: '120px',
        },
        {
            title: <TitleInfo title="Target Impressions"/>,
            dataIndex: 'targetImpressions',
            key: 'targetImpressions',
            width: '150px',
        },
        {
            ...bidActionField
        },
        {
            ...infoField
        }
    ],
    [pausedManualPATHighACoS]: [
        ...defaultKeys,
        {
            title: 'ACoS',
            dataIndex: 'acos',
            key: 'acos',
            render: text => <span>{text}%</span>,
            width: 100,
        },
        {
            title: <TitleInfo title="Target ACoS"/>,
            dataIndex: 'targetACoS',
            key: 'targetACoS',
            render: text => <span>{text}%</span>,
            width: 150,
        },
        {
            ...pausePatActionField
        },
        {
            ...infoField
        }
    ],
    [pausedManualPatNoSales]: [
        ...defaultKeys,
        {
            title: 'Average Conv. Rate',
            dataIndex: 'averageConvRate',
            key: 'averageConvRate',
            render: text => <span>{text}%</span>,
            width: 200,
        },
        {
            title: <TitleInfo title="Clicks"/>,
            dataIndex: 'clicks',
            key: 'clicks',
            width: 100,
        },
        {
            ...pausePatActionField
        },
        {
            ...infoField
        }
    ]
};

const PATsOptimization = ({data, onChangeSubTab, activeTab, currentPage, totalSize, handlePaginationChange, scroll}) => {
    const [activeTable, changeTable] = useState(changedPATBidACoS);
    const {count, loading, productId} = useSelector(state => ({
        count: state.reports.counts['pats-optimization'].subtypes_counts,
        loading: state.reports.loading,
        productId: state.products.selectedProduct.id
    }));

    const onChange = (tab) => {
        onChangeSubTab(tab);
        changeTable(tab);
    };

    useEffect(() => changeTable(changedPATBidACoS), [productId, activeTab]);

    return (
        <div className="ReportItemTable">
            <TableButton
                active={activeTable === changedPATBidACoS}
                count={count[changedPATBidACoS]}
                onClick={() => {
                    onChange(changedPATBidACoS);
                }}
            >
                Changed PAT Bid (ACoS)
            </TableButton>
            <TableButton
                active={activeTable === changedPATBidImpressions}
                count={count[changedPATBidImpressions]}
                onClick={() => {
                    onChange(changedPATBidImpressions);
                }}
            >
                Changed PAT Bid (Impressions)
            </TableButton>
            <TableButton
                active={activeTable === pausedManualPATHighACoS}
                count={count[pausedManualPATHighACoS]}
                onClick={() => {
                    onChange(pausedManualPATHighACoS);
                }}
            >
                Paused Manual PAT (High ACoS)
            </TableButton>
            <TableButton
                active={activeTable === pausedManualPatNoSales}
                count={count[pausedManualPatNoSales]}
                onClick={() => {
                    onChange(pausedManualPatNoSales);
                }}
            >
                Paused Manual Pat (No Sales)
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

export default PATsOptimization;
