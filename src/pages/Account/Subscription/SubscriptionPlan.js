import React, {Fragment, useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {Spin} from "antd";
import ppcIcon from "../../../assets/img/icons/ppc-automate-icon.svg";
import moment from "moment";
import {numberMask} from "../../../utils/numberMask";
import {history} from "../../../utils/history";
import {useSelector} from "react-redux";
import InformationTooltip from "../../../components/Tooltip/Tooltip";
import {SVG} from "../../../utils/icons";

const SubscriptionPlan = ({
                              onOpenAccountWindow,
                              onOpenReactivateWindow,
                              product,
                              onSubscribe,
                              stripeId,
                              applyCoupon,
                              fetching,
                              getCouponStatus,
                          }) => {

    const {mwsConnected, ppcConnected} = useSelector(state => ({
        mwsConnected: state.user.account_links.length > 0 ? state.user.account_links[0].amazon_mws.is_connected : false,
        ppcConnected: state.user.account_links.length > 0 ? state.user.account_links[0].amazon_ppc.is_connected : false
    }));

    const [disableButton, changeButton] = useState(false);
    const [coupon, setCoupon] = useState('');

    let timeout = null;

    function handleSubscribe() {
        onSubscribe({coupon, ...product});
        changeButton(true);
    }

    function renderPlanContent() {
        if (fetching) {
            return (
                <div className="load-data">
                    <Spin/>
                </div>
            )
        } else if (!mwsConnected || !ppcConnected) {
            return (
                <div className="load-data">
                    <div className='load-text'>Please connect your Amazon MWS and PPC accounts</div>
                </div>
            )
        } else if (product.next_charge_value == null || product.flat_amount == null || product.quantity == null) {
            return (
                <div className="load-data">
                    <div className='load-text'>
                        We are calculating your subscription price. <br/> Please wait for a few seconds.
                    </div>
                    <Spin/>
                </div>
            )
        } else {
            return (
                <Fragment>
                    <div className="indicators-data">
                        $ {product.flat_amount || 0} + <span>{product.percent_amount || 0}%  <div>Monthly <br/> ad spend</div></span>
                    </div>

                    <div className="spend-text">
                        <div className="spend-data">$ {numberMask(product.quantity, 2) || 0}</div>
                        <div className='description'>Your monthly <br/> Ad Spend <InformationTooltip
                            description={'This is the amount of your spend on Amazon PPC for the past 30 days. We update it daily.'}/>
                        </div>
                    </div>

                    <div className="charged-description">
                        <div className="charged-data">$ {numberMask(product.next_charge_value, 2) || 0}</div>
                        <div className='description'>You'll be charged <br/> next billing cycle <InformationTooltip
                            description={'This amount is calculated based on your last 30 days ad spend. It\'s updating every hour, so the exact amount of the invoice will be visible right before the end of the current billing cycle.'}/>
                        </div>
                    </div>
                </Fragment>
            )
        }
    }

    function renderButtonsBlock() {
        if (!mwsConnected || !ppcConnected) {
            return (
                <div className="subscribe-btn">
                    <button className="btn green-btn">
                        {!mwsConnected && !ppcConnected && <Link to={'/mws'}>Edit Credentials</Link>}
                        {mwsConnected && !ppcConnected && <Link to={'/ppc'}>Edit Credentials</Link>}
                    </button>
                </div>
            )
        } else if (!product.has_access && stripeId) {
            return (
                <div className="subscribe-btn">
                    <button className="btn green-btn on-subscribe" onClick={handleSubscribe} disabled={disableButton}>
                        {disableButton ? <Spin/> : 'Subscribe'}
                    </button>
                </div>
            )
        }
    }

    useEffect(() => {
        if (disableButton) {
            timeout = setTimeout(() => history.push('/account-subscription'), 10000)
        }

        return () => {
            clearTimeout(timeout);
        }
    }, [disableButton]);

    useEffect(() => {
        setCoupon('');
    }, [product])

    return (
        <div className="automate-box">
            {product.grace_period && product.grace_period.on_grace_period && <div className="reactivate">
                <h3 className="reactivate-title">
                    Your Subscription Has Been Cancelled
                </h3>
                <p className="reactivate-text">
                    You will have access to the software until the end of this billing
                    cycle {product.grace_period.on_grace_period_until &&
                (<span
                    className="reactivate-data">{moment(product.grace_period.on_grace_period_until).format('MMMM DD, YYYY')}</span>)}
                </p>
                <button
                    className="reactivate-btn"
                    type="button"
                    onClick={() => onOpenReactivateWindow(product)}
                >
                    Reactivate
                    <span className="reactivate-img">
                        <SVG id='reload'/>
                    </span>
                </button>
            </div>}

            <div className="automate">
                <div className="ppc">
                    <div className="ppc-title-wrap">
                        <img  src={ppcIcon} alt="icon" className='ppc-icon'/>
                        <h2 className="ppc-title">{product.productName}</h2>
                    </div>
                    <p className="ppc-text">
                        This is a prepaid plan, and you are paying <br/> for the next 30 days of using it.
                    </p>

                    <Link to={'/pricing'} className={'learn-more'} target={'blank'}>How it’s calculated?</Link>

                    <p className="ppc-link-wrap">
                        To view your invoices, see&nbsp;
                        <a href={'#billing-history'} className="ppc-link">
                            billing info
                        </a>
                    </p>

                </div>


                <div className="plan">
                    <div className="charged">
                        <h3 className="subscription-plan">Subscription <br/> Plan</h3>

                        {renderPlanContent()}
                    </div>

                    {product.has_access && !product.cancelled && <div className='row'>
                        <p className="cancel-text">
                            {product.next_invoice_at && <Fragment> Next Invoice Date: <span
                                className="cancel-data">{moment(product.next_invoice_at).format('MMM DD, YYYY')}</span>
                            </Fragment>}
                        </p>

                        <button
                            className="cancel-btn"
                            type="button"
                            onClick={() => onOpenAccountWindow(product)}
                        >
                            Cancel
                        </button>
                    </div>}

                </div>

                <div className="cancel">
                    {!fetching && (product.next_charge_value !== null && product.flat_amount !== null && product.quantity !== null) &&
                    <div className='coupon'>
                        <h4>Do you have a coupon?</h4>
                        <div className="row">
                            <div className="input-block">
                                <SVG id='coupon-icon'/>
                                <input
                                    type="text"
                                    value={coupon}
                                    onChange={e => setCoupon(e.target.value)}
                                />
                            </div>

                            <button className="btn green-btn"
                                    onClick={() => {
                                        (!product.has_access && stripeId) ? getCouponStatus(coupon) : applyCoupon(product.productId, coupon, product.plan_id)
                                    }}>apply
                            </button>
                        </div>

                        {product.applied_coupon && product.applied_coupon.name && <div className='applied-coupon'>
                            <div className="col">
                                <div className="name">
                                    Coupon
                                </div>
                                <div className="discount">
                                    {product.applied_coupon.amount_off ? `$ ${product.applied_coupon.amount_off}` : `${product.applied_coupon.percent_off} %`} off
                                </div>
                            </div>
                        </div>}
                    </div>
                    }

                    {!fetching && renderButtonsBlock()}
                </div>
            </div>
        </div>
    )
};

export default SubscriptionPlan;
