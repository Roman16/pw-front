import React, {Component} from "react";
import {connect} from "react-redux";
import moment from "moment";
import {Tabs, Button} from "antd";
import FreeTrial from "../../../../components/FreeTrial/FreeTrial";

import KeywordsOptimization from "./Tables/KeywordsOptimization";
import DatePicker from "../../../../components/DatePicker/DatePickerOLD";
import PATsOptimization from "./Tables/PATsOptimization";
import NewKeywords from "./Tables/NewKeywords";
import NewNegativeKeywords from "./Tables/NewNegativeKeywords";
import NewPats from "./Tables/NewPats";
import NewNegativePats from "./Tables/NewNegativePats";
import AllReports from "./Tables/AllReports";
import {reportsActions} from "../../../../actions/reports.actions";
import {reportsUrls} from "../../../../constans/api.urls";
import "./ReportTable.less";
import {mainChangesCount, mainHasNewReport} from "./Tables/changesCount";
import axios from "axios";

const CancelToken = axios.CancelToken;
let source = null;

const {TabPane} = Tabs;

const TabName = ({name = null, type, counts, countsWithNew}) => {
    return (
        <div className="TabName">
            <span>{name}</span>

            <div className="tab-name-count">
                {mainChangesCount(counts, type)}
            </div>

            {mainHasNewReport(countsWithNew, type) > 0 &&
            <div className='new-count'>New {mainHasNewReport(countsWithNew, type)}</div>}
        </div>
    )
};

const subTables = {
    "all-reports": "all-reports",
    "keywords-optimization": "changed-keyword-bid-acos",
    "pats-optimization": "changed-pat-bid-acos",
    "new-keywords": "created-campaign",
    "new-negative-keywords": "created-negative-keyword-from-cst-high-acos",
    "new-pats": "created-cross-negative-pat",
    "new-negative-pats": "created-negative-pat-from-cst-high-acos"
};

