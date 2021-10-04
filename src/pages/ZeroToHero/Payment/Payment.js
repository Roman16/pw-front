import React, {useEffect, useState} from "react"
import './Payment.less'
import {Elements, injectStripe, StripeProvider} from "react-stripe-elements"
import {userService} from "../../../services/user.services"
import {Input, Radio, Spin} from "antd"
import {useSelector} from "react-redux"
import NewCard from "./NewCard"
import UserCards from './UserCards'
import {numberMask} from "../../../utils/numberMask"
import {saleRender} from "../components/ProductAmountSlider/ProductAmountSlider"
import {history} from "../../../utils/history"
import {zthServices} from "../../../services/zth.services"
import {SVG} from "../../../utils/icons"
import {notification} from "../../../components/Notification"
import BulkInformation from "./BulkInformation"

const stripeKey = process.env.REACT_APP_ENV === 'production'
    ? process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY_LIVE
    : process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY_TEST || 'pk_test_TYooMQauvdEDq54NiTphI7jx'


export const totalPriceRender = (count) => {
    if (count > 0 && count <= 5) {
        return (<>${numberMask(count * 500, 0)}</>)
    } else if (count >= 6 && count <= 20) {
        return (<>${numberMask(count * 400, 0)}</>)
    } else if (count >= 21 && count <= 50) {
        return (<>${numberMask(count * 350, 0)}</>)
    } else if (count >= 51 && count <= 100) {
        return (<>${numberMask(count * 300, 0)}</>)
    }
}

const Payment = (props) => {
    const [cardsList, setCardList] = useState([]),
        [selectedPaymentMethod, setPaymentMethod] = useState('new_card'),
        [userName, setUserName] = useState(''),
        [selectedCard, setSelectedCard] = useState(0),
        [currentButch, setCurrentButch] = useState({}),
        [payProcessing, setPayProcessing] = useState(false),
        [newCard, setNewCard] = useState({
            card_number: false,
            expiry: false,
            cvc: false,
        })

    const {productAmount, selectedProducts} = useSelector(state => ({
        productAmount: state.zth.productAmount,
        selectedProducts: state.zth.selectedProducts,
    }))

    const stripeElementChangeHandler = (element, name) => {
        if (!element.empty && element.complete) {
            setNewCard({
                ...newCard,
                [name]: true,
            })
        } else {
            setNewCard({
                ...newCard,
                [name]: false,
            })
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setPayProcessing(true)

        let res

        try {
            if (selectedPaymentMethod === 'new_card') {
                if (userName) {
                    const billing_details = {}
                    billing_details.name = userName
                    res = await props.stripe.createPaymentMethod('card', {billing_details})
                } else {
                    res = await props.stripe.createPaymentMethod('card')
                }

                if (res.error) {
                    notification.error({title: res.error.message})
                } else if (res.paymentMethod) {
                    await zthServices.payBatch({
                        jobs_ids: [props.batchId],
                        payment_token: res.paymentMethod.id
                    })
                    history.push('/zero-to-hero/settings/payment-success')
                }
            } else {
                await zthServices.payBatch({
                    jobs_ids: [props.batchId],
                    payment_token: cardsList[selectedCard].id
                })
                history.push('/zero-to-hero/settings/payment-success')
            }
        } catch ({response: {data}}) {
            if (data.error_code === 'authentication_required') {
                props.stripe.confirmCardPayment(
                    data.result.payment_intent_client_secret,
                    {
                        payment_method: selectedPaymentMethod === 'new_card' ? res.paymentMethod.id : cardsList[selectedCard].id
                    })
                    .then((res) => {
                        if (res.error) {
                            notification.error({title: res.error.message})
                        } else {
                            handleSubmit(event)
                        }

                        setPayProcessing(false)
                    })
                    .catch(e => {
                        notification.error({title: e.error.message})
                        console.log(e)

                        setPayProcessing(false)
                    })
            }
        }

        setPayProcessing(false)
    }

    const swipeCardHandler = (index) => {
        setSelectedCard(index)
    }

    useEffect(() => {
        userService.fetchBillingInformation()
            .then(res => {
                setCardList(res.sort((x, y) => {
                    return x.default ? -1 : y.default ? 1 : 0
                }))
            })

        zthServices.checkBatchById(props.batchId)
            .then(res => {
                setCurrentButch(res.result)
            })
    }, [])

    return (
        <div className="zero-to-hero-page payment-page">
            <BulkInformation/>

            <form onSubmit={handleSubmit} className='payment-section'>
                <div className="payment-method">
                    <h2>Select payment method</h2>

                    <Radio.Group
                        value={selectedPaymentMethod}
                        onChange={({target: {value}}) => setPaymentMethod(value)}
                    >
                        <div className="col">
                            <Radio value={'new_card'}>
                                New payment Method
                            </Radio>

                            <div className="radio-description">
                                <NewCard
                                    disabled={selectedPaymentMethod !== 'new_card'}
                                    newCard={newCard}
                                    stripeElementChange={stripeElementChangeHandler}
                                    onChangeUserName={(value) => setUserName(value)}
                                />
                            </div>
                        </div>

                        <div className="col">
                            <Radio value={'select'} disabled={cardsList.length === 0}>
                                Use card that attached to PPC Automate Tool
                            </Radio>

                            <div className="radio-description user-cards">
                                <UserCards
                                    disabled={selectedPaymentMethod !== 'select'}
                                    selectedCard={selectedCard}
                                    allCards={cardsList}

                                    onSwipeCard={swipeCardHandler}
                                />
                            </div>
                        </div>
                    </Radio.Group>
                </div>

                <div className="summary">
                    <h2>Summary</h2>
                    <div className="row">
                        <div className="col">
                            <h4><span>#</span>Description</h4>
                            <p><span>1</span>Fee</p>
                            <p><span>2</span>Keywords</p>
                            <p><span>3</span>ASINs</p>
                        </div>
                        <div className="col">
                            <h4>Amount</h4>
                            <p></p>
                            <p>1000</p>
                            <p>300</p>
                        </div>
                        <div className="col">
                            <h4>Unit Price</h4>
                            <p></p>
                            <p>$10.00</p>
                            <p>$3.00</p>
                        </div>
                        <div className="col">
                            <h4>Total</h4>
                            <p>$39.00</p>
                            <p>$1000.00</p>
                            <p>$300.00</p>
                        </div>
                    </div>

                    <div className="total-price">
                        <div className={'label'}>TOTAL PRICE:</div>
                        {/*<div className="value">{currentButch.amount && `$${numberMask(currentButch.amount / 100, 0)}`}</div>*/}
                        <div className="value">$1500</div>
                    </div>

                    <div className="discount">
                        <div className="label">Discount:</div>
                        <div className="value">$500</div>
                    </div>
                    <div className="save">
                        <div className="label">You save:</div>
                        <div className="value">$500</div>
                    </div>

                    <button
                        className={'sds-btn default'}
                        disabled={payProcessing}
                    >
                        Pay
                        {payProcessing && <Spin size={'small'}/>}
                    </button>
                </div>
            </form>
        </div>
    )
}

const PaymentRender = injectStripe(Payment)

const PaymentContainer = (props) => {
    return (<StripeProvider apiKey={stripeKey}>
        <Elements>
            {<PaymentRender batchId={props.match.params.batchId}/>}
        </Elements>
    </StripeProvider>)
}

export default PaymentContainer