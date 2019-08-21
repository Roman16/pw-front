import React, { Component } from 'react';
import { Tooltip } from 'antd';
import Table from '../../../../../components/Table';
import TableButton from '../TableButton';
import { indexField, dateField, actionField, infoField } from './const';


const createdCampaign = 'createdCampaign';
const createdAdGroup = 'createdAdGroup';
const createdProductAd = 'createdProductAd';
const createdCrossNegativeKeyword = 'createdCrossNegativeKeyword';
const createdKeywordCST = 'createdKeywordCST';

const dataSource = [
    {
        id: '1',
        campaign: 'Mike',
        adGroup: 32,
        campaignTargetingType: '',
        dailyBudget: '',
        startDate: '',
        defaultBid: '',
        asin: '',
        sku: '',
        keyword: '',
        bid: '',
        CSTclicks: '',
        CSTACOS: '',
        CSTCPC: '',
        TargeACoS: '',
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
                    dataSource={dataSource}
                    columns={columns[activeTable]}
                />
            </div>
        );
    }
}

NewKeywords.propTypes = {};

NewKeywords.defaultProps = {};

export default NewKeywords;
