import React, {useEffect, useState} from "react"
import {intervalEnums, RuleSettings} from "../CreateRulesWindow/RuleSettings"
import _ from "lodash"
import {periodEnums} from "../CreateRulesWindow/RuleInformation"
import {Spin} from "antd"
import {AttributionWindowSelect} from "../../Analytics/components/Header/AttributionWindow"


export const Settings = ({rule, attributionWindow, onUpdate, onChangeAttributionWindow, onEdit}) => {
    const [ruleData, setRuleData] = useState({...rule}),
        [saveProcessing, setSaveProcessing] = useState(false)

    const changeRuleDataHandler = (data) => {
        setRuleData(prevState => ({...prevState, ...data}))
    }

    const resetHandler = () => {
        setRuleData({...rule})
    }

    const saveHandler = () => {
        setSaveProcessing(true)
        onUpdate({
            ...ruleData,
            active: ruleData.active || false,
            attribution_window: attributionWindow,
            condition: JSON.stringify(ruleData.condition),
            actions: JSON.stringify(ruleData.actions),
        }, () => {
            setSaveProcessing(false)
        })
    }

    useEffect(() => {
        setRuleData({...rule})
    }, [rule])

    return (<>
        <section className="rule-info">
            <div className="col">
                <h2>
                    {ruleData.name}
                </h2>

                {rule.description && <p>{rule.description}</p>}

                <div className="details-row">
                    <div className="timeline">{_.find(intervalEnums, {key: rule.interval})?.title}</div>
                    <div className="type">
                        <span>{rule.type}</span> {rule.type === 'auto' && `• ${_.find(periodEnums, {key: rule.period})?.title}`}
                    </div>
                </div>
            </div>

            <AttributionWindowSelect
                value={attributionWindow}
                onChange={onChangeAttributionWindow}
            />

            <button className="btn default" onClick={onEdit}>Edit</button>
        </section>


        <section className="settings">
            <RuleSettings
                data={ruleData}
                onChange={changeRuleDataHandler}
            />

            <div className={`save-actions ${JSON.stringify(rule) !== JSON.stringify(ruleData) ? 'visible' : ''}`}>
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