import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Tooltip, Pagination } from 'antd';
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
    constructor(props) {
        super(props);
        this.state = {
            current: 1,
            reports: [],
            records: []
        };
        this.getTerminalContentRef = React.createRef();
    }

    componentWillUnmount() {
        this.getTerminalContentRef = null;
    }

    componentDidMount() {
        this.getReports();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.productId !== prevProps.productId) this.getReports();
    }

    onChange = page => {
        const { reports } = this.state;
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

        this.getTerminalContentRef.current.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    getReports = () => {
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

                this.getTerminalContentRef.current.scrollTo({
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
                {/* <div> */}
                <ul
                    className={`terminal-content ${!isLess ? 'less' : 'more'} ${
                        isTerminal ? 'auto' : 'hidden'
                    }`}
                    ref={this.getTerminalContentRef}
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
                {/* </div> */}
            </div>
        );
    }
}

export default LastReports;
