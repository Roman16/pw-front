import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { userActions } from '../../actions/user.actions';

//

const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '/assets/icons/iconfont.js'
});

const ItemIcon = ({ icon, isSub, ...props }) => {
    if (isSub) return null;

    if (icon.includes('app')) {
        return <IconFont {...props} type="icon-account" />;
    } else if (icon) {
        return <IconFont {...props} type={`icon-${icon}`} />;
    } else {
        return <Icon {...props} type="right-circle" />;
    }
};

ItemIcon.propTypes = {
    icon: PropTypes.string,
    isSub: PropTypes.bool
};

const SidebarItem = ({ avatar, logOut, item, parentLink = '', ...props }) => {
    // console.log('item :', item.icon);
    // console.log('avatar :', avatar);
    const ava =
        'data:image/jpeg;base64,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';
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
    } else if (item.className === 'account') {
        return (
            <Menu.Item {...props} className={item.className} key={item.link}>
                <a
                    href="https://profitwhales.com/account/settings"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {avatar.includes('appa') ? (
                        <img
                            className="avatar"
                            src={ava}
                            alt="avatar"
                            width="40"
                        />
                    ) : (
                        <ItemIcon icon={avatar} isSub={!!parentLink} />
                    )}

                    <span>{item.title}</span>
                </a>
            </Menu.Item>
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
                <a>
                    <ItemIcon icon={item.icon} isSub={!!parentLink} />
                    <span>{item.title}</span>
                </a>
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
