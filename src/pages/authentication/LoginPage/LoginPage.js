import React from 'react';
import {Row, Col} from 'antd';
import LoginPageForm from './LoginPageForm/LoginPageForm';
import './LoginPage.less';
import {history} from "../../../utils/history";
import logo from '../../../assets/img/ProfitWhales-logo-white.svg';
import useScript from "../../../utils/useScript";

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
        <div className="LoginFormContainer">
            <div className="sign-page">
                <div className="logo-auth" onClick={() => history.push('/')}>
                    <img src={logo} alt="logo"/>
                </div>
                <Row className="container">
                    <Col
                        xs={24}
                        sm={24}
                        md={12}
                        lg={12}
                        className="form-col"
                    >
                        <div className="title">Log In</div>
                        <div className="sub-title">
                            Welcome back! Please Log In to your account
                            <br/>
                            to access the dashboard.
                        </div>

                        <LoginPageForm/>
                    </Col>

                    <Col
                        xs={24}
                        sm={24}
                        md={12}
                        lg={12}
                        className="info-col"
                    >
                        <div className="title">
                            You’ll receive these features in all plans:
                        </div>
                        <ul className="info-list">
                            <li>
                                Focus on your Amazon business, not on ads
                            </li>
                            <li>
                                Automatic data-driven bid management in real-time
                            </li>
                            <li>
                                Harvesting new keywords and cutting bleeding ones to improve your conversions so to
                                boost organic sales
                            </li>
                            <li>
                                Data-driven dashboard with a lot of metrics to make profitable decisions for your
                                business
                            </li>
                            <li>
                                Day-parting tool to run your ads on a certain time of the day
                            </li>
                            <li>
                                You sell, we will do the rest!
                            </li>
                        </ul>
                    </Col>
                </Row>
            </div>
        </div>
    );
}


export default LoginPage;