const tabsItem = [
    {
        tabName: (key, counts, countsWithNew) => <TabName
            name="All"
            type={key}
            counts={counts}
            countsWithNew={countsWithNew}
        />,
        key: "all-reports",
        component: (
            onChangeSubTab,
            data,
            activeTab,
            page,
            totalSize,
            handlePaginationChange,
            pageSize,
            onChangeFilter,
            filteredColumns,
            handleChangeSorter,
            sorterColumn
        ) => (
            <AllReports
                onChangeSubTab={onChangeSubTab}
                data={data}
                activeTab={activeTab}
                currentPage={page}
                totalSize={totalSize}
                handlePaginationChange={handlePaginationChange}
                pageSize={pageSize}
                onChangeFilter={onChangeFilter}
                filteredColumns={filteredColumns}
                handleChangeSorter={handleChangeSorter}
                sorterColumn={sorterColumn}
            />
        )
    },
    {
        tabName: (key, counts, countsWithNew) => <TabName name="Keywords Optimization" type={key} counts={counts}
                                                          countsWithNew={countsWithNew}/>,
        key: "keywords-optimization",
        component: (
            onChangeSubTab,
            data,
            activeTab,
            page,
            totalSize,
            handlePaginationChange,
            pageSize,
            onChangeFilter,
            filteredColumns,
            handleChangeSorter,
            sorterColumn
        ) => (
            <KeywordsOptimization
                onChangeSubTab={onChangeSubTab}
                data={data}
                activeTab={activeTab}
                currentPage={page}
                totalSize={totalSize}
                handlePaginationChange={handlePaginationChange}
                pageSize={pageSize}
                onChangeFilter={onChangeFilter}
                filteredColumns={filteredColumns}
                handleChangeSorter={handleChangeSorter}
                sorterColumn={sorterColumn}
            />
        )
    },
    {
        tabName: (key, counts, countsWithNew) => <TabName name="PAT’s Optimization" type={key} counts={counts}
                                                          countsWithNew={countsWithNew}/>,
        key: "pats-optimization",
        component: (
            onChangeSubTab,
            data,
            activeTab,
            page,
            totalSize,
            handlePaginationChange,
            pageSize,
            onChangeFilter,
            filteredColumns,
            handleChangeSorter,
            sorterColumn
        ) => (
            <PATsOptimization
                onChangeSubTab={onChangeSubTab}
                data={data}
                activeTab={activeTab}
                currentPage={page}
                totalSize={totalSize}
                handlePaginationChange={handlePaginationChange}
                pageSize={pageSize}
                onChangeFilter={onChangeFilter}
                filteredColumns={filteredColumns}
                handleChangeSorter={handleChangeSorter}
                sorterColumn={sorterColumn}
            />
        )
    },
    {
        tabName: (key, counts, countsWithNew) => <TabName name="New Keywords" type={key} counts={counts}
                                                          countsWithNew={countsWithNew}/>,
        key: "new-keywords",
        component: (
            onChangeSubTab,
            data,
            activeTab,
            page,
            totalSize,
            handlePaginationChange,
            pageSize,
            onChangeFilter,
            filteredColumns,
            handleChangeSorter,
            sorterColumn
        ) => (
            <NewKeywords
                onChangeSubTab={onChangeSubTab}
                data={data}
                activeTab={activeTab}
                currentPage={page}
                totalSize={totalSize}
                handlePaginationChange={handlePaginationChange}
                pageSize={pageSize}
                onChangeFilter={onChangeFilter}
                filteredColumns={filteredColumns}
                handleChangeSorter={handleChangeSorter}
                sorterColumn={sorterColumn}
            />
        )
    },
    {
        tabName: (key, counts, countsWithNew) => <TabName name="New Negative Keywords" type={key} counts={counts}
                                                          countsWithNew={countsWithNew}/>,
        key: "new-negative-keywords",
        component: (
            onChangeSubTab,
            data,
            activeTab,
            page,
            totalSize,
            handlePaginationChange,
            pageSize,
            onChangeFilter,
            filteredColumns,
            handleChangeSorter,
            sorterColumn
        ) => (
            <NewNegativeKeywords
                onChangeSubTab={onChangeSubTab}
                data={data}
                activeTab={activeTab}
                currentPage={page}
                totalSize={totalSize}
                handlePaginationChange={handlePaginationChange}
                pageSize={pageSize}
                onChangeFilter={onChangeFilter}
                filteredColumns={filteredColumns}
                handleChangeSorter={handleChangeSorter}
                sorterColumn={sorterColumn}
            />
        )
    },
    {
        tabName: (key, counts, countsWithNew) => <TabName name={"New PAT 's"} type={key} counts={counts}
                                                          countsWithNew={countsWithNew}/>,
        key: "new-pats",
        component: (
            onChangeSubTab,
            data,
            activeTab,
            page,
            totalSize,
            handlePaginationChange,
            pageSize,
            onChangeFilter,
            filteredColumns,
            handleChangeSorter,
            sorterColumn
        ) => (
            <NewPats
                onChangeSubTab={onChangeSubTab}
                data={data}
                activeTab={activeTab}
                currentPage={page}
                totalSize={totalSize}
                handlePaginationChange={handlePaginationChange}
                pageSize={pageSize}
                onChangeFilter={onChangeFilter}
                filteredColumns={filteredColumns}
                handleChangeSorter={handleChangeSorter}
                sorterColumn={sorterColumn}
            />
        )
    },
    {
        tabName: (key, counts, countsWithNew) => <TabName name={"New Negative PAT's"} type={key} counts={counts}
                                                          countsWithNew={countsWithNew}/>,
        key: "new-negative-pats",
        component: (
            onChangeSubTab,
            data,
            activeTab,
            page,
            totalSize,
            handlePaginationChange,
            pageSize,
            onChangeFilter,
            filteredColumns,
            handleChangeSorter,
            sorterColumn
        ) => (
            <NewNegativePats
                onChangeSubTab={onChangeSubTab}
                data={data}
                activeTab={activeTab}
                currentPage={page}
                totalSize={totalSize}
                handlePaginationChange={handlePaginationChange}
                pageSize={pageSize}
                onChangeFilter={onChangeFilter}
                filteredColumns={filteredColumns}
                handleChangeSorter={handleChangeSorter}
                sorterColumn={sorterColumn}
            />
        )
    }
];

