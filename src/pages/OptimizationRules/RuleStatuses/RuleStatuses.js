import React, {useState} from "react"
import {Header} from "../components/Header/Header"
import {RulesList} from "../components/RulesList/RulesList"
import './RuleStatuses.less'
import {RuleDetails} from "./RuleDetails/RuleDetails"
import {optimizationRulesServices} from "../../../services/optimization.rules.services"
import {CampaignDetails} from "./CampaignDetails/CampaignDetails"
import {NoFoundData} from "../../../components/Table/CustomTable"
import {useSelector} from "react-redux"
import {notification} from "../../../components/Notification"

const RuleStatuses = (props) => {
    const [activeTab, setActiveTab] = useState('rules'),
        [selectedRule, setSelectedRule] = useState({}),
        [visibleRouteLoader, setVisibleRouteLoader] = useState(true)

    const marketplace = useSelector(state => state.user.activeAmazonMarketplace)

    const changeRuleHandler = (rule) => {
        setSelectedRule(rule)
        setVisibleRouteLoader(false)
    }

    const changeActiveTabHandler = (tab) => {
        setActiveTab(tab)
        setSelectedRule({})
        setVisibleRouteLoader(true)
    }

    const activateRuleHandler = async (id, cb) => {
        try {
            const {result} = await optimizationRulesServices.activateRule(id)
            setSelectedRule(prevState => ({...prevState, launch_status: result?.status}))
            notification.success({title: 'Rule run queued successfully'})
        } catch (e) {
            console.log(e)
        }

        cb()
    }

    const pauseRuleHandler = async (id, cb) => {
        try {
            await optimizationRulesServices.updateRule({
                id,
                active: false
            })
            setSelectedRule(prevState => ({...prevState, active: false}))
        } catch (e) {
            console.log(e)
        }

        cb()
    }

    return (<div className={'optimization-rules-page rule-statuses'}>
        <Header
            title={'Logs & Launches'}
            marketplace={marketplace}
            timezone={true}
        />

        <div className="container">
            <RulesList
                activeTab={activeTab}
                selectedRule={selectedRule}
                searchParams={props?.match?.params?.ruleName || ''}

                onSelect={changeRuleHandler}
                onSetActiveTab={changeActiveTabHandler}
            />

            <div className="work-container">
                {(selectedRule?.id && activeTab === 'rules') && <RuleDetails
                    selectedRule={selectedRule}

                    onActivate={activateRuleHandler}
                    onPause={pauseRuleHandler}
                />}

                {(selectedRule?.campaignId && activeTab === 'campaigns') && <CampaignDetails
                    selectedCampaign={selectedRule}
                />}

                {!selectedRule?.id && !selectedRule?.campaignId && !visibleRouteLoader && <NoFoundData
                    title={'No data'}
                />}
            </div>
        </div>

    </div>)
}

export default RuleStatuses