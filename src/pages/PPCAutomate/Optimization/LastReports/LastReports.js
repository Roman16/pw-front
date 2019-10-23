import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Icon, Tooltip, Pagination} from 'antd';

import './LastReports.less';

export const terminalMock = [
    {
        id: 1,
        number: 1,
        message: `Mistake: Bad-performing keywords.'
        ' Keyword 'keyword text' in ad group '
         ''adGroupName' in campaign 'campaign name' '
        'should be paused because it has 15 clicks without single sale compared to target clicks 10 `
    },
    {
        id: 2,
        number: 2,
        message: `Mistake: Bad-performing keywords.
         Manual PAT for ASIN 'B0ASINASIN' in ad group
         'adGroupName' in campaign 'campaign name' should be
          paused because it has 20 clicks without single sale
           compared to target clicks 10 (calculated based on
            your average conversion rate for the product: 10%).`
    },
    {
        id: 3,
        number: 3,
        message: `Mistake: Bad-performing keywords.'
        ' Keyword 'keyword text' in ad group '
         ''adGroupName' in campaign 'campaign name' '
        'should be paused because it has 15 clicks without single sale compared to target clicks 10 `
    },
    {
        id: 4,
        number: 4,
        message: `Mistake: Bad-performing keywords.'
        ' Keyword 'keyword text' in ad group '
         ''adGroupName' in campaign 'campaign name' '
        'should be paused because it has 15 clicks without single sale compared to target clicks 10 `
    },
    {
        id: 5,
        number: 5,
        message: `Mistake: Bad-performing keywords.'
        ' Keyword 'keyword text' in ad group '
         ''adGroupName' in campaign 'campaign name' '
        'should be paused because it has 15 clicks without single sale compared to target clicks 10 `
    },
    {
        id: 6,
        number: 6,
        message: `Mistake: Bad-performing keywords.'
        ' Keyword 'keyword text' in ad group '
         ''adGroupName' in campaign 'campaign name' '
        'should be paused because it has 15 clicks without single sale compared to target clicks 10 `
    },
    {
        id: 7,
        number: 7,
        message: `Mistake: <b>Bad-performing keywords.</b>'
        ' Keyword 'keyword text' in ad group '
         ''adGroupName' in campaign 'campaign name' '
        'should be paused because it has 15 clicks without single sale compared to target clicks 10 `
    },
    {
        id: 8,
        number: 8,
        message: `Mistake: Bad-performing keywords.'
        ' Keyword 'keyword text' in ad group '
         ''adGroupName' in campaign 'campaign name' '
        'should be paused because it has 15 clicks without single sale compared to target clicks 10 `
    },
    {
        id: 9,
        number: 9,
        message: `Mistake: Bad-performing keywords.'
        ' Keyword 'keyword text' in ad group '
         ''adGroupName' in campaign 'campaign name' '
        'should be paused because it has 15 clicks without single sale compared to target clicks 10 `
    }
];

const dummy = [
    {id: 1},
    {id: 2},
    {id: 3},
    {id: 4},
    {id: 5},
    {id: 6},
    {id: 7},
    {id: 8},
    {id: 9},
    {id: 10},
    {id: 11}
    // { id: 12 }
];

const lastChanges = [];

const TerminalCaption = ({isTerminal}) => (
    <div className="terminal-caption">
        <div className="caption">
            Last Changes Terminal
            <Tooltip
                placement="bottom"
                title="In the changes terminal, you will see the last changes that the software performs."
            >
                <Icon type="info-circle" theme="filled"/>
            </Tooltip>
        </div>

        <Link
            to="/ppc/report"
            className={`link-redirect ${isTerminal ? 'active' : 'disabled'}`}
        >
            View All
        </Link>
    </div>
);

const TerminalItem = ({number = 0, content = '', data}) => (
    <div className="terminal-item">
        <div className="index">{number}</div>
        <div className="content">
            <div
                className={`${data}-render`}
                dangerouslySetInnerHTML={{__html: content}}
            ></div>
        </div>
    </div>
);

class LastReports extends Component {
    state = {};

    render() {
        const {isLess} = this.props;
        const isTerminal = terminalMock.length !== 0;

        return (
            <div className="terminal">
                <TerminalCaption isTerminal={isTerminal}/>
                <div
                    className={`terminal-content ${!isLess ? 'less' : 'more'} ${
                        isTerminal ? 'auto' : 'hidden'
                    }`}
                >
                    {isTerminal ? (
                        <>
                            {terminalMock.map(({id, message, number}) => (
                                <TerminalItem
                                    key={id}
                                    content={message}
                                    number={number}
                                />
                            ))}
                            <Pagination defaultCurrent={1} total={50}/>
                        </>
                    ) : (
                        <div className="terminal-item-dummy">
                            <div
                                className={`dummy-box ${
                                    isLess ? 'auto' : 'hidden'
                                }`}
                            >
                                <p className="dummy-render">
                                    You have not data to display
                                </p>
                            </div>
                            {dummy.map(({id, text}) => (
                                <TerminalItem
                                    key={id}
                                    number={id}
                                    content={text}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

LastReports.propTypes = {};

LastReports.defaultProps = {};

export default LastReports;
