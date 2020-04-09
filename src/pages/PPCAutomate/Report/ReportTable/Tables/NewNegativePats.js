import React from 'react';
import TitleInfo from '../../../../../components/Table/renders/TitleInfo';
import {patIntentField, infoField, averageCVRField} from './const';
import {round} from "../../../../../utils/round";
import {numberMask} from "../../../../../utils/numberMask";
import {ColumnMenuFilter, ColumnNumberFilter, ColumnTextFilter} from "./columnFilter";

const HighACoS = 'created-negative-pat-from-cst-high-acos';
const NoSales = 'created-negative-pat-from-cst-no-sales';

export const newNegativePats = ({
                                    onChangeFilter,
                                    filteredColumns,
                                }) => {

    const defaultKeys = [
        {
            title: 'Campaign',
            dataIndex: 'd_campaignName',
            key: 'd_campaignName',
            width: '140px',
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
            width: '140px',
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
            width: '12em',
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
            width: '15em',
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
        }
    ];


    return ({
        columns: {
            [HighACoS]: [
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
                    width: '13em',
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
                    width: '70px',
                    className: 'left-border',
                    render: () => <div className="action-field">Created</div>
                },
                {
                    ...infoField
                }
            ],
            [NoSales]: [
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
                    width: '70px',
                    className: 'left-border',
                    render: () => <div className="action-field">Created</div>
                },
                {
                    ...infoField
                }
            ]
        },
        subTabs: [
            {title: <>Created Negative PAT From CST (<span className='underline'>High ACoS</span>)</>, key: HighACoS},
            {title: <>Created Negative PAT From CST (<span className='underline'>No Sales</span>)</>, key: NoSales},
        ]
    });
};

