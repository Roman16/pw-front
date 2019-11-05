import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Tabs, Button } from 'antd';

import KeywordsOptimization from './Tables/KeywordsOptimization';
import DatePicker from '../../../../components/DatePicker/DatePicker';
import PATsOptimization from './Tables/PATsOptimization';
import NewKeywords from './Tables/NewKeywords';
import NewNegativeKeywords from './Tables/NewNegativeKeywords';
import NewPats from './Tables/NewPats';
import NewNegativePats from './Tables/NewNegativePats';
import { reportsActions } from '../../../../actions/reports.actions';
import { reportsUrls } from '../../../../constans/api.urls';
import FreeTrial from '../../../../components/FreeTrial/FreeTrial';
import './ReportTable.less';



const { TabPane } = Tabs;

const TabName = ({ name = null, count }) => (
    <div className="TabName">
        <span>{name}</span>

        {count.total_count > 0 && (
            <div className="tab-name-count">
                {count.total_count > 999 ? '999+' : count.total_count}
            </div>
        )}
    </div>
);

const subTables = {
    'keywords-optimization': 'changed-keyword-bid-acos',
    'pats-optimization': 'changed-pat-bid-acos',
    'new-keywords': 'created-campaign',
    'new-negative-keywords': 'created-negative-keyword-from-cst-high-acos',
    'new-pats': 'created-cross-negative-pat',
    'new-negative-pats': 'created-negative-pat-from-cst-high-acos'
};

const tabsItem = [
    {
        tabName: count => (
            <TabName name="Keywords Optimization" count={count} />
        ),
        key: 'keywords-optimization',
        component: (
            onChangeSubTab,
            data,
            activeTab,
            page,
            totalSize,
            handlePaginationChange
        ) => (
            <KeywordsOptimization
                onChangeSubTab={onChangeSubTab}
                data={data}
                activeTab={activeTab}
                currentPage={page}
                totalSize={totalSize}
                handlePaginationChange={handlePaginationChange}
            />
        )
    },
    {
        tabName: count => <TabName name="PAT’s Optimization" count={count} />,
        key: 'pats-optimization',
        component: (
            onChangeSubTab,
            data,
            activeTab,
            page,
            totalSize,
            handlePaginationChange
        ) => (
            <PATsOptimization
                onChangeSubTab={onChangeSubTab}
                data={data}
                activeTab={activeTab}
                currentPage={page}
                totalSize={totalSize}
                handlePaginationChange={handlePaginationChange}
            />
        )
    },
    {
        tabName: count => <TabName name="New Keywords" count={count} />,
        key: 'new-keywords',
        component: (
            onChangeSubTab,
            data,
            activeTab,
            page,
            totalSize,
            handlePaginationChange
        ) => (
            <NewKeywords
                onChangeSubTab={onChangeSubTab}
                data={data}
                activeTab={activeTab}
                currentPage={page}
                totalSize={totalSize}
                handlePaginationChange={handlePaginationChange}
            />
        )
    },
    {
        tabName: count => (
            <TabName name="New Negative Keywords" count={count} />
        ),
        key: 'new-negative-keywords',
        component: (
            onChangeSubTab,
            data,
            activeTab,
            page,
            totalSize,
            handlePaginationChange
        ) => (
            <NewNegativeKeywords
                onChangeSubTab={onChangeSubTab}
                data={data}
                activeTab={activeTab}
                currentPage={page}
                totalSize={totalSize}
                handlePaginationChange={handlePaginationChange}
            />
        )
    },
    {
        tabName: count => <TabName name={"New PAT 's"} count={count} />,
        key: 'new-pats',
        component: (
            onChangeSubTab,
            data,
            activeTab,
            page,
            totalSize,
            handlePaginationChange
        ) => (
            <NewPats
                onChangeSubTab={onChangeSubTab}
                data={data}
                activeTab={activeTab}
                currentPage={page}
                totalSize={totalSize}
                handlePaginationChange={handlePaginationChange}
            />
        )
    },
    {
        tabName: count => <TabName name={"New Negative PAT's"} count={count} />,
        key: 'new-negative-pats',
        component: (
            onChangeSubTab,
            data,
            activeTab,
            page,
            totalSize,
            handlePaginationChange
        ) => (
            <NewNegativePats
                onChangeSubTab={onChangeSubTab}
                data={data}
                activeTab={activeTab}
                currentPage={page}
                totalSize={totalSize}
                handlePaginationChange={handlePaginationChange}
            />
        )
    }
];

