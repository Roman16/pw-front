import React, {Component} from "react"
import cardInfoIcon from "../../../assets/img/account/credi-card-information-icon.svg"
import {CardCvcElement, CardExpiryElement, CardNumberElement, injectStripe} from "react-stripe-elements"
import billingInfoIcon from "../../../assets/img/account/billing-information-icon.svg"
import {Checkbox, Input, Select, Spin} from "antd"
import CustomSelect from "../../../components/Select/Select"
import {countries} from "../../../utils/countries"
import visaLogo from '../../../assets/img/account/visa-logo.svg'
import masterLogo from '../../../assets/img/account/master-card-logo.svg'
import americanExpressLogo from '../../../assets/img/account/american-express-logo.svg'
import discoverLogo from '../../../assets/img/account/discover-logo.svg'
import stripeLogo from '../../../assets/img/account/stripe-logo.svg'
import {SVG} from "../../../utils/icons"
import moment from 'moment'
import {expiresFormat} from "../../../utils/expiresFormat"
import InformationTooltip from "../../../components/Tooltip/Tooltip"

const {Option} = Select

const CardNumberElementStyles = {
    base: {
        color: '#5B586F',
        fontWeight: '300',
        fontSize: window.devicePixelRatio === 2 ? '12px' : '14px',
        height: '32px',
        '::placeholder': {
            color: 'rgba(101, 106, 132, 0.4)',
        },
    }
}

const checkChanges = (prevState, currentState) => {
    return JSON.stringify({
        name: currentState.name,
        country: currentState.country,
        postal_code: currentState.postal_code,
        city: currentState.city,
        line1: currentState.line1,
        default: currentState.defaultCard,
        expiry: currentState.expiry,
    }) === JSON.stringify({
        name: prevState.name,
        country: prevState.country,
        postal_code: prevState.postal_code,
        city: prevState.city,
        line1: prevState.line1,
        default: prevState.default,
        expiry: `${prevState.exp_month}/${moment(prevState.exp_year, 'YYYY').format('YY')}`,
    })
}

class StripeForm extends Component {
    state = {
        localProcessing: false,
        paymentDetails: {
            id: '',
            name: '',
            line1: '',
            city: '',
            state: '',
            country: undefined,
            postal_code: '',
        },
        autofocus: true,
        selectedCard: {},
        card_number: false,
        expiry: false,
        cvc: false,
        defaultCard: true,
        errorFields: []
    }

    handleBlurCardElement = () => {
        this.setState({
            autofocus: false
        })
    }

    stripeElementChange = (element, name) => {
        this.setState(prevState => ({errorFields: prevState.errorFields.filter(i => i !== name)}))

        if (!element.empty && element.complete) {
            this.setState({
                [name]: true,
                autofocus: true
            })
        }
    }

    handleChangeInput = ({target: {name, value}}) => {
        this.setState({
            ...this.state,
            paymentDetails: {
                ...this.state.paymentDetails,
                [name]: name === 'expiry' ? expiresFormat(value) : value
            }
        })
    }

    handleChangeSelect = (value) => {
        this.setState({
            ...this.state,
            paymentDetails: {
                ...this.state.paymentDetails,
                country: value
            }
        })
    }

    changeDefaultHandler = () => {
        this.setState({defaultCard: !this.state.defaultCard})
    }

