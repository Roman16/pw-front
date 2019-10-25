import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Tabs, Button} from 'antd';
import KeywordsOptimization from './Tables/KeywordsOptimization';
import DatePicker from '../../../../components/DatePicker/DatePicker';
import PATsOptimization from './Tables/PATsOptimization';
import NewKeywords from './Tables/NewKeywords';
import NewNegativeKeywords from './Tables/NewNegativeKeywords';
import NewPats from './Tables/NewPats';
import NewNegativePats from './Tables/NewNegativePats';
import {reportsActions} from '../../../../actions/reports.actions';
import './ReportTable.less';

const {TabPane} = Tabs;

const TabName = ({name = null, count}) => (
    <div className="TabName">
        <span>{name}</span>
        {count.totalCount > 0 && <div className="tab-name-count">{count.totalCount}</div>}
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
            <TabName name="Keywords Optimization" count={count}/>
        ),
        key: 'keywords-optimization',
        component: (ref, start, end, updateTotalTypeSize, onChangeSubTab, data) => (
            <KeywordsOptimization
                onChangeSubTab={onChangeSubTab}
                ref={ref}
                startTime={start}
                endTime={end}
                updateTotalTypeSize={updateTotalTypeSize}
                data={data}
            />
        )
    },
    {
        tabName: count => <TabName name="PAT’s Optimization" count={count}/>,
        key: 'pats-optimization',
        component: (ref, start, end, updateTotalTypeSize, onChangeSubTab, data) => (
            <PATsOptimization
                onChangeSubTab={onChangeSubTab}
                ref={ref}
                startTime={start}
                endTime={end}
                updateTotalTypeSize={updateTotalTypeSize}
                data={data}
            />
        )
    },
    {
        tabName: count => <TabName name="New Keywords" count={count}/>,
        key: 'new-keywords',
        component: (ref, start, end, updateTotalTypeSize, onChangeSubTab, data) => (
            <NewKeywords
                onChangeSubTab={onChangeSubTab}
                ref={ref}
                startTime={start}
                endTime={end}
                updateTotalTypeSize={updateTotalTypeSize}
                data={data}
            />
        )
    },
    {
        tabName: count => (
            <TabName name="New Negative Keywords" count={count}/>
        ),
        key: 'new-negative-keywords',
        component: (ref, start, end, updateTotalTypeSize, onChangeSubTab, data) => (
            <NewNegativeKeywords
                onChangeSubTab={onChangeSubTab}
                ref={ref}
                startTime={start}
                endTime={end}
                updateTotalTypeSize={updateTotalTypeSize}
                data={data}
            />
        )
    },
    {
        tabName: count => <TabName name={"New PAT 's"} count={count}/>,
        key: 'new-pats',
        component: (ref, start, end, updateTotalTypeSize, onChangeSubTab, data) => (
            <NewPats
                onChangeSubTab={onChangeSubTab}
                ref={ref}
                startTime={start}
                endTime={end}
                updateTotalTypeSize={updateTotalTypeSize}
                data={data}
            />
        )
    },
    {
        tabName: count => <TabName name={"New Negative PAT's"} count={count}/>,
        key: 'new-negative-pats',
        component: (ref, start, end, updateTotalTypeSize, onChangeSubTab, data) => (
            <NewNegativePats
                onChangeSubTab={onChangeSubTab}
                ref={ref}
                startTime={start}
                endTime={end}
                updateTotalTypeSize={updateTotalTypeSize}
                data={data}
            />
        )
    }
];

class ReportTable extends Component {
    state = {
        startDate: null,
        activeTab: 'keywords-optimization',
        activeSubTab: 'changed-keyword-bid-acos',
        endDate: null,
        updateSize: {
            'keywords-optimization': 0,
            'pats-optimization': 0,
            'new-keywords': 0,
            'new-negative-keywords': 0,
            'new-pats': 0,
            'new-negative-pats': 0
        }
    };

    updateTotalTypeSize = (key, value) => {
        this.setState(({updateSize}) => ({
            updateSize: {
                ...updateSize,
                [key]: value
            }
        }));
    };

    downloadFile = () => {
        const url = process.env.REACT_APP_API_URL;

        // axios.get(
        //     `${url}/api/ppc-automation/reports/download-report`,
        //     this.props.selectedProductId
        // );
    };

    timeRange = (startDate, endDate) => {
        this.myRef.current.changeDateRange(startDate, endDate);
        this.setState({
            startDate,
            endDate
        });
    };

    fetchReports = () => {
        const {activeTab, activeSubTab} = this.state;

        this.props.getReports({
            id: this.props.selectedProductId,
            dataType: activeTab,
            dataSubType: activeSubTab,
            size: 10,
        })
    };

    handleChangeTab = (tab) => {
        this.setState({
            activeTab: tab,
            activeSubTab: subTables[tab]
        }, this.fetchReports);
    };

    handleChangeSubTab = (tab) => {
        console.log(tab);
        this.setState({activeSubTab: tab}, this.fetchReports)
    };

    componentDidMount() {
        this.fetchReports();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.selectedProductId !== this.props.selectedProductId) {
            this.setState({
                activeTab: 'keywords-optimization',
                activeSubTab: 'changed-keyword-bid-acos',
            }, this.fetchReports)
        }
    }

    render() {
        const {startDate, endDate, activeTab, updateSize} = this.state,
            {counts, data} = this.props;

        return (
            <div className="ReportTable">
                <div className="report-table">
                    <h3>Changes Report</h3>
                    <div>
                        <span>
                            Today Changes
                            <span className="total-count">99+</span>
                        </span>
                        <DatePicker timeRange={this.timeRange}/>
                        {/* <Link to="/ppc-automation/reports/download-report"> */}
                        <Button onClick={this.downloadFile}>
                            Download
                            <i className="download"/>
                        </Button>
                        {/* </Link> */}
                    </div>
                </div>

                <Tabs activeKey={activeTab} type="card" onChange={this.handleChangeTab}>
                    {tabsItem.map(({tabName, key, component}) => (
                        <TabPane tab={tabName(counts[key])} key={key}>
                            {component(
                                this.myRef,
                                startDate,
                                endDate,
                                this.updateTotalTypeSize,
                                this.handleChangeSubTab,
                                data
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
    counts: state.reports.counts,
    data: state.reports.data,
});

const mapDispatchToProps = dispatch => ({
    getReports: (options) => dispatch(reportsActions.fetchAllReports(options))
});

export default connect(mapStateToProps, mapDispatchToProps)(ReportTable);
