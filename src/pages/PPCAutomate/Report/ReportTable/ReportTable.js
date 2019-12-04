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
import FreeTrial from "../../../../components/FreeTrial/FreeTrial";
import "./ReportTable.less";

const {TabPane} = Tabs;

const TabName = ({name = null, count}) => (
    <div className="TabName">
        <span>{name}</span>

        {count.total_count > 0 && (
            <div className="tab-name-count">
                {count.total_count > 999 ? "999+" : count.total_count}
            </div>
        )}
    </div>
);

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
        tabName: count => <TabName name="Keywords Optimization" count={count}/>,
        key: "keywords-optimization",
        component: (
            onChangeSubTab,
            data,
            activeTab,
            page,
            totalSize,
            handlePaginationChange,
            pageSize
        ) => (
            <KeywordsOptimization
                onChangeSubTab={onChangeSubTab}
                data={data}
                activeTab={activeTab}
                currentPage={page}
                totalSize={totalSize}
                handlePaginationChange={handlePaginationChange}
                pageSize={pageSize}
            />
        )
    },
    {
        tabName: count => <TabName name="PAT’s Optimization" count={count}/>,
        key: "pats-optimization",
        component: (
            onChangeSubTab,
            data,
            activeTab,
            page,
            totalSize,
            handlePaginationChange,
            pageSize
        ) => (
            <PATsOptimization
                onChangeSubTab={onChangeSubTab}
                data={data}
                activeTab={activeTab}
                currentPage={page}
                totalSize={totalSize}
                handlePaginationChange={handlePaginationChange}
                pageSize={pageSize}
            />
        )
    },
    {
        tabName: count => <TabName name="New Keywords" count={count}/>,
        key: "new-keywords",
        component: (
            onChangeSubTab,
            data,
            activeTab,
            page,
            totalSize,
            handlePaginationChange,
            pageSize
        ) => (
            <NewKeywords
                onChangeSubTab={onChangeSubTab}
                data={data}
                activeTab={activeTab}
                currentPage={page}
                totalSize={totalSize}
                handlePaginationChange={handlePaginationChange}
                pageSize={pageSize}
            />
        )
    },
    {
        tabName: count => <TabName name="New Negative Keywords" count={count}/>,
        key: "new-negative-keywords",
        component: (
            onChangeSubTab,
            data,
            activeTab,
            page,
            totalSize,
            handlePaginationChange,
            pageSize
        ) => (
            <NewNegativeKeywords
                onChangeSubTab={onChangeSubTab}
                data={data}
                activeTab={activeTab}
                currentPage={page}
                totalSize={totalSize}
                handlePaginationChange={handlePaginationChange}
                pageSize={pageSize}
            />
        )
    },
    {
        tabName: count => <TabName name={"New PAT 's"} count={count}/>,
        key: "new-pats",
        component: (
            onChangeSubTab,
            data,
            activeTab,
            page,
            totalSize,
            handlePaginationChange,
            pageSize
        ) => (
            <NewPats
                onChangeSubTab={onChangeSubTab}
                data={data}
                activeTab={activeTab}
                currentPage={page}
                totalSize={totalSize}
                handlePaginationChange={handlePaginationChange}
                pageSize={pageSize}
            />
        )
    },
    {
        tabName: count => <TabName name={"New Negative PAT's"} count={count}/>,
        key: "new-negative-pats",
        component: (
            onChangeSubTab,
            data,
            activeTab,
            page,
            totalSize,
            handlePaginationChange,
            pageSize
        ) => (
            <NewNegativePats
                onChangeSubTab={onChangeSubTab}
                data={data}
                activeTab={activeTab}
                currentPage={page}
                totalSize={totalSize}
                handlePaginationChange={handlePaginationChange}
                pageSize={pageSize}
            />
        )
    }
];

class ReportTable extends Component {
    state = {
        startDate: "",
        endDate: "",
        page: 1,
        pageSize: 10,
        activeTab: "keywords-optimization",
        activeSubTab: "changed-keyword-bid-acos",
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

    handlePaginationChange = ({page, pageSize}) => {
        if (pageSize) {
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

    fetchReports = () => {
        const {activeTab, activeSubTab, startDate, endDate, page, pageSize} = this.state,
            {selectedAll, selectedProductId} = this.props;

        this.props.getReports({
            id: selectedAll ? "all" : selectedProductId,
            dataType: activeTab,
            dataSubType: activeSubTab,
            size: 10,
            startDate,
            endDate,
            page,
            pageSize
        });
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
                page: 1
            },
            this.fetchReports
        );
    };

    handleChangeSubTab = tab => {
        this.setState({activeSubTab: tab, page: 1}, this.fetchReports);
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
        const {activeTab, page, pageSize} = this.state,
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
                        <TabPane tab={tabName(counts[key])} key={key}>
                            {component(
                                this.handleChangeSubTab,
                                data,
                                activeTab,
                                page,
                                totalSize,
                                this.handlePaginationChange,
                                pageSize
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
    totalSize: state.reports.total_subtype_size
});

const mapDispatchToProps = dispatch => ({
    getReports: options => dispatch(reportsActions.fetchAllReports(options))
});

export default connect(mapStateToProps, mapDispatchToProps)(ReportTable);
