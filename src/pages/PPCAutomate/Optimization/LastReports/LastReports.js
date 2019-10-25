/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Icon, Tooltip, Pagination } from 'antd';

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

const TerminalCaption = ({ isTerminal }) => (
    <div className="terminal-caption">
        <div className="caption">
            Last Changes Terminal
            <Tooltip
                placement="bottom"
                title="In the changes terminal,
                you will see the last changes that the software performs.
                In the changes terminal,
                you will see the last changes that the software performs.
                In the changes terminal,
                you will see the last changes that the software performs.
                In the changes terminal,
                you will see the last changes that the software performs."
            >
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
        records: this.props.reports.reports.filter(
            (report, idx) => idx < 10 && report
        ),
    };

    onChange = page => {
        const { reports } = this.props;
        const pageSize = 10;
        const records = reports.reports.filter(
            (report, idx) =>
                idx < page * pageSize &&
                idx >= page * pageSize - pageSize &&
                report
        );
        this.setState({
            current: page,
            records
        });
    };

    itemRender = (current, type, originalElement) => {
        if (type === 'prev') {
            return <a>Previous</a>;
        }
        if (type === 'next') {
            return <a>Next</a>;
        }
        return originalElement;
    };

    componentDidMount() {
        console.log(this.props)
    }

    render() {
        const { current, records } = this.state;
        const { isLess } = this.props;
        const isTerminal = records && records.length > 0;
        console.log(records);

        return (
            <div className="terminal">
                <TerminalCaption isTerminal={isTerminal} />
                <ul
                    className={`terminal-content ${!isLess ? 'less' : 'more'} ${
                        isTerminal ? 'auto' : 'hidden'
                    }`}
                >
                    {isTerminal ? (
                        <Fragment>
                            {records.map(({ id, message, number }) => (
                                <TerminalItem
                                    key={id}
                                    content={message}
                                    number={number + 1}
                                />
                            ))}
                            <Pagination
                                total={150}
                                current={current}
                                onChange={this.onChange}
                            />
                        </Fragment>
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
                            {dummy.map(({ id }) => (
                                <TerminalItem key={id} number={id} />
                            ))}
                        </div>
                    )}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    reports: state.reports
});

export default connect(mapStateToProps)(LastReports);
