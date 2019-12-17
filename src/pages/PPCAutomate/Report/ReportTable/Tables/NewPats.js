import React, {useEffect, useState, useRef} from 'react';
import TitleInfo from '../../../../../components/Table/renders/TitleInfo';
import {
    indexField,
    patIntentField,
    createdKeywordsActionField,
    infoField, dateField
} from './const';
import TableButton from '../TableButton/TableButton';
import {useSelector} from 'react-redux';
import CustomTable from '../../../../../components/Table/CustomTable';
import {numberMask} from "../../../../../utils/numberMask";
import {ColumnMenuFilter, ColumnNumberFilter, ColumnTextFilter} from "./columnFilter";
import {subChangesCount} from "./changesCount";
import {round} from "../../../../../utils/round";

const CreatedCrossNegativePAT = 'created-cross-negative-pat';
const CreatedPATCST = 'created-pat-cst';

const NewPats = ({
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
    const [activeTable, changeTable] = useState(CreatedCrossNegativePAT);
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

    useEffect(() => changeTable(CreatedCrossNegativePAT), [productId, activeTab]);


    const defaultKeys = [
        {
            ...indexField(currentPage, pageSize)
        },
        {
            ...dateField
        },
    ];

    const columns = {
        [CreatedCrossNegativePAT]: [
            ...defaultKeys,
            {
                title: 'Campaign',
                dataIndex: 'd_campaignName',
                key: 'd_campaignName',
                width: '200px',
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
                width: '9em',
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
                width: '10.5em',
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
                width: '13.5em',
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
                width: '13em',
                sorter: true,
                filter: (dataIndex) => <ColumnTextFilter
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
        [CreatedPATCST]: [
            ...defaultKeys,
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
                        position='top'
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
                title: (
                    <TitleInfo
                        position='top'
                        title="CST ACoS"
                        info="It displays the ACoS of certain customer search-term from your ad reports. "
                    />
                ),
                dataIndex: 'd_customerSearchTermACoS',
                key: 'd_customerSearchTermACoS',
                render: text => <span>{text && `${round(text, 2)}%`}</span>,
                width: '10.5em',
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
                render: text => <span>{text && `${round(text, 2)}%`}</span>,
                width: '11.5em',
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
                width: '60px',
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
                    totalSize={totalSize}
                    loading={loading}
                    active={activeTable === CreatedCrossNegativePAT}
                    count={subChangesCount(counts, CreatedCrossNegativePAT)}
                    onClick={() => {
                        onChange(CreatedCrossNegativePAT);
                    }}
                >
                    Created Cross-Negative PAT
                </TableButton>
                <TableButton
                    totalSize={totalSize}
                    loading={loading}
                    active={activeTable === CreatedPATCST}
                    count={subChangesCount(counts, CreatedPATCST)}
                    onClick={() => {
                        onChange(CreatedPATCST);
                    }}
                >
                    Created PAT (<span className='underline'>CST</span>)
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
                rowClassName={(item) => !item.viewed && 'new-report'}
            />
        </div>
    );
};

export default NewPats;
