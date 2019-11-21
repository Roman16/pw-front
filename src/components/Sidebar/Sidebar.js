import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { Icon, Avatar } from 'antd';
import shortid from 'shortid';

import { regionsMenu, ppcAutomateMenu } from './menu';
import { getClassNames } from '../../utils';
import { userActions } from '../../actions/user.actions';
import ItemIcon from '../ItemIcon/ItemIcon';
import logo from '../../assets/img/logo.svg';
import soon from '../../assets/img/icons/soon.svg';
// import showMenu from '../../assets/img/icons/show-menu-arrow.svg';  // стрелка из фигмы в разделе сайдбар > страна
import './Sidebar.less';

const domainName =
  window.location.hostname === 'localhost'
    ? 'https://front1.profitwhales.com'
    : 'https://' + window.location.hostname;

const production = process.env.REACT_APP_ENV === 'production';

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerWidth]);
    }

    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

const Sidebar = () => {
  const [width, height] = useWindowSize(),
    [collapsed, setCollapsed] = useState(true),
    [automate, setAutomate] = useState(true),
    [regions] = useState(regionsMenu),
    dispatch = useDispatch(),
    { user } = useSelector(state => ({
      user: state.user
    }));

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);

    collapsed
      ? setAutomate(!collapsed)
      : setTimeout(() => setAutomate(!collapsed), 500);
  };

  const className = getClassNames(collapsed ? 'open' : 'closed');

  const activeCountry = regions.map(region =>
    region.countries.find(country => country.active)
  )[0];

  const handleLogout = () => {
    dispatch(userActions.logOut());
  };

  const toggleAutomate = () => setAutomate(!automate);

  useEffect(() => {
    dispatch(userActions.getAuthorizedUserInfo());
    window.innerWidth < 800 ? setCollapsed(false) : setCollapsed(true);
  }, [dispatch]);

  window.captchaStyle.innerHTML = `.grecaptcha-badge { display: none !important}`;

  return (
    <div className={`sidebar ${className}`}>
      <div className="sidebar-header">
        <Icon className="sidebar-icon" type="menu" onClick={toggleCollapsed} />
        <Link to="/" className="sidebar-logo">
          <img src={logo} alt="logo" />
        </Link>
      </div>

      <div className="sidebar-menu">
        <div className="country-nav">
          <div className="country-active">
            <div className="country-active__title">
              <img
                src={`/assets/img/${activeCountry.flag}`}
                alt="active-country-flag"
              />
              <h5>{activeCountry.name}</h5>
            </div>
            <div className="country-active__description">
              {user.default_accounts
                ? user.default_accounts.amazon_mws.seller_id
                : ''}
            </div>
          </div>

          <nav className="top-nav">
            <ul className="top-nav-list">
              <li className="top-nav-item">
                <NavLink
                  className="top-nav-link"
                  activeClassName="top-nav-link-active"
                  exact
                  to="/"
                  disabled
                >
                  <ItemIcon icon="zeroToHero" />
                  <span>
                    Zero to Hero
                    <img className="soon" src={soon} alt="soon" />
                  </span>
                </NavLink>
              </li>

              <li className="top-nav-item">
                <NavLink
                  className="top-nav-link"
                  activeClassName="top-nav-link-active"
                  exact
                  to="/"
                  disabled
                >
                  <ItemIcon icon="analytics" />
                  <span>
                    Analytics
                    <img className="soon" src={soon} alt="soon" />
                  </span>
                </NavLink>
              </li>

              <li className="top-nav-item ppc-automate-link">
                <span onClick={toggleAutomate}>
                  <NavLink
                    className="top-nav-link"
                    activeClassName="top-nav-link-active"
                    to="/ppc"
                    replace
                  >
                    <ItemIcon icon="ppcAutomate" />
                    <span>PPC Automate</span>
                  </NavLink>
                </span>

                {collapsed && (
                  <ul
                    className={`automate-list ${automate ? 'open' : 'closed'}`}
                  >
                    {ppcAutomateMenu.map(item => (
                      <li className="automate-item" key={shortid.generate()}>
                        <NavLink
                          className="automate-link"
                          activeClassName="automate-link-active"
                          exact
                          to={`/ppc${item.link}`}
                        >
                          {item.title}
                        </NavLink>
                      </li>
                    ))}

                    <li className="automate-item">
                      <a href="/ppc-scanner" className="automate-link">
                        PPC Scanner
                      </a>
                    </li>
                  </ul>
                )}

                {!collapsed && (
                  <div className={`collapsed-automate`}>
                    <ul className="collapsed-automate-list">
                      {ppcAutomateMenu.map(item => (
                        <li className="automate-item" key={shortid.generate()}>
                          <NavLink
                            className="automate-link"
                            activeClassName="automate-link-active"
                            exact
                            to={`/ppc${item.link}`}
                          >
                            {item.title}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            </ul>
          </nav>
        </div>

        <nav className="bottom-nav">
          <ul className="bottom-nav-list">
            <li className="bottom-nav-item">
              {production ? (
                <a href="/account/settings">
                  {user.user.avatar ? (
                    <Avatar
                      className="avatar"
                      src={domainName + user.user.avatar}
                      size={24}
                    />
                  ) : (
                    <ItemIcon icon="account" />
                  )}

                  <span>Account</span>
                </a>
              ) : (
                <NavLink
                  className="automate-link"
                  activeClassName="automate-link-active"
                  exact
                  to={`/account-settings`}
                >
                  {user.user.avatar ? (
                    <Avatar
                      className="avatar"
                      src={domainName + user.user.avatar}
                      size={24}
                    />
                  ) : (
                    <ItemIcon icon="account" />
                  )}

                  <span>Account</span>
                </NavLink>
              )}
            </li>
            <li className="bottom-nav-item">
              <a
                href="https://profit-whales.kayako.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ItemIcon icon="helpCenter" />
                <span>Help Center</span>
              </a>
            </li>
            <li className="bottom-nav-item" onClick={handleLogout}>
              <button type="button">
                <ItemIcon icon={'logOut'} />
                <span>Log Out</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
