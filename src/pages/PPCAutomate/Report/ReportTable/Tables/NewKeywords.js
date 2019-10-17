import React, { Component } from 'react';
import moment from 'moment';
import Table from '../../../../../components/Table/Table';
import TableButton from '../TableButton/TableButton';
import { indexField, dateField, actionField, infoField } from './const';
import TableApi from '../../Hoc/TableApi';

const createdCampaign = 'created-campaign';
const createdAdGroup = 'created-ad-group';
const createdProductAd = 'created-product-ad';
const createdCrossNegativeKeyword = 'created-cross-negative-keyword';
const createdKeywordCST = 'created-keyword-cst';

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
    }
];

const columns = {
    [createdCampaign]: [
        ...defaultKeys,
        {
            title: 'Ad Group',
            dataIndex: 'adGroup',
            key: 'adGroup'
        },
        {
            title: 'Campaign Targeting Type',
            dataIndex: 'campaignTargetingType',
            key: 'campaignTargetingType'
        },
        {
            title: 'Daily Budget',
            dataIndex: 'dailyBudget',
            key: 'dailyBudget'
        },
        {
            title: 'Start Date.',
            dataIndex: 'startDate',
            key: 'startDate',
            render: text => moment(text).format('Y/M/D')
        },
        {
            ...actionField
        },
        {
            ...infoField
        }
    ],
    [createdAdGroup]: [
        ...defaultKeys,
        {
            title: 'Ad Group',
            dataIndex: 'adGroup',
            key: 'adGroup'
        },
        {
            title: 'Default Bid',
            dataIndex: 'defaultBid',
            key: 'defaultBid'
        },
        {
            ...actionField
        },
        {
            ...infoField
        }
    ],
    [createdProductAd]: [
        ...defaultKeys,
        {
            title: 'Ad Group',
            dataIndex: 'adGroup',
            key: 'adGroup'
        },
        {
            title: 'ASIN',
            dataIndex: 'asin',
            key: 'asin'
        },
        {
            title: 'SKU',
            dataIndex: 'sku',
            key: 'sku'
        },
        {
            ...actionField
        },
        {
            ...infoField
        }
    ],
    [createdCrossNegativeKeyword]: [
        ...defaultKeys,
        {
            title: 'Ad Group',
            dataIndex: 'adGroup',
            key: 'adGroup'
        },
        {
            title: 'Keyword',
            dataIndex: 'keyword',
            key: 'keyword'
        },
        {
            ...actionField
        },
        {
            ...infoField
        }
    ],
    [createdKeywordCST]: [
        ...defaultKeys,
        {
            title: 'Campaign Type',
            dataIndex: 'campaignTargetingType',
            key: 'campaignTargetingType'
        },
        {
            title: 'Customer Search Term',
            dataIndex: 'customerSearchTerm',
            key: 'customerSearchTerm'
        },
        {
            title: 'Match Type',
            dataIndex: 'matchType',
            key: 'matchType'
        },
        {
            title: 'Bid',
            dataIndex: 'bid',
            key: 'bid'
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
            dataIndex: 'targetACoS',
            key: 'targetACoS'
        },
        {
            ...actionField
        },
        {
            ...infoField
        }
    ]
};

class NewKeywords extends Component {
    state = {
        activeTable: createdCampaign,
        currentPage: 1
    };

    componentDidMount() {
        const { activeTable } = this.state;

        this.initialFetch(activeTable);
    }

    componentDidUpdate(nextProps) {
        const { totalTypeSize, updateTotalTypeSize } = this.props;

        if (totalTypeSize !== nextProps.totalTypeSize) {
            updateTotalTypeSize('new-keywords', totalTypeSize);
        }
    }

    changeTable = activeTable => {
        this.setState({
            activeTable,
            currentPage: 1
        });
        this.initialFetch(activeTable);
    };

    initialFetch = activeTable => {
        const { fetchData } = this.props;

        fetchData(activeTable, 1);
    };

    handlePaginationChange = currentPage => {
        const { activeTable } = this.state;
        const { fetchData } = this.props;

        this.setState({ currentPage });
        fetchData(activeTable, currentPage);
    };

    render() {
        const { activeTable, currentPage } = this.state;
        const { data, loading, totalSize, showPagination, count } = this.props;

        return (
            <div className="ReportItemTable">
                <TableButton
                    active={createdCampaign === activeTable}
                    count={count[createdCampaign]}
                    onClick={() => {
                        this.changeTable(createdCampaign);
                    }}
                >
                    Created Campaign
                </TableButton>
                <TableButton
                    active={createdAdGroup === activeTable}
                    count={count[createdAdGroup]}
                    onClick={() => {
                        this.changeTable(createdAdGroup);
                    }}
                >
                    Created Ad Group
                </TableButton>
                <TableButton
                    active={createdProductAd === activeTable}
                    count={count[createdProductAd]}
                    onClick={() => {
                        this.changeTable(createdProductAd);
                    }}
                >
                    Created Product Ad
                </TableButton>
                <TableButton
                    active={createdCrossNegativeKeyword === activeTable}
                    count={count[createdCrossNegativeKeyword]}
                    onClick={() => {
                        this.changeTable(createdCrossNegativeKeyword);
                    }}
                >
                    Created Cross-Negative Keyword
                </TableButton>
                <TableButton
                    active={createdKeywordCST === activeTable}
                    count={count[createdKeywordCST]}
                    onClick={() => {
                        this.changeTable(createdKeywordCST);
                    }}
                >
                    Created Keyword (CST)
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

NewKeywords.propTypes = {};

NewKeywords.defaultProps = {};

export default TableApi(NewKeywords, 'new-keywords');
