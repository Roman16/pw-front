import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Checkbox as AntCheckbox } from 'antd';

import './Checkbox.less';

class Checkbox extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }


    render() {
        const { readOnly, isRound } = this.props;


        return (
            <div
                className={`Checkbox ${readOnly ? 'read-only' : ''} ${isRound ? 'round-checkbox' : ''}`}
            >
                <AntCheckbox {...this.props} />
            </div>
        );
    }
}

Checkbox.propTypes = {
    readOnly: propTypes.bool,
    isRound: propTypes.bool,
};

Checkbox.defaultProps = {
    readOnly: false,
    isRound: false,
};

export default Checkbox;
