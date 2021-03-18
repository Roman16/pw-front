import React, {useState} from "react"
import './GetAudit.less'
import Header from "./Header"
import Footer from "./Footer"
import WelcomeSection from "./WelcomeSection"
import AuditForm from "./AuditForm"
import SuccessSend from "./SuccessSend"


const GetAudit = () => {
    const [activeSection, setActiveSection] = useState(2)

    return (<div className={'get-audit-page landing-page'}>
        <Header/>

        <div className="container">
            <WelcomeSection
                active={activeSection === 0}
                onStart={() => setActiveSection(1)}
            />

            <AuditForm
                active={activeSection === 1}
            />

            <SuccessSend
                active={activeSection === 2}
            />
        </div>

        <Footer/>
    </div>)
}

export default GetAudit