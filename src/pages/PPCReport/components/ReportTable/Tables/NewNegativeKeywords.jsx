import React, { Component } from 'react';
import Table from '../../../../../components/Table';
import TableButton from '../TableButton';

import { indexField, dateField, actionField } from './const';


const highACoS = 'highACoS';
const noSales = 'noSales';

const dataSource = [
    {
        id: '1',
        campaign: 'Mike',
        adGroup: 32,
        PatType: '10 Downing Street',
        PatIntentType: '10 Downing Street',
        PatValue: 'test1',
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


const columnsNewNegativeKeywords = {
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
    ],

};

class KeywordsOptimization extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTable: highACoS,
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
                    dataSource={dataSource}
                    columns={columnsNewNegativeKeywords[activeTable]}
                />
            </div>
        );
    }
}

KeywordsOptimization.propTypes = {};

KeywordsOptimization.defaultProps = {};

export default KeywordsOptimization;
