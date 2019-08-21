import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';


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
        component: <KeywordsOptimization />,
    }, {
        tabName: <TabName name="PAT’s Optimization" count={8} />,
        key: 'PATsOptimization',
        component: <PATsOptimization />,
    }, {
        tabName: <TabName name="New Keywords" count={8} />,
        key: 'NewKeywords',
        component: <NewKeywords />,
    }, {
        tabName: <TabName name="New Negative Keywords" count={8} />,
        key: 'NewNegativeKeywords',
        component: <NewNegativeKeywords />,
    }, {
        tabName: <TabName
            name={'New PAT \'s'}
            count={8}
        />,
        key: 'NewPats',
        component: <NewPats />,
    }, {
        tabName: <TabName
            name={'New Negative PAT\'s'}
            count={8}
        />,
        key: 'NewNegativePats',
        component: <NewNegativePats />,
    },
];


class ReportTable extends Component {
    render() {
        return (
            <div className="ReportTable">

                <DatePicker />
                <Tabs defaultActiveKey={tabsItem[0].key}>
                    {tabsItem.map(({ tabName, key, component }) => (
                        <TabPane tab={tabName} key={key}>
                            {component}
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
