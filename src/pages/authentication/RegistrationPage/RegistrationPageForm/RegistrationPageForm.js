import React from 'react';
import {Col, Form, notification, Row, Spin} from 'antd';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../../../../actions/user.actions';
import {Elements, StripeProvider} from "react-stripe-elements";
import StripeForm from "./StripeForm";

class RegistrationPage extends React.Component {
    state = {
        name: '',
        last_name: '',
        email: '',
        password: '',
        // card: null,
        // expiry: null,
        // cvc: null,
        registerSuccess: false,
        isLoading: false
    };

    onSubmit = e => {
        e.preventDefault();

        const {
            name,
            last_name,
            email,
            password
            // card,
            // expiry,
            // cvc
        } = this.state;

        // eslint-disable-next-line no-useless-escape
        const fieldEmailValid = /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/.test(
            email
        );

        this.setState({
            isLoading: true
        });
        if (password.length < 6) {
            notification.error({
                message: 'The password must be at least 6 characters.',
                style: {
                    width: 600,
                    marginLeft: 335 - 600
                },
                placement: 'bottomRight',
                bottom: 20,
                duration: 5
            });
            this.setState({
                isLoading: false
            });
            return;
        } else if (!fieldEmailValid) {
            notification.error({
                message: 'Invalid email address',
                style: {
                    width: 600,
                    marginLeft: 335 - 600
                },
                placement: 'bottomRight',
                bottom: 20,
                duration: 5
            });
            this.setState({
                isLoading: false
            });
            return;
        }

        this.props.regist({
            name,
            last_name,
            email,
            password
            // card,
            // expiry,
            // cvc
        });

        this.setState({
            isLoading: false
        });
    };

    onChange = ({ target }) => {
        this.setState({ [target.name]: target.value });
    };

    render() {
        const {
            name,
            last_name,
            email,
            password,
            // card,
            // expiry,
            // cvc,
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

        const stripeKey = process.env.STRIPE_PUBLISHABLE_KEY_TEST;

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

                {/*<StripeProvider apiKey={stripeKey}">*/}
                {/*    <Elements>*/}
                {/*        <StripeForm/>*/}
                {/*    </Elements>*/}
                {/*</StripeProvider>*/}


                {/* credit card */}
                {/* <div className="form-title">Billing Information</div>
                <Row>
                    <Col xs={24} sm={24} md={16}>
                        <div className="input-container">
                            <input
                                type="number"
                                name="card"
                                id="register-card"
                                value={card}
                                onChange={this.onChange}
                                required
                            /> */}
                {/* eslint-disable-next-line max-len */}
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control,jsx-a11y/label-has-for */}
                {/* <label className="label">Credit card</label>
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={4}>
                        <div className="input-container">
                            <input
                                type="number"
                                name="expiry"
                                id="register-expiry"
                                value={expiry}
                                onChange={this.onChange}
                                required
                            /> */}
                {/* eslint-disable-next-line max-len */}
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control,jsx-a11y/label-has-for */}
                {/* <label className="label">Expiry</label>
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={4}>
                        <div className="input-container">
                            <input
                                type="number"
                                name="cvc"
                                id="register-cvc"
                                value={cvc}
                                onChange={this.onChange}
                                required
                            /> */}
                {/* eslint-disable-next-line max-len */}
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control,jsx-a11y/label-has-for */}
                {/* <label className="label">CVC</label>
                        </div>
                    </Col>
                </Row> */}

                {/* button submit */}
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

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    regist: user => {
        dispatch(userActions.regist(user));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegistrationPage);

// export default RegistrationPage;
