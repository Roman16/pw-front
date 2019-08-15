import React, { Component } from 'react';
import { Table } from 'antd';
import PropTypes from 'prop-types';
import KeywordsOptimization from './Tables/KeywordsOptimization';
import './ReportTable.less';


class ReportTable extends Component {
    render() {
        return (
            <div className="ReportTable">
                <KeywordsOptimization />
            </div>
        );
    }
}

ReportTable.propTypes = {};

ReportTable.defaultProps = {};

export default ReportTable;
