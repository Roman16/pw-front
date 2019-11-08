import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Tooltip, Pagination } from 'antd';
import shortid from 'shortid';

import { reportsServices } from '../../../../services/reports.services';
import './LastReports.less';

const dummy = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
    { id: 9 },
    { id: 10 },
    { id: 11 },
    { id: 12 }
];

const textTooltip = () => (
    <div>
        <h3 className="title-tooltip">Last Changes Terminal</h3>
        <p>
            Here you will see the last changes that our software performed. You
            can see all the changes by clicking the «View All» button to the
            right.
        </p>
    </div>
);

const TerminalCaption = ({ isTerminal }) => (
    <div className="terminal-caption">
        <div className="caption">
            Last Changes Terminal
            <Tooltip placement="bottom" title={textTooltip}>
                <Icon type="info-circle" theme="filled" />
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

const TerminalItem = ({ number = 0, content = '' }) => (
    <li className="terminal-item">
        <div className="index">{number}</div>
        <div className="content">
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
        </div>
    </li>
);

class LastReports extends Component {
    state = {
        current: 1,
        reports: [],
        records: []
    };

    componentDidMount() {
        this.getReports();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.productId !== prevProps.productId) this.getReports();
    }

    onChange = page => {
        const { reports } = this.state;
        const getTerminalContentRef = document.querySelector(
            '.terminal-content'
        );
        const pageSize = 10;
        let counter = 0;
        const records = reports.filter(
            (report, idx) =>
                idx < page * pageSize &&
                idx >= page * pageSize - pageSize &&
                (report.number = page * pageSize - (pageSize - (counter += 1)))
        );
        this.setState({
            current: page,
            records
        });

        getTerminalContentRef.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    getReports = () => {
        const getTerminalContentRef = document.querySelector(
            '.terminal-content'
        );
        this.props.productId &&
            reportsServices.getLastReports(this.props.productId).then(res => {
                const data = res.length > 0 ? res.slice(0, 150) : [];
                const pageSize = 10;
                let counter = 0;
                this.setState({
                    current: 1,
                    reports: data,
                    records: data.filter(
                        (report, idx) =>
                            idx < pageSize &&
                            (report.number =
                                pageSize - (pageSize - (counter += 1)))
                    )
                });

                getTerminalContentRef.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
    };

    render() {
        const { current, records } = this.state;
        const { isLess } = this.props;
        // const qwe = false;
        const isTerminal = records && records.length > 0;

        return (
            <div className="terminal">
                <TerminalCaption isTerminal={isTerminal} />
                <ul
                    key={shortid.generate()}
                    className={`terminal-content ${isLess ? 'more' : 'less'} ${
                        isTerminal ? 'auto' : 'hidden'
                    }`}
                >
                    {isTerminal ? (
                        <Fragment>
                            {records.map(({ id, message, number }) => (
                                <TerminalItem
                                    key={id}
                                    content={message}
                                    number={number}
                                />
                            ))}
                        </Fragment>
                    ) : (
                        <div className="terminal-item-dummy">
                            <div
                                className={`dummy-box ${
                                    isLess ? 'more' : 'less'
                                }`}
                            >
                                <p className="dummy-render">
                                    You have no data to display
                                </p>
                            </div>
                            {dummy.map(({ id }) => (
                                <TerminalItem key={id} number={id} />
                            ))}
                        </div>
                    )}
                </ul>
                {isTerminal && (
                    <Pagination
                        total={150}
                        current={current}
                        onChange={this.onChange}
                    />
                )}
            </div>
        );
    }
}

export default LastReports;
