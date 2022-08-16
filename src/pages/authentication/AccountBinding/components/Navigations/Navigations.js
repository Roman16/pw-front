import React from "react"
import {CheckSmall} from "../../../../ZeroToHero/CreatingCampaign/Navigation/Navigation"

const steps = [
    // "Choose Account Type",
    "Select Region",
    // "Set Account Alias",
    "Connect Seller Acount",
    "Connect Advertising Account"
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
