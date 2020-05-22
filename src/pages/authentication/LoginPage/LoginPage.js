import React from 'react';
import LoginPageForm from './LoginPageForm/LoginPageForm';
import './LoginPage.less';
import {history} from "../../../utils/history";
import logo from '../../../assets/img/ProfitWhales-logo-white.svg';
import useScript from "../../../utils/hooks/useScript";
import {Link} from "react-router-dom";

const LoginPage = () => {
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

    return (
        <div className="auth-page ">
            <div className="login-page">
                <div className="logo-auth" onClick={() => history.push('/')}>
                    <img src={logo} alt="logo"/>
                </div>

                <div className="container">
                    <div className="title-block">
                        <h3>Sign in</h3>
                        <h4>Welcome back, Please login <br/> to your account</h4>
                    </div>

                    <LoginPageForm/>

                    <div className="redirect-link">
                        Don’t have an account?
                        <Link to={'/registration'}>SIGN UP</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default LoginPage;
