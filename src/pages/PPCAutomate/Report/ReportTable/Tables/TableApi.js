import React, {Component} from 'react';
import {reportsServices} from '../../../../../services/reports.services';

const DEFAULT_PAGE_SIZE = 8;

const fetchReportTable = (
    dataType,
    dataSubType = '',
    page,
    startDate = '',
    endDate = ''
) =>
    reportsServices.getAllReports({
        'data-type': dataType,
        'data-sub-type': dataSubType,
        page,
        size: DEFAULT_PAGE_SIZE,
        'start-date': startDate,
        'end-date': endDate
    })
        .then(response => response);

const TableApi = (ReportTable, tableType) =>
    class extends Component {
        state = {
            data: [],
            loading: true,
            totalSize: 1,
            totalTypeSizeResp: 0,
            count: {},
            showPagination: false
        };

        dateRange = {
            start: this.props.startTime || null,
            end: this.props.endTime || null
        };

        subType = null;


        changeDateRange = (start, end) => {
            this.dateRange = {
                start,
                end
            };
            this.fetchData(this.subType, 1);
        };

        fetchData = (subType = '', page, id) => {
            const {start, end} = this.dateRange;

            console.log(id, subType);

            this.setState({
                loading: true
            });
            let dataResp = [];
            let totalSizeResp = 1;
            let totalTypeSizeResp = 0;
            let countResp = {};

            this.subType = subType;
            fetchReportTable(tableType, subType, page, start, end)
                .then(
                    ({
                         data: {
                             data,
                             totalSize,
                             totalTypeSize = 0,
                             counts = {}
                         }
                     }) => {
                        dataResp = data;
                        totalSizeResp = totalSize;
                        totalTypeSizeResp = totalTypeSize;
                        countResp = counts;
                    }
                )
                .finally(() => {
                    this.setState({
                        loading: false,
                        data: dataResp,
                        totalSize: totalSizeResp,
                        totalTypeSize: totalTypeSizeResp,
                        count: countResp,
                        showPagination: totalSizeResp > DEFAULT_PAGE_SIZE
                    });
                });
        };

        render() {
            const {
                data,
                loading,
                totalSize,
                showPagination,
                totalTypeSize,
                count
            } = this.state;

            return (
                <ReportTable
                    fetchData={this.fetchData}
                    data={data}
                    loading={loading}
                    totalSize={totalSize}
                    showPagination={showPagination}
                    totalTypeSize={totalTypeSize}
                    count={count}
                    {...this.props}
                />
            );
        }
    };

export default TableApi;
