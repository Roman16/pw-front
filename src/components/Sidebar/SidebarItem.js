import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';

const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '/assets/icons/iconfont.js',
});

const ItemIcon = ({ icon, isSub, ...props }) => {
    if (isSub) return null;

    return (
        icon
            ? <IconFont {...props} type={`icon-${icon}`}/>
            : <Icon {...props} type="right-circle" theme="filled"/>
    );
};

ItemIcon.propTypes = {
    icon: PropTypes.string,
    isSub: PropTypes.bool,
};

const logOut = () => {
    delete axios.defaults.headers.common["Authorization"];

    global.localStorage.removeItem(
        'token',
    );
};

const SidebarItem = ({ item, parentLink = '', ...props }) => (
    item.subMenu
        ? (
            <Menu.SubMenu
                {...props}
                className={item.className}
                key={`${item.link}`}
                title={(
                    <span>
                        <ItemIcon icon={item.icon} isSub={!!parentLink}/>
                        <span>{item.title}</span>
                    </span>
                )}
            >
                {
                    item.subMenu.map((subItem) => (
                        <SidebarItem
                            key={item.link + subItem.link}
                            item={subItem}
                            parentLink={parentLink + item.link}
                        />
                    ))
                }
            </Menu.SubMenu>
        )
        : (
            item.className === 'logOut' ?
                <Menu.Item {...props} className={item.className} key={item.link} onClick={logOut}>
                    <Link to={parentLink + item.link}>
                        <ItemIcon icon={item.icon} isSub={!!parentLink}/>
                        <span>{item.title}</span>
                    </Link>
                </Menu.Item>
                :
                <Menu.Item {...props} className={item.className} key={item.link}>
                    <Link to={parentLink + item.link}>
                        <ItemIcon icon={item.icon} isSub={!!parentLink}/>
                        <span>{item.title}</span>
                    </Link>
                </Menu.Item>
        )
);

SidebarItem.propTypes = {
    item: PropTypes.shape({
        link: PropTypes.string,
        icon: PropTypes.string,
        title: PropTypes.string,
        className: PropTypes.string,
        subMenu: PropTypes.arrayOf(PropTypes.shape({
            icon: PropTypes.string,
            link: PropTypes.string,
        })),
    }),
    parentLink: PropTypes.string,
};

export default SidebarItem;
