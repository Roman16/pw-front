import React, {useState} from "react"
import {Header} from "../components/Header/Header"
import {RulesList} from "../components/RulesList/RulesList"
import './RuleStatuses.less'
import {RuleDetails} from "./RuleDetails/RuleDetails"

const RuleStatuses = () => {
    const [activeTab, setActiveTab] = useState('rules'),
        [selectedRule, setSelectedRule] = useState()


    const changeRuleHandler = (rule) => {
        setSelectedRule(rule)
    }

    const changeActiveTabHandler = (tab) => {
        setActiveTab(tab)
        setSelectedRule({})
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
                <RuleDetails/>

            </div>
        </div>

    </div>)
}

export default RuleStatuses