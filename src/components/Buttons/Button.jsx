import React, { Component } from 'react';
import { Button as AntButton } from 'antd';
import PropTypes from 'prop-types';

class Button extends Component {
    render() {
        const { children } = this.props;

        return (
            <AntButton
                {...this.props}
            >
                {children}
            </AntButton>
        );
    }
}

Button.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
};
Button.defaultProps = {
    children: null,
};
export default Button;
