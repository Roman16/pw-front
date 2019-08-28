import React, { Component } from 'react';
import Table from '../../../../../components/Table';
import TableButton from '../TableButton';

import {
    indexField, dateField, actionField, infoField,
} from './const';
import TableApi from '../../../Hoc/TableApi';


const highACoS = 'created-negative-keyword-from-cst-high-acos';
const noSales = 'created-negative-keyword-from-cst-no-sales';



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
    }, {
        title: 'Ad Group',
        dataIndex: 'adGroup',
        key: 'adGroup',
    },
    {
        title: 'Customer Search Term',
        dataIndex: 'customerSearchTerm',
        key: 'customerSearchTerm',
    },
    {
        title: 'Negative Match Type',
        dataIndex: 'negativeMatchType',
        key: 'negativeMatchType',
    },

];


const columns = {
    [highACoS]: [
        ...defaultKeys,
        {
            title: 'CST ACoS',
            dataIndex: 'CSTACoS',
            key: 'CSTACoS',
        },
        {
            title: 'Target',
            dataIndex: 'target',
            key: 'target',
        },
        {
            ...actionField,
        },
        {
            ...infoField,
        },
    ],
    [noSales]: [
        ...defaultKeys,
        {
            title: 'Average Conversion Rate',
            dataIndex: 'averageConversionRate',
            key: 'averageConversionRate',
        },
        {
            title: 'CST Clicks',
            dataIndex: 'CSTClicks',
            key: 'CSTClicks',
        }, {
            ...actionField,
        },
        {
            ...infoField,
        },
    ],

};

class NewNegativeKeywords extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTable: highACoS,
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
                    active={activeTable === highACoS}
                    onClick={() => {
                        this.changeTable(highACoS);
                    }}
                >
                    Created Negative Keyword From CST (High ACoS)
                </TableButton>
                <TableButton
                    active={activeTable === noSales}
                    onClick={() => {
                        this.changeTable(noSales);
                    }}
                >
                    Created Negative Keyword From CST (No Sales)
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

NewNegativeKeywords.propTypes = {};

NewNegativeKeywords.defaultProps = {};

export default TableApi(NewNegativeKeywords, 'new-negative-keywords');