class ReportTable extends Component {
    state = {
        startDate: '',
        endDate: '',
        page: 1,
        activeTab: 'keywords-optimization',
        activeSubTab: 'changed-keyword-bid-acos',
        updateSize: {
            'keywords-optimization': 0,
            'pats-optimization': 0,
            'new-keywords': 0,
            'new-negative-keywords': 0,
            'new-pats': 0,
            'new-negative-pats': 0
        }
    };

    downloadFile = () => {
        const { startDate, endDate } = this.state,
            { selectedProductId, selectedAll } = this.props,
            token = localStorage.getItem('token');

        const parameters = [
            selectedAll
                ? `&product_id=all`
                : `&product_id=${selectedProductId || 'all'}`,
            startDate ? `&start_date=${startDate}` : '',
            endDate ? `&end_date=${endDate}` : ''
        ];

        const url = `${process.env.REACT_APP_API_URL || ''}/api/${
            reportsUrls.downloadReports
        }?token=${token}${parameters.join('')}`;
        window.open(url);
    };

    handlePaginationChange = page => {
        this.setState(
            {
                page
            },
            this.fetchReports
        );
    };

    fetchReports = () => {
        const {
                activeTab,
                activeSubTab,
                startDate,
                endDate,
                page
            } = this.state,
            { selectedAll, selectedProductId } = this.props;

        this.props.getReports({
            id: selectedAll ? 'all' : selectedProductId,
            dataType: activeTab,
            dataSubType: activeSubTab,
            size: 10,
            startDate,
            endDate,
            page
        });
    };

    timeRange = (startDate, endDate) => {
        this.setState(
            {
                startDate: startDate
                    ? moment(startDate, 'DD-MM-YYYY').format('YYYY-MM-DD')
                    : moment(new Date()).format('YYYY-MM-DD'),
                endDate: endDate
                    ? moment(endDate, 'DD-MM-YYYY').format('YYYY-MM-DD')
                    : moment(new Date()).format('YYYY-MM-DD')
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
        this.setState({ activeSubTab: tab, page: 1 }, this.fetchReports);
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
                    activeTab: 'keywords-optimization',
                    activeSubTab: 'changed-keyword-bid-acos'
                },
                this.fetchReports
            );
        }
    }

    render() {
        const { activeTab, page } = this.state,
            { counts, data, todayChanges, totalSize } = this.props;

        return (
            <div className="ReportTable">
                <div className="report-table">
                    <h3>Changes Report</h3>
                    <div className="changes-calendar-download">
                        <div className="total-count">
                            Today Changes
                            <span>{todayChanges}</span>
                        </div>

                        <DatePicker />

                        {/* <DayPickerRangeController /> */}
                        {/* <Link to="/ppc-automation/reports/download-report"> */}
                        <Button
                            className="download-btn"
                            onClick={this.downloadFile}
                        >
                            Download
                            <i className="download-icon" />
                        </Button>
                        {/* </Link> */}
                    </div>
                    <FreeTrial />
                </div>

                <Tabs
                    activeKey={activeTab}
                    type="card"
                    onChange={this.handleChangeTab}
                >
                    {tabsItem.map(({ tabName, key, component }) => (
                        <TabPane tab={tabName(counts[key])} key={key}>
                            {component(
                                this.handleChangeSubTab,
                                data,
                                activeTab,
                                page,
                                totalSize,
                                this.handlePaginationChange
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ReportTable);
