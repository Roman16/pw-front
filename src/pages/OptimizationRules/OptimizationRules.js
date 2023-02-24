import React, {useState} from "react"
import './OptimizationRules.less'
import {Header} from "./Header/Header"
import {CreateRulesWindow} from "./CreateRulesWindow/CreateRulesWindow"
import {RulesList} from "./RulesList/RulesList"


const OptimizationRules = () => {
    const [visibleCreateRuleWindow, setVisibleCreateRuleWindow] = useState(true)

    const closeWindowHandler = () => setVisibleCreateRuleWindow(false)

    return (<div className={'optimization-rules-page'}>
        <Header/>

        <div className="container">
            <RulesList/>
        </div>

        <CreateRulesWindow
            visible={visibleCreateRuleWindow}

            onClose={closeWindowHandler}
        />
    </div>)
}

export default OptimizationRules