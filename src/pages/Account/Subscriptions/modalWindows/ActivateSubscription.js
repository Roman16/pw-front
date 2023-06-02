import React, {useEffect, useState} from 'react'
import ModalWindow from "../../../../components/ModalWindow/ModalWindow"
import {subscriptionPlans} from "../../../../constans/subscription.plans"
import _ from 'lodash'
import {userService} from "../../../../services/user.services"
import {Select, Spin} from "antd"
import {numberMask} from "../../../../utils/numberMask"
import RouteLoader from "../../../../components/RouteLoader/RouteLoader"
import moment from 'moment'
import {Link} from "react-router-dom"
import {CouponField} from "../components/CouponField"
import {notification} from "../../../../components/Notification"
import CustomSelect from "../../../../components/Select/Select"


const Option = Select.Option


export const ActivateSubscription = ({
                                         visible,
                                         plan,
                                         subscriptionState,
                                         processing,
                                         activateType,
                                         adSpend,
                                         regionId,
                                         paymentMethodList,

                                         onClose,
                                         onActivate
                                     }) => {

    const [activateInfo, setActivateInfo] = useState({
            ...subscriptionState.subscriptions
        }),
        [fetchProcessing, setFetchProcessing] = useState(true),
        [applyCouponProcessing, setApplyCouponProcessing] = useState(false),
        [couponInfo, setCouponInfo] = useState(undefined),
        [selectedCard, setSelectedCard] = useState(null)

    const subscriptionsArr = [activateInfo.optimization, activateInfo.analytics, activateInfo.full]

    const planName = _.find(subscriptionPlans, {key: plan}).name,
        activePlanName = subscriptionsArr.some(i => i?.status === 'on_grace_period') ? _.find(subscriptionPlans, {key: subscriptionsArr.find(i => i.status === 'on_grace_period').subscription_type}).name : subscriptionState.active_subscription_type ? _.find(subscriptionPlans, {key: subscriptionState.active_subscription_type}).name : '',
        activateInfoSelectedPlan = activateInfo[plan]


    const setActivateData = (result) => {
        setActivateInfo({
            optimization: {
                ...subscriptionState.subscriptions.optimization,
                next_invoice: result.optimization?.next_invoice || subscriptionState.subscriptions.optimization.next_invoice
            },
            analytics: {
                ...subscriptionState.subscriptions.analytics,
                next_invoice: result.analytics?.next_invoice || subscriptionState.subscriptions.analytics.next_invoice
            },
            full: {
                ...subscriptionState.subscriptions.full,
                next_invoice: result.full?.next_invoice || subscriptionState.subscriptions.full.next_invoice
            },
        })

    }

    const getActivateInfo = async () => {
        setFetchProcessing(true)

        try {
            const {result} = await userService.getActivateInfo({
                coupon: activateInfo[subscriptionState.activeSubscriptionType]?.coupon?.valid ? activateInfo[subscriptionState.activeSubscriptionType].coupon.code : activateInfoSelectedPlan?.coupon?.valid ? activateInfoSelectedPlan?.coupon.code : undefined,
                id: regionId
            })

            setActivateData(result[regionId].data)

        } catch (e) {
            console.log(e)
        }
        setFetchProcessing(false)
    }

    const applyCouponHandler = async (value) => {
        setApplyCouponProcessing(true)
        try {
            const couponRes = await userService.getCouponInfo(value, regionId)

            if (!couponRes.result.valid) {
                notification.error({title: 'Coupon is not valid'})
            } else {
                if (
                    couponRes.result.applies_to === null ||
                    (plan === 'full' && couponRes.result.applies_to.includes('analytics_access') && couponRes.result.applies_to.includes('ppc_automation_access')) ||
                    (plan === 'analytics' && couponRes.result.applies_to.includes('analytics_access')) ||
                    (plan === 'optimization' && couponRes.result.applies_to.includes('ppc_automation_access'))
                ) {
                    const {result} = await userService.getActivateInfo({coupon: value, id: regionId})
                    setCouponInfo(couponRes.result)
                    setActivateData(result[regionId].data)
                } else {

                }
            }
        } catch (e) {
            console.log(e)
        }

        setApplyCouponProcessing(false)
    }

    const activateHandler = () => {
        onActivate(couponInfo?.code, undefined, selectedCard)
    }


    useEffect(() => {
        if (visible) {
            if (activateInfo[subscriptionState.activeSubscriptionType]?.coupon?.valid) {
                setCouponInfo(activateInfo[subscriptionState.activeSubscriptionType].coupon)
            } else if (activateInfoSelectedPlan.coupon?.valid) {
                setCouponInfo(activateInfoSelectedPlan.coupon)
            }
        }
    }, [visible])


    const windowContent = () => {
        if (activateType === 'trial') {
            return (<div className={'free-trial'}>
                <div className="window-header">
                    <h2>You are starting 14-day Free Trial</h2>
                    <p>
                        14-day Free Trial includes full access to PPC Automation and Analytics tools. After Free Trial
                        period expires, <b> {planName}</b> plan will renew automatically for
                        <b> ${numberMask(activateInfoSelectedPlan.next_invoice.payment.subtotal / 100, 2)} /
                            month*</b> starting
                        from {moment(activateInfoSelectedPlan.next_invoice.date).format('DD MMM YYYY')} unless
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
                        activateInfoSelectedPlan={activateInfoSelectedPlan}
                        trial={true}
                    />

                    <PaymentMethodRow
                        data={activateInfoSelectedPlan}
                        paymentMethodList={paymentMethodList}
                        onChange={setSelectedCard}
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
                        Start

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
                        for <b> ${numberMask(activateInfoSelectedPlan.next_invoice.payment.subtotal / 100, 2)} /
                        month* </b>starting
                        from {moment(activateInfoSelectedPlan.next_invoice.immediate ? moment() : activateInfoSelectedPlan.next_invoice.date).format('DD MMM YYYY')} unless
                        you cancel it. <br/>
                        Do you wish to continue?
                    </p>

                    <div className="rebate">
                        <InfoIcon/>

                        <div className="col">
                            <h4> {plan === 'full' ? 'Subscription rebate' : `${activePlanName} access`} </h4>

                            {plan === 'full' ? <p>
                                You will get a rebate
                                for <b> ${numberMask(activateInfoSelectedPlan.next_invoice.payment.rebate / 100, 2)} </b>
                                for unused days for your subscriptions you have activated before. This rebate amount
                                will be subtracted from the cost for your <b>Combo</b> plan. If rebate amount is higher
                                than
                                your current Combo plan cost, the remaining amount will be carried forward for your next
                                recurring payments.
                            </p> : <p>
                                You will retain access to all features provided by already purchased subscription plans
                                until the end their billing periods.
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
                        activateInfoSelectedPlan={activateInfoSelectedPlan}
                    />

                    <PaymentMethodRow
                        data={activateInfoSelectedPlan}
                        paymentMethodList={paymentMethodList}
                        onChange={setSelectedCard}
                    />

                    <div className="row">
                        <div className="label">NEXT PAYMENT</div>
                        <div className="value">
                            <b>{moment(activateInfoSelectedPlan.next_invoice.immediate ? moment() : activateInfoSelectedPlan.next_invoice.date).format('DD MMM YYYY')}</b>
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
                    {!activateInfoSelectedPlan.next_invoice.payment.card_last_4 && <p>
                        Can't start subscription.
                        <Link to={'/account/billing-information'}>Add default payment method first</Link>
                    </p>}

                    <button
                        className="btn default"
                        onClick={activateHandler}
                        disabled={processing || !activateInfoSelectedPlan.next_invoice.payment.card_last_4}
                    >
                        Confirm

                        {processing && <Spin size={'small'}/>}
                    </button>
                </div>
            </div>)
        } else if (activateType === 'switchTrial') {
            return (<div className={'switch-subscription'}>
                <div className="window-header">
                    <h2>You are switching to {planName} plan</h2>
                    <p>
                        You are switching to <b>{planName}</b> plan that will renew automatically
                        for <b> ${numberMask(activateInfoSelectedPlan.next_invoice.payment.subtotal / 100, 2)} /
                        month*</b> starting
                        from {moment(activateInfoSelectedPlan.next_invoice.immediate ? moment() : activateInfoSelectedPlan.next_invoice.date).format('DD MMM YYYY')} unless
                        you cancel it.
                        <br/>
                        Do you wish to continue?
                    </p>

                    <div className="rebate">
                        <InfoIcon/>

                        <div className="col">
                            <h4>Free Trial period</h4>

                            <p>
                                You are still on the Free Trial and will have full access to PPC Automation and
                                Analytics tools until the end of Free Trial. Plan you are switching to will only become
                                active after Free Trial ends.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="subscription-details">
                    <div className="row">
                        <div className="label">PLAN</div>
                        <div className="value"><b>{planName}</b></div>
                    </div>
                    <div className="row">
                        <div className="label">TRIAL</div>
                        <div className="value"><b>{subscriptionState.trial.days_before_trial_end_date || 0} days</b>
                        </div>
                    </div>
                    <div className="row">
                        <div className="label">AD SPEND</div>
                        <div className="value"><b>${numberMask(adSpend, 2)}</b></div>
                    </div>

                    <PriceRow
                        couponInfo={couponInfo}
                        activateInfoSelectedPlan={activateInfoSelectedPlan}
                    />

                    <PaymentMethodRow
                        data={activateInfoSelectedPlan}
                        paymentMethodList={paymentMethodList}
                        onChange={setSelectedCard}
                    />

                    <div className="row">
                        <div className="label">NEXT PAYMENT</div>
                        <div className="value">
                            <b>{moment(activateInfoSelectedPlan.next_invoice.immediate ? moment() : activateInfoSelectedPlan.next_invoice.date).format('DD MMM YYYY')}</b>
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
                    <p>You will not be charged during your Free trial period</p>

                    <button className="btn default" onClick={activateHandler}
                            disabled={processing}>
                        Confirm

                        {processing && <Spin size={'small'}/>}
                    </button>
                </div>
            </div>)
        } else if (activateType === 'resumeTrial') {
            return (<div className={'on-subscribe switch-subscription'}>
                <div className="window-header">
                    <h2>You are resuming {planName} plan</h2>
                    <p>
                        You are resuming <b>{planName}</b> plan that will renew automatically
                        for <b> ${numberMask(activateInfoSelectedPlan.next_invoice.payment.subtotal / 100, 2)} /
                        month* </b> starting
                        from {moment(activateInfoSelectedPlan.next_invoice.date).format('DD MMM YYYY')} unless you
                        cancel it.
                        <br/>
                        Do you wish to continue?
                    </p>

                    <div className="rebate">
                        <InfoIcon/>

                        <div className="col">
                            <h4>Free Trial period</h4>

                            <p>
                                You are still on the Free Trial and will have full access to PPC Automation and
                                Analytics tools until the end of Free Trial. Plan you are switching to will only become
                                active after Free Trial ends.
                            </p>
                        </div>
                    </div>

                </div>

                <div className="subscription-details">
                    <div className="row">
                        <div className="label">PLAN</div>
                        <div className="value"><b>{planName}</b></div>
                    </div>
                    <div className="row">
                        <div className="label">TRIAL</div>
                        <div className="value"><b>{subscriptionState.trial.days_before_trial_end_date || 0} days</b>
                        </div>
                    </div>
                    <div className="row">
                        <div className="label">AD SPEND</div>
                        <div className="value"><b>${numberMask(adSpend, 2)}</b></div>
                    </div>

                    <PriceRow
                        couponInfo={couponInfo}
                        activateInfoSelectedPlan={activateInfoSelectedPlan}
                    />

                    <PaymentMethodRow
                        data={activateInfoSelectedPlan}
                        paymentMethodList={paymentMethodList}
                        onChange={setSelectedCard}
                    />

                    <div className="row">
                        <div className="label">NEXT PAYMENT</div>
                        <div className="value">
                            <b>{moment(activateInfoSelectedPlan.next_invoice.immediate ? moment() : activateInfoSelectedPlan.next_invoice.date).format('DD MMM YYYY')}</b>
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
                    <p>
                        You will not be charged during your Free trial period
                    </p>

                    <button className="btn default" onClick={activateHandler}
                            disabled={processing}>
                        Confirm

                        {processing && <Spin size={'small'}/>}
                    </button>
                </div>
            </div>)
        } else if (activateType === 'resume') {
            return (<div className={'on-subscribe'}>
                <div className="window-header">
                    <h2>You are resuming {planName} plan</h2>
                    <p>
                        You are resuming <b>{planName}</b> plan that will renew automatically
                        for <b> ${numberMask(activateInfoSelectedPlan.next_invoice.payment.subtotal / 100, 2)} /
                        month* </b>
                        starting from {moment(activateInfoSelectedPlan.next_invoice.date).format('DD MMM YYYY')} unless
                        you cancel it.
                        <br/>
                        Do you wish to continue?
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
                        activateInfoSelectedPlan={activateInfoSelectedPlan}
                    />

                    <PaymentMethodRow
                        data={activateInfoSelectedPlan}
                        paymentMethodList={paymentMethodList}
                        onChange={setSelectedCard}
                    />

                    <div className="row">
                        <div className="label">NEXT PAYMENT</div>
                        <div className="value">
                            <b>{moment(activateInfoSelectedPlan.next_invoice.immediate ? moment() : activateInfoSelectedPlan.next_invoice.date).format('DD MMM YYYY')}</b>
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
                    {!activateInfoSelectedPlan.next_invoice.payment.card_last_4 && <p>
                        Can't start subscription. <Link to={'/account/billing-information'}>Add default payment method
                        first</Link>
                    </p>}

                    <button className="btn default" onClick={activateHandler}
                            disabled={processing || !activateInfoSelectedPlan.next_invoice.payment.card_last_4}>
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
                        You are subscribing to <b>{planName}</b> plan that will renew automatically for
                        <b> ${numberMask(activateInfoSelectedPlan.next_invoice.payment.subtotal / 100, 2)} / month* </b>
                        starting from <b>today</b> unless you cancel it. We are about to charge the first payment equal
                        to
                        <b> ${numberMask(getTotalActual(activateInfoSelectedPlan.next_invoice.payment) / 100, 2)} </b>
                        from your default payment method.

                        <br/>
                        Do you wish to continue?
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
                        activateInfoSelectedPlan={activateInfoSelectedPlan}
                    />

                    <PaymentMethodRow
                        paymentMethodList={paymentMethodList}
                        data={activateInfoSelectedPlan}
                        onChange={setSelectedCard}
                    />

                    <div className="row">
                        <div className="label">NEXT PAYMENT</div>
                        <div className="value">
                            <b>{moment(activateInfoSelectedPlan.next_invoice.immediate ? moment() : activateInfoSelectedPlan.next_invoice.date).format('DD MMM YYYY')}</b>
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
                    {!activateInfoSelectedPlan.next_invoice.payment.card_last_4 && <p>
                        Can't start subscription. <Link to={'/account/billing-information'}>Add default payment method
                        first</Link>
                    </p>}

                    <button className="btn default" onClick={activateHandler}
                            disabled={processing || !activateInfoSelectedPlan.next_invoice.payment.card_last_4}>
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


const PriceRow = ({couponInfo, activateInfoSelectedPlan, trial = false}) => {
    const
        total = activateInfoSelectedPlan.next_invoice.payment.total,
        subtotal = activateInfoSelectedPlan.next_invoice.payment.subtotal,
        rebate = activateInfoSelectedPlan.next_invoice.payment.rebate || 0,
        balance = activateInfoSelectedPlan.next_invoice.payment.balance

    return <div className="row">
        <div className="label">PRICE</div>
        <div className="value">
            {trial && <p>Starting on {moment(activateInfoSelectedPlan.next_invoice.date).format('DD MMM YYYY')}</p>}
            <b>
                {couponInfo && <span className="old-price">
                    $ <b>{`${numberMask(getTotalActual({total: subtotal, rebate, balance}) / 100, 2)}`}</b>
                </span>}

                {`$${numberMask(getTotalActual({total, rebate, balance}) / 100, 2)}`} /
                month*
            </b>
            <p>
                * subscription price is based on your 30-day ad spend and it may differ on your next billing date if ad
                spend changes drastically. <a target={'_blank'} href="https://sponsoreds.com/pricing"> Learn more</a>
            </p>
        </div>
    </div>
}

export const getTotalActual = ({total = 0, rebate = 0, balance = 0}) => Math.max(total - rebate - balance, 0)

const PaymentMethodRow = ({data,paymentMethodList=[], onChange}) => {
    return (<div className="row with-field">
        <div className="label">PAYMENT METHOD</div>
        <div className="value payment-method">
            {data.next_invoice.payment.card_last_4 ?
                <CustomSelect
                    getPopupContainer={trigger => trigger.parentNode}
                    defaultValue={null}
                    onChange={onChange}
                >
                    <Option value={null}>Default card</Option>
                    {paymentMethodList.map(i => <Option value={i.id}>**** {i.last4}</Option>)}
                </CustomSelect>
                : <><b>No card added</b>
                    <Link to={'/account/billing-information'}>Change payment method</Link> </>}</div>
    </div>)
}
//
// const PaymentMethodRow = ({data}) => <div className="row">
//     <div className="label">PAYMENT METHOD</div>
//     <div
//         className="value payment-method">{data.next_invoice.payment.card_last_4 ?
//         <b>**** {data.next_invoice.payment.card_last_4}</b> : <><b>No card added</b>
//             <Link to={'/account/billing-information'}>Change payment method</Link> </>}</div>
// </div>


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


