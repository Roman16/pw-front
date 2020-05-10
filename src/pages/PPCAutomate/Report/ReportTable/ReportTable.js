import React, {Component} from "react";
import {connect} from "react-redux";
import moment from "moment";
import axios from "axios";
import Slider from "react-slick";
import DatePicker from "../../../../components/DatePicker/DatePickerOLD";
import FreeTrial from "../../../../components/FreeTrial/FreeTrial";
import {allColumnsOrder} from "./Tables/allColumnsOrder";
import {indexField, dateField} from './Tables/const';
import {keywordsOptimization} from "./Tables/KeywordsOptimization";
import {patsOptimization} from "./Tables/PATsOptimization";
import {newKeywords} from "./Tables/NewKeywords";
import {newNegativeKeywords} from "./Tables/NewNegativeKeywords";
import {newPats} from "./Tables/NewPats";
import {newNegativePats} from "./Tables/NewNegativePats";
import {allReports} from "./Tables/AllReports";
import {reportsUrls} from "../../../../constans/api.urls";
import "./ReportTable.less";
import {mainChangesCount, mainHasNewReport, subChangesCount} from "./Tables/changesCount";
import CustomTable from "../../../../components/Table/CustomTable";
import TableButton from "./TableButton/TableButton";
import tz from 'moment-timezone';

import {Select} from "antd";
import CustomSelect from "../../../../components/Select/Select";
import {SVG} from "../../../../utils/icons";
import Button from "../../../../components/Button/Button";
import Pagination from "../../../../components/Pagination/Pagination";

const Option = Select.Option;
const CancelToken = axios.CancelToken;
let source = null;

const subTables = {
    "all-reports": "all-reports",
    "keywords-optimization": "changed-keyword-bid-acos",
    "pats-optimization": "changed-pat-bid-acos",
    "new-keywords": "created-campaign",
    "new-negative-keywords": "created-negative-keyword-from-cst-high-acos",
    "new-pats": "created-cross-negative-pat",
    "new-negative-pats": "created-negative-pat-from-cst-high-acos"
};


const ReportTable = ({
                         currentTab,
                         reportsList,
                         processing,
                         paginationParams,
                         paginationChangeHandler
                     }) => {
    //
    // fetchReports = (selectedPage) => {
    //     const {activeTab, activeSubTab, startDate, endDate, page, pageSize, filteredColumns, sorterColumn} = this.state,
    //         {selectedAll, selectedProductId} = this.props;
    //
    //     source && source.cancel();
    //
    //     source = CancelToken.source();
    //
    //     if (selectedAll || selectedProductId) {
    //         this.props.getReports({
    //             id: selectedAll ? "all" : selectedProductId,
    //             dataType: activeTab,
    //             dataSubType: activeSubTab,
    //             size: 10,
    //             startDate,
    //             endDate,
    //             page: selectedPage ? selectedPage : page,
    //             pageSize,
    //             filteredColumns,
    //             sorterColumn
    //         }, source.token);
    //     }
    // };
    //
    //
    // timeRange = (startDate, endDate) => {
    //     this.setState(
    //         {
    //             startDate: startDate
    //                 ? moment.tz(`${moment(startDate, 'DD-MM-YY').format('YYYY-MM-DD')} ${moment().startOf('day').format('HH:mm:ss')}`, 'America/Los_Angeles').toISOString()
    //                 : null,
    //             endDate: endDate
    //                 ? moment.tz(`${moment(endDate, 'DD-MM-YY').format('YYYY-MM-DD')} ${moment().endOf('day').format('HH:mm:ss')}`, 'America/Los_Angeles').toISOString()
    //                 : null
    //         },
    //         this.fetchReports
    //     );
    // };

    //
    // handleChangeFilter = (key, value, type) => {
    //     let newFilteredColumns = {...this.state.filteredColumns};
    //
    //     if (value.length > 0 || value.type) {
    //         if (type === 'number') {
    //             this.setState({
    //                 filteredColumns: {
    //                     ...this.state.filteredColumns,
    //                     [key]: value
    //                 }
    //             }, () => {
    //                 if (JSON.stringify(newFilteredColumns) !== JSON.stringify(this.state.filteredColumns)) {
    //                     this.setState({
    //                         page: 1
    //                     }, this.fetchReports)
    //                 }
    //             });
    //         } else {
    //             this.setState({
    //                 filteredColumns: {
    //                     ...this.state.filteredColumns,
    //                     [key]: value
    //                 }
    //             }, () => {
    //                 if (JSON.stringify(newFilteredColumns) !== JSON.stringify(this.state.filteredColumns)) {
    //                     this.setState({
    //                         page: 1
    //                     }, this.fetchReports)
    //                 }
    //             });
    //         }
    //     } else {
    //         delete newFilteredColumns[key];
    //         this.setState({
    //             page: 1,
    //             filteredColumns: newFilteredColumns
    //         }, this.fetchReports)
    //     }
    // };
    //
    // handleChangeSorter = (column) => {
    //     const {sorterColumn} = this.state;
    //
    //     if (sorterColumn && sorterColumn.key === column) {
    //         if (sorterColumn.type === 'desc') this.setState({
    //             sorterColumn: {
    //                 key: column,
    //                 type: 'asc'
    //             }
    //         }, this.fetchReports);
    //         if (sorterColumn.type === 'asc') this.setState({sorterColumn: {}}, this.fetchReports);
    //
    //     } else {
    //         this.setState({
    //             sorterColumn: {
    //                 key: column,
    //                 type: 'desc'
    //             }
    //         }, this.fetchReports)
    //     }
    // };

    const mainTabs = {
        'allReports': allReports(),
        "targetingImprovements": keywordsOptimization(),
        "searchTerms": patsOptimization(),
    };


    return (
        <div className="ReportTable">
            <div className="content">
                <CustomTable
                    // onChangeSorter={this.handleChangeSorter}
                    loading={processing}
                    dataSource={reportsList}
                    columns={[
                        {...dateField},
                        ...allColumnsOrder
                            .map(column => (mainTabs[currentTab].find(item => item.key === column.key)))
                            .filter(column => column != null)
                    ]}
                    // sorterColumn={sorterColumn}
                    rowClassName={(item) => !item.viewed && 'new-report'}
                />
            </div>

            <Pagination
                onChange={paginationChangeHandler}
                page={paginationParams.page}
                pageSizeOptions={[10, 50, 100]}
                pageSize={paginationParams.pageSize}
                totalSize={paginationParams.totalSize}
                listLength={reportsList.length}
                processing={processing}
            />
        </div>
    );
}


export default React.memo(ReportTable);
