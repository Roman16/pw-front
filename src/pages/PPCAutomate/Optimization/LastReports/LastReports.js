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
  { id: 10 }
];

const textTooltip = () => (
  <div>
    <h3 className="title-tooltip">Last Changes Terminal</h3>
    <p>
      Here you will see the last changes that our software performed. You can
      see all the changes by clicking the «View All» button to the right.
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

  componentDidUpdate(prevProps, prevState) {
    if (this.props.productId !== prevProps.productId) this.getReports();
  }

  onChange = page => {
    const { reports } = this.state;
    const getTerminalContentRef = document.querySelector('.terminal-content');
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
    const getTerminalContentRef = document.querySelector('.terminal-content');
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
              (report.number = pageSize - (pageSize - (counter += 1)))
          )
        });

        getTerminalContentRef.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
  };

  render() {
    const { current, records, reports } = this.state;
    // const qwe = false;
    const isTerminal = records && records.length > 0;

<<<<<<< .merge_file_4mCJUm
=======
    // let heightList = heightTerminal / 14 - 32 / 14 - 1.07143;
    let heightList = heightTerminal - 30 - 42 - 32 - 15;

>>>>>>> .merge_file_14cVIn
    return (
      <div className="terminal">
        <TerminalCaption isTerminal={isTerminal} refCaption="refCaption" />

        <ul
          key={'terminal-list'}
          className={`terminal-content ${isTerminal ? 'auto' : 'hidden'}`}
        >
          {isTerminal ? (
            <Fragment>
              {records.map(({ id, message, number }, index) => (
                <TerminalItem
                  key={`${id}_report_${index}`}
                  content={message}
                  number={number}
                />
              ))}
            </Fragment>
          ) : (
            <div className="terminal-item-dummy">
              <div className="dummy-box">
                <p className="dummy-render">You have no data to display</p>
              </div>
              {dummy.map(({ id }, index) => (
                <TerminalItem key={`${id}_report_${index}`} number={id} />
              ))}
            </div>
          )}
        </ul>
        {isTerminal && (
          <Pagination
            pageSize={10}
            total={reports.length}
            current={current}
            onChange={this.onChange}
          />
        )}
      </div>
    );
  }
}

export default LastReports;
