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
import {columnNumberFilter, columnTextFilter} from "./columnFilter";

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
    const {count, loading, productId} = useSelector(state => ({
        count: state.reports.counts['new-pats'].subtypes_counts,
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
            ...indexField(currentPage)
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
                ...columnTextFilter(onChangeFilter, filteredColumns)
            },
            {
                title: 'Ad Group',
                dataIndex: 'd_adGroupId',
                key: 'd_adGroupId',
                sorter: true,
                ...columnTextFilter(onChangeFilter, filteredColumns)
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
                render: text => <span className="capitalize-field">{text}</span>,
                sorter: true,

            },
            {
                ...patIntentField,
                sorter: true,

            },
            {
                title: 'PAT Value',
                dataIndex: 'd_patValue',
                key: 'd_patValue',
                sorter: true,
                ...columnTextFilter(onChangeFilter, filteredColumns)
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
                ...columnTextFilter(onChangeFilter, filteredColumns)
            },
            {
                title: 'Ad Group',
                dataIndex: 'd_adGroupId',
                key: 'd_adGroupId',
                width: '150px',
                sorter: true,
                ...columnTextFilter(onChangeFilter, filteredColumns)
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
                width: '120px',
                render: text => <span className="capitalize-field">{text}</span>,
                sorter: true,

            },
            {
                ...patIntentField,
                width: '110px',
                sorter: true,

            },
            {
                title: 'PAT Value',
                dataIndex: 'd_patValue',
                key: 'd_patValue',
                width: '130px',
                sorter: true,
                ...columnTextFilter(onChangeFilter, filteredColumns)
            },
            {
                title: 'Bid',
                dataIndex: 'd_bid',
                key: 'd_bid',
                width: '70px',
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
                width: '110px',
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
                width: '110px',
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
                width: '100px',
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
                width: '110px',
                sorter: true,
                ...columnNumberFilter(onChangeFilter, filteredColumns)
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
                    active={activeTable === CreatedCrossNegativePAT}
                    count={count[CreatedCrossNegativePAT]}
                    onClick={() => {
                        onChange(CreatedCrossNegativePAT);
                    }}
                >
                    Created Cross-Negative PAT
                </TableButton>
                <TableButton
                    active={activeTable === CreatedPATCST}
                    count={count[CreatedPATCST]}
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
            />
        </div>
    );
};

export default NewPats;
