import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Badge } from 'antd';
import './TableButton.less';

class TableButton extends Component {
    render() {
        const { children, active, onClick, count } = this.props;

        return (
            <div className={`TableButton ${active ? 'active' : ''}`}>
                <Button onClick={onClick}>
                    {children}

                    <Badge count={count.totalCount > 0 ? count.totalCount : 0}
                           overflowCount={999} />
                    {/*{count && <span className="count">{count}</span>}*/}
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
