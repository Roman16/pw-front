import React from "react";
import './ZTHPricingGuide.less';
import '../PPCPricingGuide/PPCPricingGuide.less';
import bestSellerLabel from "../../../../assets/img/landing-zth/best-seller-label.png";
import {Link} from "react-router-dom";
import {SVG} from "../../../../utils/icons";
import Slider from "react-slick";
import skuIcon from "../../../../assets/img/landing-zth/100sku.svg";
import agencyIcon from "../../../../assets/img/landing-zth/agency-icon.svg";
import bestSellerIcon from "../../../../assets/img/landing-zth/best-seller-icon.svg";

const ZTHPricingGuide = () => {
    const onOpenChat = () => {
        // window.Intercom('show')
    };

    return (
        <section className={'zth-pricing-guide pricing-guide'}>
            <div className="container">
                <h2>Our Simple Pricing Guide</h2>

                <div className="pricing-plans desc">
                    <div className={'plan'}>
                        <div className="bg"/>
                        <div className="content">
                            <img src={bestSellerLabel} alt=""/>

                            <div className="counts">
                                <div className="count" style={{width: '8px', height: '8px'}}/>
                            </div>

                            <h4>1-5 Products</h4>
                            <label htmlFor=""/>

                            <h3>
                                <span className={'dollar'}>$</span>
                                500

                                <label>
                                    one time fee <br/> per 1 Product
                                </label>
                            </h3>

                            <Link to={'registration'} className={'btn default'}>
                                GET STARTED
                                <SVG id={'right-white-arrow'}/>
                            </Link>
                        </div>
                    </div>

                    <div className={'plan'}>
                        <div className="counts">
                            {[1, 2].map(item => (
                                <div style={{width: `${8 + item * 3}px`, height: `${8 + item * 3}px`}}
                                     className="count"/>
                            ))}
                        </div>
                        <h4>6-20 Products</h4>
                        <label htmlFor="">20% Discount</label>

                        <h3>
                            <span className={'dollar'}>$</span>
                            400

                            <label>
                                one time fee <br/> per 1 Product
                            </label>
                        </h3>

                        <Link to={'registration'} className={'btn default'}>
                            GET STARTED
                            <SVG id={'right-white-arrow'}/>
                        </Link>
                    </div>

                    <div className={'plan'}>
                        <div className="counts">
                            {[1, 2, 3].map(item => (
                                <div style={{width: `${8 + item * 3}px`, height: `${8 + item * 3}px`}}
                                     className="count"/>
                            ))}
                        </div>

                        <h4>21-50 Products</h4>
                        <label htmlFor="">30% Discount</label>

                        <h3>
                            <span className={'dollar'}>$</span>
                            350

                            <label>
                                one time fee <br/> per 1 Product
                            </label>
                        </h3>

                        <Link to={'registration'} className={'btn default'}>
                            GET STARTED
                            <SVG id={'right-white-arrow'}/>
                        </Link>
                    </div>

                    <div className={'plan'}>
                        <div className="counts">
                            {[1, 2, 3, 4].map(item => (
                                <div style={{width: `${8 + item * 3}px`, height: `${8 + item * 3}px`}}
                                     className="count"/>
                            ))}
                        </div>

                        <h4>51-100 Products</h4>
                        <label htmlFor="">40% Discount</label>

                        <h3>
                            <span className={'dollar'}>$</span>
                            300

                            <label>
                                one time fee <br/> per 1 Product
                            </label>
                        </h3>

                        <Link to={'registration'} className={'btn default'}>
                            GET STARTED
                            <SVG id={'right-white-arrow'}/>
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
                    <div className={'plan first'}>
                        <div className="bg"/>
                        <div className="content">
                            <img src={bestSellerLabel} alt=""/>

                            <div className="counts">
                                <div className="count"/>
                            </div>

                            <h4>0-5 Products</h4>
                            <label htmlFor=""></label>

                            <h3>
                                <span className={'dollar'}>$</span>
                                500

                                <label>
                                    one time fee <br/> per 1 Product
                                </label>
                            </h3>

                            <Link to={'registration'} className={'btn default'}>
                                GET STARTED
                                <SVG id={'right-white-arrow'}/>
                            </Link>
                        </div>
                    </div>

                    <div className={'plan'}>
                        <div className="counts">
                            {[1, 2].map(item => (
                                <div style={{width: `${8 + item * 3}px`, height: `${8 + item * 3}px`}}
                                     className="count"/>
                            ))}
                        </div>
                        <h4>6-20 Products</h4>
                        <label htmlFor="">20% Discount</label>

                        <h3>
                            <span className={'dollar'}>$</span>
                            400

                            <label>
                                one time fee <br/> per 1 Product
                            </label>
                        </h3>

                        <Link to={'registration'} className={'btn default'}>
                            GET STARTED
                            <SVG id={'right-white-arrow'}/>
                        </Link>
                    </div>

                    <div className={'plan'}>
                        <div className="counts">
                            {[1, 2, 3].map(item => (
                                <div style={{width: `${8 + item * 3}px`, height: `${8 + item * 3}px`}}
                                     className="count"/>
                            ))}
                        </div>

                        <h4>21-50 Products</h4>
                        <label htmlFor="">30% Discount</label>

                        <h3>
                            <span className={'dollar'}>$</span>
                            350

                            <label>
                                one time fee <br/> per 1 Product
                            </label>
                        </h3>

                        <Link to={'registration'} className={'btn default'}>
                            GET STARTED
                            <SVG id={'right-white-arrow'}/>
                        </Link>
                    </div>

                    <div className={'plan'}>
                        <div className="counts">
                            {[1, 2, 3, 4].map(item => (
                                <div style={{width: `${8 + item * 3}px`, height: `${8 + item * 3}px`}}
                                     className="count"/>
                            ))}
                        </div>

                        <h4>51-100 Products</h4>
                        <label htmlFor="">40% Discount</label>

                        <h3>
                            <span className={'dollar'}>$</span>
                            300

                            <label>
                                one time fee <br/> per 1 Product
                            </label>
                        </h3>

                        <Link to={'registration'} className={'btn default'}>
                            GET STARTED
                            <SVG id={'right-white-arrow'}/>
                        </Link>
                    </div>
                </Slider>

            </div>

            <div className="container">
                <div className="row">
                    <div className="contact-block">
                        <img src={skuIcon} alt=""/>
                        <h4>Have more than <b>100 SKU’s?</b></h4>

                        <button className={'btn default'} onClick={onOpenChat}>Contact Us</button>
                    </div>

                    <div className="contact-block">
                        <img src={agencyIcon} alt=""/>
                        <h4>Are you an <b>Agency?</b></h4>

                        <button className={'btn default'} onClick={onOpenChat}>Contact Us</button>
                    </div>
                </div>

                <div className="contact-block">
                    <img src={bestSellerIcon} alt=""/>

                    <div className="col">
                        <h4>Do you want to be <b>The Best Seller?</b></h4>
                        <p>Get in touch with our Managed Service team of experts.</p>
                    </div>

                    <div className="best-seller-label">
                        Best Seller
                    </div>

                    <button className={'btn default'} onClick={onOpenChat}>Contact Us</button>
                </div>
            </div>
        </section>

    )
};

export default ZTHPricingGuide;