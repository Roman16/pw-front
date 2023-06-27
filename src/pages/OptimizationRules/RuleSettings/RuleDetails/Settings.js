import React, {useEffect, useState} from "react"
import {intervalEnums, RuleSettings} from "../CreateRulesWindow/RuleSettings"
import _ from "lodash"
import {periodEnums} from "../CreateRulesWindow/RuleInformation"
import {Spin} from "antd"
import {AttributionWindowSelect} from "../../../Analytics/components/Header/AttributionWindow"
import InformationTooltip from "../../../../components/Tooltip/Tooltip"
import {Link} from "react-router-dom"


export const Settings = ({rule, attributionWindow, onUpdate, onChangeAttributionWindow, onEdit}) => {
    const [ruleData, setRuleData] = useState({...rule}),
        [saveProcessing, setSaveProcessing] = useState(false)

    const changeRuleDataHandler = (data) => {
        setRuleData(prevState => ({...prevState, ...data}))
    }

    const resetHandler = () => {
        setRuleData({...rule, actions: rule.actions[0] || rule.actions})
    }

    const saveHandler = () => {
        setSaveProcessing(true)
        onUpdate({
            ...ruleData,
            active: ruleData.active || false,
            attribution_window: attributionWindow,
            condition: JSON.stringify(ruleData.condition),
            actions: ruleData.actions ? JSON.stringify(Array.isArray(ruleData.actions) ? ruleData.actions : [ruleData.actions]) : null,
        }, () => {
            setSaveProcessing(false)
        })
    }

    useEffect(() => {
        setRuleData({...rule, actions: rule.actions[0] || rule.actions})
    }, [rule])

    return (<>
        <section className="rule-info">
            <div className="row">
                <h2>
                    {ruleData.name}
                </h2>

                <AttributionWindowSelect
                    value={attributionWindow}
                    onChange={onChangeAttributionWindow}
                />

                <button className="btn default" onClick={onEdit}>Edit</button>
            </div>

            {rule.description && <p title={rule.description}>{rule.description}</p>}

            <div className="details-row">
                {rule.rule_entity_type && <div
                    className="rule-type">{rule.rule_entity_type === 'product_ads' ? 'Product Ads' : 'Targetings'}</div>}
                <div className="timeline">{_.find(intervalEnums, {key: rule.interval})?.title}</div>
                <div className="type">
                    <span>{rule.type}</span> {rule.type === 'auto' && `• ${_.find(periodEnums, {key: rule.period})?.title}`}
                    {rule.type === 'manual' &&
                    <InformationTooltip description={<LaunchPageLink rule={ruleData.name}/>}/>}
                </div>
            </div>
        </section>


        <section className="settings">
            <RuleSettings
                data={ruleData}
                onChange={changeRuleDataHandler}
            />

            <div className={`save-actions ${JSON.stringify({
                ...rule,
                actions: rule.actions[0] || rule.actions
            }) !== JSON.stringify({...ruleData}) ? 'visible' : ''}`}>
                <button className="btn white" onClick={resetHandler}>
                    Reset All
                </button>

                <button disabled={saveProcessing} className="btn default" onClick={saveHandler}>
                    Save Changes

                    {saveProcessing && <Spin size={'small'}/>}
                </button>
            </div>
        </section>
    </>)
}

const LaunchPageLink = ({rule}) => <span className={'launch-page-link'}>This rule can only be launched manually. You can do this on the <Link
    to={`/optimization-rules/statuses/${rule}`}>launch page</Link></span>