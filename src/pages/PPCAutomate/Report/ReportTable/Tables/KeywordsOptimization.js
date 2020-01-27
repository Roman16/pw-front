import React, {useState, useEffect, useRef} from 'react';
import TitleInfo from '../../../../../components/Table/renders/TitleInfo';
import {subChangesCount} from './changesCount';
import TableButton from '../TableButton/TableButton';
import {
    indexField,
    infoField,
    bidActionField,
    pauseKeywordsActionField,
    dateField
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
                width: '11.5em',
                sorter: true,
                render: text => <span>{text && `${round(+text * 100, 2)}%`}</span>,
                filter: (dataIndex) => <ColumnNumberFilter
                    onChangeFilter={onChangeFilter}
                    filteredColumns={filteredColumns}
                    dataIndex={dataIndex}
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
                title: 'Average CVR',
                dataIndex: 'd_averageConversionRate',
                key: 'd_averageConversionRate',
                width: '10.5em',
                sorter: true,
                render: (text) => (text && <span>{round(+text * 100, 2)}%</span>),
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
                width: '14.5em',
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
                width: '11.5em',
                render: text => <span>{text && `${round(+text * 100, 2)}%`}</span>,
                sorter: true,
                filter: (dataIndex) => <ColumnNumberFilter
                    onChangeFilter={onChangeFilter}
                    filteredColumns={filteredColumns}
                    dataIndex={dataIndex}
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
                title: 'Average CVR',
                dataIndex: 'd_averageConversionRate',
                key: 'd_averageConversionRate',
                width: '10.5em',
                render: text => <span>{text && `${round(+text * 100, 2)}%`}</span>,
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
        [pausedKeywordNoSales]: [
            ...defaultKeys,
            {
                title: 'Average CVR',
                dataIndex: 'd_averageConversionRate',
                key: 'd_averageConversionRate',
                width: '10.5em',
                render: text => <span>{text && `${round(+text * 100, 2)}%`}</span>,
                sorter: true,
                filter: (dataIndex) => <ColumnNumberFilter
                    onChangeFilter={onChangeFilter}
                    filteredColumns={filteredColumns}
                    dataIndex={dataIndex}
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
                ...pauseKeywordsActionField
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
