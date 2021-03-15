import React from "react"
import './GetAudit.less'
import Header from "./Header"
import Footer from "./Footer"
import Steps from "./Steps"
import WelcomeSection from "./WelcomeSection"


const GetAudit = () => {

    return (<div className={'get-audit-page landing-page'}>
        <Header/>

        <div className="container">
            <WelcomeSection/>
            {/*<Steps/>*/}
        </div>

        <Footer/>
    </div>)
}

export default GetAudit