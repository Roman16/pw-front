import React from 'react'
import {Link} from 'react-router-dom'

import './NotFound.less'

const authorized = localStorage.getItem('token')

const NotFound = () => (
    <section className="not-found-page">
        <div className="container">
            <img src="https://profitwhales.com/wp-content/uploads/2021/07/404-img2.png" alt=""/>
            <h2>OOOPS...</h2>
            <p>Looks like something went wrong, let’s take you home.</p>
            <Link
                className="btn default"
                to={authorized ? '/account/settings' : '/login'}
            >
                Back to home
            </Link>

        </div>
    </section>
)

export default NotFound
