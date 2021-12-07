import React, {useState} from "react"
import {Link} from "react-router-dom"
import {Input, Spin} from "antd"
import moment from "moment"
import {numberMask} from "../../../utils/numberMask"
import {useSelector} from "react-redux"
import {SVG} from "../../../utils/icons"

const priceLandingUrl = 'https://sponsoreds.com/pricing'


const SubscriptionPlan = ({
                              onOpenAccountWindow,
                              onOpenReactivateWindow,
                              product,
                              onSubscribe,
                              stripeId,
                              applyCoupon,
                              fetching,
                              getCouponStatus,
                              disableButton,
                              onStartTrial
                          }) => {

    const {mwsConnected, ppcConnected, sellerId, subscribedProduct, user, importStatus} = useSelector(state => ({
        mwsConnected: state.user.account_links.length > 0 ? state.user.account_links[0].amazon_mws.is_connected : false,
        ppcConnected: state.user.account_links.length > 0 ? state.user.account_links[0].amazon_ppc.is_connected : false,
        sellerId: state.user.default_accounts.amazon_mws.seller_id,
        subscribedProduct: state.user.subscriptions[Object.keys(state.user.subscriptions)[0]],
        user: state.user.user,
        importStatus: state.user.importStatus,
    }))

    const [coupon, setCoupon] = useState(null)


    function handleSubscribe() {
        onSubscribe({coupon, ...product})
    }

    const columns = [
        {
            title: 'Product',
            dataIndex: 'productName',
            key: 'productName',
            width: '12.857142857142858rem',
            render: (productName) => productName
        },
        {
            title: 'Status',
            dataIndex: 'stripe_status',
            key: 'stripe_status',
            width: '200px',
            render: status => {
                if (product.grace_period && product.grace_period.on_grace_period) {
                    return (<div className={'status-field'}>
                        <div className={'error-status'}>
                            Canceled
                        </div>
                    </div>)
                } else if (status === 'not_connect') {
                    return (
                        <div className={'status-field'}>
                            <div className={'error-status'}>
                                {!mwsConnected && ppcConnected &&
                                <Link to={'/connect-mws-account'}>Needs API Connection</Link>}
                                {!ppcConnected && mwsConnected &&
                                <Link to={'/connect-ppc-account'}>Needs API Connection</Link>}
                                {!ppcConnected && !mwsConnected &&
                                <Link to={'/connect-amazon-account'}>Needs API Connection</Link>}
                            </div>
                        </div>
                    )
                } else if (status === 'active') {
                    return (<div className={'status-field'}>
                        <div className="success-status">
                            {status}
                        </div>
                    </div>)
                } else {
                    return (<div className={'status-field'}>
                        <div className="progress-status">
                            {status}
                        </div>
                    </div>)
                }
            },
        },
        {
            title: 'Next invoice date',
            dataIndex: 'next_invoice_at',
            key: 'next_invoice_at',
            render: date => date ? moment(date).format('MMM DD, YYYY') : '---',
        },
        {
            title: 'Price',
            dataIndex: 'next_charge_value',
            key: 'next_charge_value',
            render: (price, product) => <ProductPrice product={product}/>,
        },
        {
            title: 'Plan',
            dataIndex: 'plan',
            key: 'plan',
            render: (plan, product) => product.status === 'not_connect' ? <>---</> : <> ${numberMask(product.flat_amount || 0, 2)} last
                30 days <br/> ad spend</>,
        },
        {
            title: 'Last 30-days Ad Spend',
            dataIndex: 'quantity',
            key: 'quantity',
            render: spend => spend ? <>${numberMask(spend, 2)}</> : '---',
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
            width: '170px'
        },
    ]


    const notConnectData = {
        stripe_status: 'not_connect',
        productName: product.productName
    }

    return (
        <div className="subscriptions">
            <h3>Subscription for Seller ID: {sellerId || ''}</h3>
            <p>This is a prepaid plan, and you are paying for the next 30 days of using it. To view your invoices, <Link
                to={'/account/billing-history'}>see billing history</Link></p>

            <div className="table">
                {columns.map(column => {
                    return (<div className="col">
                        <div className="header">
                            {column.title}
                        </div>

                        <div className="value">
                            {!fetching ? (!mwsConnected || !ppcConnected) ? column.render(notConnectData[column.key], notConnectData) : column.render(product[column.key], product) : '---'}
                        </div>
                    </div>)
                })}

                {fetching && <div className="load-data"><Spin/></div>}
            </div>


            {!fetching && <div className="subscription-actions">
                <Actions
                    mwsConnected={mwsConnected}
                    ppcConnected={ppcConnected}
                    product={product}
                    subscribedProduct={subscribedProduct}
                    stripeId={stripeId}
                    disableButton={disableButton}
                    user={user}
                    importStatus={importStatus}

                    onSubscribe={handleSubscribe}
                    onCancelSubscribe={() => onOpenAccountWindow(product)}
                    onReactivateSubscribe={() => onOpenReactivateWindow(product)}
                    onStartTrial={onStartTrial}
                />
            </div>}
        </div>
    )
}


