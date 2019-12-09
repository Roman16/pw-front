import React, {Component} from "react";
import {connect} from "react-redux";
import moment from "moment";
import {Tabs, Button} from "antd";

import KeywordsOptimization from "./Tables/KeywordsOptimization";
import DatePicker from "../../../../components/DatePicker/DatePickerOLD";
import PATsOptimization from "./Tables/PATsOptimization";
import NewKeywords from "./Tables/NewKeywords";
import NewNegativeKeywords from "./Tables/NewNegativeKeywords";
import NewPats from "./Tables/NewPats";
import NewNegativePats from "./Tables/NewNegativePats";
import {reportsActions} from "../../../../actions/reports.actions";
import {reportsUrls} from "../../../../constans/api.urls";
import "./ReportTable.less";
import {mainChangesCount} from "./Tables/changesCount";

const {TabPane} = Tabs;

const TabName = ({name = null, type, counts}) => {
    return (
        <div className="TabName">
            <span>{name}</span>

            <div className="tab-name-count">
                {mainChangesCount(counts, type)}
            </div>
        </div>
    )
};

const subTables = {
    "keywords-optimization": "changed-keyword-bid-acos",
    "pats-optimization": "changed-pat-bid-acos",
    "new-keywords": "created-campaign",
    "new-negative-keywords": "created-negative-keyword-from-cst-high-acos",
    "new-pats": "created-cross-negative-pat",
    "new-negative-pats": "created-negative-pat-from-cst-high-acos"
};

const tabsItem = [
    {
        tabName: (key, counts) => <TabName name="Keywords Optimization" type={key} counts={counts}/>,
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
        tabName: (key, counts) => <TabName name="PAT’s Optimization" type={key} counts={counts}/>,
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
        tabName: (key, counts) => <TabName name="New Keywords" type={key} counts={counts}/>,
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
        tabName: (key, counts) => <TabName name="New Negative Keywords" type={key} counts={counts}/>,
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
        tabName: (key, counts) => <TabName name={"New PAT 's"} type={key} counts={counts}/>,
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
        tabName: (key, counts) => <TabName name={"New Negative PAT's"} type={key} counts={counts}/>,
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
        activeTab: "keywords-optimization",
        activeSubTab: "changed-keyword-bid-acos",
        filteredColumns: {},
        sorterColumn: {
            key: null,
            type: null
        },
        updateSize: {
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

    fetchReports = () => {
        const {activeTab, activeSubTab, startDate, endDate, page, pageSize, filteredColumns, sorterColumn} = this.state,
            {selectedAll, selectedProductId} = this.props;

        this.props.getReports({
            id: selectedAll ? "all" : selectedProductId,
            dataType: activeTab,
            dataSubType: activeSubTab,
            size: 10,
            startDate,
            endDate,
            page,
            pageSize,
            filteredColumns,
            sorterColumn
        });
    };

    handlePaginationChange = ({page, pageSize}) => {
        if (pageSize) {
            this.props.setPageSize(pageSize);

            this.setState(
                {
                    page: 1,
                    pageSize: pageSize
                },
                this.fetchReports
            );
        } else {
            this.setState(
                {
                    page: page,
                    pageSize: this.state.pageSize
                },
                this.fetchReports
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
                filteredColumns: {},
                sorterColumn: null
            },
            this.fetchReports
        );
    };

    handleChangeSubTab = tab => {
        this.setState({
            activeSubTab: tab,
            page: 1,
            filteredColumns: {},
            sorterColumn: null
        }, this.fetchReports);
    };

    handleChangeFilter = (key, value, type) => {
        if (type === 'number') {
            this.setState({
                filteredColumns: {
                    ...this.state.filteredColumns,
                    [key]: value
                }
            }, this.fetchReports);

        } else {
            this.setState({
                filteredColumns: {
                    ...this.state.filteredColumns,
                    [key]: value
                }
            }, this.fetchReports);
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
            if (sorterColumn.type === 'asc') this.setState({sorterColumn: null}, this.fetchReports);

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
                    activeTab: "keywords-optimization",
                    activeSubTab: "changed-keyword-bid-acos"
                },
                this.fetchReports
            );
        }
    }

    render() {
        const {activeTab, page, pageSize, filteredColumns, sorterColumn} = this.state,
            {counts, data, todayChanges, totalSize} = this.props;


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

                        <Button className="download-btn" onClick={this.downloadFile}>
                            Download
                            <i className="download-icon"/>
                        </Button>
                    </div>

                    {/*<FreeTrial/>*/}
                </div>

                <Tabs activeKey={activeTab} type="card" onChange={this.handleChangeTab}>
                    {tabsItem.map(({tabName, key, component}) => (
                        <TabPane tab={tabName(key, counts)} key={key}>
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
});

const mapDispatchToProps = dispatch => ({
    getReports: options => dispatch(reportsActions.fetchAllReports(options)),
    setPageSize: pageSize => dispatch(reportsActions.setPageSize(pageSize)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReportTable);
