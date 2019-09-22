import React, { useState } from 'react';
import { Menu, Icon, Button } from 'antd';
import { getClassNames } from '../../utils';
import SidebarItem from './SidebarItem';
import { menuBottom, menuMain } from './menu';

import './Sidebar.less';

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = () => setCollapsed(!collapsed);
    const className = getClassNames('Sidebar', { SidebarOpen: !collapsed });

    return (
        <div className={className}>
            <div className="SidebarHeader">
                <Icon className="SidebarIcon" type="menu" onClick={toggleCollapsed} />
                {
                    !collapsed && (
                        <div className="SidebarLogo">
                            <img src="/logo.svg" alt="logo" />
                        </div>
                    )
                }
            </div>
            <div className="SidebarMenu">
                <div className="MenuTop">
                    <Menu
                        mode="inline"
                        theme="dark"
                        inlineCollapsed={collapsed}
                    >
                        { menuMain.map((item) => <SidebarItem item={item} />) }
                    </Menu>
                </div>
                <div className="MenuBottom">
                    <Menu
                        mode="inline"
                        theme="dark"
                        inlineCollapsed={collapsed}
                    >
                        { menuBottom.map((item) => <SidebarItem item={item} />) }
                    </Menu>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
