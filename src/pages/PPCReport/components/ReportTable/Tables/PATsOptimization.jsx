import React, { Component } from 'react';
import { Tooltip } from 'antd';
import Table from '../../../../../components/Table';
import {
    indexField, dateField, actionField, infoField,
} from './const';
import TableButton from '../TableButton';


const changedPATBidACoS = 'changedPATBidACoS';
const changedPATBidImpressions = 'changedPATBidImpressions';
const pausedManualPATHighACoS = 'pausedManualPATHighACoS';
const pausedManualPatNoSales = 'pausedManualPatNoSales';

const dataSource = [
    {
        id: '1',
        campaign: 'Mike',
        adGroup: 32,
        PatType: '10 Downing Street',
        PatIntentType: '10 Downing Street',
        PatValue: 'test1',
        impressions: 'test1',
        targetImpressions: 'test1',
        targetACoS: 'test1',
        acos: 'test1',
        averageConvRate: 'test1',
        clicks: 'test1',
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
    {
        title: 'Ad Group',
        dataIndex: 'adGroup',
        key: 'adGroup',
    },
    {
        title: 'PAT type(i)',
        dataIndex: 'PatType',
        key: 'PatType ',
    },
    {
        title: 'Pat Intent Type',
        dataIndex: 'PatIntentType',
        key: 'PatIntentType',
    },
    {
        title: 'Pat Value',
        dataIndex: 'PatValue',
        key: 'PatValue',
    },
];


const columnsPATOptimizations = {
    [changedPATBidACoS]: [
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
    [changedPATBidImpressions]: [
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
            ...actionField,

        },
        {
            ...infoField,
        },
    ],
    [pausedManualPATHighACoS]: [
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
    [pausedManualPatNoSales]: [
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

class PATsOptimization extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTable: changedPATBidACoS,
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
                    active={activeTable === changedPATBidACoS}
                    onClick={() => {
                        this.changeTable(changedPATBidACoS);
                    }}
                >
                    Changed PAT Bid (ACoS)
                </TableButton>
                <TableButton
                    active={activeTable === changedPATBidImpressions}
                    onClick={() => {
                        this.changeTable(changedPATBidImpressions);
                    }}
                >
                    Changed PAT Bid (Impressions)
                </TableButton>
                <TableButton
                    active={activeTable === pausedManualPATHighACoS}
                    onClick={() => {
                        this.changeTable(pausedManualPATHighACoS);
                    }}
                >
                    Paused Manual PAT (High ACoS)
                </TableButton>
                <TableButton
                    active={activeTable === pausedManualPatNoSales}
                    onClick={() => {
                        this.changeTable(pausedManualPatNoSales);
                    }}
                >
                    Paused Manual Pat (No Sales)
                </TableButton>

                <Table
                    dataSource={dataSource}
                    columns={columnsPATOptimizations[activeTable]}
                />
            </div>
        );
    }
}

PATsOptimization.propTypes = {};

PATsOptimization.defaultProps = {};

export default PATsOptimization;
