import React from 'react';

import {Form, Row, Input, Button, Checkbox, Col, Spin} from 'antd';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import {notification} from '../../../../components/Notification';
import {userActions} from '../../../../actions/user.actions';
import amazon from '../../../../assets/img/amazon.png';
import './LoginPageForm.less';

const recaptchaKey = process.env.GOOGLE_RECAPTCHA_KEY || '6LdVacEUAAAAACxfVkvIWG3r9MXE8PYKXJ5aaqY1';

class LoginPageForm extends React.Component {
    state = {
        email: '',
        password: '',
        captcha_action: 'login',
        rememberMe: false,
        isLoading: false,
        loginSuccess: false
    };

    onChange = ({target}) => {
        this.setState({[target.name]: target.value});
    };

    onSubmit = e => {
        e.preventDefault();

        const {email, password, rememberMe, captcha_action} = this.state;
        this.setState({isLoading: true});

        // eslint-disable-next-line no-useless-escape
        const fieldEmailValid = /^([a-zA-Z0-9_\.-]+)@([a-zA-Z0-9_\.-]+)\.([a-zA-Z\.]{2,6})$/.test(
            email
        );

        if (password.length < 6) {
            notification.error({
                title: 'The password must be at least 6 characters.'
            });
            this.setState({
                isLoading: false
            });
            return;
        } else if (email.length === 0) {
            notification.error({
                title: 'The letter must contain at least 1 character.'
            });
            this.setState({
                isLoading: false
            });
            return;
        } else if (!fieldEmailValid) {
            notification.error({
                title: 'Invalid email address'
            });
            this.setState({
                isLoading: false
            });
            return;
        }

        window.grecaptcha.ready(() => {
            window.grecaptcha.execute(recaptchaKey, {action: 'login'}).then((token) => {
                this.props.login({
                    email,
                    password,
                    rememberMe,
                    captcha_action,
                    captcha_token: token
                });
            });
        });



        this.setState({
            isLoading: false
        });
    };

    componentDidMount() {
        this.setState({isLoading: false});

        window.captchaStyle.innerHTML = `.grecaptcha-badge { display: block !important}`;
    }

    render() {
        const {email, password, isLoading, loginSuccess} = this.state;

        if (isLoading) {
            return (
                <div className="example">
                    <Spin size="large"/>
                </div>
            );
        }

        if (loginSuccess) {
            return <Redirect to="/ppc/optimization"/>;
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
                <Row
                    type="flex"
                    justify="space-between"
                    className="form-bottom"
                >
                    <Checkbox
                        onChange={e =>
                            this.setState({rememberMe: e.target.checked})
                        }
                    >
                        Remember me
                    </Checkbox>

                    {/*<ReCaptcha*/}
                    {/*    sitekey={this.props.recaptchaKey}*/}
                    {/*    action='login'*/}
                    {/*    verifyCallback={this.verifyCallback}*/}
                    {/*/>*/}

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
                            onClick={this.onSubmit}
                            data-badge="inline"
                        >
                            Log in
                        </Button>
                    </Col>

                    <Col xs={24} sm={24} md={9} className="form-btns-signup">
                        <Link to="/registration" className="sign-up-link">
                            Sign up
                        </Link>
                    </Col>
                </Row>

                <Row className="form-details">
                    <Col>
                        By signing up, you agree to
                        <br/>
                        <a href="/#">
                            Terms and Conditions &amp; Privacy Policy
                        </a>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <div className="amazon-login-wrap">
                            <p>or</p>
                            {/*<Link to="/login/amazon">*/}
                            <a onClick={() => window.open('/login/amazon', '_self')}>
                                <img src={amazon} alt="LWA-GOld"/>
                            </a>
                            {/*</Link>*/}
                        </div>
                    </Col>
                </Row>
            </Form>
        );
    }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
    login: user => {
        dispatch(userActions.login(user));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginPageForm);
