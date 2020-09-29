import React from "react";
import './PPCPricingGuide.less';
import {Link} from "react-router-dom";
import coinsImage from '../../../../assets/img/landing-pricing/coins-icon.svg';
import calendarImage from '../../../../assets/img/landing-pricing/calendar-icon.svg';
import Slider from "react-slick";


const PPCPricingGuide = () => {
    const onOpenChat = () => {
        window.Intercom('show')
    };

    return (
        <section className={'ppc-pricing-guide pricing-guide'} id={'guide'}>
            <div className="container">
                <h2>Our Simple Pricing Guide</h2>

                <div className="pricing-plans desc">
                    <div className={'plan'}>
                        <div className="counts">
                            <div style={{width: '8px', height: '8px'}}/>
                        </div>

                        <h4>Startup</h4>

                        <label><b>{'< $1k'}</b> in ad spend / per month</label>

                        <h3>
                            <span className={'dollar'}>$</span>
                            99
                        </h3>

                        <p>
                            Start growing your business with our Starter plan
                        </p>

                        <Link to={'registration'} className={'btn default link'}>
                            START FREE
                        </Link>
                    </div>

                    <div className={'plan'}>
                        <div className="counts">
                            {[1, 2].map(item => (
                                <div style={{width: `${8 + item * 3}px`, height: `${8 + item * 3}px`}}
                                     className="count"/>
                            ))}
                        </div>
                        <h4>Grind</h4>

                        <label><b>$1k - $20k</b> in ad spend / per month</label>

                        <h3>
                            <span className={'dollar'}>$</span>
                            100 + 3
                            <span className={'percent'}>%</span>

                            <label>monthly <br/> ad spend</label>
                        </h3>

                        <p>
                            Automatic system of your Amazon advertising for your success as a growing Amazon Seller
                        </p>

                        <Link to={'registration'} className={'btn default link'}>
                            GET STARTED
                        </Link>
                    </div>

                    <div className={'plan'}>
                        <div className="counts">
                            {[1, 2,3].map(item => (
                                <div style={{width: `${8 + item * 3}px`, height: `${8 + item * 3}px`}}
                                     className="count"/>
                            ))}
                        </div>

                        <h4>Successful Seller</h4>

                        <label><b>$20k - $50k</b> in ad spend / per month</label>

                        <h3>
                            <span className={'dollar'}>$</span>
                            200 + 2,5
                            <span className={'percent'}>%</span>

                            <label>monthly <br/> ad spend</label>
                        </h3>

                        <p>
                            Focus on the profitability of your business with our Data-Driven Optimization
                        </p>

                        <Link to={'registration'} className={'btn default link'}>
                            GET STARTED
                        </Link>
                    </div>

                    <div className={'plan'}>
                        <div className="counts">
                            {[1, 2, 3,4].map(item => (
                                <div style={{width: `${8 + item * 3}px`, height: `${8 + item * 3}px`}}
                                     className="count"/>
                            ))}
                        </div>

                        <h4>Established Brand</h4>

                        <label><b>$50k-100k</b> in ad spend / per month</label>

                        <h3>
                            <span className={'dollar'}>$</span>
                            500 + 2
                            <span className={'percent'}>%</span>

                            <label>monthly <br/> ad spend</label>
                        </h3>

                        <p>
                            Focus on the profitability of your business with our Data-Driven Optimization
                        </p>

                        <Link to={'registration'} className={'btn default link'}>
                            GET STARTED
                        </Link>
                    </div>
                </div>
            </div>

            <div className="pricing-plans mob">
                <Slider
                    dots={false}
                    infinite={true}
                    slidesToShow={1}
                    slidesToScroll={1}
                    centerMode={true}
                    focusOnSelect={true}
                    centerPadding={'50px'}
                >
                    {/*<div className={'plan'}>*/}
                    {/*    <div className="counts">*/}
                    {/*        <div style={{width: '8px', height: '8px'}}/>*/}
                    {/*    </div>*/}

                    {/*    <h4>Startup</h4>*/}

                    {/*    <label><b>{'< $1k'}</b>in ad spend / per month</label>*/}

                    {/*    <h3>*/}
                    {/*        <span className={'dollar'}>$</span>*/}
                    {/*        69*/}
                    {/*    </h3>*/}

                    {/*    <p>*/}
                    {/*        Start growing your business with our Starter plan*/}
                    {/*    </p>*/}

                    {/*    <Link to={'registration'} className={'btn default link'}>*/}
                    {/*        START FREE*/}
                    {/*    </Link>*/}
                    {/*</div>*/}

                    <div className={'plan'}>
                        <div className="counts">
                            <div style={{width: '8px', height: '8px'}}/>
                        </div>
                        <h4>Grind</h4>

                        <label><b>$1k - $20k</b> in ad spend / per month</label>

                        <h3>
                            <span className={'dollar'}>$</span>
                            100 + 3
                            <span className={'percent'}>%</span>

                            <label>monthly <br/> ad spend</label>
                        </h3>

                        <p>
                            Automatic system of your Amazon advertising for your success as a growing Amazon Seller
                        </p>

                        <Link to={'registration'} className={'btn default link'}>
                            GET STARTED
                        </Link>
                    </div>

                    <div className={'plan'}>
                        <div className="counts">
                            {[1, 2].map(item => (
                                <div style={{width: `${8 + item * 3}px`, height: `${8 + item * 3}px`}}
                                     className="count"/>
                            ))}
                        </div>

                        <h4>Successful Seller</h4>

                        <label><b>$20k - $50k</b> in ad spend / per month</label>

                        <h3>
                            <span className={'dollar'}>$</span>
                            200 + 2,5
                            <span className={'percent'}>%</span>

                            <label>monthly <br/> ad spend</label>
                        </h3>

                        <p>
                            Focus on the profitability of your business with our Data-Driven Optimization
                        </p>

                        <Link to={'registration'} className={'btn default link'}>
                            GET STARTED
                        </Link>
                    </div>

                    <div className={'plan'}>
                        <div className="counts">
                            {[1, 2, 3].map(item => (
                                <div style={{width: `${8 + item * 3}px`, height: `${8 + item * 3}px`}}
                                     className="count"/>
                            ))}
                        </div>

                        <h4>Established Brand</h4>

                        <label><b>$50k-100k</b> in ad spend / per month</label>

                        <h3>
                            <span className={'dollar'}>$</span>
                            500 + 2
                            <span className={'percent'}>%</span>

                            <label>monthly <br/> ad spend</label>
                        </h3>

                        <p>
                            Focus on the profitability of your business with our Data-Driven Optimization
                        </p>

                        <Link to={'registration'} className={'btn default link'}>
                            GET STARTED
                        </Link>
                    </div>
                </Slider>
            </div>

            <div className="container">
                <div className="row">
                    <div className="contact-block">
                        <img src={coinsImage} alt=""/>
                        <h4>Spending more than <b>100k</b> on ads?</h4>
                        <button className={'btn default'} onClick={onOpenChat}>Contact Us</button>
                    </div>

                    <div className="contact-block">
                        <img src={calendarImage} alt=""/>
                        <h4>Interested in <b>annual plan?</b></h4>
                        <button className={'btn default'} onClick={onOpenChat}>Contact Us</button>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default PPCPricingGuide;