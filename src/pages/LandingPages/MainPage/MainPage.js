import React from "react"
import './MainPage.less'
import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"

import videoBg from '../../../assets/img/landing-mainPage/video-bg.mp4'
import videoBgMob from '../../../assets/img/landing-mainPage/video-bg_mob.mp4'
import {Link} from "react-router-dom"

const MainPage = () => {

    return (<div className="landing-page main-page">
        <Header/>

        <section className="pre-header">
            <video
                className="block-video-container desk"
                autoPlay={true}
                controls={false}
                loop={true}
                muted={true}
            >
                <source src={videoBg} type="video/mp4"/>
            </video>

            <video
                className="block-video-container mob"
                autoPlay={true}
                controls={false}
                loop={true}
                muted={true}
            >
                <source src={videoBgMob} type="video/mp4"/>
            </video>

            <div className="container">
                <h2>
                    <span>Turn Ad Spend</span> into Ad Investment
                </h2>

                <p>
                    to Accelerate your Amazon Business Growth
                </p>

                <Link to={'/contact-us'} className={'btn green'}>
                    contact us
                </Link>
            </div>
        </section>

        <Footer/>
    </div>)
}

export default MainPage