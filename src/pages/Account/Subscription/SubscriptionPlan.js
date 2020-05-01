import React, {Fragment, useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {Spin, Table} from "antd";
import ppcIcon from "../../../assets/img/icons/ppc-automate-subscription-logo.svg";
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
                              disableButton
                          }) => {

    const {mwsConnected, ppcConnected} = useSelector(state => ({
        mwsConnected: state.user.account_links.length > 0 ? state.user.account_links[0].amazon_mws.is_connected : false,
        ppcConnected: state.user.account_links.length > 0 ? state.user.account_links[0].amazon_ppc.is_connected : false
    }));

    const [coupon, setCoupon] = useState('');

    let timeout = null;

    function handleSubscribe() {
        onSubscribe({coupon, ...product});
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

    // useEffect(() => {
    //     setCoupon('');
    // }, [product])

    const columns = [
        {
            title: 'Product',
            dataIndex: 'productName',
            key: 'productName',
        },
        {
            title: 'Status',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Next invoice date',
            dataIndex: 'next_invoice_at',
            key: 'next_invoice_at',
            render: date => moment(date).format('MMM DD, YYYY')
        },
        {
            title: 'Price',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Plan',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Last 30-days Ad Spend',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Coupon',
            dataIndex: 'address',
            key: 'address',
        },
    ];

    useEffect(() => {
        // console.log(product);

    }, [product])


    return (
        <div className="subscriptions">
            <div className="description">
                <h2>Subscription for Seller ID:</h2>
                <p>This is a prepaid plan, and you are paying for the next 30 days of using it.</p>
                <p>To view your invoices, <a href="">see billing info</a></p>
            </div>

            <Table
                dataSource={product.productId && [product]}
                columns={columns}
                pagination={false}
                loading={!product.productId}
            />

            <div className="subscription-actions">
                {product.has_access && !product.cancelled && <>
                    <button className={'btn white bord'} onClick={() => onOpenAccountWindow(product)}>Cancel
                        Subscription
                    </button>

                    <p>You will have access to the software until the end of this billing cycle.</p>
                </>}

                {product.grace_period && product.grace_period.on_grace_period &&
                <button className={'btn default'} onClick={() => onOpenReactivateWindow(product)}>Reactivate</button>
                }
            </div>
        </div>
    )
};

export default SubscriptionPlan;
