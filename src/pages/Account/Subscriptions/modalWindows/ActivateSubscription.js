import React, {useEffect, useState} from 'react'
import ModalWindow from "../../../../components/ModalWindow/ModalWindow"
import {subscriptionPlans} from "../../../../constans/subscription.plans"
import _ from 'lodash'
import {userService} from "../../../../services/user.services"
import {Spin} from "antd"
import {numberMask} from "../../../../utils/numberMask"
import RouteLoader from "../../../../components/RouteLoader/RouteLoader"
import moment from 'moment'
import {Link} from "react-router-dom"
import {CouponField} from "../CouponField"
import {notification} from "../../../../components/Notification"

export const ActivateSubscription = ({
                                         visible,
                                         plan,
                                         state,
                                         scope,
                                         processing,
                                         activateType,
                                         adSpend,
                                         info,

                                         onClose,
                                         onActivate
                                     }) => {

    const [activateInfo, setActivateInfo] = useState({
            ...info
        }),
        [fetchProcessing, setFetchProcessing] = useState(true),
        [applyCouponProcessing, setApplyCouponProcessing] = useState(false),
        [couponInfo, setCouponInfo] = useState(undefined)

    const planName = _.find(subscriptionPlans, {key: plan}).name,
        activePlanName = _.find(subscriptionPlans, {key: state.active_subscription_type}).name,
        activePlanDetails = state.subscriptions[state.active_subscription_type]

    const getActivateInfo = async () => {
        setFetchProcessing(true)

        try {
            const {result} = await userService.getActivateInfo({scope})

            setActivateInfo(result[scope].data)
        } catch (e) {
            console.log(e)
        }
        setFetchProcessing(false)
    }

    const applyCouponHandler = async (value) => {
        setApplyCouponProcessing(true)
        try {
            const couponRes = await userService.getCouponInfo(value)

            if (!couponRes.result.valid) {
                notification.error({title: 'Coupon is not valid'})
            } else {
                const {result} = await userService.getActivateInfo({scope, coupon: value})
                setCouponInfo(couponRes.result)

                setActivateInfo(result[scope].data)
            }
        } catch (e) {
            console.log(e)
        }

        setApplyCouponProcessing(false)
    }

    const activateHandler = () => {
        onActivate(couponInfo?.code)
    }

    const windowContent = () => {
        if (activateType === 'trial') {
            return (<div className={'free-trial'}>
                <div className="window-header">
                    <h2>You are starting 14-day Free Trial</h2>
                    <p>
                        14-day Free Trial includes full access to PPC Automation and Analytics tools. After Free Trial
                        period expires, <b> {planName}</b> plan will renew automatically for
                        <b> ${numberMask(activateInfo[plan].next_invoice.payment.subtotal / 100, 2)} /
                            month*</b> starting
                        from {moment(activateInfo[plan].next_invoice.date).format('DD MMM YYYY')} unless
                        you cancel it.
                    </p>
                </div>

                <div className="subscription-details">
                    <div className="row">
                        <div className="label">PLAN</div>
                        <div className="value"><b>{planName}</b></div>
                    </div>
                    <div className="row">
                        <div className="label">TRIAL</div>
                        <div className="value"><b>14 days free</b></div>
                    </div>
                    <div className="row">
                        <div className="label">AD SPEND</div>
                        <div className="value"><b>${numberMask(adSpend, 2)}</b></div>
                    </div>


                    <PriceRow
                        couponInfo={couponInfo}
                        plan={plan}
                        activateInfo={activateInfo}
                        trial={true}
                    />

                    <PaymentMethodRow
                        data={activateInfo[plan]}
                    />

                    <div className="row with-field">
                        <div className="label">COUPON</div>
                        <div className="value form-group">
                            <CouponField
                                placeholder={'Enter coupon'}
                                processing={applyCouponProcessing}
                                couponInfo={couponInfo}

                                onApply={applyCouponHandler}
                            />
                        </div>
                    </div>
                </div>


                <div className="window-actions">
                    <p>You will not be charged during your Free trial period</p>

                    <button className="btn default" onClick={activateHandler} disabled={processing}>
                        Get Started

                        {processing && <Spin size={'small'}/>}
                    </button>
                </div>
            </div>)
        } else if (activateType === 'switch') {
            return (<div className={'switch-subscription'}>
                <div className="window-header">
                    <h2>You are switching to {planName} plan</h2>
                    <p>
                        You are switching to <b>{planName}</b> plan that will renew automatically
                        for <b> ${numberMask(activateInfo[plan].next_invoice.payment.subtotal / 100, 2)} /
                        month*</b> starting
                        from {moment(activateInfo[plan].next_invoice.immediate ? moment() : activateInfo[plan].next_invoice.date).format('DD MMM YYYY')} unless
                        you cancel it.
                    </p>

                    <div className="rebate">
                        <InfoIcon/>

                        <div className="col">
                            <h4> {plan === 'full' ? 'Subscription rebate' : `${activePlanName} access`} </h4>

                            {plan === 'full' ? <p>
                                You will get a rebate for <b>$[rebate amount]</b> for unused days for your subscriptions
                                you
                                have activated before. This rebate amount will be subtracted from the cost for your
                                Combo plan. If rebate amount is higher than your current Combo plan cost, the remaining
                                amount will be carried forward for your next recurring payments.
                            </p> : <p>
                                You will retain access to all features provided by already
                                purchased <b>{activePlanName}</b> plan
                                until <b>{moment(activePlanDetails.period_end_date).format('DD MMM YYYY')}</b>.
                            </p>}
                        </div>
                    </div>
                </div>

                <div className="subscription-details">
                    <div className="row">
                        <div className="label">PLAN</div>
                        <div className="value"><b>{planName}</b></div>
                    </div>
                    <div className="row">
                        <div className="label">AD SPEND</div>
                        <div className="value"><b>${numberMask(adSpend, 2)}</b></div>
                    </div>

                    <PriceRow
                        couponInfo={couponInfo}
                        plan={plan}
                        activateInfo={activateInfo}
                    />

                    <PaymentMethodRow
                        data={activateInfo[plan]}
                    />

                    <div className="row">
                        <div className="label">NEXT PAYMENT</div>
                        <div className="value">
                            <b>{moment(activateInfo[plan].next_invoice.immediate ? moment() : activateInfo[plan].next_invoice.date).format('DD MMM YYYY')}</b>
                        </div>
                    </div>
                    <div className="row with-field">
                        <div className="label">COUPON</div>
                        <div className="value form-group">
                            <CouponField
                                placeholder={'Enter coupon'}
                                processing={applyCouponProcessing}
                                couponInfo={couponInfo}

                                onApply={applyCouponHandler}
                            />
                        </div>
                    </div>
                </div>


                <div className="window-actions">
                    {!activateInfo[plan].next_invoice.payment.card_last_4 && <p>
                        Can't start subscription. <Link to={'/account/billing-information'}>Add default payment method
                        first</Link>
                    </p>}

                    <button className="btn default" onClick={activateHandler}
                            disabled={processing || !activateInfo[plan].next_invoice.payment.card_last_4}>
                        Confirm

                        {processing && <Spin size={'small'}/>}
                    </button>
                </div>
            </div>)
        } else {
            return (<div className={'on-subscribe'}>
                <div className="window-header">
                    <h2>You are starting {planName} plan</h2>
                    <p>
                        You are subscribing to <b>{planName}</b> plan that will renew automatically
                        for <b> ${numberMask(activateInfo[plan].next_invoice.payment.subtotal / 100, 2)} /
                        month*</b> starting from today unless you cancel it. We are about to charge the first payment
                        equal
                        to <b> ${numberMask(activateInfo[plan].next_invoice.payment.total_actual / 100, 2)}</b> from
                        your default payment method.
                        <br/>
                        Are you sure you want to continue?
                    </p>

                </div>

                <div className="subscription-details">
                    <div className="row">
                        <div className="label">PLAN</div>
                        <div className="value"><b>{planName}</b></div>
                    </div>
                    <div className="row">
                        <div className="label">AD SPEND</div>
                        <div className="value"><b>${numberMask(adSpend, 2)}</b></div>
                    </div>

                    <PriceRow
                        couponInfo={couponInfo}
                        plan={plan}
                        activateInfo={activateInfo}
                    />

                    <PaymentMethodRow
                        data={activateInfo[plan]}
                    />

                    <div className="row">
                        <div className="label">NEXT PAYMENT</div>
                        <div className="value">
                            <b>{moment(activateInfo[plan].next_invoice.immediate ? moment() : activateInfo[plan].next_invoice.date).format('DD MMM YYYY')}</b>
                        </div>
                    </div>
                    <div className="row with-field">
                        <div className="label">COUPON</div>
                        <div className="value form-group">
                            <CouponField
                                placeholder={'Enter coupon'}
                                processing={applyCouponProcessing}
                                couponInfo={couponInfo}

                                onApply={applyCouponHandler}
                            />
                        </div>
                    </div>
                </div>

                <div className="window-actions">
                    {!activateInfo[plan].next_invoice.payment.card_last_4 && <p>
                        Can't start subscription. <Link to={'/account/billing-information'}>Add default payment method
                        first</Link>
                    </p>}

                    <button className="btn default" onClick={activateHandler}
                            disabled={processing || !activateInfo[plan].next_invoice.payment.card_last_4}>
                        Confirm

                        {processing && <Spin size={'small'}/>}
                    </button>
                </div>
            </div>)
        }
    }

    useEffect(() => {
        visible && getActivateInfo()
    }, [visible])

    return (
        <ModalWindow
            className="activate-subscription-window"
            handleCancel={onClose}
            visible={visible}
            footer={false}
        >
            <CloseWindowButton onClick={onClose}/>

            {windowContent()}

            {fetchProcessing && <RouteLoader/>}

        </ModalWindow>
    )
}


