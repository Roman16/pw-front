import React, {useState} from "react"
import {numberMask} from "../../../utils/numberMask"
import {Spin} from "antd"
import {SVG} from "../../../utils/icons"

export const roundTo = (num, digits, minFix) => {
    const multiplicator = Math.pow(10, digits)
    const multiplied = parseFloat((num * multiplicator).toFixed(11))
    const res = Math.round(multiplied) / multiplicator
    return res
}

const Summary = ({jobPrice, payProcessing, couponInfo, onCheckCoupon, checkProcessing}) => {
    const [openedRow, setOpenedRow] = useState(),
        [coupon, setCoupon] = useState('')

    const openRowHandler = (row) => {
        setOpenedRow(row === openedRow ? undefined : row)
    }

    return (
        <div className="summary">
            <h2>Summary</h2>

            <div className="table">
                <div className="row header">
                    <div><span>#</span>Description</div>
                    <div>Amount</div>
                    <div>Unit Price</div>
                    <div>Total</div>
                </div>

                <div className="row">
                    <div><span>1</span>Fee</div>
                    <div></div>
                    <div></div>
                    <div>${numberMask(jobPrice.flat.summary.total_price_in_cents / 100, 2)}</div>
                </div>

                <div className={`row ${openedRow === 'keywords' ? 'active' : ''}`}>
                    <div><span>2</span>Keywords <button
                        type={'button'}
                        className={`sds-btn icon`}
                        onClick={() => openRowHandler('keywords')}>
                        <SVG id='select-icon'/>
                    </button></div>
                    <div>{jobPrice.keywords.summary.total_entities_count}</div>
                    <div>${numberMask(jobPrice.keywords.summary.total_average_price_in_cents_per_unit_rounded / 100, 2)}</div>
                    <div>${numberMask(jobPrice.keywords.summary.total_price_in_cents / 100, 2)}</div>
                </div>

                {openedRow === 'keywords' && <div className="description-list">
                    {jobPrice.keywords.details.map(i => <div className="row">
                        <div></div>
                        <div>{i.entities_count}</div>
                        <div>${numberMask(i.price_in_usd_cents / 100, 2)}</div>
                        <div>${numberMask(i.sum_price_in_cents / 100, 2)}</div>
                    </div>)}
                </div>}

                <div className={`row ${openedRow === 'asins' ? 'active' : ''}`}>
                    <div><span>3</span>ASINs <button
                        type={'button'}
                        className={`sds-btn icon`}
                        onClick={() => openRowHandler('asins')}>
                        <SVG id='select-icon'/>
                    </button></div>
                    <div>{jobPrice.product_targetings.summary.total_entities_count}</div>
                    <div>${roundTo(jobPrice.product_targetings.summary.total_average_price_in_cents_per_unit_rounded / 100, 4)}</div>
                    <div>${roundTo(jobPrice.product_targetings.summary.total_price_in_cents / 100, 4)}</div>
                </div>

                {openedRow === 'asins' && <div className="description-list">
                    {jobPrice.product_targetings.details.map(i => <div className="row">
                        <div></div>
                        <div>{i.entities_count}</div>
                        <div>${roundTo(i.price_in_usd_cents / 100, 4)}</div>
                        <div>${roundTo(i.sum_price_in_cents / 100, 4)}</div>
                    </div>)}
                </div>}
            </div>

            <div className="coupon-block">
                <div className="col">
                    <h2>Enter Coupon</h2>

                    {couponInfo && <p>Applied coupon: <span>{couponInfo.name}</span></p>}
                </div>

                <div className="row">
                    <div className="form-group">
                        <input
                            placeholder={'Your coupon'}
                            value={coupon}
                            onChange={({target: {value}}) => setCoupon(value)}
                        />
                    </div>

                    <button disabled={checkProcessing} type={'button'} className="btn blue" onClick={() => onCheckCoupon(coupon)}>
                        Apply

                        {checkProcessing && <Spin size={'small'}/>}
                    </button>
                </div>
            </div>

            <div className="action-block">
                <div className="total-price">
                    <div className={'label'}>Total:</div>

                    <div className="value">
                        {couponInfo && <div className="prev-value">
                            ${numberMask(jobPrice.grand_total_price_in_cents / 100, 2)}
                        </div>}

                        ${couponInfo?.amount_off ? numberMask(jobPrice.grand_total_price_in_cents - couponInfo.amount_off / 100, 2) :
                            couponInfo?.percent_off ? numberMask((jobPrice.grand_total_price_in_cents - (jobPrice.grand_total_price_in_cents * couponInfo.percent_off / 100)) / 100, 2) :
                                numberMask(jobPrice.grand_total_price_in_cents / 100, 2)}
                    </div>
                </div>

                <button
                    className={'btn default'}
                    disabled={payProcessing}
                >
                    Pay
                    {payProcessing && <Spin size={'small'}/>}
                </button>
            </div>
        </div>

    )
}

export default Summary