import React from "react"

const SmartBar = () => {
    const email = 'info@profitwhales.agency',
        phone = '+18143519477'

    return (
        <div className="smart-bar">
            <div className="container">
                <div className="contacts">
                    <span className="phone">
                        {phone}
                    </span>

                    <a href={`tel:${phone}`} className="phone">
                        {phone}
                    </a>

                    <div className="hr"/>

                    <a href={`mailto:${email}`} className="email">
                        {email}
                    </a>
                </div>
            </div>
        </div>
    )
}

export default SmartBar
