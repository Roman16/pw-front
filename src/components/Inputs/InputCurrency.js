import React from 'react';
import { InputNumber } from 'antd';

import './InputCurrency.less';

const Dollar = () => (
    <span className="Dollar">$</span>
);

const InputCurrency = ({
    isError = false, value, errorText = '', ...props
}) => (
    <div className="InputCurrency">
        <Dollar />
        <InputNumber
            {...props}
            value={value}
            type="number"
            min={0}
            onBlur={e => props.onBlur(e.target.value)}
        />
        {isError && (
            <span className="error">
                {errorText}
            </span>
        )}
    </div>
);

export default InputCurrency;
