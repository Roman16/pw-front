import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';

import KeywordsOptimization from './Tables/KeywordsOptimization';
import PATsOptimization from './Tables/PATsOptimization';
import NewKeywords from './Tables/NewKeywords';
import NewNegativeKeywords from './Tables/NewNegativeKeywords';
import NewPats from './Tables/NewPats';
import NewNegativePats from './Tables/NewNegativePats';
import './ReportTable.less';

const { TabPane } = Tabs;

const tabsItem = [
    {
        tabName: 'KeywordsOptimization',
        key: 'KeywordsOptimization',
        component: <KeywordsOptimization />,
    }, {
        tabName: 'PATsOptimization',
        key: 'PATsOptimization',
        component: <PATsOptimization />,
    }, {
        tabName: 'NewKeywords',
        key: 'NewKeywords',
        component: <NewKeywords />,
    }, {
        tabName: 'NewNegativeKeywords',
        key: 'NewNegativeKeywords',
        component: <NewNegativeKeywords />,
    }, {
        tabName: 'NewPats',
        key: 'NewPats',
        component: <NewPats />,
    }, {
        tabName: 'NewNegativePats',
        key: 'NewNegativePats',
        component: <NewNegativePats />,
    },
];

class ReportTable extends Component {
    render() {
        return (
            <div className="ReportTable">
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
