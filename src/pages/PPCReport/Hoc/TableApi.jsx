import React, { Component } from 'react';
import axios from 'axios';
import { DEFAULT_PAGE_SIZE } from '../const';


const fetchReportTable = (
    dataType, dataSubType = '', page, startDate = '', endDate = '',
) => (
    axios.get(`${window.BASE_URL}/ppc-report/get-table-data`, {
        params: {
            'data-type': dataType,
            'data-sub-typ': dataSubType,
            page,
            size: DEFAULT_PAGE_SIZE,
            'start-date': startDate,
            'end-date': endDate,
        },
        headers: {
            Authorization:
                'Bearer INaDvhEVGFUEzhXDSpZtQ8i0PKZlb6E1pkpK99PqqnJKfCK3pGSwXuF4Y8Bq',
        },
    })
        .then((response) => response)

);


const TableApi = (ReportTable, tableType) => (
    class extends Component {
        constructor(props) {
            super(props);

            this.state = {
                data: [],
                loading: true,
                totalSize: 1,
                showPagination: false,
            };
            const {
                startTime = null,
                endTime = null,
            } = props;

            this.dateRange = {
                start: startTime,
                end: endTime,
            };
            this.subType = null;
        }


        changeDateRange = (start, end) => {
            this.dateRange = {
                start,
                end,
            };
            this.fetchData(this.subType, 1);
        };

        fetchData = (subType = '', page) => {
            const { start, end } = this.dateRange;

            this.setState({
                loading: true,

            });
            let dataResp = [];
            let totalSizeResp = 1;

            this.subType = subType;
            fetchReportTable(
                tableType, subType, page, start, end,
            )
                .then(({ data: { data, totalSize } }) => {
                    dataResp = data;
                    totalSizeResp = totalSize;
                })
                .finally(() => {
                    this.setState({
                        loading: false,
                        data: dataResp,
                        totalSize: totalSizeResp,
                        showPagination: totalSizeResp > DEFAULT_PAGE_SIZE,

                    });
                });
        };

        render() {
            const {
                data, loading, totalSize, showPagination,
            } = this.state;


            return (
                <ReportTable
                    fetchData={this.fetchData}
                    data={data}
                    loading={loading}
                    totalSize={totalSize}
                    showPagination={showPagination}
                    {...this.props}
                />
            );
        }
    }

);

export default TableApi;