const PriceRow = ({couponInfo, activateInfo, plan, trial = false}) => <div className="row">
    <div className="label">PRICE</div>
    <div className="value">
        {trial && <p>Starting on {moment(activateInfo[plan].next_invoice.date).format('DD MMM YYYY')}</p>}
        <b>
            {couponInfo && <span
                className="old-price">$ <b>{`${numberMask(activateInfo[plan].next_invoice.payment.subtotal_actual / 100, 2)}`}</b></span>}
            {`$${numberMask(activateInfo[plan].next_invoice.payment.total_actual / 100, 2)}`} /
            month*
        </b>
        <p>
            * subscription price is based on your 30-day ad spend and it may differ on your billing
            date if ad spend changes drastically.
            <a target={'_blank'} href="https://sponsoreds.com/pricing"> Learn more</a>
        </p>
    </div>
</div>

const PaymentMethodRow = ({data}) => <div className="row">
    <div className="label">PAYMENT METHOD</div>
    <div
        className="value payment-method">{data.next_invoice.payment.card_last_4 ?
        <b>**** {data.next_invoice.payment.card_last_4}</b> : <><b>No card added</b>
            <Link to={'/account/billing-information'}>Change payment method</Link> </>}</div>
</div>


const CloseWindowButton = ({onClick}) => <button className="btn icon close-button" onClick={onClick}>
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g>
            <path
                d="M1 1L9.96875 9.96875M9.96875 9.96875L18.9375 1M9.96875 9.96875L1 18.9375M9.96875 9.96875L18.9375 18.9375"
                stroke="#C9CBD4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
    </svg>
