import React from 'react';
import Tooltip from '../../Tooltip/Tooltip';
import './TitleInfo.less';

const TitleInfo = ({ title, info, position, type }) => (
    <span className="title-info">
        {title}
        <Tooltip
            title={title}
            description={info}
            position={position}
            type={type}
        />
    </span>
);

export default TitleInfo;
