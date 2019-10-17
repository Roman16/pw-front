import React from 'react';
import { Icon, Tooltip } from 'antd';

import './TitleInfo.less';

const TitleInfo = ({ title, info }) => (
    <span className="title-info">
        {title}
        <Tooltip title={info || title}>
            <Icon type="info-circle" theme="filled" />
        </Tooltip>
    </span>
);


export default TitleInfo;
