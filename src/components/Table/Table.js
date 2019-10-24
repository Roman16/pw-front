import React from 'react';
import {Table as AntTable} from 'antd';
import './Table.less';

const Table = (props) => {
    const {
        pageSize = 10,
        totalSize = 0,
        onChangePagination,
        currentPage,
        showPagination = false,
    } = props;

    const paginationSettings = showPagination && (totalSize > pageSize)
        ? {
            total: totalSize,
            current: currentPage,
            pageSize: pageSize,
            onChange: onChangePagination,
        }
        : false;

    console.log(props);

    return (
        <div className="Table">
            <AntTable
                {...props}
                width="150px"
                pagination={paginationSettings}
            />
        </div>
    );
};

export default Table;
