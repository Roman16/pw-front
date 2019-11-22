import React, { useEffect, useState, useRef } from 'react';
import TitleInfo from '../../../../../components/Table/renders/TitleInfo';
import {
  indexField,
  patIntentField,
  createdKeywordsActionField,
  infoField
} from './const';
import TableButton from '../TableButton/TableButton';
import { useSelector } from 'react-redux';
import CustomTable from '../../../../../components/Table/CustomTable';

const CreatedCrossNegativePAT = 'created-cross-negative-pat';
const CreatedPATCST = 'created-pat-cst';

const defaultKeys = [
  {
    ...indexField
  }
];

const columns = {
  [CreatedCrossNegativePAT]: [
    ...defaultKeys,
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
      width: '200px'
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
      dataIndex: 'campaign',
      key: 'campaign',
      width: '100px'
    },
    {
      title: 'Ad Group',
      dataIndex: 'adGroup',
      key: 'adGroup',
      width: '100px'
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
      width: '120px',
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
    },
    {
      title: 'Bid',
      dataIndex: 'bid',
      key: 'bid',
      render: text => <span>${text}</span>,
      width: '70px'
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
      title: (
        <TitleInfo
          title="CST ACoS"
          info="It displays the ACoS of certain customer search-term from your ad reports. "
        />
      ),
      dataIndex: 'CSTACoS',
      key: 'CSTACoS',
      render: text => <span>{text && `${text}%`}</span>,
      width: '110px'
    },
    {
      title: (
        <TitleInfo
          title="CST CPC"
          info="It displays the cost per click of certain customer search-term."
        />
      ),
      dataIndex: 'CSTCPC',
      key: 'CSTCPC',
      render: text => <span>${text}</span>,
      width: '110px'
    },
    {
      title: 'Target ACoS',
      dataIndex: 'TargetACoS',
      key: 'TargetACoS',
      render: text => <span>{text && `${text}%`}</span>,
      width: '80px'
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

const NewPats = ({
  data,
  onChangeSubTab,
  activeTab,
  currentPage,
  totalSize,
  handlePaginationChange,
  scroll
}) => {
  const [activeTable, changeTable] = useState(CreatedCrossNegativePAT);
  const { count, loading, productId } = useSelector(state => ({
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
          Created PAT (CST)
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

export default NewPats;
