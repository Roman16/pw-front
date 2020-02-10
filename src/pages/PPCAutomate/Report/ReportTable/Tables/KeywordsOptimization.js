import React, {useState, useEffect, useRef} from 'react';
import TitleInfo from '../../../../../components/Table/renders/TitleInfo';
import {subChangesCount} from './changesCount';
import TableButton from '../TableButton/TableButton';
import {
    indexField,
    infoField,
    bidActionField,
    pauseKeywordsActionField,
    dateField,
    patIntentValues, averageCVRField
} from './const';
import {useSelector} from 'react-redux';
import CustomTable from '../../../../../components/Table/CustomTable';
import {round} from "../../../../../utils/round";
import {numberMask} from "../../../../../utils/numberMask";
import {ColumnMenuFilter, ColumnTextFilter, ColumnNumberFilter} from './columnFilter';

const changedKeywordBidAcos = 'changed-keyword-bid-acos';
const changedKeywordBidImpression = 'changed-keyword-bid-impressions';
const pausedKeywordHighAcos = 'paused-keyword-high-acos';
const pausedKeywordNoSales = 'paused-keyword-no-sales';

const pausedKeywordDuplicate = 'paused-keyword-duplicate';
const pausedKeywordDuplicateOfPAT = 'paused-keyword-duplicate-of-pat';
const pausedKeywordDuplicateFromCustomerSearchTerm = 'paused-keyword-duplicate-from-customer-search-term';

