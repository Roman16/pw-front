import React from 'react';
import {
    Form, Row, Input, Button, Checkbox, Col, Spin, notification,
} from 'antd';
import './LoginForm.less';
import { Link, Redirect } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.min.css';
import axios from 'axios';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isLoading: false,
            loginSuccess: false,
        };
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        this.setState({ isLoading: false });
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onClick = (e) => {
        e.preventDefault();
        this.setState({ isLoading: true });
        axios.post('/api/user/login', {
            email: this.state.email,
            password: this.state.password,
        })
            .then((res) => {
                global.localStorage.setItem('token', `Bearer ${res.data.access_token}`);
                this.setState({
                    isLoading: false,
                    // eslint-disable-next-line react/no-unused-state
                    loginSuccess: true,
                });
            })
            .catch(() => {
                notification.error({
                    message: 'These credentials do not match our records.',
                    style: {
                        width: 600,
                        marginLeft: 335 - 600,
                    },
                    placement: 'bottomRight',
                    bottom: 20,
                    duration: 5,
                });
                this.setState({ isLoading: false });
            });
    };

    render() {
        const {
            email, password, isLoading, loginSuccess,
        } = this.state;

        if (isLoading) {
            return (
                <div className="example">
                    <Spin size="large" />
                </div>
            );
        }

        if (loginSuccess) {
            return (
                <Redirect to="/optimization" />
            );
        }


        return (
            <Form className="login-form">
                <div className="form-group">
                    <Form.Item className="input-form-group" label="E-mail">
                        <Input
                            className="email-input"
                            type="email"
                            name="email"
                            id="email"
                            autoComplete="off"
                            placeholder="Type Your e-mail here"
                            value={email}
                            onChange={this.onChange}
                        />
                    </Form.Item>

                    <Form.Item className="input-form-group" label="Password">
                        <Input.Password
                            className="password-input"
                            type="password"
                            name="password"
                            placeholder="Type Your password here"
                            autoComplete="off"
                            value={password}
                            onChange={this.onChange}
                        />
                    </Form.Item>
                </div>
                <Row type="flex" justify="space-between" className="form-bottom">

                    <Checkbox>Remember me</Checkbox>
                    <a
                        className="login-form-forgot forget"
                        href="https://profitwhales.com/password/reset"
                    >
                        Forgot your password?
                    </a>

                </Row>
                <Row type="flex" justify="start" className="form-btns">
                    <Col xs={24} sm={24} md={9} className="form-btns-login">
                        <Button
                            className="submit"
                            htmlType="submit"
                            onClick={this.onClick}
                        >
Log in
                        </Button>
                    </Col>
                    <Col xs={24} sm={24} md={9} className="form-btns-signup">
                        <Link
                            to="/register"
                            className="sign-up-link"
                        >
Sign
                        up
                        </Link>
                    </Col>
                </Row>
                <Row className="form-details">
                    <Col>
                        By signing up, you agree to
                        {' '}
                        <br />
                        <a href="/#">Terms and Conditions &amp; Privacy Policy</a>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="amazon-login-wrap">
                            <p>or</p>
                            <a href="https://profitwhales.com/login/amazon">
                                <img
                                    src="https://images-na.ssl-images-amazon.com/images/G/01/lwa/btnLWA_gold_312x64.png"
                                    alt="LWA-GOld"
                                />
                            </a>
                        </div>
                    </Col>
                </Row>
            </Form>
        );
    }
}


export default LoginForm;
