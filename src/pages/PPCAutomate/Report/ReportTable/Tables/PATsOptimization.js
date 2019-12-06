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
import {columnMenuFilter, columnNumberFilter, columnTextFilter} from "./columnFilter";

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
    const {count, loading, productId} = useSelector(state => ({
        count: state.reports.counts['pats-optimization'].subtypes_counts,
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
            ...indexField(currentPage)
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
            ...columnTextFilter( onChangeFilter, filteredColumns)
        },
        {
            title: 'Ad Group',
            dataIndex: 'd_adGroupId',
            key: 'd_adGroupId',
            width: '150px',
            sorter: true,
            ...columnTextFilter( onChangeFilter, filteredColumns)
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
            width: '100px',
            render: text => <span className="capitalize-field">{text}</span>,
            sorter: true,
            ...columnMenuFilter(onChangeFilter, filteredColumns, ['manual'])
        },
        {
            ...patIntentField,
            width: '120px',
            sorter: true,
            ...columnMenuFilter(onChangeFilter, filteredColumns, ['asin'])
        },
        {
            title: 'PAT Value',
            dataIndex: 'd_patValue',
            key: 'd_patValue',
            width: '132px',
            sorter: true,
            ...columnTextFilter( onChangeFilter, filteredColumns)
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
                render: text => <span>{text && `${round(+text, 2)}%`}</span>,
                sorter: true,
                ...columnNumberFilter(onChangeFilter, filteredColumns)
            },
            {
                title: 'Clicks',
                dataIndex: 'd_patClicks',
                key: 'd_patClicks',
                width: '90px',
                sorter: true,
                ...columnNumberFilter(onChangeFilter, filteredColumns)
            },
            {
                title: 'Average CVR',
                dataIndex: 'd_averageConversionRate',
                key: 'd_averageConversionRate',
                width: '100px',
                render: (text) => (text &&  <span>{round(text, 2)}%</span>),
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
        [changedPATBidImpressions]: [
            ...defaultKeys,
            {
                title: 'Impressions',
                dataIndex: 'd_patImpressions',
                key: 'd_patImpressions',
                width: '130px',
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
                width: '150px',
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
        [pausedManualPATHighACoS]: [
            ...defaultKeys,
            {
                title: 'ACoS',
                dataIndex: 'd_patACoS',
                key: 'd_patACoS',
                width: '90px',
                render: text => <span>{text && `${round(+text, 2)}%`}</span>,
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
                dataIndex: 'd_patClicks',
                key: 'd_patClicks',
                width: '90px',
                sorter: true,
                ...columnNumberFilter(onChangeFilter, filteredColumns)
            },
            {
                title: 'Spend',
                dataIndex: 'd_patSpend',
                key: 'd_patSpend',
                width: '90px',
                render: (spend) => (spend && <span>${numberMask(spend, 2)}</span>),
                 sorter: true,
                ...columnNumberFilter(onChangeFilter, filteredColumns)
            },
            {
                title: 'Sales',
                dataIndex: 'd_patSales',
                key: 'd_patSales',
                width: '90px',
                render: (sales) => (sales && <span>${numberMask(sales, 2)}</span>),
                 sorter: true,
                ...columnNumberFilter(onChangeFilter, filteredColumns)
            },
            {
                title: 'Average CVR',
                dataIndex: 'd_averageConversionRate',
                key: 'd_averageConversionRate',
                width: '100px',
                render: (text) => (text &&  <span>{round(text, 2)}%</span>),
                 sorter: true,
                ...columnNumberFilter(onChangeFilter, filteredColumns)
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
                render: (text) => (text &&  <span>{round(text, 2)}%</span>),
                 sorter: true,
                ...columnNumberFilter(onChangeFilter, filteredColumns)
            },
            {
                title: 'Clicks',
                dataIndex: 'd_patClicks',
                key: 'd_patClicks',
                width: '90px',
                sorter: true,
                ...columnNumberFilter(onChangeFilter, filteredColumns)
            },
            {
                title: 'Spend',
                dataIndex: 'd_patSpend',
                key: 'd_patSpend',
                width: '90px',
                render: (spend) => (spend && <span>${numberMask(spend, 2)}</span>),
                 sorter: true,
                ...columnNumberFilter(onChangeFilter, filteredColumns)
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
                    active={activeTable === changedPATBidACoS}
                    count={count[changedPATBidACoS]}
                    onClick={() => {
                        onChange(changedPATBidACoS);
                    }}
                >
                    Changed PAT Bid (<span className='underline'>ACoS</span>)
                </TableButton>
                <TableButton
                    active={activeTable === changedPATBidImpressions}
                    count={count[changedPATBidImpressions]}
                    onClick={() => {
                        onChange(changedPATBidImpressions);
                    }}
                >
                    Changed PAT Bid (<span className='underline'>Impressions</span>)
                </TableButton>
                <TableButton
                    active={activeTable === pausedManualPATHighACoS}
                    count={count[pausedManualPATHighACoS]}
                    onClick={() => {
                        onChange(pausedManualPATHighACoS);
                    }}
                >
                    Paused Manual PAT (<span className='underline'>High ACoS</span>)
                </TableButton>
                <TableButton
                    active={activeTable === pausedManualPatNoSales}
                    count={count[pausedManualPatNoSales]}
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
