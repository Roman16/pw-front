import React from "react"

const steps = [
    // "Choose Account Type",
    "Select Region",
    // "Set Account Alias",
    "Connect Selling Partner API",
    "Connect Amazon Ads API"
]

const Navigations = ({current}) => {

    return (<div className={`navigations active-${current}`}>
        <ul>
            {steps.map((item, index) => <>
                <li className={`${current === index ? 'active' : ''} ${index <= current + 1 ? 'opened' : ''} ${index < current ? 'finished' : ''}`}>
                    <div>{current > index ? <CheckSmall/> : index + 1}</div>
                    <span>{item}</span>
                </li>
                {index < 2 && <hr/>}</>)}

            <div className="bar" style={{width: `${20 * (current + 1)}%`}}/>
        </ul>
    </div>)
}

export default Navigations

export const CheckSmall = () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="mask0" maskUnits="userSpaceOnUse" x="0" y="0" width="14" height="14">
        <rect x="0.5" y="0.5" width="13" height="13" fill="#791313" stroke="#353A3E"/>
    </mask>
    <g>
        <path d="M1 7.92593L5 12L13 2" stroke="white" stroke-width="2"/>
    </g>
</svg>
