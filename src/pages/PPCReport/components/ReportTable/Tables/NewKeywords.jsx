import React, { Component } from 'react';
import { Tooltip } from 'antd';
import Table from '../../../../../components/Table';
import TableButton from '../TableButton';
import {
    indexField, dateField, actionField, infoField,
} from './const';
import TableApi from '../../../Hoc/TableApi';


const createdCampaign = 'created-campaign';
const createdAdGroup = 'created-ad-group';
const createdProductAd = 'created-product-ad';
const createdCrossNegativeKeyword = 'created-cross-negative-keyword';
const createdKeywordCST = 'created-keyword-cst';


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

];


const columns = {
    [createdCampaign]: [
        ...defaultKeys,
        {
            title: 'Ad Group',
            dataIndex: 'adGroup',
            key: 'adGroup',
        },
        {
            title: 'Campaign Targeting Type',
            dataIndex: 'campaignTargetingType',
            key: 'campaignTargetingType',
        },
        {
            title: 'Daily Budget',
            dataIndex: 'dailyBudget',
            key: 'dailyBudget',
        },
        {
            title: 'Start Date.',
            dataIndex: 'startDate',
            key: 'startDate',
        },
        {
            ...actionField,
        },
        {
            ...infoField,
        },
    ],
    [createdAdGroup]: [
        ...defaultKeys,
        {
            title: 'Ad Group',
            dataIndex: 'adGroup',
            key: 'adGroup',
        },
        {
            title: 'Default Bid',
            dataIndex: 'defaultBid',
            key: 'defaultBid',
        }, {
            ...actionField,
        },
        {
            ...infoField,
        },
    ],
    [createdProductAd]: [
        ...defaultKeys,
        {
            title: 'Ad Group',
            dataIndex: 'adGroup',
            key: 'adGroup',
        },
        {
            title: 'ASIN',
            dataIndex: 'asin',
            key: 'asin',
        },
        {
            title: 'SKU',
            dataIndex: 'sku',
            key: 'sku',
        },
        {
            ...actionField,
        },
        {
            ...infoField,
        },
    ],
    [createdCrossNegativeKeyword]: [
        ...defaultKeys,
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
            ...actionField,
        },
        {
            ...infoField,
        },
    ],
    [createdKeywordCST]: [
        ...defaultKeys,
        {
            title: 'Campaign Type',
            dataIndex: 'campaignType',
            key: 'campaignType',
        },
        {
            title: 'Customer Search Term',
            dataIndex: 'customerSearchTerm',
            key: 'customerSearchTerm',
        },
        {
            title: 'Match Type',
            dataIndex: 'matchType',
            key: 'matchType',
        },
        {
            title: 'Bid',
            dataIndex: 'bid',
            key: 'bid',
        },
        {
            title: 'CST Clicks',
            dataIndex: 'CSTclicks',
            key: 'CSTclicks',
        },
        {
            title: 'CST ACOS',
            dataIndex: 'CSTACOS',
            key: 'CSTACOS',
        },
        {
            title: 'CST CPC',
            dataIndex: 'CSTCPC',
            key: 'CSTCPC',
        },
        {
            title: 'Targe ACoS',
            dataIndex: 'TargeACoS',
            key: 'TargeACoS',
        },
        {
            ...actionField,
        },
        {
            ...infoField,
        },
    ],

};

class NewKeywords extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTable: createdCampaign,
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

    render() {
        const { activeTable, currentPage } = this.state;
        const {
            data, loading, totalSize, showPagination,
        } = this.props;

        return (
            <div className="ReportItemTable">
                <TableButton
                    active={createdCampaign === activeTable}
                    onClick={() => {
                        this.changeTable(createdCampaign);
                    }}
                >
                    Created Campaign
                </TableButton>
                <TableButton
                    active={createdAdGroup === activeTable}
                    onClick={() => {
                        this.changeTable(createdAdGroup);
                    }}
                >
                    Created Ad Group
                </TableButton>
                <TableButton
                    active={createdProductAd === activeTable}
                    onClick={() => {
                        this.changeTable(createdProductAd);
                    }}
                >
                    Created Product Ad
                </TableButton>
                <TableButton
                    active={createdCrossNegativeKeyword === activeTable}
                    onClick={() => {
                        this.changeTable(createdCrossNegativeKeyword);
                    }}
                >
                    Created Cross-Negative Keyword
                </TableButton>
                <TableButton
                    active={createdKeywordCST === activeTable}
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
