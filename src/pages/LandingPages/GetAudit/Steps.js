import React from "react"

const steps = [
    'Contact information',
    'Brand information',
    'Monthly Ad Spend',
    'Monthly Sales',
    'Marketplace',
    'Amount of products',
    'Your goal'
]

const Steps = () => {

    return (<section className="steps">
        <ul>
            {steps.map(step => <li>{step}</li>)}
        </ul>
    </section>)
}

export default Steps