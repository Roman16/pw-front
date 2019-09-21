import React from 'react';
import {Form, Row, Input, Button, Checkbox, Col, Select} from 'antd';
import './LoginForm.less';
import { Link } from 'react-router-dom';
class WrappedLoginForm extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <div className="form-group">
                    <Form.Item className='input-form-group' label="E-mail">
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input
                                className="email-input"
                                type="email"
                                name="email"
                                id="email"
                                autoComplete="off"
                                placeholder="Type Your e-mail here"
                            />,
                        )}
                    </Form.Item>

                    <Form.Item className='input-form-group' label="Password">
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input.Password
                                className="password-input"
                                type={this.props.passwordHidden ? 'password' : 'text'}
                                name="password"
                                placeholder="Type Your password here"
                                autoComplete="off"
                            />,
                        )}
                    </Form.Item>
                </div>
                <Row type="flex" justify="space-between" className="form-bottom">
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(<Checkbox>Remember me</Checkbox>)}
                        <a className="login-form-forgot forget" href="https://profitwhales.com/password/reset">
                            Forgot your password?
                        </a>

                </Row>
                <Row type="flex" justify="start" className='form-btns'>
                    <Col xs={24} sm={24} md={9} className='form-btns-login'><Button className="submit" htmlType="submit">Log in</Button></Col>
                    <Col xs={24} sm={24} md={9} className='form-btns-signup'><Link to="/register" className="sign-up-link">Sign up</Link></Col>
                </Row>
                <Row className="form-details">
                    <Col>
                        By signing up, you agree to <br />
                        <a href="#">Terms and Conditions &amp; Privacy Policy</a>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="amazon-login-wrap">
                            <p>or</p>
                            <a href="https://profitwhales.com/login/amazon">
                                <img src="https://images-na.ssl-images-amazon.com/images/G/01/lwa/btnLWA_gold_312x64.png" />
                            </a>
                        </div>
                    </Col>
                </Row>
            </Form>
        );
    }
}

const LoginForm = Form.create({ name: 'normal_login' })(WrappedLoginForm);
export default LoginForm;
