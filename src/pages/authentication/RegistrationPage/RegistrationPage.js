import React from 'react';
import {Link} from 'react-router-dom';
import {Col, Row} from 'antd';
import './RegistrationPage.less';
import RegistrationPageForm from './RegistrationPageForm/RegistrationPageForm';
import {Elements, StripeProvider} from "react-stripe-elements";
import logo from '../../../assets/img/ProfitWhales-logo-white.svg';
import {history} from "../../../utils/history";

const stripeKey = process.env.REACT_APP_ENV === 'production'
    ? process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY_LIVE
    : process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY_TEST || 'pk_test_TYooMQauvdEDq54NiTphI7jx';

const RegistrationPage = () => {
    return (
        <div className="RegisterFormContainer">
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
                        <div className="title">Create your account</div>
                        <div className="sub-title">
                            {/* eslint-disable-next-line max-len */}
                            Getting started with Profit Whales takes only a
                            few minutes but saves hundreds of hours,
                            <br/>
                            don’t believe me? Try it now.
                        </div>
                        <div className="form-title">
                            Personal Information
                        </div>

                        <StripeProvider apiKey={stripeKey}>
                            <Elements>
                                <RegistrationPageForm/>
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
                            <li>
                                Focus on your Amazon business, not on ads
                            </li>
                            <li>
                                Automatic data-driven bid management in real-time
                            </li>
                            <li>
                                Harvesting new keywords and cutting bleeding ones to improve your conversions so to boost organic sales
                            </li>
                            <li>
                                Data-driven dashboard with a lot of metrics to make profitable decisions for your business
                            </li>
                            <li>
                                Day-parting tool to run your ads on a certain time of the day
                            </li>
                            <li>
                                You sell, we will do the rest!
                            </li>
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
};

export default RegistrationPage;
