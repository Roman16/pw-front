import React from 'react';
import TitleInfo from '../../../../../components/Table/renders/TitleInfo';
import {
    patIntentField,
    averageCVRField,
    createdKeywordsActionField,
    infoField,
} from './const';
import {numberMask} from "../../../../../utils/numberMask";
import {ColumnMenuFilter, ColumnNumberFilter, ColumnTextFilter} from "./columnFilter";
import {round} from "../../../../../utils/round";

const CreatedCrossNegativePAT = 'created-cross-negative-pat';
const CreatedPATCST = 'created-pat-cst';

export const newPats = ({
                     onChangeFilter,
                     filteredColumns,
                 }) => {
    return ({
        columns: {
            [CreatedCrossNegativePAT]: [
                {
                    title: 'Campaign',
                    dataIndex: 'd_campaignName',
                    key: 'd_campaignName',
                    width: '200px',
                    sorter: true,
                    filter: (dataIndex) => <ColumnTextFilter
                        onChangeFilter={onChangeFilter}
                        filteredColumns={filteredColumns}
                        dataIndex={dataIndex}
                    />
                },
                {
                    title: 'Ad Group',
                    dataIndex: 'd_adGroupName',
                    key: 'd_adGroupName',
                    width: '9em',
                    sorter: true,
                    filter: (dataIndex) => <ColumnTextFilter
                        onChangeFilter={onChangeFilter}
                        filteredColumns={filteredColumns}
                        dataIndex={dataIndex}
                    />
                },
                {
                    title: (
                        <TitleInfo
                            position='top'
                            title="PAT type"
                            info="The type of Product Targeting. It can be a Manual or Auto."
                        />
                    ),
                    dataIndex: 'd_patType',
                    key: 'd_patType',
                    width: '10.5em',
                    render: str => <span className="capitalize-field">{str}</span>,
                    sorter: true,
                    filter: (dataIndex) => <ColumnMenuFilter
                        onChangeFilter={onChangeFilter}
                        filteredColumns={filteredColumns}
                        dataIndex={dataIndex}
                        menu={[
                            {label: 'Auto', value: 'auto'},
                            {label: 'Manual', value: 'manual'}
                        ]}
                    />
                },
                {
                    ...patIntentField(onChangeFilter, filteredColumns),
                    width: '13.5em',
                },
                {
                    title: (
                        <TitleInfo
                            position='top'
                            title="PAT Value"
                            info="Manual Product Targetings have specific value assigned to them to match your ads to shoppers. Type of this value depends on PAT's Intent Type. For ASIN Intent Type value may be: B01F9RH0R4. For Category - Cell Phones & Accessories."
                        />
                    ),
                    dataIndex: 'd_patValue',
                    key: 'd_patValue',
                    width: '13em',
                    sorter: true,
                    filter: (dataIndex) => <ColumnTextFilter
                        onChangeFilter={onChangeFilter}
                        filteredColumns={filteredColumns}
                        dataIndex={dataIndex}
                    />
                },
                {
                    ...createdKeywordsActionField
                },
                {
                    ...infoField
                }
            ],
            [CreatedPATCST]: [
                {
                    title: 'Campaign',
                    dataIndex: 'd_campaignName',
                    key: 'd_campaignName',
                    width: '150px',
                    sorter: true,
                    filter: (dataIndex) => <ColumnTextFilter
                        onChangeFilter={onChangeFilter}
                        filteredColumns={filteredColumns}
                        dataIndex={dataIndex}
                    />
                },
                {
                    title: 'Ad Group',
                    dataIndex: 'd_adGroupName',
                    key: 'd_adGroupName',
                    width: '150px',
                    sorter: true,
                    filter: (dataIndex) => <ColumnTextFilter
                        onChangeFilter={onChangeFilter}
                        filteredColumns={filteredColumns}
                        dataIndex={dataIndex}
                    />
                },
                {
                    title: (
                        <TitleInfo
                            position='top'
                            title="PAT type"
                            info="The type of Product Targeting. It can be a Manual or Auto."
                        />
                    ),
                    dataIndex: 'd_patType',
                    key: 'd_patType',
                    width: '10em',
                    render: str => <span className="capitalize-field">{str}</span>,
                    sorter: true,
                    filter: (dataIndex) => <ColumnMenuFilter
                        onChangeFilter={onChangeFilter}
                        filteredColumns={filteredColumns}
                        dataIndex={dataIndex}
                        menu={[
                            {label: 'Auto', value: 'auto'},
                            {label: 'Manual', value: 'manual'}
                        ]}
                    />
                },
                {
                    ...patIntentField(onChangeFilter, filteredColumns),
                    width: '13em',
                },
                {
                    title: (
                        <TitleInfo
                            position='top'
                            title="PAT Value"
                            info="Manual Product Targetings have specific value assigned to them to match your ads to shoppers. Type of this value depends on PAT's Intent Type. For ASIN Intent Type value may be: B01F9RH0R4. For Category - Cell Phones & Accessories."
                        />
                    ),
                    dataIndex: 'd_patValue',
                    key: 'd_patValue',
                    width: '150px',
                    sorter: true,
                    filter: (dataIndex) => <ColumnTextFilter
                        onChangeFilter={onChangeFilter}
                        filteredColumns={filteredColumns}
                        dataIndex={dataIndex}
                    />
                },
                {
                    title: 'Bid',
                    dataIndex: 'd_bid',
                    key: 'd_bid',
                    width: '6em',
                    render: text => (text != null && <span>${numberMask(text, 2)}</span>),
                    sorter: true,
                    filter: (dataIndex) => <ColumnNumberFilter
                        onChangeFilter={onChangeFilter}
                        filteredColumns={filteredColumns}
                        dataIndex={dataIndex}
                    />
                },
                {
                    title: (
                        <TitleInfo
                            position='top'
                            title="CST Clicks"
                            info="It displays the number of clicks of certain customer search-term."
                        />
                    ),
                    dataIndex: 'd_customerSearchTermClicks',
                    key: 'd_customerSearchTermClicks',
                    width: '11em',
                    sorter: true,
                    filter: (dataIndex) => <ColumnNumberFilter
                        onChangeFilter={onChangeFilter}
                        filteredColumns={filteredColumns}
                        dataIndex={dataIndex}
                    />
                },
                {
                    title: 'CST Spend',
                    dataIndex: 'd_customerSearchTermSpend',
                    key: 'd_customerSearchTermSpend',
                    width: '9.5em',
                    render: (spend) => (spend && <span>${numberMask(spend, 2)}</span>),
                    sorter: true,
                    filter: (dataIndex) => <ColumnNumberFilter
                        onChangeFilter={onChangeFilter}
                        filteredColumns={filteredColumns}
                        dataIndex={dataIndex}
                    />
                },
                {
                    title: 'CST Sales',
                    dataIndex: 'd_customerSearchTermSales',
                    key: 'd_customerSearchTermSales',
                    width: '9em',
                    render: (sales) => (sales && <span>${numberMask(sales, 2)}</span>),
                    sorter: true,
                    filter: (dataIndex) => <ColumnNumberFilter
                        onChangeFilter={onChangeFilter}
                        filteredColumns={filteredColumns}
                        dataIndex={dataIndex}
                    />
                },
                {
                    title: (
                        <TitleInfo
                            position='top'
                            title="CST ACoS"
                            info="It displays the ACoS of certain customer search-term from your ad reports. "
                        />
                    ),
                    dataIndex: 'd_customerSearchTermACoS',
                    key: 'd_customerSearchTermACoS',
                    render: text => <span>{text && `${round(+text * 100, 2)}%`}</span>,
                    width: '10.5em',
                    sorter: true,
                    filter: (dataIndex) => <ColumnNumberFilter
                        onChangeFilter={onChangeFilter}
                        filteredColumns={filteredColumns}
                        dataIndex={dataIndex}
                        percent={true}
                    />
                },
                {
                    title: (
                        <TitleInfo
                            position='top'
                            title="CST CPC"
                            info="It displays the cost per click of certain customer search-term."
                        />
                    ),
                    dataIndex: 'd_customerSearchTermCPC',
                    key: 'd_customerSearchTermCPC',
                    render: text => (text != null && <span>${numberMask(text, 2)}</span>),
                    width: '10em',
                    sorter: true,
                    filter: (dataIndex) => <ColumnNumberFilter
                        onChangeFilter={onChangeFilter}
                        filteredColumns={filteredColumns}
                        dataIndex={dataIndex}
                    />
                },
                {
                    title: (
                        <TitleInfo
                            position='top'
                            title="Target ACoS"
                            info="The ACoS that our algorithm is aiming to reach your business goal."
                        />
                    ),
                    dataIndex: 'd_targetACoSCalculation_d_targetACoS',
                    key: 'd_targetACoSCalculation_d_targetACoS',
                    render: text => <span>{text && `${round(+text * 100, 2)}%`}</span>,
                    width: '12em',
                    sorter: true,
                    filter: (dataIndex) => <ColumnNumberFilter
                        onChangeFilter={onChangeFilter}
                        filteredColumns={filteredColumns}
                        dataIndex={dataIndex}
                        percent={true}
                    />
                },
                {
                    ...averageCVRField(onChangeFilter, filteredColumns)
                },
                {
                    title: 'Action',
                    dataIndex: 'action',
                    key: 'action',
                    width: '60px',
                    className: 'left-border',
                    render: () => <div className="action-field">Created</div>
                },
                {
                    ...infoField
                }
            ]
        },
        subTabs: [
            {title: <>Created Cross-Negative PAT</>, key: CreatedCrossNegativePAT},
            {title: <>Created PAT (<span className='underline'>CST</span>)</>, key: CreatedPATCST},
        ]

    });
};

