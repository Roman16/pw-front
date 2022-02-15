import React, {Component} from "react"
import {CardCvcElement, CardExpiryElement, CardNumberElement, injectStripe} from "react-stripe-elements"
import visaLogo from '../../../assets/img/account/visa-logo.svg'
import masterLogo from '../../../assets/img/account/master-card-logo.svg'
import americanExpressLogo from '../../../assets/img/account/american-express-logo.svg'
import discoverLogo from '../../../assets/img/account/discover-logo.svg'
import stripeLogo from '../../../assets/img/account/stripe-logo.svg'
import {SVG} from "../../../utils/icons"
import {expiresFormat} from "../../../utils/expiresFormat"
import InformationTooltip from "../../../components/Tooltip/Tooltip"
import {notification} from "../../../components/Notification"


const CardNumberElementStyles = {
    base: {
        color: '#46435C',
        fontWeight: '300',
        fontSize: window.devicePixelRatio === 2 ? '12px' : '14px',
        height: '32px',
        '::placeholder': {
            color: 'rgba(101, 106, 132, 0.4)',
        },
    }
}


class CardForm extends Component {
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
        // this.setState({
        //     autofocus: false
        // })
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

                    if (res.error) {
                        notification.error({title: res.error.message})
                    } else if (res.paymentMethod) {
                        onAddCard({
                            ...paymentDetails,
                            stripe_token: res.paymentMethod.id
                        }, defaultCard)

                        this.setState({
                            card_number: false,
                            expiry: false,
                            cvc: false,
                        })
                    }
                }
            }
        } catch (e) {
            // console.log(e)
        }

        this.setState({
            localProcessing: false
        })

    }

    render() {
        const {autofocus, expiry, card_number, cvc, errorFields} = this.state

        return (<div className="col">
            <div
                className={`form-group${errorFields.includes('card_number') ? 'error-field' : ''}`}>
                <CardNumberElement
                    placeholder='Credit card'
                    style={CardNumberElementStyles}
                    onChange={(element) => this.stripeElementChange(element, 'card_number')}
                />

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
                className={`form-group ${errorFields.includes('expiry') ? 'error-field' : ''}`}>
                <CardExpiryElement
                    style={CardNumberElementStyles}
                    placeholder={'Expiry'}

                    ref={(instance) => {
                        (autofocus && card_number && instance && !expiry) && instance._element.focus()
                    }}
                    onChange={(element) => this.stripeElementChange(element, 'expiry')}
                    onBlur={this.handleBlurCardElement}
                />

                {errorFields.includes('expiry') && <div className={'input-suffix'}><InformationTooltip
                    type={'custom'}
                    description={'This field is required'}
                >
                    <SVG id={'failed-field'}/>
                </InformationTooltip></div>}
            </div>

            <div className="row">
                <div
                    className={`form-group card-container__cvc ${errorFields.includes('cvc') ? 'error-field' : ''}`}>

                    <CardCvcElement
                        placeholder={'CVC'}
                        style={CardNumberElementStyles}
                        ref={(instance) => {
                            (autofocus && expiry && instance && !cvc) && instance._element.focus()
                        }}
                        onChange={(element) => this.stripeElementChange(element, 'cvc')}
                        onBlur={this.handleBlurCardElement}
                    />

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
        </div>)

    }
}

export default injectStripe(CardForm)
