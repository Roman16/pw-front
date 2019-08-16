import React, { Component } from 'react';
import { Table as AntTable } from 'antd';
import './Table.less';
import PropTypes from 'prop-types';

class Table extends Component {
    render() {
        return (
            <div className="CardBox">
                <AntTable {...this.props} />
            </div>
        );
    }
}

Table.propTypes = {};
Table.defaultProps = {};

export default Table;
