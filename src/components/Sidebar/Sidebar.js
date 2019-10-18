import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon, Popover } from 'antd';
import { getClassNames } from '../../utils';
import SidebarItem from './SidebarItem';
import RegionsMenu from './RegionsMenu';
import { regionsMenu, menuBottom, menuMain } from './menu';

import './Sidebar.less';

import logo from '../../assets/img/logo.svg';

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [regions] = useState(regionsMenu);
    const toggleCollapsed = () => setCollapsed(!collapsed);
    const className = getClassNames('Sidebar', { SidebarOpen: !collapsed });
    const activeLink = global.location.pathname;
    const activeLinkArr = global.location.pathname.split('/');
    const activeCountry = regions.map(region =>
        region.countries.find(country => country.active)
    )[0];

    const setActiveCountry = country => {
        console.log(country);
    };

    return (
        <div className={className}>
            <div className="sidebar-header">
                <Icon
                    className="sidebar-icon"
                    type="menu"
                    onClick={toggleCollapsed}
                />
                {!collapsed && (
                    <Link to="/" className="sidebar-logo">
                        <img src={logo} alt="logo" />
                    </Link>
                )}
            </div>

            <div className="sidebar-menu">
                <div>
                    <Popover
                        placement="rightTop"
                        overlayClassName="RegionsList"
                        content={
                            <RegionsMenu
                                regions={regions}
                                setActiveCountry={setActiveCountry}
                            />
                        }
                        trigger="click"
                    >
                        <div className="country-active">
                            <div className="country-active__title">
                                <img
                                    src={`/assets/img/${activeCountry.flag}`}
                                    alt="active-country"
                                />
                                <h5>{activeCountry.name}</h5>
                            </div>
                            <div className="country-active__description">
                                {activeCountry.description}
                            </div>
                        </div>
                    </Popover>

                    <Menu
                        mode="inline"
                        theme="dark"
                        inlineCollapsed={collapsed}
                        defaultSelectedKeys={[activeLink]}
                        defaultOpenKeys={[`/${activeLinkArr[1]}`]}
                    >
                        {menuMain.map(item => (
                            <SidebarItem key={item.link} item={item} />
                        ))}
                    </Menu>
                </div>

                <div>
                    <Menu
                        mode="inline"
                        theme="dark"
                        inlineCollapsed={collapsed}
                        defaultSelectedKeys={[activeLink]}
                    >
                        {menuBottom.map(item => (
                            <SidebarItem key={item.icon} item={item} />
                        ))}
                    </Menu>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
