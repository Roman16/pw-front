import React from "react"
import {SVG} from "../../../utils/icons"

const WelcomeSection = ({active, onStart}) => {
    return (<section className={`lets-start ${active ? 'active' : ''}`}>
        <h2><span>Get Your</span> Amazon Advertising Campaigns <span>Review</span></h2>

        <p>
            This is not an automated, computer-generated audit. We recognize and embrace the <br/>
            value of artificial intelligence, but we find that actual human involvement is required to <br/>
            best identify potential concerns and opportunities. In synergy, we reach success.
        </p>

        <button className={'btn default'} onClick={onStart}>
            let’s get started

            <svg width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="17" height="12">
                    <rect width="16.8" height="12" fill="#C4C4C4"/>
                </mask>
                <g mask="url(#mask0)">
                    <path
                        d="M11.1002 1.19995L15.6002 5.99995M15.6002 5.99995L11.1002 10.8M15.6002 5.99995L1.20019 5.99995"
                        stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
            </svg>
        </button>
    </section>)

}

export default WelcomeSection