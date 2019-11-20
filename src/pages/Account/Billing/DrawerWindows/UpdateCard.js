import React, {Component, useState} from "react";
import {CardNumberElement, CardExpiryElement, CardCvcElement} from 'react-stripe-elements';
import {injectStripe} from "react-stripe-elements";
import lockIcon from '../../../../assets/img/icons/lock.svg';
import visaLogo from '../../../../assets/img/visa-logo.svg';
import mastercardLogo from '../../../../assets/img/mastercard.svg';
import discoverLogo from '../../../../assets/img/discover.svg';
import americanExpressLogo from '../../../../assets/img/american-express.svg';
import stripeLogo from '../../../../assets/img/stripe-logo.svg';
import {Input} from "antd";
import {userService} from "../../../../services/user.services";

const CardNumberElementStyles = {
    base: {
        fontSize: '13px',
        letterSpacing: '-0.4375px',
    }
};

const StripeForm = (props) => {
    const {stripeElementChange, handleSubmit, onClose, handleChangeInput} = props;
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
                            name="address_line1"
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
                            name="address_city"
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
                            name="address_zip"
                            placeholder="Zip"
                            // value={userInformation.name}
                            onChange={handleChangeInput}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="form-group">
                        <label>Country</label>
                        <Input
                            className="form-control"
                            type="text"
                            name="address_country"
                            placeholder="Country"
                            // value={userInformation.name}
                            onChange={handleChangeInput}
                        />
                    </div>

                    <div className="form-group">
                        <label>State</label>
                        <Input
                            className="form-control"
                            type="text"
                            name="address_state"
                            placeholder="State"
                            // value={userInformation.name}
                            onChange={handleChangeInput}
                        />
                    </div>
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
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        address_line1: '',
        address_city: '',
        address_state: '',
        address_country: '',
        address_zip: '',

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
            [name]: value
        })
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const {
            first_name,
            last_name,
            email,
            password,
            address_line1,
            address_city,
            address_state,
            address_country,
            address_zip,
        } = this.state;

        try {
            const res = await this.props.stripe.createToken({
                name: `${first_name} ${last_name}`,
                address_line1,
                address_city,
                address_state,
                address_country,
                address_zip
            });

            this.props.onSubmit({
                first_name,
                last_name,
                email,
                password,
                address_line1,
                address_city,
                address_state,
                address_country,
                address_zip,
                stripe_token: res.token.id
            })
        } catch (e) {
            console.log(e);
        }
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(this.props);
    }

    render() {
        const {onClose} = this.props,
            {card_number,expiry} = this.state;

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
                />
            </div>
        )
    }
}

export default injectStripe(UpdateCard);