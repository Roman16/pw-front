import React from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import {Link} from 'react-router-dom';

import './NotFound.less';

import img from '../../assets/img/404.svg';

const authorized = localStorage.getItem('token');

const NotFound = () => (
    <section className="not-found-page">
        <Header/>

        <div className="box">
            <div className="img">
                <img src={img} alt="Page Not Found"/>
            </div>
            <h1>We sincerely apologize </h1>
            {/* eslint-disable-next-line max-len */}
            <button className="btn ripple" type="submit">
                {
                    authorized ?
                        <Link to='/ppc/optimization'>
                            Back to site
                        </Link>
                        :
                        <a href="https://profitwhales.com/">Back to site</a>
                }
            </button>
        </div>

        <Footer/>
    </section>
);

export default NotFound;
