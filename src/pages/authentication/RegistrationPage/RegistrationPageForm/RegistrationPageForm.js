import React, {Component} from 'react';
import {Col, Row, Spin} from 'antd';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {notification} from '../../../../components/Notification';

import {userActions} from '../../../../actions/user.actions';
import {injectStripe} from "react-stripe-elements";
import StripeForm from "./StripeForm";

const stripeKey = process.env.STRIPE_PUBLISHABLE_KEY_TEST || 'pk_test_TYooMQauvdEDq54NiTphI7jx';

class RegistrationPage extends Component {
    state = {
        name: '',
        last_name: '',
        email: '',
        password: '',
        address_line1: '',
        address_city: '',
        address_state: '',
        address_country: '',
        address_zip: '',
        stripe_token: null,
        registerSuccess: false,
        isLoading: false,
        card_number: false,
        expiry: false,
        cvc: false,
    };

    onSubmit = async (e) => {
        e.preventDefault();

        const {
            name,
            last_name,
            email,
            password,
            card_number,
            expiry,
            cvc,
            address_line1,
            address_city,
            address_state,
            address_country,
            address_zip,
            stripe_token
        } = this.state;

        // eslint-disable-next-line no-useless-escape
        const fieldEmailValid = /^([a-zA-Z0-9_\.-]+)@([a-zA-Z0-9_\.-]+)\.([a-zA-Z\.]{2,6})$/.test(
            email
        );

        // this.setState({
        //     isLoading: true
        // });

        if (password.length < 6) {
            notification.error({
                message: 'The password must be at least 6 characters.',
            });
            this.setState({
                isLoading: false
            });
            return;
        } else if (!fieldEmailValid) {
            notification.error({
                message: 'Invalid email address',
                duration: 3
            });
            this.setState({
                isLoading: false
            });
            return;
        } else if (!card_number) {
            notification.error({
                message: 'Card number is required field'
            });
        } else if (!expiry) {
            notification.error({
                message: 'Expiry is required field'
            });
        } else if (!cvc) {
            notification.error({
                message: 'CVC number is required field'
            });
        } else {
            try {
                let res = stripe_token ? stripe_token : await this.props.stripe.createToken({
                    address_line1,
                    address_city,
                    address_state,
                    address_country,
                    address_zip
                });

                this.setState({stripe_token: res},
                    this.props.regist({
                        name,
                        last_name,
                        email,
                        password,
                        stripe_token: res.token.id
                    }));
            } catch (e) {
                console.log(e);
            }
        }
    };

    stripeElementChange = (element, name) => {
        if (!element.empty && element.complete) {
            this.setState({[name]: true});
        }
    };


    handleChangeCountry = (country) => this.setState({address_country: country});
    handleChangeState = (state) => this.setState({address_state: state});
    onChange = ({target: {name, value}}) => this.setState({[name]: value});

    render() {
        const {
            name,
            last_name,
            email,
            password,
            registerSuccess,
            isLoading
        } = this.state;

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

        const isLess = email.length === 0;

        return (
            <form className="form " id="payment-form2" onSubmit={this.onSubmit}>
                <Row>
                    <Col xs={24} sm={24} md={12}>
                        <div className="input-container">
                            <input
                                type="text"
                                name="name"
                                id="register-name"
                                value={name}
                                onChange={this.onChange}
                                required
                            />
                            {/* eslint-disable-next-line max-len */}
                            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control,jsx-a11y/label-has-for */}
                            <label className="label">First name</label>
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                        <div className="input-container">
                            <input
                                type="text"
                                name="last_name"
                                value={last_name}
                                onChange={this.onChange}
                                required
                            />
                            {/* eslint-disable-next-line max-len */}
                            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control,jsx-a11y/label-has-for */}
                            <label className="label">Last Name</label>
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
                                value={email}
                                onChange={this.onChange}
                                // pattern="([a-z0-9_.-]+)@([a-z0-9_.-]+).([a-z.]{2,6})"
                                required
                            />
                            {/* eslint-disable-next-line max-len */}
                            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control,jsx-a11y/label-has-for */}
                            <label
                                className={`${
                                    isLess ? 'label' : 'label-email'
                                }`}
                            >
                                Email Address
                            </label>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col xs={24} sm={24} md={24}>
                        <div className="input-container">
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={this.onChange}
                                required
                            />
                            {/* eslint-disable-next-line max-len */}
                            {/* eslint-disable-next-line jsx-a11y/label-has-for,jsx-a11y/label-has-associated-control */}
                            <label className="label">Password</label>
                        </div>
                    </Col>
                </Row>

                <StripeForm
                    onSubmit={this.onSubmit}
                    onChangeCountry={this.handleChangeCountry}
                    onChangeState={this.handleChangeState}
                    onChangeInput={this.onChange}
                    stripeElementChange={this.stripeElementChange}
                />

                <Row>
                    <Col xs={24} sm={24} md={24}>
                        <button type='submit'
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

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    regist: user => {
        dispatch(userActions.regist(user));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectStripe(RegistrationPage));

// export default RegistrationPage;
