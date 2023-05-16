import React from "react"
import CustomSelect from "../../../../components/Select/Select"
import {Select} from "antd"
import {SVG} from "../../../../utils/icons"
import _ from 'lodash'
import InputCurrency from "../../../../components/Inputs/InputCurrency"

const Option = Select.Option

const metrics = [
    {
        title: 'Impressions',
        key: 'impressions',
        type: 'number'
        // type: 'number'
    },
    {
        title: 'Ad Spend',
        key: 'spend',
        type: 'number'
        // type: 'currency'
    },
    {
        title: 'Clicks',
        key: 'clicks',
        type: 'number'
        // type: 'number'
    },
    {
        title: 'Ad Orders',
        key: 'orders',
        type: 'number'
        // type: 'number'
    },
    {
        title: 'ACoS',
        key: 'acos',
        type: 'number'
        // type: 'percent'
    },
    {
        title: 'Ad Sales',
        key: 'sales',
        type: 'number'
        // type: 'currency'
    },
    {
        title: 'CTR',
        key: 'ctr',
        type: 'number'
        // type: 'percent'
    },
    {
        title: 'Ad CVR',
        key: 'cvr',
        type: 'number'
        // type: 'percent'
    },
    {
        title: 'Bid',
        key: 'bid',
        type: 'number'
        // type: 'currency'
    },
    {
        title: 'CPC',
        key: 'cpc',
        type: 'number'
        // type: 'currency'
    },
    {
        title: 'Bid - CPC',
        key: 'bidMinusCPC',
        type: 'number'
        // type: 'currency'
    },
    {
        title: 'Match Type',
        key: 'matchType',
        type: 'enums'
    },
    {
        title: 'State',
        key: 'state',
        type: 'enums'
    },
]

const conditionsByMetric = {
    number: [
        {title: 'Equals', key: '==='},
        {title: 'Greater than', key: '>'},
        {title: 'Less than', key: '<'},
        {title: 'Greater than or equal to', key: '>='},
        {title: 'Less than or equal to', key: '<='},
    ],
    enums: [
        {title: 'Equals', key: '==='},
        {title: 'Not equals', key: '!=='}
    ]
}

export const intervalEnums = [
    {
        title: 'Today',
        key: "0;"
    },
    {
        title: 'Yesterday',
        key: "1;1"
    },
    {
        title: 'Last 3 days',
        key: "3;1"
    },
    {
        title: 'Last 7 days',
        key: "7;1"
    },
    {
        title: 'Last 14 days',
        key: "14;1"
    },
    {
        title: 'Last 30 days',
        key: "30;1"
    },
    {
        title: 'Last 65 days',
        key: "65;1"
    },
]

export const actionsEnums = [
    {
        title: 'Set - Bid',
        key: 'set_bid'
    },
    {
        title: 'Set - Status',
        key: 'set_status'
    },
    {
        title: 'Decrease - Bid',
        key: 'decrease_bid'
    },
    {
        title: 'Increase - Bid',
        key: 'increase_bid'
    },
]

export const stateEnums = [
    {
        title: 'Enabled',
        key: 'enabled'
    },
    {
        title: 'Paused',
        key: 'paused'
    },
    {
        title: 'Archived',
        key: 'archived'
    },
]

export const matchTypeEnums = [
    {title: 'Exact', key: 'exact', value: 'exact'},
    {title: 'Phrase', key: 'phrase', value: 'phrase'},
    {title: 'Broad', key: 'broad', value: 'broad'},
    {title: 'ASIN', key: 'asin', value: 'asin'},
    {title: 'Expanded ASIN', key: 'expandedASIN', value: 'expandedASIN'},
    {title: 'Category', key: 'category', value: 'category'},
    {title: 'Brand', key: 'brand', value: 'brand'},
    {title: 'Views', key: 'views', value: 'views'},
    {title: 'Auto', key: 'auto', value: 'auto'},
]

const defaultRule = {
    "type": "rule",
    "metric": "impressions",
    "operator": "===",
    "value": "1"
}

const defaultGroup = {
    "type": "array",
    "glue": "AND",
    "rules": [
        defaultRule,
        defaultRule
    ]
}

const addConditionHandler = (data) => {
    if (data.type === 'array') {
        return ({
            ...data,
            rules: [
                ..._.filter(data.rules, {'type': 'rule'}),
                defaultRule,
                ..._.filter(data.rules, {'type': 'array'}),
            ]
        })
    } else {
        return ({
            "type": "array",
            "glue": "AND",
            "rules": [
                data,
                defaultRule,
            ]
        })
    }
}

