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
        const { readOnly } = this.props;


        return (
            <div className={`Checkbox ${readOnly ? 'read-only' : ''}`}>
                <AntCheckbox {...this.props} />
            </div>
        );
    }
}

Checkbox.propTypes = {
    readOnly: propTypes.bool,
};

Checkbox.defaultProps = {
    readOnly: false,
};

export default Checkbox;