class ReportTable extends Component {
    state = {
        startDate: "",
        endDate: "",
        page: 1,
        pageSize: this.props.pageSize || 10,
        totalSize: this.props.totalSize || 0,
        activeTab: "all-reports",
        activeSubTab: "",
        filteredColumns: {},
        sorterColumn: {
            key: 'eventDateTime',
            type: 'desc'
        },
        updateSize: {
            'all-reports': 0,
            "keywords-optimization": 0,
            "pats-optimization": 0,
            "new-keywords": 0,
            "new-negative-keywords": 0,
            "new-pats": 0,
            "new-negative-pats": 0
        }
    };

    downloadFile = () => {
        const {startDate, endDate} = this.state,
            {selectedProductId, selectedAll} = this.props,
            token = localStorage.getItem("token");

        const parameters = [
            selectedAll
                ? `&product_id=all`
                : `&product_id=${selectedProductId || "all"}`,
            startDate ? `&start_date=${startDate}` : "",
            endDate ? `&end_date=${endDate}` : ""
        ];

        const url = `${process.env.REACT_APP_API_URL || ""}/api/${
            reportsUrls.downloadReports
        }?token=${token}${parameters.join("")}`;
        window.open(url);
    };

    fetchReports = (selectedPage) => {
        const {activeTab, activeSubTab, startDate, endDate, page, pageSize, filteredColumns, sorterColumn} = this.state,
            {selectedAll, selectedProductId} = this.props;

        source && source.cancel();

        source = CancelToken.source();

        this.props.getReports({
            id: selectedAll ? "all" : selectedProductId,
            dataType: activeTab,
            dataSubType: activeSubTab,
            size: 10,
            startDate,
            endDate,
            page: selectedPage ? selectedPage : page,
            pageSize,
            filteredColumns,
            sorterColumn
        }, source.token);
    };

    handlePaginationChange = ({page, pageSize}) => {
        if (pageSize) {
            this.props.setPageSize(pageSize);

            this.setState(
                {
                    page: 1,
                    pageSize: pageSize
                }, () => {
                    this.fetchReports()
                }
            );
        } else {
            this.fetchReports(page);
            this.setState(
                {
                    page: page,
                    pageSize: this.state.pageSize
                }
            );
        }
    };

    timeRange = (startDate, endDate) => {
        this.setState(
            {
                startDate: startDate
                    ? moment(startDate, "DD-MM-YYYY").format("YYYY-MM-DD")
                    : null,
                endDate: endDate
                    ? moment(endDate, "DD-MM-YYYY").format("YYYY-MM-DD")
                    : null
            },
            this.fetchReports
        );
    };

    handleChangeTab = tab => {
        this.setState(
            {
                activeTab: tab,
                activeSubTab: subTables[tab],
                page: 1,
                totalSize: null,
                filteredColumns: {},
                sorterColumn: {
                    key: 'eventDateTime',
                    type: 'desc'
                }
            }, () => {
                // source && source.cancel();
                this.fetchReports();
            }
        );
    };

    handleChangeSubTab = tab => {

        this.setState({
            totalSize: null,
            activeSubTab: tab,
            page: 1,
            filteredColumns: {},
            sorterColumn: {
                key: 'eventDateTime',
                type: 'desc'
            }
        }, () => {
            // source && source.cancel();
            this.fetchReports();
        });
    };

