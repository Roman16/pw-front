import React, {Component, useState} from "react";
import {CardNumberElement, CardExpiryElement, CardCvcElement} from 'react-stripe-elements';
import {injectStripe} from "react-stripe-elements";
import lockIcon from '../../../../assets/img/icons/lock.svg';
import visaLogo from '../../../../assets/img/visa-logo.svg';
import mastercardLogo from '../../../../assets/img/mastercard.svg';
import discoverLogo from '../../../../assets/img/discover.svg';
import americanExpressLogo from '../../../../assets/img/american-express.svg';
import stripeLogo from '../../../../assets/img/stripe-logo.svg';
import {Input, Select} from "antd";
import {userService} from "../../../../services/user.services";
import {allCountries} from "../../../../utils/countries";
import {states} from "../../../../utils/states";

const {Option} = Select;

const CardNumberElementStyles = {
    base: {
        fontSize: '13px',
        letterSpacing: '-0.4375px',
    }
};

const StripeForm = (props) => {
    const {stripeElementChange, handleSubmit, onClose, handleChangeInput, countriesList, onChangeSelect, paymentDetails} = props;
    return (
        <form onSubmit={handleSubmit}>
            <div className="card-container">
                <div className="card-container__card">
                    <label className="label">Credit card</label>
                    <CardNumberElement
                        placeholder='**** **** **** ****'
                        style={CardNumberElementStyles}
                        onChange={(element) => stripeElementChange(element, 'card_number')}
                    />
                </div>

                <div className='row'>
                    <div className="card-container__expiry">
                        <label className="label">Expiry</label>
                        <CardExpiryElement
                            style={CardNumberElementStyles}
                            onChange={(element) => stripeElementChange(element, 'expiry')}
                        />
                    </div>
                    <div className="card-container__cvc">
                        <label className="label">CVC</label>
                        <CardCvcElement
                            style={CardNumberElementStyles}
                            onChange={(element) => stripeElementChange(element, 'cvc')}
                        />
                    </div>

                    <img src={lockIcon} alt=""/>

                    <p>
                        this is a secure 128-bit ssl encrypted <br/> payment
                    </p>
                </div>
            </div>

            <div className='logo-block'>
                <img src={visaLogo} alt=""/>
                <img src={mastercardLogo} alt=""/>
                <img src={discoverLogo} alt=""/>
                <img src={americanExpressLogo} alt=""/>
                <img src={stripeLogo} alt=""/>
            </div>

            <div className='billing-address-block'>
                <h4>Billing Address</h4>

                <div className="row">
                    <div className="form-group">
                        <label>First Name</label>
                        <Input
                            className="form-control"
                            type="text"
                            name="first_name"
                            placeholder="First Name"
                            // value={userInformation.name}
                            onChange={handleChangeInput}
                        />
                    </div>

                    <div className="form-group">
                        <label>Last Name</label>
                        <Input
                            className="form-control"
                            type="text"
                            name="last_name"
                            placeholder="Last Name"
                            // value={userInformation.name}
                            onChange={handleChangeInput}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="form-group">
                        <label>Address</label>
                        <Input
                            className="form-control"
                            type="text"
                            name="line1"
                            placeholder="Address"
                            // value={userInformation.name}
                            onChange={handleChangeInput}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="form-group">
                        <label>City</label>
                        <Input
                            className="form-control"
                            type="text"
                            name="city"
                            placeholder="City"
                            // value={userInformation.name}
                            onChange={handleChangeInput}
                        />
                    </div>

                    <div className="form-group">
                        <label>Zip</label>
                        <Input
                            className="form-control"
                            type="text"
                            name="postal_code"
                            placeholder="Zip"
                            // value={userInformation.name}
                            onChange={handleChangeInput}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="form-group">
                        <label>Country</label>
                        <Select onChange={onChangeSelect('country')} placeholder='Country'>
                            {countriesList.map(item => (
                                <Option key={item.id}>{allCountries[item.id]}</Option>
                            ))}
                        </Select>

                    </div>

                    {paymentDetails.country === 'US' && <div className="form-group">
                        <label>State</label>
                        <Select onChange={onChangeSelect('state')} placeholder='State'>
                            {states.map(item => (
                                <Option key={item.abbreviation}>{item.name}</Option>
                            ))}
                        </Select>
                    </div>}
                </div>
            </div>

            <div className='button-block'>
                <button className='btn cancel' type='button' onClick={onClose}>Cancel</button>
                <button className='btn green-btn'>Save</button>
            </div>
        </form>
    )
};


class UpdateCard extends Component {
    state = {
        countriesList: [],

        paymentDetails: {
            first_name: '',
            last_name: '',
            line1: '',
            city: '',
            state: '',
            country: '',
            postal_code: '',
        },
        card_number: false,
        expiry: false,
        cvc: false,
    };

    stripeElementChange = (element, name) => {
        if (!element.empty && element.complete) {
            this.setState({
                [name]: true
            });
        }
    };

    handleChangeInput = ({target: {name, value}}) => {
        this.setState({
            ...this.state,
            paymentDetails: {
                ...this.state.paymentDetails,
                [name]: value
            }
        })
    };

    handleChangeSelect = (name) => (value) => {
        this.setState({
            ...this.state,
            paymentDetails: {
                ...this.state.paymentDetails,
                [name]: value
            }
        })
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const {
                paymentDetails: {
                    first_name,
                    last_name,
                    line1,
                    city,
                    state,
                    country,
                    postal_code,
                },
                paymentDetails
            } = this.state,
            {card, onSubmit} = this.props;

        try {
            if (card) {
                onSubmit({
                    ...paymentDetails,
                    stripe_token: card.token
                })
            } else {
                const billing_details = {};
                if (first_name || last_name) {
                    billing_details.name = `${first_name && `${first_name} `}${last_name}`;
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

                billing_details.address && Object.keys( billing_details.address).forEach((key) => !billing_details.address[key] && delete billing_details.address[key]);

                const res = await this.props.stripe.createPaymentMethod('card', {billing_details});
                console.log(res);
                onSubmit({
                    ...paymentDetails,
                    stripe_token: res.paymentMethod.id
                })
            }
        } catch (e) {
            console.log(e);
        }
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        // console.log(this.props);
    }


    componentDidMount() {
        userService.getStripeAvailableCountries(this.props.stripe.key)
            .then(res => {
                this.setState({countriesList: res.data.data})
            });
    }

    render() {
        const {onClose} = this.props,
            {countriesList, paymentDetails} = this.state;

        return (
            <div className='drawer-window add-card-window update-card-info'>
                <button className="close-btn" type="button" onClick={onClose}>
                    &#215;
                </button>

                <h3>Update Payment Method</h3>

                <h4>Credit Card Information</h4>

                <StripeForm
                    stripeElementChange={this.stripeElementChange}
                    handleSubmit={this.handleSubmit}
                    handleChangeInput={this.handleChangeInput}
                    onClose={onClose}
                    countriesList={countriesList}
                    onChangeSelect={this.handleChangeSelect}
                    paymentDetails={paymentDetails}
                />
            </div>
        )
    }
}

export default injectStripe(UpdateCard);