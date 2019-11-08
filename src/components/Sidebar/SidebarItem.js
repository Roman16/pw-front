import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Menu } from 'antd';

import ItemIcon from './ItemIcon';
import { userActions } from '../../actions/user.actions';

const SidebarItem = ({ avatar, logOut, item, parentLink = '', ...props }) => {
  // avatar = null;
  if (item.subMenu) {
    return (
      <Menu.SubMenu
        {...props}
        className={item.className}
        key={`${item.link}`}
        title={
          <span>
            <ItemIcon icon={item.icon} isSub={!!parentLink} />
            <span>{item.title}</span>
          </span>
        }
      >
        {item.subMenu.map(subItem => {
          return subItem.className === 'ppcScaner' ? (
            <Menu.Item {...props} key={subItem.link}>
              <div onClick={() => window.open(subItem.link, '_self')}>
                <span>{subItem.title}</span>
              </div>
            </Menu.Item>
          ) : (
            <SidebarItem
              key={item.link + subItem.link}
              item={subItem}
              parentLink={parentLink + item.link}
            />
          );
        })}
      </Menu.SubMenu>
    );
  } else if (item.className === 'account') {
    return (
      <li className={`ant-menu-item ${item.className}`} key={item.link}>
        <div onClick={() => window.open(item.link, '_self')}>
          {avatar ? (
            <img className="avatar" src={avatar} alt="avatar" width="40" />
          ) : (
            <ItemIcon icon="account" isSub={!!parentLink} />
          )}

          <span>{item.title}</span>
        </div>
      </li>
    );
  } else if (item.className === 'helpCenter') {
    return (
      <li className={`ant-menu-item ${item.className}`} key={item.link}>
        <a
          href="https://profit-whales.kayako.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ItemIcon icon={item.icon} isSub={!!parentLink} />
          <span>{item.title}</span>
        </a>
      </li>
    );
  } else if (item.className === 'logOut') {
    return (
      <li
        className={`ant-menu-item ${item.className}`}
        key={item.link}
        onClick={logOut}
      >
        <div>
          <ItemIcon icon={item.icon} isSub={!!parentLink} />
          <span>{item.title}</span>
        </div>
      </li>
    );
  } else {
    return (
      <li className="ant-menu-item" key={item.link}>
        <NavLink
          to={parentLink + item.link}
          activeClassName="ant-menu-item-active-link"
        >
          <ItemIcon icon={item.icon} isSub={!!parentLink} />
          <span>{item.title}</span>
        </NavLink>
      </li>
    );
  }
};

SidebarItem.propTypes = {
  item: PropTypes.shape({
    link: PropTypes.string,
    icon: PropTypes.string,
    title: PropTypes.string,
    className: PropTypes.string,
    subMenu: PropTypes.arrayOf(
      PropTypes.shape({
        icon: PropTypes.string,
        link: PropTypes.string
      })
    )
  }),
  parentLink: PropTypes.string
};

const mapStateToProps = store => ({
  avatar: store.user.user && store.user.user.avatar
});

const mapDispatchToProps = dispatch => ({
  logOut: () => {
    dispatch(userActions.logOut());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarItem);
