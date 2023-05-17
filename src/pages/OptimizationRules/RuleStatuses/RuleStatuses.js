import React, {useState} from "react"
import {Header} from "../components/Header/Header"
import {RulesList} from "../components/RulesList/RulesList"
import './RuleStatuses.less'
import {RuleDetails} from "./RuleDetails/RuleDetails"
import {optimizationRulesServices} from "../../../services/optimization.rules.services"

const RuleStatuses = () => {
    const [activeTab, setActiveTab] = useState('rules'),
        [selectedRule, setSelectedRule] = useState({})


    const changeRuleHandler = (rule) => {
        setSelectedRule(rule)
    }

    const changeActiveTabHandler = (tab) => {
        setActiveTab(tab)
        setSelectedRule({})
    }

    const activateRuleHandler = async (id, cb) => {
        try {
            await optimizationRulesServices.activateRule(id)
            setSelectedRule(prevState => ({...prevState, active: true}))
        } catch (e) {
            console.log(e)
        }

        cb()
    }


    return (<div className={'optimization-rules-page rule-statuses'}>
        <Header
            title={'Statuses & Logs'}
        />


        <div className="container">
            <RulesList
                activeTab={activeTab}
                selectedRule={selectedRule}

                onSelect={changeRuleHandler}
                onSetActiveTab={changeActiveTabHandler}
            />

            <div className="work-container">
                <RuleDetails
                    selectedRule={selectedRule}

                    onActivate={activateRuleHandler}
                />

            </div>
        </div>

    </div>)
}

export default RuleStatuses