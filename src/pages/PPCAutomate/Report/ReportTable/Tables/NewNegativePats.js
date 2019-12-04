import React, {useEffect, useState, useRef} from 'react';
import TitleInfo from '../../../../../components/Table/renders/TitleInfo';
import {indexField, patIntentField, infoField, dateField} from './const';
import TableButton from '../TableButton/TableButton';
import {useSelector} from 'react-redux';
import CustomTable from '../../../../../components/Table/CustomTable';

const HighACoS = 'created-negative-pat-from-cst-high-acos';
const NoSales = 'created-negative-pat-from-cst-no-sales';

const defaultKeys = [
    {
        ...indexField
    },
    {
        ...dateField
    },
    {
        title: 'Campaign',
        dataIndex: 'campaign',
        key: 'campaign',
        width: '140px'
    },
    {
        title: 'Ad Group',
        dataIndex: 'adGroup',
        key: 'adGroup',
        width: '140px'
    },
    {
        title: (
            <TitleInfo
                title="PAT type"
                info="The type of Product Targeting. It can be a Manual or Auto."
            />
        ),
        dataIndex: 'PatType',
        key: 'PatType',
        width: '100px',
        render: text => <span className="capitalize-field">{text}</span>
    },
    {
        ...patIntentField
    },
    {
        title: 'PAT Value',
        dataIndex: 'PatValue',
        key: 'PatValue',
        width: '130px'
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
            dataIndex: 'CSTACoS',
            key: 'CSTACoS',
            width: '80px',
            render: text => <span>{text && `${text}%`}</span>
        },
        {
            title: (
                <TitleInfo
                    title="Target ACoS"
                    info="The ACoS that our algorithm is aiming to reach your business goal."
                />
            ),
            dataIndex: 'targetACoS',
            key: 'targetACoS',
            width: '90px',
            render: text => <span>{text && `${text}%`}</span>
        },
        {
            title: 'CST Clicks',
            dataIndex: 'cst_clicks',
            key: 'cst_clicks',
            width: '100px',
        },
        {
            title: 'CST Spend',
            dataIndex: 'cst_spend',
            key: 'cst_spend',
            width: '100px',
        },
        {
            title: 'CST Sales',
            dataIndex: 'cst_sales',
            key: 'cst_sales',
            width: '100px',
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
            title: 'Average Conv. Rate',
            dataIndex: 'averageConversionRate',
            key: 'averageConversionRate',
            render: text => <span>{text && `${text}%`}</span>,
            width: '90px'
        },
        {
            title: (
                <TitleInfo
                    title="CST Clicks"
                    info="It displays the number of clicks of certain customer search-term."
                />
            ),
            dataIndex: 'CSTClicks',
            key: 'CSTClicks',
            width: '110px'
        },
        {
            title: 'CST Spend',
            dataIndex: 'cst_spend',
            key: 'cst_spend',
            width: '100px',
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

const NewNegativePats = ({
                             data,
                             onChangeSubTab,
                             activeTab,
                             currentPage,
                             totalSize,
                             handlePaginationChange,
                             scroll,
                             pageSize
                         }) => {
    const [activeTable, changeTable] = useState(HighACoS);
    const {count, loading, productId} = useSelector(state => ({
        count: state.reports.counts['new-negative-pats'].subtypes_counts,
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

    return (
        <div className="report-item-table">
            <div className="report-item-table-btn" ref={refTableBtn}>
                <TableButton
                    active={activeTable === HighACoS}
                    count={count[HighACoS]}
                    onClick={() => {
                        onChange(HighACoS);
                    }}
                >
                    Created Negative PAT From CST (<span className='underline'>High ACoS</span>)
                </TableButton>
                <TableButton
                    active={activeTable === NoSales}
                    count={count[NoSales]}
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
            />
        </div>
    );
};

export default NewNegativePats;
