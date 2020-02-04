import React, {useEffect} from 'react';
import './Pricing.less'
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

import zthImage from '../../../assets/img/landing-pricing/zth.png';
import ppcImage from '../../../assets/img/landing-pricing/ppc.svg';
import analyticImage from '../../../assets/img/landing-pricing/analytic.svg';
import peopleImage from '../../../assets/img/landing-pricing/people-icon.svg';
import yesGreenIcon from '../../../assets/img/landing-pricing/yes_green.svg';
import {history} from "../../../utils/history";
import $ from "jquery";

const Pricing = () => {

    useEffect(() => {
        $(".js-range-slider").ionRangeSlider({
            min: 0,
            values: [
                0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1500, 2000, 2500, 3000, 3500, 4500, 5000,
                6000, 7000, 8000, 9000, 10000, 11000, 12000, 13000, 14000, 15000, 16000, 17000, 18000, 19000, 20000,
                22500, 25000, 27500, 30000, 32500, 35000, 37500, 40000, 42500, 45000, 47500, 50000,
                55000, 60000, 65000, 70000, 75000, 80000, 85000, 90000, 95000, 100000
            ],
            hide_min_max: true,
            from: 10,
            from_min: 10,
            prefix: "< $ ",
            max_postfix: "+",
            postfix: "  / month",
            onStart: function () {
                $('.slider-container .slider .irs .irs-bar').html('$ 35');
            },
            onChange: function (data) {
                let value = data.from_value,
                    result = 0,
                    sumElement = $('#result-sum'),
                    barLabel = $('.slider-container .slider .irs .irs-bar'),
                    barTooltip = $('.slider-container .slider .irs .irs-single');


                if (value <= 1000) {
                    sumElement.text('$ 35');
                    barLabel.html('$ 35');
                    barTooltip.html('< $ 1000 / month');
                } else {
                    barTooltip.html(`$ ${value} / month`);

                    if (value >= 50000) {
                        result = ((1.5 / 100) * value) + 500;
                        barLabel.html('$500 + 1,5% <small>ad spend</small>');
                    } else if (value >= 20000) {
                        result = ((2 / 100) * value) + 250;
                        barLabel.html('$250 + 2% <small>ad spend</small>');
                    } else {
                        result = ((2.5 / 100) * value) + 100;
                        barLabel.html('$100 + 2,5% <small>ad spend</small>');
                    }

                    sumElement.text('$ ' + result);
                }
            }
        });

    }, []);

    return (
        <div className='landing-pricing'>
            <Header/>

            <section className="price-list">
                <div className="box">
                    <div className="block-title">
                        <h2>Flexible prepaid plans based on your monthly Ad Spend</h2>
                        <p>
                            We have a prepaid plan after the free trial and charging you based on your last 30-days ad
                            spend. After that, you have 30 days usage of the software. We grow with the growth of your
                            business.
                        </p>
                    </div>
                    <div className="tabs-container">
                        <ul className="tabs-navigation">
                            <li className="disabled">
                                <a href="#content1">
                                    <span className="img">
                                        <img src={zthImage} alt="zth-logo"/>
                                    </span>
                                    Zero To Hero
                                </a>
                            </li>
                            <li>
                                <a className="active" href="#content2">
                                    <span className="img">
                                        <img src={ppcImage} alt="ppc"/>
                                    </span>
                                    PPC Automation
                                </a>
                            </li>
                            <li className="disabled">
                                <a href="#">
                                    <span className="img">
                                        <img src={analyticImage} alt="analytic"/>
                                    </span>
                                    Analytica
                                </a>
                            </li>
                            <li className="disabled">
                                <a href="#">
                                    <span className="img">
                                        <img src={peopleImage} alt="people-icon"/>
                                    </span>
                                    Agencis Vendors
                                </a>
                            </li>
                        </ul>

                        <div className="tabs-content-wrap">
                            <div className="tabs-content active" id="content2">
                                <div className="slider-container">
                                    <div className="row">
                                        <div className="col">
                                            <div className="title">What&rsquo;s your monthly Amazon Advertising
                                                Spend?
                                            </div>
                                            <div className="slider">
                                                <input className="js-range-slider" type="text"/>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="sum">
                                                <span id="result-sum">$ 35</span>
                                                <span>Estimated price per month.</span>
                                                <a href="#plans">How is this calculated?</a>
                                                <button className="btn green-btn"
                                                        onClick={() => history.push('/registration')}>
                                                    Free Trial
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <ul>
                                        <li>
                                            <img src={yesGreenIcon} alt="yes"/>
                                            Efficient Budget Management
                                        </li>
                                        <li>
                                            <img src={yesGreenIcon} alt="yes"/>
                                            You'll get Money Making System
                                        </li>
                                        <li>
                                            <img src={yesGreenIcon} alt="yes"/>
                                            You'll Save a Lot of Time
                                        </li>
                                        <li>
                                            <img src={yesGreenIcon} alt="yes"/>
                                            Business Goal Aware Optimization
                                        </li>
                                        <li>
                                            <img src={yesGreenIcon} alt="yes"/>
                                            Keywords Optimization
                                        </li>
                                        <li>
                                            <img src={yesGreenIcon} alt="yes"/>
                                            Dashboard View
                                        </li>
                                        <li>
                                            <img src={yesGreenIcon} alt="yes"/>
                                            Unlimited Products & Campaigns
                                        </li>
                                        <li><img src={yesGreenIcon} alt="yes"/>
                                            Data-Driven Bid Optimization
                                        </li>
                                        <li>
                                            <img src={yesGreenIcon} alt="yes"/>
                                            Expert Chat Support
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="pricing-guide">
                <div className="box">
                    <div className="block-title" id={'plans'}>
                        <h2>Our Simple Pricing Guide</h2>
                    </div>
                    <div className="list">
                        <div className="item">
                            <div className="title">Starter</div>
                            <div className="sum">&lt;$1000</div>
                            <div className="sub-sum">in ad spend / per month</div>
                            <div className="price">35$</div>
                            <hr/>
                            <p>Start growing your business with our Starter plan</p>
                        </div>
                        <div className="item">
                            <div className="title">Grind</div>
                            <div className="sum">$1k - $20k</div>
                            <div className="sub-sum">in ad spend / per month</div>
                            <div className="price">$100 + 2.5% monthly ad spend</div>
                            <hr/>
                            <p>Automatic system of your Amazon advertising for your success as a growing Amazon
                                Seller</p>
                        </div>
                        <div className="item">
                            <div className="title">Successful Seller</div>
                            <div className="sum">$20k - $50k</div>
                            <div className="sub-sum">in ad spend / per month</div>
                            <div className="price">$250 + 2% monthly ad spend</div>
                            <hr/>
                            <p>Focus on the profitability of your business with our Data-Driven Optimization</p>
                        </div>
                        <div className="item">
                            <div className="title">Established Brand</div>
                            <div className="sum"> &gt; $50k</div>
                            <div className="sub-sum">in ad spend / per month</div>
                            <div className="price">$500 + 1.5% monthly ad spend</div>
                            <hr/>
                            <p>Maximize your sales &amp; profit with automatic optimization</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="rich-bro">
                <div className="box">
                    <div className="inside">
                        <p>Do you spend over <strong>$100,000</strong> per month on Amazon Advertising?</p>
                        <button className="btn default">Contact Us</button>
                    </div>
                </div>
            </section>

            <section className="faq">
                <div className="box">
                    <div className="block-title">
                        <h2>We have the answers for your questions!</h2>
                    </div>
                    <div className="accordions">
                        <div className="accordion">
                            <input id="acc1" type="checkbox" name="accordion"/>
                            <label htmlFor="acc1">How does Profit Whales protect my data?</label>
                            <div className="body">
                                <p>
                                    We take your security very seriously. Our security practices are the best in the
                                    industry. We have no access to your Amazon Seller Central credentials so, nobody
                                    can steal your data. For a detailed description, please visit our Privacy
                                    Policy.
                                </p>
                            </div>
                        </div>
                        <div className="accordion">
                            <input id="acc2" type="checkbox" name="accordion"/>
                            <label htmlFor="acc2">Do you offer managed services for my Amazon PPC Account?</label>
                            <div className="body">
                                <p>
                                    Yes, we offered managed service for Brands who want to combine software with a
                                    team of PPC Experts to reach a desired business goal. Check our Expert Managed
                                    Service here.
                                </p>
                            </div>
                        </div>
                        <div className="accordion">
                            <input id="acc3" type="checkbox" name="accordion"/>
                            <label htmlFor="acc3">Is there a free trial on Profit Whales?</label>
                            <div className="body">
                                <p>
                                    Yes, we have 14 days of the free trial. When it ends, you can switch to a paid
                                    account.
                                </p>
                            </div>
                        </div>
                        <div className="accordion">
                            <input id="acc4" type="checkbox" name="accordion"/>
                            <label htmlFor="acc4">Which marketplaces do the Amazon PPC Tool support?</label>
                            <div className="body">
                                <p>
                                    Currently, the Profit Whales Amazon PPC Automate Tool supports the Amazon US/CA
                                    marketplace. Our team of developers is expanding Profit Whales to the other
                                    marketplaces very soon.
                                </p>
                            </div>
                        </div>
                        <div className="accordion">
                            <input id="acc5" type="checkbox" name="accordion"/>
                            <label htmlFor="acc5">Can I use one SellerApp account for managing multiple PPC
                                accounts?</label>
                            <div className="body">
                                <p>
                                    Absolutely. You can manage more than one PPC account from your SellerApp Agency
                                    Platform.
                                </p>
                            </div>
                        </div>
                        <div className="accordion">
                            <input id="acc6" type="checkbox" name="accordion"/>
                            <label htmlFor="acc6">What if I exceed my plan limit on my account?</label>
                            <div className="body">
                                <p>
                                    We'll inform you as soon as you reached your plan limit. From then on you have 14
                                    days to upgrade your account otherwise we will stop the adjustments.
                                </p>
                            </div>
                        </div>
                        <div className="accordion">
                            <input id="acc7" type="checkbox" name="accordion"/>
                            <label htmlFor="acc7">How long does it take to upload all my data?</label>
                            <div className="body">
                                <p>It takes up to 2 hours to pull up all the data.</p>
                            </div>
                        </div>
                        <div className="accordion">
                            <input id="acc8" type="checkbox" name="accordion"/>
                            <label htmlFor="acc8">How can I cancel my account?</label>
                            <div className="body">
                                <p>
                                    You can just go to Settings page and press «Cancel». It's as easy as it
                                    sounds.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </div>
    )
};

export default Pricing;
