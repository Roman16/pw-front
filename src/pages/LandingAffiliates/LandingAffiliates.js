import React, {useEffect} from "react";
import Header from "../NotFound/Header/Header";
import Footer from "../NotFound/Footer/Footer";
import './LandingAffiliates.less';
import illustrationImg from '../../assets/img/illustration.svg'
import benefitsImg from '../../assets/img/benefits-icon.svg'
import performersImg from '../../assets/img/performers-icon.svg'
import supportImg from '../../assets/img/support-icon.svg'
import greenLine from '../../assets/img/green-line.svg';
import shortGreenLine from '../../assets/img/short-green-line.svg';
import greenPoint from '../../assets/img/green-point.svg';
import contactUsImage from '../../assets/img/contact-us-image.svg';
import commissionFreeIcon from '../../assets/img/commission-free-icon.svg';
import commissionHaveFeeIcon from '../../assets/img/commission-have-fee-icon.svg';
import howItWorksImage from '../../assets/img/how-it-works-image.svg';
import checkedIcon from '../../assets/img/icons/mark.svg';

const tapfiliateKey = process.env.REACT_APP_TAPFILIATE_KEY,
    tapfiliateRegistrationPage = 'https://profitwhales.tapfiliate.com/programs/profit-whales-affiliate-program/signup/',
    contactUsLink = 'https://profitwhales.com/contact-us';

const LandingAffiliates = () => {
    const existingScript = document.getElementById('tapfiliate');
    const tapfiliateScript = document.createElement('script');

    if (!existingScript) {
        tapfiliateScript.src = 'https://script.tapfiliate.com/tapfiliate.js';
        tapfiliateScript.id = 'tapfiliate';
        document.head.appendChild(tapfiliateScript);
    }

    useEffect(() => {
        return (() => {
            document.head.removeChild(tapfiliateScript)
        })
    }, []);

    (function (t, a, p) {
        t.TapfiliateObject = a;
        t[a] = t[a] || function () {
            (t[a].q = t[a].q || []).push(arguments)
        }
    })(window, 'tap');

    window.tap('create', tapfiliateKey, {integration: "javascript"});
    window.tap('detect');

    return (
        <div className='landing-affiliates'>
            <Header/>

            <section className='program-block'>
                <div className="container">
                    <div className="description">
                        <h2>Make Money with <br/>
                            Profit Whales Affiliate <br/>
                            Program
                        </h2>

                        <span>
                        Partner up with us to create a new income <br/>
                        stream for you. Press the button below.
                    </span>

                        <button className='btn green-btn' onClick={() => window.open(tapfiliateRegistrationPage)}>
                            become an affiliate
                        </button>
                    </div>

                    <div className="image-block">
                        <img src={illustrationImg} alt=""/>
                    </div>
                </div>
            </section>

            <section className='amazon-influencer'>
                <div className="container">
                    <h2>Are You an Amazon Influencer?</h2>

                    <span>If you expect to generate more than 50 referrals, please reach out to us directly</span>

                    <button className='btn green-btn' onClick={() => window.open(contactUsLink)}>
                        contact us
                    </button>
                </div>
            </section>

            <section className='profitwhales-programs'>
                <div className="container">
                    <h3>What Is The ProfitWhales Affiliate Program?</h3>
                    <img src={greenLine} alt=""/>
                    <span>
                        Leverage Profit Whales marketing initiatives such as blog posts, videos, and whitepapers to save you the energy of creating content from scratch.
                    </span>

                    <div className="programs">
                        <div>
                            <img src={benefitsImg} alt=""/>

                            <h4>Benefits</h4>

                            <div className='custom-list'>
                                <div><img src={checkedIcon} alt=""/>High conversion rates (20–30%)</div>
                                <div><img src={checkedIcon} alt=""/>10% Lifetime Commissions</div>
                                <div><img src={checkedIcon} alt=""/>Real-Time Statistics And Reporting</div>
                                <div><img src={checkedIcon} alt=""/>Perks for super-affiliates and influencers</div>
                            </div>
                        </div>

                        <div>
                            <img src={performersImg} alt=""/>

                            <h4>Perks for Top Performers</h4>

                            <div className='custom-list'>
                                <div><img src={checkedIcon} alt=""/>Exclusive discounts</div>
                                <div><img src={checkedIcon} alt=""/>Increased payouts</div>
                                <div><img src={checkedIcon} alt=""/>Premium Support</div>
                            </div>
                        </div>

                        <div>
                            <img src={supportImg} alt=""/>

                            <h4>Support</h4>

                            <div className='custom-list'>
                                <div><img src={checkedIcon} alt=""/>We'll help you get the word out</div>
                                <div><img src={checkedIcon} alt=""/>Expert Support</div>
                                <div><img src={checkedIcon} alt=""/>Receive a dedicated referral link</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='commission-details'>
                <div className="container">
                    <h3>Commission Details</h3>
                    <img src={greenLine} alt="" className='green-line'/>

                    <div className='commissions'>
                        <div className='free'>
                            <img src={commissionFreeIcon} alt=""/>
                            <div className='description'>
                                <h4>Your Payout for</h4>
                                <span> Per referral that jups from Free Trial to paid subscription plan.</span>
                            </div>

                            <div className="commission-value">
                                $25
                            </div>
                        </div>
                        <div className='have-commissions'>
                            <img src={commissionHaveFeeIcon} alt=""/>
                            <div className='description'>
                                <h4>Your Payout for</h4>
                                <span>Monthly lifetime <br/> commission</span>
                            </div>

                            <div className="commission-value">
                                10%
                            </div>
                        </div>
                    </div>

                    <div className='how-it-work'>
                        <div className="image">
                            <img src={howItWorksImage} alt=""/>
                        </div>

                        <div className='description'>
                            <h4>How it works?</h4>

                            <div className='custom-list'>
                                <div className="list-item">
                                    <img src={greenPoint} alt="" className="list-point"/>
                                    <h5>Register</h5>
                                    <span>
                                        <span className='green-underline'>Apply now <img src={shortGreenLine}
                                                                                         alt=""/></span>
                                         to get paid for each successful referral you are making.
                                    </span>
                                </div>

                                <div className="list-item">
                                    <img src={greenPoint} alt="" className="list-point"/>
                                    <h5>Get your personal link</h5>
                                    <span>Once you’ve registered, you’ll get your own, unique link to give to your followers.</span>
                                </div>

                                <div className="list-item">
                                    <img src={greenPoint} alt="" className="list-point"/>
                                    <h5>Share your link</h5>
                                    <span>Share your link with your subscribers and followers to get commissions for each new Amazon Seller that signs up for any ProfitWhales paid or free subscription plan.</span>
                                </div>
                            </div>

                            <button className='btn green-btn' onClick={() => window.open(tapfiliateRegistrationPage)}>
                                apply now
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <section className='contact-us'>
                <div className="container">
                    <div className="image">
                        <img src={contactUsImage} alt=""/>
                    </div>

                    <div className='have-question'>
                        <h2>Contact us</h2>

                        <h3>Have Questions?</h3>

                        <img src={greenLine} alt="" className='green-line'/>

                        <span>Contact as at</span>
                        <a href="mailto: info@profitwhales.agency">
                            info@profitwhales.agency
                        </a>
                    </div>
                </div>
            </section>

            <Footer/>
        </div>
    )
};

export default LandingAffiliates;
