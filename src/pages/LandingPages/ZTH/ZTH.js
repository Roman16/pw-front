import React from "react";
import './ZTH.less';
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

import zthKingImage from '../../../assets/img/landing-zth/zth-king.svg'
import amazonStoreLogo from '../../../assets/img/landing-zth/amazon_appstore.svg'
import dragonImage from '../../../assets/img/landing-zth/dragon.svg'
import ppcStructure from '../../../assets/img/landing-zth/ppc-structure.svg'
import zthStructure from '../../../assets/img/landing-zth/zth-structure.svg'


const ZTHLanding = () => {
    return (
        <div className="landing-zth">
            <Header/>

            <section className={'zth-king-section'}>
                <div className="container">
                    <div className="col">
                        <img src={zthKingImage} alt="" className={'king'}/>
                    </div>

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
                            <button className="btn default">
                                LET’S TALK
                            </button>

                            <img src={amazonStoreLogo} alt=""/>
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
                        <button className={'btn default'}>TRY NOW</button>
                    </div>

                    <img src={dragonImage} alt=""/>
                </div>
            </section>

            <section className={'static-section'}>
                <div className="container">
                    <div>
                        <div className="value">$240M</div>
                        <p>total amazon revenue <br/> managed</p>
                    </div>
                    <div>
                        <div className="value">34%</div>
                        <p>average decrease <br/> in acos</p>
                    </div>
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
                                <div>TraFfic</div>
                                <div>CVR</div>
                                <div>CPC</div>
                                <div>ACOS</div>
                            </div>

                            <p>
                                Most campaign structures simply can’t be optimized properly, regardless of what software
                                you use (Profit Whales being the exception, of course). So you literally keep burning
                                through your advertising budget evert day.
                            </p>
                        </div>

                        <img src={ppcStructure} alt=""/>
                    </div>

                    <div className="col">
                        <h2>What the secret PPC Structure we discovered when we defeated the Dragon?</h2>
                        <div className="metrics">
                            <div>TraFfic</div>
                            <div>CVR</div>
                            <div>CPC</div>
                            <div>ACOS</div>
                        </div>
                        <p>
                            ZTH is not just a smart and well-organized collection of selling keywords. It’s a living
                            structure that keeps working and improving itself under the ever-changing circumstances and
                            competition on the Amazon
                        </p>

                        <button className={'btn white'}>
                            read more about zth
                        </button>
                    </div>
                </div>

                <img src={zthStructure} alt="" className={'zth-structure-image'}/>
            </section>

            <Footer/>
        </div>
    )
};

export default ZTHLanding;