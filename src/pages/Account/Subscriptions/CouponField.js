import React, {useState} from "react"
import {Spin} from "antd"

export const CouponField = ({placeholder,processing, onApply}) => {
    const [value, setValue] = useState('')

    return (
        <div className="coupon-field">
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
    )
}