import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import {Link} from 'react-router-dom';

import './NotFound.less';

import img from '../../../assets/img/404.svg';

const authorized = localStorage.getItem('token');

const NotFound = () => (
    <section className="not-found-page  landing-page">
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
                        <Link to='/'>
                            Back to site
                        </Link>
                }
            </button>
        </div>

        <Footer/>
    </section>
);

export default NotFound;
