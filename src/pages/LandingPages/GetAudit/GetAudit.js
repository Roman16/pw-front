import React, {useState} from "react"
import './GetAudit.less'
import Header from "./Header"
import Footer from "./Footer"
import WelcomeSection from "./WelcomeSection"
import AuditForm from "./AuditForm"
import SuccessSend from "./SuccessSend"
import {userService} from "../../../services/user.services"
import {Prompt} from "react-router-dom"

const defaultForm = {
    first_name: undefined,
    last_name: undefined,
    email: undefined,
    active_marketplaces: 'ATVPDKIKX0DER',
    avg_monthly_ad_sales: 'below_50k',
    avg_monthly_ad_spend: 'below_10k',
    is_has_brand_registry: true,
    main_goal: 'acos_targeting',
    storefront_name: undefined,
    main_category: undefined,
    communication_channel: undefined,
    amazon_number_of_active_products: '1_5',
}

const GetAudit = () => {
    const [activeSection, setActiveSection] = useState(0),
        [formData, setFormData] = useState({
            ...defaultForm
        })

    const submitFormHandler = async () => {
        try {
            await userService.sendContactForm({
                ...formData,
                active_marketplaces: [formData.active_marketplaces]
            })
            setActiveSection(2)
        } catch (e) {
            console.log(e)
        }
    }

    return (<div className={'get-audit-page landing-page'}>
        <Header/>

        <div className="container">
            <WelcomeSection
                active={activeSection === 0}
                onStart={() => setActiveSection(1)}
            />

            <AuditForm
                active={activeSection === 1}
                formData={formData}
                onUpdate={(data) => setFormData(data)}
                onSubmit={submitFormHandler}
            />

            <SuccessSend
                active={activeSection === 2}
                userName={formData.first_name}
            />
        </div>

        <Footer/>

        <Prompt
            when={activeSection === 1}
            message="Are you sure? The current scanning results will be lost"
        />
    </div>)
}

export default GetAudit