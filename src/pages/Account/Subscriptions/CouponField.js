import React, {useState} from "react"
import {Spin} from "antd"

export const CouponField = ({placeholder, processing, couponInfo, onApply}) => {
    const [value, setValue] = useState('')


    return (
        <div className="coupon-field">
            <div className="row">

                <div className="form-group">
                    <input
                        type="text"
                        placeholder={placeholder}
                        onChange={({target: {value}}) => setValue(value)}
                    />
                </div>

                <button className="btn default" onClick={() => onApply(value)} disabled={processing}>
                    Apply

                    {processing && <Spin size={'small'}/>}
                </button>
            </div>


            {couponInfo && <CouponDetails coupon={couponInfo}/>}
        </div>
    )
}

const CouponDetails = ({coupon}) => {
    if (coupon.duration === 'once') {
        return (<div className="coupon-details">
            {coupon.percent_off ? <b>{coupon.percent_off}%</b> :
                <b>${coupon.amount_off}</b>} one-time discount
        </div>)
    } else if (coupon.duration === 'repeating') {
        return (<div className="coupon-details">
            {coupon.percent_off ? <b>{coupon.percent_off}%</b> :
                <b>${coupon.amount_off}</b>} off for {coupon.duration_in_months} month
        </div>)
    } else {
        return (<div className="coupon-details">
            {coupon.percent_off ? <b>{coupon.percent_off}%</b> :
                <b>${coupon.amount_off}</b>} all-time discount
        </div>)
    }
}