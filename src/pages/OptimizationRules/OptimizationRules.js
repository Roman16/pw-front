import React, {useState} from "react"
import './OptimizationRules.less'
import {Header} from "./Header/Header"
import {CreateRulesWindow} from "./CreateRulesWindow/CreateRulesWindow"
import {RulesList} from "./RulesList/RulesList"


const OptimizationRules = () => {
    const [visibleCreateRuleWindow, setVisibleCreateRuleWindow] = useState(false),
        [activeTab, setActiveTab] = useState('rules')

    const closeWindowHandler = () => setVisibleCreateRuleWindow(false)

    return (<div className={'optimization-rules-page'}>
        <Header
            onCreate={() => setVisibleCreateRuleWindow(true)}
        />

        <div className="container">
            <RulesList
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />
        </div>

        <CreateRulesWindow
            visible={visibleCreateRuleWindow}

            onClose={closeWindowHandler}
        />
    </div>)
}

export default OptimizationRules