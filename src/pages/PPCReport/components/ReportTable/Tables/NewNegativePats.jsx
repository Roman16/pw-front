import React, { Component } from 'react';
import Table from '../../../../../components/Table';
import {
    indexField, dateField, actionField, infoField,
} from './const';
import TableButton from '../TableButton';


const HighACoS = 'HighACoS';
const NoSales = 'NoSales';

const dataSource = [
    {
        id: '1',
        campaign: 'Mike',
        adGroup: 32,
        PatType: '10 Downing Street',
        PatIntentType: '10 Downing Street',
        PatValue: 'test1',
        customerSearchTerm: 'test1',
        CSTACOS: 'test1',
        TargeACoS: 'test1',
        averageConvRate: 'test1',
        CSTClicks: 'test1',
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
                    dataSource={dataSource}
                    columns={columns[activeTable]}
                />
            </div>
        );
    }
}

NewNegativePats.propTypes = {};

NewNegativePats.defaultProps = {};

export default NewNegativePats;
