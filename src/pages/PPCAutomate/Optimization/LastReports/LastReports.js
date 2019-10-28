import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Icon, Tooltip, Pagination} from 'antd';
import {reportsServices} from '../../../../services/reports.services';
import './LastReports.less';

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
    {id: 11},
    {id: 12}
];

const TerminalCaption = ({isTerminal, productId}) => (
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
                <Icon type="info-circle" theme="filled"/>
            </Tooltip>
        </div>

        <Link
            to={`/ppc/report?id=${productId}`}
            className={`link-redirect ${isTerminal ? 'active' : 'disabled'}`}
        >
            View All
        </Link>
    </div>
);

const TerminalItem = ({number = 0, content = ''}) => (
    <li className="terminal-item">
        <div className="index">{number}</div>
        <div className="content">
            <div dangerouslySetInnerHTML={{__html: content}}></div>
        </div>
    </li>
);

class LastReports extends Component {
    state = {
        current: 1,
        reports: [],
        records: []
    };

    onChange = page => {
        const {reports} = this.state;
        const pageSize = 10;
        const records = reports.filter(
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

    getReports = () => {
        this.props.productId && reportsServices.getLastReports(this.props.productId)
            .then(res => {
                this.setState({
                    reports: res,
                    records: res.length > 0 ? res.slice(0, 10) : []
                })
            })
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.productId !== prevProps.productId) this.getReports()
    }

    componentDidMount() {
        this.getReports()
    }

    render() {
        const {current, records} = this.state;
        const {isLess, productId} = this.props;
        const isTerminal = records && records.length > 0;

        return (
            <div className="terminal">
                <TerminalCaption isTerminal={isTerminal} productId={productId}/>
                <ul
                    className={`terminal-content ${!isLess ? 'less' : 'more'} ${
                        isTerminal ? 'auto' : 'hidden'
                    }`}
                >
                    {isTerminal ? (
                        <Fragment>
                            {records.map(({id, message, number}) => (
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
                            {dummy.map(({id}) => (
                                <TerminalItem key={id} number={id}/>
                            ))}
                        </div>
                    )}
                </ul>
            </div>
        );
    }
}

export default LastReports;