    handleSubmit = async () => {
        this.setState({
            localProcessing: true
        })

        const {
                paymentDetails: {
                    name,
                    line1,
                    city,
                    state,
                    country,
                    postal_code,
                    expiry
                },
                paymentDetails,
                defaultCard,
            } = this.state,
            {card, onAddCard, onUpdateCard} = this.props

        try {
            if (card.id) {
                onUpdateCard({
                    name,
                    line1,
                    city,
                    country,
                    postal_code,
                    exp_month: expiry.split('/')[0],
                    exp_year: expiry.split('/')[1],
                    id: card.id,
                    stripe_token: card.id
                }, defaultCard)
            } else {
                if (!this.state.card_number || !this.state.expiry || !this.state.cvc) {
                    if (!this.state.card_number) this.setState(prevState => ({errorFields: [...prevState.errorFields, 'card_number']}))
                    if (!this.state.expiry) this.setState(prevState => ({errorFields: [...prevState.errorFields, 'expiry']}))
                    if (!this.state.cvc) this.setState(prevState => ({errorFields: [...prevState.errorFields, 'cvc']}))
                } else {
                    const billing_details = {}
                    if (name) {
                        billing_details.name = name
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

                    billing_details.address && Object.keys(billing_details.address).forEach((key) => !billing_details.address[key] && delete billing_details.address[key])

                    const res = await this.props.stripe.createPaymentMethod('card', {billing_details})

                    onAddCard({
                        ...paymentDetails,
                        stripe_token: res.paymentMethod.id
                    }, defaultCard)

                    this.setState({
                        card_number: false,
                        expiry: false,
                        cvc: false,
                    })

                    // .then(() => {
                    //     this.props.stripe.handleCardAction(
                    //         'pi_1FjttzJzUVfwvcYwq2nWSUuy_secret_BhymwhXpe6qEVMhvBRFmv8eze'
                    //     ).then(res => {
                    //         console.log(res)
                    //     })
                    // })
                }
            }
        } catch (e) {
            console.log(e)
        }

        this.setState({
            localProcessing: false
        })

    }

    componentDidUpdate() {
        if (this.state.paymentDetails.id !== this.props.card.id) this.setState({
            paymentDetails: {
                ...this.props.card,
                expiry: `${this.props.card.exp_month}/${moment(this.props.card.exp_year, 'YYYY').format('YY')}`
            },
            defaultCard: this.props.card.default === undefined ? true : this.props.card.default
        })
    }

    render() {
        const {card, isNewCard, updateProcessing} = this.props,
            {defaultCard, autofocus, expiry, card_number, cvc, paymentDetails, localProcessing, errorFields} = this.state

        return (<>
            <div className="container">
                <i>
                    <img src={cardInfoIcon} alt=""/>
                </i>

                <div className="col">
                    <h3>Credit Card information</h3>
                    <p>You can update your credit card information here.</p>

                    <div
                        className={`form-group ${!isNewCard ? 'disabled' : ''} ${errorFields.includes('card_number') ? 'error-field' : ''}`}>
                        <label className="label">Credit card</label>
                        {isNewCard ? <CardNumberElement
                            placeholder='**** **** **** ****'
                            style={CardNumberElementStyles}
                            disabled={!isNewCard}
                            onChange={(element) => this.stripeElementChange(element, 'card_number')}
                        /> : <Input
                            value={`**** **** **** ${paymentDetails.last4}`}
                            disabled
                        />}

                        {errorFields.includes('card_number') && <div className={'input-suffix'}><InformationTooltip
                            type={'custom'}
                            description={'This field is required'}
                        >
                            <SVG id={'failed-field'}/>
                        </InformationTooltip></div>}
                    </div>

                    <div className="payment-logo">
                        <img src={visaLogo} alt=""/>
                        <img src={masterLogo} alt=""/>
                        <img src={americanExpressLogo} alt=""/>
                        <img src={discoverLogo} alt=""/>
                        <img src={stripeLogo} alt=""/>
                    </div>

                    <div
                        className={`form-group ${!isNewCard ? 'disabled' : ''} ${errorFields.includes('expiry') ? 'error-field' : ''}`}>
                        <label className="label">Expiry</label>
                        {isNewCard ? <CardExpiryElement
                            style={CardNumberElementStyles}
                            disabled={!isNewCard}

                            ref={(instance) => {
                                (autofocus && card_number && instance && !expiry) && instance._element.focus()
                            }}
                            onChange={(element) => this.stripeElementChange(element, 'expiry')}
                            onBlur={this.handleBlurCardElement}
                        /> : <Input
                            value={paymentDetails.expiry}
                            name={'expiry'}
                            maxLength={5}
                            onChange={this.handleChangeInput}
                        />}

                        {errorFields.includes('expiry') && <div className={'input-suffix'}><InformationTooltip
                            type={'custom'}
                            description={'This field is required'}
                        >
                            <SVG id={'failed-field'}/>
                        </InformationTooltip></div>}
                    </div>

                    <div className="row">
                        <div
                            className={`form-group card-container__cvc ${!isNewCard ? 'disabled' : ''} ${errorFields.includes('cvc') ? 'error-field' : ''}`}>
                            <label className="label">CVC</label>

                            {isNewCard ? <CardCvcElement
                                style={CardNumberElementStyles}
                                disabled={!isNewCard}
                                ref={(instance) => {
                                    (autofocus && expiry && instance && !cvc) && instance._element.focus()
                                }}
                                onChange={(element) => this.stripeElementChange(element, 'cvc')}
                                onBlur={this.handleBlurCardElement}
                            /> : <Input
                                value={' ***'}
                                disabled
                            />}

                            {errorFields.includes('cvc') && <div className={'input-suffix'}><InformationTooltip
                                type={'custom'}
                                description={'This field is required'}
                            >
                                <SVG id={'failed-field'}/>
                            </InformationTooltip></div>}
                        </div>

                        <div className={'lock-description'}>
                            <SVG id='lock'/>
                            this is a secure 128-bit ssl <br/> encrypted payment
                        </div>
                    </div>

                    <Checkbox
                        checked={defaultCard}
                        onChange={this.changeDefaultHandler}
                    >
                        Default Payment Method
                    </Checkbox>
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
                            value={paymentDetails.name}
                            name={'name'}
                            onChange={this.handleChangeInput}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Billing Address</label>
                        <Input
                            type="text"
                            placeholder={'Billing Address'}
                            value={paymentDetails.line1}
                            name={'line1'}
                            onChange={this.handleChangeInput}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">City / Zip Code</label>
                        <Input
                            type="text"
                            placeholder={'City'}
                            value={paymentDetails.city}
                            name={'city'}
                            onChange={this.handleChangeInput}
                        />
                        <Input
                            type="text"
                            placeholder={'Zip Code'}
                            value={paymentDetails.postal_code}
                            name={'postal_code'}
                            onChange={this.handleChangeInput}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Country</label>

                        <CustomSelect
                            onChange={this.handleChangeSelect}
                            placeholder='Country'
                            showSearch
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            value={paymentDetails.country}>
                            {countries.map(item => (
                                <Option key={item.code} value={item.code}>{item.name}</Option>
                            ))}
                        </CustomSelect>
                    </div>

                    {isNewCard ? <button className="btn default" disabled={updateProcessing || localProcessing}
                                         onClick={this.handleSubmit}>
                            Add Payment Method

                            {(updateProcessing || localProcessing) && <Spin size={'small'}/>}
                        </button>
                        :
                        <button className="btn default"
                                disabled={updateProcessing || localProcessing || checkChanges(card, {
                                    ...paymentDetails,
                                    defaultCard
                                })}
                                onClick={this.handleSubmit}>
                            Save Changes

                            {(updateProcessing || localProcessing) && <Spin size={'small'}/>}
                        </button>
                    }
                </div>
            </div>
        </>)

    }
}

export default injectStripe(StripeForm)
