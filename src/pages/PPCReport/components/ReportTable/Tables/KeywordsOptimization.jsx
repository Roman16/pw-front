import React, { Component } from 'react';
import { Tooltip } from 'antd';
import Table from '../../../../../components/Table';
import TableButton from '../TableButton';
import {
    indexField, dateField, actionField, infoField,
} from './const';

const changedKeywordBidAcos = 'changedKeywordBidAcos';
const changedKeywordBidImpression = 'changedKeywordBidImpression';
const pausedKeywordHighAcos = 'pausedKeywordHighAcos';
const pausedKeywordNoSales = 'pausedKeywordNoSales';

const dataSource = [
    {
        id: '1',
        campaign: 'Mike',
        adGroup: 32,
        keyword: '10 Downing Street',
        matchType: '10 Downing Street',
        acos: 'acos',
        targetACoS: 'targetACoS',
        averageConvRate: 'averageConvRate',
        impressions: 'impressions',
        targetImpressions: 'targetImpressions',
        clicks: '',
        info: 'test1',
    },
    {
        id: '2',
        campaign: 'Mike2',
        adGroup: 434,
        keyword: '13 Downing Street',
        matchType: '14 Downing Street',
        info: 'test12',
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


const columnsKeywordsOptimization = {
    [changedKeywordBidAcos]: [
        ...defaultKeys,
        {
            title: 'ACos',
            dataIndex: 'acos',
            key: 'acos',
        },
        {
            title: 'Target ACoS',
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
            title: 'Target Impressions',
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
            title: 'Target ACoS',
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
            title: 'Clicks',
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
        };
    }


    changeTable = (nameTable) => {
        this.setState({ activeTable: nameTable });
    };

    render() {
        const { activeTable } = this.state;

        console.log(activeTable);

        return (
            <div className="ReportItemTable">
                <TableButton
                    active={changedKeywordBidAcos === activeTable}
                    onClick={() => {
                        this.changeTable(changedKeywordBidAcos);
                    }}
                >
                    Changed Keyword Bid (ACoS)
                </TableButton>
                <TableButton
                    active={changedKeywordBidImpression === activeTable}
                    onClick={() => {
                        this.changeTable(changedKeywordBidImpression);
                    }}
                >
                    Changed Keyword Bid (Impressions)
                </TableButton>
                <TableButton
                    active={pausedKeywordHighAcos === activeTable}
                    onClick={() => {
                        this.changeTable(pausedKeywordHighAcos);
                    }}
                >
                    Paused Keyword (High ACoS)
                </TableButton>
                <TableButton
                    active={pausedKeywordNoSales === activeTable}

                    onClick={() => {
                        this.changeTable(pausedKeywordNoSales);
                    }}
                >
                    Paused Keyword (No Sales)
                </TableButton>

                <Table
                    dataSource={dataSource}
                    columns={columnsKeywordsOptimization[activeTable]}
                />
            </div>
        );
    }
}

KeywordsOptimization.propTypes = {};

KeywordsOptimization.defaultProps = {};

export default KeywordsOptimization;