</button>

const InfoIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="12" fill="#6959AB"/>
    <path
        d="M10.6282 6.17221C10.6282 5.41479 11.2422 4.80078 11.9996 4.80078C12.757 4.80078 13.371 5.41479 13.371 6.17221C13.371 6.92963 12.757 7.54364 11.9996 7.54364C11.2422 7.54364 10.6282 6.92963 10.6282 6.17221ZM15.0853 17.8294C15.0853 18.2081 14.7783 18.5151 14.3996 18.5151H10.2853C9.90661 18.5151 9.59961 18.2081 9.59961 17.8294C9.59961 17.4506 9.90661 17.1436 10.2853 17.1436C10.664 17.1436 10.971 16.8366 10.971 16.4579V10.9722C10.971 10.5935 10.664 10.2865 10.2853 10.2865C9.90661 10.2865 9.59961 9.97949 9.59961 9.60078C9.59961 9.22207 9.90661 8.91507 10.2853 8.91507H10.971H13.0282C13.4069 8.91507 13.7139 9.22207 13.7139 9.60078V16.4579C13.7139 16.8366 14.0209 17.1436 14.3996 17.1436C14.7783 17.1436 15.0853 17.4506 15.0853 17.8294Z"
        fill="#D2CDE6"/>
</svg>


