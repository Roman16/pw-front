import React, { Component } from 'react';
import Table from '../../../../../components/Table';
import { TitleInfo } from '../../../../../components/Table/renders';
import TableButton from '../TableButton';
import {
    indexField, dateField, actionField, infoField,
} from './const';
import TableApi from '../../../Hoc/TableApi';

const changedKeywordBidAcos = 'changed-keyword-bid-acos';
const changedKeywordBidImpression = 'changed-keyword-bid-impressions';
const pausedKeywordHighAcos = 'paused-keyword-high-acos';
const pausedKeywordNoSales = 'paused-keyword-no-sales';


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
        title: 'Keyword',
        dataIndex: 'keyword',
        key: 'keyword',
    },
    {
        title: 'Match Type',
        dataIndex: 'matchType',
        key: 'matchType',
    },
];


const columns = {
    [changedKeywordBidAcos]: [
        ...defaultKeys,
        {
            title: 'ACos',
            dataIndex: 'acos',
            key: 'acos',
        },
        {
            title: () => <TitleInfo title="Target ACoS" />,
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
    [changedKeywordBidImpression]: [
        ...defaultKeys,
        {
            title: 'Impressions',
            dataIndex: 'impressions',
            key: 'impressions',
        },
        {
            title: () => <TitleInfo title="Target Impressions" />,
            dataIndex: 'targetImpressions',
            key: 'targetImpressions',
        }, {
            ...actionField,
        },
        {
            ...infoField,
        },
    ],
    [pausedKeywordHighAcos]: [
        ...defaultKeys,
        {
            title: 'ACos',
            dataIndex: 'acos',
            key: 'acos',
        },
        {
            title: () => <TitleInfo title="Target ACoS" />,
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
    [pausedKeywordNoSales]: [
        ...defaultKeys,
        {
            title: 'Average Conv. Rate',
            dataIndex: 'averageConvRate',
            key: 'averageConvRate',
        },
        {
            title: () => <TitleInfo title="Clicks" />,
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

class KeywordsOptimization extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTable: changedKeywordBidAcos,
            currentPage: 1,
        };
    }

    componentDidMount() {
        const { activeTable } = this.state;

        this.initialFetch(activeTable);
    }

    componentDidUpdate(nextProps) {
        const { totalTypeSize, updateTotalTypeSize } = this.props;

        if (totalTypeSize !== nextProps.totalTypeSize) {
            updateTotalTypeSize('keywords-optimization', totalTypeSize);
        }
    }

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

    changeTable = (activeTable) => {
        this.setState({
            activeTable,
            currentPage: 1,
        });
        this.initialFetch(activeTable);
    };

    render() {
        const { activeTable, currentPage } = this.state;
        const {
            data, loading, totalSize, showPagination, count,
        } = this.props;

        return (
            <div className="ReportItemTable">
                <div className="ReportItemTable__Buttons">
                    <TableButton
                        active={changedKeywordBidAcos === activeTable}
                        count={count[changedKeywordBidAcos]}

                        onClick={() => {
                            this.changeTable(changedKeywordBidAcos);
                        }}
                    >
                        Changed Keyword Bid (ACoS)
                    </TableButton>
                    <TableButton
                        active={changedKeywordBidImpression === activeTable}
                        count={count[changedKeywordBidImpression]}
                        onClick={() => {
                            this.changeTable(changedKeywordBidImpression);
                        }}
                    >
                        Changed Keyword Bid (Impressions)
                    </TableButton>
                    <TableButton
                        active={pausedKeywordHighAcos === activeTable}
                        count={count[pausedKeywordHighAcos]}
                        onClick={() => {
                            this.changeTable(pausedKeywordHighAcos);
                        }}
                    >
                        Paused Keyword (High ACoS)
                    </TableButton>
                    <TableButton
                        active={pausedKeywordNoSales === activeTable}
                        count={count[pausedKeywordNoSales]}
                        onClick={() => {
                            this.changeTable(pausedKeywordNoSales);
                        }}
                    >
                        Paused Keyword (No Sales)
                    </TableButton>
                </div>

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

KeywordsOptimization.propTypes = {};

KeywordsOptimization.defaultProps = {};

export default TableApi(KeywordsOptimization, 'keywords-optimization');
