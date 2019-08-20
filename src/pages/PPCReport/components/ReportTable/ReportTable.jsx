import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import moment from 'moment';
import { DateRange } from 'react-date-range';

import 'react-datepicker/dist/react-datepicker.css';

import KeywordsOptimization from './Tables/KeywordsOptimization';
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


function onChange(date, dateString) {
    console.log(date, dateString);
}

function handleChange(date, dateString) {
    console.log(date, dateString);
}

class ReportTable extends Component {
    constructor(props) {
        super(props);
        const start = moment(new Date(2016, 8, 20, 0, 0, 0, 0));
        const end = moment(start)
            .add(5, 'days')
            .subtract(1, 'minute');

        this.state = {
            start,
            end,
        };
    }


    render() {
        const { start, end } = this.state;

        return (
            <div className="ReportTable">

                {/*<DateTimeRangeContainer*/}
                {/*    local={{*/}
                {/*        format: 'DD-MM-YYYY',*/}
                {/*        sundayFirst: false,*/}
                {/*    }}*/}
                {/*    start={start}*/}
                {/*    end={end}*/}
                {/*    ranges={{*/}
                {/*        Today: [moment(new Date()).add(-1, 'days'), moment()],*/}
                {/*        Yesterday: [moment(new Date()).add(-1, 'days'), moment()],*/}
                {/*        'Last 14 Days': [moment(new Date()).add(-14, 'days'), moment()],*/}
                {/*        'Last 30 Days': [moment(new Date()).add(-30, 'days'), moment()],*/}
                {/*        'Year to date': [moment(new Date()).add(-365, 'days'), moment()],*/}
                {/*    }}*/}
                {/*    applyCallback={handleChange}*/}
                {/*    smartMode*/}
                {/*>*/}
                {/*    <input*/}
                {/*        id="formControlsTextB"*/}
                {/*        type="text"*/}
                {/*        label="Text"*/}
                {/*        placeholder="Enter text"*/}
                {/*    />*/}
                {/*</DateTimeRangeContainer>*/}

                <DateRange
                    ranges={{
                        selection1: {
                            startDate: addDays(new Date(), 1),
                            endDate: null,
                            key: 'selection1',
                        },
                        selection2: {
                            startDate: addDays(new Date(), 4),
                            endDate: addDays(new Date(), 8),
                            key: 'selection2',
                        },
                        selection3: {
                            startDate: addDays(new Date(), 8),
                            endDate: addDays(new Date(), 10),
                            key: 'selection3',
                            showDateDisplay: false,
                            autoFocus: false,
                        },
                    }}
                    onChange={handleChange}
                />
                {/* <RangePicker */}
                {/*    onChange={onChange} */}
                {/*    style={{ */}
                {/*        width: '100%', */}
                {/*    }} */}
                {/*    ranges={{ */}
                {/*        Today: [moment(new Date()).add(-1, 'days'), moment()], */}
                {/*        Yesterday: [moment(new Date()).add(-1, 'days'), moment()], */}
                {/*        'Last 14 Days': [moment(new Date()).add(-14, 'days'), moment()], */}
                {/*        'Last 30 Days': [moment(new Date()).add(-30, 'days'), moment()], */}
                {/*        'Year to date': [moment(new Date()).add(-365, 'days'), moment()], */}
                {/*    }} */}
                {/* /> */}

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
