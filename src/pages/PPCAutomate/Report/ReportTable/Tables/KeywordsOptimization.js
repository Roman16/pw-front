import React, {useState, useEffect, useRef} from 'react';
import TitleInfo from '../../../../../components/Table/renders/TitleInfo';
import {Input, Button, Icon} from 'antd';
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
import {columnTextFilter, columnMenuFilter, columnNumberFilter} from './columnFilter';

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

    useEffect(() => changeTable(changedKeywordBidAcos), [productId, activeTab]);

    const defaultKeys = [
        {
            ...indexField(currentPage)
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
            ...columnTextFilter( onChangeFilter, filteredColumns)
        },
        {
            title: 'Ad Group',
            dataIndex: 'd_adGroupName',
            key: 'd_adGroupName',
            width: '180px',
            sorter: true,
            ...columnTextFilter( onChangeFilter, filteredColumns)
        },
        {
            title: 'Keyword',
            dataIndex: 'd_keywordText',
            key: 'd_keywordText',
            width: '200px',
            sorter: true,
            ...columnTextFilter( onChangeFilter, filteredColumns)
        },
        {
            title: 'Match Type',
            dataIndex: 'd_keywordMatchType',
            key: 'd_keywordMatchType',
            width: '90px',
            sorter: true,
            render: text => <span className="capitalize-field">{text}</span>,
            ...columnMenuFilter(onChangeFilter, filteredColumns, ['exact', 'phrase', 'test2'])
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
                render: text => <span>{text && `${round(text, 2)}%`}</span>,
                ...columnNumberFilter(onChangeFilter, filteredColumns,)
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
                width: '110px',
                sorter: true,
                render: text => <span>{text && `${round(text, 2)}%`}</span>,
                ...columnNumberFilter(onChangeFilter, filteredColumns,)
            },
            {
                title: 'Clicks',
                dataIndex: 'd_keywordClicks',
                key: 'd_keywordClicks',
                width: '90px',
                sorter: true,
                ...columnNumberFilter(onChangeFilter, filteredColumns)
            },
            {
                title: 'Average CVR',
                dataIndex: 'd_averageConversionRate',
                key: 'd_averageConversionRate',
                width: '100px',
                sorter: true,
                render: (text) => (text && <span>{round(text, 2)}%</span>),
                ...columnNumberFilter(onChangeFilter, filteredColumns)
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
                sorter: true,
                ...columnNumberFilter(onChangeFilter, filteredColumns)
            },
            {
                title: (
                    <TitleInfo
                        title="Target Impressions"
                        info="The number of times your ads need to be displayed so you will get the click."
                    />
                ),
                dataIndex: 'd_targetImpressions',
                key: 'd_targetImpressions',
                sorter: true,
                ...columnNumberFilter(onChangeFilter, filteredColumns)
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
                render: text => <span>{text && `${text}%`}</span>,
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
                width: '110px',
                render: text => <span>{text && `${text}%`}</span>,
                sorter: true,
                ...columnNumberFilter(onChangeFilter, filteredColumns)
            },
            {
                title: 'Clicks',
                dataIndex: 'd_keywordClicks',
                key: 'd_keywordClicks',
                width: '90px',
                sorter: true,
                ...columnNumberFilter(onChangeFilter, filteredColumns)
            },
            {
                title: 'Spend',
                dataIndex: 'd_keywordSpend',
                key: 'd_keywordSpend',
                width: '90px',
                render: (spend) => (spend && <span>${numberMask(spend, 2)}</span>),
                sorter: true,
                ...columnNumberFilter(onChangeFilter, filteredColumns)
            },
            {
                title: 'Sales',
                dataIndex: 'd_keywordSales',
                key: 'd_keywordSales',
                width: '90px',
                render: (sales) => (sales && <span>${numberMask(sales, 2)}</span>),
                sorter: true,
                ...columnNumberFilter(onChangeFilter, filteredColumns)
            },
            {
                title: 'Average CVR',
                dataIndex: 'd_averageConversionRate',
                key: 'd_averageConversionRate',
                width: '120px',
                render: (text) => (text && <span>{round(text, 2)}%</span>),
                sorter: true,
                ...columnNumberFilter(onChangeFilter, filteredColumns)
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
                render: (text) => (text && <span>{round(text, 2)}%</span>),
                 sorter: true,
                ...columnNumberFilter(onChangeFilter, filteredColumns)
            },
            {
                title: 'Clicks',
                dataIndex: 'd_keywordClicks',
                key: 'd_keywordClicks',
                width: '90px',
                 sorter: true,
                ...columnNumberFilter(onChangeFilter, filteredColumns)
            },
            {
                title: 'Spend',
                dataIndex: 'd_keywordSpend',
                key: 'd_keywordSpend',
                width: '90px',
                render: (spend) => (spend && <span>${numberMask(spend, 2)}</span>),
                 sorter: true,
                ...columnNumberFilter(onChangeFilter, filteredColumns)
            },
            {
                ...pauseKeywordsActionField
            },
            {
                ...infoField
            }
        ]
    };

    console.log(pageSize);

    return (
        <div className="report-item-table">
            <div className="report-item-table-btn" ref={refTableBtn}>
                <TableButton
                    active={changedKeywordBidAcos === activeTable}
                    count={subChangesCount(counts, changedKeywordBidAcos)}
                    onClick={() => {
                        onChange(changedKeywordBidAcos);
                    }}
                >
                    Changed Keyword Bid (<span className='underline'>ACoS</span>)
                </TableButton>
                <TableButton
                    active={changedKeywordBidImpression === activeTable}
                    count={subChangesCount(counts, changedKeywordBidImpression)}
                    onClick={() => {
                        onChange(changedKeywordBidImpression);
                    }}
                >
                    Changed Keyword Bid (<span className='underline'>Impressions</span>)
                </TableButton>
                <TableButton
                    active={pausedKeywordHighAcos === activeTable}
                    count={subChangesCount(counts, pausedKeywordHighAcos)}
                    onClick={() => {
                        onChange(pausedKeywordHighAcos);
                    }}
                >
                    Paused Keyword (<span className='underline'>High ACoS</span>)
                </TableButton>
                <TableButton
                    active={pausedKeywordNoSales === activeTable}
                    count={subChangesCount(counts, pausedKeywordNoSales)}
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
            />
        </div>
    );
};

export default KeywordsOptimization;
