import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

import johnImage from '../../../assets/img/landing-video/john.svg';
import aircraftImage from '../../../assets/img/landing-video/aircraft.svg';

import './Video.less';
import {history} from "../../../utils/history";

const Video = () => {
    return (
        <div className='landing-video'>
            <Header/>

            <section className='welcome'>
                <div className="container">

                    <img src={johnImage} alt=""/>

                    <h1>Welcome <br/> on board!</h1>

                </div>
            </section>

            <section className='video-list'>
                <div className="container">
                    <div className={'description'}>
                        <p> Welcome to Profit Whales 👋</p>
                        <br/>
                        <p>Follow the directions below on how to setup Profit Whales Automation Software for optimizing
                            your Amazon PPC Campaigns.</p>
                        <br/>
                        <p><strong>Take action to get closer to your business goals!</strong></p>
                        <br/>
                        <p>This guide will help set you up and show you how to take all these actions for your
                            business.</p>
                        <br/>
                        <p><strong> Let’s take off!</strong></p>
                        <br/>
                        <p><strong>P.S.</strong> Сheck the requirements for the Amazon PPC Automation:</p>
                        <div className="list-item">Available for US Amazon Sellers only;</div>
                        <div className="list-item">one active product per Ad Group or a product with its variations;
                        </div>
                    </div>

                    <div className="video-item">
                        <h2>Connect Amazon MWS Account to Profit Whales Software</h2>

                        <iframe src="https://www.youtube.com/embed/lKbV7iOOtDw"
                                frameBorder="0"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen/>
                    </div>

                    <div className="video-item">
                        <h2>Link Profit Whales Tool to your Amazon PPC Account</h2>
                        <p>
                            Wait till we are gathering all the data from your account.
                        </p>

                        <p>
                            Need any help with the registration procedure? - Here is our <a target={'_blank'}
                                                                                            href="https://intercom.help/profitwhales/en/articles/3763624-registration-procedure">Help
                            Center</a> or contact us using
                            the chat button in the right corner inside the software.
                        </p>

                        <iframe src="https://www.youtube.com/embed/SRhhgDVB0jk"
                                frameBorder="0"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen/>
                    </div>

                    <div className="video-item">
                        <h2>Where is the START button? - Optimization Setup Tutorial</h2>
                        <p>
                            Be careful setting up your first optimization. <a target={'_blank'}
                                                                              href="https://intercom.help/profitwhales/en/articles/3763871-what-can-you-do-with-profit-whales">Learn
                            more in the Help Center!</a>
                        </p>

                        <iframe src="https://www.youtube.com/embed/Xm9uKq9-7b0"
                                frameBorder="0"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen/>
                    </div>

                    <div className="video-item">
                        <h2>Where are any changes? - Analyze Amazon Sponsored Ads with Profit Whales REPORT</h2>
                        <p>
                            No changes after 24 hours? - <a target={'_blank'}
                                                            href="https://intercom.help/profitwhales/en/articles/3763947-how-do-i-use-profit-whales">We
                            are here to help!</a>
                        </p>

                        <iframe src="https://www.youtube.com/embed/pKjAb9XR4JU"
                                frameBorder="0"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen/>
                    </div>


                    <div className="video-item">
                        <h2>You’ve got DATA? - Analyze it using Dashboard Tutorial</h2>
                        <p>
                            Do you want to get to know your business? - <a target={'_blank'}
                                                                           href="https://intercom.help/profitwhales/en/articles/3763635-how-does-profit-whales-software-work">Learn
                            how We can help!</a>
                        </p>

                        <iframe src="https://www.youtube.com/embed/0Hvnw7ovdy0"
                                frameBorder="0"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen/>
                    </div>

                    <div className="video-item">
                        <h2>I need more features! - Amazon PPC Dayparting Tool</h2>

                        <iframe src="https://www.youtube.com/embed/ItxLAKN8Zno"
                                frameBorder="0"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen/>
                    </div>

                    <div className="video-item">
                        <p><a
                            href="https://intercom.help/profitwhales/en/articles/3815260-new-release-what-is-profit-whales-amazon-ppc-dayparting">What
                            is that and why would You want it?</a></p>
                        <p>
                            It’s important to our team that we keep delivering on our promise of providing
                            auto-optimization Software that works in a few clicks.
                        </p>

                        <p>
                            <a target={'_blank'} href="https://intercom.help/profitwhales/en/collections/2185686-faq">FAQ
                                Section</a>
                        </p>

                        <p>
                            If anything goes wrong during the setting up process, or just for peace of mind, you can
                            contact our Support Team or shoot a message directly to me!
                        </p>

                        <p>
                            <a target={'_blank'} href="https://www.linkedin.com/in/ihor-dubovetskyi-6bb878178/">Ihor
                                Dubovetskyi</a><br/>
                            CEO
                        </p>

                    </div>

                </div>
            </section>

            <section className='support'>
                <div className="container">
                    <img src={aircraftImage} alt=""/>

                    <div className="form">
                        <h3>Still have any questions?</h3>
                        <p>Our support team is here to help you.</p>
                        <button className='btn green-btn' onClick={() => history.push('/contact-us')}>chat with us
                        </button>
                    </div>
                </div>
            </section>

            <Footer/>
        </div>
    )
};

export default Video;