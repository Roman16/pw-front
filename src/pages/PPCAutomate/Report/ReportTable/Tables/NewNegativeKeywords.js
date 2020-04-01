import React from 'react';
import TitleInfo from '../../../../../components/Table/renders/TitleInfo';
import {infoField, negativeMatchTypeField, averageCVRField} from './const';
import {round} from "../../../../../utils/round";
import {numberMask} from "../../../../../utils/numberMask";
import {ColumnMenuFilter, ColumnNumberFilter, ColumnTextFilter,} from "./columnFilter";

const highACoS = 'created-negative-keyword-from-cst-high-acos';
const noSales = 'created-negative-keyword-from-cst-no-sales';

export const newNegativeKeywords = ({
                                 onChangeFilter,
                                 filteredColumns,
                             }) => {

    const defaultKeys = [
        {
            title: 'Campaign',
            dataIndex: 'd_campaignName',
            key: 'd_campaignName',
            width: '180px',
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
            width: '180px',
            sorter: true,
            filter: (dataIndex) => <ColumnTextFilter
                onChangeFilter={onChangeFilter}
                filteredColumns={filteredColumns}
                dataIndex={dataIndex}
            />
        },
        {
            title: 'Keyword',
            dataIndex: 'd_keywordText',
            key: 'd_keywordText',
            width: '180px',
            sorter: true,
            filter: (dataIndex) => <ColumnTextFilter
                onChangeFilter={onChangeFilter}
                filteredColumns={filteredColumns}
                dataIndex={dataIndex}
            />
        },
        {
            ...negativeMatchTypeField,
            key: 'd_negativeKeywordMatchType',
            width: '15em',
            sorter: true,
            filter: (dataIndex) => <ColumnMenuFilter
                onChangeFilter={onChangeFilter}
                filteredColumns={filteredColumns}
                dataIndex={dataIndex}
                menu={[
                    {label: 'Negative Exact', value: 'negativeExact'},
                    {label: 'Negative Phrase', value: 'negativePhrase'}
                ]}
            />
        }
    ];


    return ({
            columns: {
                [highACoS]: [
                    ...defaultKeys,
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
                        width: '12.5em',
                        render: text => <span>{text && `${round(+text * 100, 2)}%`}</span>,
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
                                title="Target ACoS"
                                info="The ACoS that our algorithm is aiming to reach your business goal."
                            />
                        ),
                        dataIndex: 'd_targetACoSCalculation_d_targetACoS',
                        key: 'd_targetACoSCalculation_d_targetACoS',
                        width: '14em',
                        render: text => <span>{text && `${round(+text * 100, 2)}%`}</span>,
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
                                title="CST Clicks"
                                info="It displays the number of clicks of certain customer search-term."
                            />
                        ),
                        dataIndex: 'd_customerSearchTermClicks',
                        key: 'd_customerSearchTermClicks',
                        width: '13em',
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
                        width: '10.5em',
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
                        width: '10em',
                        render: (sales) => (sales && <span>${numberMask(sales, 2)}</span>),
                        sorter: true,
                        filter: (dataIndex) => <ColumnNumberFilter
                            onChangeFilter={onChangeFilter}
                            filteredColumns={filteredColumns}
                            dataIndex={dataIndex}
                        />
                    },
                    {
                        ...averageCVRField(onChangeFilter, filteredColumns)
                    },
                    {
                        title: 'Action',
                        dataIndex: 'action',
                        key: 'action',
                        width: '100px',
                        className: 'left-border',
                        render: () => <div className="action-field">Created</div>
                    },
                    {
                        ...infoField
                    }
                ],
                [noSales]: [
                    ...defaultKeys,
                    {
                        ...averageCVRField(onChangeFilter, filteredColumns)
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
                        width: '13em',
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
                        width: '10.5em',
                        render: (spend) => (spend && <span>${numberMask(spend, 2)}</span>),
                        sorter: true,
                        filter: (dataIndex) => <ColumnNumberFilter
                            onChangeFilter={onChangeFilter}
                            filteredColumns={filteredColumns}
                            dataIndex={dataIndex}
                        />
                    },
                    // {
                    //     title: 'CST Sales',
                    //     dataIndex: 'd_customerSearchTermSales',
                    //     key: 'd_customerSearchTermSales',
                    //     width: '9em',
                    //     render: (sales) => (sales && <span>${numberMask(sales, 2)}</span>),
                    //     sorter: true,
                    //     filter: (dataIndex) => <ColumnNumberFilter
                    //         onChangeFilter={onChangeFilter}
                    //         filteredColumns={filteredColumns}
                    //         dataIndex={dataIndex}
                    //     />
                    // },
                    {
                        title: 'Action',
                        dataIndex: 'action',
                        key: 'action',
                        width: '100px',
                        className: 'left-border',
                        render: () => <div className="action-field">Created</div>
                    },
                    {
                        ...infoField
                    }
                ]
            },
            subTabs: [
                {
                    title: <>Created Negative Keyword From CST (<span className='underline'>High ACoS</span>)</>,
                    key: highACoS
                },
                {
                    title: <>Created Negative Keyword From CST (<span className='underline'>No Sales</span>)</>,
                    key: noSales
                },
            ]
        }
    );
};