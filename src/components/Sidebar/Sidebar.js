import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { Icon } from 'antd';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import shortid from 'shortid';

import { regionsMenu, ppcAutomateMenu } from './menu';
import { getClassNames } from '../../utils';
import { userActions } from '../../actions/user.actions';
import ItemIcon from './ItemIcon';
import logo from '../../assets/img/logo.svg';
import showMenu from '../../assets/img/icons/show-menu-arrow.svg';
import './Sidebar.less';
import './transition.less';

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
  const [collapsed, setCollapsed] = useState(true),
    [regions] = useState(regionsMenu),
    dispatch = useDispatch(),
    { user } = useSelector(state => ({
      user: state.user
    })),
    toggleCollapsed = () => setCollapsed(!collapsed),
    // className = getClassNames('sidebar', { open: collapsed }),
    className = getClassNames(collapsed ? 'open' : 'closed'),
    activeCountry = regions.map(region =>
      region.countries.find(country => country.active)
    )[0];

  const handleLogout = () => {
    dispatch(userActions.logOut());
  };

  useEffect(() => {
    dispatch(userActions.getAuthorizedUserInfo());
    width < 800 ? setCollapsed(false) : setCollapsed(true);
  }, [dispatch, width]);

  const [automate, setAutomate] = useState(true),
    togleAutomate = () => setAutomate(!automate);

  useEffect(() => {
    collapsed ? setAutomate(true) : setAutomate(false);
  }, [collapsed]);

  window.captchaStyle.innerHTML = `.grecaptcha-badge { display: none !important}`;

  return (
    <div className={`sidebar ${className}`}>
      <div className="sidebar-header">
        <Icon className="sidebar-icon" type="menu" onClick={toggleCollapsed} />
        {collapsed && (
          <Link to="/" className="sidebar-logo">
            <img src={logo} alt="logo" />
          </Link>
        )}
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
              {user.default_accounts.amazon_mws.seller_id}
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
                  <span>Zero to Hero</span>
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
                  <span>Analytics</span>
                </NavLink>
              </li>

              <li className="top-nav-item">
                <NavLink
                  className="top-nav-link"
                  activeClassName="top-nav-link-active"
                  to="#"
                  onClick={togleAutomate}
                >
                  <ItemIcon icon="ppcAutomate" />
                  <span>PPC Automate</span>
                </NavLink>
                {/* <button type="button" onClick={togleAutomate}>
                  <img
                    className={`show-menu ${automate && 'rotate'}`}
                    src={showMenu}
                    alt="show-menu"
                  />
                </button> */}

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
                  </ul>
                )}

                {!collapsed && (
                  <div
                    className={`collapsed-automate ${
                      automate ? 'open' : 'closed'
                    }`}
                  >
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

                {/* {collapsed && (
                  <CSSTransition
                    classNames="fade"
                    in={automate}
                    timeout={300}
                    unmountOnExit
                  >
                    <ul className="automate-list">
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
                  </CSSTransition>
                )}

                {!collapsed && (
                  <CSSTransition
                    classNames="fade"
                    in={automate}
                    timeout={300}
                    unmountOnExit
                  >
                    <div className="collapsed-automate">
                      <ul className="automate-list">
                        {ppcAutomateMenu.map(item => (
                          <li
                            className="automate-item"
                            key={shortid.generate()}
                          >
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
                  </CSSTransition>
                )} */}
              </li>
            </ul>
          </nav>
        </div>

        <nav className="bottom-nav">
          <ul className="bottom-nav-list">
            <li className="bottom-nav-item">
              <button
                type="button"
                onClick={() => window.open('/account/settings', '_self')}
              >
                {user.user.avatar ? (
                  <img
                    className="avatar"
                    src={user.user.avatar}
                    alt="avatar"
                    width="40"
                  />
                ) : (
                  <ItemIcon icon="account" />
                )}
                <span>Account</span>
              </button>
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
