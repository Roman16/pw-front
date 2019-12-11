import React, {useEffect, useState, useRef} from 'react';
import TitleInfo from '../../../../../components/Table/renders/TitleInfo';
import {indexField, patIntentField, infoField, dateField} from './const';
import TableButton from '../TableButton/TableButton';
import {useSelector} from 'react-redux';
import CustomTable from '../../../../../components/Table/CustomTable';
import {round} from "../../../../../utils/round";
import {numberMask} from "../../../../../utils/numberMask";
import {ColumnMenuFilter, ColumnNumberFilter,ColumnTextFilter} from "./columnFilter";
import {subChangesCount} from "./changesCount";

const HighACoS = 'created-negative-pat-from-cst-high-acos';
const NoSales = 'created-negative-pat-from-cst-no-sales';

const NewNegativePats = ({
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
    const [activeTable, changeTable] = useState(HighACoS);
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

    useEffect(() => changeTable(HighACoS), [productId, activeTab]);


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
            // title: (
            //     <TitleInfo
            //         title="PAT Value"
            //         info=""
            //     />
            // ),
            title: 'PAT Value',
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
        [HighACoS]: [
            ...defaultKeys,
            {
                title: (
                    <TitleInfo
                        title="CST ACoS"
                        info="It displays the ACoS of certain customer search-term from your ad reports. "
                    />
                ),
                dataIndex: 'd_customerSearchTermACoS',
                key: 'd_customerSearchTermACoS',
                width: '10.5em',
                render: text => <span>{text && `${text}%`}</span>,
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
                title: (
                    <TitleInfo
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
                title: (
                    <TitleInfo
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
                    active={activeTable === HighACoS}
                    count={subChangesCount(counts, HighACoS)}
                    onClick={() => {
                        onChange(HighACoS);
                    }}
                >
                    Created Negative PAT From CST (<span className='underline'>High ACoS</span>)
                </TableButton>
                <TableButton
                    active={activeTable === NoSales}
                    count={subChangesCount(counts, NoSales)}
                    onClick={() => {
                        onChange(NoSales);
                    }}
                >
                    Created Negative PAT From CST (<span className='underline'>No Sales</span>)
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

export default NewNegativePats;
