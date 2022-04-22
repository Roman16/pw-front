import React from 'react'
import {Link} from 'react-router-dom'
import {SocialLinks} from "../../components/Sidebar/Sidebar"
import './404.less'

const NotFound = () => (
    <section className="not-found-page">
        <div className="container">
            <h1>404</h1>
            <h2>Oops!</h2>
            <p>We’re sorry but the page you requested was not found.</p>
            <div className="actions">
                <Link to={'/home'} className="btn default">
                    Go Home
                </Link>

                <a
                    target={'_blank'}
                    className="btn white"
                    href={'https://sponsoreds.com/contact-us'}
                >
                    Contact Us
                </a>
            </div>

            <SocialLinks/>
        </div>
    </section>
)
export default NotFound
