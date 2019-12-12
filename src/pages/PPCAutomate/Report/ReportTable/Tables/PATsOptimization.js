import React, {useEffect, useState, useRef} from 'react';
import TitleInfo from '../../../../../components/Table/renders/TitleInfo';
import {
    indexField,
    infoField,
    bidActionField,
    patIntentField,
    pausePatActionField, dateField
} from './const';
import TableButton from '../TableButton/TableButton';
import {useSelector} from 'react-redux';
import CustomTable from '../../../../../components/Table/CustomTable';
import {round} from "../../../../../utils/round";
import {numberMask} from "../../../../../utils/numberMask";
import {ColumnMenuFilter, ColumnNumberFilter, ColumnTextFilter} from "./columnFilter";
import {subChangesCount} from "./changesCount";

const changedPATBidACoS = 'changed-pat-bid-acos';
const changedPATBidImpressions = 'changed-pat-bid-impressions';
const pausedManualPATHighACoS = 'paused-manual-pat-high-acos';
const pausedManualPatNoSales = 'paused-manual-pat-no-sales';

const PATsOptimization = ({
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
    const [activeTable, changeTable] = useState(changedPATBidACoS);
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

    useEffect(() => changeTable(changedPATBidACoS), [productId, activeTab]);


    const defaultKeys = [
        {
            ...indexField(currentPage, pageSize)
        },
        {
            ...dateField
        },
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

    const columns = {
        [changedPATBidACoS]: [
            ...defaultKeys,
            {
                title: 'ACoS',
                dataIndex: 'd_patACoS',
                key: 'd_patACoS',
                width: '90px',
                render: text => <span>{text && `${round(+text, 2)}%`}</span>,
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
                        title="Target ACoS"
                        info="The ACoS that our algorithm is aiming to reach your business goal."
                    />
                ),
                dataIndex: 'd_targetACoSCalculation_d_targetACoS',
                key: 'd_targetACoSCalculation_d_targetACoS',
                width: '11.5em',
                render: text => <span>{text && `${round(+text, 2)}%`}</span>,
                sorter: true,
                filter: (dataIndex) => <ColumnNumberFilter
                    onChangeFilter={onChangeFilter}
                    filteredColumns={filteredColumns}
                    dataIndex={dataIndex}
                />
            },
            {
                title: 'Clicks',
                dataIndex: 'd_patClicks',
                key: 'd_patClicks',
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
                render: (text) => (text && <span>{round(text, 2)}%</span>),
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
        [changedPATBidImpressions]: [
            ...defaultKeys,
            {
                title: 'Impressions',
                dataIndex: 'd_patImpressions',
                key: 'd_patImpressions',
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
        [pausedManualPATHighACoS]: [
            ...defaultKeys,
            {
                title: 'ACoS',
                dataIndex: 'd_patACoS',
                key: 'd_patACoS',
                width: '90px',
                render: text => <span>{text && `${round(+text, 2)}%`}</span>,
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
                        title="Target ACoS"
                        info="The ACoS that our algorithm is aiming to reach your business goal."
                    />
                ),
                dataIndex: 'd_targetACoSCalculation_d_targetACoS',
                key: 'd_targetACoSCalculation_d_targetACoS',
                width: '11.5em',
                render: text => <span>{text && `${text}%`}</span>,
                sorter: true,
                filter: (dataIndex) => <ColumnNumberFilter
                    onChangeFilter={onChangeFilter}
                    filteredColumns={filteredColumns}
                    dataIndex={dataIndex}
                />
            },
            {
                title: 'Clicks',
                dataIndex: 'd_patClicks',
                key: 'd_patClicks',
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
                dataIndex: 'd_patSpend',
                key: 'd_patSpend',
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
                dataIndex: 'd_patSales',
                key: 'd_patSales',
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
                render: (text) => (text && <span>{round(text, 2)}%</span>),
                sorter: true,
                filter: (dataIndex) => <ColumnNumberFilter
                    onChangeFilter={onChangeFilter}
                    filteredColumns={filteredColumns}
                    dataIndex={dataIndex}
                />
            },
            {
                ...pausePatActionField
            },
            {
                ...infoField
            }
        ],
        [pausedManualPatNoSales]: [
            ...defaultKeys,
            {
                title: 'Average CVR',
                dataIndex: 'd_averageConversionRate',
                key: 'd_averageConversionRate',
                width: '10.5em',
                render: (text) => (text && <span>{round(text, 2)}%</span>),
                sorter: true,
                filter: (dataIndex) => <ColumnNumberFilter
                    onChangeFilter={onChangeFilter}
                    filteredColumns={filteredColumns}
                    dataIndex={dataIndex}
                />
            },
            {
                title: 'Clicks',
                dataIndex: 'd_patClicks',
                key: 'd_patClicks',
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
                dataIndex: 'd_patSpend',
                key: 'd_patSpend',
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
                ...pausePatActionField
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
                    active={activeTable === changedPATBidACoS}
                    count={subChangesCount(counts, changedPATBidACoS)}
                    onClick={() => {
                        onChange(changedPATBidACoS);
                    }}
                >
                    Changed PAT Bid (<span className='underline'>ACoS</span>)
                </TableButton>
                <TableButton
                    totalSize={totalSize}
                    loading={loading}
                    active={activeTable === changedPATBidImpressions}
                    count={subChangesCount(counts, changedPATBidImpressions)}
                    onClick={() => {
                        onChange(changedPATBidImpressions);
                    }}
                >
                    Changed PAT Bid (<span className='underline'>Impressions</span>)
                </TableButton>
                <TableButton
                    totalSize={totalSize}
                    loading={loading}
                    active={activeTable === pausedManualPATHighACoS}
                    count={subChangesCount(counts, pausedManualPATHighACoS)}
                    onClick={() => {
                        onChange(pausedManualPATHighACoS);
                    }}
                >
                    Paused Manual PAT (<span className='underline'>High ACoS</span>)
                </TableButton>
                <TableButton
                    totalSize={totalSize}
                    loading={loading}
                    active={activeTable === pausedManualPatNoSales}
                    count={subChangesCount(counts, pausedManualPatNoSales)}
                    onClick={() => {
                        onChange(pausedManualPatNoSales);
                    }}
                >
                    Paused Manual Pat (<span className='underline'>No Sales</span>)
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

export default PATsOptimization;
