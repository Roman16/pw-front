import React from 'react'
import {InputNumber} from 'antd'
import './InputCurrency.less'
import {SVG} from "../../utils/icons"
import {oneOf} from "prop-types"
import {useSelector} from "react-redux"
import {currencyIcons} from './currencyIcons'

const InputCurrency = ({
                           isError = false, value, errorText = '', type = 'number', typeIcon, onClick, ...props
                       }) => {
    const currency = useSelector(state => state.user.activeAmazonMarketplace.currency_code) || 'USD'

    return (
        <div className="InputCurrency" onClick={onClick}>

            {typeIcon === 'percent' ? <PercentIcon/> : <CurrencyIcon currency={currency}/>}

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
}

const PercentIcon = () => <span className={`Dollar percent`}><SVG id={'percent-icon'}/></span>

const CurrencyIcon = ({currency}) => {
    return <span className={`Dollar number`} dangerouslySetInnerHTML={{__html: currencyIcons[currency]}}/>
}


InputCurrency.propTypes = {
    typeIcon: oneOf(['number', 'percent']),
}

export default React.memo(InputCurrency)
