import React, {Component} from 'react';
import {Col, Row, Spin} from 'antd';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {notification} from '../../../../components/Notification';

import {userActions} from '../../../../actions/user.actions';
import {injectStripe} from "react-stripe-elements";
import StripeForm from "./StripeForm";

class RegistrationPage extends Component {
    state = {
        name: '',
        last_name: '',
        email: '',
        password: '',
        confirmPassword: '',

        line1: '',
        city: '',
        state: '',
        country: '',
        postal_code: '',

        stripe_token: null,
        registerSuccess: false,
        isLoading: false,
        card_number: false,
        expiry: false,
        cvc: false,

        autofocus: true,
    };


    onSubmit = async (e) => {
        e.preventDefault();

        if (!this.props.notFirstEntry) {
            this.props.resetState()
        }

        const {
            name,
            last_name,
            email,
            password,
            confirmPassword,
            card_number,
            expiry,
            cvc,

            line1,
            city,
            state,
            country,
            postal_code,

            stripe_token,
        } = this.state;

        // eslint-disable-next-line no-useless-escape
        const fieldEmailValid = /^([a-zA-Z0-9_\.-]+)@([a-zA-Z0-9_\.-]+)\.([a-zA-Z\.]{2,6})$/.test(
            email
        );

        // this.setState({
        //     isLoading: true
        // });

        if (!name) {
            notification.error({
                title: 'Name must be filled out.',
            });
            return;
        } else if (password.length < 6) {
            notification.error({
                title: 'The password must be at least 6 characters.',
            });
            this.setState({
                isLoading: false
            });
            return;
        } else if (!fieldEmailValid) {
            notification.error({
                title: 'Invalid email address',
            });
            this.setState({
                isLoading: false
            });
            return;
            // else if (!card_number) {
            //     notification.error({
            //         title: 'Card number is required field'
            //     });
            // } else if (!expiry) {
            //     notification.error({
            //         title: 'Expiry is required field'
            //     });
            // } else if (!cvc) {
            //     notification.error({
            //         title: 'CVC number is required field'
            //     });
            // }
        } else if (password !== confirmPassword) {
            notification.error({
                title: 'Your passwords don’t match',
            });
            this.setState({
                isLoading: false
            });
            return;
        } else {
            // try {

            const billing_details = {};

            if (name) {
                billing_details.name = name + ' ' + last_name;
            }
            if (line1 || city || state || country || postal_code) {
                billing_details.address = {
                    line1,
                    city,
                    state,
                    country,
                    postal_code
                }
            }

            billing_details.address && Object.keys(billing_details.address).forEach((key) => !billing_details.address[key] && delete billing_details.address[key]);

            // let res = stripe_token ? stripe_token : await this.props.stripe.createPaymentMethod('card', {billing_details});

            // this.setState({stripe_token: res}, () => {
            //         res.paymentMethod ?
            //             this.props.regist({
            //                 name,
            //                 last_name,
            //                 email,
            //                 password,
            //                 stripe_token: res.paymentMethod ? res.paymentMethod.id : null,
            //             })
            //             :
            //             this.props.regist({
            //                 name,
            //                 last_name,
            //                 email,
            //                 password,
            //             });
            //     }
            // );

            this.props.regist({
                name,
                last_name,
                email,
                password,
            });
        }

        // } catch (e) {
        //     console.log(e);
        // }
    };

    stripeElementChange = (element, name) => {
        if (!element.empty && element.complete) {
            this.setState({
                [name]: true,
                autofocus: true
            });
        }
    };

    handleBlurCardElement = () => {
        this.setState({
            autofocus: false
        })
    };

    handleChangeCountry = (country) => this.setState({country: country});
    handleChangeState = (state) => this.setState({address_state: state});
    onChange = ({target: {name, value}}) => this.setState({[name]: value});

    componentDidMount() {
        this.setState({isLoading: false});
    }

    render() {
        const {
            name,
            last_name,
            email,
            password,
            confirmPassword,
            registerSuccess,
            isLoading,
            country,
            card_number,
            expiry,
            cvc,
            autofocus
        } = this.state;

        if (isLoading) {
            return (
                <div className="example">
                    <Spin size="large"/>
                </div>
            );
        }

        if (registerSuccess) {
            return <Redirect to="/optimization"/>;
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
                            />
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
                            />
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
                            <label className="label">Password</label>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col xs={24} sm={24} md={24}>
                        <div className="input-container">
                            <input
                                type="password"
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={this.onChange}
                                required
                            />
                            <label className="label">Repeat your password</label>
                        </div>
                    </Col>

                </Row>

                {/*<StripeForm*/}
                {/*    onSubmit={this.onSubmit}*/}
                {/*    onChangeCountry={this.handleChangeCountry}*/}
                {/*    onChangeState={this.handleChangeState}*/}
                {/*    onChangeInput={this.onChange}*/}
                {/*    stripeElementChange={this.stripeElementChange}*/}
                {/*    onBlurCardElement={this.handleBlurCardElement}*/}

                {/*    cardNumber={card_number}*/}
                {/*    expiry={expiry}*/}
                {/*    cvc={cvc}*/}

                {/*    autofocus={autofocus}*/}
                {/*/>*/}

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
                {/*<Row className="payments-row">*/}
                {/*    <Col xs={24} sm={24} md={10}>*/}
                {/*        <Row type="flex">*/}
                {/*            <Col xs={12} sm={12} md={12}>*/}
                {/*                <img src="/scrill.svg" alt="scrill"/>*/}
                {/*            </Col>*/}
                {/*            <Col xs={12} sm={12} md={12}>*/}
                {/*                <img src="/visa.svg" alt="visa"/>*/}
                {/*            </Col>*/}
                {/*        </Row>*/}
                {/*    </Col>*/}
                {/*    <Col xs={24} sm={24} md={14}>*/}
                {/*        <p>This is a secure 128-bit ssl encrypted payment</p>*/}
                {/*    </Col>*/}
                {/*</Row>*/}
            </form>
        );
    }
}

const mapStateToProps = state => ({
    notFirstEntry: state.user.notFirstEntry
});

const mapDispatchToProps = dispatch => ({
    regist: user => {
        dispatch(userActions.regist(user));
    },
    resetState: () => {
        dispatch(userActions.reSetState())
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectStripe(RegistrationPage));
