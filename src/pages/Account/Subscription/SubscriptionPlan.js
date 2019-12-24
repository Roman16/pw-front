import React, {Fragment, useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {Spin} from "antd";
import reload from "../../../assets/img/icons/reload.svg";
import ppcIcon from "../../../assets/img/icons/ppc-automate-icon.svg";
import moment from "moment";
import {numberMask} from "../../../utils/numberMask";
import {history} from "../../../utils/history";
import {useSelector} from "react-redux";

const SubscriptionPlan = ({onOpenAccountWindow, onOpenReactivateWindow, product, onSubscribe, stripeId}) => {
    const {mwsConnected, ppcConnected} = useSelector(state => ({
        mwsConnected: state.user.account_links.length > 0 ? state.user.account_links[0].amazon_mws.is_connected : false,
        ppcConnected: state.user.account_links.length > 0 ? state.user.account_links[0].amazon_ppc.is_connected : false
    }));

    const [disableButton, changeButton] = useState(false);
    let timeout = null;

    function handleSubscribe() {
        onSubscribe(product);
        changeButton(true);
    }

    function renderPlanContent() {
        if (!mwsConnected || !ppcConnected) {
            return (
                <div className="load-data">
                    <div className='load-text'>Please connect your Amazon MWS and PPC accounts</div>
                </div>
            )
        } else if (product.next_charge_value == null || product.flat_amount == null || product.quantity == null) {
            return (
                <div className="load-data">
                    <div className='load-text'>We are loading your Amazon data. <br/>Come back in a few
                        hours.
                    </div>
                    <Spin/>
                </div>
            )
        } else {
            return (
                <Fragment>
                    <div className="charged-description">
                        <p className="charged-text">You’ll be charged</p>
                        <p className="charged-data">$ {numberMask(product.next_charge_value, 2) || 0}</p>
                    </div>

                    <div className="indicators-text">
                        based on{" "}
                        <span className="indicators-data">
                                          $ {product.flat_amount || 0} + {product.percent_amount || 0}%
                                          <sub>monthly ad spend</sub>
                                        </span>
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
        } else if (product.has_access && !product.cancelled) {
            return (
                <Fragment>
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
                </Fragment>
            )
        } else if (!product.has_access && stripeId) {
            return (
                <div className="subscribe-btn">
                    <button className="btn green-btn" onClick={handleSubscribe} disabled={disableButton}>
                        {disableButton ? <Spin/> : 'Subscribe'}
                    </button>
                </div>
            )
        }
    }


    useEffect(() => {
        if (disableButton) {
            timeout = setTimeout(() => history.push('/account-billing'), 10000)
        }

        return () => {
            clearTimeout(timeout);
        }
    }, [disableButton]);

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
                    <img className="reactivate-img" src={reload} alt="reload"/>
                </button>
            </div>}

            <div className="automate">
                <div className="ppc">
                    <div className="ppc-title-wrap">
                        <img className="ppc-icon" src={ppcIcon} alt="icon"/>
                        <h2 className="ppc-title">{product.productName}</h2>
                    </div>
                    <p className="ppc-text">
                        Access and edit your account's <br/> Profit Whales subscription
                    </p>
                    <p className="ppc-link-wrap">
                        To view your invoices, see&nbsp;
                        <Link className="ppc-link" to="/account-billing">
                            billing info
                        </Link>
                    </p>
                </div>

                <div className="plan">
                    <div className="charged">
                        <h3 className="charged-title">{product.planName}</h3>

                        {renderPlanContent()}
                    </div>

                    {(product.next_charge_value !== null && product.flat_amount !== null && product.quantity !== null) &&
                    <p className="plan-text">
                        Your Monthly Amazon PPC Spend: <span
                        className="plan-data">$ {numberMask(product.quantity, 2) || 0}</span>
                    </p>}
                </div>


                <div className="cancel">
                    {renderButtonsBlock()}
                </div>
            </div>
        </div>
    )
};

export default SubscriptionPlan;
