import React, { Component } from 'react';
import { Checkbox as AntCheckbox } from 'antd';

import './Checkbox.less';

class Checkbox extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }


    render() {
        return (
            <div className="Checkbox">
                <AntCheckbox {...this.props} />
            </div>
        );
    }
}

Checkbox.propTypes = {};

Checkbox.defaultProps = {};

export default Checkbox;
