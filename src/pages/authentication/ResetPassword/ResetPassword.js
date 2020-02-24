import React, {useState} from "react";
import logo from "../../../assets/img/logo.svg";
import {Button, Checkbox, Col, Form, Input, Row} from "antd";
import {Link} from "react-router-dom";
import './ResetPassword.less';
import {userService} from "../../../services/user.services";
import {history} from "../../../utils/history";


const ResetPassword = () => {
    const [userParams, setParams] = useState({});

    function handleChange(e) {
        setParams({email: e.target.value})
    }

    function handleSave() {
        userService.resetUserPassword(userParams)
            .then(res => {
                console.log(res);
            })
    }

    return (
        <div className='auth-page'>
            <div className="reset-password-page">
                <div className="logo-auth" onClick={() => history.push('/')}>
                    <img src={logo} alt="logo"/>
                </div>

                <div className="container">
                    <div className="title-block">
                        <h3>Reset Password</h3>
                        <h4>Request an e-mail reset link</h4>
                    </div>
                    {/*<div className="title-block">*/}
                    {/*    <h3>Change your password</h3>*/}
                    {/*</div>*/}


                    <Form className="login-form" onSubmit={handleSave}>
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
                        <Form.Item className="input-form-group">
                            <Input
                                className="email-input"
                                type="password"
                                name="password"
                                id="password"
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
                                placeholder="Confirm New Password"
                                autoComplete="off"
                                onChange={handleChange}
                            />
                        </Form.Item>

                        <Button
                            className="btn default"
                            htmlType="submit"
                        >
                            Send
                        </Button>
                    </Form>

                    <div className="redirect-link">
                        Remembered password?
                        <Link to={'/login'}>SIGN IN</Link>
                    </div>
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