import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import './RegistrationPage.less';
import '../LoginPage/LoginPage.less';

import RegistrationPageForm from './RegistrationPageForm/RegistrationPageForm';
import logo from '../../../assets/img/ProfitWhales-logo-white.svg';
import {history} from "../../../utils/history";
import useScript from "../../../utils/useScript";

const RegistrationPage = (props) => {
    useScript({
        funk: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '2628499780566506');
fbq('track', 'PageView');`
    });

    useEffect(() => {
        if(props.match.params.tag && props.match.params.tag === 'from-agency') {
            sessionStorage.setItem('userFromAgency', 'true');
            console.log(props.match.params.tag);
        }
    }, [])

    return (
        <div className="auth-page">
            <div className="registration-page">
                <div className="logo-auth" onClick={() => history.push('/')}>
                    <img src={logo} alt="logo"/>
                </div>

                <div className="container">
                    <div className="title-block">
                        <h3>Sign Up</h3>
                        <h4>Getting started with ProfitWhales is <br/> easy and takes a few steps!</h4>
                    </div>

                    <RegistrationPageForm/>

                    <ul>
                        <li>No credit card required</li>
                        <li>Cancel anytime</li>
                    </ul>

                    <div className="redirect-link">
                        Already have an account?
                        <Link to={'/login'}>SIGN IN</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegistrationPage;
