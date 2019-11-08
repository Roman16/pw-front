import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Menu, Icon, Popover } from 'antd';

import SidebarItem from './SidebarItem';
import RegionsMenu from './RegionsMenu';
import { regionsMenu, menuBottom, menuMain } from './menu';
import { getClassNames } from '../../utils';
import { userActions } from '../../actions/user.actions';
import './Sidebar.less';

import logo from '../../assets/img/logo.svg';

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }

    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

const Sidebar = () => {
  const [width, height] = useWindowSize();
  const [collapsed, setCollapsed] = useState(false),
    [regions] = useState(regionsMenu),
    dispatch = useDispatch(),
    { user } = useSelector(state => ({
      user: state.user
    })),
    toggleCollapsed = () => setCollapsed(!collapsed),
    className = getClassNames('Sidebar', { SidebarOpen: !collapsed }),
    activeLink = global.location.pathname,
    activeLinkArr = global.location.pathname.split('/'),
    activeCountry = regions.map(region =>
      region.countries.find(country => country.active)
    )[0];

  const setActiveCountry = country => {
    console.log(country);
  };

  useEffect(() => {
    width < 800 ? setCollapsed(true) : setCollapsed(false);
    dispatch(userActions.getAuthorizedUserInfo());
  }, [dispatch, width]);

  window.captchaStyle.innerHTML = `.grecaptcha-badge { display: none !important}`;

  return (
    <div className={className}>
      <div className="sidebar-header">
        <Icon className="sidebar-icon" type="menu" onClick={toggleCollapsed} />
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
                user={user}
              />
            }
            trigger="click"
          >
            <div className="country-active">
              <div className="country-active__title">
                <img
                  src={`/assets/img/${activeCountry.flag}`}
                  alt="active-country-flag"
                />
                <h5>{activeCountry.name}</h5>
              </div>
              <div className="country-active__description">
                {user.default_accounts.amazon_mws.seller_id}
              </div>
            </div>
          </Popover>

          <Menu
            mode="inline"
            theme="dark"
            inlineCollapsed={collapsed}
            selectedKeys={[activeLink]}
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
