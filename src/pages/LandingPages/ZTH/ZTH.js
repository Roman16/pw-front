import React, {useState} from "react";
import './ZTH.less';
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import {SVG} from "../../../utils/icons";
import OurCases from "../Automation/OurCases/OurCases";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import zthKingImage from '../../../assets/img/landing-zth/zth-king.svg'
import amazonStoreLogo from '../../../assets/img/landing-zth/amazon_appstore.svg'
import amazonSpnLogo from '../../../assets/img/amazon-spn-logo.png'
import dragonImage from '../../../assets/img/landing-zth/dragon.png'
import dragonImageMob from '../../../assets/img/landing-zth/dragon_mob.png'
import ppcStructure from '../../../assets/img/landing-zth/ppc-structure.png'
import zthStructure from '../../../assets/img/landing-zth/zth-structure.png'
import zthStructureMob from '../../../assets/img/landing-zth/zth-structure_mob.png'
import expertImage from '../../../assets/img/landing-zth/expert-image.png'
import caseImage from '../../../assets/img/landing-zth/cases-image.png'
import caseImageMob from '../../../assets/img/landing-zth/cases-image_mob.png'
import kingOnTronImage from '../../../assets/img/landing-zth/king-on-tron.png'
import x10SuccessImage from '../../../assets/img/landing-zth/x10-success.svg'
import skuIcon from '../../../assets/img/landing-zth/100sku.svg'
import agencyIcon from '../../../assets/img/landing-zth/agency-icon.svg'
import bestSellerIcon from '../../../assets/img/landing-zth/best-seller-icon.svg'
import bestSellerLabel from '../../../assets/img/landing-zth/best-seller-label.png'
import {Link} from "react-router-dom";
import {stepsImages} from "../../../assets/img/landing-automation/steps";

const setupDescription = [
    {
        ppc: 'The fee of $50-$100 per hour',
        zth: '$0 Per Hour (we charge per ready campaigns)',
    },
    {
        ppc: `From 10 to 20 hours to harvest keywords for a PPC <br/> campaign`,
        zth: 'It takes a Few Minutes to harvest relevant keywords and <br/> generate a semantic core',
    },
    {
        ppc: '1-3 hours to Setup a PPC Campaigns',
        zth: '5 minutes to Setup a new PPC Campaigns in Seller Central',
    },
    {
        ppc: 'Up to 7 days to create and launch a new Campaign',
        zth: 'Up to 12 hours to deliver a new Campaign',
    },
    {
        ppc: 'Oftentimes only one source of keywords is considered',
        zth: 'Algorithms don’t make mistakes',
    },
    {
        ppc: 'Using Amazon suggestions and intuition to choose the first',
        zth: 'Using Big Data to assign optimal starting bids',
    },
    {
        ppc: 'More trial-and-error variations, higher prices',
        zth: 'Variations (child SKUs) are FREE',
    },
    {
        ppc: 'The common structure that all other sellers use',
        zth: 'Patented Profit Whales PPC Campaign Structure',
    },
];

const includesList = [
    'One-minute campaigns setup with our data-driven algorithms and you ready to go.',
    'Professionally structured campaigns that we used in our Agency to grow eight-figure brands.',

    'No Amazon Advertising knowledge required. Just feel in some data.',
    'Spend more time on growing your business while we focus on your ads.',

    'Save time&money by starting with the most relevant keywords in your niche without getting them from auto campaigns.',
    'More than five campaigns and 30-200 ad groups that have their own goal.'
];

const onOpenChat = () => {
    window.Intercom('show')
}

