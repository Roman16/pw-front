import React, { Component } from 'react';
import Table from '../../../../../components/Table';
import { indexField, dateField, actionField, infoField } from './const';
import TableButton from '../TableButton';


const CreatedCrossNegativePAT = 'CreatedCrossNegativePAT ';
const CreatedPATCST = 'CreatedPATCST';

const dataSource = [
    {
        id: '1',
        campaign: 'Mike',
        adGroup: 32,
        PatType: '10 Downing Street',
        PatIntentType: '10 Downing Street',
        PatValue: 'test1',
        bid: 'test1',
        customerSearchTerm: 'test1',
        CSTClicks: 'test1',
        CSTACOS: 'test1',
        CSTCPC: 'test1',
        TargeACoS: 'test1',
    },
    {
        id: '2',
        campaign: 'Mike2',
        adGroup: 434,
        PatType: '13 Downing Street',
        PatIntentType: '14 Downing Street',
        PatValue: 'test12',
    },
];


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
        title: 'PatIntent Type',
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

class NewPats extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTable: CreatedCrossNegativePAT,
        };
    }


    changeTable = (nameTable) => {
        this.setState({ activeTable: nameTable });
    };

    render() {
        const { activeTable } = this.state;


        return (
            <div className="ReportItemTable">
                <TableButton
                    active={activeTable === CreatedCrossNegativePAT}
                    onClick={() => {
                        this.changeTable(CreatedCrossNegativePAT);
                    }}
                >
                    Created Cross-Negative PAT
                </TableButton>
                <TableButton
                    active={activeTable === CreatedPATCST}
                    onClick={() => {
                        this.changeTable(CreatedPATCST);
                    }}
                >
                    Created PAT (CST)
                </TableButton>
                <Table
                    dataSource={dataSource}
                    columns={columns[activeTable]}
                />
            </div>
        );
    }
}

NewPats.propTypes = {};

NewPats.defaultProps = {};

export default NewPats;
