import React, { Component } from 'react';
import Table from '../../../../../components/Table';
import {
    indexField, dateField, actionField, infoField,
} from './const';
import TableButton from '../TableButton';
import TableApi from '../../../Hoc/TableApi';


const HighACoS = 'created-negative-pat-from-cst-high-acos';
const NoSales = 'created-negative-pat-from-cst-no-sales';


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
        title: 'PAT Type',
        dataIndex: 'PatType',
        key: 'PatType',
    },
    {
        title: 'Pat Intent Type',
        dataIndex: 'PatIntentType',
        key: 'PatIntentType',
    }, {
        title: 'Pat Value',
        dataIndex: 'PatValue',
        key: 'PatValue',
    },
    {
        title: 'Customer Search Term',
        dataIndex: 'customerSearchTerm',
        key: 'customerSearchTerm',
    },


];


const columns = {
    [HighACoS]: [
        ...defaultKeys,
        {
            title: 'CST ACOS',
            dataIndex: 'CSTACOS',
            key: 'CSTACOS',
        },
        {
            title: 'Targe ACoS',
            dataIndex: 'TargeACoS',
            key: 'Targe ACoS',
        },
        {
            ...actionField,
        },
        {
            ...infoField,
        },
    ],
    [NoSales]: [
        ...defaultKeys,
        {
            title: 'Average Conv. Rate',
            dataIndex: 'averageConvRate',
            key: 'averageConvRate',
        },
        {
            title: 'CST Clicks',
            dataIndex: 'CSTClicks',
            key: 'CSTClicks',
        },

        {
            ...actionField,
        },
        {
            ...infoField,
        },
    ],

};

class NewNegativePats extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTable: HighACoS,
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
                    active={activeTable === HighACoS}
                    onClick={() => {
                        this.changeTable(HighACoS);
                    }}
                >
                    Created Negative PAT From CST (High ACoS)
                </TableButton>
                <TableButton
                    active={activeTable === NoSales}
                    onClick={() => {
                        this.changeTable(NoSales);
                    }}
                >
                    Created Negative PAT From CST (No Sales)
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

NewNegativePats.propTypes = {};

NewNegativePats.defaultProps = {};

export default TableApi(NewNegativePats, 'new-negative-pats');
