import React, {useState, Fragment, useEffect} from "react";
import logo from "../../../assets/img/logo.svg";
import {Button, Form, Input, Spin} from "antd";
import {Link} from "react-router-dom";
import './ResetPassword.less';
import {userService} from "../../../services/user.services";
import {history} from "../../../utils/history";
import '../LoginPage/LoginPage.less';
import {notification} from "../../../components/Notification";

const ResetPassword = (props) => {
    const [userParams, setParams] = useState({}),
        [resetStatus, setResetStatus] = useState(null),
        [processing, setProcessing] = useState(false);

    const handleChange = (e) => {
        setParams({
            ...userParams,
            [e.target.name]: e.target.value
        })
    };

    const sendEmailHandler = async (e) => {
        e.preventDefault();
        setProcessing(true);

        try {
            await userService.sendEmailForResetPassword({email: userParams.email});
            setResetStatus('sent')
        } catch (e) {
            console.log(e);
        }

        setProcessing(false);
    };

    const changePasswordHandler = async (e) => {
        e.preventDefault();
        setProcessing(true);

        if (userParams.password === userParams.confirmPassword) {
            try {
                const res = await userService.changeUserPassword({
                    token: props.match.params.token,
                    userId: props.match.params.userId,
                    newPassword: {
                        password: userParams.password,
                        password_confirmation: userParams.confirmPassword
                    }
                });

                notification.success({title: 'Success'});

                localStorage.setItem('token', res.access_token);

                setTimeout(() => {
                    history.push('/account-settings')
                }, 1)
            } catch (e) {
                console.log(e);
            }
        } else {
            notification.error({title: 'The password confirmation does not match'})
        }

        setProcessing(false);
    };

    useEffect(() => {
        if (props.match.params && props.match.params.userId && props.match.params.token) {
            userService.checkResetToken({
                token: props.match.params.token,
                userId: props.match.params.userId,
            })
                .then((res) => {
                    setResetStatus('changePass');
                })
                .catch(() => {
                    setResetStatus('sendEmail');
                })
        } else {
            setResetStatus('sendEmail');
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
                            {resetStatus === 'sendEmail' && 'Request an e-mail reset link'}
                            {resetStatus === 'changePass' && 'Change your password'}
                        </h4>
                    </div>

                    {!resetStatus && <Spin size={'large'}/>}

                    {resetStatus === 'sendEmail' &&
                    <Form className="login-form" onSubmit={sendEmailHandler}>
                        <Form.Item className="input-form-group">
                            <Input
                                className="email-input"
                                type="email"
                                name="email"
                                id="email"
                                required={true}
                                // autoComplete="off"
                                placeholder="E-mail"
                                onChange={handleChange}
                            />
                        </Form.Item>

                        <Button
                            className="btn default"
                            disabled={processing}
                            htmlType={'submit'}
                        >
                            Send
                            {/*<Spin/>*/}
                        </Button>
                    </Form>}

                    {resetStatus === 'sent' &&
                    <p>
                        The email has been sent to you.
                        Check your email box and follow the instructions to reset the password.
                    </p>}

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
                                type="password"
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
                            htmlType={'submit'}
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