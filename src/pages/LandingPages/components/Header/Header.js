import React, {Fragment, useEffect, useState} from 'react'
import logoDark from '../../../../assets/img/ProfitWhales-logo-dark.svg'
import logoWhite from '../../../../assets/img/ProfitWhales-logo-white.svg'
import {Link, NavLink} from "react-router-dom"
import './Header.less'
import {history} from "../../../../utils/history"
import {SVG} from "../../../../utils/icons"
import $ from "jquery"


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

    const authorized = !!localStorage.getItem('token')

    return (
        <>
            <div className={'header-block'}>
                {page !== 'zth' && <div className="new-zth">
                    <span>NEW!</span> We launched Zero to Hero tool to create 100% ready-to-use Amazon PPC Campaigns.

                    <button className={'btn white'}>
                        <Link to={'zero-to-hero-info'}>
                            Learn More
                        </Link>
                    </button>
                </div>}

                <header className={`not-found-page__header ${type}`} id={'header'}>
                    <div className="container">
                        <div>
                            <NavLink to='/' className={'logo-link'}>
                                <img src={type === 'dark' ? logoWhite : logoDark} alt="Profit Whales" className='logo'/>
                            </NavLink>

                            <div className={`icon ${openedMenu && 'active'}`} onClick={() => switchMenu(!openedMenu)}>
                                <div className="burger"/>
                            </div>

                            <nav className={`header-menu desc ${openedMenu ? 'open' : ''}`}>
                                <ul className="">
                                    <li className="has-child"><a href="#">Products <SVG id='menu-arrow'/></a>
                                        <ul className="sub-menu">
                                            <li><NavLink to='/'>PPC Automate</NavLink></li>
                                            {/*<li><Link to='/scanner'>PPC Scanner</Link></li>*/}
                                            <li className="soon"><NavLink disabled to={'/zero-to-hero-info'}>Zero To Hero</NavLink></li>
                                            <li className="soon"><a href='#'>Analytics</a></li>
                                        </ul>
                                    </li>
                                    {/*<li><NavLink to={'/pricing'}>Pricing</NavLink></li>*/}
                                    <li><NavLink to="/contact-us">Contact us</NavLink></li>
                                    <li className="has-child"><a href="#">Resources <SVG id='menu-arrow'/></a>
                                        <ul className="sub-menu">
                                            <li><a href="https://blog.profitwhales.com/">Blog</a></li>
                                            <li><a href='https://intercom.help/profitwhales/en' target={'_blank'}>Help
                                                Center</a>
                                            </li>
                                        </ul>
                                    </li>
                                    {/*<li><NavLink to="/videos">How it works</NavLink></li>*/}
                                </ul>
                            </nav>
                        </div>

                        <div className='nav-buttons'>
                            {/*{!authorized ?*/}
                            {/*    <Fragment>*/}
                            {/*        <div onClick={() => history.push('/login')} className='login-link'>LOG IN</div>*/}
                            {/*        <button*/}
                            {/*            onClick={() => history.push('/registration')}*/}
                            {/*            className='btn green-btn register-btn'*/}
                            {/*        >*/}
                            {/*            {page === 'zth' ? 'Try it Now' : 'TRY IT FOR FREE'}*/}
                            {/*        </button>*/}
                            {/*    </Fragment>*/}
                            {/*    :*/}
                            {/*    <button*/}
                            {/*        onClick={() => history.push('/ppc/optimization')}*/}
                            {/*        className='btn green-btn login-btn'*/}
                            {/*    >*/}
                            {/*        SIGN IN*/}
                            {/*    </button>*/}
                            {/*}*/}

                            <Link to={'/login'}>LOG IN</Link>

                            <Link to={'/registration'} className={'btn default register-btn'}>start trial</Link>
                        </div>
                    </div>
                </header>
            </div>

            <nav className={`header-menu mob ${openedMenu ? 'open' : ''}`}>
                <div className="buttons">
                    <Link to={'/registration'} className={'btn default register-btn'}>start trial</Link>

                    <Link to={'/login'} className={'login-btn'}>LOG IN</Link>

                </div>

                <ul className="">
                    <li className="has-child"><a href="#">Products <SVG id='menu-arrow'/></a>
                        <ul className="sub-menu">
                            <li><NavLink to='/'>PPC Automate</NavLink></li>
                            {/*<li><Link to='/scanner'>PPC Scanner</Link></li>*/}
                            <li className="soon"><NavLink disabled to={'/zero-to-hero-info'}>Zero To Hero</NavLink></li>
                            <li className="soon"><a href='#'>Analytics</a></li>
                        </ul>
                    </li>
                    {/*<li><NavLink to={'/pricing'}>Pricing</NavLink></li>*/}
                    <li><NavLink to="/contact-us">Contact us</NavLink></li>
                    <li className="has-child"><a href="#">Resources <SVG id='menu-arrow'/></a>
                        <ul className="sub-menu">
                            <li><a href="https://blog.profitwhales.com/">Blog</a></li>
                            <li><a href='https://intercom.help/profitwhales/en' target={'_blank'}>Help
                                Center</a>
                            </li>
                        </ul>
                    </li>
                    {/*<li><NavLink to="/videos">How it works</NavLink></li>*/}
                </ul>
            </nav>
        </>
    )
}

export default Header
