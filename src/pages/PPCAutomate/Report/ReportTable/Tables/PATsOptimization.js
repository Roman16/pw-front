import React, {useEffect, useState} from 'react';
import Table from '../../../../../components/Table/Table';
import TitleInfo from '../../../../../components/Table/renders/TitleInfo';
import {indexField, dateField, actionField, infoField, bidActionField, pausePatActionField} from './const';
import TableButton from '../TableButton/TableButton';
import {useSelector} from "react-redux";

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
        title: () => <TitleInfo title="PAT type"/>,
        dataIndex: 'PatType',
        key: 'PatType ',
        width: '150px',

    },
    {
        title: 'PAT Intent Type',
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
    [changedPATBidACoS]: [
        ...defaultKeys,
        {
            title: 'ACoS',
            dataIndex: 'acos',
            key: 'acos',
            render: text => <span>{text}%</span>
        },
        {
            title: () => <TitleInfo title="Target ACoS"/>,
            dataIndex: 'targetACoS',
            key: 'targetACoS',
            render: text => <span>{text}%</span>
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
            key: 'impressions'
        },
        {
            title: () => <TitleInfo title="Target Impressions"/>,
            dataIndex: 'targetImpressions',
            key: 'targetImpressions'
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
            render: text => <span>{text}%</span>
        },
        {
            title: () => <TitleInfo title="Target ACoS"/>,
            dataIndex: 'targetACoS',
            key: 'targetACoS',
            render: text => <span>{text}%</span>
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
            render: text => <span>{text}%</span>
        },
        {
            title: () => <TitleInfo title="Clicks"/>,
            dataIndex: 'clicks',
            key: 'clicks'
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

export default PATsOptimization;
