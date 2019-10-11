import React from 'react';
import axios from 'axios';
import {
 Col, notification, Row, Spin 
} from 'antd';
import { Redirect } from 'react-router-dom';

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            last_name: '',
            email: '',
            password: '',
            registerSuccess: false,
            isLoading: false,
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({
            isLoading: true,
        });
        if (this.state.password.length <= 6) {
            notification.error({
                message: 'The password must be at least 6 characters.',
                style: {
                    width: 600,
                    marginLeft: 335 - 600,
                },
                placement: 'bottomRight',
                bottom: 20,
                duration: 5,
            });
            this.setState({
                isLoading: false,
            });
        }
        axios
            .post('/api/user/register', {
                password: this.state.password,
                email: this.state.email,
                name: this.state.name,
                last_name: this.state.last_name,
            })
            .then(() => {
                this.setState({
                    registerSuccess: true,
                    isLoading: false,
                });
            })
            .catch((err) => {
                notification.error({
                    message: `${err.response.data.message}`,
                    style: {
                        width: 600,
                        marginLeft: 335 - 600,
                    },
                    placement: 'bottomRight',
                    bottom: 20,
                    duration: 5,
                });
                this.setState({
                    isLoading: false,
                });
            });
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { registerSuccess, isLoading } = this.state;

        if (isLoading) {
            return (
                <div className="example">
                    <Spin size="large" />
                </div>
            );
        }

        if (registerSuccess) {
            return <Redirect to="/optimization" />;
        }

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
                            />
                            {/* eslint-disable-next-line max-len */}
                            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control,jsx-a11y/label-has-for */}
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
                            {/* eslint-disable-next-line max-len */}
                            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control,jsx-a11y/label-has-for */}
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
                            {/* eslint-disable-next-line max-len */}
                            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control,jsx-a11y/label-has-for */}
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
                            {/* eslint-disable-next-line max-len */}
                            {/* eslint-disable-next-line jsx-a11y/label-has-for,jsx-a11y/label-has-associated-control */}
                            <label>Password</label>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col xs={24} sm={24} md={24}>
                        <button
                            id="complete_registration"
                            type="submit"
                            className="submit"
                        >
                            Create your account
                        </button>
                    </Col>
                </Row>
                <Row className="form-details">
                    <Col>
                        By clicking “Create Your Account” you are agreeing to
                        our
                        <a href="/#">Terms of Service</a>
                        and have read through our
                        <a href="/#">Privacy Statement</a>
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
                        <p>This is a secure 128-bit ssl encrypted payment</p>
                    </Col>
                </Row>
            </form>
        );
    }
}

export default RegisterForm;
