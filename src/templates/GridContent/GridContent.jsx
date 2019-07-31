import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './GridContent.less';

class GridContent extends Component {
    render() {
        const { children } = this.props;

        return (
            <div className="GridContent">
                {children}
            </div>
        );
    }
}


GridContent.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
};
GridContent.defaultProps = {
    children: null,
};

export default GridContent;
