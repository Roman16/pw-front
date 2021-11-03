import React, {useEffect, useState} from "react"
import './Payment.less'
import {Elements, injectStripe, StripeProvider} from "react-stripe-elements"
import {userService} from "../../../services/user.services"
import {Radio, Spin} from "antd"
import NewCard from "./NewCard"
import UserCards from './UserCards'
import {numberMask} from "../../../utils/numberMask"
import {history} from "../../../utils/history"
import {zthServices} from "../../../services/zth.services"
import {notification} from "../../../components/Notification"
import BulkInformation from "./BulkInformation"
import Summary from "./Summary"

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
        [productInformation, setProductInformation] = useState({job: {}}),
        [payProcessing, setPayProcessing] = useState(false),
        [fetchProcessing, setFetchProcessing] = useState(true),
        [saveCard, setSaveCard] = useState(true),
        [newCard, setNewCard] = useState({
            card_number: false,
            expiry: false,
            cvc: false,
        })

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

                saveCard && await userService.addPaymentMethod({stripe_token: res.paymentMethod.id})

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

    const fetchBatchInformation = async () => {
        try {
            setFetchProcessing(true)

            const {result} = await zthServices.fetchBatchInformation(props.batchId)
            setProductInformation(result.products[0])

            setFetchProcessing(false)
        } catch (e) {
            console.log(e)
            history.push('/zero-to-hero/settings')
        }
    }

    useEffect(() => {
        userService.fetchBillingInformation()
            .then(res => {
                setCardList(res.sort((x, y) => {
                    return x.default ? -1 : y.default ? 1 : 0
                }))
            })

        fetchBatchInformation()
    }, [])

    return (
        <div className="zero-to-hero-page payment-page">
            {fetchProcessing ? <div className={'page-loader'}><Spin size={'large'}/></div> : <>
                <BulkInformation
                    product={productInformation}
                />

                <form onSubmit={handleSubmit} className='payment-section'>
                    <div className="payment-method">
                        <h2>Select payment method</h2>

                        <Radio.Group
                            value={selectedPaymentMethod}
                            onChange={({target: {value}}) => setPaymentMethod(value)}
                        >
                            <div className="col">
                                <Radio value={'new_card'}>
                                    New payment method
                                </Radio>

                                <div className="radio-description">
                                    <NewCard
                                        disabled={selectedPaymentMethod !== 'new_card'}
                                        saveCard={saveCard}
                                        newCard={newCard}
                                        stripeElementChange={stripeElementChangeHandler}
                                        onChangeUserName={(value) => setUserName(value)}
                                        switchSaveCard={setSaveCard}
                                    />
                                </div>
                            </div>

                            <div className="col">
                                <Radio value={'select'} disabled={cardsList.length === 0}>
                                    Use existing card
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

                    <Summary
                        jobPrice={productInformation.job.pricing}
                        payProcessing={payProcessing}
                    />
                </form>
            </>}
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