import React, {useEffect, useState} from "react"
import {intervalEnums, RuleSettings} from "../CreateRulesWindow/RuleSettings"
import _ from "lodash"
import {periodEnums} from "../CreateRulesWindow/RuleInformation"
import {Spin} from "antd"
import {notification} from "../../../components/Notification"
import {AttributionWindowSelect} from "../../Analytics/components/Header/AttributionWindow"


export const Settings = ({rule, onUpdate}) => {
    const [ruleData, setRuleData] = useState({...rule}),
        [visibleEditNameField, setVisibleEditNameField] = useState(false),
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
            condition: JSON.stringify(ruleData.condition),
            actions: JSON.stringify(ruleData.actions),
        }, () => {
            setSaveProcessing(false)
            notification.success({title: 'Rule success updated!'})
        })
    }

    useEffect(() => {
        setRuleData({...rule})
        setVisibleEditNameField(false)
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
                value={ruleData.attribution_window}
                onChange={attribution_window => changeRuleDataHandler({attribution_window})}
            />

            <button className="btn default">Edit</button>
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