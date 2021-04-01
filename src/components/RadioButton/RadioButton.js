import React from "react"
import './RadioButton.less'


export const Radio = ({label, checked, onChange}) => {
    return <div className={`pw-radio radio-wrap ${checked ? 'checked' : ''}`} onClick={onChange}>
        <div className="radio">
            <div className="check"/>
        </div>

        {label && <label htmlFor="">{label}</label>}
    </div>
}