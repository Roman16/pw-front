import React from 'react';
import axios from 'axios';
import { Col, Row } from 'antd';


class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            last_name: '',
            email: '',
            password: '',
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        axios.post('api/user/register', { user: this.state });
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <form className="form " id="payment-form2" onSubmit={this.onSubmit}>
                <Row>
                    <Col xs={24} sm={24} md={12}>
                        <div className="input-container">
                            <input
                                type="text"
                                name="name"
                                id="register-name"
                                value={this.state.name}
                                onChange={this.onChange}
                                required
                                autoFocus
                            />
                            <label>First name</label>
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                        <div className="input-container">
                            <input
                                type="text"
                                name="last_name"
                                value={this.state.last_name}
                                onChange={this.onChange}
                                required
                            />
                            <label>Last Name</label>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col xs={24} sm={24} md={24}>
                        <div className="input-container">
                            <input
                                type="email"
                                name="email"
                                id="register-email"
                                value={this.state.email}
                                onChange={this.onChange}
                                required
                            />
                            <label>Email Address</label>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col xs={24} sm={24} md={24}>
                        <div className="input-container">
                            <input
                                type="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.onChange}
                                required
                            />
                            <label>Password</label>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col xs={24} sm={24} md={24}>
                        <button id="complete_registration" type="submit" className="submit">
Create
                            your account
                        </button>
                    </Col>
                </Row>
                <Row className="form-details">
                    <Col>
                        By clicking “Create Your Account” you are agreeing to our
                        {' '}
                        <a href="#">
Terms
                        of
                        Service
                        </a>
                        and have read through our
                        {' '}
                        <a href="#">Privacy Statement</a>
.
                    </Col>
                </Row>
                <Row className="payments-row">
                    <Col xs={24} sm={24} md={10}>
                        <Row type="flex">
                            <Col xs={12} sm={12} md={12}>
                                <img src="/scrill.svg" alt="scrill" />
                            </Col>
                            <Col xs={12} sm={12} md={12}>
                                <img src="/visa.svg" alt="visa" />
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={24} sm={24} md={14}>
                        <p>
                            This is a secure 128-bit ssl encrypted
                            payment
                        </p>
                    </Col>
                </Row>
                {/* <div className="row payments-row"> */}
                {/*    <div className="col-md-5"> */}
                {/*        <div className="row"> */}
                {/*            <div className="col-md-6"> */}
                {/*                <img src="img/scrill.svg" alt="scrill" /> */}
                {/*            </div> */}
                {/*            <div className="col-md-6"> */}
                {/*                <img src="img/visa.svg" alt="visa" /> */}
                {/*            </div> */}
                {/*        </div> */}
                {/*    </div> */}

                {/*    <div className="col-md-7"> */}
                {/*        <p> */}
                {/*            This is a secure 128-bit ssl encrypted */}
                {/*            payment */}
                {/*        </p> */}
                {/*    </div> */}
                {/* </div> */}
            </form>
        );
    }
}

export default RegisterForm;
