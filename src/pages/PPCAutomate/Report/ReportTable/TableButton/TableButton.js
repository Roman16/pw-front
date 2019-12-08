import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import './TableButton.less';

class TableButton extends Component {
    render() {
        const { children, active, onClick, count } = this.props;
        console.log(count);
        return (
            <div className={`TableButton ${active ? 'active' : ''}`}>
                <Button onClick={onClick}>
                    {children}

                    {count > 0 && <div className="tab-name-count">{count > 999 ? '999+' : count}</div>}
                </Button>
            </div>
        );
    }
}

TableButton.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    active: PropTypes.bool,
    onClick: PropTypes.func,
    count: PropTypes.number
};
TableButton.defaultProps = {
    children: null,
    count: null,
    active: false,
    onClick: () => {}
};
export default TableButton;
