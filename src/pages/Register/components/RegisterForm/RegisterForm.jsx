import React from 'react';
import {Form, Row, Input, Button, Checkbox, Col, Select} from 'antd';
import { Link } from 'react-router-dom';

const { Option } = Select;
class WrappedRegisterForm extends React.Component {
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
                    <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
                        <Form.Item label="Note">
                            {getFieldDecorator('note', {
                                rules: [{ required: true, message: 'Please input your note!' }],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="Gender">
                            {getFieldDecorator('gender', {
                                rules: [{ required: true, message: 'Please select your gender!' }],
                            })(
                                <Select
                                    placeholder="Select a option and change input text above"
                                    onChange={this.handleSelectChange}
                                >
                                    <Option value="male">male</Option>
                                    <Option value="female">female</Option>
                                </Select>,
                            )}
                        </Form.Item>
                        <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                );
            }
        }
            {/*<form className="form " id="payment-form2">*/}
            {/*    <div className="row">*/}
            {/*        <div className="col-md-6">*/}
            {/*            <div className="input-container">*/}
            {/*                <input type="text" name="name" id="register-name" required*/}
            {/*                       autoFocus />*/}
            {/*                    <label>First name</label>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <div className="col-md-6">*/}
            {/*            <div className="input-container {{ $errors->has('last_name') ? ' has-error' : '' }}">*/}
            {/*                <span className="help-block">*/}
            {/*                                <strong></strong>*/}
            {/*                            </span>*/}
            {/*                <input type="text" name="last_name" required />*/}
            {/*                    <label>Last Name</label>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <div className="row">*/}
            {/*        <div className="col-md-12">*/}
            {/*            <div className="input-container {{ $errors->has('email') ? ' has-error' : '' }}">*/}
            {/*                <input type="text" name="email" id="register-email"*/}
            {/*                       required/>*/}
            {/*                    <label>Email Address</label>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <div className="row">*/}
            {/*        <div className="col-md-12">*/}
            {/*            <div className="input-container">*/}
            {/*                <input type="password" name="password" required />*/}
            {/*                    <label>Password</label>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}

            {/*    <div className="row">*/}
            {/*        <div className="col-md-12">*/}
            {/*            <button id="complete_registration" type="submit" className="submit">Create your account</button>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <div className="form-details">*/}
            {/*        By clicking “Create Your Account” you are agreeing to our <a href="#">Terms of*/}
            {/*        Service</a>*/}
            {/*        and have read through our <a href="#">Privacy Statement</a>.*/}
            {/*    </div>*/}
            {/*    <div className="row payments-row">*/}
            {/*        <div className="col-md-5">*/}
            {/*            <div className="row">*/}
            {/*                <div className="col-md-6">*/}
            {/*                    <img src="img/scrill.svg" alt="scrill" />*/}
            {/*                </div>*/}
            {/*                <div className="col-md-6">*/}
            {/*                    <img src="img/visa.svg" alt="visa" />*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}

            {/*        <div className="col-md-7">*/}
            {/*            <p>*/}
            {/*                This is a secure 128-bit ssl encrypted*/}
            {/*                payment*/}
            {/*            </p>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</form>*/}

const RegisterForm = Form.create({ name: 'normal_login' })(WrappedRegisterForm);
export default RegisterForm;
