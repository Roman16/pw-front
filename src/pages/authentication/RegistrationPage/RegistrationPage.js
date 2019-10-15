import React from 'react';
import { Col, Row } from 'antd';
import './RegistrationPage.less';
import RegistrationPageForm from './RegistrationPageForm/RegistrationPageForm';

class RegistrationPage extends React.Component {
    state = {};

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
                            <RegistrationPageForm />
                        </Col>
                        <Col
                            xs={24}
                            sm={24}
                            md={12}
                            lg={12}
                            className="info-col"
                        >
                            <div className="title">
                                You’ll receive this features in all plans:
                            </div>
                            <ul className="info-list">
                                <li>AI powered PPC campaigns</li>
                                <li>
                                    Easy to setup and launch your campaigns in
                                    few clicks
                                </li>
                                <li>Enjoyable interface</li>
                                <li>Tens of hours saved per week</li>
                                <li>Thousands of dollars saved per ASIN</li>
                            </ul>
                            <div className="btn-container">
                                Already have an account?
                                <a href="/login">Login</a>
                            </div>
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
