import React from 'react';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFacebookSquare, faLinkedin, faTwitter, faYoutube} from "@fortawesome/free-brands-svg-icons";

import logo from '../../../../assets/img/ProfitWhales-logo-dark.svg';
import appStoreLogo from '../../../../assets/img/logo/amazon-app-store-logo-dark.png';
import spnLogo from '../../../../assets/img/logo/amazon-spn-logo-dark.png';

import './Footer.less';

const Footer = () => (
    <footer className='not-found-page__footer'>
        <div className="container">
            <div className="row">
                <div className="logo">
                    <img src={logo} alt=""/>
                </div>

                <div className="actions">
                    <Link to={'/login'} className={'login-link'}>
                        LOG IN
                    </Link>

                    <a
                        href={'https://calendly.com/vitalii-pw-success-manager/demo-call-with-profit-whales'}
                        className={'btn default'}
                        target={'_blank'}
                    >
                        BOOK A DEMO
                    </a>
                </div>
            </div>

            <div className="menu">
                <div className="col">
                    <h4>Products</h4>

                    <ul>
                        <li><Link to={'/'}>PPC Optimization</Link></li>
                        <li><Link to={'/zero-to-hero-info'}>Zero To Hero</Link></li>
                    </ul>
                </div>

                <div className="col">
                    <h4><Link to={'/pricing'}>Pricing</Link></h4>
                </div>

                <div className="col">
                    <h4>Resources</h4>

                    <ul>
                        <li><a href="/blog" target="_blank">Blog</a></li>
                        <li>
                            <a
                                href="https://intercom.help/profitwhales/en/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Automate Help Centre
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="col">
                    <h4><Link to={'/videos'}>How it works</Link></h4>
                </div>

                <div className="col">
                    <h4>Contact Us</h4>

                    <ul>
                        <li><Link to={'/affiliates'}>Affiliates Program</Link></li>
                        <li><a className={'email'} href="mailto: info@profitwhales.agency">info@profitwhales.agency</a>
                        </li>
                        <li>Coral Springs, FL 33065</li>
                    </ul>
                </div>
            </div>

            <div className="row">
                <label>Profit Whales © 2020 All Right Reserved</label>

                <img src={spnLogo} alt="" className={'amazon-spn-logo'}/>

                <img src={appStoreLogo} alt="" className={'amazon-appstore-logo'}/>

                <ul className="social-icons">
                    <li>
                        <a href="https://twitter.com/ProfitWhales" className="i-tw" target="_blank"
                           title="Twitter">
                            <FontAwesomeIcon icon={faTwitter}/>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.facebook.com/profitwhales/" className="i-fb" target="_blank"
                           title="Facebook">
                            <FontAwesomeIcon icon={faFacebookSquare}/>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com/company/profitwhales/" className="i-in"
                           target="_blank"
                           title="LinkedIn">
                            <FontAwesomeIcon icon={faLinkedin}/>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.youtube.com/channel/UCtUreqMG_C_P8Ymqa-LJ2Yg" className="you"
                           target="_blank"
                           title="Youtube">
                            <FontAwesomeIcon icon={faYoutube}/>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </footer>
);

export default Footer;
