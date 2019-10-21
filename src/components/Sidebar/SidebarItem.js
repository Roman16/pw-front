import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Menu, Icon } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { userActions } from '../../actions/user.actions';

const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '/assets/icons/iconfont.js'
});

const baseUrl = process.env.REACT_APP_API_URL;
console.log('baseUrl :', baseUrl);
const avatar = token => axios.get(`${baseUrl}/api/user/status`, token);

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

const SidebarItem = ({ logOut, item, parentLink = '', token, ...props }) => {
    console.log('token :', token);
    avatar(token).then(res => console.log('res :', res));
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
                {/* {item.subMenu.map(subItem => (
                    <SidebarItem
                        key={item.link + subItem.link}
                        item={subItem}
                        parentLink={parentLink + item.link}
                    />
                ))} */}
                {item.subMenu.map(subItem => {
                    return subItem.className === 'ppcScaner' ? (
                        <Menu.Item {...props} key={subItem.link}>
                            <a href="https://profitwhales.com/ppc-scaner">
                                <span>{subItem.title}</span>
                            </a>
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
    } else if (item.className === 'helpCenter') {
        return (
            <Menu.Item {...props} className={item.className} key={item.link}>
                <a
                    href="https://profit-whales.kayako.com"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <ItemIcon icon={item.icon} isSub={!!parentLink} />
                    <span>{item.title}</span>
                </a>
            </Menu.Item>
        );
    } else if (item.className === 'logOut') {
        return (
            <Menu.Item
                {...props}
                className={item.className}
                key={item.link}
                onClick={logOut}
            >
                <Link to={parentLink + item.link}>
                    <ItemIcon icon={item.icon} isSub={!!parentLink} />
                    <span>{item.title}</span>
                </Link>
            </Menu.Item>
        );
    } else {
        return (
            <Menu.Item {...props} className={item.className} key={item.link}>
                <Link to={parentLink + item.link}>
                    <ItemIcon icon={item.icon} isSub={!!parentLink} />
                    <span>{item.title}</span>
                </Link>
            </Menu.Item>
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
    token: store.user.access_token
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