const ZTHLanding = () => {
    const [setupType, setSetupType] = useState('zth');
    return (
        <div className="landing-zth">
            <Header/>

            <section className={'zth-king-section'}>
                <div className="container">
                    <img src={zthKingImage} alt="" className={'king'}/>

                    <div className="col">
                        <h2>
                            The Era of ancient Amazon PPC structure is coming to an end. It’s time for upgrade.
                            Meet <span>Zero to Hero</span>
                        </h2>

                        <p>
                            Zero to Hero offers a unique, flexible and time-tested Amazon PPC campaign structure that
                            will give you a competitive edge
                        </p>

                        <div className="action">
                            <div className="row">
                                <button className="btn default link">
                                    <a href="https://calendly.com/vitalii-pw-success-manager/demo-call-with-profit-whales"
                                       target={'_blank'}>
                                        LET’S TALK
                                    </a>
                                </button>

                                <span>or</span>

                                <button className="btn white link">
                                    <Link to={'/registration'}>
                                        TRY IT NOW
                                    </Link>
                                </button>
                            </div>

                            <div className="row">
                                <img src={amazonStoreLogo} alt=""/>
                                <img src={amazonSpnLogo} alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className={'dragon-section'}>
                <div className="container">
                    <div className="col">
                        <h2>It took years to defeat the <br/> dragon</h2>
                        <p>
                            After a few years of being a turn-key Amazon advertising <br/>
                            agency, we have discovered an ideal structure of a PPC <br/>
                            campaign, that works best with Amazon’s algorithms.
                        </p>
                        <button className={'btn default link'}>
                            <Link to={'/registration'}>
                                TRY NOW
                            </Link>
                        </button>
                    </div>

                    <img src={dragonImage} alt="" className={'desc'}/>
                </div>
                <img src={dragonImageMob} alt="" className={'mob'}/>
            </section>

            <section className={'static-section'}>
                <div className="container">
                    <div>
                        <div className="value">$240M</div>
                        <p>total amazon revenue <br/> managed</p>
                    </div>
                    <div className={'border'}/>
                    <div>
                        <div className="value">34%</div>
                        <p>average decrease <br/> in acos</p>
                    </div>
                    <div className={'border'}/>
                    <div>
                        <div className="value">27%</div>
                        <p>average growth in <br/> sales</p>
                    </div>
                </div>
            </section>

            <section className={'structure-section'}>
                <div className="container">
                    <div className="row ppc-structure">
                        <div className="col">
                            <h2>
                                90% 0f Amazon Sellers use sub-optimal and/or poorly controlled Amazon PPC Structure
                            </h2>

                            <div className="metrics">
                                <div><i><SVG id={'traffic-icon'}/></i> TraFfic <SVG id={'triangle-icon'}/></div>
                                <div><i><SVG id={'cvr-icon'}/></i> CVR <SVG id={'triangle-icon'}/></div>
                                <div><i><SVG id={'cpc-icon'}/></i> CPC <SVG id={'triangle-icon'}/></div>
                                <div><i><SVG id={'acos-icon'}/></i> ACOS <SVG id={'triangle-icon'}/></div>
                            </div>

                            <p>
                                Most campaign structures simply can’t be optimized properly, regardless of what software
                                you use (Profit Whales being the exception, of course). So you literally keep burning
                                through your advertising budget evert day.
                            </p>
                        </div>

                        <img src={ppcStructure} alt=""/>
                    </div>

                    <div className="col zth-structure">
                        <h2>What the secret PPC Structure we discovered when we defeated the Dragon?</h2>
                        <div className="metrics">
                            <div><i><SVG id={'traffic-icon'}/></i> TraFfic <SVG id={'triangle-icon'}/></div>
                            <div><i><SVG id={'cvr-icon'}/></i> CVR <SVG id={'triangle-icon'}/></div>
                            <div><i><SVG id={'cpc-icon'}/></i> CPC <SVG id={'triangle-icon'}/></div>
                            <div><i><SVG id={'acos-icon'}/></i> ACOS <SVG id={'triangle-icon'}/></div>
                        </div>
                        <p>
                            ZTH is not just a smart and well-organized collection of selling keywords. It’s a living
                            structure that keeps working and improving itself under the ever-changing circumstances and
                            competition on the Amazon
                        </p>

                        {/*<button className={'btn white'}>*/}
                        {/*    read more about zth*/}
                        {/*</button>*/}
                    </div>
                </div>

                <img src={zthStructure} alt="" className={'zth-structure-image desc'}/>
                <img src={zthStructureMob} alt="" className={'zth-structure-image mob'}/>
            </section>

            <section className={'updated-version'}>
                <div className="container">
                    <h2>The Most Updated Version of Any Expert</h2>
                </div>

                <img src={expertImage} alt="" className={'desc'}/>

                <div className="container setup-description desc">
                    <div className="row">
                        <h3>
                            Setup by Amazon <br/> PPC expert
                        </h3>

                        <i></i>

                        <h3>
                            Profit Whales <br/> Zero to Hero Setup
                        </h3>
                    </div>

                    {setupDescription.map((item, index) => (
                        <div className="row">
                            <h5 dangerouslySetInnerHTML={{__html: item.ppc}}/>

                            <i>
                                <SVG id={`zth-setup-${index + 1}`}/>
                            </i>

                            <h5 dangerouslySetInnerHTML={{__html: item.zth}}/>
                        </div>
                    ))}
                </div>

                <div className="container setup-price desc">
                    <div className={'ppc'}>
                        Total Per 1 SKU <span>$750-$2000</span><br/>
                        In average <span>48 hours</span> needed
                    </div>

                    <div className={'zth'}>
                        Price Per 1 SKU <span>$500</span><br/>
                        In average <span>10 minutes</span> needed
                    </div>
                </div>

                <div className={`${setupType} mob setup-description`}>
                    <img src={expertImage} alt=""/>

                    <div className="col">
                        <div className="row title">
                            <h3 className={`${setupType === 'zth' && 'active'}`} onClick={() => setSetupType('zth')}>
                                Profit Whales <br/> Zero to Hero Setup
                            </h3>

                            <h3 className={`${setupType === 'ppc' && 'active'}`} onClick={() => setSetupType('ppc')}>
                                Setup by Amazon <br/> PPC expert
                            </h3>
                        </div>

                        <div className="container list">
                            {setupDescription.map((item, index) => (
                                <div className="row">
                                    <h5 className={'ppc'} dangerouslySetInnerHTML={{__html: item.ppc}}/>

                                    <i>
                                        <SVG id={`zth-setup-${index + 1}`}/>
                                    </i>

                                    <h5 className={'zth'} dangerouslySetInnerHTML={{__html: item.zth}}/>
                                </div>
                            ))}
                        </div>

                        <div className="ppc ppc-price">
                            Total Per 1 SKU $750-$2000
                            <div className={'line'}/>
                            In average 48 hours needed
                        </div>

                        <div className="zth zth-price">
                            Total Per 1 SKU $750-$2000
                            <div className={'line'}/>
                            In average 48 hours needed
                        </div>
                    </div>
                </div>
            </section>

            <section className={'secret-sauce'}>
                <div className="container description">
                    <div className="col">
                        <h2>
                            ZTH + PPC Automate is the secret sauce
                        </h2>

                        <p>
                            Combining our algorithmic campaigns creation and data-driven Amazon Ads Automation you get
                            the
                            fully automated Amazon Advertising management in ONE place
                        </p>

                        <button className={'btn default link'}>
                            <Link to={'/'} target={'_blank'}>
                                CHECK PPC AUTOMATE
                            </Link>
                        </button>
                    </div>
                </div>

                <img src={caseImage} alt="" className={'desc'}/>
                <img src={caseImageMob} alt="" className={'mob'}/>

                <OurCases/>

                <img src={kingOnTronImage} alt="" className={'king-on-tron'}/>
            </section>

            <section className="plans">
                <div className="container">
                    <h2>Simple Plan</h2>
                    <p>
                        No contracts. Few minutes setup. Post payment support.
                    </p>

                    <div className="actions">
                        <div>
                            <SVG id={'zth-icon'}/>
                            Zero To Hero

                            <div>Create Ads</div>
                        </div>

                        <div className="col">
                            <label htmlFor="">
                                X10 Of Your Success
                            </label>

                            <img src={x10SuccessImage} alt=""/>
                        </div>

                        <Link to={'/'} target={'_blank'}>
                            <SVG id={'ppc-automate-icon'}/>
                            PPC Automation
                            <div>Automate Ads</div>
                        </Link>
                    </div>

                    <div className="plan-information">
                        <h3>
                            What’s your monthly Amazon Advertising Spend?
                        </h3>

                        <div className="row">
                            <div className="col">
                                <div className="price">
                                    <span className={'dollar'}>$</span>
                                    500
                                    <span>
                                        One time fee <br/> per Product
                                    </span>
                                </div>

                                <ul>
                                    <li>* One-time fee per one Product</li>
                                    <li>* Variations are included with no additional cost.</li>
                                </ul>

                                <button className={'btn default link'}>
                                    <Link to={'registration'}>
                                        START NOW
                                    </Link>
                                </button>
                            </div>

                            <div className="col includes">
                                <h4>Includes:</h4>

                                <ul>
                                    {includesList.map((text, index) => (
                                        <li>
                                            <SVG id={`includes-icon-${index + 1}`}/>
                                            {text}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className={'pricing-guide'}>
                <div className="container">
                    <h2>Our Simple Pricing Guide</h2>

                    <div className="pricing-plans desc">
                        <div className={'plan'}>
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

                                    <span>
                                    one time fee <br/> per 1 Product
                                </span>
                                </h3>

                                <button className={'btn default link'}>
                                    <Link to={'registration'}>
                                        GET STARTED
                                        <SVG id={'right-white-arrow'}/>
                                    </Link>
                                </button>
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

                                <span>
                                    one time fee <br/> per 1 Product
                                </span>
                            </h3>

                            <button className={'btn default link'}>
                                <Link to={'registration'}>
                                    GET STARTED
                                    <SVG id={'right-white-arrow'}/>
                                </Link>
                            </button>
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

                                <span>
                                    one time fee <br/> per 1 Product
                                </span>
                            </h3>

                            <button className={'btn default link'}>
                                <Link to={'registration'}>
                                    GET STARTED
                                    <SVG id={'right-white-arrow'}/>
                                </Link>
                            </button>
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

                                <span>
                                    one time fee <br/> per 1 Product
                                </span>
                            </h3>

                            <button className={'btn default link'}>
                                <Link to={'registration'}>
                                    GET STARTED
                                    <SVG id={'right-white-arrow'}/>
                                </Link>
                            </button>
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

                                    <span>
                                    one time fee <br/> per 1 Product
                                </span>
                                </h3>

                                <button className={'btn default link'}>
                                    <Link to={'registration'}>
                                        GET STARTED
                                        <SVG id={'right-white-arrow'}/>
                                    </Link>
                                </button>
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

                                <span>
                                    one time fee <br/> per 1 Product
                                </span>
                            </h3>

                            <button className={'btn default link'}>
                                <Link to={'registration'}>
                                    GET STARTED
                                    <SVG id={'right-white-arrow'}/>
                                </Link>
                            </button>
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

                                <span>
                                    one time fee <br/> per 1 Product
                                </span>
                            </h3>

                            <button className={'btn default link'}>
                                <Link to={'registration'}>
                                    GET STARTED
                                    <SVG id={'right-white-arrow'}/>
                                </Link>
                            </button>
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

                                <span>
                                    one time fee <br/> per 1 Product
                                </span>
                            </h3>

                            <button className={'btn default link'}>
                                <Link to={'registration'}>
                                    GET STARTED
                                    <SVG id={'right-white-arrow'}/>
                                </Link>
                            </button>
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

            <section className={'waiting-action'}>
                <div className="container">
                    <div className="col">
                        <h2>What are you waiting for?</h2>
                        <p>
                            Create professionaly structured Amazon Advertising <br/> Campaigns in a few clicks
                        </p>
                    </div>

                    <button className={'btn white link'}>
                        <Link to={'/registration'}>
                            create campaigns
                        </Link>
                    </button>
                </div>
            </section>

            <Footer/>
        </div>
    )
};

export default ZTHLanding;