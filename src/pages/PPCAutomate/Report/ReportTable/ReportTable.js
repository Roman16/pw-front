import React from "react";
import axios from "axios";
import {dateField} from './Tables/const';
import "./ReportTable.less";
import CustomTable from "../../../../components/Table/CustomTable";
import {Select} from "antd";
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
                         reportsList,
                         processing,
                         paginationParams,
                         paginationChangeHandler,
                         sortChangeHandler,
                         columns
                     }) => {

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




    return (
        <div className="ReportTable">
            <div className="content">
                <CustomTable
                    onChangeSorter={sortChangeHandler}
                    loading={processing}
                    dataSource={reportsList}
                    columns={[
                        {...dateField},
                        ...columns
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
