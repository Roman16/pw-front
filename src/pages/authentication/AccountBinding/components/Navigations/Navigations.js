import React from "react"
import {CheckSmall} from "../../../../ZeroToHero/CreatingCampaign/Navigation/Navigation"

const steps = [
    "Choose Account Type",
    "Select Region",
    "Set Account Alias",
    "Connect Seller Acount",
    "Connect Advertising Account"
]

const Navigations = ({current}) => {

    return (<div className="navigations">
        <ul>
            {steps.map((item, index) => <>
                <li className={`${current === index ? 'active' : ''} ${index <= current + 1 ? 'opened' : ''}`}>
                    <div>{current > index ? <CheckSmall/> : index + 1}</div>
                    {item}
                </li>
                {index < 4 && <hr/>}</>)}
        </ul>
    </div>)
}

export default Navigations
