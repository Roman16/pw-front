import React from "react";
import {DatePicker as AntDatePicker} from 'antd';

import './DatePicker.less';
import {SVG} from "../../utils/icons";

const DatePicker = (props) => {

    return (<AntDatePicker
        {...props}
        suffixIcon={<SVG id={'select-icon'} />}

    />)

};

export default DatePicker;