import React from 'react';
import {InputNumber} from 'antd';

import './InputCurrency.less';

const Dollar = ({typeIcon}) => (
    <span className="Dollar">{typeIcon === 'margin' ? '%' : '$'}</span>
);

const InputCurrency = ({
                           isError = false, value, errorText = '', typeIcon, ...props
                       }) => (
    <div className="InputCurrency">
        <Dollar
            typeIcon={typeIcon}
        />
        <InputNumber
            {...props}
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
