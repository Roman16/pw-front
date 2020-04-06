import React, {useState, Fragment, useEffect} from "react";
import logo from "../../../assets/img/logo.svg";
import {Button, Form, Input, Spin} from "antd";
import {Link} from "react-router-dom";
import './ResetPassword.less';
import {userService} from "../../../services/user.services";
import {history} from "../../../utils/history";
import '../LoginPage/LoginPage.less';

const ResetPassword = (props) => {
    const [userParams, setParams] = useState({}),
        [resetStatus, setResetStatus] = useState(null),
        [processing, setProcessing] = useState(false);

    const handleChange = (e) => {
        setParams({email: e.target.value})
    };

    const sendEmailHandler = () => {
        userService.resetUserPassword(userParams)
            .then(res => {
                console.log(res);
            })
    };

    const changePasswordHandler = () => {
        userService.resetUserPassword(userParams)
            .then(res => {
                console.log(res);
            })
    };

    useEffect(() => {
        if (props.match.params && props.match.params.userId && props.match.params.token) {
            userService.resetUserPassword({
                token: props.match.params.token,
                user_id: props.match.params.userId,
            })
                .then((res) => {
                    console.log(res);
                })
                .catch(() => {
                    setResetStatus(null);
                })
        } else {
            setResetStatus(null);
        }
    }, []);


    return (
        <div className='auth-page'>
            <div className="reset-password-page">
                <div className="logo-auth" onClick={() => history.push('/')}>
                    <img src={logo} alt="logo"/>
                </div>

                <div className="container">
                    <div className="title-block">
                        <h3>Reset Password</h3>
                        <h4>
                            {!resetStatus && 'Request an e-mail reset link'}
                            {resetStatus === 'changePass' && 'Change your password'}
                        </h4>
                    </div>

                    {!resetStatus &&
                    <Form className="login-form" onSubmit={sendEmailHandler}>
                        <Form.Item className="input-form-group">
                            <Input
                                className="email-input"
                                type="email"
                                name="email"
                                id="email"
                                // autoComplete="off"
                                placeholder="E-mail"
                                onChange={handleChange}
                            />
                        </Form.Item>

                        <Button
                            className="btn default"
                            disabled={processing}
                        >
                            Send
                            {/*<Spin/>*/}
                        </Button>
                    </Form>}

                    {resetStatus === 'send' &&
                    <span>
                        An email been sent to email address.
                        Follow the directions in the email to reset your password
                    </span>}

                    {resetStatus === 'changePass' &&
                    <Form className="login-form" onSubmit={changePasswordHandler}>
                        <Form.Item className="input-form-group">
                            <Input
                                className="email-input"
                                type="password"
                                name="password"
                                id="password"
                                required={true}
                                autoComplete="off"
                                placeholder="New Password"
                                onChange={handleChange}
                            />
                        </Form.Item>

                        <Form.Item className="input-form-group">
                            <Input
                                className="email-input"
                                type="confirmPassword"
                                name="confirmPassword"
                                id="confirmPassword"
                                required={true}
                                placeholder="Confirm New Password"
                                autoComplete="off"
                                onChange={handleChange}
                            />
                        </Form.Item>

                        <Button
                            className="btn default"
                            disabled={processing}
                        >
                            Update password

                            {/*<Spin/>*/}
                        </Button>
                    </Form>}

                    <div className="redirect-link">
                        Remembered password?
                        <Link to={'/login'}>SIGN IN</Link>
                    </div>
                    <br/>
                    <div className="redirect-link">
                        Don’t have an account?
                        <Link to={'/registration'}>SIGN UP</Link>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ResetPassword;