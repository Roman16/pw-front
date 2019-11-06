import React from 'react';
import {Row, Col} from 'antd';
import LoginPageForm from './LoginPageForm/LoginPageForm';
import { loadReCaptcha,  } from 'react-recaptcha-v3'

import './LoginPage.less';

import logo from '../../../assets/img/logo.svg';

const recaptchaKey =process.env.GOOGLE_RECAPTCHA_KEY || '6LdVacEUAAAAACxfVkvIWG3r9MXE8PYKXJ5aaqY1';

class LoginPage extends React.Component {

    componentDidMount() {
        loadReCaptcha(recaptchaKey);
    }

    render() {
        return (
            <div className="LoginFormContainer">
                <div className="sign-page">
                    <div className="logo-auth">
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

                            <LoginPageForm
                                recaptchaKey={recaptchaKey}
                            />
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
                                <li>AI powered PPC campaigns</li>
                                <li>
                                    Easy to set up and launch your campaigns in
                                    a few clicks
                                </li>
                                <li>Enjoyable interface</li>
                                <li>Tens of hours saved per week</li>
                                <li>Thousands of dollars saved per ASIN</li>
                            </ul>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

LoginPage.propTypes = {};

LoginPage.defaultProps = {};

export default LoginPage;
