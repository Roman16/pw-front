import React, {useEffect, useState} from 'react'
import ModalWindow from "../../../../components/ModalWindow/ModalWindow"
import {subscriptionPlans} from "../../../../constans/subscription.plans"
import _ from 'lodash'
import {userService} from "../../../../services/user.services"
import {Spin} from "antd"
import {numberMask} from "../../../../utils/numberMask"

export const ActivateSubscription = ({
                                         visible,
                                         plan,
                                         state,
                                         scope,
                                         processing,
                                         activateType,

                                         onClose,
                                         onActivate
                                     }) => {

    const [activateInfo, setActivateInfo] = useState(),
        [fetchProcessing, setFetchProcessing] = useState(true)

    const planName = _.find(subscriptionPlans, {key: plan}).name

    const getActivateInfo = async () => {
        setFetchProcessing(true)

        try {
            const {result} = userService.getActivateInfo(scope)

            setActivateInfo(result[scope].data)
        } catch (e) {
            console.log(e)
        }
        setFetchProcessing(false)
    }


    const windowContent = () => {
        if (activateType === 'trial') {
            return (<div className={'free-trial'}>
                <div className="window-header">
                    <h2>Your 14-day free trial starts now</h2>
                    <p>
                        14-day free trial includes both PPC Automation and Analytics tools. After free trial period
                        expires
                        <b> {planName}</b> plan automatically renews for <b>$60.00
                        /month</b> starting from 09 Apr 2022 unless you
                        cancel it.
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
                        <div className="label">PRICE</div>
                        <div className="value">Starting on 09 Apr 2022 <br/> <b>$59.00 /month</b></div>
                    </div>
                    <div className="row with-field">
                        <div className="label">COUPON</div>
                        <div className="value form-group">
                            <input type="text" placeholder={'Enter coupon'}/>
                            <button className="btn grey">
                                Apply
                            </button>
                        </div>
                    </div>
                </div>


                <div className="window-actions">
                    <p>You will not be charged during your Free trial period.</p>

                    <button className="btn default" onClick={onActivate} disabled={processing}>
                        Get Started

                        {processing && <Spin size={'small'}/>}
                    </button>
                </div>
            </div>)
        } else if (activateType === 'switch') {
            return (<div className={'switch-subscription'}>
                <div className="window-header">
                    <h2>Are you sure you want to switch plan?</h2>
                    <p>
                        We’re about to
                        charge <b>{!fetchProcessing ? `$${numberMask(activateInfo[plan].upcoming_invoice.payment.total_actual, 2)}` : '-'}</b> from
                        your default method
                        payment <b>**** {state.subscriptions[state.active_subscription_type].upcoming_invoice.payment.card_last_4}</b>. Are you
                        sure you want to continue?
                    </p>

                    <div className="rebate">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="12" fill="#6959AB"/>
                            <path
                                d="M10.6282 6.17221C10.6282 5.41479 11.2422 4.80078 11.9996 4.80078C12.757 4.80078 13.371 5.41479 13.371 6.17221C13.371 6.92963 12.757 7.54364 11.9996 7.54364C11.2422 7.54364 10.6282 6.92963 10.6282 6.17221ZM15.0853 17.8294C15.0853 18.2081 14.7783 18.5151 14.3996 18.5151H10.2853C9.90661 18.5151 9.59961 18.2081 9.59961 17.8294C9.59961 17.4506 9.90661 17.1436 10.2853 17.1436C10.664 17.1436 10.971 16.8366 10.971 16.4579V10.9722C10.971 10.5935 10.664 10.2865 10.2853 10.2865C9.90661 10.2865 9.59961 9.97949 9.59961 9.60078C9.59961 9.22207 9.90661 8.91507 10.2853 8.91507H10.971H13.0282C13.4069 8.91507 13.7139 9.22207 13.7139 9.60078V16.4579C13.7139 16.8366 14.0209 17.1436 14.3996 17.1436C14.7783 17.1436 15.0853 17.4506 15.0853 17.8294Z"
                                fill="#D2CDE6"/>
                        </svg>

                        <div className="col">
                            <h4>Rebate</h4>
                            <p>
                                If you switch your plan you’ll receive a rebate for the <b>$20.00</b>. Lorem ipsum dolor
                                sit amet, consectetur adipiscing elit. Viverra amet
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
                        <div className="label">PRICE</div>
                        <div className="value">
                            <b>{!fetchProcessing ? `$${numberMask(activateInfo[plan].upcoming_invoice.payment.total_actual, 2)}` : '-'}  per
                                month</b></div>
                    </div>
                    <div className="row">
                        <div className="label">NEXT PAYMENT</div>
                        <div className="value"><b>09 Apr 2022</b></div>
                    </div>
                    <div className="row with-field">
                        <div className="label">COUPON</div>
                        <div className="value form-group">
                            <input type="text" placeholder={'Enter coupon'}/>
                            <button className="btn grey">
                                Apply
                            </button>
                        </div>
                    </div>
                </div>


                <div className="window-actions">
                    <button className="btn default" onClick={onActivate} disabled={processing}>
                        Submit

                        {processing && <Spin size={'small'}/>}
                    </button>
                </div>
            </div>)
        } else {
            return (<div className={'on-subscribe'}>
                <div className="window-header">
                    <h2>Do you want to subscribe?</h2>
                    <p>
                        We’re about to
                        charge <b>{!fetchProcessing ? `$${numberMask(activateInfo[plan].upcoming_invoice.payment.total_actual, 2)}` : '-'}</b> from
                        your default method
                        payment <b>**** {state.subscriptions[state.active_subscription_type].upcoming_invoice.payment.card_last_4}</b>. Are you
                        sure you want to continue?
                    </p>
                </div>

                <div className="subscription-details">
                    <div className="row">
                        <div className="label">PLAN</div>
                        <div className="value"><b>{planName}</b></div>
                    </div>
                    <div className="row">
                        <div className="label">PRICE</div>
                        <div className="value">
                            <b>{!fetchProcessing ? `$${numberMask(activateInfo[plan].upcoming_invoice.payment.total_actual, 2)}` : '-'}  per
                                month</b></div>
                    </div>
                    <div className="row">
                        <div className="label">NEXT PAYMENT</div>
                        <div className="value"><b>09 Apr 2022</b></div>
                    </div>
                    <div className="row with-field">
                        <div className="label">COUPON</div>
                        <div className="value form-group">
                            <input type="text" placeholder={'Enter coupon'}/>
                            <button className="btn grey">
                                Apply
                            </button>
                        </div>
                    </div>
                </div>

                <div className="window-actions">
                    <button className="btn default" onClick={onActivate} disabled={processing}>
                        Submit

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

        </ModalWindow>
    )
}

const CloseWindowButton = ({onClick}) => <button className="btn icon close-button" onClick={onClick}>
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g>
            <path
                d="M1 1L9.96875 9.96875M9.96875 9.96875L18.9375 1M9.96875 9.96875L1 18.9375M9.96875 9.96875L18.9375 18.9375"
                stroke="#C9CBD4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
    </svg>
</button>

