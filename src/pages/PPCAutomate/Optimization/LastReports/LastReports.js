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

const TerminalItem = ({ number = 0, content = '', data }) => (
    <li className="terminal-item">
        <div className="index">{number}</div>
        <div className="content">
            <div
                className={`${data}-render`}
                dangerouslySetInnerHTML={{ __html: content }}
            ></div>
        </div>
    </li>
);

class LastReports extends Component {
    state = { current: 1 };

    onChange = page => {
        this.setState({
            current: page
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

    onShowSizeChange = (current, pageSize) => {
        console.log(current, pageSize);
    };

    render() {
        const { isLess, reports } = this.props;
        // console.log('reports :', reports);
        const isTerminal =
            reports && reports.reports && reports.reports.length > 0;
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
                            {reports.reports.map(({ id, message, number }) => (
                                <TerminalItem
                                    key={id}
                                    content={message}
                                    number={number + 1}
                                />
                            ))}
                            <Pagination
                                // defaultPageSize={1}
                                pageSize={1}
                                total={150}
                                current={this.state.current}
                                onChange={this.onChange}
                                itemRender={this.itemRender}
                                onShowSizeChange={this.onShowSizeChange}
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
