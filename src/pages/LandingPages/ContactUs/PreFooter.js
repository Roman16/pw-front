import React from "react"
import {Link} from "react-router-dom"

const PreFooter = () => {
    const showIntercom = () => {
        window.Intercom('show')
    }

    return (
        <section className={'pre-footer'}>
            <div className="container">
                <h3>Don’t be shy</h3>
                <h2>Take a Look Inside <span>Profit Whales</span></h2>

                <div className="buttons">
                    <Link to={'/registration'} className={'btn'}>Start your free trial</Link>

                    <button className={'btn white'} onClick={showIntercom}>talk with our experts</button>
                </div>
            </div>
        </section>

    )
}

export default PreFooter
