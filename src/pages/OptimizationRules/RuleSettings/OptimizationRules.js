import React, {useState} from "react"
import './OptimizationRules.less'
import {Header} from "../components/Header/Header"
import {CreateRulesWindow} from "./CreateRulesWindow/CreateRulesWindow"
import {RulesList} from "../components/RulesList/RulesList"
import {optimizationRulesServices} from "../../../services/optimization.rules.services"
import {RuleDetails} from "./RuleDetails/RuleDetails"
import {notification} from "../../../components/Notification"
import RouteLoader from "../../../components/RouteLoader/RouteLoader"
import {CampaignDetails} from "./CampaignDetails/CampaignDetails"
import {NoFoundData} from "../../../components/Table/CustomTable"
import {SVG} from "../../../utils/icons"
import {Link} from "react-router-dom"
import {EditRuleWindow} from "./EditRuleWindow/EditRuleWindow"


const OptimizationRules = () => {
    const [visibleCreateRuleWindow, setVisibleCreateRuleWindow] = useState(false),
        [visibleEditRuleWindow, setVisibleEditRuleWindow] = useState(false),
        [visibleRouteLoader, setVisibleRouteLoader] = useState(true),
        [createProcessing, setCreateProcessing] = useState(false),
        [updateProcessing, setUpdateProcessing] = useState(false),
        [activeTab, setActiveTab] = useState('rules'),
        [selectedRule, setSelectedRule] = useState()

    const closeWindowHandler = () => setVisibleCreateRuleWindow(false)

    const createRuleHandler = async (rule) => {
        setCreateProcessing(true)

        try {
            const {result} = await optimizationRulesServices.createRule(rule)

            if (rule.campaignsId.length > 0) {
                await attachRulesByCampaignsHandler({
                    rule_id: [result.id],
                    campaign_id: rule.campaignsId
                })
            }
            setSelectedRule({
                ...result,
                campaigns_count: rule.campaignsId.length,
                new: true,
                condition: JSON.parse(result.condition),
                actions: JSON.parse(result.actions)
            })

            notification.success({title: 'Rule success created!'})
            setVisibleCreateRuleWindow(false)
        } catch (e) {
            console.log(e)
        }

        setCreateProcessing(false)
    }

    const changeRuleHandler = (rule) => {
        setSelectedRule(rule)
        setVisibleRouteLoader(false)
    }
    const changeActiveTabHandler = (tab) => {
        setActiveTab(tab)
        setSelectedRule({})
        setVisibleRouteLoader(true)
    }

    const deleteRuleHandler = async (ruleId) => {
        try {
            await optimizationRulesServices.deleteRule(ruleId)

        } catch (e) {
            console.log(e)
        }
    }

    const attachRulesByCampaignsHandler = async (data, cb) => {
        try {
           const {result} =  await optimizationRulesServices.attachRules(data)
            setSelectedRule({
                ...selectedRule,
                campaigns_count: result.updated,
                rules_count: result.updated,
            })
        } catch (e) {
            console.log(e)
        }

        cb && cb()
    }

    const detachRulesByCampaignsHandler = async (data, cb) => {
        try {
            await optimizationRulesServices.detachRules(data)
            setSelectedRule({
                ...selectedRule,
                campaigns_count: data.rulesNewLength,
                rules_count: data.rulesNewLength,
            })
        } catch (e) {
            console.log(e)
        }

        cb && cb()
    }

    const updateRuleHandler = async (rule, cb) => {
        setUpdateProcessing(true)

        try {
            const {result} = await optimizationRulesServices.updateRule({...rule, period: rule.type === 'manual' ? undefined : rule.period})
            setSelectedRule({
                ...result,
                condition: JSON.parse(result.condition),
                actions: JSON.parse(result.actions)
            })

            notification.success({title: 'Rule success updated!'})

            setVisibleEditRuleWindow(false)
        } catch (e) {
            console.log(e)
        }

        cb && cb()
        setUpdateProcessing(false)
    }

    return (<div className={'optimization-rules-page'}>
        <Header
            actions={() => <>
                <button className="btn default" onClick={() => setVisibleCreateRuleWindow(true)}>
                    <SVG id={'plus-icon'}/>
                    Create Rule
                </button>

                <Link to={'/optimization-rules/attach-settings'} className="btn default">
                    <SVG id={'admin-panel-icon'}/>
                    Quick Entity Pairing
                </Link> </>}
        />

        <div className="container">
            <RulesList
                activeTab={activeTab}
                selectedRule={selectedRule}

                onSelect={changeRuleHandler}
                onDelete={deleteRuleHandler}
                onSetActiveTab={changeActiveTabHandler}
            />

            <div className="work-container">
                {(!selectedRule?.id && !selectedRule?.campaignId) && visibleRouteLoader && <RouteLoader/>}

                {(selectedRule?.id && activeTab === 'rules') && <RuleDetails
                    rule={selectedRule}

                    onUpdate={updateRuleHandler}
                    onChangeAttributionWindow={(attribution_window) => setSelectedRule({
                        ...selectedRule,
                        attribution_window
                    })}
                    onAttach={attachRulesByCampaignsHandler}
                    onDetach={detachRulesByCampaignsHandler}
                    onEdit={() => setVisibleEditRuleWindow(true)}
                />}

                {(selectedRule?.campaignId && activeTab === 'campaigns') && <CampaignDetails
                    campaign={selectedRule}

                    onUpdate={updateRuleHandler}
                    onAttach={attachRulesByCampaignsHandler}
                    onDetach={detachRulesByCampaignsHandler}
                />}

                {!selectedRule?.id && !selectedRule?.campaignId && !visibleRouteLoader && <NoFoundData
                    title={'No data'}
                />}
            </div>
        </div>


        <CreateRulesWindow
            visible={visibleCreateRuleWindow}
            processing={createProcessing}

            onCreate={createRuleHandler}
            onClose={closeWindowHandler}
        />

        <EditRuleWindow
            visible={visibleEditRuleWindow}
            processing={updateProcessing}
            rule={selectedRule}

            onSave={updateRuleHandler}
            onClose={() => setVisibleEditRuleWindow(false)}
        />
    </div>)
}

export default OptimizationRules