const addGroupHandler = (data) => {
    if (data.type === 'array') {
        return ({
            ...data,
            rules: [
                ...data.rules,
                defaultGroup,
            ]
        })
    } else {
        return ({
            "type": "array",
            "glue": "AND",
            "rules": [
                data,
                defaultGroup,
            ]
        })
    }
}

const removeConditionHandler = (group, index) => {
    if (group.rules.length === 2) {
        const rule = group.rules.filter((item, i) => i !== index)[0]

        if (rule.type === 'array') {
            return ({
                ...rule
            })

        } else {
            return ({
                "type": "rule",
                "metric": rule.metric,
                "operator": rule.operator,
                "value": rule.value
            })
        }
    } else {
        return ({
            "type": "array",
            "glue": group.glue,
            "rules": [...group.rules.filter((item, i) => i !== index)]
        })
    }
}

export const RuleSettings = ({data, onChange}) => {
    const changeSettingsHandler = (condition) => {
        onChange({condition})
    }

    const changeActionHandler = (type) => {
        if (type === 'decrease_bid' || type === 'increase_bid') {
            onChange({
                actions: {
                    type,
                    units: 'exact'
                }
            })
        } else {
            onChange({actions: {type}})
        }
    }

    return (<div className="step rule-settings">
        <div className="when-line line active">
            <div>when</div>
        </div>

        <div className="conditions">
            <RenderRules
                rule={data.condition}
                onChange={changeSettingsHandler}
            />

            <AddActions
                onAddCondition={() => changeSettingsHandler(addConditionHandler(data.condition))}
                onAddGroup={() => changeSettingsHandler(addGroupHandler(data.condition))}
            />
        </div>

        <div className={`time-line line ${data.interval ? 'active' : ''}`}>
            <div>
                <label htmlFor="">FOR:</label>
                <CustomSelect
                    getPopupContainer={trigger => trigger.parentNode.parentNode.parentNode}
                    placeholder={'SELECT TIMELINE'}
                    value={data.interval}
                    onChange={interval => onChange({interval})}
                >
                    {[...intervalEnums, ...data.type === 'manual' ? [{title: 'lifetime', key: ";"}] : []].map(i =>
                        <Option value={i.key}>{i.title}</Option>)}

                </CustomSelect>
            </div>

            {data.interval ? <p className={'active'}>
                    The rule uses data for the period of <b>{_.find([...intervalEnums, {
                    title: 'lifetime',
                    key: ';'
                }], {key: data.interval}).title}</b> to check the conditions.
                </p> :
                <p>Please, select timeline</p>}
        </div>

        <div className={`action-line line ${data.actions.type ? 'active' : ''}`}>
            <div>
                <label htmlFor="">ACTION:</label>
                <CustomSelect
                    getPopupContainer={trigger => trigger.parentNode.parentNode.parentNode}
                    placeholder={'SELECT ACTION'}
                    value={data.actions.type}
                    onChange={changeActionHandler}
                >
                    {actionsEnums.map(i => <Option value={i.key}>{i.title}</Option>)}
                </CustomSelect>
            </div>

            {!data.actions.type && <p>Please, select action to create a rule</p>}
        </div>

        <ActionValue
            actions={data.actions}
            onChange={onChange}
        />
    </div>)
}


const RenderRules = ({rule, onChange, showActions = false, showRemove = false, onRemove}) => {
    if (rule.type === 'rule') {
        return (<>
            <div className="rule">
                <div className="form-group">
                    <label htmlFor="">Metric</label>
                    <CustomSelect
                        getPopupContainer={trigger => trigger}
                        value={rule.metric}
                        onChange={metric => onChange({
                            ...rule,
                            metric,
                            value: metric === 'state' ? stateEnums[0].key : metric === 'matchType' ? matchTypeEnums[0].key : '1'
                        })}
                    >
                        {metrics.map(metric => <Option value={metric.key}>{metric.title}</Option>)}
                    </CustomSelect>
                </div>

                <div className="form-group">
                    <label htmlFor="">Condition</label>
                    <CustomSelect
                        getPopupContainer={trigger => trigger}
                        value={rule.operator}
                        onChange={operator => onChange({...rule, operator})}
                    >
                        {conditionsByMetric[_.find(metrics, {key: rule.metric})?.type]?.map(i =>
                            <Option value={i.key}>{i.title}</Option>)}
                    </CustomSelect>
                </div>

                <div className="form-group">
                    <label htmlFor="">Value</label>
                    {_.find(metrics, {key: rule.metric})?.type === 'enums' ? <CustomSelect
                            getPopupContainer={trigger => trigger}
                            value={rule.value}
                            onChange={value => onChange({...rule, value})}
                        >
                            {[...rule.metric === 'state' ? stateEnums : matchTypeEnums].map(i =>
                                <Option value={i.key}>{i.title}</Option>)}
                        </CustomSelect>
                        : <input
                            value={rule.value}
                            onChange={({target: {value}}) => onChange({...rule, value: String(value)})}
                        />
                    }
                </div>

                {showRemove && <button className="btn icon" onClick={onRemove}>
                    <SVG id={'close-window-icon'}/>
                </button>}
            </div>
        </>)
    } else {
        return (<div className={`group`}>
            <div className={`glue ${rule.glue}`}>
                <div>
                    <CustomSelect
                        getPopupContainer={trigger => trigger}
                        value={rule.glue}
                        onChange={glue => onChange({...rule, glue})}
                    >
                        <Option value={'AND'}>AND</Option>
                        <Option value={'OR'}>OR</Option>
                    </CustomSelect>
                </div>
            </div>

            <div className="rules">
                {rule?.rules?.map((i, index) => <RenderRules
                    showActions={true}
                    showRemove={true}
                    rule={i}

                    onRemove={() => onChange(removeConditionHandler(rule, index))}
                    onChange={(data) => onChange({
                        ...rule,
                        rules: [...rule.rules.map((item, index2) => index2 === index ? data : item)]
                    })}
                />)}
            </div>

            {showActions && <AddActions
                onAddCondition={() => onChange(addConditionHandler(rule))}
                onAddGroup={() => onChange(addGroupHandler(rule))}

                addGroupBtnText={'Add inner group'}
            />}
        </div>)
    }
}

