import React, {useEffect, useState} from 'react';
import Table from '../../../../../components/Table/Table';
import TitleInfo from '../../../../../components/Table/renders/TitleInfo';
import {indexField, dateField, actionField, infoField} from './const';
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
        title: () => <TitleInfo title="PAT type"/>,
        dataIndex: 'PatType',
        key: 'PatType '
    },
    {
        title: 'Pat Intent Type',
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
    [changedPATBidACoS]: [
        ...defaultKeys,
        {
            title: 'ACos',
            dataIndex: 'acos',
            key: 'acos'
        },
        {
            title: () => <TitleInfo title="Target ACoS"/>,
            dataIndex: 'targetACoS',
            key: 'targetACoS'
        },
        {
            ...actionField
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
            ...actionField
        },
        {
            ...infoField
        }
    ],
    [pausedManualPATHighACoS]: [
        ...defaultKeys,
        {
            title: 'ACos',
            dataIndex: 'acos',
            key: 'acos'
        },
        {
            title: () => <TitleInfo title="Target ACoS"/>,
            dataIndex: 'targetACoS',
            key: 'targetACoS'
        },
        {
            ...actionField
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
            key: 'averageConvRate'
        },
        {
            title: () => <TitleInfo title="Clicks"/>,
            dataIndex: 'clicks',
            key: 'clicks'
        },
        {
            ...actionField
        },
        {
            ...infoField
        }
    ]
};

const PATsOptimization = ({data, totalSize, showPagination, onChangeSubTab}) => {
    const [activeTable, changeTable] = useState(changedPATBidACoS);
    const {count, loading, productId} = useSelector(state => ({
        count: state.reports.counts['pats-optimization'].subtypesCounts,
        loading: state.reports.loading,
        productId: state.products.selectedProduct.id
    }));

    const onChange = (tab) => {
        onChangeSubTab(tab);
        changeTable(tab);
    };

    useEffect(() => changeTable(changedPATBidACoS), [productId]);

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

export default PATsOptimization;
