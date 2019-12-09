import React, {useEffect, useState, useRef} from 'react';
import moment from 'moment';
import TableButton from '../TableButton/TableButton';
import {indexField, createdKeywordsActionField, infoField, dateField} from './const';
import {useSelector} from 'react-redux';
import CustomTable from '../../../../../components/Table/CustomTable';
import TitleInfo from '../../../../../components/Table/renders/TitleInfo';
import {numberMask} from "../../../../../utils/numberMask";
import {columnTextFilter, columnNumberFilter, columnMenuFilter} from "./columnFilter";
import {subChangesCount} from "./changesCount";

const createdCampaign = 'created-campaign';
const createdAdGroup = 'created-ad-group';
const createdProductAd = 'created-product-ad';
const createdCrossNegativeKeyword = 'created-cross-negative-keyword';
const createdKeywordCST = 'created-keyword-cst';

const NewKeywords = ({
                         data,
                         onChangeSubTab,
                         activeTab,
                         currentPage,
                         totalSize,
                         handlePaginationChange,
                         scroll,
                         pageSize,
                         onChangeFilter,
                         filteredColumns,
                         handleChangeSorter,
                         sorterColumn
                     }) => {
    const [activeTable, changeTable] = useState(createdCampaign);
    const {counts, loading, productId} = useSelector(state => ({
        counts: state.reports.counts,
        loading: state.reports.loading,
        productId: state.products.selectedProduct.id
    }));

    const onChange = tab => {
        onChangeSubTab(tab);
        changeTable(tab);
    };

    // height report-item-table-btn
    const refTableBtn = useRef(null);
    const heightTabBtn = refTableBtn.current
        ? refTableBtn.current.offsetHeight
        : 0;

    useEffect(() => changeTable(createdCampaign), [productId, activeTab]);


    const defaultKeys = [
        {
            ...indexField(currentPage, pageSize)
        },
        {
            ...dateField
        }
    ];

    const columns = {
        [createdCampaign]: [
            ...defaultKeys,
            {
                title: 'Campaign',
                dataIndex: 'd_campaignName',
                key: 'd_campaignName',
                width: '350px',
                sorter: true,
                ...columnTextFilter(onChangeFilter, filteredColumns)
            },
            {
                title: 'Targeting Type',
                dataIndex: 'd_campaignTargetingType',
                key: 'd_campaignTargetingType',
                sorter: true,
                ...columnMenuFilter(onChangeFilter, filteredColumns, ['manual'])
            },
            {
                title: 'Daily Budget',
                dataIndex: 'd_dailyBudget',
                key: 'd_dailyBudget',
                render: text => (text != null && <span>{`$${numberMask(text)}`}</span>),
                sorter: true,
                ...columnNumberFilter(onChangeFilter, filteredColumns)
            },
            {
                title: 'Start Date.',
                dataIndex: 'd_startDate',
                key: 'd_startDate',
                render: text => moment(text).format('YYYY-MM-DD'),
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
            ...defaultKeys,
            {
                title: 'Campaign',
                dataIndex: 'd_campaignName',
                key: 'd_campaignName',
                sorter: true,
                ...columnTextFilter(onChangeFilter, filteredColumns)
            },
            {
                title: 'Ad Group',
                dataIndex: 'd_adGroupName',
                key: 'd_adGroupName',
                sorter: true,
                ...columnTextFilter(onChangeFilter, filteredColumns)
            },
            {
                title: 'Default Bid',
                dataIndex: 'd_defaultBid',
                key: 'd_defaultBid',
                width: '20%',
                render: text => (text != null && <span>{`$${numberMask(text, 2)}`}</span>),
                sorter: true,
                ...columnNumberFilter(onChangeFilter, filteredColumns)
            },
            {
                ...createdKeywordsActionField
            },
            {
                ...infoField
            }
        ],
        [createdProductAd]: [
            ...defaultKeys,
            {
                title: 'Campaign',
                dataIndex: 'd_campaignName',
                key: 'd_campaignName',
                width: '300px',
                sorter: true,
                ...columnTextFilter(onChangeFilter, filteredColumns)
            },
            {
                title: 'Ad Group',
                dataIndex: 'd_adGroupName',
                key: 'd_adGroupName',
                sorter: true,
                ...columnTextFilter(onChangeFilter, filteredColumns)
            },
            {
                title: 'ASIN',
                dataIndex: 'd_asin',
                key: 'd_asin',
                sorter: true,
                ...columnTextFilter(onChangeFilter, filteredColumns)
            },
            {
                title: 'SKU',
                dataIndex: 'd_sku',
                key: 'd_sku',
                sorter: true,
                ...columnTextFilter(onChangeFilter, filteredColumns)
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
            ...defaultKeys,
            {
                title: 'Campaign',
                dataIndex: 'd_campaignName',
                key: 'd_campaignName',
                width: '300px',
                sorter: true,
                ...columnTextFilter(onChangeFilter, filteredColumns)
            },
            {
                title: 'Ad Group',
                dataIndex: 'd_adGroupName',
                key: 'd_adGroupName',
                sorter: true,
                ...columnTextFilter(onChangeFilter, filteredColumns)
            },
            {
                title: 'Keyword',
                dataIndex: 'd_keywordText',
                key: 'd_keywordText',
                sorter: true,
                ...columnTextFilter(onChangeFilter, filteredColumns)
            },
            {
                title: 'Match Type',
                dataIndex: 'd_keywordMatchType',
                key: 'd_keywordMatchType',
                width: '200px',
                sorter: true,
                ...columnMenuFilter(onChangeFilter, filteredColumns, ['exact', 'exact', 'exact'])

            },
            {
                ...createdKeywordsActionField
            },
            {
                ...infoField
            }
        ],
        [createdKeywordCST]: [
            ...defaultKeys,
            {
                title: 'Campaign',
                dataIndex: 'd_campaignName',
                key: 'd_campaignName',
                width: '160px',
                sorter: true,
                ...columnTextFilter(onChangeFilter, filteredColumns)
            },
            {
                title: 'Ad Group',
                dataIndex: 'd_adGroupName',
                key: 'd_adGroupName',
                width: '160px',
                sorter: true,
                ...columnTextFilter(onChangeFilter, filteredColumns)
            },
            {
                title: 'Keyword',
                dataIndex: 'd_keywordText',
                key: 'd_keywordText',
                width: '170px',
                sorter: true,
                ...columnTextFilter(onChangeFilter, filteredColumns)
            },
            {
                title: 'Match Type',
                dataIndex: 'd_keywordMatchType',
                key: 'd_keywordMatchType',
                width: '9.5em',
                sorter: true,
                ...columnMenuFilter(onChangeFilter, filteredColumns, ['exact', 'exact', 'exact'])
            },
            {
                title: 'Bid',
                dataIndex: 'd_bid',
                key: 'd_bid',
                width: '6em',
                render: text => (text != null && <span>${numberMask(text, 2)}</span>),
                sorter: true,
                ...columnNumberFilter(onChangeFilter, filteredColumns)

            },
            {
                title: (
                    <TitleInfo
                        title="CST Clicks"
                        info="It displays the number of clicks of certain customer search-term."
                    />
                ),
                dataIndex: 'd_customerSearchTermClicks',
                key: 'd_customerSearchTermClicks',
                width: '10.5em',
                sorter: true,
                ...columnNumberFilter(onChangeFilter, filteredColumns)
            },
            {
                title: (
                    <TitleInfo
                        title="CST ACoS"
                        info="It displays the ACoS of certain customer search-term from your ad reports. "
                    />
                ),
                dataIndex: 'd_customerSearchTermACoS',
                key: 'd_customerSearchTermACoS',
                render: text => <span>{text && `${text}%`}</span>,
                width: '10.5em',
                sorter: true,
                ...columnNumberFilter(onChangeFilter, filteredColumns)
            },
            {
                title: (
                    <TitleInfo
                        title="CST CPC"
                        info="It displays the cost per click of certain customer search-term."
                    />
                ),
                dataIndex: 'd_customerSearchTermCPC',
                key: 'd_customerSearchTermCPC',
                render: text => (text != null && <span>${numberMask(text, 2)}</span>),
                width: '10em',
                sorter: true,
                ...columnNumberFilter(onChangeFilter, filteredColumns)
            },
            {
                title: (
                    <TitleInfo
                        title="Target ACoS"
                        info="The ACoS that our algorithm is aiming to reach your business goal."
                    />
                ),
                dataIndex: 'd_targetACoSCalculation_d_targetACoS',
                key: 'd_targetACoSCalculation_d_targetACoS',
                render: text => <span>{text && `${text}%`}</span>,
                width: '11.5em',
                sorter: true,
                ...columnNumberFilter(onChangeFilter, filteredColumns)
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
    };


    return (
        <div className="report-item-table">
            <div className="report-item-table-btn" ref={refTableBtn}>
                <TableButton
                    active={createdCampaign === activeTable}
                    count={subChangesCount(counts, createdCampaign)}
                    onClick={() => {
                        onChange(createdCampaign);
                    }}
                >
                    Created Campaign
                </TableButton>
                <TableButton
                    active={createdAdGroup === activeTable}
                    count={subChangesCount(counts, createdAdGroup)}
                    onClick={() => {
                        onChange(createdAdGroup);
                    }}
                >
                    Created Ad Group
                </TableButton>
                <TableButton
                    active={createdProductAd === activeTable}
                    count={subChangesCount(counts, createdProductAd)}
                    onClick={() => {
                        onChange(createdProductAd);
                    }}
                >
                    Created Product Ad
                </TableButton>
                <TableButton
                    active={createdCrossNegativeKeyword === activeTable}
                    count={subChangesCount(counts, createdCrossNegativeKeyword)}
                    onClick={() => {
                        onChange(createdCrossNegativeKeyword);
                    }}
                >
                    Created Cross-Negative Keyword
                </TableButton>
                <TableButton
                    active={createdKeywordCST === activeTable}
                    count={subChangesCount(counts, createdKeywordCST)}
                    onClick={() => {
                        onChange(createdKeywordCST);
                    }}
                >
                    Created Keyword (<span className='underline'>CST</span>)
                </TableButton>
            </div>

            <CustomTable
                onChangePagination={handlePaginationChange}
                loading={loading}
                dataSource={data}
                columns={columns[activeTable]}
                currentPage={currentPage}
                totalSize={totalSize}
                heightTabBtn={heightTabBtn}
                showSizeChanger={true}
                pageSize={pageSize}
                sorterColumn={sorterColumn}
                onChangeSorter={handleChangeSorter}
            />
        </div>
    );
};

export default NewKeywords;
