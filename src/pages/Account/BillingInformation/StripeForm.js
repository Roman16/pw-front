import React, {Component} from "react"
import cardInfoIcon from "../../../assets/img/account/credi-card-information-icon.svg"
import {CardCvcElement, CardExpiryElement, CardNumberElement, injectStripe} from "react-stripe-elements"
import billingInfoIcon from "../../../assets/img/account/billing-information-icon.svg"
import {Input, Select} from "antd"
import CustomSelect from "../../../components/Select/Select"
import {countries} from "../../../utils/countries"

const {Option} = Select

const CardNumberElementStyles = {
    base: {
        fontSize: '13px',
        letterSpacing: '-0.4375px',
    }
}

class StripeForm extends Component {
    render() {
        const {card, isNewCard} = this.props

        return (<>
            <div className="container">
                <i>
                    <img src={cardInfoIcon} alt=""/>
                </i>

                <div className="col">
                    <h3>Credit Card information</h3>
                    <p>You can update your credit card information here.</p>

                    <div className="form-group">
                        <label className="label">Credit card</label>
                        <CardNumberElement
                            placeholder='**** **** **** ****'
                            style={CardNumberElementStyles}
                            disabled={!isNewCard}
                            // onChange={(element) => stripeElementChange(element, 'card_number')}
                        />

                        {/*<div className='disabled-card-number fake-card-field'>*/}
                        {/*      **** **** **** {selectedCard.last4}*/}
                        {/*  </div>*/}
                    </div>

                    <div className="form-group card-container__expiry">
                        <label className="label">Expiry</label>
                        <CardExpiryElement
                            style={CardNumberElementStyles}
                            disabled={!isNewCard}

                            // ref={(instance) => {
                            //     (autofocus && cardNumber && instance && !expiry) && instance._element.focus()
                            // }}
                            // onChange={(element) => stripeElementChange(element, 'expiry')}
                            // onBlur={onBlurCardElement}
                        />

                        {/* <div className='disabled-card-number fake-card-field'>*/}
                        {/*    {selectedCard.exp_month}/{moment(selectedCard.exp_year, 'YYYY').format('YY')}*/}
                        {/*</div>*/}
                    </div>

                    <div className="form-group card-container__cvc">
                        <label className="label">CVC</label>
                        <CardCvcElement
                            style={CardNumberElementStyles}
                            disabled={!isNewCard}

                            // ref={(instance) => {
                            //     (autofocus && expiry && instance && !cvc) && instance._element.focus();
                            // }}
                            // onChange={(element) => stripeElementChange(element, 'cvc')}
                            // onBlur={onBlurCardElement}
                        />

                        {/*<div className='disabled-card-number fake-card-field'>*/}
                        {/*    ****/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>

            <div className="container">
                <i>
                    <img src={billingInfoIcon} alt=""/>
                </i>

                <div className="col">
                    <h3>Billing Information</h3>
                    <p>You can update your billing information here.</p>

                    <div className="form-group">
                        <label htmlFor="">Full Name</label>
                        <Input
                            type="text"
                            placeholder={'Full Name'}
                            value={card.name}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Billing Address</label>
                        <Input
                            type="text"
                            placeholder={'Billing Address'}
                            value={card.line1}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">City / Zip Code</label>
                        <Input
                            type="text"
                            placeholder={'City'}
                            value={card.city}
                        />
                        <Input
                            type="text"
                            placeholder={'Zip Code'}
                            value={card.postal_code}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Country</label>

                        <CustomSelect
                            // onChange={onChangeSelect('country')}
                            placeholder='Country'
                            showSearch
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            value={card.country}>
                            {countries.map(item => (
                                <Option key={item.code} value={item.code}>{item.name}</Option>
                            ))}
                        </CustomSelect>
                    </div>

                    <button className="btn default">
                        {isNewCard ? 'Add Payment Method' : 'Save Changes'}
                    </button>
                </div>
            </div>
        </>)

    }
}

export default injectStripe(StripeForm)