const CouponField = ({applyCoupon, setCoupon, product}) => {
    const [openedField, openField] = useState(false)

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

                {product.applied_coupon && product.applied_coupon.name !== null && <span className="coupon-name">
              <span>Coupon:</span>
                    {product.applied_coupon.amount_off !== null && product.applied_coupon.amount_off !== 0 &&
                    <b>${product.applied_coupon.amount_off}</b>}
                    {product.applied_coupon.percent_off !== null && product.applied_coupon.percent_off !== 0 &&
                    <b>{product.applied_coupon.percent_off}%</b>}
            </span>}
            </div>
        )
    }
}

export const ProductPrice = ({product}) => {
    if (product.status === 'not_connect') {
        return (<div className={'price'}>
            ---
            <br/>
            <a href={priceLandingUrl} target={'_blank'}>How it’s calculated?</a>
        </div>)
    } else if (!product.applied_coupon || product.applied_coupon.name == null) {
        return (<div className={'price'}>
            {product.next_charge_value ? `$${numberMask(product.next_charge_value, 2)}` : '---'}
            <br/>
            <a href={priceLandingUrl} target={'_blank'}>How it’s calculated?</a>
        </div>)
    } else if (product.applied_coupon && product.applied_coupon.amount_off) {
        return (<div className={'price'}>
            <span className="prev-value">
                ${numberMask(product.next_charge_value + product.applied_coupon.amount_off, 2)}
            </span>

            <span className="new-value">
                ${numberMask(product.next_charge_value, 2)}
            </span>
            <br/>
            <a href={priceLandingUrl} target={'_blank'}>How it’s calculated?</a>
        </div>)
    } else if (product.applied_coupon && product.applied_coupon.percent_off) {
        return (<div className={'price'}>
            <span className="prev-value">
                ${numberMask(product.next_charge_value / ((100 - product.applied_coupon.percent_off) / 100), 2)}
            </span>

            <span className="new-value">
                ${numberMask(product.next_charge_value, 2)}
            </span>
            <br/>
            <a href={priceLandingUrl} target={'_blank'}>How it’s calculated?</a>
        </div>)
    } else {
        return '---'
    }
}

const Actions = ({mwsConnected, ppcConnected, product, subscribedProduct, disableButton, stripeId, user, importStatus, onSubscribe, onCancelSubscribe, onReactivateSubscribe, onStartTrial}) => {
    const renderDate = (date) => moment(date).format('MMM DD, YYYY')

    if (!importStatus.ppc_automate.required_parts_ready) {
        return <>
            <button
                disabled
                className={'btn default'}
            >
                Subscribe
            </button>

            <p>PPC Automation tool is not ready to use yet. We are currently <br/> syncing data from your Amazon account
                with our system.</p>
        </>
    } else if (!subscribedProduct.eligible_for_subscription) {
        return (<>
            <button
                disabled
                className={'btn default'}
            >
                Subscribe
            </button>

            <p>{subscribedProduct.ineligible_for_subscription_reason}</p>
        </>)
    } else if (user.free_trial_available && importStatus.ppc_automate.required_parts_ready) {
        return <button
            disabled={disableButton}
            className={'btn default'}
            onClick={onStartTrial}
        >
            Start Free Trial
            {disableButton && <Spin size={'small'}/>}
        </button>
    } else if (!user.free_trial_available && subscribedProduct && subscribedProduct.stripe_status == null) {
        return <button disabled className={'btn default'}>
            Starting Free Trial
            <Spin size={'small'}/>
        </button>
    }  else if (mwsConnected && ppcConnected && !product.has_access && stripeId) {
        return <button
            className="btn default on-subscribe"
            onClick={onSubscribe}
            disabled={disableButton}
        >
            Subscribe
            {disableButton && <Spin size={'small'}/>}
        </button>
    } else if (!user.free_trial_available && !subscribedProduct.has_access) {
        return (<>
            <button className={'btn default'} disabled>
                Subscribe
            </button>

            <p>
                It looks like your trial has expired, or you didn’t renew your subscription plan. <br/>
                Please upgrade to Pro subscription to continue using Sponsoreds Software.
            </p>
        </>)
    } else if (mwsConnected && ppcConnected && product.has_access && !product.cancelled) {
        return (<>
            <button className={'btn cancel'} onClick={onCancelSubscribe}>
                Cancel Subscription
            </button>

            <p>You will have access to the software until the end of this billing cycle.</p>
        </>)
    } else if (product.cancelled) {
        return (<>
                <button className={'btn default'} onClick={onReactivateSubscribe}>
                    Reactivate
                </button>

                <p>
                    You will have access to the software until
                    the {product.on_trial ? renderDate(product.trial_ends_at) : product.ends_at ? renderDate(product.ends_at) : renderDate(product.grace_period.on_grace_period_until)}.
                </p>
            </>
        )
    } else {
        return ('')
    }

}

export default SubscriptionPlan
