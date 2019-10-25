import React, {Component} from 'react';
import Table from '../../../../../components/Table/Table';
import TitleInfo from '../../../../../components/Table/renders/TitleInfo';
import {indexField, dateField, actionField, infoField} from './const';
import TableButton from '../TableButton/TableButton';
import TableApi from './TableApi';

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

class PATsOptimization extends Component {
    state = {
        activeTable: changedPATBidACoS,
        currentPage: 1,
        productId: this.props.productId
    };

    componentDidMount() {
        const {activeTable} = this.state;

        this.initialFetch(activeTable)
    }

    componentDidUpdate(nextProps) {
        const {totalTypeSize, updateTotalTypeSize} = this.props,
            {activeTable} = this.state;

        if (totalTypeSize !== nextProps.totalTypeSize) {
            updateTotalTypeSize('pats-optimization', totalTypeSize);
        }

        if (nextProps.productId !== this.state.productId) {
           this.initialFetch(activeTable)
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.productId !== state.productId) {
               return {...props, productId: props.productId}
        } else {
            return null
        }
    }

    initialFetch = activeTable => {
        const {fetchData} = this.props;

        fetchData(activeTable, 1, this.state.productId);
    };

    handlePaginationChange = currentPage => {
        const {activeTable} = this.state;
        const {fetchData} = this.props;

        this.setState({currentPage});
        fetchData(activeTable, currentPage);
    };

    changeTable = activeTable => {
        this.setState({
            activeTable,
            currentPage: 1
        });
        this.initialFetch(activeTable);
    };

    render() {
        const {activeTable, currentPage} = this.state;
        const {data, loading, totalSize, showPagination, count} = this.props;

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
