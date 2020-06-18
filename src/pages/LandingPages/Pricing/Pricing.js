import React, {useState} from 'react';
import './Pricing.less'
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

import humanSupportImage from "../../../assets/img/landing-pricing/human-support-image.png";
import {SVG} from "../../../utils/icons";
import PPCPriceSlider from "../components/PPCPriceSlider/PPCPriceSlider";
import PPCPricingGuide from "../components/PPCPricingGuide/PPCPricingGuide";
import {Link} from "react-router-dom";
import Comments from "../components/Comments/Comments";
import ZTHPriceSlider from "../components/ZTHPriceSlider/ZTHPriceSlider";
import ZTHPricingGuide from "../components/ZTHPricingGuide/ZTHPricingGuide";
import ManagedPriceSlider from "../components/ManagedPriceSlider/ManagedPriceSlider";


const Pricing = () => {
    const [selectedProduct, setSelectedProduct] = useState('ppc');

    return (
        <div className='landing-pricing'>
            <Header/>

            <section className="pw-products">
                <div className="container">
                    <h2>
                        Flexible plans that grow with you
                    </h2>

                    {selectedProduct === 'ppc' && <p>
                        We have a prepaid plan after the free trial and charging you based on your last 30-days ad
                        spend. After that, you have 30 days usage of the software. We grow with the growth of your
                        business.
                    </p>}

                    <ul>
                        <li
                            className={`${selectedProduct === 'ppc' ? 'active' : ''}`}
                            onClick={() => setSelectedProduct('ppc')}
                        >
                            <SVG id={'ppc-automate-icon'}/>
                            <div>Automate Ads</div>
                            <span>PPC Automate</span>
                        </li>

                        <li
                            className={`${selectedProduct === 'zth' ? 'active' : ''}`}
                            onClick={() => setSelectedProduct('zth')}
                        >
                            <SVG id={'zth-icon'}/>
                            <div>Create Ads</div>
                            <span>Zero To Hero</span>
                        </li>

                        <li
                            className={`${selectedProduct === 'manage' ? 'active' : ''}`}
                            onClick={() => setSelectedProduct('manage')}
                        >
                            <SVG id={'manage-service-icon'}/>
                            <div>Get extraordinary result</div>
                            <span>Managed Service</span>
                        </li>

                    </ul>

                    <div className="product-price-description">
                        {selectedProduct === 'ppc' && <PPCPriceSlider/>}
                        {selectedProduct === 'zth' && <ZTHPriceSlider/>}
                        {selectedProduct === 'manage' && <ManagedPriceSlider/>}
                    </div>
                </div>
            </section>

            {selectedProduct === 'ppc' && <PPCPricingGuide/>}
            {selectedProduct === 'zth' && <ZTHPricingGuide/>}


            {/*<section className={'case-example'}>*/}
            {/*    <div className="container">*/}
            {/*        <h2>Powerful Case Study Examples</h2>*/}

            {/*        <div className="list">*/}
            {/*            {[1, 2, 3, 4].map((item, index) => (*/}
            {/*                <div className="slide-item">*/}
            {/*                    <div className="">*/}
            {/*                    </div>*/}

            {/*                    <div className="card">*/}
            {/*                        <div className="face face1">*/}
            {/*                            <div className="content">*/}
            {/*                                <img src={caseExampleImage} alt=""/>*/}
            {/*                            </div>*/}
            {/*                        </div>*/}

            {/*                        <div className="face face2">*/}
            {/*                            <div className="content">*/}
            {/*                                <p>*/}
            {/*                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eros, ultrices*/}
            {/*                                    nec placerat adipiscing natoque. Massa varius congue sed eleifend*/}
            {/*                                    commodo.*/}
            {/*                                </p>*/}

            {/*                                <Link to={'/'}>read more</Link>*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}

            {/*                </div>*/}
            {/*            ))}*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</section>*/}

            <Comments/>

            <section className={'human-support'}>
                <div className="container">
                    <div className="col">
                        <h2>Human Support</h2>
                        <p>
                            Our expert team is here to help you on your journey as Amazon Seller. We are here to answer
                            your questions and provide actionable steps that you can implement in your business.
                        </p>
                    </div>

                    <img src={humanSupportImage} alt=""/>
                </div>
            </section>

            <section className='waiting-action'>
                <div className="container">
                    <div className="col">
                        <h2>What are you waiting for?</h2>
                        <p>Create professionally structured Amazon Advertising <br/> Campaigns in a few clicks</p>
                    </div>

                    <Link to={'/registration'} className={'btn white'}>create campaigns</Link>
                </div>
            </section>

            <Footer/>
        </div>
    )
};

export default Pricing;
