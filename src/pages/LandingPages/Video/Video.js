import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

import johnImage from '../../../assets/img/landing-video/john.svg';
import aircraftImage from '../../../assets/img/landing-video/aircraft.svg';

import './Video.less';

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
                    <div className="video-item">
                        <h2>Name of Video #1</h2>
                        <p>This video walks you through the initial settings to be completed when you sign up. This video walks you through the.</p>

                        <iframe
                            className="video"
                            src="https://www.youtube.com/embed/SRhhgDVB0jk"
                            frameBorder="0"
                            title="video"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>

                    <div className="video-item">
                        <h2>Name of Video #2</h2>
                        <p>This video walks you through the initial settings to be completed when you sign up. This video walks you through the.</p>

                        <iframe
                            className="video"
                            src="https://www.youtube.com/embed/SRhhgDVB0jk"
                            frameBorder="0"
                            title="video"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>

                    <div className="video-item">
                        <h2>Name of Video #3</h2>
                        <p>This video walks you through the initial settings to be completed when you sign up. This video walks you through the.</p>

                        <iframe
                            className="video"
                            src="https://www.youtube.com/embed/SRhhgDVB0jk"
                            frameBorder="0"
                            title="video"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                </div>
            </section>

            <section className='support'>
                <div className="container">
                    <img src={aircraftImage} alt=""/>

                    <div className="form">
                        <h3>Still have any questions?</h3>
                        <p>Our support team is here to help you.</p>
                        <button className='btn green-btn'>chat with us</button>
                    </div>

                </div>
            </section>

            <Footer/>
        </div>
    )
};

export default Video;