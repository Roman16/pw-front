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
import {toast} from "react-toastify"

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
        [dontSaveCard, setDontSaveCard] = useState(false),
        [couponInfo, setCouponInfo] = useState(),
        [couponCheckProcessing, setCouponCheckProcessing] = useState(false),
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

    const handlePaymentError = ({response: {data}}, payment_method, event) => {
        if(data.message === "Requires action") {
            props.stripe.confirmCardPayment(
                data.result.client_secret,
                {
                    payment_method: payment_method
                })
                .then((res) => {
                    if (res.error) {
                        notification.error({title: res.error.message})
                    } else {
                        history.push('/zero-to-hero/settings/payment-success')
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

                 await userService.addPaymentMethod({stripe_token: res.paymentMethod.id})

                if (res.error) {
                    notification.error({title: res.error.message})
                    setPayProcessing(false)
                } else if (res.paymentMethod) {
                    setTimeout(() => {
                        zthServices.payBatch({
                            job_id: props.batchId,
                            payment_token: res.paymentMethod.id,
                            coupon: couponInfo?.code
                        })
                            .then(() => {
                                history.push('/zero-to-hero/settings/payment-success')
                            })
                            .catch(e => {
                                handlePaymentError(e, res.paymentMethod.id, event)
                                setPayProcessing(false)
                            })
                            .finally(() => {
                                if (dontSaveCard) {
                                    userService.deletePaymentMethod(res.paymentMethod.id)
                                }
                            })
                    }, 1500)
                }
            } else {
                setTimeout(() => {
                    zthServices.payBatch({
                        job_id: props.batchId,
                        payment_token: cardsList[selectedCard].id,
                        coupon: couponInfo?.code
                    })
                        .then(() => {
                            history.push('/zero-to-hero/settings/payment-success')
                        })
                        .catch(e => {
                            handlePaymentError(e, cardsList[selectedCard].id, event)
                            setPayProcessing(false)
                        })
                }, 1500)
            }
        } catch ({response: {data}}) {
            console.log(data)
        }
    }

    const checkCouponHandler = async (coupon) => {
        setCouponCheckProcessing(true)
        try {
            const {result} = await userService.getCouponInfo(coupon)
            if (result.applies_to === null || result.applies_to.includes('zero_to_hero')) {
                setCouponInfo(result)
            } else {
                notification.error({description: 'This coupon isn\'t valid for zth'})
            }
        } catch (e) {
            console.log(e)
        }

        setCouponCheckProcessing(false)
    }

    const swipeCardHandler = (index) => {
        setSelectedCard(index)
    }

    const fetchBatchInformation = async () => {
        try {
            setFetchProcessing(true)

            const [batchInfo, paymentCards] = await Promise.all([zthServices.fetchBatchInformation(props.batchId), userService.fetchBillingInformation()])

            if (paymentCards.length > 0) setPaymentMethod('select')

            setCardList(paymentCards.sort((x, y) => {
                return x.default ? -1 : y.default ? 1 : 0
            }))

            setProductInformation(batchInfo.result.products[0])

            setFetchProcessing(false)
        } catch (e) {
            console.log(e)
            history.push('/zero-to-hero/settings')
        }
    }

    useEffect(() => {
        fetchBatchInformation()

        notification.info({
            title: 'We’re sorry!',
            description: 'We do not accept Pioneer cards yet, but our team works on this issue. Until we deal with the problem, please, do not enter the Pioneer card number because the payment will not be completed.'
        })

        return (() => {
            toast.dismiss()
        })
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
                                        dontSaveCard={dontSaveCard}
                                        newCard={newCard}
                                        stripeElementChange={stripeElementChangeHandler}
                                        onChangeUserName={(value) => setUserName(value)}
                                        switchSaveCard={setDontSaveCard}
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
                        couponInfo={couponInfo}
                        checkProcessing={couponCheckProcessing}

                        onCheckCoupon={checkCouponHandler}
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