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
import {reportsActions} from "../../../../actions/reports.actions";
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

const device = window.devicePixelRatio === 2;

class ReportTable extends Component {
    state = {
        startDate: "",
        endDate: "",
        page: 1,
        pageSize: this.props.pageSize || 10,
        totalSize: this.props.totalSize || 0,
        activeTab: "all-reports",
        activeSubTab: "all-reports",
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

        if (selectedAll || selectedProductId) {
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
        }
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
                    ? moment.tz(`${moment(startDate, 'DD-MM-YY').format('YYYY-MM-DD')} ${moment().startOf('day').format('HH:mm:ss')}`, 'America/Los_Angeles').toISOString()
                    : null,
                endDate: endDate
                    ? moment.tz(`${moment(endDate, 'DD-MM-YY').format('YYYY-MM-DD')} ${moment().endOf('day').format('HH:mm:ss')}`, 'America/Los_Angeles').toISOString()
                    : null
            },
            this.fetchReports
        );
    };

    handleChangeTab = tab => {
        if (tab !== this.state.activeTab) {
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
        }
    };

    handleChangeSubTab = tab => {
        if (tab !== this.state.activeSubTab) {
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
        }
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
                        this.setState({
                            page: 1
                        }, this.fetchReports)
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
                        this.setState({
                            page: 1
                        }, this.fetchReports)
                    }
                });
            }
        } else {
            delete newFilteredColumns[key];
            this.setState({
                page: 1,
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
                    activeSubTab: "all-reports",
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
        const {activeTab, page, pageSize, filteredColumns, sorterColumn, totalSize, activeSubTab} = this.state,
            {counts, data, todayChanges, countsWithNew, loading} = this.props;

        const TabName = ({name = null, type}) => {
            return (
                <div className="TabName" data-intercom-target={`${type}-category`}>
                    <span>{name}</span>

                    <div className="tab-name-count">
                        {mainChangesCount(counts, type) > 1000 ? '999+' : mainChangesCount(counts, type)}

                        {mainHasNewReport(countsWithNew, type) > 0 &&
                        <div className='new-count'>New {mainHasNewReport(countsWithNew, type)}</div>}
                    </div>
                </div>
            )
        };

        const mainTabs = {
            'all-reports': {
                tabName: (key) => <TabName
                    name="All Reports"
                    type={key}
                />,
                ...allReports({page, pageSize})
            },
            "keywords-optimization": {
                tabName: (key) => <TabName
                    name="Keywords Optimization"
                    type={key}
                />,
                ...keywordsOptimization({page, pageSize, onChangeFilter: this.handleChangeFilter, filteredColumns})
            },
            "pats-optimization": {
                tabName: (key) => <TabName
                    name="PAT’s Optimization"
                    type={key}
                />,
                ...patsOptimization({page, pageSize, onChangeFilter: this.handleChangeFilter, filteredColumns})
            },
            "new-keywords": {
                tabName: (key) => <TabName
                    name="New Keywords"
                    type={key}
                />,
                ...newKeywords({page, pageSize, onChangeFilter: this.handleChangeFilter, filteredColumns})
            },
            "new-negative-keywords": {
                tabName: (key) => <TabName
                    name="New Negative Keywords"
                    type={key}
                />,
                ...newNegativeKeywords({page, pageSize, onChangeFilter: this.handleChangeFilter, filteredColumns})
            },
            "new-pats": {
                tabName: (key) => <TabName
                    name="New PAT's"
                    type={key}
                />,
                ...newPats({page, pageSize, onChangeFilter: this.handleChangeFilter, filteredColumns})
            },
            "new-negative-pats": {
                tabName: (key) => <TabName
                    name="New Negative PAT's"
                    type={key}
                />,
                ...newNegativePats({page, pageSize, onChangeFilter: this.handleChangeFilter, filteredColumns})
            }
        };

        return (
            <div className="ReportTable">
                <div className="report-table">
                    <h3 className="main-title">Changes Report</h3>
                    <div className="changes-calendar-download">
                        <div className="total-count">
                            Today Changes
                            <span>{todayChanges}</span>
                        </div>

                        <DatePicker
                            timeRange={this.timeRange}/>

                        <Button className="btn default download-btn" onClick={this.downloadFile}>
                            <span> Download </span>

                            <SVG id='download'/>
                        </Button>
                    </div>

                    <FreeTrial product={'ppc'}/>
                </div>

                <div className="tabs desc">
                    <Slider
                        dots={false}
                        infinite={false}
                        speed={500}
                        slidesToShow={7}
                        slidesToScroll={1}
                        nextArrow={<button>&#8250;</button>}
                        prevArrow={<button>&#8249;</button>}
                        responsive={[
                            {
                                breakpoint: device ? 2400 : 2000,
                                settings: {
                                    slidesToShow: 6,
                                    slidesToScroll: 1,
                                }
                            },
                            {
                                breakpoint: device ? 1400 : 1840,
                                settings: {
                                    slidesToShow: 5,
                                    slidesToScroll: 1,
                                }
                            },
                            {
                                breakpoint: device ? 1350 : 1700,
                                settings: {
                                    slidesToShow: 4,
                                    slidesToScroll: 1
                                }
                            },
                            {
                                breakpoint: device ? 1100 : 1430,
                                settings: {
                                    slidesToShow: 3,
                                    slidesToScroll: 1
                                }
                            },
                            {
                                breakpoint: device ? 950 : 1220,
                                settings: {
                                    slidesToShow: 2,
                                    slidesToScroll: 1
                                }
                            },
                            {
                                breakpoint: device ? 2400 : 1060,
                                settings: {
                                    slidesToShow: 1,
                                    slidesToScroll: 1
                                }
                            },
                        ]}
                    >
                        {Object.keys(mainTabs).map((item) => (
                            <div className={`tab ${activeTab === item && 'active'}`}
                                 onClick={() => this.handleChangeTab(item)}>
                                {mainTabs[item].tabName(item, counts, countsWithNew)}
                            </div>
                        ))}
                    </Slider>
                </div>

                <div className="tabs mob">
                    <CustomSelect value={activeTab} onChange={(e) => {
                        this.handleChangeTab(e)
                    }}>
                        {Object.keys(mainTabs).map((item) => (
                            <Option value={item}>
                                {mainTabs[item].tabName(item, counts, countsWithNew)}
                            </Option>
                        ))}
                    </CustomSelect>
                </div>

                <div className="content">
                    <div className="report-item-table-btn">
                        {mainTabs[activeTab].subTabs.map(item => (
                            <TableButton
                                dataIntercomTarget={`${item.key}-sub-category`}
                                totalSize={totalSize}
                                loading={loading}
                                active={item.key === activeSubTab}
                                count={subChangesCount(counts, item.key, countsWithNew)}
                                onClick={() => {
                                    this.handleChangeSubTab(item.key);
                                }}
                            >
                                {item.title}
                            </TableButton>
                        ))}
                    </div>

                    <CustomTable
                        onChangePagination={this.handlePaginationChange}
                        onChangeSorter={this.handleChangeSorter}
                        loading={loading}
                        dataSource={data}
                        columns={[
                            {...indexField(page, pageSize)},
                            {...dateField},
                            ...allColumnsOrder
                                .map(column => (mainTabs[activeTab].columns[activeSubTab].find(item => item.key === column.key)))
                                .filter(column => column != null)
                        ]}
                        currentPage={page}
                        totalSize={totalSize}
                        showSizeChanger={true}
                        pageSize={pageSize}
                        sorterColumn={sorterColumn}
                        rowClassName={(item) => !item.viewed && 'new-report'}
                    />
                </div>
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
    countsWithNew: state.reports.counts_with_new,
    loading: state.reports.loading,

});

const mapDispatchToProps = dispatch => ({
    getReports: (options, cancelToken) => dispatch(reportsActions.fetchAllReports(options, cancelToken)),
    setPageSize: pageSize => dispatch(reportsActions.setPageSize(pageSize)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReportTable);
