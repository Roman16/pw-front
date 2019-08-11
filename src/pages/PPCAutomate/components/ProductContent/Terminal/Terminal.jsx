import React, { Component } from 'react';
import { Icon, Tooltip } from 'antd';
import Button from '../../../../../components/Buttons';
import Pagination from '../../../../../components/Pagination';

import './Terminal.less';

const terminalMock = [
    {
        id: 1,
        text: `Mistake: Bad-performing keywords.'
        ' Keyword 'keyword text' in ad group '
         ''adGroupName' in campaign 'campaign name' '
        'should be paused because it has 15 clicks without single sale compared to target clicks 10 `,
    }, {
        id: 2,
        text: `Mistake: Bad-performing keywords.
         Manual PAT for ASIN 'B0ASINASIN' in ad group 
         'adGroupName' in campaign 'campaign name' should be
          paused because it has 20 clicks without single sale
           compared to target clicks 10 (calculated based on
            your average conversion rate for the product: 10%).`,
    }, {
        id: 3,
        text: `Mistake: Bad-performing keywords.'
        ' Keyword 'keyword text' in ad group '
         ''adGroupName' in campaign 'campaign name' '
        'should be paused because it has 15 clicks without single sale compared to target clicks 10 `,
    }, {
        id: 4,
        text: `Mistake: Bad-performing keywords.'
        ' Keyword 'keyword text' in ad group '
         ''adGroupName' in campaign 'campaign name' '
        'should be paused because it has 15 clicks without single sale compared to target clicks 10 `,
    }, {
        id: 5,
        text: `Mistake: Bad-performing keywords.'
        ' Keyword 'keyword text' in ad group '
         ''adGroupName' in campaign 'campaign name' '
        'should be paused because it has 15 clicks without single sale compared to target clicks 10 `,
    }, {
        id: 6,
        text: `Mistake: Bad-performing keywords.'
        ' Keyword 'keyword text' in ad group '
         ''adGroupName' in campaign 'campaign name' '
        'should be paused because it has 15 clicks without single sale compared to target clicks 10 `,
    }, {
        id: 7,
        text: `Mistake: Bad-performing keywords.'
        ' Keyword 'keyword text' in ad group '
         ''adGroupName' in campaign 'campaign name' '
        'should be paused because it has 15 clicks without single sale compared to target clicks 10 `,
    }, {
        id: 8,
        text: `Mistake: Bad-performing keywords.'
        ' Keyword 'keyword text' in ad group '
         ''adGroupName' in campaign 'campaign name' '
        'should be paused because it has 15 clicks without single sale compared to target clicks 10 `,
    }, {
        id: 9,
        text: `Mistake: Bad-performing keywords.'
        ' Keyword 'keyword text' in ad group '
         ''adGroupName' in campaign 'campaign name' '
        'should be paused because it has 15 clicks without single sale compared to target clicks 10 `,
    },
];

const TerminalCaption = () => (
    <div className="TerminalCaption">
        <div className="caption">
            Last Changes Terminal
            <Tooltip
                placement="bottom"
                title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            >

                <Icon type="info-circle" theme="filled" />
            </Tooltip>
        </div>
        <div>
            <Button>View All</Button>
        </div>
    </div>
);
const TerminalItem = ({ index = 0, content = '' }) => (
    <div className="TerminalItem">
        <div className="index">
            {index}
        </div>
        <div className="content">
            <div className="html-render">
                {content}
            </div>
        </div>
    </div>
);

class Terminal extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }


    render() {
        const { isLess } = this.props;


        return (
            <div className="Terminal">
                <TerminalCaption />
                <div className={`terminal-content ${!isLess ? 'less' : 'more'}`}>
                    {terminalMock.map(({ id, text }, index) => (
                        <TerminalItem key={id} content={text} index={index} />
                    ))}


                </div>
                <Pagination />
            </div>
        );
    }
}

Terminal.propTypes = {};

Terminal.defaultProps = {};

export default Terminal;
