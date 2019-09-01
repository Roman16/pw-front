import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Icon } from 'antd';
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
        <div className="tab-name-count">{count}</div>
    </div>
);

const tabsItem = [
    {
        tabName: <TabName name="Keywords Optimization" count={8} />,
        key: 'KeywordsOptimization',
        component: (ref, start, end) => (
            <KeywordsOptimization
                ref={ref}
                startTime={start}
                endTime={end}

            />
        ),
    },
    {
        tabName: <TabName name="PAT’s Optimization" count={8} />,
        key: 'PATsOptimization',
        component: (ref, start, end) => (
            <PATsOptimization
                ref={ref}
                startTime={start}
                endTime={end}

            />
        ),
    }, {
        tabName: <TabName name="New Keywords" count={8} />,
        key: 'NewKeywords',
        component: (ref, start, end) => (
            <NewKeywords
                ref={ref}
                startTime={start}
                endTime={end}

            />
        ),
    }, {
        tabName: <TabName name="New Negative Keywords" count={8} />,
        key: 'NewNegativeKeywords',
        component: (ref, start, end) => (
            <NewNegativeKeywords
                ref={ref}
                startTime={start}
                endTime={end}

            />
        ),
    }, {
        tabName: <TabName
            name={'New PAT \'s'}
            count={8}
        />,
        key: 'NewPats',
        component: (ref, start, end) => (
            <NewPats
                ref={ref}
                startTime={start}
                endTime={end}

            />
        ),
    }, {
        tabName: <TabName
            name={'New Negative PAT\'s'}
            count={8}
        />,
        key: 'NewNegativePats',
        component: (ref, start, end) => (
            <NewNegativePats
                ref={ref}
                startTime={start}
                endTime={end}

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
        };
    }

    downloadFile = () => {
        // https://front1.profitwhales.com/ppc-automation/save-parameters?product_id=244&optimize_keywords=1&optimization_strategy=SlowPPCLaunch&status=RUNNING
        axios.get(`${window.BASE_URL}/download-report`).then((res) => {
            console.log(res);
        });
    };

    timeRange = (startDate, endDate) => {
        this.myRef.current.changeDateRange(startDate, endDate);
        this.setState({
            startDate,
            endDate,
        });
    };

    render() {
        const { startDate, endDate } = this.state;


        return (
            <div className="ReportTable">
                <div className="report-table">
                    <h3>
                        Changes Report
                    </h3>
                    <div>
                        <span>
                            Today Changes
                            <span className="total-count">99+</span>
                        </span>
                        <DatePicker timeRange={this.timeRange} />
                        <Buttons onClick={this.downloadFile}>
                            Download
                            <Icon type="cloud-download" />
                        </Buttons>
                    </div>
                </div>
                <Tabs defaultActiveKey={tabsItem[0].key}>
                    {tabsItem.map(({ tabName, key, component }) => (
                        <TabPane tab={tabName} key={key}>
                            {component(this.myRef, startDate, endDate)}
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
