import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Tabs, Button} from 'antd';
import axios from 'axios';
import KeywordsOptimization from './Tables/KeywordsOptimization';
import DatePicker from '../../../../components/DatePicker/DatePicker';
import PATsOptimization from './Tables/PATsOptimization';
import NewKeywords from './Tables/NewKeywords';
import NewNegativeKeywords from './Tables/NewNegativeKeywords';
import NewPats from './Tables/NewPats';
import NewNegativePats from './Tables/NewNegativePats';
import './ReportTable.less';

const {TabPane} = Tabs;

const TabName = ({name = null, count = 0}) => (
    <div className="TabName">
        <span>{name}</span>
        {count > 0 && <div className="tab-name-count">{count}</div>}
    </div>
);

const tabsItem = [
    {
        tabName: count => (
            <TabName name="Keywords Optimization" count={count}/>
        ),
        key: 'keywords-optimization',
        component: (ref, start, end, updateTotalTypeSize, selectedProductId) => (
            <KeywordsOptimization
                productId={selectedProductId}
                ref={ref}
                startTime={start}
                endTime={end}
                updateTotalTypeSize={updateTotalTypeSize}
            />
        )
    },
    {
        tabName: count => <TabName name="PAT’s Optimization" count={count}/>,
        key: 'pats-optimization',
        component: (ref, start, end, updateTotalTypeSize, selectedProductId) => (
            <PATsOptimization
                productId={selectedProductId}
                ref={ref}
                startTime={start}
                endTime={end}
                updateTotalTypeSize={updateTotalTypeSize}
            />
        )
    },
    {
        tabName: count => <TabName name="New Keywords" count={count}/>,
        key: 'new-keywords',
        component: (ref, start, end, updateTotalTypeSize, selectedProductId) => (
            <NewKeywords
                productId={selectedProductId}
                ref={ref}
                startTime={start}
                endTime={end}
                updateTotalTypeSize={updateTotalTypeSize}
            />
        )
    },
    {
        tabName: count => (
            <TabName name="New Negative Keywords" count={count}/>
        ),
        key: 'new-negative-keywords',
        component: (ref, start, end, updateTotalTypeSize, selectedProductId) => (
            <NewNegativeKeywords
                productId={selectedProductId}
                ref={ref}
                startTime={start}
                endTime={end}
                updateTotalTypeSize={updateTotalTypeSize}
            />
        )
    },
    {
        tabName: count => <TabName name={"New PAT 's"} count={count}/>,
        key: 'new-pats',
        component: (ref, start, end, updateTotalTypeSize, selectedProductId) => (
            <NewPats
                productId={selectedProductId}
                ref={ref}
                startTime={start}
                endTime={end}
                updateTotalTypeSize={updateTotalTypeSize}
            />
        )
    },
    {
        tabName: count => <TabName name={"New Negative PAT's"} count={count}/>,
        key: 'new-negative-pats',
        component: (ref, start, end, updateTotalTypeSize, selectedProductId) => (
            <NewNegativePats
                productId={selectedProductId}
                ref={ref}
                startTime={start}
                endTime={end}
                updateTotalTypeSize={updateTotalTypeSize}
            />
        )
    }
];

class ReportTable extends Component {
    state = {
        startDate: null,
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

        axios.get(
            `${url}/api/ppc-automation/reports/download-report`,
            this.props.selectedProductId
        );
    };

    timeRange = (startDate, endDate) => {
        this.myRef.current.changeDateRange(startDate, endDate);
        this.setState({
            startDate,
            endDate
        });
    };

    render() {
        const {startDate, endDate, updateSize} = this.state,
            {selectedProductId} = this.props;

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

                <Tabs defaultActiveKey={tabsItem[0].key} type="card">
                    {tabsItem.map(({tabName, key, component}) => (
                        <TabPane tab={tabName(updateSize[key])} key={key}>
                            {component(
                                this.myRef,
                                startDate,
                                endDate,
                                this.updateTotalTypeSize,
                                selectedProductId
                            )}
                        </TabPane>
                    ))}
                </Tabs>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    selectedProductId: state.products.selectedProduct.id
});

export default connect(mapStateToProps)(ReportTable);
