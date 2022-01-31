import React from 'react';
import Tooltip from '../../Tooltip/Tooltip';
import './TitleInfo.less';

const TitleInfo = ({ title, info, position, type, overlayClassName }) => (
    <span className="title-info">
        {title}
        <Tooltip
            title={title}
            description={info}
            position={position}
            type={type}
            overlayClassName={overlayClassName}
        />
    </span>
);

export default TitleInfo;
