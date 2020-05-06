import React, {Fragment, useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {Input, Spin, Table} from "antd";
import ppcIcon from "../../../assets/img/icons/ppc-automate-subscription-logo.svg";
import moment from "moment";
import {numberMask} from "../../../utils/numberMask";
import {history} from "../../../utils/history";
import {useSelector} from "react-redux";
import InformationTooltip from "../../../components/Tooltip/Tooltip";
import {SVG} from "../../../utils/icons";

const CouponField = ({applyCoupon, setCoupon, product}) => {
    const [openedField, openField] = useState(false);

    const submitCouponHandler = () => {
        if (!openedField) {
            openField(true)
        } else {
            applyCoupon()
        }
    }

    if (product.status === 'not_connect') {
        return '---'
    } else {
        return (
            <div className={'form-group coupon-fields'}>
                <Input onChange={e => setCoupon(e.target.value)}/>
                <button onClick={submitCouponHandler} className={`btn default p15 ${openedField ? 'short' : ''}`}>
                    <SVG id={'plus-icon'}/>
                    <span>Add Coupon</span>
                </button>

                {product.applied_coupon.name !== null && <span className="coupon-name">
              <span>Coupon:</span>
                    {product.applied_coupon.amount_off && <b>${product.applied_coupon.amount_off}</b>}
                    {product.applied_coupon.percent_off && <b>{product.applied_coupon.percent_off}%</b>}
            </span>}
            </div>
        )
    }
}

const ProductPrice = ({product}) => {
    if (product.status === 'not_connect') {
        return (<div className={'price'}>
            ---
            <br/>
            <Link to={'/pricing'} target={'_blank'}>How it’s calculated?</Link>
        </div>)

    } else if (product.applied_coupon.name == null) {
        return (<div className={'price'}>
            ${numberMask(product.next_charge_value, 2)}
            <br/>
            <Link to={'/pricing'} target={'_blank'}>How it’s calculated?</Link>
        </div>)
    } else if (product.applied_coupon.amount_off) {
        return (<div className={'price'}>
            <span className="prev-value">
                ${numberMask(product.next_charge_value, 2)}
            </span>

            <span className="new-value">
                ${numberMask(product.next_charge_value - product.applied_coupon.amount_off, 2)}
            </span>
            <br/>
            <Link to={'/pricing'} target={'_blank'}>How it’s calculated?</Link>
        </div>)
    } else if (product.applied_coupon.percent_off) {
        return (<div className={'price'}>
            <span className="prev-value">
                ${numberMask(product.next_charge_value, 2)}
            </span>

            <span className="new-value">
                ${numberMask(product.next_charge_value - ((product.next_charge_value / 100) * product.applied_coupon.percent_off), 2)}
            </span>

            <br/>
            <Link to={'/pricing'} target={'_blank'}>How it’s calculated?</Link>
        </div>)
    } else {
        return '---'
    }
}


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

    const {mwsConnected, ppcConnected, sellerId} = useSelector(state => ({
        mwsConnected: state.user.account_links.length > 0 ? state.user.account_links[0].amazon_mws.is_connected : false,
        ppcConnected: state.user.account_links.length > 0 ? state.user.account_links[0].amazon_ppc.is_connected : false,
        sellerId: state.user.default_accounts.amazon_mws.seller_id
    }));

    const [coupon, setCoupon] = useState(null);


    function handleSubscribe() {
        onSubscribe({coupon, ...product});
    }

    const columns = [
        {
            title: 'Product',
            dataIndex: 'productName',
            key: 'productName',
            width: '12.857142857142858rem'
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: status => <div className={'status-field'}>
                {status === 'not_connect' && <div className={'error-status'}>
                    {!mwsConnected && ppcConnected && <Link to={'/connect-mws-account'}>Needs API Connection</Link>}
                    {!ppcConnected && mwsConnected && <Link to={'/connect-ppc-account'}>Needs API Connection</Link>}
                    {!ppcConnected && !mwsConnected && <Link to={'/connect-amazon-account'}>Needs API Connection</Link>}
                </div>}

                {status === 'Ongoing' && <div className="success-status">
                    {status}
                </div>}
            </div>,
            width: '12.857142857142858rem'
        },
        {
            title: 'Next invoice date',
            dataIndex: 'next_invoice_at',
            key: 'next_invoice_at',
            render: date => date ? moment(date).format('MMM DD, YYYY') : '---',
            width: '14.285714285714286rem'
        },
        {
            title: 'Price',
            dataIndex: 'next_charge_value',
            key: 'next_charge_value',
            render: (price, product) => <ProductPrice product={product}/>,
            width: '14.285714285714286rem'
        },
        {
            title: 'Plan',
            dataIndex: 'plan',
            key: 'plan',
            render: (plan, product) => product.status === 'not_connect' ? <>---</> : <> ${product.flat_amount || 0} + {product.percent_amount || 0}%
                last
                30 <br/> days ad spend</>,
            width: '14.285714285714286rem'
        },
        {
            title: 'Last 30-days Ad Spend',
            dataIndex: 'quantity',
            key: 'quantity',
            render: spend => spend ? <>${numberMask(spend, 2)}</> : '---',
            width: '14.285714285714286rem'
        },
        {
            title: 'Coupon',
            dataIndex: 'coupon',
            key: 'coupon',
            render: (action, product) => <CouponField
                applyCoupon={() => {
                    (!product.has_access && stripeId) ? getCouponStatus(coupon) : applyCoupon(product.productId, product.plan_id, coupon)
                }}
                setCoupon={setCoupon}
                product={product}
            />,
            width: '14.285714285714286rem'
        },
    ];


    const notConnectData = [{
        status: 'not_connect',
        productName: product.productName
    }]

    return (
        <div className="subscriptions">
            <div className="description">
                <h2>Subscription for Seller ID: {sellerId || ''}</h2>
                <p>This is a prepaid plan, and you are paying for the next 30 days of using it.</p>
                <p>To view your invoices, <a href="">see billing info</a></p>
            </div>

            <Table
                dataSource={(!mwsConnected || !ppcConnected) ? notConnectData : product.productId && [{
                    ...product,
                    status: 'Ongoing'
                }]}
                columns={columns}
                pagination={false}
                loading={fetching}
                scroll={{x: 800}}
            />


            {!fetching && <div className="subscription-actions">
                {(!mwsConnected || !ppcConnected) && <button disabled className={'btn default'}>Subscribe</button>}

                {mwsConnected && ppcConnected && !product.has_access && stripeId &&
                <button className="btn default on-subscribe" onClick={handleSubscribe} disabled={disableButton}>
                    {disableButton ? <Spin/> : 'Subscribe'}
                </button>}

                {mwsConnected && ppcConnected && product.has_access && !product.cancelled && <>
                    <button className={'btn white bord'} onClick={() => onOpenAccountWindow(product)}>Cancel
                        Subscription
                    </button>

                    <p>You will have access to the software until the end of this billing cycle.</p>
                </>}

                {product.grace_period && product.grace_period.on_grace_period &&
                <button className={'btn default'} onClick={() => onOpenReactivateWindow(product)}>Reactivate</button>
                }
            </div>
            }
        </div>
    )
};

export default SubscriptionPlan;
