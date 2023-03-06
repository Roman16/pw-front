import React, {useState} from "react"
import './OptimizationRules.less'
import {Header} from "./Header/Header"
import {CreateRulesWindow} from "./CreateRulesWindow/CreateRulesWindow"
import {RulesList} from "./RulesList/RulesList"
import {optimizationRulesServices} from "../../services/optimization.rules.services"
import {RuleDetails} from "./RuleDetails/RuleDetails"
import {notification} from "../../components/Notification"


const OptimizationRules = () => {
    const [visibleCreateRuleWindow, setVisibleCreateRuleWindow] = useState(false),
        [createProcessing, setCreateProcessing] = useState(false),
        [activeTab, setActiveTab] = useState('rules'),
        [selectedRule, setSelectedRule] = useState()

    const closeWindowHandler = () => setVisibleCreateRuleWindow(false)

    const createRuleHandler = async (rule) => {
        setCreateProcessing(true)

        try {
            const {result} = await optimizationRulesServices.createRule(rule)

            if (rule.campaignsId.length > 0) {
                await attachRulesByCampaignHandler({
                    rules: [result.id],
                    campaigns: rule.campaignsId
                })
            }
            notification.success({title: 'Rule success created!'})
            setVisibleCreateRuleWindow(false)

            setSelectedRule({result, campaigns_count: rule.campaignsId.length})
        } catch (e) {
            console.log(e)
        }

        setCreateProcessing(false)
    }

    const attachRulesByCampaignHandler = async (data) => {
        try {
            await optimizationRulesServices.attachRules(data)
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
                selectedRule={selectedRule}

                onSelect={setSelectedRule}
            />

            {activeTab === 'rules' && <RuleDetails/>}
        </div>

        <CreateRulesWindow
            visible={visibleCreateRuleWindow}
            processing={createProcessing}

            onCreate={createRuleHandler}
            onClose={closeWindowHandler}
        />
    </div>)
}

export default OptimizationRules