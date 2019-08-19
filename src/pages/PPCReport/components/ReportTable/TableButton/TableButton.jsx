import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../../../../../components/Buttons';
import './TableButton.less';

class TableButton extends Component {
    render() {
        const { children, active, onClick } = this.props;

        return (
            <div className={`TableButton ${active ? 'active' : ''}`}>
                <Button onClick={onClick}>
                    {children}
                    <span className="count"> 4</span>
                </Button>
            </div>
        );
    }
}

TableButton.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
    active: PropTypes.bool,
    onClick: PropTypes.func,
};
TableButton.defaultProps = {
    children: null,
    active: false,
    onClick: () => {
    },
};
export default TableButton;
