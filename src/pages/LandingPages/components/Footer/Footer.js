import React from 'react';
import {Link} from 'react-router-dom';
import {Icon} from "antd";

import logo from '../../../../assets/img/ProfitWhales-logo-dark.svg';
import aLogo from '../../../../assets/img/amazon_logo.png';

import './Footer.less';

const Footer = () => (
    <footer className='not-found-page__footer'>
        <div className="container">
            <div className="col logo-wrap">
                <div className="logo">
                    <img src={logo} alt=""/>
                </div>

                <div className="a-logo">
                    <img src={aLogo} alt=""/>
                </div>

                <form action="https://profitwhales.com/subscribe">
                    <input type="hidden" name="_token" value=""/>
                    <h4>Subscribe to our list</h4>
                    <label>
                        <input type="email" name="email" placeholder="Your email address"/>
                    </label>
                    <button className="btn ripple legitRipple">subscribe</button>
                </form>
            </div>

            <div className="col products">
                <h4>Products</h4>
                <ul>
                    <li>
                        <Link to="#">
                            Zero to hero PPC
                        </Link>
                    </li>
                    <li>
                        <Link to="#">
                            Analyze and Optimize
                        </Link>
                    </li>
                    <li>
                        <Link to="#">
                            Automate your PPC
                        </Link>
                    </li>
                </ul>
            </div>

            <div className="col knowledge">
                <h4>Knowledge</h4>
                <ul>
                    <li>
                        <Link to={'/amazon-ppc-blueprint'}>
                            Amazon PPC Blueprint
                        </Link>
                    </li>
                    <li>
                        <Link to='/terms-and-conditions'>
                            Terms and Conditions
                        </Link>
                    </li>
                    <li>
                        <Link to='policy'>
                            Privacy policy
                        </Link>
                    </li>
                </ul>
            </div>

            <div className="col contacts">
                <h4>Contacts</h4>

                <ul>
                    <li>
                        <Link to={'/affiliates'}>Affiliates program</Link>
                    </li>

                    <li>
                        <div className="adr">
                            <a href="mailto:info@profitwhales.agency" className="email">info@profitwhales.agency</a>
                            <address>Coral Springs, FL 33065</address>
                        </div>

                    </li>

                    <li>
                        <ul className="soc-netw">
                            <li>
                                <a href="https://twitter.com/ProfitWhales" className="i-tw" target="_blank"
                                   title="Twitter">
                                    <Icon type="twitter"/>
                                </a>
                            </li>
                            <li>
                                <a href="https://www.facebook.com/profitwhales/" className="i-fb" target="_blank"
                                   title="Facebook">
                                    <Icon type="facebook" theme="filled"/>
                                </a>
                            </li>
                            <li>
                                <a href="https://www.linkedin.com/company/profitwhales/" className="i-in"
                                   target="_blank"
                                   title="LinkedIn">
                                    <Icon type="linkedin"/>
                                </a>
                            </li>
                            <li>
                                <a href="https://www.youtube.com/channel/UCtUreqMG_C_P8Ymqa-LJ2Yg" className="you"
                                   target="_blank"
                                   title="Youtube">
                                    <Icon type="youtube"/>
                                </a>
                            </li>
                        </ul>

                    </li>
                </ul>


                <div className="copyright">Profit Whales © 2020 All Right Reserved</div>
            </div>
        </div>
    </footer>
);

export default Footer;
