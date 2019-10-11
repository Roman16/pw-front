import React, { Component } from 'react';
import { Table as AntTable } from 'antd';
import './Table.less';
// import PropTypes from 'prop-types';

class Table extends Component {
    render() {
        const {
            totalSize = 0,
            onChangePagination,
            currentPage,
            showPagination = false,
        } = this.props;

        const paginationSettings = showPagination
            ? {
                total: totalSize,
                current: currentPage,
                onChange: onChangePagination,
            }
            : false;

        return (
            <div className="Table">
                <AntTable
                    {...this.props}
                    width="150px"
                    pagination={paginationSettings}
                />
            </div>
        );
    }
}

Table.propTypes = {};
Table.defaultProps = {};

export default Table;
