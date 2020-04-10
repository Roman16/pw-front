import React from 'react';
import {InputNumber} from 'antd';
import './InputCurrency.less';
import {SVG} from "../../utils/icons";

const Dollar = ({typeIcon}) => (
    <span className={`Dollar ${typeIcon}`}>{typeIcon === 'percent' ? <SVG id={'percent-icon'}/> : <SVG id={'dollar-icon'}/>}</span>
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

//typeIcon:
//percent -> %
//other -> $

export default InputCurrency;
