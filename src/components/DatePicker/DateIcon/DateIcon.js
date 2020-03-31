import React from 'react';

import './DateIcon.less';
import {SVG} from "../../../utils/icons";

const DateIcon = () => (
    <i className="DateIcon">
        <SVG id='calendar'/>
    </i>
);

DateIcon.propTypes = {};

DateIcon.defaultProps = {};

export default DateIcon;
