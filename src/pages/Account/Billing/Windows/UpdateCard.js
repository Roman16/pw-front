import React, {Component, useState} from "react";
import {CardNumberElement, CardExpiryElement, CardCvcElement} from 'react-stripe-elements';
import {injectStripe} from "react-stripe-elements";
import lockIcon from '../../../../assets/img/icons/lock.svg';
import visaLogo from '../../../../assets/img/visa-logo.svg';
import mastercardLogo from '../../../../assets/img/mastercard.svg';
import discoverLogo from '../../../../assets/img/discover.svg';
import americanExpressLogo from '../../../../assets/img/american-express.svg';
import stripeLogo from '../../../../assets/img/stripe-logo.svg';
import {Input, Select, InputNumber} from "antd";
import {userService} from "../../../../services/user.services";
import {allCountries} from "../../../../utils/countries";
import {states} from "../../../../utils/states";
import moment from "moment";

const {Option} = Select;

const CardNumberElementStyles = {
    base: {
        fontSize: '13px',
        letterSpacing: '-0.4375px',
    }
};

const StripeForm = (props) => {
    const {onBlurCardElement, stripeElementChange, handleSubmit, onClose, handleChangeInput, countriesList, onChangeSelect, paymentDetails, selectedCard, cardNumber, expiry, cvc, autofocus} = props;
    return (
        <form onSubmit={handleSubmit}>
            <div className="card-container">
                <div className="card-container__card">
                    <label className="label">Credit card</label>
                    {!selectedCard.id && <CardNumberElement
                        placeholder='**** **** **** ****'
                        style={CardNumberElementStyles}
                        onChange={(element) => stripeElementChange(element, 'card_number')}
                    />}

                    {selectedCard.id && <div className='disabled-card-number fake-card-field'>
                        **** **** **** {selectedCard.last4}
                    </div>}
                </div>

                <div className='row'>
                    <div className="card-container__expiry">
                        <label className="label">Expiry</label>
                        {!selectedCard.id && <CardExpiryElement
                            style={CardNumberElementStyles}
                            ref={(instance) => {
                                (autofocus && cardNumber && instance && !expiry) && instance._element.focus()
                            }}
                            onChange={(element) => stripeElementChange(element, 'expiry')}
                            onBlur={onBlurCardElement}
                        />}

                        {selectedCard.id && <div className='disabled-card-number fake-card-field'>
                            {selectedCard.exp_month}/{moment(selectedCard.exp_year, 'YYYY').format('YY')}
                        </div>}
                    </div>

                    <div className="card-container__cvc">
                        <label className="label">CVC</label>
                        {!selectedCard.id && <CardCvcElement
                            style={CardNumberElementStyles}
                            ref={(instance) => {
                                (autofocus && expiry && instance && !cvc) && instance._element.focus();
                            }}
                            onChange={(element) => stripeElementChange(element, 'cvc')}
                            onBlur={onBlurCardElement}
                        />}

                        {selectedCard.id && <div className='disabled-card-number fake-card-field'>
                            ***
                        </div>}
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
                    <div className="form-group w-100">
                        <label>Full Name</label>
                        <Input
                            className="form-control"
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={paymentDetails.name}
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
                            value={paymentDetails.line1}
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
                            value={paymentDetails.city}
                            onChange={handleChangeInput}
                        />
                    </div>

                    <div className="form-group">
                        <label>Zip</label>
                        <Input
                            className="form-control"
                            type="number"
                            name="postal_code"
                            placeholder="Zip"
                            value={paymentDetails.postal_code}
                            onChange={handleChangeInput}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="form-group">
                        <label>Country</label>
                        <Select onChange={onChangeSelect('country')} placeholder='Country'
                                showSearch
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                value={paymentDetails.country}>
                            {countriesList.map(item => (
                                <Option key={item.id}>{allCountries[item.id]}</Option>
                            ))}
                        </Select>
                    </div>

                    {/*{paymentDetails.country === 'US' && <div className="form-group">*/}
                    {/*    <label>State</label>*/}
                    {/*    <Select onChange={onChangeSelect('state')} placeholder='State' value={paymentDetails.state}>*/}
                    {/*        {states.map(item => (*/}
                    {/*            <Option key={item.abbreviation}>{item.name}</Option>*/}
                    {/*        ))}*/}
                    {/*    </Select>*/}
                    {/*</div>}*/}
                    <div className="form-group">
                        <label>State</label>
                        <Input
                            className="form-control"
                            type="text"
                            name="state"
                            placeholder="State"
                            value={paymentDetails.state}
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
        countriesList: [],

        paymentDetails: {
            name: '',
            line1: '',
            city: '',
            state: '',
            country: '',
            postal_code: '',
        },
        autofocus: true,
        selectedCard: {},
        card_number: false,
        expiry: false,
        cvc: false,
    };

    handleBlurCardElement = () => {
        this.setState({
            autofocus: false
        })
    };

    stripeElementChange = (element, name) => {
        if (!element.empty && element.complete) {
            this.setState({
                [name]: true,
                autofocus: true
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
                    name,
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
                    id: card.id,
                    stripe_token: card.id
                })
            } else {
                const billing_details = {};
                if (name) {
                    billing_details.name = name;
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

                const res = await this.props.stripe.createPaymentMethod('card', {billing_details});

                onSubmit({
                    ...paymentDetails,
                    stripe_token: res.paymentMethod.id
                })
                    .then(() => {
                        this.props.stripe.handleCardAction(
                            'pi_1FjttzJzUVfwvcYwq2nWSUuy_secret_BhymwhXpe6qEVMhvBRFmv8eze'
                        ).then(res => {
                            console.log(res);
                        });
                    })
            }
        } catch (e) {
            console.log(e);
        }
    };


    componentDidMount() {
        if (this.props.card.id) {
            this.setState({
                paymentDetails: this.props.card.address.address,
                selectedCard: this.props.card,
            });
        }

        userService.getStripeAvailableCountries(this.props.stripe.key)
            .then(res => {
                this.setState({countriesList: res.data.data})
            });
    }

    render() {
        const {onClose} = this.props,
            {
                countriesList, paymentDetails, selectedCard, card_number, expiry, cvc, autofocus
            } = this.state;

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
                    onChangeSelect={this.handleChangeSelect}
                    onBlurCardElement={this.handleBlurCardElement}

                    onClose={onClose}
                    countriesList={countriesList}
                    paymentDetails={paymentDetails}
                    selectedCard={selectedCard}

                    cardNumber={card_number}
                    expiry={expiry}
                    cvc={cvc}

                    autofocus={autofocus}
                />
            </div>
        )
    }
}

export default injectStripe(UpdateCard);