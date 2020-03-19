import React from 'react';
import moment from 'moment';
import {indexField, createdKeywordsActionField, infoField, dateField, averageCVRField} from './const';
import TitleInfo from '../../../../../components/Table/renders/TitleInfo';
import {numberMask} from "../../../../../utils/numberMask";
import {ColumnMenuFilter, ColumnTextFilter, ColumnNumberFilter} from "./columnFilter";
import {round} from "../../../../../utils/round";

const createdCampaign = 'created-campaign';
const createdAdGroup = 'created-ad-group';
const createdProductAd = 'created-product-ad';
const createdCrossNegativeKeyword = 'created-cross-negative-keyword';
const createdKeywordCST = 'created-keyword-cst';

export const newKeywords = ({
                                onChangeFilter,
                                filteredColumns,
                            }) => {

    return ({
        columns: {
            [createdCampaign]: [
                {
                    title: 'Campaign',
                    dataIndex: 'd_campaignName',
                    key: 'd_campaignName',
                    width: '230px',
                    sorter: true,
                    filter: (dataIndex) => <ColumnTextFilter
                        onChangeFilter={onChangeFilter}
                        filteredColumns={filteredColumns}
                        dataIndex={dataIndex}
                    />
                },
                {
                    title: 'Type',
                    dataIndex: 'd_campaignType',
                    key: 'd_campaignType',
                    width: '12em',
                    render: (str) => (
                        <span className='capitalize-field'>{str && str.split(/(?=[A-Z])/).join(' ')}</span>),
                    sorter: true,
                    filter: (dataIndex) => <ColumnMenuFilter
                        onChangeFilter={onChangeFilter}
                        filteredColumns={filteredColumns}
                        dataIndex={dataIndex}
                        menu={[
                            {label: 'Sponsored Products', value: 'sponsoredProducts'}
                        ]}
                    />
                },
                {
                    title: 'Targeting Type',
                    dataIndex: 'd_campaignTargetingType',
                    key: 'd_campaignTargetingType',
                    width: '13em',
                    render: (str) => (<span className="capitalize-field">{str}</span>),
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
                    title: 'Daily Budget',
                    dataIndex: 'd_dailyBudget',
                    key: 'd_dailyBudget',
                    width: '11em',
                    render: text => (text != null && <span>{`$${numberMask(text)}`}</span>),
                    sorter: true,
                    filter: (dataIndex) => <ColumnNumberFilter
                        onChangeFilter={onChangeFilter}
                        filteredColumns={filteredColumns}
                        dataIndex={dataIndex}
                    />
                },
                {
                    title: 'Start Date',
                    dataIndex: 'd_startDate',
                    key: 'd_startDate',
                    width: '13em',
                    render: date => moment.utc(date).tz('America/Los_Angeles').format('YYYY-MM-DD'),
                    sorter: true,
                },
                {
                    ...createdKeywordsActionField
                },
                {
                    ...infoField
                }
            ],
            [createdAdGroup]: [
                {
                    title: 'Campaign',
                    dataIndex: 'd_campaignName',
                    key: 'd_campaignName',
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
                    sorter: true,
                    filter: (dataIndex) => <ColumnTextFilter
                        onChangeFilter={onChangeFilter}
                        filteredColumns={filteredColumns}
                        dataIndex={dataIndex}
                    />
                },
                {
                    title: 'Default Bid',
                    dataIndex: 'd_defaultBid',
                    key: 'd_defaultBid',
                    width: '20%',
                    render: text => (text != null && <span>{`$${numberMask(text, 2)}`}</span>),
                    sorter: true,
                    filter: (dataIndex) => <ColumnNumberFilter
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
            [createdProductAd]: [
                {
                    title: 'Campaign',
                    dataIndex: 'd_campaignName',
                    key: 'd_campaignName',
                    width: '300px',
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
                    width: '15em',
                    sorter: true,
                    filter: (dataIndex) => <ColumnTextFilter
                        onChangeFilter={onChangeFilter}
                        filteredColumns={filteredColumns}
                        dataIndex={dataIndex}
                    />
                },
                {
                    title: 'ASIN',
                    dataIndex: 'd_asin',
                    key: 'd_asin',
                    width: '15em',
                    sorter: true,
                    filter: (dataIndex) => <ColumnTextFilter
                        onChangeFilter={onChangeFilter}
                        filteredColumns={filteredColumns}
                        dataIndex={dataIndex}
                    />
                },
                {
                    title: 'SKU',
                    dataIndex: 'd_sku',
                    key: 'd_sku',
                    width: '15em',
                    sorter: true,
                    filter: (dataIndex) => <ColumnTextFilter
                        onChangeFilter={onChangeFilter}
                        filteredColumns={filteredColumns}
                        dataIndex={dataIndex}
                    />
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
            [createdCrossNegativeKeyword]: [
                {
                    title: 'Campaign',
                    dataIndex: 'd_campaignName',
                    key: 'd_campaignName',
                    width: '300px',
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
                    width: '15em',
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
                    width: '15em',
                    sorter: true,
                    filter: (dataIndex) => <ColumnTextFilter
                        onChangeFilter={onChangeFilter}
                        filteredColumns={filteredColumns}
                        dataIndex={dataIndex}
                    />
                },
                {
                    title: 'Match Type',
                    dataIndex: 'd_keywordMatchType',
                    key: 'd_keywordMatchType',
                    width: '200px',
                    render: (str) => (<span className="capitalize-field">{str}</span>),
                    sorter: true,
                    filter: (dataIndex) => <ColumnMenuFilter
                        onChangeFilter={onChangeFilter}
                        filteredColumns={filteredColumns}
                        dataIndex={dataIndex}
                        menu={[
                            {label: 'Phrase', value: 'phrase'},
                            {label: 'Exact', value: 'exact'},
                            {label: 'Broad', value: 'broad'}
                        ]}
                    />
                },
                {
                    ...createdKeywordsActionField
                },
                {
                    ...infoField
                }
            ],
            [createdKeywordCST]: [
                {
                    title: 'Campaign',
                    dataIndex: 'd_campaignName',
                    key: 'd_campaignName',
                    width: '160px',
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
                    width: '160px',
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
                    width: '170px',
                    sorter: true,
                    filter: (dataIndex) => <ColumnTextFilter
                        onChangeFilter={onChangeFilter}
                        filteredColumns={filteredColumns}
                        dataIndex={dataIndex}
                    />
                },
                {
                    title: 'Match Type',
                    dataIndex: 'd_keywordMatchType',
                    key: 'd_keywordMatchType',
                    width: '9.5em',
                    render: (str) => (<span className="capitalize-field">{str}</span>),
                    sorter: true,
                    filter: (dataIndex) => <ColumnMenuFilter
                        onChangeFilter={onChangeFilter}
                        filteredColumns={filteredColumns}
                        dataIndex={dataIndex}
                        menu={[
                            {label: 'Phrase', value: 'phrase'},
                            {label: 'Exact', value: 'exact'},
                            {label: 'Broad', value: 'broad'}
                        ]}
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
            {title: <>Created Campaign</>, key: createdCampaign},
            {title: <>Created Ad Group</>, key: createdAdGroup},
            {title: <>Created Product Ad</>, key: createdProductAd},
            {title: <>Created Cross-Negative Keyword</>, key: createdCrossNegativeKeyword},
            {title: <>Created Keyword (<span className='underline'>CST</span>)</>, key: createdKeywordCST},
        ]
    });
};