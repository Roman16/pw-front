import React from 'react';
import { Table as AntTable } from 'antd';
// import './Table.less';

const Table = props => {
  const {
    pageSize = 10,
    totalSize = 0,
    onChangePagination,
    currentPage,
    showPagination = false,
    scroll
  } = props;

  const paginationSettings =
    showPagination && totalSize > pageSize
      ? {
          total: totalSize,
          current: currentPage,
          pageSize: pageSize,
          onChange: onChangePagination
        }
      : false;

  return (
    <div className="Table">
      <AntTable
        {...props}
        scroll={{ y: showPagination ? scroll - 80 : scroll }}
        pagination={paginationSettings}
      />
    </div>
  );
};

export default Table;
