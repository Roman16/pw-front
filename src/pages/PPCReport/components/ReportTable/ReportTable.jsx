import React, { Component } from 'react';
import { Tabs } from 'antd';
import axios from 'axios';
import Buttons from '../../../../components/Buttons';
import KeywordsOptimization from './Tables/KeywordsOptimization';
import DatePicker from '../../../../components/DatePicker';
import PATsOptimization from './Tables/PATsOptimization';
import NewKeywords from './Tables/NewKeywords';
import NewNegativeKeywords from './Tables/NewNegativeKeywords';
import NewPats from './Tables/NewPats';
import NewNegativePats from './Tables/NewNegativePats';
import './ReportTable.less';

const { TabPane } = Tabs;

const TabName = ({ name = null, count = 0 }) => (
    <div className="TabName">
        <span>{name}</span>
        {count > 0 && <div className="tab-name-count">{count}</div>}
    </div>
);

const tabsItem = [
    {
        tabName: (count) => (
            <TabName name="Keywords Optimization" count={count} />
        ),
        key: 'keywords-optimization',
        component: (ref, start, end, updateTotalTypeSize) => (
            <KeywordsOptimization
                ref={ref}
                startTime={start}
                endTime={end}
                updateTotalTypeSize={updateTotalTypeSize}
            />
        ),
    },
    {
        tabName: (count) => <TabName name="PAT’s Optimization" count={count} />,
        key: 'pats-optimization',
        component: (ref, start, end, updateTotalTypeSize) => (
            <PATsOptimization
                ref={ref}
                startTime={start}
                endTime={end}
                updateTotalTypeSize={updateTotalTypeSize}
            />
        ),
    },
    {
        tabName: (count) => <TabName name="New Keywords" count={count} />,
        key: 'new-keywords',
        component: (ref, start, end, updateTotalTypeSize) => (
            <NewKeywords
                ref={ref}
                startTime={start}
                endTime={end}
                updateTotalTypeSize={updateTotalTypeSize}
            />
        ),
    },
    {
        tabName: (count) => (
            <TabName name="New Negative Keywords" count={count} />
        ),
        key: 'new-negative-keywords',
        component: (ref, start, end, updateTotalTypeSize) => (
            <NewNegativeKeywords
                ref={ref}
                startTime={start}
                endTime={end}
                updateTotalTypeSize={updateTotalTypeSize}
            />
        ),
    },
    {
        tabName: (count) => <TabName name={"New PAT 's"} count={count} />,
        key: 'new-pats',
        component: (ref, start, end, updateTotalTypeSize) => (
            <NewPats
                ref={ref}
                startTime={start}
                endTime={end}
                updateTotalTypeSize={updateTotalTypeSize}
            />
        ),
    },
    {
        tabName: (count) => <TabName name={"New Negative PAT's"} count={count} />,
        key: 'new-negative-pats',
        component: (ref, start, end, updateTotalTypeSize) => (
            <NewNegativePats
                ref={ref}
                startTime={start}
                endTime={end}
                updateTotalTypeSize={updateTotalTypeSize}
            />
        ),
    },
];

class ReportTable extends Component {
    constructor(props) {
        super(props);

        this.myRef = React.createRef();
        this.state = {
            startDate: null,
            endDate: null,
            updateSize: {
                'keywords-optimization': 0,
                'pats-optimization': 0,
                'new-keywords': 0,
                'new-negative-keywords': 0,
                'new-pats': 0,
                'new-negative-pats': 0,
            },
        };
    }

    updateTotalTypeSize = (key, value) => {
        this.setState(({ updateSize }) => ({
            updateSize: {
                ...updateSize,
                [key]: value,
            },
        }));
    };

    downloadFile = () => {
        axios.get(`${window.BASE_URL}/ppc-report/download-report`);
    };

    timeRange = (startDate, endDate) => {
        this.myRef.current.changeDateRange(startDate, endDate);
        this.setState({
            startDate,
            endDate,
        });
    };

    render() {
        const { startDate, endDate, updateSize } = this.state;

        return (
            <div className="ReportTable">
                <div className="report-table">
                    <h3>Changes Report</h3>
                    <div>
                        <span>
                            Today Changes
                            <span className="total-count">99+</span>
                        </span>
                        <DatePicker timeRange={this.timeRange} />
                        <Buttons onClick={this.downloadFile}>
                            Download
                            <i className="download" />
                        </Buttons>
                    </div>
                </div>
                <Tabs defaultActiveKey={tabsItem[0].key}>
                    {tabsItem.map(({ tabName, key, component }) => (
                        <TabPane tab={tabName(updateSize[key])} key={key}>
                            {component(
                                this.myRef,
                                startDate,
                                endDate,
                                this.updateTotalTypeSize,
                            )}
                        </TabPane>
                    ))}
                </Tabs>
            </div>
        );
    }
}

ReportTable.propTypes = {};

ReportTable.defaultProps = {};

export default ReportTable;
