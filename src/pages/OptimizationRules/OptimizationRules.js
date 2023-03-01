import React, {useState} from "react"
import './OptimizationRules.less'
import {Header} from "./Header/Header"
import {CreateRulesWindow} from "./CreateRulesWindow/CreateRulesWindow"
import {RulesList} from "./RulesList/RulesList"
import {optimizationRulesServices} from "../../services/optimization.rules.services"
import {RuleDetails} from "./RuleDetails/RuleDetails"


const OptimizationRules = () => {
    const [visibleCreateRuleWindow, setVisibleCreateRuleWindow] = useState(false),
        [activeTab, setActiveTab] = useState('rules')

    const closeWindowHandler = () => setVisibleCreateRuleWindow(false)

    const createRuleHandler = async (rule) => {
        try {
            const res = await optimizationRulesServices.createRule(rule)

            console.log(res)
        } catch (e) {
            console.log(e)
        }
    }

    return (<div className={'optimization-rules-page'}>
        <Header
            onCreate={() => setVisibleCreateRuleWindow(true)}
        />

        <div className="container">
            <RulesList
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />

           {activeTab === 'rules' && <RuleDetails/>}
        </div>

        <CreateRulesWindow
            visible={visibleCreateRuleWindow}

            onCreate={createRuleHandler}
            onClose={closeWindowHandler}
        />
    </div>)
}

export default OptimizationRules