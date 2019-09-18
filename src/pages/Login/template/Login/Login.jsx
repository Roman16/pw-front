import React, { useState } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import './Login.less';
import { Link } from 'react-router-dom';

const Login = () => {
    const [passwordType, setType] = useState('password');

    const changeType = () => {
        setType(passwordType === 'password' ? 'text' : 'password');
    };

    return (
        <div className="LoginFormContainer">
            <div className="sign-page">
                <div className="logo-auth">
                    <img src="/logo.svg" alt="logo" />
                </div>
                <div className="container row">
                    <div className="col-md-6 form-col">
                        <div className="title">Log In</div>
                        <div className="sub-title">
                            Welcome back! Please Log In to your account <br />
                            to access the dashboard.
                        </div>
                        <form action="#" className="form" method="POST" _lpchecked="1">
                            <div className="form-group">
                                <div className="input-form-group">
                                    <label htmlFor="email">E-mail</label>
                                    <Input
                                        className="email-input"
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="Type Your e-mail here"
                                        autoComplete="off"
                                    />
                                </div>
                                <div className="input-form-group">
                                    <label>Password</label>
                                    <Input
                                        className="password-input"
                                        type={passwordType}
                                        name="password"
                                        placeholder="Type Your password here"
                                        autoComplete="off"
                                    />
                                    <Icon
                                        onClick={changeType}
                                        className="pass-toggle"
                                        type="eye"
                                        style={{ fontSize: '20px', color: '#46484A' }}
                                    />
                                </div>
                            </div>
                            <div className="form-bottom">
                                <label className="checkbox-label">
                                    <input type="checkbox" name="remember" />
                                        <i></i>
                                        <span>Remember me</span>
                                </label>
                                <a href="https://profitwhales.com/password/reset"
                                   className="forget">Forgot your password?</a>
                            </div>
                            <div className="row form-btns">
                                <div className="col-md-5">
                                    <Button className="submit">Log in</Button>
                                </div>
                                <div className="col-md-5">
                                    <Link to="/register" className="sign-up-link">Sign up</Link>
                                </div>
                            </div>
                            <div className="form-details">
                                By signing up, you agree to <br />
                                <a href="#">Terms and Conditions &amp; Privacy Policy</a>
                            </div>
                        </form>

                        <div className="amazon-login-wrap">
                            <p>or</p>
                            <a href="https://profitwhales.com/login/amazon">
                                <img src="https://images-na.ssl-images-amazon.com/images/G/01/lwa/btnLWA_gold_312x64.png" />
                            </a>
                        </div>


                    </div>
                    <div className="col-md-6 info-col">
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
                    </div>
                </div>
            </div>
        </div>
    );

    /*render() {
        return (
            <div className="LoginFormContainer">
                <Form onSubmit={this.handleSubmit} className="LoginForm">
                    <h3>Login</h3>
                    <Form.Item>
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Username"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="form-button">
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }*/
}

Login.propTypes = {};

Login.defaultProps = {};

export default Login;
