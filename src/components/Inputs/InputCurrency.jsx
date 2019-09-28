import React from 'react';
import { Input } from 'antd';
import './InputCurrency.less';

const Dollar = () => (
    <span className="Dollar">$</span>
);

const InputCurrency = ({
    isError = false, value, errorText = '', ...props
}) => (
    <div className="InputCurrency">
        <Input
            {...props}
            prefix={<Dollar />}
            value={value}
            type="number"
        />
        {isError && (
            <span className="error">
                {errorText}
            </span>
        )}
    </div>
);

export default InputCurrency;
