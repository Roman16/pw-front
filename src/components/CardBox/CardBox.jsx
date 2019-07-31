import React, { Component } from 'react';
import './CardBox.less';
import PropTypes from 'prop-types';

class CardBox extends Component {
    render() {
        const { children } = this.props;

        return (
            <div className="CardBox">
                {children}
            </div>
        );
    }
}

CardBox.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
};
CardBox.defaultProps = {
    children: null,
};

export default CardBox;
