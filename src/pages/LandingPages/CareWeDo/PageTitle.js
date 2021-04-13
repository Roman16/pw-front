import React from "react"
import videoBg from "../../../assets/img/landing-careWeDo/video-bg.webm"
import videoBgMob from "../../../assets/img/landing-careWeDo/video-bg-mob.gif"
import './CareWeDo.less'

const PageTitle = ({title}) => {
    return (
        <section className={'pre-header page-title'}>
            <video
                className="block-video-container desk"
                autoPlay={true}
                controls={false}
                loop={true}
                muted={true}
            >
                <source src={videoBg} type="video/mp4"/>
            </video>

            <img
                className="block-video-container mob"
                src={videoBgMob} alt=""
            />

            <diw className="container">
                <h1 dangerouslySetInnerHTML={{__html: title}}/>
            </diw>
        </section>

    )
}

export default PageTitle
