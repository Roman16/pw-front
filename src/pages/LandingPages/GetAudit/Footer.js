import React from "react"
import {Link} from "react-router-dom"
import {SocialLinks} from "../components/Footer/Footer"
import {email, phone} from "../components/Header/Header"

const Footer = () => {
    return (
        <footer>
            <div className="container">
                <div className="terms">
                    <p>Profit Whales © 2021 All Right Reserved</p>

                    <Link to={'/terms-and-conditions'}>Terms & Conditions</Link>
                    <Link to={'/policy'}>Privacy Policy</Link>
                </div>

                <div className="contacts">
                    <div className="row">
                        <a href={`tel:${phone}`} className="phone">
                            {phone}
                        </a>

                        <div className="vr"/>

                        <a href={`mailto:${email}`} className="email">
                            {email}
                        </a>

                        <div className="vr"/>

                        <span>10:00 - 10:00 EST</span>
                        <a href=""></a>
                    </div>

                    <SocialLinks/>
                </div>
            </div>
        </footer>
    )
}

export default Footer