const AddActions = ({onAddCondition, onAddGroup, addGroupBtnText = 'Add group'}) => {
    return (<div className="add-actions">
        <button onClick={onAddCondition}>
            <SVG id={'plus-icon'}/>
            Add condition
        </button>

        <button onClick={onAddGroup}>
            <SVG id={'plus-icon'}/>
            {addGroupBtnText}
        </button>
    </div>)
}

const ActionValue = ({actions, onChange}) => {
    switch (actions.type) {
        case 'set_bid':
            return <div className={`action-value ${actions.type ? 'visible' : ''}`}>
                <div className="form-group">
                    <label htmlFor="">Value</label>
                    <InputCurrency
                        value={actions.value}
                        onChange={(value) => onChange({actions: {...actions, value: String(value)}})}
                    />
                </div>
            </div>
        case 'set_status':
            return <div className={`action-value ${actions.type ? 'visible' : ''}`}>
                <div className="form-group">
                    <label htmlFor="">Value</label>
                    <CustomSelect
                        getPopupContainer={trigger => trigger.parentNode}
                        value={actions.value}
                        onChange={value => onChange({actions: {...actions, value}})}
                    >
                        <Option value={'enabled'}>Enabled</Option>
                        <Option value={'paused'}>Paused</Option>
                        <Option value={'archived'}>Archived</Option>
                    </CustomSelect>
                </div>
            </div>
        case 'decrease_bid':
            return <div className={`action-value ${actions.type ? 'visible' : ''}`}>
                <div className="form-group type">
                    <label htmlFor="">Type</label>
                    <CustomSelect
                        getPopupContainer={trigger => trigger.parentNode}
                        value={actions.units}
                        onChange={units => onChange({actions: {...actions, units}})}
                    >
                        <Option value={'exact'}>$</Option>
                        <Option value={'percents'}>%</Option>
                    </CustomSelect>
                </div>


                <div className="form-group">
                    <label htmlFor="">Value</label>
                    <InputCurrency
                        value={actions.value}
                        onChange={(value) => onChange({actions: {...actions, value: String(value)}})}
                        typeIcon={actions.units === 'exact' ? 'number' : 'percent'}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="">Up to minimum</label>
                    <InputCurrency
                        value={actions.up_limit}
                        onChange={(up_limit) => onChange({actions: {...actions, up_limit: +up_limit}})}
                    />
                </div>
            </div>

        default:
            return <div className={`action-value ${actions.type ? 'visible' : ''}`}>
                <div className="form-group type">
                    <label htmlFor="">Type</label>
                    <CustomSelect
                        getPopupContainer={trigger => trigger.parentNode}
                        value={actions.units}
                        onChange={units => onChange({actions: {...actions, units}})}
                    >
                        <Option value={'exact'}>$</Option>
                        <Option value={'percents'}>%</Option>
                    </CustomSelect>
                </div>


                <div className="form-group">
                    <label htmlFor="">Value</label>
                    <InputCurrency
                        value={actions.value}
                        onChange={(value) => onChange({actions: {...actions, value: String(value)}})}
                        typeIcon={actions.units === 'exact' ? 'number' : 'percent'}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="">Up to maximum</label>
                    <InputCurrency
                        value={actions.up_limit}
                        onChange={(up_limit) => onChange({actions: {...actions, up_limit: +up_limit}})}
                    />
                </div>
            </div>
    }
}