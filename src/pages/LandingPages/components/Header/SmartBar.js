import React from "react"

const SmartBar = ({email, phone}) => {
    return (
        <div className="smart-bar">
            <div className="container">
                <div className="contacts">
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
