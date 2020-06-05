import React, {useEffect, useState} from "react";
import './Payment.less';
import {Elements, injectStripe, StripeProvider} from "react-stripe-elements";
import {userService} from "../../../services/user.services";
import {Radio, Spin} from "antd";
import {useSelector} from "react-redux";
import NewCard from "./NewCard";
import UserCards from './UserCards';
import {numberMask} from "../../../utils/numberMask";
import {saleRender} from "../components/ProductAmountSlider/ProductAmountSlider";
import {history} from "../../../utils/history";
import {zthServices} from "../../../services/zth.services";

const stripeKey = process.env.REACT_APP_ENV === 'production'
    ? process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY_LIVE
    : process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY_TEST || 'pk_test_TYooMQauvdEDq54NiTphI7jx';


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
};

const Payment = (props) => {
    const [cardsList, setCardList] = useState([]),
        [selectedPaymentMethod, setPaymentMethod] = useState('new_card'),
        [userName, setUserName] = useState(''),
        [currentButch, setCurrentButch] = useState({}),
        [payProcessing, setPayProcessing] = useState(false),
        [newCard, setNewCard] = useState({
            card_number: false,
            expiry: false,
            cvc: false,
        });

    const {productAmount, selectedProducts} = useSelector(state => ({
        productAmount: state.zth.productAmount,
        selectedProducts: state.zth.selectedProducts,
    }));

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
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setPayProcessing(true);

        let res;

        if (selectedPaymentMethod === 'new_card') {
            try {
                if (userName) {
                    const billing_details = {};
                    billing_details.name = userName;
                    res = await props.stripe.createToken(billing_details);
                } else {
                    res = await props.stripe.createToken();
                }
                console.log(res);
                await zthServices.payBatch(props.batchId, res.token.id);
                history.push('/zero-to-hero/success');
            } catch (e) {
                console.log(e);
            }
        } else {
            try {
                await zthServices.payBatch(props.batchId, cardsList.find(item => item.default).id);
                history.push('/zero-to-hero/success');
            } catch (e) {
                console.log(e);
            }
        }

        setPayProcessing(false);
    };

    useEffect(() => {
        userService.fetchBillingInformation()
            .then(res => {
                setCardList(res);
            });

        zthServices.checkBatchById(props.batchId)
            .then(res => {
                setCurrentButch(res.result);
                console.log(res.result);
            })
    }, []);

    return (
        <div className="zero-to-hero-page">
            <section className='payment-section'>
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
                            <Radio value={'select'}>
                                Use card that attached to PPC Automate Tool
                            </Radio>

                            <div className="radio-description user-cards">
                                <UserCards
                                    disabled={selectedPaymentMethod !== 'select'}
                                    card={cardsList.find(item => item.default)}
                                    allCards={cardsList}
                                />
                            </div>
                        </div>
                    </Radio.Group>
                </div>

                <div className="summary">
                    <h2>Summary</h2>
                    <div className="row">
                        <label htmlFor="">Products:</label>
                        <b>{productAmount} unique SKU</b>
                    </div>

                    <div className="row">
                        <label htmlFor="">Campaign type:</label>
                        <b>Sponsored Products</b>
                    </div>

                    <div className="row">
                        <label htmlFor="">Campaigns amount:</label>
                        <b>{selectedProducts.length}</b>
                    </div>

                    <div className="row">
                        <label htmlFor="">Approximate amount of keywords:</label>
                        <b>560</b>
                    </div>

                    <div className="total-price">
                        <label htmlFor="">TOTAL PRICE:</label>
                        <div className="value">${currentButch.amount}</div>
                    </div>

                    {productAmount > 5 && <div className="row save-info">
                        <label htmlFor="">You save:</label>
                        <div className="value">{saleRender(productAmount)}</div>
                    </div>}

                    <button
                        className={'btn white'}
                        onClick={handleSubmit}
                        disabled={payProcessing}
                    >
                        Pay
                        {payProcessing && <Spin size={'small'}/>}
                    </button>
                </div>
            </section>
        </div>
    )
};

const PaymentRender = injectStripe(Payment);

const PaymentContainer = (props) => {
    return (<StripeProvider apiKey={stripeKey}>
        <Elements>
            {<PaymentRender batchId={props.match.params.batchId}/>}
        </Elements>
    </StripeProvider>)
};

export default PaymentContainer;