import React, { useEffect, useState, useRef } from 'react';
import TitleInfo from '../../../../../components/Table/renders/TitleInfo';
import TableButton from '../TableButton/TableButton';
import { indexField, infoField, negativeMatchTypeField } from './const';
import { useSelector } from 'react-redux';
import CustomTable from '../../../../../components/Table/CustomTable';

const highACoS = 'created-negative-keyword-from-cst-high-acos';
const noSales = 'created-negative-keyword-from-cst-no-sales';

const defaultKeys = [
  {
    ...indexField
  },
  {
    title: 'Campaign',
    dataIndex: 'campaign',
    key: 'campaign',
    width: '180px'
  },
  {
    title: 'Ad Group',
    dataIndex: 'adGroup',
    key: 'adGroup',
    width: '180px'
  },
  {
    title: 'Keyword',
    dataIndex: 'keyword',
    key: 'keyword',
    width: '180px'
  },
  {
    ...negativeMatchTypeField
  }
];

const columns = {
  [highACoS]: [
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
      width: '80px',
      render: text => <span>{text && `${text}%`}</span>
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      width: '100px',
      className: 'left-border',
      render: () => <div className="action-field">Created</div>
    },
    {
      ...infoField
    }
  ],
  [noSales]: [
    ...defaultKeys,
    {
      title: 'Average Conversion Rate',
      dataIndex: 'averageConversionRate',
      key: 'averageConversionRate',
      width: '80px'
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
      width: '100px',
      className: 'left-border',
      render: () => <div className="action-field">Created</div>
    },
    {
      ...infoField
    }
  ]
};

const NewNegativeKeywords = ({
  data,
  onChangeSubTab,
  activeTab,
  currentPage,
  totalSize,
  handlePaginationChange,
  scroll
}) => {
  const [activeTable, changeTable] = useState(highACoS);
  const { count, loading, productId } = useSelector(state => ({
    count: state.reports.counts['new-negative-keywords'].subtypes_counts,
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

  useEffect(() => changeTable(highACoS), [productId, activeTab]);

  return (
    <div className="report-item-table">
      <div className="report-item-table-btn" ref={refTableBtn}>
        <TableButton
          active={activeTable === highACoS}
          count={count[highACoS]}
          onClick={() => {
            onChange(highACoS);
          }}
        >
          Created Negative Keyword From CST (High ACoS)
        </TableButton>
        <TableButton
          active={activeTable === noSales}
          count={count[noSales]}
          onClick={() => {
            onChange(noSales);
          }}
        >
          Created Negative Keyword From CST (No Sales)
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
      />
    </div>
  );
};

export default NewNegativeKeywords;
