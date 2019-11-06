import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from 'antd';
import './RegistrationPage.less';
import RegistrationPageForm from './RegistrationPageForm/RegistrationPageForm';
import {Elements, StripeProvider} from "react-stripe-elements";
import { loadReCaptcha } from 'react-recaptcha-v3'

const stripeKey = process.env.STRIPE_PUBLISHABLE_KEY_TEST || 'pk_test_TYooMQauvdEDq54NiTphI7jx';
const recaptchaKey =process.env.GOOGLE_RECAPTCHA_KEY || '6LdVacEUAAAAACxfVkvIWG3r9MXE8PYKXJ5aaqY1';

class RegistrationPage extends React.Component {
    componentDidMount() {
        loadReCaptcha(recaptchaKey);
    }

    render() {
        return (
            <div className="RegisterFormContainer">
                <div className="sign-page">
                    <div className="logo-auth">
                        <img src="/logo.svg" alt="logo" />
                    </div>
                    <Row className="container">
                        <Col
                            xs={24}
                            sm={24}
                            md={12}
                            lg={12}
                            className="form-col"
                        >
                            <div className="title">Create your account</div>
                            <div className="sub-title">
                                {/* eslint-disable-next-line max-len */}
                                Getting started with Profit Whales takes only a
                                few minutes but saves hundreds of hours,
                                <br />
                                don’t believe me? Try it now.
                            </div>
                            <div className="form-title">
                                Personal Information
                            </div>

                            <StripeProvider apiKey={stripeKey}>
                                <Elements>
                                    <RegistrationPageForm
                                        recaptchaKey={recaptchaKey}
                                    />
                                </Elements>
                            </StripeProvider>
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
                            <Link to="/login" className="btn-container">
                                Already have an account?
                                <p>Log In</p>
                            </Link>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

RegistrationPage.propTypes = {};

RegistrationPage.defaultProps = {};

export default RegistrationPage;
