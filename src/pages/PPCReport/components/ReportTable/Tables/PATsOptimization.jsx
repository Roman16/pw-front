import React, { Component } from 'react';
import { Tooltip } from 'antd';
import Table from '../../../../../components/Table';
import {
    indexField, dateField, actionField, infoField,
} from './const';
import TableButton from '../TableButton';
import TableApi from '../../../Hoc/TableApi';


const changedPATBidACoS = 'changed-pat-bid-acos';
const changedPATBidImpressions = 'changed-pat-bid-impressions';
const pausedManualPATHighACoS = 'paused-manual-pat-high-acos';
const pausedManualPatNoSales = 'paused-manual-pat-no-sales';


const defaultKeys = [
    {
        ...indexField,
    },
    {
        ...dateField,
    },
    {
        title: 'Campaign',
        dataIndex: 'campaign',
        key: 'campaign',
    },
    {
        title: 'Ad Group',
        dataIndex: 'adGroup',
        key: 'adGroup',
    },
    {
        title: 'PAT type(i)',
        dataIndex: 'PatType',
        key: 'PatType ',
    },
    {
        title: 'Pat Intent Type',
        dataIndex: 'PatIntentType',
        key: 'PatIntentType',
    },
    {
        title: 'Pat Value',
        dataIndex: 'PatValue',
        key: 'PatValue',
    },
];


const columns = {
    [changedPATBidACoS]: [
        ...defaultKeys,
        {
            title: 'ACos',
            dataIndex: 'acos',
            key: 'acos',
        },
        {
            title: 'Target ACoS',
            dataIndex: 'targetACoS',
            key: 'targetACoS',
        },
        {
            ...actionField,
        },
        {
            ...infoField,
        },
    ],
    [changedPATBidImpressions]: [
        ...defaultKeys,
        {
            title: 'Impressions',
            dataIndex: 'impressions',
            key: 'impression   s',
        },
        {
            title: 'Target Impressions',
            dataIndex: 'targetImpressions',
            key: 'targetImpressions',
        }, {
            ...actionField,

        },
        {
            ...infoField,
        },
    ],
    [pausedManualPATHighACoS]: [
        ...defaultKeys,
        {
            title: 'ACos',
            dataIndex: 'acos',
            key: 'acos',
        },
        {
            title: 'Target ACoS',
            dataIndex: 'targetACoS',
            key: 'targetACoS',
        },
        {
            ...actionField,

        },
        {
            ...infoField,
        },
    ],
    [pausedManualPatNoSales]: [
        ...defaultKeys,
        {
            title: 'Average Conv. Rate',
            dataIndex: 'averageConvRate',
            key: 'averageConvRate',
        },
        {
            title: 'Clicks',
            dataIndex: 'clicks',
            key: 'clicks',
        },
        {
            ...actionField,

        },
        {
            ...infoField,
        },
    ],
};

class PATsOptimization extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTable: changedPATBidACoS,
            currentPage: 1,

        };
    }


    componentDidMount() {
        const { activeTable } = this.state;

        this.initialFetch(activeTable);
    }

    changeTable = (activeTable) => {
        this.setState({
            activeTable,
            currentPage: 1,
        });
        this.initialFetch(activeTable);
    };

    initialFetch = (activeTable) => {
        const { fetchData } = this.props;

        fetchData(activeTable, 1);
    };

    handlePaginationChange = (currentPage) => {
        const { activeTable } = this.state;
        const { fetchData } = this.props;

        this.setState({ currentPage });
        fetchData(activeTable, currentPage);
    };

    componentDidUpdate(nextProps) {
        const { totalTypeSize, updateTotalTypeSize } = this.props;

        if (totalTypeSize !== nextProps.totalTypeSize) {
            updateTotalTypeSize('pats-optimization', totalTypeSize);
        }
    }

    render() {
        const { activeTable, currentPage } = this.state;
        const {
            data, loading, totalSize, showPagination, count,
        } = this.props;


        return (
            <div className="ReportItemTable">
                <TableButton
                    active={activeTable === changedPATBidACoS}
                    count={count[changedPATBidACoS]}
                    onClick={() => {
                        this.changeTable(changedPATBidACoS);
                    }}
                >
                    Changed PAT Bid (ACoS)
                </TableButton>
                <TableButton
                    active={activeTable === changedPATBidImpressions}
                    count={count[changedPATBidImpressions]}
                    onClick={() => {
                        this.changeTable(changedPATBidImpressions);
                    }}
                >
                    Changed PAT Bid (Impressions)
                </TableButton>
                <TableButton
                    active={activeTable === pausedManualPATHighACoS}
                    count={count[pausedManualPATHighACoS]}
                    onClick={() => {
                        this.changeTable(pausedManualPATHighACoS);
                    }}
                >
                    Paused Manual PAT (High ACoS)
                </TableButton>
                <TableButton
                    active={activeTable === pausedManualPatNoSales}
                    count={count[pausedManualPatNoSales]}
                    onClick={() => {
                        this.changeTable(pausedManualPatNoSales);
                    }}
                >
                    Paused Manual Pat (No Sales)
                </TableButton>

                <Table
                    onChangePagination={this.handlePaginationChange}
                    loading={loading}
                    dataSource={data}
                    columns={columns[activeTable]}
                    currentPage={currentPage}
                    totalSize={totalSize}
                    showPagination={showPagination}
                />
            </div>
        );
    }
}

PATsOptimization.propTypes = {};

PATsOptimization.defaultProps = {};

export default TableApi(PATsOptimization, 'pats-optimization');
