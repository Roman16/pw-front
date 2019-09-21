import React from "react";
import {Col, Row} from "antd";
import './Register.less';
import RegisterForm from './RegisterForm/RegisterForm';

class Register extends React.Component {
    render(){
        return (
            <div className="RegisterFormContainer">
                <div className="sign-page">
                    <div className="logo-auth">
                        <img src="/logo.svg" alt="logo" />
                    </div>
                    <Row className="container">
                        <Col xs={24} sm={24} md={12} lg={12} className="form-col">
                            <div className="title">Create your account</div>
                            <div className="sub-title">
                                Getting started with Profit Whales takes only a few minutes but saves hundreds of hours, <br/>
                                don’t believe me? Try it now.
                            </div>
                            <div className="form-title">Personal Information</div>
                            <RegisterForm />
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} className="info-col">
                            <div className="title">
                                You’ll receive this features in all plans:
                            </div>
                            <ul className="info-list">
                                <li>AI powered PPC campaigns</li>
                                <li>Easy to setup and launch your campaigns in few clicks</li>
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

Register.propTypes = {};

Register.defaultProps = {};

export default Register;
