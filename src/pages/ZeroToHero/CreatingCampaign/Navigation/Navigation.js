import React from "react"
import './Navigation.less'

const steps = [
    'Product Selection',
    'Required Settings',
    'Optional Settings',
    'Overview'
]

const Navigation = ({currentStep, openedSteps, onChangeStep}) => {

    return (
        <ul className="zth-steps-navigation">
            {steps.map((item, index) => <li
                className={`${currentStep === index ? 'active' : ''} ${index <= openedSteps ? 'opened' : ''}`}
                onClick={index <= openedSteps ? () => onChangeStep(index) : false}
            >
                <div>{(currentStep > index || index <= openedSteps) ? <CheckSmall/> : index + 1}</div>

                {item}
            </li>)}
        </ul>
    )
}

const CheckSmall = () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="mask0" maskUnits="userSpaceOnUse" x="0" y="0" width="14" height="14">
        <rect x="0.5" y="0.5" width="13" height="13" fill="#791313" stroke="#312C51"/>
    </mask>
    <g mask="url(#mask0)">
        <path d="M1 7.92593L5 12L13 2" stroke="white" stroke-width="2"/>
    </g>
</svg>


export default Navigation