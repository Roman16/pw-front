import React from "react"
import Header from "../components/Header/Header"
import PageTitle from "../CareWeDo/PageTitle"
import Footer from "../components/Footer/Footer"
import './Recognition.less'

import logo0 from '../../../assets/img/partners-logo/ecomengine.png'
import logo1 from '../../../assets/img/partners-logo/elevate-brands.png'
import logo2 from '../../../assets/img/partners-logo/getida.png'
import logo3 from '../../../assets/img/partners-logo/taxomate.png'
import logo4 from '../../../assets/img/partners-logo/seller-tools.png'
import logo5 from '../../../assets/img/partners-logo/nozzle.png'
import logo6 from '../../../assets/img/partners-logo/pingpong.png'
import logo7 from '../../../assets/img/partners-logo/ylt-translations.png'
import logo8 from '../../../assets/img/partners-logo/seller-fest.png'
import logo9 from '../../../assets/img/partners-logo/payability.png'
import logo10 from '../../../assets/img/partners-logo/sostocked.png'
import logo11 from '../../../assets/img/partners-logo/accrueme.png'
import {ContactForm} from "../Contact/Contact"

const Recognition = () => {
    const logoList = [logo0, logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8, logo9, logo10, logo11]

    return (
        <div className="recognition  landing-page">
            <Header/>

            <PageTitle
                title={`<span>Recognition</span>`}
            />

            <section className={'partners'}>
                <div className="container">
                    <h2>Meet some of our <span>client-partners</span></h2>

                    <ul>
                        {logoList.map((item) => (
                            <li><img src={item} alt=""/></li>
                        ))}
                    </ul>
                </div>
            </section>

            <ContactForm/>

            <Footer/>
        </div>
    )
}

export default Recognition
