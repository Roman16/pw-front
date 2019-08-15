import React, { Component } from 'react';
import { Table, Tooltip } from 'antd';


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
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
        },
    ],
    [changedKeywordBidImpression]: [
        ...defaultKeys,
        {
            title: 'Impressions',
            dataIndex: 'impressions',
            key: 'impression   s',
        },
        {
            title: 'Target Impressions',
            dataIndex: 'targetImpressions',
            key: 'targetImpressions',
        }, {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
        },
        {
            title: '',
            dataIndex: 'info',
            key: 'info',
            render: (text) => (
                <Tooltip placement="bottom" title={text}>
                    <div>Bottom</div>
                </Tooltip>
            ),

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
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
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
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
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


        return (
            <div className="ReportTable">
                <button onClick={() => {
                    this.changeTable(changedKeywordBidAcos);
                }}
                >
                    {changedKeywordBidAcos}
                </button>
                <button onClick={() => {
                    this.changeTable(changedKeywordBidImpression);
                }}
                >
                    {changedKeywordBidImpression}
                </button>
                <button onClick={() => {
                    this.changeTable(pausedKeywordHighAcos);
                }}
                >
                    {pausedKeywordHighAcos}
                </button>
                <button onClick={() => {
                    this.changeTable(pausedKeywordNoSales);
                }}
                >
                    {pausedKeywordNoSales}
                </button>

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
