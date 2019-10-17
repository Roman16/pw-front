import React, {Component} from 'react';
import {Icon, Tooltip, Button, Pagination} from 'antd';

import './LastReports.less';

export const terminalMock = [
    {
        id: 1,
        message: `Mistake: Bad-performing keywords.'
        ' Keyword 'keyword text' in ad group '
         ''adGroupName' in campaign 'campaign name' '
        'should be paused because it has 15 clicks without single sale compared to target clicks 10 `,
    },
    {
        id: 2,
        message: `Mistake: Bad-performing keywords.
         Manual PAT for ASIN 'B0ASINASIN' in ad group
         'adGroupName' in campaign 'campaign name' should be
          paused because it has 20 clicks without single sale
           compared to target clicks 10 (calculated based on
            your average conversion rate for the product: 10%).`,
    },
    {
        id: 3,
        message: `Mistake: Bad-performing keywords.'
        ' Keyword 'keyword text' in ad group '
         ''adGroupName' in campaign 'campaign name' '
        'should be paused because it has 15 clicks without single sale compared to target clicks 10 `,
    },
    {
        id: 4,
        message: `Mistake: Bad-performing keywords.'
        ' Keyword 'keyword text' in ad group '
         ''adGroupName' in campaign 'campaign name' '
        'should be paused because it has 15 clicks without single sale compared to target clicks 10 `,
    },
    {
        id: 5,
        message: `Mistake: Bad-performing keywords.'
        ' Keyword 'keyword text' in ad group '
         ''adGroupName' in campaign 'campaign name' '
        'should be paused because it has 15 clicks without single sale compared to target clicks 10 `,
    },
    {
        id: 6,
        message: `Mistake: Bad-performing keywords.'
        ' Keyword 'keyword text' in ad group '
         ''adGroupName' in campaign 'campaign name' '
        'should be paused because it has 15 clicks without single sale compared to target clicks 10 `,
    },
    {
        id: 7,
        message: `Mistake: Bad-performing keywords.'
        ' Keyword 'keyword text' in ad group '
         ''adGroupName' in campaign 'campaign name' '
        'should be paused because it has 15 clicks without single sale compared to target clicks 10 `,
    },
    {
        id: 8,
        message: `Mistake: Bad-performing keywords.'
        ' Keyword 'keyword text' in ad group '
         ''adGroupName' in campaign 'campaign name' '
        'should be paused because it has 15 clicks without single sale compared to target clicks 10 `,
    },
    {
        id: 9,
        message: `Mistake: Bad-performing keywords.'
        ' Keyword 'keyword text' in ad group '
         ''adGroupName' in campaign 'campaign name' '
        'should be paused because it has 15 clicks without single sale compared to target clicks 10 `,
    },
];

const TerminalCaption = () => (
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

        <div>
            <Button>View All</Button>
        </div>
    </div>
);

const TerminalItem = ({index = 0, content = ''}) => (
    <div className="terminal-item">
        <div className="index">{index}</div>
        <div className="content">
            <div className="html-render">{content}</div>
        </div>
    </div>
);

class LastReports extends Component {

    state = {};

    render() {
        const {isLess, lastChanges} = this.props;

        return (
            <div className="terminal">
                <TerminalCaption/>

                <div className={`terminal-content ${!isLess ? 'less' : 'more'}`}>
                    {terminalMock.map(({id, message, number, }) => (
                        <TerminalItem key={id} content={message} index={id}/>
                    ))}
                </div>

                <Pagination/>
            </div>
        );
    }
}

LastReports.propTypes = {};

LastReports.defaultProps = {};

export default LastReports;