const KeywordsOptimization = ({
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
    const [activeTable, changeTable] = useState(changedKeywordBidAcos);
    const {counts, loading, productId, countsWithNew} = useSelector(state => ({
        counts: state.reports.counts,
        loading: state.reports.loading,
        productId: state.products.selectedProduct.id,
        countsWithNew: state.reports.counts_with_new || []
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

    useEffect(() => changeTable(changedKeywordBidAcos), [productId, activeTab]);

    const defaultKeys = [
        {
            ...indexField(currentPage, pageSize)
        },
        {
            ...dateField
        },
        {
            title: "Campaign",

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
            width: '200px',
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
            width: '10em',
            render: (str) => (<span className="capitalize-field"> {str}</span>),
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
        }
    ];

    const columns = {
        [changedKeywordBidAcos]: [
            ...defaultKeys,
            {
                title: 'ACoS',
                dataIndex: 'd_keywordACoS',
                key: 'd_keywordACoS',
                width: '90px',
                sorter: true,
                render: text => <span>{text && `${round(+text * 100, 2)}%`}</span>,
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
                        title="Target ACoS"
                        info="The ACoS that our algorithm is aiming to reach your business goal."
                        position='top'
                    />
                ),
                dataIndex: 'd_targetACoSCalculation_d_targetACoS',
                key: 'd_targetACoSCalculation_d_targetACoS',
                width: '12em',
                sorter: true,
                render: text => <span>{text && `${round(+text * 100, 2)}%`}</span>,
                filter: (dataIndex) => <ColumnNumberFilter
                    onChangeFilter={onChangeFilter}
                    filteredColumns={filteredColumns}
                    dataIndex={dataIndex}
                    percent={true}
                />
            },
            {
                title: 'Clicks',
                dataIndex: 'd_keywordClicks',
                key: 'd_keywordClicks',
                width: '6.5em',
                sorter: true,
                filter: (dataIndex) => <ColumnNumberFilter
                    onChangeFilter={onChangeFilter}
                    filteredColumns={filteredColumns}
                    dataIndex={dataIndex}
                />
            },
            {
                title: 'Spend',
                dataIndex: 'd_keywordSpend',
                key: 'd_keywordSpend',
                render: (spend) => (spend && <span>${numberMask(spend, 2)}</span>),
                width: '7em',
                sorter: true,
                filter: (dataIndex) => <ColumnNumberFilter
                    onChangeFilter={onChangeFilter}
                    filteredColumns={filteredColumns}
                    dataIndex={dataIndex}
                />
            },
            {
                title: 'Sales',
                dataIndex: 'd_keywordSales',
                key: 'd_keywordSales',
                render: (spend) => (spend && <span>${numberMask(spend, 2)}</span>),
                width: '6.5em',
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
                ...bidActionField
            },
            {
                ...infoField
            }
        ],
        [changedKeywordBidImpression]: [
            ...defaultKeys,
            {
                title: 'Impressions',
                dataIndex: 'd_keywordImpressions',
                key: 'd_keywordImpressions',
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
                        title="Target Impressions"
                        info="The number of times your ads need to be displayed so you will get the click."
                    />
                ),
                dataIndex: 'd_targetImpressions',
                key: 'd_targetImpressions',
                width: '15em',
                sorter: true,
                filter: (dataIndex) => <ColumnNumberFilter
                    onChangeFilter={onChangeFilter}
                    filteredColumns={filteredColumns}
                    dataIndex={dataIndex}
                />
            },
            {
                ...bidActionField
            },
            {
                ...infoField
            }
        ],
        [pausedKeywordHighAcos]: [
            ...defaultKeys,
            {
                title: 'ACoS',
                dataIndex: 'd_keywordACoS',
                key: 'd_keywordACoS',
                width: '90px',
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
                width: '12em',
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
                title: 'Clicks',
                dataIndex: 'd_keywordClicks',
                key: 'd_keywordClicks',
                width: '6.5em',
                sorter: true,
                filter: (dataIndex) => <ColumnNumberFilter
                    onChangeFilter={onChangeFilter}
                    filteredColumns={filteredColumns}
                    dataIndex={dataIndex}
                />
            },
            {
                title: 'Spend',
                dataIndex: 'd_keywordSpend',
                key: 'd_keywordSpend',
                width: '7em',
                render: (spend) => (spend && <span>${numberMask(spend, 2)}</span>),
                sorter: true,
                filter: (dataIndex) => <ColumnNumberFilter
                    onChangeFilter={onChangeFilter}
                    filteredColumns={filteredColumns}
                    dataIndex={dataIndex}
                />
            },
            {
                title: 'Sales',
                dataIndex: 'd_keywordSales',
                key: 'd_keywordSales',
                width: '6.5em',
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
                ...pauseKeywordsActionField
            },
            {
                ...infoField
            }
        ],
        [pausedKeywordNoSales]: [
            ...defaultKeys,
            {
                ...averageCVRField(onChangeFilter, filteredColumns)
            },
            {
                title: 'Clicks',
                dataIndex: 'd_keywordClicks',
                key: 'd_keywordClicks',
                width: '6.5em',
                sorter: true,
                filter: (dataIndex) => <ColumnNumberFilter
                    onChangeFilter={onChangeFilter}
                    filteredColumns={filteredColumns}
                    dataIndex={dataIndex}
                />
            },
            {
                title: 'Spend',
                dataIndex: 'd_keywordSpend',
                key: 'd_keywordSpend',
                width: '7em',
                render: (spend) => (spend && <span>${numberMask(spend, 2)}</span>),
                sorter: true,
                filter: (dataIndex) => <ColumnNumberFilter
                    onChangeFilter={onChangeFilter}
                    filteredColumns={filteredColumns}
                    dataIndex={dataIndex}
                />
            },
            {
                ...pauseKeywordsActionField
            },
            {
                ...infoField
            }
        ],
        [pausedKeywordDuplicate]: [
            ...defaultKeys,
            {
                title: 'Origin Campaign',
                dataIndex: 'd_originCampaignName',
                key: 'd_originCampaignName',
                width: '13em',
                sorter: true,
                filter: (dataIndex) => <ColumnTextFilter
                    onChangeFilter={onChangeFilter}
                    filteredColumns={filteredColumns}
                    dataIndex={dataIndex}
                />
            },
            {
                title: 'Origin Ad Group',
                dataIndex: 'd_originAdGroupName',
                key: 'd_originAdGroupName',
                width: '13em',
                sorter: true,
                filter: (dataIndex) => <ColumnTextFilter
                    onChangeFilter={onChangeFilter}
                    filteredColumns={filteredColumns}
                    dataIndex={dataIndex}
                />
            },
            {
                title: 'Origin Keyword',
                dataIndex: 'd_originKeywordText',
                key: 'd_originKeywordText',
                width: '13em',
                sorter: true,
                filter: (dataIndex) => <ColumnTextFilter
                    onChangeFilter={onChangeFilter}
                    filteredColumns={filteredColumns}
                    dataIndex={dataIndex}
                />
            },
            {
                title: 'Origin Match Type',
                dataIndex: 'd_originKeywordMatchType',
                key: 'd_originKeywordMatchType',
                render: (str) => (<span className="capitalize-field">{str}</span>),
                width: '13.5em',
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
                title: 'Identity',
                dataIndex: 'd_identity',
                key: 'd_identity',
                width: '9em',
                sorter: true,
                filter: (dataIndex) => <ColumnTextFilter
                    onChangeFilter={onChangeFilter}
                    filteredColumns={filteredColumns}
                    dataIndex={dataIndex}
                />
            },
            {
                ...pauseKeywordsActionField
            },
            {
                ...infoField
            }
        ],
        [pausedKeywordDuplicateOfPAT]: [
            ...defaultKeys,
            {
                title: 'Origin Campaign',
                dataIndex: 'd_originCampaignName',
                key: 'd_originCampaignName',
                width: '13em',
                sorter: true,
                filter: (dataIndex) => <ColumnTextFilter
                    onChangeFilter={onChangeFilter}
                    filteredColumns={filteredColumns}
                    dataIndex={dataIndex}
                />
            },
            {
                title: 'Origin Ad Group',
                dataIndex: 'd_originAdGroupName',
                key: 'd_originAdGroupName',
                width: '13em',
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
                        title="Origin PAT Type"
                        info="The type of Product Targeting. It can be a Manual or Auto."
                    />
                ),
                dataIndex: 'd_originPATType',
                key: 'd_originPATType',
                render: str => <span className="capitalize-field">{str}</span>,
                width: '13.5em',
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
                title: (
                    <TitleInfo
                        title="Origin PAT Intent Type"
                        info="Automatic and Manual Product Targetings use multiple strategies to match your ads to shoppers looking for your products. For Automatic Product Targetings these strategies are: Close Match, Loose Match, Complements, Substitutes. For Manual: ASIN, Categories, Brand."
                        position="top"
                    />
                ),
                dataIndex: 'd_originPATIntentType',
                key: 'd_originPATIntentType',
                render: text => <span>{patIntentValues[text]}</span>,
                width: '16.5em',
                sorter: true,
                filter: (dataIndex) => <ColumnMenuFilter
                    onChangeFilter={onChangeFilter}
                    filteredColumns={filteredColumns}
                    dataIndex={dataIndex}
                    menu={Object.keys(patIntentValues).map(key => ({
                        label: patIntentValues[key],
                        value: key
                    }))}
                />
            },
            {
                title: (
                    <TitleInfo
                        position='top'
                        title="Origin PAT Value"
                        info="Manual Product Targetings have specific value assigned to them to match your ads to shoppers. Type of this value depends on PAT's Intent Type. For ASIN Intent Type value may be: B01F9RH0R4. For Category - Cell Phones & Accessories."
                    />
                ),
                dataIndex: 'd_originPATValue',
                key: 'd_originPATValue',
                width: '14em',
                sorter: true,
                filter: (dataIndex) => <ColumnTextFilter
                    onChangeFilter={onChangeFilter}
                    filteredColumns={filteredColumns}
                    dataIndex={dataIndex}
                />
            },
            {
                ...pauseKeywordsActionField
            },
            {
                ...infoField
            }
        ],
        [pausedKeywordDuplicateFromCustomerSearchTerm]: [
            ...defaultKeys,
            {
                title: 'Origin Campaign',
                dataIndex: 'd_originCampaignName',
                key: 'd_originCampaignName',
                width: '13em',
                sorter: true,
                filter: (dataIndex) => <ColumnTextFilter
                    onChangeFilter={onChangeFilter}
                    filteredColumns={filteredColumns}
                    dataIndex={dataIndex}
                />
            },
            {
                title: 'Origin Ad Group',
                dataIndex: 'd_originAdGroupName',
                key: 'd_originAdGroupName',
                width: '13em',
                sorter: true,
                filter: (dataIndex) => <ColumnTextFilter
                    onChangeFilter={onChangeFilter}
                    filteredColumns={filteredColumns}
                    dataIndex={dataIndex}
                />
            },
            {
                title: 'Origin Keyword',
                dataIndex: 'd_originKeywordText',
                key: 'd_originKeywordText',
                width: '12em',
                sorter: true,
                filter: (dataIndex) => <ColumnTextFilter
                    onChangeFilter={onChangeFilter}
                    filteredColumns={filteredColumns}
                    dataIndex={dataIndex}
                />
            },
            {
                title: 'Origin Match Type',
                dataIndex: 'd_originKeywordMatchType',
                key: 'd_originKeywordMatchType',
                render: (str) => (<span className="capitalize-field">{str}</span>),
                width: '13em',
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
                title: 'Query',
                dataIndex: 'd_query',
                key: 'd_query',
                width: '8em',
                sorter: true,
                filter: (dataIndex) => <ColumnTextFilter
                    onChangeFilter={onChangeFilter}
                    filteredColumns={filteredColumns}
                    dataIndex={dataIndex}
                />
            },
            {
                ...pauseKeywordsActionField
            },
            {
                ...infoField
            }
        ],
    };

    return (
        <div className="report-item-table">
            <div className="report-item-table-btn" ref={refTableBtn}>
                <TableButton
                    totalSize={totalSize}
                    loading={loading}
                    active={changedKeywordBidAcos === activeTable}
                    count={subChangesCount(counts, changedKeywordBidAcos, countsWithNew)}
                    onClick={() => {
                        onChange(changedKeywordBidAcos);
                    }}
                >
                    Changed Keyword Bid (<span className='underline'>ACoS</span>)
                </TableButton>
                <TableButton
                    totalSize={totalSize}
                    loading={loading}
                    active={changedKeywordBidImpression === activeTable}
                    count={subChangesCount(counts, changedKeywordBidImpression, countsWithNew)}
                    onClick={() => {
                        onChange(changedKeywordBidImpression);
                    }}
                >
                    Changed Keyword Bid (<span className='underline'>Impressions</span>)
                </TableButton>
                <TableButton
                    totalSize={totalSize}
                    loading={loading}
                    active={pausedKeywordHighAcos === activeTable}
                    count={subChangesCount(counts, pausedKeywordHighAcos, countsWithNew)}
                    onClick={() => {
                        onChange(pausedKeywordHighAcos);
                    }}
                >
                    Paused Keyword (<span className='underline'>High ACoS</span>)
                </TableButton>
                <TableButton
                    totalSize={totalSize}
                    loading={loading}
                    active={pausedKeywordNoSales === activeTable}
                    count={subChangesCount(counts, pausedKeywordNoSales, countsWithNew)}
                    onClick={() => {
                        onChange(pausedKeywordNoSales);
                    }}
                >
                    Paused Keyword (<span className='underline'>No Sales</span>)
                </TableButton>

                <TableButton
                    totalSize={totalSize}
                    loading={loading}
                    active={pausedKeywordDuplicate === activeTable}
                    count={subChangesCount(counts, pausedKeywordDuplicate, countsWithNew)}
                    onClick={() => {
                        onChange(pausedKeywordDuplicate);
                    }}
                >
                    Paused Keyword Duplicate
                </TableButton>
                <TableButton
                    totalSize={totalSize}
                    loading={loading}
                    active={pausedKeywordDuplicateOfPAT === activeTable}
                    count={subChangesCount(counts, pausedKeywordDuplicateOfPAT, countsWithNew)}
                    onClick={() => {
                        onChange(pausedKeywordDuplicateOfPAT);
                    }}
                >
                    Paused Keyword Duplicate of PAT
                </TableButton>
                <TableButton
                    totalSize={totalSize}
                    loading={loading}
                    active={pausedKeywordDuplicateFromCustomerSearchTerm === activeTable}
                    count={subChangesCount(counts, pausedKeywordDuplicateFromCustomerSearchTerm, countsWithNew)}
                    onClick={() => {
                        onChange(pausedKeywordDuplicateFromCustomerSearchTerm);
                    }}
                >
                    Paused Keyword Duplicate From CST
                </TableButton>
            </div>

            <CustomTable
                onChangePagination={handlePaginationChange}
                onChangeSorter={handleChangeSorter}
                loading={loading}
                dataSource={data}
                columns={columns[activeTable]}
                currentPage={currentPage}
                totalSize={totalSize}
                heightTabBtn={heightTabBtn}
                showSizeChanger={true}
                pageSize={pageSize}
                sorterColumn={sorterColumn}
                rowClassName={(item) => !item.viewed && 'new-report'}
            />
        </div>
    );
};

export default KeywordsOptimization;
