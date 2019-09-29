import React, { Component } from 'react';
import Table from '../../../../../components/Table';
import {
    indexField, dateField, actionField, infoField,
} from './const';
import TableButton from '../TableButton';
import TableApi from '../../../Hoc/TableApi';
import { TitleInfo } from '../../../../../components/Table/renders';


const CreatedCrossNegativePAT = 'created-cross-negative-pat';
const CreatedPATCST = 'created-pat-cst';


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
        title: () => <TitleInfo title="PAT Type" />,
        dataIndex: 'PatType',
        key: 'PatType',
    },
    {
        title: () => <TitleInfo title="Pat Intent Type" />,
        dataIndex: 'PatIntentType',
        key: 'PatIntentType',
    }, {
        title: 'Pat Value',
        dataIndex: 'PatValue',
        key: 'PatValue',
    },

];


const columns = {
    [CreatedCrossNegativePAT]: [
        ...defaultKeys,
        {
            ...actionField,
        },
        {
            ...infoField,
        },
    ],
    [CreatedPATCST]: [
        ...defaultKeys,
        {
            title: 'Bid',
            dataIndex: 'bid',
            key: 'bid',
        },
        {
            title: 'Customer Search Term',
            dataIndex: 'customerSearchTerm',
            key: 'customerSearchTerm',
        },
        {
            title: 'CST Clicks',
            dataIndex: 'CSTClicks',
            key: 'CSTClicks',
        },
        {
            title: 'CST ACOS',
            dataIndex: 'CSTACoS',
            key: 'CSTACoS',
        },
        {
            title: 'CST CPC',
            dataIndex: 'CSTCPC',
            key: 'CSTCPC',
        },
        {
            title: 'Targe ACoS',
            dataIndex: 'TargetACoS',
            key: 'TargetACoS',
        },
        {
            ...actionField,
        },
        {
            ...infoField,
        },
    ],

};

class NewPats extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTable: CreatedCrossNegativePAT,
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
            updateTotalTypeSize('new-pats', totalTypeSize);
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
                <TableButton
                    active={activeTable === CreatedCrossNegativePAT}
                    count={count[CreatedCrossNegativePAT]}
                    onClick={() => {
                        this.changeTable(CreatedCrossNegativePAT);
                    }}
                >
                    Created Cross-Negative PAT
                </TableButton>
                <TableButton
                    active={activeTable === CreatedPATCST}
                    count={count[CreatedPATCST]}

                    onClick={() => {
                        this.changeTable(CreatedPATCST);
                    }}
                >
                    Created PAT (CST)
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

NewPats.propTypes = {};

NewPats.defaultProps = {};

export default TableApi(NewPats, 'new-pats');
