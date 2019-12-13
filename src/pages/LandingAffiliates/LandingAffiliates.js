import React from "react";
import Header from "../NotFound/Header/Header";
import Footer from "../NotFound/Footer/Footer";
import './LandingAffiliates.less';
import illustrationImg from '../../assets/img/illustration.svg'
import benefitsImg from '../../assets/img/benefits-icon.svg'
import performersImg from '../../assets/img/performers-icon.svg'
import supportImg from '../../assets/img/support-icon.svg'
import greenLine from '../../assets/img/green-line.svg';
import contactUsImage from '../../assets/img/contact-us-image.svg';
import commissionFreeIcon from '../../assets/img/commission-free-icon.svg';
import commissionHaveFeeIcon from '../../assets/img/commission-have-fee-icon.svg';
import howItWorksImage from '../../assets/img/how-it-works-image.svg';

const LandingAffiliates = () => {

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

                        <button className='btn green-btn'>
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

                    <button className='btn green-btn'>
                        contact us
                    </button>
                </div>
            </section>

            <section className='profitwhales-programs'>
                <div className="container">
                    <h3>What Is The ProfitWhales Affiliate Program?</h3>
                    <img src={greenLine} alt=""/>
                    <span>
                        We provide you with high-quality promotional assets like banners, sidebars, social media graphics and videos.
                        So you <br/>everything to refer your visitors & drive sales!
                    </span>

                    <div className="programs">
                        <div>
                            <img src={benefitsImg} alt=""/>

                            <h4>Benefits</h4>

                            <div className='custom-list'>
                                <div>High conversion rates (20–30%)</div>
                                <div>10% Lifetime Commissions</div>
                                <div>Real-Time Statistics And Reporting</div>
                                <div>Perks for super-affiliates and influencers</div>
                            </div>
                        </div>

                        <div>
                            <img src={performersImg} alt=""/>

                            <h4>Perks for Top Performers</h4>

                            <div className='custom-list'>
                                <div>Exclusive discounts</div>
                                <div>Increased payouts</div>
                                <div>Premium Support</div>
                            </div>
                        </div>

                        <div>
                            <img src={supportImg} alt=""/>

                            <h4>Support</h4>

                            <div className='custom-list'>
                                <div>We'll help you get the word out</div>
                                <div>Expert Support</div>
                                <div>Receive a dedicated referral link</div>
                            </div>
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

            <section className='commission-details'>
                <div className="container">
                    <h3>Commission Details</h3>
                    <img src={greenLine} alt="" className='green-line'/>

                    <div className='commissions'>
                        <div className='free'>
                            <img src={commissionFreeIcon} alt=""/>
                            <div className='description'>
                                <h4>Your Payout for</h4>
                                <span>Free registration</span>
                            </div>

                            <div className="commission-value">
                                $5
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
                                    <h5>Register</h5>
                                    <span>Apply now to get paid for each successful referral you are making.</span>
                                </div>

                                <div className="list-item">
                                    <h5>Get your personal link</h5>
                                    <span>Once you’ve registered, you’ll get your own, unique link to give to your followers.</span>
                                </div>

                                <div className="list-item">
                                    <h5>Share your link</h5>
                                    <span>Share your link with your subscribers and followers to get commissions for each new Amazon Seller that signs up for any ProfitWhales paid or free subscription plan.</span>
                                </div>
                            </div>

                            <button className='btn green-btn'>
                                apply now
                            </button>
                        </div>
                    </div>
                </div>
            </section>


            <Footer/>
        </div>
    )
};

export default LandingAffiliates;