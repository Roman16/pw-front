import React from 'react';
import { Menu, Icon } from 'antd';
import {Link} from "react-router-dom";

const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '/assets/icons/iconfont.js',
});

const ItemIcon = ({ icon, isSub, ...props }) => {
    if (isSub) return null;

    return (
        icon
            ? <IconFont {...props} type={`icon-${icon}`} />
            : <Icon {...props} type="right-circle" theme="filled" />
    );
};

const SidebarItem = ({ item, parentLink = '', ...props }) => (
    item.subMenu
        ? (
            <Menu.SubMenu
                {...props}
                className={item.className}
                key={`sub-${item.link}`}
                title={(
                    <span>
                        <ItemIcon icon={item.icon} isSub={!!parentLink} />
                        <span>{item.title}</span>
                    </span>
                )}
            >
                {
                    item.subMenu.map((subItem) => (
                        <SidebarItem
                            item={subItem}
                            parentLink={parentLink + item.link}
                        />
                    ))
                }
            </Menu.SubMenu>
        )
        : (
            <Menu.Item {...props} className={item.className} key={item.link}>
                <Link to={parentLink + item.link}>
                    <ItemIcon icon={item.icon} isSub={!!parentLink} />
                    <span>{item.title}</span>
                </Link>
            </Menu.Item>
        )
);

export default SidebarItem;
