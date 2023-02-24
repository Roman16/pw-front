import React, {useState} from "react"
import CustomSelect from "../../../components/Select/Select"
import {Select} from "antd"
import {SVG} from "../../../utils/icons"

const Option = Select.Option


const RenderRules = ({rule, onChange}) => {
    const [isHover, setIsHover] = useState(false)

    const handleMouseEnter = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setIsHover(true)
    }

    const handleMouseLeave = (e) => {
        e.stopPropagation()
        e.preventDefault()
        setIsHover(false)
    }

    if (rule.type === 'rule') {
        return (<div className="rule">
            <div className="form-group">
                <label htmlFor="">Metric</label>
                <CustomSelect
                    getPopupContainer={trigger => trigger}
                    value={rule.metric}
                    // onChange={}
                >
                    <Option value={'days'}>Days</Option>
                </CustomSelect>
            </div>

            <div className="form-group">
                <label htmlFor="">Condition</label>
                <CustomSelect
                    getPopupContainer={trigger => trigger}
                    value={rule.operator}
                    // onChange={}
                >
                    <Option value={'>'}>Less then</Option>
                </CustomSelect>
            </div>

            <div className="form-group">
                <label htmlFor="">Value</label>
                <input
                    value={rule.value}
                    onChange={({target: {value}}) => onChange({...rule, value})}
                />
            </div>
        </div>)
    } else {
        return (<div
            className={`group ${isHover ? 'hover' : ''}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className={`glue ${rule.glue}`}>
                <div>{rule.glue}</div>
            </div>

            <div className="rules">
                {rule.rules.map((i, index) => <RenderRules
                    rule={i}
                    onChange={(data) => onChange({
                        ...rule,
                        rules: [...rule.rules.map((item, index2) => index2 === index ? data : item)]
                    })}
                />)}
            </div>
        </div>)
    }
}

const AddActions = ({onAddFilter, onAddGroup}) => {
    return (<div className="add-actions">
        <button onClick={onAddFilter}>
            <SVG id={'plus-icon'}/>
            Add filter
        </button>

        <button onClick={onAddGroup}>
            <SVG id={'plus-icon'}/>
            Add group
        </button>
    </div>)
}

export const RuleSettings = ({data, onChange}) => {

    const changeSettingsHandler = (settings) => {
        onChange({settings})
    }

    const addFilterHandler = () => {
        if (data.settings.type === 'array') {
            changeSettingsHandler({
                ...data.settings,
                rules: [
                    {
                        "type": "rule",
                        "metric": "days",
                        "operator": ">",
                        "value": 1
                    },
                    ...data.settings.rules
                ]
            })
        } else {

        }
    }

    const addGroupHandler = () => {

    }

    return (<div className="step rule-settings">
        <h3>RuleOnly for big Campaigns rule</h3>

        <div className="when-line line">
            <div>when</div>
        </div>

        <div className="conditions">
            <RenderRules
                rule={data.settings}
                onChange={changeSettingsHandler}
            />
            {/*{renderRules(data.settings, changeSettingsHandler)}*/}

            <AddActions
                onAddFilter={addFilterHandler}
                onAddGroup={addGroupHandler}
            />
        </div>

        <div className="time-line line">
            <div>
                <CustomSelect
                    getPopupContainer={trigger => trigger}
                    placeholder={'SELECT TIMELINE'}
                    value={data.timeline}
                    onChange={value => onChange({timeline: value})}
                >
                    <Option value={'lastDays_3'}>Last 3 days</Option>
                </CustomSelect>
            </div>

            {data.timeline ? <p className={'active'}>Your rule will be executed within the <b>last 3 days</b></p> :
                <p>Please, select timeline</p>}
        </div>

        <div className="action-line line">
            <div>
                <CustomSelect
                    getPopupContainer={trigger => trigger}
                    placeholder={'SELECT ACTION'}
                    // value={rule.operator}
                    // onChange={}
                >
                    <Option value={'decreaseBid'}>Decrease bid</Option>
                </CustomSelect>
            </div>

            <p>Please, select action to create a rule</p>
        </div>
    </div>)
}