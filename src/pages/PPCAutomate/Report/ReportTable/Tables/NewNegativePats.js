import React, { useEffect, useState } from 'react';
import TitleInfo from '../../../../../components/Table/renders/TitleInfo';
import { indexField, patIntentField, infoField } from './const';
import TableButton from '../TableButton/TableButton';
import { useSelector } from 'react-redux';
import CustomTable from '../../../../../components/Table/CustomTable';

const HighACoS = 'created-negative-pat-from-cst-high-acos';
const NoSales = 'created-negative-pat-from-cst-no-sales';

const defaultKeys = [
    {
        ...indexField
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
        width: '150px',
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
            width: '120px',
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
            width: '110px',
            render: text => <span>{text && `${text}%`}</span>
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
            width: '120px'
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
    scroll
}) => {
    const [activeTable, changeTable] = useState(HighACoS);
    const { count, loading, productId } = useSelector(state => ({
        count: state.reports.counts['new-negative-pats'].subtypes_counts,
        loading: state.reports.loading,
        productId: state.products.selectedProduct.id
    }));

    const onChange = tab => {
        onChangeSubTab(tab);
        changeTable(tab);
    };

    useEffect(() => changeTable(HighACoS), [productId, activeTab]);

    return (
        <div className="report-item-table">
            <div className="report-item-table-btn">
                <TableButton
                    active={activeTable === HighACoS}
                    count={count[HighACoS]}
                    onClick={() => {
                        onChange(HighACoS);
                    }}
                >
                    Created Negative PAT From CST (High ACoS)
                </TableButton>
                <TableButton
                    active={activeTable === NoSales}
                    count={count[NoSales]}
                    onClick={() => {
                        onChange(NoSales);
                    }}
                >
                    Created Negative PAT From CST (No Sales)
                </TableButton>
            </div>

            <CustomTable
                onChangePagination={handlePaginationChange}
                loading={loading}
                dataSource={data}
                columns={columns[activeTable]}
                currentPage={currentPage}
                totalSize={totalSize}
            />
        </div>
    );
};

export default NewNegativePats;
