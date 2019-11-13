import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';

const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '/assets/icons/iconfont.js'
});

const ItemIcon = ({ icon, isSub, ...props }) => {
    if (isSub) return null;

    return icon ? (
        <IconFont {...props} type={`icon-${icon}`} />
    ) : (
        <Icon {...props} type="right-circle" theme="filled" />
    );
};

ItemIcon.propTypes = {
    icon: PropTypes.string,
    isSub: PropTypes.bool
};

export default ItemIcon;