    handleChangeFilter = (key, value, type) => {
        let newFilteredColumns = {...this.state.filteredColumns};
        if (value.length > 0 || value.type) {
            if (type === 'number') {
                this.setState({
                    filteredColumns: {
                        ...this.state.filteredColumns,
                        [key]: value
                    }
                }, () => {
                    if (JSON.stringify(newFilteredColumns) !== JSON.stringify(this.state.filteredColumns)) {
                        this.fetchReports()
                    }
                });

            } else {
                this.setState({
                    filteredColumns: {
                        ...this.state.filteredColumns,
                        [key]: value
                    }
                }, () => {
                    if (JSON.stringify(newFilteredColumns) !== JSON.stringify(this.state.filteredColumns)) {
                        this.fetchReports()
                    }
                });
            }
        } else {
            delete newFilteredColumns[key];
            this.setState({
                filteredColumns: newFilteredColumns
            }, this.fetchReports)
        }
    };

    handleChangeSorter = (column) => {
        const {sorterColumn} = this.state;

        if (sorterColumn && sorterColumn.key === column) {
            if (sorterColumn.type === 'desc') this.setState({
                sorterColumn: {
                    key: column,
                    type: 'asc'
                }
            }, this.fetchReports);
            if (sorterColumn.type === 'asc') this.setState({sorterColumn: {}}, this.fetchReports);

        } else {
            this.setState({
                sorterColumn: {
                    key: column,
                    type: 'desc'
                }
            }, this.fetchReports)
        }
    };

    componentDidMount() {
        this.fetchReports();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (
            prevProps.selectedProductId !== this.props.selectedProductId ||
            prevProps.selectedAll !== this.props.selectedAll
        ) {
            this.setState(
                {
                    activeTab: "all-reports",
                    activeSubTab: ""
                },
                this.fetchReports
            );
        }

        if (prevProps.totalSize !== this.props.totalSize) {
            this.setState(
                {
                    totalSize: this.props.totalSize
                });
        }
    }

    render() {
        const {activeTab, page, pageSize, filteredColumns, sorterColumn, totalSize} = this.state,
            {counts, data, todayChanges, countsWithNew} = this.props;

        return (
            <div className="ReportTable">
                <div className="report-table">
                    <h3 className="main-title">Changes Report</h3>
                    <div className="changes-calendar-download">
                        <div className="total-count">
                            Today Changes
                            <span>{todayChanges}</span>
                        </div>

                        <DatePicker timeRange={this.timeRange}/>

                        <button className="btn default download-btn" onClick={this.downloadFile}>
                            <span> Download </span>
                            <i className="download-icon"/>
                        </button>
                    </div>

                    <FreeTrial product={'ppc'}/>
                </div>

                <Tabs activeKey={activeTab} type="card" onChange={this.handleChangeTab}>
                    {tabsItem.map(({tabName, key, component}) => (
                        <TabPane tab={tabName(key, counts, countsWithNew)} key={key}>
                            {component(
                                this.handleChangeSubTab,
                                data,
                                activeTab,
                                page,
                                totalSize,
                                this.handlePaginationChange,
                                pageSize,
                                this.handleChangeFilter,
                                filteredColumns,
                                this.handleChangeSorter,
                                sorterColumn
                            )}
                        </TabPane>
                    ))}
                </Tabs>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    selectedProductId: state.products.selectedProduct.id,
    selectedAll: state.products.selectedAll,
    counts: state.reports.counts,
    data: state.reports.data,
    todayChanges: state.reports.today_changes,
    totalSize: state.reports.totalSize,
    pageSize: state.reports.pageSize,
    countsWithNew: state.reports.counts_with_new
});

const mapDispatchToProps = dispatch => ({
    getReports: (options, cancelToken) => dispatch(reportsActions.fetchAllReports(options, cancelToken)),
    setPageSize: pageSize => dispatch(reportsActions.setPageSize(pageSize)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReportTable);
