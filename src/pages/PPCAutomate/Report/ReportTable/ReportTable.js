import React from "react";
import {dateField, infoField, sorterByKeywordField} from './Tables/const';
import "./ReportTable.less";
import CustomTable from "../../../../components/Table/CustomTable";
import Pagination from "../../../../components/Pagination/Pagination";

const ReportTable = ({
                         reportsList,
                         processing,
                         paginationParams,
                         paginationChangeHandler,
                         sortChangeHandler,
                         columns,
                         sorterColumn,
                         addFilterHandler,
                         totalSize
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
                    sorterColumn={sorterColumn}
                    columns={[
                        {...dateField},
                        ...columns,
                        {...infoField},
                        {...sorterByKeywordField(addFilterHandler)}
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
                totalSize={totalSize}
                listLength={reportsList.length}
                processing={processing}
            />
        </div>
    );
}


export default React.memo(ReportTable);
