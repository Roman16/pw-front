import React, { Component } from 'react';
import { Table as AntTable } from 'antd';
import './Table.less';
import PropTypes from 'prop-types';

class Table extends Component {
    render() {
        return (
            <div className="Table">
                <AntTable {...this.props} width="150px" />
            </div>
        );
    }
}

Table.propTypes = {};
Table.defaultProps = {};

export default Table;
