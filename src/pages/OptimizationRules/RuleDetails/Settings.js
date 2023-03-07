import React, {useEffect, useState} from "react"
import {intervalEnums, RuleSettings} from "../CreateRulesWindow/RuleSettings"
import {SVG} from "../../../utils/icons"
import _ from "lodash"
import {periodEnums} from "../CreateRulesWindow/RuleInformation"
import {Spin} from "antd"


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
        }, () => setSaveProcessing(false))
    }

    useEffect(() => {
        setRuleData({...rule})
        setVisibleEditNameField(false)
    }, [rule])

    return (<div className="settings">
        <div className="rule-info">
            <h2>
                {visibleEditNameField ? <div className="form-group">
                    <input
                        value={ruleData.name}
                        onChange={({target: {value}}) => changeRuleDataHandler({name: value})}
                    />
                </div> : ruleData.name}
                <div className="edit-btn" onClick={() => setVisibleEditNameField(prevState => !prevState)}>
                    <div/>
                </div>
            </h2>
            {rule.description && <p>{rule.description}</p>}

            <div className="details-row">
                <div className="timeline">{_.find(intervalEnums, {key: rule.interval})?.title}</div>
                <div className="type">
                    <span>{rule.type}</span> {rule.type === 'auto' && `• ${_.find(periodEnums, {key: rule.period})?.title}`}
                </div>
            </div>
        </div>


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
    </div>)
}