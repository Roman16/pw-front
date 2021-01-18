import React, {Fragment, useEffect, useState} from 'react'
import logoDark from '../../../../assets/img/logo/pw-agency-dark.svg'
import logoWhite from '../../../../assets/img/logo/pw-agency-white.svg'
import {Link, NavLink} from "react-router-dom"
import './Header.less'
import {SVG} from "../../../../utils/icons"
import $ from "jquery"
import {Popover} from "antd"
import SmartBar from "./SmartBar"

const menu = [
    {
        title: 'Why Profit Whales?',
        subMenu: [
            {
                title: 'PPC Automate',
                link: '/',
                icon: 'ppc-automate-icon'
            },
            {
                title: 'Zero To Hero',
                link: 'zero-to-hero-info',
                icon: 'zth-icon'
            }
        ]
    },
    {
        title: 'Contact Us',
        link: 'contact-us'
    },
    {
        title: 'Learn',
        subMenu: [
            {
                title: 'Blog',
                outsideLink: 'https://blog.profitwhales.com/',
            },
            {
                title: 'Case Studies',
                outsideLink: 'https://blog.profitwhales.com/case-studies/',
            },
            {
                title: 'Podcast',
                outsideLink: 'https://blog.profitwhales.com/podcasts/',
            }
        ]
    },
    {
        title: 'Help Center',
        outsideLink: 'https://intercom.help/profitwhales/en',
    }
]

const Header = ({type = 'light', page}) => {
    const [openedMenu, switchMenu] = useState(false)

    useEffect(() => {
        document.querySelector('.header-menu').addEventListener('click', () => {
            switchMenu(false)
        })
    }, [])

    useEffect(() => {
        if (openedMenu) {
            document.querySelector('body').style.overflow = 'hidden'
        } else {
            document.querySelector('body').style.overflow = 'auto'
        }
    }, [openedMenu])

    useEffect(() => {
        let lastScrollTop = 0

        $(window).scroll(function () {
            const scroll = $(window).scrollTop()

            if (scroll >= 400) {
                $(".header-block").addClass("scrollDown")
            } else {
                $(".header-block").removeClass("scrollDown")
            }

            if (lastScrollTop > scroll) {
                $(".header-block").addClass("scrollUp")
            } else {
                $(".header-block").removeClass("scrollUp")
            }

            lastScrollTop = scroll
        })


//--------------------------------------------------------------
//--------------------------------------------------------------
//--------------------------------------------------------------
        const s = document.createElement('script')
        s.type = 'text/javascript'
        s.async = true
        s.defer = true
        s.innerHTML = `var _protocol = (("https:" == document.location.protocol) ? " https://" : " http://");
var _site_hash_code = "43b949f1ad6de536aff7518bc996a99f";
var _suid = 8534;`
        document.head.appendChild(s)
//--------------------------------------------------------------
//--------------------------------------------------------------
//--------------------------------------------------------------
        const s2 = document.createElement('script')
        s2.type = 'text/javascript'
        s2.innerHTML = `(function (d,s,i) {
var j = d.createElement('script');
j.async = true;
j.id = 'notifia';
j.src = 'https://static.notifia.io/widget.js';
j.setAttribute('initialize',i);
d.head.appendChild(j);
})( document, 'script', 'm6fFjWybVUe61');`
        document.head.appendChild(s2)

        return () => {
            document.head.removeChild(s)
            document.head.removeChild(s2)
        }

    }, [])

    return (
        <>
            <div className={'header-block'}>
                <SmartBar/>

                <header className={`not-found-page__header desc ${type}`} id={'header'}>
                    <div className="container">
                        <div>
                            <div className={`icon burger-button ${openedMenu && 'active'}`}
                                 onClick={() => switchMenu(!openedMenu)}>
                                <div className="burger"/>
                            </div>

                            <NavLink to='/' className={'logo-link'}>
                                <img src={type === 'dark' ? logoWhite : logoDark} alt="Profit Whales" className='logo'/>
                            </NavLink>

                            <nav className={`header-menu`}>
                                <ul>
                                    {menu.map(menuItem => {
                                        if (menuItem.subMenu) {
                                            return (<li className="has-child">
                                                    <Popover
                                                        placement="bottom"
                                                        getPopupContainer={trigger => trigger.parentNode}
                                                        overlayClassName={'sub-menu'}
                                                        content={<ul>
                                                            {menuItem.subMenu.map(subMenuItem => (
                                                                <li>
                                                                    {subMenuItem.outsideLink ?
                                                                        <a target={'_blank'}
                                                                           href={subMenuItem.outsideLink}>
                                                                            {subMenuItem.title}
                                                                        </a>
                                                                        :
                                                                        <NavLink to={subMenuItem.link}>
                                                                            {subMenuItem.icon &&
                                                                            <SVG id={subMenuItem.icon}/>}
                                                                            {subMenuItem.title}
                                                                        </NavLink>
                                                                    }
                                                                </li>
                                                            ))}
                                                        </ul>}
                                                    >
                                                        <a href="#">
                                                            {menuItem.title}
                                                            <SVG id='menu-arrow'/>
                                                        </a>
                                                    </Popover>
                                                </li>
                                            )
                                        } else {
                                            return (<li>
                                                {menuItem.outsideLink ?
                                                    <a target={'_blank'}
                                                       href={menuItem.outsideLink}>
                                                        {menuItem.title}
                                                    </a>
                                                    :
                                                    <NavLink to={menuItem.link}>
                                                        {menuItem.title}
                                                    </NavLink>}
                                            </li>)
                                        }
                                    })}
                                </ul>
                            </nav>
                        </div>

                        <div className='nav-buttons'>
                            <Link to={'/registration'} className={'btn default register-btn'}>GET A FREE AUDIT</Link>
                        </div>
                    </div>
                </header>
            </div>

            <nav className={`header-menu mob ${openedMenu ? 'open' : ''}`}>
                <div className="buttons">
                    <Link to={'/registration'} className={'btn default register-btn'}>GET A FREE AUDIT</Link>
                    <Link to={'/login'} className={'login-btn'}>LOG IN</Link>
                </div>

                <ul>
                    {menu.map(menuItem => {
                        if (menuItem.subMenu) {
                            return (<li className="has-child">
                                    <a href="#">
                                        {menuItem.title}
                                        <SVG id='menu-arrow'/>
                                    </a>

                                    <ul className={'sub-menu'}>
                                        {menuItem.subMenu.map(subMenuItem => (
                                            <li>
                                                {subMenuItem.outsideLink ?
                                                    <a target={'_blank'}
                                                       href={subMenuItem.outsideLink}>
                                                        {subMenuItem.title}
                                                    </a>
                                                    :
                                                    <NavLink to={subMenuItem.link}>
                                                        {subMenuItem.title}
                                                    </NavLink>
                                                }
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            )
                        } else {
                            return (<li>
                                {menuItem.outsideLink ?
                                    <a target={'_blank'}
                                       href={menuItem.outsideLink}>
                                        {menuItem.title}
                                    </a>
                                    :
                                    <NavLink to={menuItem.link}>
                                        {menuItem.title}
                                    </NavLink>}
                            </li>)
                        }
                    })}
                </ul>
            </nav>
        </>
    )
}

export default Header
