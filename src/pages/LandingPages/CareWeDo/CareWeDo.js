import React, {useEffect} from "react"
import Footer from "../components/Footer/Footer"
import Header from "../components/Header/Header"
import './CareWeDo.less'
import communityImage from '../../../assets/img/landing-careWeDo/community-image.png'
import communityImageMob from '../../../assets/img/landing-careWeDo/community-image-mob.png'

import environmentalImage from '../../../assets/img/landing-careWeDo/environmental-image.png'
import environmentalImageMob from '../../../assets/img/landing-careWeDo/environmental-image-mob.png'

import supportImage from '../../../assets/img/landing-careWeDo/support-image.png'
import supportImageMob from '../../../assets/img/landing-careWeDo/support-image-mob.png'

import organizationalImage from '../../../assets/img/landing-careWeDo/organizational-image.png'
import organizationalImageMob from '../../../assets/img/landing-careWeDo/organizational-image-mob.png'

import laborImage from '../../../assets/img/landing-careWeDo/labor-image.png'
import laborImageMob from '../../../assets/img/landing-careWeDo/labor-image-mob.png'

import videoBg from '../../../assets/img/landing-careWeDo/77.mp4'


const data = [
    {
        title: `<span>Community</span> development`,
        text: 'Profit Whales is highly devoted towards its stakeholders and persuades the idea of integrated community. We are making every effort to engage with and learn from society as well as communities which we cooperate with to maintain positive effect through active participation in their development. The company always takes initiative when it sees the opportunity, has resources, and knows how to create positive change. We donate resources, time, and expertise to ensure development of society. We develop education programs to assist those who are striving to deliver the value that would be beneficial for the society as a whole. We believe that the synergy of actions of employees, clients, and partners to manage positive changes strengthens our foundation as well as reciprocate our relations. Such approach encourages knowledge transfer and society development.',
        img: communityImage,
        imgMob: communityImageMob
    },
    {
        title: `Environmental <span>Impact</span>`,
        text: 'Although Profit Whales refers to the companies that do not have extensive processes that affect the environment, we are committed to create positive impact on the world problem. We take responsibility for creating a harmonic living system to promote sustainability within communities. The company has implemented an integrated waste management system through rational paper usage, recycling, and ecological disposal. We facilitate education of our community to promote sustainable practices within waste management.',
        img: environmentalImage,
        imgMob: environmentalImageMob,
    },
    {
        title: `Support <span>Whales</span>`,
        text: 'We put “whales” into the center of our organization in order to attract communities to the sustainable life promotion and to facilitate development of the harmonic relations between humanity and nature. We are moved by the beauty, extraordinary personality, and mental as well as emotional capacity of whales. These animals have extraordinary emotional intelligence, complex lives and community structures, and deep bonds within their community members. We believe that their community is as complex as ours, which makes us view our performance as the possibility to create a new environment for the development of complex ideas with integrated human and AI decisions, bringing new sustainable approaches. ',
        img: supportImage,
        imgMob: supportImageMob,
    },
    {
        title: `Organizational <span>governance</span>`,
        text: 'We strive to develop an environment where every person is valued, supported, and respected. We create space without any place for discrimination, inequality, or judgment. Our culture is based on openness, passion, commitment, integrity, excellence, innovation, and teamwork. We believe in people and support their growth as well as development through empowerment, self-determination, responsibility, and trust. Profit Whales is about innovation, ideas, and communication over hierarchy or positions. We do not believe in mistakes but in the experience that shows opportunities and new horizons for development. Our company is leading by the value creation with the full accent on people and their sustainable living.',
        img: organizationalImage,
        imgMob: organizationalImageMob,
    },
    {
        title: `Labor <span>practice</span>`,
        text: 'Profit Whales developed its own ocean to grow talents. We set value in each decision we make, showing respect and support to each individual that decides to contribute their expertise, knowledge, and creativity to progress our company to implement its mission. We offer stable work based on fair payment and strict compliance with labor laws. We offer huge possibilities to grow employees’ talents within their position and over it through continuous training and education of personal as well as professional skills. Proper treatment of every individual lies in the essence of Profit Whales performance.',
        img: laborImage,
        imgMob: laborImageMob,
    },

]

const CareWeDo = () => {

    useEffect(() => {
        document.querySelector('.block-video-container').play()
    }, [])

    return (
        <div className="care-we-do-page  landing-page">
            <Header/>

            <section className={'pre-header'}>
                <video
                    className="block-video-container"
                       autoPlay = {true}
                       controls = {false}
                       loop = {true}
                       muted = {true}
                >
                    <source src={videoBg} type="video/mp4"/>
                </video>

                <diw className="container">
                    <h1><span>care</span> <br/> we do</h1>
                </diw>
            </section>

            {data.map(item => (
                <section className={'content'}>
                    <div className="container">
                        <h2 dangerouslySetInnerHTML={{__html: item.title}}/>
                        <p dangerouslySetInnerHTML={{__html: item.text}}/>
                    </div>

                    <img className={'deck'} src={item.img} alt=""/>
                    <img className={'mob'} src={item.imgMob} alt=""/>
                </section>
            ))}


            <Footer/>
        </div>
    )
}

export default CareWeDo
