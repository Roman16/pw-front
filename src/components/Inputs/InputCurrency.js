import React from 'react'
import {InputNumber} from 'antd'
import './InputCurrency.less'
import {SVG} from "../../utils/icons"
import {string} from "prop-types"
import InformationTooltip from "../Tooltip/Tooltip"

const Dollar = ({typeIcon}) => (
    <span className={`Dollar ${typeIcon}`}>{typeIcon === 'percent' ? <SVG id={'percent-icon'}/> :
        <SVG id={'dollar-icon'}/>}</span>
)

const InputCurrency = ({
                           isError = false, value, errorText = '', type = 'number', typeIcon, ...props
                       }) => (
    <div className="InputCurrency">
        <Dollar
            typeIcon={typeIcon}
        />
        <InputNumber
            {...props}
            value={value}
            type={type}
        />
        {isError && (
            <span className="error">
                {errorText}
            </span>
        )}
    </div>
)

//typeIcon:
//percent -> %
//other -> $

InputCurrency.propTypes = {
    typeIcon: string,
}

export default React.memo(InputCurrency)
